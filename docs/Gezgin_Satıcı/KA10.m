clc; clear; close all;
% Veri Okuma
% Mesafe matrisini okuyoruz (81x81)
distanceMatrix = xlsread('mesafe1.xlsx');
% CSV dosyasından şehir isimlerini ve koordinatlarını okuyoruz.
data = readtable('il.csv');
% Şehir isimleri ikinci sütunda yer alıyor: "il_adi"
cityNames = table2cell(data(:,2));  
% Enlem bilgisi 3. sütun, boylam bilgisi 4. sütun
lat = data{:,3};                    
lon = data{:,4};                    
% Şehir sayısı
numCities = length(cityNames);


% Kullanıcıdan başlangıç şehrini alın
startCity = input('Başlangıç şehrini girin: ', 's'); % kullanıcıdan şehir adı alıyoruz

% Başlangıç şehri için indeks bulma
startIndex = find(strcmpi(cityNames, startCity)); % büyük/küçük harf duyarsız arama
if isempty(startIndex)
    error('%s şehri il.csv dosyasında bulunamadı.', startCity);
end


% ACO Parametreleri
numAnts = numCities;     % Her şehirden bir karınca olacak şekilde
numIterations = 100;     % İterasyon sayısı (isteğe bağlı değiştirilebilir)
alpha = 1;               % Pheromone etkisi(feromon)
beta = 5;                % Heuristik (mesafe) etkisi
rho = 0.5;               % Buharlaşma oranı
Q = 100;                 % Pheromone deposit sabiti

% Pheromone(feromon) matrisi başlangıç değeri
tau = ones(numCities, numCities);
% Heuristik bilgi: 1/mesafe 
%(mesafe 0 olanlar için sonsuz olmaması adına küçük değer atanıyor)
eta = 1./(distanceMatrix + eps); % eps, bölme hatalarını önlemek için
% En iyi çözümü saklamak için değişkenler
bestRoute = [];
bestRouteLength = Inf;


% ACO Algoritması
for iter = 1:numIterations
    routes = zeros(numAnts, numCities+1); 
     % her karınca için rota (döngüsel: başlangıç ve bitiş aynı)
    routeLengths = zeros(numAnts, 1);
    
    % Her karınca için başlangıç rotasını oluştur
    for k = 1:numAnts
        % Rota başlangıcı: kullanıcının seçtiği şehir
        currentCity = startIndex;
        unvisited = 1:numCities;
        unvisited(unvisited == currentCity) = [];
        route = currentCity;
        
        % Şehirleri gez
        for step = 1:(numCities-1)
            probs = zeros(1, length(unvisited));
            % Her aday şehir için geçiş olasılığı hesapla
            for j = 1:length(unvisited)
                nextCity = unvisited(j);
                probs(j) = (tau(currentCity, nextCity)^alpha) * (eta(currentCity, nextCity)^beta);
            end
            % Olasılıkları normalize et
            probs = probs / sum(probs);




            % Rastgele seçim yap (rulet tekerleği yöntemi)
            cumulativeProbs = cumsum(probs);
            r = rand;
            selectedIndex = find(cumulativeProbs >= r, 1, 'first');
            nextCity = unvisited(selectedIndex);
            
            route = [route, nextCity];
            currentCity = nextCity;
            unvisited(unvisited == nextCity) = [];
        end
        

        % Rota kapatılıyor (başlangıç şehrine geri dönüş)
        route = [route, startIndex];
        routes(k, :) = route;
        
        % Rotanın toplam uzunluğunu hesapla
        L = 0;
        for i = 1:(length(route)-1)
            L = L + distanceMatrix(route(i), route(i+1));
        end
        routeLengths(k) = L;
        
        % En iyi çözümü güncelle
        if L < bestRouteLength
            bestRouteLength = L;
            bestRoute = route;
        end
    end
    % Pheromone buharlaşması
    tau = (1 - rho) * tau;


    % Her karıncanın bıraktığı pheromone'u ekle
    for k = 1:numAnts
        route = routes(k, :);
        L = routeLengths(k);
        deltaTau = Q / L;
        for i = 1:(length(route)-1)
            from = route(i);
            to = route(i+1);
            tau(from, to) = tau(from, to) + deltaTau;
            tau(to, from) = tau(to, from) + deltaTau; % simetrik problem
        end
    end
    % İterasyon sonunda isteğe bağlı sonuçları ekrana yazdırabilirsiniz
    fprintf('İterasyon %d: En iyi rota uzunluğu = %.2f km\n', iter, bestRouteLength);
end


% Sonuçların Ekrana Yazdırılması (Anlatımlı)
fprintf('\nEn iyi rota:\n');
totalDistance = 0;
for i = 1:length(bestRoute)-1
    fromCity = cityNames{bestRoute(i)};
    toCity = cityNames{bestRoute(i+1)};
    dist = distanceMatrix(bestRoute(i), bestRoute(i+1));
    totalDistance = totalDistance + dist;
    fprintf('%s''dan %s''a %.2f km gitti. Toplam: %.2f km\n', fromCity, toCity, dist, totalDistance);
end


% Grafik Çizme
figure;
hold on;
% Şehirleri nokta olarak çizme
scatter(lon, lat, 50, 'filled');
% Şehir isimlerini ekleme
for i = 1:numCities
    text(lon(i)+0.1, lat(i)+0.1, cityNames{i}, 'FontSize', 8);
end

% En iyi rotayı çizme 
for i = 1:length(bestRoute)-1
    idx1 = bestRoute(i);
    idx2 = bestRoute(i+1);
    % Çizgi çiz
    plot([lon(idx1) lon(idx2)], [lat(idx1) lat(idx2)], 'r-', 'LineWidth', 1.5);
    % Ok eklemek için quiver kullanılabilir
    % Delta hesapla
    dx = lon(idx2) - lon(idx1);
    dy = lat(idx2) - lat(idx1);
    quiver(lon(idx1), lat(idx1), dx, dy, 0, 'Color', 'b', 'MaxHeadSize', 0.5);
end
title('Başlangıç Şehrinden Tüm Türkiye''yi Gezen Gezgin Rotası');
xlabel('Boylam');
ylabel('Enlem');
grid on;
hold off;
