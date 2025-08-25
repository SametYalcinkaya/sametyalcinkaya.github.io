clc,clear all,close all;
res=imread('football.jpg');
res=imresize(res,[224,224]);
sayac=0;
for i=1:32:224
    for j=1:32:224
        yama=res(i:i+31,j:j+31,:);
        ft(sayac*400+1:(sayac+1)*400)=LeNext(yama);
        sayac=sayac+1;
    end
end