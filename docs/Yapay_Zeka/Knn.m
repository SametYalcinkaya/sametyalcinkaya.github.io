clc; clear; close all;
X = [1.0 2.0;
     1.5 1.8;
     2.0 2.2;
     3.0 3.0;
     3.5 2.8;
     4.0 4.0];
labels = {'A'; 'A'; 'A'; 'B'; 'B'; 'B'}; 
test_point = [2.5, 2.5];
k = 3;  
m = 3; 
uzaklik = zeros(6,1);
for i = 1:6
    uzaklik(i) = ( abs(X(i,1) - test_point(1))^m + abs(X(i,2) - test_point(2))^m )^(1/m);
end
[~, idx] = sort(uzaklik);
en_yakin = labels(idx(1:k));
tahmin_sonuc = mode(categorical(en_yakin));
disp(['Tahmin edilen sınıf: ', char(tahmin_sonuc)]);


