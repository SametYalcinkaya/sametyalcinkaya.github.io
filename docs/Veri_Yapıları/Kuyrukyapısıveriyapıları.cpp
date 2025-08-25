#include<iostream>
#include<clocale> // SADECE T�RK�E KARAKTER KULLANMAK ���N EKLENM�� K�T�PHANE :)
using namespace std;
#define SIZE 15 // Kuyru�un alabilece�i maks uzunluk i�in varsay�lan de�er

// KUYRUK YAPISI �ZEL B�R T�R DO�RUSAL BA�IL L�STE G�B�D�R 
// �ZELL�KLER� VARDIR : ELEMAN EKLERKEN SONA EKLEN�R , ELEMAN S�L�N�RKEN BA�TAN S�L�N�R
// First-In-First-Out (FIFO) mant��� uygulan�r
class node{ // kuyrukta her bir d���m�n tan�m�n� yapan class
	public:
		int data;
		node *next;
		node(int data=0)
		{
			this->data=data;
			next=NULL;
		}
};

class quenu{ // kuyru�u olu�turan class
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
			cout<<"Kuyruk olu�turuldu ilk eleman eklendi"<<endl;
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
			cout<<"Kuyruk bo� ��kacak bir �ey yok"<<endl;
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
			cout<<"Birden fazla d���m� olan kuyruktan eleman silindi (�LK G�REN �LK �IKAR)"<<endl;
			sayac--;
		    }
		}
	}
	void goster()
	{
		system("cls");
		if(bosmu())
		{
			cout<<"Kuyruk bo� YAZDIRILACAK eleman yok"<<endl;
		}
		else
		{
		node *tempp= root;
		cout<<"BA�"<<endl;
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
			cout<<"Kuyruk bo�"<<endl;
		}
		else
		{
			while(!bosmu())
			{
				cikar();
			}
		}
		cout<<"��LEM TAMAMLANDI TAMAMEN TEM�Z"<<endl;
	}
	void sayackac()
	{
		system("cls");
		if(bosmu())
		{
			cout<<"Kuyruk bo�"<<endl;
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
	cout<<"1-) kuyruk bosmu kontrol et\n2-) kuyruk dolumu kontrol et\n3-) Eleman ekle\n4-) Eleman ��kar\n5-) Kuyrugu g�ster\n6-) Kuyrugu temizle\n7-) Eleman say�s�\n0-) ��k��\n\n\n"<<endl;
	cout<<"TERC�H�N�Z ---> ";
	cin>>islem;
	switch(islem)
	{
	
	case 1: cout<<kuyruk.bosmu()<<endl;
	break;
	case 2: cout<<kuyruk.fuulmu()<<endl;
	break;
	case 3:
	int x;
	cout<<"Eleman� Gir :"; cin>>x; 
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
	cout<<"HATALI ��LEM TEKRAR DENE"; break;
    }
	
    } 
	
	
return 0;
}
