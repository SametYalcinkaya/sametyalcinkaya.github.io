function tensor = konvulas(yres, f1, adim)
    for k = 1:size(f1,3)
        ci = 1; 
        for i = 1:adim:(size(yres,1) - size(f1,1) + 1)
            cj = 1; 
            for j = 1:adim:(size(yres,2) - size(f1,2) + 1)
                blok = yres(i:i+size(f1,1)-1, j:j+size(f1,2)-1);
                de = blok .* f1(:,:,k);
                tensor(ci, cj, k) = sum(de(:));
                cj = cj + 1;
            end
            ci = ci + 1;
        end
    end
end
