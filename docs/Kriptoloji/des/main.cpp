#include <iostream>
#include <string.h>
#include "des_utils.h"
using namespace std;

string gercek_ikilik(int girdi,int bit)
{
	string sonuc="";
	int kalan;
	while(sonuc.length()<bit)
	{
		kalan = girdi%2;
		if(kalan==0)
			sonuc = "0" + sonuc;
		else
			sonuc = "1" + sonuc;
		girdi=girdi/2;
	}
	return sonuc;
}


string ikilik_yap(string girdi,int bit)
{
	string sonuc="";
	for(int i=0;i<girdi.length();i++)
	{
		sonuc = sonuc+gercek_ikilik(int(girdi[i]),bit);
	}
	
	return sonuc;
}

string permutation(string girdi,int tablo[],int boyut)
{
	string sonuc = "";
	for(int i=0;i<boyut;i++)
	{
		sonuc = sonuc+girdi[tablo[i]-1];
	}
	return sonuc;
}

string x_or(string girdi1,string girdi2)
{
	string sonuc = "";
	for(int i=0;i<girdi1.length();i++)
	{
		if(girdi1[i]==girdi2[i])
		{
			sonuc = sonuc+ "0";
		}
		else
		{
			sonuc = sonuc+ "1";
		}
	}
	return sonuc;
}

string sbox_isle(string girdi,int sira)
{
	
	string dort="";
	int satir = (int(girdi[0])-48)*2+int(girdi[5])-48;
	
	int sutun = (int(girdi[1])-48)*8+(int(girdi[2])-48)*4+(int(girdi[3])-48)*2+int(girdi[4])-48;
	
	int sayi = S[sira][satir][sutun];
	
	dort = gercek_ikilik(sayi,4);
	return dort;
}

string sbox(string girdi)
{
	string alti = "";
	string sonuc ="";
	for(int i=0;i<8;i++)
	{
		alti = girdi.substr(i*6,6);
		sonuc = sonuc + sbox_isle(alti,i);
	}
	
	sonuc = permutation(sonuc,P,32);
	return sonuc;
}

string kaydir(string girdi, int miktar)
{
	if(miktar==1)
	{
		char temp = girdi[0];
		for(int i=0;i<girdi.length()-1;i++)
		{
			girdi[i] = girdi[i+1];
		}
		girdi[girdi.length()-1] = temp;
	}
	else if(miktar==2)
	{
		char temp = girdi[0];
		char temp2 = girdi[1];
		for(int i=0;i<girdi.length()-2;i++)
		{
			girdi[i] = girdi[i+2];
		}
		girdi[girdi.length()-1] = temp2;
		girdi[girdi.length()-2] = temp;
	}
	
	return girdi;
}

string anahtar_olustur(string anahtar)
{
	string anahtarlar = "";
	anahtar = permutation(anahtar,pc_1,56);
	string c = anahtar.substr(0,anahtar.length()/2);
	string d = anahtar.substr(anahtar.length()/2,anahtar.length()/2);
	
	for(int i=0;i<16;i++)
	{
		c = kaydir(c,num_leftShift[i]);
		d = kaydir(d,num_leftShift[i]);
		anahtar = permutation(c+d,pc_2,48);
		anahtarlar = anahtarlar + anahtar;
	}
	
	return anahtarlar;
}




int main() 
{
	
	string metin = "SAMET";
	string anahtar = "SAMET";
	string ikilik = ikilik_yap(metin,8);
	string ikilik_anahtar = ikilik_yap(anahtar,8);
	string anahtarlar = anahtar_olustur(ikilik_anahtar);
	
	//initial permutation
	string perm = permutation(ikilik,IP_t,64);
	
	string sol = perm.substr(0,perm.length()/2);
	string sag = perm.substr(perm.length()/2,perm.length()/2);
	
	for(int i=0;i<16;i++)
	{
		//f fonksiyonu
		perm = permutation(sag,E_t,48);
		perm = x_or(perm,anahtarlar.substr(i*48,48));
		
		
		perm = sbox(perm);
		// f fonksiyonu bitti
		
		perm = x_or(sol,perm);
		
		sol = sag;
		sag = perm;
	}

	cout<<"acik data:"<<ikilik<<endl;
	perm = permutation(sag+sol,P_1,64);
	
	cout<<"sifreli data:"<<perm<<"   boyut:"<<perm.length();
	
	
	
	
	
	return 0;
}
