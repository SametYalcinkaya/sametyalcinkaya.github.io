function maxtens = max_pooling(tensor,adim)
    for k=1:size(tensor,3)
        satir=1;
        for i=1:adim:size(tensor,1)-adim+1
            sutun=1;
            for j=1:adim:size(tensor,2)-adim+1
                blok = tensor(i:i+adim-1,j:j+adim-1,k);
                deger=max(blok(:));
                maxtens(satir,sutun,k)=deger;
                sutun=sutun+1;
            end
            satir=satir+1;
        end
    end
end
