#include <iostream>
#include <string.h>

using namespace std;


string vig_sifrele(string metin, string anahtar,char matris[26][26])
{
	int satir,sutun,k=0;
	for(int i=0;i<metin.length();i++)
	{
		satir = metin[i]%65;
		sutun = anahtar[k%anahtar.length()]%65;
		k++;	
		metin[i] = matris[satir][sutun];
	}
	
	return metin;
}



int main() 
{
	char matris[26][26];
	string metin,sifreli,anahtar;
	for(int i=65;i<=90;i++)
	{
		for(int j=0;j<26;j++)
		{
			if(i+j>90)
				matris[i%65][j] = char(((i+j)%91)+65);
			else
				matris[i%65][j] = char(i+j);
			
			cout<<matris[i%65][j]<<" ";
		}
		cout<<endl;
	}
	
	cout<<"metin girin:";
	cin>>metin;
	
	cout<<"anahtar girin:";
	cin>>anahtar;
	
	sifreli = vig_sifrele(metin,anahtar,matris);
	
	cout<<"sifreli:"<<sifreli;
	
	
	
	return 0;
}

