function ozellikHaritasi=LeNext(res)
    res=imresize(res,[32,32]);
    res=double(res);
    res = (res(:,:,1)+res(:,:,2)+res(:,:,3)) / 3;
    %  C A M C A M F
    f1 = round(rand(5,5,6)*10)-5;
    t1 = konv(res,f1);
    t1(find(t1<0)) = 0;
    t2=max_pooling(t1,2);
    %Bir sonraki katmana gecmeden önce ortalama al
    tp = zeros(14);
    for i=1:size(t2,3)
        tp=tp+t2(:,:,i);
    end
    in2 = tp/6;
    f2 = round(rand(5,5,16)*10)-5;
    t3 = konv(in2,f2);
    t3(find(t3<0)) = 0;
    t4=max_pooling(t3,2);
    ozellikHaritasi=t4(:)';
end




