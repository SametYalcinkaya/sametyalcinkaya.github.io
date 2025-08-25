#include<iostream>
#include<clocale> // TÜRKÇE KARAKTER :) KULLANMAK ;)
// ÝKÝLÝ ARAMA AÐACI YAPISI (BÝNARY SEARCH TREE)
using namespace std;

class node{  // düðümün özelliklerini tanýmlayan sýnýf
	public:
		node * left; // solu gösteren pointer
		node * right; // saðý gösteren pointer
		int data; // nesnenin içinde ki veri taþýdýðý data
	node(int data = 0) // kurucu fonk. varsayýlan deðer sýfýr
	{
		this->data = data; //kullanýcýdan gelen data sýnýfýn  datasýna atanýr
		left = NULL; 
		right = NULL;
	}
};

// AÐAÇý oluþturan sýnýf  
class tree{
	public:
		node * root; // Baþý gösterecek pointer 
	tree() // kurucu fonk
	{
	root = NULL; 
	}
	
	// boþ olduðunu kontrol eden fonk
	bool bosmu()
	{
		return root==NULL;
	}
	
	
	// Aðaca eleman ekleme fonksiyonu ikili arama aðacý 
	node *ekle(node *start , int data)
	{	
    	if(start != NULL)
    	{
	    	if(data < start->data) // sol tarafa küçük deðerler
	    	start->left =  ekle(start->left,data);
	    	else
	    	start->right = ekle(start->right,data); // sað tarafa büyük deðerler
		}
		else
		{
			return new node(data); // eklenecek yere geldiðinde oraya elemaný oluþturul
		}
   		return start; 
	}
	// Aðaca eleman ekleme fonksiyonuna götürecek fonksiyon 
	void ekle(int data)
	{
		system("cls"); // gereksiz sadece ekraný temizler düzgün görünüm için
		root = ekle(root,data); // eklenecek deðer root pointerýndan baþlayýp, yukarda ki ekle fonksiyonuna iþaret eder
	}

	
	// Aðacý ekrana yazdýrma fonksiyonu 
	void preorder(node * root)
	{
		if(root != NULL)
		{
			cout<<root->data<<" ";
			preorder(root->left); // önce kök sonra sol sonra sað
			preorder(root->right);
		}
	}
	
	// Aðacý ekrana yazdýrma fonksiyonu
	void inorder(node * root)
	{
		if(root != NULL)
		{
			inorder(root->left);
			cout<<root->data<<" "; // sol orta kök sonra sað
			inorder(root->right);
		}
	}
	
	// Aðacý ekrana yazdýrma fonksiyonu
	void postorder(node * root)
	{
		if(root != NULL)
		{
			postorder(root->left);
			postorder(root->right); // sol sonra sað en son kök
			cout<<root->data<<" ";
		}
	}
	
	// Aðaçtaki toplam düðüm sayýsý
	int dugumsayi(node * root)
	{
		system("cls");
		if(root==NULL)
		return 0;
		else
		return  1 + dugumsayi(root->left) + dugumsayi(root->right);
	}
	
	
	// Agacýn Yüksekliði
	int yukseklik(node * root)
	{
		system("cls");
		if(root == NULL)
		return 0;
		else
		{
			int sag,sol;
			sol = yukseklik(root->left);
			sag = yukseklik(root->right);
			if(sol > sag)
			return sol + 1;
			else
			return sag + 1;
		}
	}
	
	int enkucuk(node * root)
	{
		system("cls");
		node * temp = root;
		if(temp == NULL)
		return 0;
		else
		{
			while(temp -> left != NULL)
			temp = temp -> left;
			
			return temp->data;
		}
	}
	
	int enbuyuk(node * root)
	{
		system("cls");
		node * temp = root;
		if(temp == NULL)
		return 0;
		else
		{
			while(temp -> right != NULL)
			temp = temp -> right;
			
			return temp->data;
		} 
	}
	
	// Aðaç üzerinde arama iþlemi istenilen deðer mevcut veya deðil
	node * arama (node * root, int data)
	{
		if(root != NULL)
		{
			if(root->data==data)
			return root;
			else if( data < root -> data )
			arama(root->left , data);
			else
			arama(root->right , data);
		}
		else
		{
			return NULL;
		}
		       
	}
	
