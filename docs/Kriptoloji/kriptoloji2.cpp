#include <iostream>

using namespace std;

string sezar_sifrele(string metin, int anahtar)
{
	anahtar = anahtar % 26;
	
	for(int i=0;i<metin.length();i++)
	{
		if(metin[i]>=65 && metin[i]<=90) // buyuk harf ise
		{
			if(metin[i]+anahtar>'Z')
				metin[i]= ((metin[i]+anahtar)%91)+65; // Z den sonra ba?a ?teler
			else
				metin[i] = metin[i]+anahtar;
		}
		else if(metin[i]>=97 && metin[i]<=122) // kucuk harf ise
		{
			if(metin[i]+anahtar>'z')
				metin[i]= ((metin[i]+anahtar)%123)+97; // z den sonra ba?a ?teler
			else
				metin[i] = metin[i]+anahtar;
		}
			
	}
	return metin;
}

string sezar_coz(string metin, int anahtar)
{
	anahtar = anahtar % 26;
	
	for(int i=0;i<metin.length();i++)
	{
		if(metin[i]>=65 && metin[i]<=90) // buyuk harf ise
		{
			if(metin[i]-anahtar<'A')
				metin[i]= (metin[i]-anahtar)+26; // A dan sonra sona ?teler
			else
				metin[i] = metin[i]-anahtar;
		}
		else if(metin[i]>=97 && metin[i]<=122) // kucuk harf ise
		{
			if(metin[i]-anahtar<'a')
				metin[i]= (metin[i]-anahtar)+26; // a dan sonra sona ?teler
			else
				metin[i] = metin[i]-anahtar;
		}
	}
	return metin;
}


int main() 
{
	string metin,sifreli;
	int anahtar;
	cout<<"Metin girin:";
	cin>>metin;
	cout<<"Anahtar girin:";
	cin>>anahtar;	
	
	sifreli = sezar_sifrele(metin,anahtar);
	
	cout<<"Sifreli:"<<sifreli<<endl;
	
	cout<<"Cozulmus:"<<sezar_coz(sifreli,anahtar);
		
	return 0;
}

