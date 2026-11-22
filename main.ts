import{readFileSync as A,writeFileSync as B,mkdirSync as C,readdirSync as D}from'fs';
let E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output',T={1:65,2:68,3:8,4:136,5:144,6:208,7:216,23:72,27:72,48:2,49:10,50:10,51:2,64:72,65:16,80:8,81:8,82:64,83:8},d,q;
for(d of D(I)){
let j=I+'/'+d,P=A(j+'/program.bin'),N=A(j+'/input.bin'),n=P.length,S=[],s=0,K=[],k=0,M=[],U=Buffer.alloc(65536),o=0,p=0,c=0,g=1e6,e;
for(;e==null;){
if(--g<0){e=10;break}
if(c<0|c>=n){e=9;break}
q=P[c];
let t=T[q]||(q>15&&q<35&&q!=31?80:0),y=t>>3&7,z=t>>6;
if(q&&q-52&&!t){e=5;break}
if((s-y>>>0)>256-z){e=2+(s>=y);break}
c+=1+(t&7);
if(c>n){e=9;break}
s-=y;
switch(q){
case 0:case 83:e=q?S[s]&255:0;break;
case 1:S[s]=P.readInt8(c-1);break;
case 2:S[s]=P.readInt32LE(c-4);break;
case 3:break;
case 4:case 6:S[s+y]=S[s];break;
case 5:[S[s],S[s+1]]=[S[s+1],S[s]];break;
case 7:[S[s],S[s+1],S[s+2]]=[S[s+1],S[s+2],S[s]];break;
case 23:case 27:S[s]=q==23?-S[s]|0:~S[s];break;
case 48:case 49:case 50:{
let f=P.readInt16LE(c-2),w=q<49|!S[s]^q>49;
if(w)c+=f;
break;
}
case 51:
if(k==64){e=7;break}
K[k++]=c;c=P[c-2]|P[c-1]<<8;
break;
case 52:
if(!k){e=8;break}
c=K[--k];
break;
case 64:case 65:if((S[s+(q==65)]>>>0)>255){e=6;break}if(q==64)S[s]=M[S[s]]|0;else M[S[s+1]]=S[s];break;
case 80:{
let w=Buffer.from(''+S[s]);
if(o+w.length>65536){e=11;break}
U.set(w,o);o+=w.length;
break;
}
case 81:
if(o>>16){e=11;break}
U[o++]=S[s]&255;
break;
case 82:S[s]=N[p++]??-1;break;
default:{
let a=S[s],b=S[s+1],r,h=b&31,u=a>>>0,v=b>>>0;
if(q>18&&q<23&&!b){e=4;break}
r=[a+b|0,a-b|0,Math.imul(a,b),a/b|0,a%b|0,u/v|0,u%v|0,,a&b,a|b,a^b,,a<<h,a>>h,(a>>>h)|0,,+(a==b),+(a<b),+(u<v)][q-16];
S[s]=r;
}
}
s+=z;
}
P=O+'/'+d;C(P,{recursive:!0});B(P+'/stdout.bin',U.subarray(0,o));B(P+'/exit.txt',e+'\n');
}
