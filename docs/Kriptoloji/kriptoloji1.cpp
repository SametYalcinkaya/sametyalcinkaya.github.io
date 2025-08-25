#include <iostream>
#include <string.h>
using namespace std;

int bul(char a,string alfabe)
{

	for(int i=0;i<alfabe.length();i++)
	{
		if(alfabe[i]==a)
			return i;
	}
	
	return -1;
}


int main() 
{
	string alfabe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";	
	string ters_alfabe = "ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba";
	
	char metin[100];
	char s_metin[100];
	char c_metin[100];
	
	cout<<"Metin giriniz:";
	gets(metin);
	int sira;
	
	for(int i=0;i<strlen(metin);i++)
	{
		sira = bul(metin[i],alfabe);
		if(sira!=-1)
			s_metin[i] = ters_alfabe[sira];
		else
			s_metin[i] = metin[i];
	}
	
	for(int i=0;i<strlen(s_metin);i++)
		cout<<s_metin[i];
	cout<<endl;

	
	for(int i=0;i<strlen(s_metin);i++)
	{
		sira = bul(s_metin[i],ters_alfabe);
		if(sira!=-1)
			c_metin[i] = alfabe[sira];
		else
			c_metin[i] = s_metin[i];
	}
	
	for(int i=0;i<strlen(s_metin);i++)
		cout<<c_metin[i];
	return 0;
}

