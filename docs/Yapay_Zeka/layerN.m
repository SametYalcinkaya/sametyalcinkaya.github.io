function ln = layerN(tensor)
    for i=1:size(tensor,1)
        for j=1:size(tensor,2)
            A = tensor(,ij,:);
            A = (A-mean(A)) / (std(A)+eps);
            ln(i,j,:)=A;
        end
    end
end

