import{readFileSync as A,writeFileSync as B,mkdirSync as C,readdirSync as D}from'node:fs';
let I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output',T={1:101,2:401,3:10,4:12,5:22,6:23,7:33,23:11,27:11,48:200,49:210,50:210,51:200,64:11,65:20,80:10,81:10,82:1,83:10};
for(let d of D(I)){
let P=A(I+'/'+d+'/program.bin'),N=A(I+'/'+d+'/input.bin'),n=P.length,S=[],s=0,K=[],k=0,M=new Int32Array(256),U=new Uint8Array(65536),o=0,p=0,c=0,g=0,e=0;
L:for(;;){
if(g==1e6){e=10;break}
if(c<0||c>=n){e=9;break}
let q=P[c];
if(q>83||q&&q!=52&&!(T[q]||q>15&&q<35&&q!=31)){e=5;break}
let t=T[q]||(q>15&&q<35&&q!=31?21:0),i=t/100|0,y=t/10%10|0,z=t%10;
if(c+i>=n){e=9;break}
g++;
let x=c+1+i;
if(s<y){e=2;break}
if(s-y+z>256){e=3;break}
c=x;
if(q>15&&q<35&&q!=23&&q!=27){
let a=S[s-2],b=S[s-1],r=0;
if(q>18&&q<23&&!b){e=4;break L}
r=q==16?a+b|0:q==17?a-b|0:q==18?Math.imul(a,b):q==19?a==-2147483648&&b==-1?a:a/b|0:q==20?b==-1?0:a%b|0:q==21?Math.floor((a>>>0)/(b>>>0))|0:q==22?(a>>>0)%(b>>>0)|0:q==24?a&b:q==25?a|b:q==26?a^b:q==28?a<<(b&31):q==29?a>>(b&31):q==30?(a>>>(b&31))|0:q==32?a==b?1:0:q==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
s-=2;S[s++]=r;
continue;
}
switch(q){
case 0:e=0;break L;
case 1:S[s++]=(P[x-1]<<24)>>24;break;
case 2:S[s++]=P[x-4]|P[x-3]<<8|P[x-2]<<16|P[x-1]<<24;break;
case 3:s--;break;
case 4:S[s]=S[s-1];s++;break;
case 5:{let v=S[s-1];S[s-1]=S[s-2];S[s-2]=v;break}
case 6:S[s]=S[s-2];s++;break;
case 7:{let v=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=v;break}
case 23:S[s-1]=-S[s-1]|0;break;
case 27:S[s-1]=~S[s-1];break;
case 48:case 49:case 50:{
let f=(P[x-2]|P[x-1]<<8)<<16>>16,w=1;
if(q!=48){let v=S[--s];w=q==49?v==0:v!=0}
if(w)c=x+f;
break;
}
case 51:
if(k==64){e=7;break L}
K[k++]=x;c=P[x-2]|P[x-1]<<8;
break;
case 52:
if(!k){e=8;break L}
c=K[--k];
break;
case 64:{
let a=S[s-1];
if(a<0||a>255){e=6;break L}
S[s-1]=M[a];
break;
}
case 65:{
let a=S[s-1],v=S[s-2];
if(a<0||a>255){e=6;break L}
s-=2;M[a]=v;
break;
}
case 80:{
let w=Buffer.from(''+S[s-1]);
if(o+w.length>65536){e=11;break L}
s--;U.set(w,o);o+=w.length;
break;
}
case 81:
if(o>65535){e=11;break L}
U[o++]=S[--s]&255;
break;
case 82:S[s++]=p<N.length?N[p++]:-1;break;
case 83:e=S[--s]&255;break L;
}
}
C(O+'/'+d,{recursive:!0});B(O+'/'+d+'/stdout.bin',U.subarray(0,o));B(O+'/'+d+'/exit.txt',e+'\n');
}
