# dashboard.py
import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import json
import numpy as np
from collections import Counter

# Sayfa ayarları
st.set_page_config(
    page_title="Amazon Kitap Analiz Paneli",
    page_icon="📚",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Veriyi yükle
@st.cache_data
def load_data():
    with open('veri.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    df = pd.DataFrame(data)
    
    # Veri temizleme
    df['Yayın Yılı'] = df['Yayın Tarihi'].str.extract(r'(\d{4})').astype(float)
    df['Fiyat'] = pd.to_numeric(df['Fiyat'], errors='coerce')
    
    # Yazar işlemleri
    df['Yazar'] = df['Yazar'].fillna('Bilinmeyen Yazar')
    return df

df = load_data()

# Sidebar filtreleri
st.sidebar.header("Filtreleme Seçenekleri")
min_year, max_year = int(df['Yayın Yılı'].min()), int(df['Yayın Yılı'].max())
year_range = st.sidebar.slider(
    "Yayın Yılı Aralığı",
    min_year, max_year, (min_year, max_year)
)

rating_filter = st.sidebar.slider(
    "Minimum Puan",
    1.0, 5.0, 4.0, 0.1
)

price_filter = st.sidebar.slider(
    "Fiyat Aralığı (TL)",
    0, int(df['Fiyat'].max()) + 100, (0, int(df['Fiyat'].max()) + 100)
)

# Filtreleme
filtered_df = df[
    (df['Yayın Yılı'] >= year_range[0]) & 
    (df['Yayın Yılı'] <= year_range[1]) &
    (df['Puan'] >= rating_filter) &
    (df['Fiyat'] >= price_filter[0]) & 
    (df['Fiyat'] <= price_filter[1])
]

# Ana sayfa
st.title("📊 Amazon Kitap Analiz Paneli")
st.markdown("""
<style>
div[data-testid="metric-container"] {
    background-color: rgba(28, 131, 225, 0.1);
    border: 1px solid rgba(28, 131, 225, 0.1);
    padding: 5% 5% 5% 10%;
    border-radius: 5px;
    color: rgb(30, 103, 119);
}
div[data-testid="metric-container"] > label {
    color: rgba(35, 86, 131);
}
</style>
""", unsafe_allow_html=True)

# Metrikler
col1, col2, col3, col4 = st.columns(4)
col1.metric("Toplam Kitap", len(filtered_df))
col2.metric("Ortalama Fiyat", f"{filtered_df['Fiyat'].mean():.2f} TL")
col3.metric("Ortalama Puan", f"{filtered_df['Puan'].mean():.2f}")
col4.metric("En Yüksek Fiyat", f"{filtered_df['Fiyat'].max():.2f} TL")

# Grafikler
tab1, tab2, tab3, tab4 = st.tabs(["📈 Fiyat Dağılımı", "⭐ Puan Analizi", "✍️ Yazar İstatistikleri", "📅 Yıllara Göre"])

with tab1:
    st.subheader("Fiyat Dağılımı")
    fig = px.histogram(
        filtered_df, 
        x='Fiyat', 
        nbins=20,
        color_discrete_sequence=['#636EFA'],
        labels={'Fiyat': 'Fiyat (TL)'}
    )
    fig.update_layout(bargap=0.1)
    st.plotly_chart(fig, use_container_width=True)
    
    st.subheader("Fiyat-Puan İlişkisi")
    fig = px.scatter(
        filtered_df,
        x='Fiyat',
        y='Puan',
        color='Yayın Yılı',
        hover_data=['Yazar'],
        color_continuous_scale='viridis'
    )
    st.plotly_chart(fig, use_container_width=True)

with tab2:
    st.subheader("Puan Dağılımı")
    fig = px.pie(
        filtered_df,
        names='Puan',
        color_discrete_sequence=px.colors.sequential.Viridis
    )
    st.plotly_chart(fig, use_container_width=True)
    
    st.subheader("Puan-Fiyat Kutu Grafiği")
    fig = px.box(
        filtered_df,
        x='Puan',
        y='Fiyat',
        color='Puan',
        points="all"
    )
    st.plotly_chart(fig, use_container_width=True)

with tab3:
    # Yazar analizi
    st.subheader("En Çok Eseri Olan Yazarlar")
    
    # Yazar isimlerini ayır
    all_authors = []
    for authors in filtered_df['Yazar']:
        if " ve " in authors:
            all_authors.extend([a.strip() for a in authors.split("ve")])
        elif "," in authors:
            all_authors.extend([a.strip() for a in authors.split(",")])
        else:
            all_authors.append(authors.strip())
    
    author_counts = Counter(all_authors)
    top_authors = pd.DataFrame(author_counts.most_common(10), columns=['Yazar', 'Kitap Sayısı'])
    
    fig = px.bar(
        top_authors,
        x='Kitap Sayısı',
        y='Yazar',
        orientation='h',
        color='Kitap Sayısı',
        color_continuous_scale='deep'
    )
    st.plotly_chart(fig, use_container_width=True)

with tab4:
    st.subheader("Yıllara Göre Kitap Sayısı")
    yearly_counts = filtered_df.groupby('Yayın Yılı').size().reset_index(name='Kitap Sayısı')
    fig = px.line(
        yearly_counts,
        x='Yayın Yılı',
        y='Kitap Sayısı',
        markers=True,
        line_shape='spline'
    )
    st.plotly_chart(fig, use_container_width=True)
    
    st.subheader("Yıllara Göre Ortalama Fiyat")
    yearly_price = filtered_df.groupby('Yayın Yılı')['Fiyat'].mean().reset_index()
    fig = px.area(
        yearly_price,
        x='Yayın Yılı',
        y='Fiyat',
        line_shape='spline'
    )
    st.plotly_chart(fig, use_container_width=True)

# Ham veri gösterimi
st.subheader("Filtrelenmiş Veri Tablosu")
st.dataframe(
    filtered_df.sort_values('Puan', ascending=False),
    column_config={
        "Yazar": st.column_config.TextColumn("Yazar", width="medium"),
        "Yayın Tarihi": st.column_config.DateColumn("Yayın Tarihi"),
        "Puan": st.column_config.NumberColumn("Puan", format="%.1f ⭐"),
        "Fiyat": st.column_config.NumberColumn("Fiyat", format="%.2f TL")
    },
    hide_index=True,
    use_container_width=True
)

# Veri indirme butonu
st.download_button(
    label="Filtrelenmiş Veriyi İndir (CSV)",
    data=filtered_df.to_csv(index=False).encode('utf-8'),
    file_name='filtrelenmis_kitap_verisi.csv',
    mime='text/csv'
)