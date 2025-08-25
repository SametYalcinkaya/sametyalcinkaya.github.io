#include<iostream>
#include<clocale> // T�RK�E KARAKTER :) KULLANMAK ;)
// �K�L� ARAMA A�ACI YAPISI (B�NARY SEARCH TREE)
using namespace std;

class node{  // d���m�n �zelliklerini tan�mlayan s�n�f
	public:
		node * left; // solu g�steren pointer
		node * right; // sa�� g�steren pointer
		int data; // nesnenin i�inde ki veri ta��d��� data
	node(int data = 0) // kurucu fonk. varsay�lan de�er s�f�r
	{
		this->data = data; //kullan�c�dan gelen data s�n�f�n  datas�na atan�r
		left = NULL; 
		right = NULL;
	}
};

// A�A�� olu�turan s�n�f  
class tree{
	public:
		node * root; // Ba�� g�sterecek pointer 
	tree() // kurucu fonk
	{
	root = NULL; 
	}
	
	// bo� oldu�unu kontrol eden fonk
	bool bosmu()
	{
		return root==NULL;
	}
	
	
	// A�aca eleman ekleme fonksiyonu ikili arama a�ac� 
	node *ekle(node *start , int data)
	{	
    	if(start != NULL)
    	{
	    	if(data < start->data) // sol tarafa k���k de�erler
	    	start->left =  ekle(start->left,data);
	    	else
	    	start->right = ekle(start->right,data); // sa� tarafa b�y�k de�erler
		}
		else
		{
			return new node(data); // eklenecek yere geldi�inde oraya eleman� olu�turul
		}
   		return start; 
	}
	// A�aca eleman ekleme fonksiyonuna g�t�recek fonksiyon 
	void ekle(int data)
	{
		system("cls"); // gereksiz sadece ekran� temizler d�zg�n g�r�n�m i�in
		root = ekle(root,data); // eklenecek de�er root pointer�ndan ba�lay�p, yukarda ki ekle fonksiyonuna i�aret eder
	}

	
	// A�ac� ekrana yazd�rma fonksiyonu 
	void preorder(node * root)
	{
		if(root != NULL)
		{
			cout<<root->data<<" ";
			preorder(root->left); // �nce k�k sonra sol sonra sa�
			preorder(root->right);
		}
	}
	
	// A�ac� ekrana yazd�rma fonksiyonu
	void inorder(node * root)
	{
		if(root != NULL)
		{
			inorder(root->left);
			cout<<root->data<<" "; // sol orta k�k sonra sa�
			inorder(root->right);
		}
	}
	
	// A�ac� ekrana yazd�rma fonksiyonu
	void postorder(node * root)
	{
		if(root != NULL)
		{
			postorder(root->left);
			postorder(root->right); // sol sonra sa� en son k�k
			cout<<root->data<<" ";
		}
	}
	
	// A�a�taki toplam d���m say�s�
	int dugumsayi(node * root)
	{
		system("cls");
		if(root==NULL)
		return 0;
		else
		return  1 + dugumsayi(root->left) + dugumsayi(root->right);
	}
	
	
	// Agac�n Y�ksekli�i
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
	
	// A�a� �zerinde arama i�lemi istenilen de�er mevcut veya de�il
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
	