	// Aðac üzerinde silme fonksiyonu istenilen deðer siler
	node * remove(node * start,int x)
	{
		if(start == NULL)
		{
			cout<<"AÐAÇ BOÞ VEYA HATALI DEÐER GÝRDÝNÝZ"<<endl;
			return NULL;
		}
		if(start -> data == x)
		{
			if(start -> left == start->right)
			{
				delete start;
				cout<<endl<<x<<" SÝLÝNDÝ YAPRAK DÜÐÜM "<<endl;
				return NULL;
			}
			else if(start -> left == NULL)
			{
				node * temp = start->right;
				delete start;
				cout<<endl<<x<<" SÝLÝNDÝ SOLU NULL SAÐI DOLU"<<endl;
				return temp;
			}
			else if(start -> right == NULL)
			{
				node * temp = start->left;
				delete start;
				cout<<endl<<x<<" SÝLÝNDÝ SAÐI NULL SOLU DOLU"<<endl;
				return temp;
			}
			else
			{
				node *p , *q;
				p = q = start->right;
				while(p -> left != NULL)
				{
					p = p -> left;
				}
				p -> left = start -> left;
				delete start;
				cout<<endl<<x<<" SÝLÝNDÝ SAÐI VE SOLU DOLU EBEVEYN DÜÐÜM"<<endl;
				
				return q;
			}	
		}
		else if ( x < start -> data )
		{
			start -> left = remove(start -> left , x);
		}
		else
		{
			start -> right = remove(start -> right , x);
		}
		return start;
	}



/*
// ALTERNATÝF BÝR KULLANIM AMA SORUN ÇIKARIYOR SÝLME FONKSÝYONU
node * removem(node * start, int data)
{
    if (start == NULL)
    {
        cout << "AÐAÇ BOÞ" << endl;
        return NULL;
    }

    if (data < start->data)
    {
        start->left = removem(start->left, data);
    }
    else if (data > start->data)
    {
        start->right = removem(start->right, data);
    }
    else
    {
        if (start->left == NULL)
        {
            node *temp = start->right;
            delete start;
            return temp;
        }
        else if (start->right == NULL)
        {
            node *temp = start->left;
            delete start;
            return temp;
        }
        else
        {
            node *p = start->right;
            node *parent = NULL;

            while (p->left != NULL)
            {
                parent = p;
                p = p->left;
            }

            if (parent != NULL)
            {
                parent->left = p->right;
                p->right = start->right;
            }

            p->left = start->left;
            delete start;
            return p;
        }
    }

    return start;
}

*/




};

/*
node* ekle(node* start, int data) {
    if (start != NULL) {
        if (data < start->data)
            start->left = ekle(start->left, data);
        else
            start->right = ekle(start->right, data);
    } else {
        return new node(data);
    }
    return start;  // Güncelleme: return root; deðil, return start; olmalý
}
*/







