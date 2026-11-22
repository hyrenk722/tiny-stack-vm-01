import{readFileSync as A,writeFileSync as B,mkdirSync as C,readdirSync as D}from'node:fs';
let I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output',T={1:65,2:68,3:8,4:136,5:144,6:208,7:216,23:72,27:72,48:2,49:10,50:10,51:2,64:72,65:16,80:8,81:8,82:64,83:8};
for(let d of D(I)){
let P=A(I+'/'+d+'/program.bin'),N=A(I+'/'+d+'/input.bin'),n=P.length,S=[],s=0,K=[],k=0,M=[],U=new Uint8Array(65536),o=0,p=0,c=0,g=0,e;
L:for(;;){
if(g==1e6){e=10;break}
if(c<0||c>=n){e=9;break}
let q=P[c];
let t=T[q]||(q>15&&q<35&&q!=31?80:0),i=t&7,y=t>>3&7,z=t>>6;
if(q&&q-52&&!t){e=5;break}
if(c+i>=n){e=9;break}
g++;
if(s<y||s-y+z>256){e=s<y?2:3;break}
c+=1+i;
if(q>15&&q<35&&q!=23&&q!=27){
let a=S[s-2],b=S[s-1],r,h=b&31,u=a>>>0,v=b>>>0;
if(q>18&&q<23&&!b){e=4;break L}
r=q==16?a+b|0:q==17?a-b|0:q==18?Math.imul(a,b):q==19?a/b|0:q==20?a%b|0:q==21?u/v|0:q==22?u%v|0:q==24?a&b:q==25?a|b:q==26?a^b:q==28?a<<h:q==29?a>>h:q==30?(a>>>h)|0:q==32?+(a==b):q==33?+(a<b):+(u<v);
s-=2;S[s++]=r;
continue;
}
switch(q){
case 0:e=0;break L;
case 1:S[s++]=P.readInt8(c-1);break;
case 2:S[s++]=P.readInt32LE(c-4);break;
case 3:s--;break;
case 4:case 6:S[s++]=S[s-q/2];break;
case 5:[S[s-1],S[s-2]]=[S[s-2],S[s-1]];break;
case 7:[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]];break;
case 23:case 27:S[s-1]=q==23?-S[s-1]|0:~S[s-1];break;
case 48:case 49:case 50:{
let f=P.readInt16LE(c-2),w=1;
if(q!=48){let v=S[--s];w=q==49?v==0:v!=0}
if(w)c+=f;
break;
}
case 51:
if(k==64){e=7;break L}
K[k++]=c;c=P[c-2]|P[c-1]<<8;
break;
case 52:
if(!k){e=8;break L}
c=K[--k];
break;
case 64:{
let a=S[s-1];
if(a<0||a>255){e=6;break L}
S[s-1]=M[a]|0;
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
case 82:S[s++]=N[p++]??-1;break;
case 83:e=S[--s]&255;break L;
}
}
C(O+'/'+d,{recursive:!0});B(O+'/'+d+'/stdout.bin',U.subarray(0,o));B(O+'/'+d+'/exit.txt',e+'\n');
}
