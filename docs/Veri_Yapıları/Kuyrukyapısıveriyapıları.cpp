#include<iostream>
#include<clocale> // SADECE TÜRKÇE KARAKTER KULLANMAK ÝÇÝN EKLENMÝÞ KÜTÜPHANE :)
using namespace std;
#define SIZE 15 // Kuyruðun alabileceði maks uzunluk için varsayýlan deðer

// KUYRUK YAPISI ÖZEL BÝR TÜR DOÐRUSAL BAÐIL LÝSTE GÝBÝDÝR 
// ÖZELLÝKLERÝ VARDIR : ELEMAN EKLERKEN SONA EKLENÝR , ELEMAN SÝLÝNÝRKEN BAÞTAN SÝLÝNÝR
// First-In-First-Out (FIFO) mantýðý uygulanýr
class node{ // kuyrukta her bir düðümün tanýmýný yapan class
	public:
		int data;
		node *next;
		node(int data=0)
		{
			this->data=data;
			next=NULL;
		}
};

class quenu{ // kuyruðu oluþturan class
	public:
		node *root;
		node *tail;
		int sayac;
	quenu()
	{
		root=NULL;
		tail=NULL;
		sayac=0;
	}
	bool bosmu()
	{
		return root == NULL;
	}
	bool fuulmu()
	{
		return sayac == SIZE;
	}
	void ekleme(int deger)
	{
		if(fuulmu())
		{
			cout<<"KUYRUK DOLU MAKS ELEMAN SAYISI = "<<sayac<<endl;
		}
		else if(bosmu())
		{
			root = new node(deger);
			tail = root;
			cout<<"Kuyruk oluþturuldu ilk eleman eklendi"<<endl;
			sayac++;
		}
		else
		{
			tail->next = new node(deger);
			tail = tail->next;
			cout<<"Eleman eklendi"<<endl;
			sayac++;
		}
	}
	void cikar()
	{
		if(bosmu())
		{
			cout<<"Kuyruk boþ çýkacak bir þey yok"<<endl;
		}
		else
		{
			if(root->next == NULL)
			{
			delete root;
			root = NULL;
			tail = NULL;
			cout<<"Kuyrukta kalan son elemanda silindi"<<endl;
			sayac--;
			}
			else
			{
			node *temp = root;
			root =root->next;
			delete temp;
			cout<<"Birden fazla düðümü olan kuyruktan eleman silindi (ÝLK GÝREN ÝLK ÇIKAR)"<<endl;
			sayac--;
		    }
		}
	}
	void goster()
	{
		system("cls");
		if(bosmu())
		{
			cout<<"Kuyruk boþ YAZDIRILACAK eleman yok"<<endl;
		}
		else
		{
		node *tempp= root;
		cout<<"BAÞ"<<endl;
		while(tempp != NULL)
		{
			cout<<"---> "<<tempp->data<<" <---"<<endl;
			tempp = tempp -> next; 
		}
		cout<<"SON"<<endl;
	    }
	}
	void temizle()
	{
		system("cls");
		if(bosmu())
		{
			cout<<"Kuyruk boþ"<<endl;
		}
		else
		{
			while(!bosmu())
			{
				cikar();
			}
		}
		cout<<"ÝÞLEM TAMAMLANDI TAMAMEN TEMÝZ"<<endl;
	}
	void sayackac()
	{
		system("cls");
		if(bosmu())
		{
			cout<<"Kuyruk boþ"<<endl;
		}
		if(fuulmu())
		{
			cout<<"KUYRUK DOLU MAKS ELEMAN SAYISI = "<<sayac<<endl;
		}
		else
		{
			cout<<"ELEMAN SAYISI : "<<sayac<<" MAX eleman : "<<SIZE<<endl;
		}
		
	}
};
int main()
{
setlocale(LC_ALL,"Turkish");
	
	
	quenu kuyruk;
	int islem;
	while(1)
	{
	cout<<"1-) kuyruk bosmu kontrol et\n2-) kuyruk dolumu kontrol et\n3-) Eleman ekle\n4-) Eleman çýkar\n5-) Kuyrugu göster\n6-) Kuyrugu temizle\n7-) Eleman sayýsý\n0-) Çýkýþ\n\n\n"<<endl;
	cout<<"TERCÝHÝNÝZ ---> ";
	cin>>islem;
	switch(islem)
	{
	
	case 1: cout<<kuyruk.bosmu()<<endl;
	break;
	case 2: cout<<kuyruk.fuulmu()<<endl;
	break;
	case 3:
	int x;
	cout<<"Elemaný Gir :"; cin>>x; 
	kuyruk.ekleme(x);
	break;
	case 4: kuyruk.cikar();
	break;
	case 5: kuyruk.goster();
	break;
	case 6: kuyruk.temizle();
	break;
	case 7: kuyruk.sayackac();
	break;
	case 0: return 0; 
	break;
	default :
	cout<<"HATALI ÝÞLEM TEKRAR DENE"; break;
    }
	
    } 
	
	
return 0;
}
