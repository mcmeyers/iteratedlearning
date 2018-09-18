## Getting the 2D complexity table

K2D=read.table("K2D.csv",sep=",",dec=".",header=T,colClasses=c("character","numeric","numeric"))

# Reading 2D complexity of a matrix in the form "0000-1010-1111-1000"
K=function(str){
  x=subset(K2D,K2D$grid==str)
  return(x$K)
}

# transform a 4x4 matrix m into a string in the form AAAA-AAAA-AAAA-AAAA
mToS=function(m){
  s=paste(as.character(m[1,]),collapse="")
  for (i in 2:4){
    s=paste(c(s,"-"),collapse="")
    t=paste(as.character(m[i,]),collapse="") 
    s=paste(c(s,t),collapse="")
  }
  return(s)
}

# Extract a 4 by 4 matrix at (i,j) in m
pick=function(m,i=1,j=1){
  p=m[i:(i+3),j:(j+3)] 
  return(p)
}

#CHANGE TO COMPUTE FOR AN 8x8 MATRIX--WHAT DO YOU NEED TO CHANGE? ANYTHING? compute BDM for a 10x10 matrix
bdm=function(m){
  list=rep("x",9)
  k=1
  for (j in c(1,3,5)){ 
    for (i in c(1,3,5)){
      x=pick(m,i,j) # extraction of a 4x4 submatrix
      x=mToS(x)
      list[k]=x
      k = k+1
    }
  }
  tab=table(list)
  k=dim(tab)
  r=sum(log2(tab)) # BDM is defined as the sum of the different K(submatrices)+sum(log2(n)) where n stands for the multiplicities
  for (i in 1:k){
    r=r+K(rownames(tab)[i])
  }
  return(r)
}


# transform a list into a 4x4 matrix, ignoring the non 0 or 1 signs
# str is the string
# n is the number of column
mat=function(str,n=4){
  #	x=format(round(K(str), 3), nsmall = 2)
  #	x=as.character(x)
  #	x=paste("K = ",x,sep="")
  str=strsplit(str,"")[[1]] # give a vector
  str=subset(str,str=="0" | str=="1")
  m=matrix(as.numeric(str),ncol=n,byrow=T)
  image(t(m)[,nrow(m):1], xaxt="n",yaxt="n", col = grey(seq(1, 0, length = 2)))
}

#function for calculating chunking
nPart <-function(m){
  c<-ncol(m)
  l<-nrow(m)
  mcount<-matrix(c(1:(c*l)),nrow=l)*m
  ##
  change=T
  while(change==T){
    change=F;
    for(i in 1:l){
      for(j in 1:c){
        if(mcount[i,j]==0){next;}
        if((mcount[min(i+1,l),j]<mcount[i,j])& mcount[min(i+1,l),j]!=0)
        {mcount[i,j]=mcount[min(i+1,l),j];change=T;}
        if((mcount[i,min(j+1,c)]<mcount[i,j])&mcount[i,min(j+1,c)]!=0)
        {mcount[i,j]=mcount[i,min(j+1,c)];change=T;}
        if(mcount[min(i+1,l),j]>mcount[i,j]){mcount[min(i+1,l),j]=mcount[i,j];change=T;}
        if(mcount[i,min(j+1,c)]>mcount[i,j]){mcount[i,min(j+1,c)]=mcount[i,j];change=T;}
      }
    }
  }
return(length(table(as.matrix(mcount)))-1)
}

#function for calculating edge number
edge<-function(m){
  n<-nrow(m)
  res<-sum(m[1,])+sum(m[n,])+sum(m[,1])+sum(m[,n])
  for(i in 1:(n-1)){
    for(j in 1:(n-1)){
      if(m[i,j]+m[i,j+1]==1){res<-res+1}
      if(m[i,j]+m[i+1,j]==1){res<-res+1}}}
return(res)
  }

bdm_function = function(m){
  x = rep("x", nrow(m)/8)
  k=1
  q=1
  for(i in 1:(nrow(m)/8)){
    df = m[q:(q+7), 5:12] #CHANGE IF CHANGE INPUT COLUMNS
    data.matrix(df)
    x[k] = bdm(df)
    k = k +1
    q=q+8
  }
  return(x) 
}

nPart_function = function(m){
  x = rep("x", nrow(m)/8)
  k=1
  q=1
  for(i in 1:(nrow(m)/8)){
    df = m[q:(q+7), 5:12] #CHANGE IF CHANGE INPUT COLUMNS
    data.matrix(df)
    x[k] = nPart(df)
    k = k +1
    q=q+8
  }
  return(x) 
}

edge_function = function(m){
  x = rep("x", nrow(m)/8)
  k=1
  q=1
  for(i in 1:(nrow(m)/8)){
    df = m[q:(q+7), 5:12] #CHANGE IF CHANGE INPUT COLUMNS
    data.matrix(df)
    x[k] = edge(df)
    k = k +1
    q=q+8
  }
  return(x) 
}

bdm_seed_function = function(m){
  x = rep("x", nrow(m)/8)
  k=1
  q=1
  for(i in 1:(nrow(m)/8)){
    df = m[q:(q+7), 6:13] #CHANGE IF CHANGE INPUT COLUMNS
    data.matrix(df)
    x[k] = bdm(df)
    k = k +1
    q=q+8
    print(df)
  }
  return(x) 
}

nPart_seed_function = function(m){
  x = rep("x", nrow(m)/8)
  k=1
  q=1
  for(i in 1:(nrow(m)/8)){
    df = m[q:(q+7), 6:13] #CHANGE IF CHANGE INPUT COLUMNS
    data.matrix(df)
    x[k] = nPart(df)
    k = k +1
    q=q+8
  }
  return(x) 
}
edge_seed_function = function(m){
  x = rep("x", nrow(m)/8)
  k=1
  q=1
  for(i in 1:(nrow(m)/8)){
    df = m[q:(q+7), 6:13] #CHANGE IF CHANGE INPUT COLUMNS
    data.matrix(df)
    x[k] = edge(df)
    k = k +1
    q=q+8
  }
  return(x) 
}

emd_helper <- function(df) {
  input <- df %>%
    select(input_0:input_7) %>%
    mutate_all(as.numeric) %>%
    as.matrix
  
  target <- df %>%
    select(target_0:target_7) %>%
    mutate_all(as.numeric) %>%
    as.matrix
  
  data_frame(emd = emd2d(input, target),
             generation = first(df$generation), 
             sub_id = first(df$sub_id), 
             trialDisplay = first(df$trialDisplay))
}
