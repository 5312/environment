/**/_jsload2&&_jsload2('geoctrl', 'x.extend(Sc.prototype,{initialize:function(a){var b=this;Oc.prototype.initialize.call(b,a);b.Ha();b.tr={"default":A.pa+"images/geolocation-control/mobile/default-40x40.png",loading:A.pa+"images/geolocation-control/mobile/loading-40x40.gif",success:A.pa+"images/geolocation-control/mobile/success-40x40.png",fail:A.pa+"images/geolocation-control/mobile/fail-40x40.png"};b.sj=b.R.children[0];b.vD=b.sj.children[0];b.ip=b.vD.children[0];b.tD=b.sj.children[1];b.jL=b.tD.children[0].children[0];var c;b.P.addEventListener("moveend", function(){if(c){var a=b.P.Qb();a.lng===c.lng&&a.lat===c.lat?b.Nr(b.tr.success):(b.Nr(b.tr["default"]),b.EQ())}});x.V(b.ip,"click",function(){b.Nr(b.tr.loading);(new Geolocation({timeout:1E4})).getCurrentPosition(function(e){b.Nr(b.tr.success);if(e.address&&b.m.W_){var f="";e.address.city?f+=e.address.city:e.address.province&&(f+=e.address.province);e.address.district&&(f+=e.address.district);e.address.street&&(f+=e.address.street);e.address.street_number&&(f+=e.address.street_number);b.ZT(f)}var f= new P(e.longitude,e.latitude),g=b.m.MM?b.m.MM:new kd(A.pa+"images/geolocation-control/point/position-icon-14x14.png",new M(14,14));window[a.da+"locationMarker"]&&a.Jb(window[a.da+"locationMarker"]);g=new W(f,{icon:g});c=f;b.wD=f;a.Ra(g);window[a.da+"locationMarker"]=g;a.xd(f,15);e.address&&(b.gs={province:e.address.province||"",city:e.address.city||"",district:e.address.district||"",street:e.address.street||"",streetNumber:e.address.street_number||""},Ua(7001,{longitude:e.longitude,latitude:e.latitude, accuracy:e.accuracy}));e=new O("locationSuccess");e.point=b.wD;e.addressComponent=b.gs;b.dispatchEvent(e)},function(a){b.Nr(b.tr.fail);var c=new O("locationError");c.code=a.errorCode;c.message=a.Bk;b.dispatchEvent(c)})});return b.R},location:function(){var a=this;a.T0.push({});(new Geolocation({timeout:1E4})).getCurrentPosition(function(b){a.wD=new P(b.longitude,b.latitude);b.address&&(a.gs={province:b.address.province||"",city:b.address.city||"",district:b.address.district||"",street:b.address.street|| "",streetNumber:b.address.street_number||""});b=new O("locationSuccess");b.point=a.wD;b.addressComponent=a.gs;a.dispatchEvent(b)},function(b){var c=new O("locationError");c.code=b.errorCode;c.message=b.Bk;a.dispatchEvent(c)})},nX:function(){return this.gs?this.gs:s},bQ:function(){this.P?this.Me(this.P):this.map&&this.Me(this.map)},Ha:function(){Oc.prototype.Ha.call(this);this.R.style.cssText="height: 32px;";this.R.innerHTML=this.br()},br:function(){return[\'<div class="BMap_geolocationContainer" style="height: 32px; margin: 0px; box-sizing: border-box; border: 1px solid #d9d7d5; border-radius: 3px; -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,.2); overflow: hidden;">\', \'<div class="BMap_geolocationIconBackground" style="float: left; width: 32px; height: 32px; background-image: url(\\\'\'+A.pa+"images/geolocation-control/mobile/gradient-bg-1x64.png\'); background-size: 1px 32px; background-repeat: repeat-x;\\">",\'<div class="BMap_geolocationIcon" style="width: 32px; height: 32px; cursor: pointer; background-image: url(\\\'\'+A.pa+"images/geolocation-control/mobile/default-40x40.png\'); background-size: 20px 20px; background-repeat: no-repeat; background-position: center center;\\"></div>", "</div>",\'<div class="BMap_geolocationAddress" style="display: none; float: left; min-width: 50px; padding-left: 10px; padding-right: 10px; border-left: 1px solid #d9d7d5; background-image: url(\'+A.pa+\'images/geolocation-control/mobile/gradient-bg-1x64.png); background-size: 1px 32px; background-repeat: repeat-x;">\',\'<div style="height: 32px; display: table-cell; vertical-align: middle;"><div class="BMap_geolocationAddressText" style="font-size: 12px; color: #666666; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; display: block; min-width: 50px; max-width: 200px;"></div></div></div></div>\'].join("")}, Nr:function(a){this.ip.style.backgroundImage="url(\'"+a+"\')"},ZT:function(a){this.tD.style.display="block";this.jL.textContent=a},EQ:function(){this.jL.textContent="";this.tD.style.display="none"}});Sc.prototype.location=Sc.prototype.location;Sc.prototype.getAddressComponent=Sc.prototype.nX; ');