int main()
{

setlocale(LC_ALL,"Turkish"); // TÜRKÇE KARAKTER :) KULLANMAK ;)



tree te;
int sayi,secim;
cout<<"MERHABA AÐAÇ YAPISINA HOÞ GELDÝNÝZ :)"<<endl<<endl;




// DÜZENLÝ FONKSÝYONLAR ÇAÐIRMA
while(1)
{
	cout<<"1 -%-  AÐACA ELEMAN EKLE"<<endl;
	cout<<"2 -%-  AÐACDAN ELEMAN SÝLME"<<endl;
	cout<<"3 -%-  AÐACDA KÝ ELEMANLARI YAZDIRMA"<<endl;
	cout<<"4 -%-  AÐACDA ELEMAN ARAMA"<<endl;
	cout<<"5 -%-  AÐACDA KÝ EN BÜYÜK ELEMAN"<<endl;
	cout<<"6 -%-  AÐACDA KÝ EN KÜÇÜK ELEMAN"<<endl;
	cout<<"7 -%-  AÐACIN YÜKSEKLÝÐÝ"<<endl;
	cout<<"8 -%-  AÐACADA KÝ DÜÐÜM SAYISI"<<endl;
	cout<<"9 -%-  AÐAC BOÞ MU?"<<endl;
	cout<<"0 -%-  ÇIKIÞ!!!!!!"<<endl;
	cout<<"TERCÝHÝNÝZ ---> "; cin>>secim;
switch(secim)
{
case 1 :
	cout<<"EKLEMEK ÝSTEDÝÐÝNÝZ SAYI : ";
	cin>>sayi;
	te.ekle(sayi);
break;

case 2 :
	cout<<"SÝLMEK ÝSTEDÝÐÝNÝZ SAYI : ";
	cin>>sayi;
	te.root = te.remove(te.root,sayi);
break;

case 3 :
	cout<<"PreOrder (Önce Kök) :   "; te.preorder(te.root);
    cout<<endl;
	cout<<"ÝnOrder (Orta Kök) :    "; te.inorder(te.root);
 	cout<<endl;
	cout<<"PostOrder (Sonda Kök) : "; te.postorder(te.root);
	cout<<endl;
break;

case 4 :
	cout<<"ARAMAK ÝSTEDÝÐÝNÝZ SAYI : ";
	cin>>sayi;
	te.arama(te.root,sayi);
	cout<<endl;
	if(te.arama(te.root,sayi)==NULL)
	cout<<"DEÐER MEVCUT DEÐÝL"<<endl;
	else
	cout<<"VAR  "<<endl;	
break;

case 5 :
	cout<<"EN BÜYÜK : "<<te.enbuyuk(te.root);
	cout<<endl;
break;

case 6 :
	cout<<"EN KÜÇÜK : "<<te.enkucuk(te.root);	
	cout<<endl;
break;

case 7 :
	cout<<"YÜKSEKLÝK : "<<te.yukseklik(te.root);
    cout<<endl;
break;

case 8 :
	cout<<"DÜÐÜM SAYISI : "<<te.dugumsayi(te.root);
	cout<<endl;
break;

case 9 :
	if(te.bosmu()==1)
	cout<<"<-- AÐAÇ BOÞ -->"<<endl;
	else
	cout<<"<-- AÐAÇ DOLU -->"<<endl;
break;

case 0 :
	return 0;
break;

default :
cout<<"!!! -> HATALI ÝÞLEM YAPTINIZ TEKRAR DENEYÝNÝZ <- !!!"<<endl;

}	
		
}









/*





	tree te;
	
	te.ekle(10);
//	te.ekle(20);
	te.ekle(5);

	//te.ekle(3);
	//te.ekle(3);
	//te.ekle(23);
	//te.ekle(21);

cout<<"PreOrder (Önce kök) :   "; te.preorder(te.root);
cout<<endl;
cout<<"ÝnOrder (Orta Kök) :    "; te.inorder(te.root);
cout<<endl;
cout<<"PostOrder (Sonda Kök) : "; te.postorder(te.root);
cout<<endl;
cout<<"Düðüm Sayýsý : "<<te.dugumsayi(te.root);
cout<<endl;
cout<<"Yükseklik : "<<te.yukseklik(te.root);
cout<<endl;
cout<<"En Büyük : "<<te.enbuyuk(te.root);
cout<<endl;
cout<<"En Küçük : "<<te.enkucuk(te.root);	
cout<<endl;
cout<<"Aranan sayý (30)? :  "<<te.arama(te.root,30);
cout<<endl;
if(te.arama(te.root,30)==NULL)
cout<<"DEÐER MEVCUT DEÐÝL"<<endl;
else
cout<<"VAR : "<<te.root->data;


te.root = te.remove(te.root,10);

cout<<endl;
cout<<"PreOrder (Önce kök) :   "; te.preorder(te.root);

//te.root = te.remove(te.root,20);

//cout<<endl;
//cout<<"PreOrder (Önce kök) :   "; te.preorder(te.root);

te.root = te.remove(te.root,5);

cout<<endl;
cout<<"PreOrder (Önce kök) :   "; te.preorder(te.root);

//te.root = te.remove(te.root,75);

//cout<<endl;
//cout<<"PreOrder (Önce kök) :   "; te.preorder(te.root);

/*-te.root = te.remove(te.root,40);

cout<<endl;
cout<<"PreOrder (Önce kök) :   "; te.preorder(te.root);


te.root = te.remove(te.root,30);

cout<<endl;
cout<<"PreOrder (Önce kök) :   "; te.preorder(te.root);
*/

// preorder(önce kök)
// inorder(orta kök)
// postorder(sonda kök)



/*

*/

	
	
return 0;
}
