StormV3=function(elements){this.e=new Float32Array(elements);};StormV3.prototype.add=function(stormV3){return $V3([this.e[0]+stormV3.e[0],this.e[1]+stormV3.e[1],this.e[2]+stormV3.e[2]]);};StormV3.prototype.cross=function(stormV3){return $V3([this.e[1]*stormV3.e[2]-this.e[2]*stormV3.e[1],this.e[2]*stormV3.e[0]-this.e[0]*stormV3.e[2],this.e[0]*stormV3.e[1]-this.e[1]*stormV3.e[0]]);};StormV3.prototype.distance=function(stormV3){return Math.sqrt((this.e[0]-stormV3.e[0])*(this.e[0]-stormV3.e[0])+(this.e[1]-stormV3.e[1])*(this.e[1]-stormV3.e[1])+(this.e[2]-stormV3.e[2])*(this.e[2]-stormV3.e[2]));};StormV3.prototype.dot=function(stormV3){return this.e[0]*stormV3.e[0]+this.e[1]*stormV3.e[1]+this.e[2]*stormV3.e[2];};StormV3.prototype.equal=function(stormV3){return(this.e[0]==stormV3.e[0])&&(this.e[1]==stormV3.e[1])&&(this.e[2]==stormV3.e[2]);};StormV3.prototype.modulus=function(){return Math.sqrt(this.sumComponentSqrs());};StormV3.prototype.sumComponentSqrs=function(){var V3=this.sqrComponents();return V3[0]+V3[1]+V3[2];};StormV3.prototype.sqrComponents=function(){var V3=new Float32Array(3);V3.set([this.e[0]*this.e[0],this.e[1]*this.e[1],this.e[2]*this.e[2]]);return V3;};StormV3.prototype.x=function(floatVal){return $V3([this.e[0]*floatVal,this.e[1]*floatVal,this.e[2]*floatVal]);};StormV3.prototype.reflect=function(stormV3){var I=$V3([this.e[0],this.e[1],this.e[2]]);var N=$V3([stormV3.e[0],stormV3.e[1],stormV3.e[2]]);var vec=N.x(this.dot(N,I));vec=vec.x(2.0);vec=I.subtract(vec);return vec;};StormV3.prototype.subtract=function(stormV3){return $V3([this.e[0]-stormV3.e[0],this.e[1]-stormV3.e[1],this.e[2]-stormV3.e[2]]);};StormV3.prototype.normalize=function(){var inverse=1.0/this.modulus();return $V3([this.e[0]*inverse,this.e[1]*inverse,this.e[2]*inverse]);};createV3=function(elements){return new StormV3(elements);};var $V3=createV3;StormM16=function(elements){this.e=new Float32Array(elements);};StormM16.prototype.x=function(stormM16){return $M16([(this.e[0]*stormM16.e[0])+(this.e[1]*stormM16.e[4])+(this.e[2]*stormM16.e[8])+(this.e[3]*stormM16.e[12]),(this.e[0]*stormM16.e[1])+(this.e[1]*stormM16.e[5])+(this.e[2]*stormM16.e[9])+(this.e[3]*stormM16.e[13]),(this.e[0]*stormM16.e[2])+(this.e[1]*stormM16.e[6])+(this.e[2]*stormM16.e[10])+(this.e[3]*stormM16.e[14]),(this.e[0]*stormM16.e[3])+(this.e[1]*stormM16.e[7])+(this.e[2]*stormM16.e[11])+(this.e[3]*stormM16.e[15]),(this.e[4]*stormM16.e[0])+(this.e[5]*stormM16.e[4])+(this.e[6]*stormM16.e[8])+(this.e[7]*stormM16.e[12]),(this.e[4]*stormM16.e[1])+(this.e[5]*stormM16.e[5])+(this.e[6]*stormM16.e[9])+(this.e[7]*stormM16.e[13]),(this.e[4]*stormM16.e[2])+(this.e[5]*stormM16.e[6])+(this.e[6]*stormM16.e[10])+(this.e[7]*stormM16.e[14]),(this.e[4]*stormM16.e[3])+(this.e[5]*stormM16.e[7])+(this.e[6]*stormM16.e[11])+(this.e[7]*stormM16.e[15]),(this.e[8]*stormM16.e[0])+(this.e[9]*stormM16.e[4])+(this.e[10]*stormM16.e[8])+(this.e[11]*stormM16.e[12]),(this.e[8]*stormM16.e[1])+(this.e[9]*stormM16.e[5])+(this.e[10]*stormM16.e[9])+(this.e[11]*stormM16.e[13]),(this.e[8]*stormM16.e[2])+(this.e[9]*stormM16.e[6])+(this.e[10]*stormM16.e[10])+(this.e[11]*stormM16.e[14]),(this.e[8]*stormM16.e[3])+(this.e[9]*stormM16.e[7])+(this.e[10]*stormM16.e[11])+(this.e[11]*stormM16.e[15]),(this.e[12]*stormM16.e[0])+(this.e[13]*stormM16.e[4])+(this.e[14]*stormM16.e[8])+(this.e[15]*stormM16.e[12]),(this.e[12]*stormM16.e[1])+(this.e[13]*stormM16.e[5])+(this.e[14]*stormM16.e[9])+(this.e[15]*stormM16.e[13]),(this.e[12]*stormM16.e[2])+(this.e[13]*stormM16.e[6])+(this.e[14]*stormM16.e[10])+(this.e[15]*stormM16.e[14]),(this.e[12]*stormM16.e[3])+(this.e[13]*stormM16.e[7])+(this.e[14]*stormM16.e[11])+(this.e[15]*stormM16.e[15])]);};StormM16.prototype.transpose=function(){return $M16([this.e[0],this.e[4],this.e[8],this.e[12],this.e[1],this.e[5],this.e[9],this.e[13],this.e[2],this.e[6],this.e[10],this.e[14],this.e[3],this.e[7],this.e[11],this.e[15]]);};StormM16.prototype.inverse=function(){var src=$M16(this.e).transpose().e;var tmp=new Float32Array(12);var dst=new Float32Array(16);tmp[0]=src[10]*src[15];tmp[1]=src[11]*src[14];tmp[2]=src[9]*src[15];tmp[3]=src[11]*src[13];tmp[4]=src[9]*src[14];tmp[5]=src[10]*src[13];tmp[6]=src[8]*src[15];tmp[7]=src[11]*src[12];tmp[8]=src[8]*src[14];tmp[9]=src[10]*src[12];tmp[10]=src[8]*src[13];tmp[11]=src[9]*src[12];dst[0]=tmp[0]*src[5]+tmp[3]*src[6]+tmp[4]*src[7];dst[0]-=tmp[1]*src[5]+tmp[2]*src[6]+tmp[5]*src[7];dst[1]=tmp[1]*src[4]+tmp[6]*src[6]+tmp[9]*src[7];dst[1]-=tmp[0]*src[4]+tmp[7]*src[6]+tmp[8]*src[7];dst[2]=tmp[2]*src[4]+tmp[7]*src[5]+tmp[10]*src[7];dst[2]-=tmp[3]*src[4]+tmp[6]*src[5]+tmp[11]*src[7];dst[3]=tmp[5]*src[4]+tmp[8]*src[5]+tmp[11]*src[6];dst[3]-=tmp[4]*src[4]+tmp[9]*src[5]+tmp[10]*src[6];dst[4]=tmp[1]*src[1]+tmp[2]*src[2]+tmp[5]*src[3];dst[4]-=tmp[0]*src[1]+tmp[3]*src[2]+tmp[4]*src[3];dst[5]=tmp[0]*src[0]+tmp[7]*src[2]+tmp[8]*src[3];dst[5]-=tmp[1]*src[0]+tmp[6]*src[2]+tmp[9]*src[3];dst[6]=tmp[3]*src[0]+tmp[6]*src[1]+tmp[11]*src[3];dst[6]-=tmp[2]*src[0]+tmp[7]*src[1]+tmp[10]*src[3];dst[7]=tmp[4]*src[0]+tmp[9]*src[1]+tmp[10]*src[2];dst[7]-=tmp[5]*src[0]+tmp[8]*src[1]+tmp[11]*src[2];tmp[0]=src[2]*src[7];tmp[1]=src[3]*src[6];tmp[2]=src[1]*src[7];tmp[3]=src[3]*src[5];tmp[4]=src[1]*src[6];tmp[5]=src[2]*src[5];tmp[6]=src[0]*src[7];tmp[7]=src[3]*src[4];tmp[8]=src[0]*src[6];tmp[9]=src[2]*src[4];tmp[10]=src[0]*src[5];tmp[11]=src[1]*src[4];dst[8]=tmp[0]*src[13]+tmp[3]*src[14]+tmp[4]*src[15];dst[8]-=tmp[1]*src[13]+tmp[2]*src[14]+tmp[5]*src[15];dst[9]=tmp[1]*src[12]+tmp[6]*src[14]+tmp[9]*src[15];dst[9]-=tmp[0]*src[12]+tmp[7]*src[14]+tmp[8]*src[15];dst[10]=tmp[2]*src[12]+tmp[7]*src[13]+tmp[10]*src[15];dst[10]-=tmp[3]*src[12]+tmp[6]*src[13]+tmp[11]*src[15];dst[11]=tmp[5]*src[12]+tmp[8]*src[13]+tmp[11]*src[14];dst[11]-=tmp[4]*src[12]+tmp[9]*src[13]+tmp[10]*src[14];dst[12]=tmp[2]*src[10]+tmp[5]*src[11]+tmp[1]*src[9];dst[12]-=tmp[4]*src[11]+tmp[0]*src[9]+tmp[3]*src[10];dst[13]=tmp[8]*src[11]+tmp[0]*src[8]+tmp[7]*src[10];dst[13]-=tmp[6]*src[10]+tmp[9]*src[11]+tmp[1]*src[8];dst[14]=tmp[6]*src[9]+tmp[11]*src[11]+tmp[3]*src[8];dst[14]-=tmp[10]*src[11]+tmp[2]*src[8]+tmp[7]*src[9];dst[15]=tmp[10]*src[10]+tmp[4]*src[8]+tmp[9]*src[9];dst[15]-=tmp[8]*src[9]+tmp[11]*src[10]+tmp[5]*src[8];var det=src[0]*dst[0]+src[1]*dst[1]+src[2]*dst[2]+src[3]*dst[3];return $M16([dst[0]*det,dst[1]*det,dst[2]*det,dst[3]*det,dst[4]*det,dst[5]*det,dst[6]*det,dst[7]*det,dst[8]*det,dst[9]*det,dst[10]*det,dst[11]*det,dst[12]*det,dst[13]*det,dst[14]*det,dst[15]*det]);};StormM16.prototype.rotation=function(theta,a){var mod=a.modulus();var x=new Float32Array(3);var x=a.e[0]/mod;var y=a.e[1]/mod;var z=a.e[2]/mod;var s=Math.sin(theta);var c=Math.cos(theta);var t=1-c;return $M16([t*x*x+c,t*x*y-s*z,t*x*z+s*y,0.0,t*x*y+s*z,t*y*y+c,t*y*z-s*x,0.0,t*x*z-s*y,t*y*z+s*x,t*z*z+c,0.0,0.0,0.0,0.0,1.0]);};createM16=function(elements){return new StormM16(elements);};var $M16=createM16;