	// A�ac �zerinde silme fonksiyonu istenilen de�er siler
	node * remove(node * start,int x)
	{
		if(start == NULL)
		{
			cout<<"A�A� BO� VEYA HATALI DE�ER G�RD�N�Z"<<endl;
			return NULL;
		}
		if(start -> data == x)
		{
			if(start -> left == start->right)
			{
				delete start;
				cout<<endl<<x<<" S�L�ND� YAPRAK D���M "<<endl;
				return NULL;
			}
			else if(start -> left == NULL)
			{
				node * temp = start->right;
				delete start;
				cout<<endl<<x<<" S�L�ND� SOLU NULL SA�I DOLU"<<endl;
				return temp;
			}
			else if(start -> right == NULL)
			{
				node * temp = start->left;
				delete start;
				cout<<endl<<x<<" S�L�ND� SA�I NULL SOLU DOLU"<<endl;
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
				cout<<endl<<x<<" S�L�ND� SA�I VE SOLU DOLU EBEVEYN D���M"<<endl;
				
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
// ALTERNAT�F B�R KULLANIM AMA SORUN �IKARIYOR S�LME FONKS�YONU
node * removem(node * start, int data)
{
    if (start == NULL)
    {
        cout << "A�A� BO�" << endl;
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
    return start;  // G�ncelleme: return root; de�il, return start; olmal�
}
*/







int main()
{

setlocale(LC_ALL,"Turkish"); // T�RK�E KARAKTER :) KULLANMAK ;)



tree te;
int sayi,secim;
cout<<"MERHABA A�A� YAPISINA HO� GELD�N�Z :)"<<endl<<endl;




// D�ZENL� FONKS�YONLAR �A�IRMA
while(1)
{
	cout<<"1 -%-  A�ACA ELEMAN EKLE"<<endl;
	cout<<"2 -%-  A�ACDAN ELEMAN S�LME"<<endl;
	cout<<"3 -%-  A�ACDA K� ELEMANLARI YAZDIRMA"<<endl;
	cout<<"4 -%-  A�ACDA ELEMAN ARAMA"<<endl;
	cout<<"5 -%-  A�ACDA K� EN B�Y�K ELEMAN"<<endl;
	cout<<"6 -%-  A�ACDA K� EN K���K ELEMAN"<<endl;
	cout<<"7 -%-  A�ACIN Y�KSEKL���"<<endl;
	cout<<"8 -%-  A�ACADA K� D���M SAYISI"<<endl;
	cout<<"9 -%-  A�AC BO� MU?"<<endl;
	cout<<"0 -%-  �IKI�!!!!!!"<<endl;
	cout<<"TERC�H�N�Z ---> "; cin>>secim;
switch(secim)
{
case 1 :
	cout<<"EKLEMEK �STED���N�Z SAYI : ";
	cin>>sayi;
	te.ekle(sayi);
break;

case 2 :
	cout<<"S�LMEK �STED���N�Z SAYI : ";
	cin>>sayi;
	te.root = te.remove(te.root,sayi);
break;

case 3 :
	cout<<"PreOrder (�nce K�k) :   "; te.preorder(te.root);
    cout<<endl;
	cout<<"�nOrder (Orta K�k) :    "; te.inorder(te.root);
 	cout<<endl;
	cout<<"PostOrder (Sonda K�k) : "; te.postorder(te.root);
	cout<<endl;
break;

case 4 :
	cout<<"ARAMAK �STED���N�Z SAYI : ";
	cin>>sayi;
	te.arama(te.root,sayi);
	cout<<endl;
	if(te.arama(te.root,sayi)==NULL)
	cout<<"DE�ER MEVCUT DE��L"<<endl;
	else
	cout<<"VAR  "<<endl;	
break;

case 5 :
	cout<<"EN B�Y�K : "<<te.enbuyuk(te.root);
	cout<<endl;
break;

case 6 :
	cout<<"EN K���K : "<<te.enkucuk(te.root);	
	cout<<endl;
break;

case 7 :
	cout<<"Y�KSEKL�K : "<<te.yukseklik(te.root);
    cout<<endl;
break;

case 8 :
	cout<<"D���M SAYISI : "<<te.dugumsayi(te.root);
	cout<<endl;
break;

case 9 :
	if(te.bosmu()==1)
	cout<<"<-- A�A� BO� -->"<<endl;
	else
	cout<<"<-- A�A� DOLU -->"<<endl;
break;

case 0 :
	return 0;
break;

default :
cout<<"!!! -> HATALI ��LEM YAPTINIZ TEKRAR DENEY�N�Z <- !!!"<<endl;

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

cout<<"PreOrder (�nce k�k) :   "; te.preorder(te.root);
cout<<endl;
cout<<"�nOrder (Orta K�k) :    "; te.inorder(te.root);
cout<<endl;
cout<<"PostOrder (Sonda K�k) : "; te.postorder(te.root);
cout<<endl;
cout<<"D���m Say�s� : "<<te.dugumsayi(te.root);
cout<<endl;
cout<<"Y�kseklik : "<<te.yukseklik(te.root);
cout<<endl;
cout<<"En B�y�k : "<<te.enbuyuk(te.root);
cout<<endl;
cout<<"En K���k : "<<te.enkucuk(te.root);	
cout<<endl;
cout<<"Aranan say� (30)? :  "<<te.arama(te.root,30);
cout<<endl;
if(te.arama(te.root,30)==NULL)
cout<<"DE�ER MEVCUT DE��L"<<endl;
else
cout<<"VAR : "<<te.root->data;


te.root = te.remove(te.root,10);

cout<<endl;
cout<<"PreOrder (�nce k�k) :   "; te.preorder(te.root);

//te.root = te.remove(te.root,20);

//cout<<endl;
//cout<<"PreOrder (�nce k�k) :   "; te.preorder(te.root);

te.root = te.remove(te.root,5);

cout<<endl;
cout<<"PreOrder (�nce k�k) :   "; te.preorder(te.root);

//te.root = te.remove(te.root,75);

//cout<<endl;
//cout<<"PreOrder (�nce k�k) :   "; te.preorder(te.root);

/*-te.root = te.remove(te.root,40);

cout<<endl;
cout<<"PreOrder (�nce k�k) :   "; te.preorder(te.root);


te.root = te.remove(te.root,30);

cout<<endl;
cout<<"PreOrder (�nce k�k) :   "; te.preorder(te.root);
*/

// preorder(�nce k�k)
// inorder(orta k�k)
// postorder(sonda k�k)



/*

*/

	
	
return 0;
}
