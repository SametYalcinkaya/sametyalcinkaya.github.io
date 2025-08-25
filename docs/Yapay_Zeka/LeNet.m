clc, clear all,close all;
% LeNet kodu
res = imread('football.jpg');
res = imresize(res,[32,32]);
res = (res(:,:,1)+res(:,:,2)+res(:,:,3)) / 3;
res = double(res);
%  C A M C A M F
f1 = round(rand(5,5,6)*10)-5;
% Convolotion 
t1 = konv(res,f1);
% Aktivasyon
t1(find(t1<0)) = 0;
%Maximum Pooling
t2=max_pooling(t1,2);
tp = zeros(size(t2(:,:,1)));
% ortalama alma
for i=1:size(t2,3)
        tp=tp+t2(:,:,i);
end
in2 = tp/3;
%filtre sayisi
f2=round(rand(5,5,16)*10)-5;
%Convolotion
t3=konv(in2,f2);
%Aktivasyon
t3(find(t3<0))=0;
%Maximum Pooling
t4=max_pooling(t3,2);
%Flatten işlemi(düzleştirme)
ozellik_haritasi=t4(:)';
