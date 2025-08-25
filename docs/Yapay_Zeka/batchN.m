function bn = batchN(tensor)
    for i=1:size(tensor,3)
        A = tensor(:,:,i);
        A = (A-min(A(:))) ./ (max(A(:))-min(A(:) + eps));
        bn(:,:,i)=A;
    end
end
