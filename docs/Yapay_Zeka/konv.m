function tensorr = konv(yres,f1)
    for k=1:size(f1,3)
        for i=1:size(yres,1)-size(f1,1)+1
            for j=1:size(yres,2)-size(f1,2)+1
                blok=yres(i:i+size(f1,1)-1,j:j+size(f1,2)-1);
                de = blok.*f1(:,:,k);
                tensorr(i,j,k)=sum(de(:));
            end
        end
    end
end
