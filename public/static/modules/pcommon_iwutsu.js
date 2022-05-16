/**/_jsload2&&_jsload2('pcommon', 'function mk(a){this.W=a;this.uw=[];this.Sf=s;this.Vl=new Yc(s,{Ye:"api"});this.vz()}var nk={none:["-1",""],transit:["0","m_transit.png"],hotel:["1","m_hotel.png"],catering:["2","m_catering.png"],movie:["3","m_movie.png"],transit:["4","m_transit.png"],indoor_scene:["5","m_indoor_scene.png"]};A.Sk(function(a){new mk(a)}); x.extend(mk.prototype,{vz:function(){var a=this;pano=a.W;pano.addEventListener("visible_poi_type_changed",function(b){a.U_(b.visiblePOIType)});pano.addEventListener("position_changed",function(){a.Sf&&a.KI()})},U_:function(a){this.Sf=a;this.KI()},IQ:function(){for(var a=this.uw.length-1;0<=a;a--)this.W.Jb(this.uw[a]);this.uw=[]},KI:function(){this.IQ();if("inter"!==pano.ft()){var a=nk[this.Sf],b=this.W.ma(),c=this.W.Zb(),e=this;this.Vl.ZD(b,200,a[0],function(b){var g=e.W.Zb();if(g===c)for(var i=s, i=s,k=0,m=b.length;k<m;k++)if(i=b[k],15>k||i.panoInfo&&i.panoInfo.panoId==g)i=new Df(i.position,{icon:J.ta+"panorama/"+a[1],title:i.title,altitude:i.altitude,panoInfo:i.panoInfo}),e.W.Ra(i),e.uw.push(i)})}}});function ok(a,b){this.W=a;this.R=b;this.Sq=s;this.Vl=new Yc(s,{Ye:"api"});this.cB=[];this.rs();this.dC()}A.Sk(function(a){function b(){var b=a.ft();a.m.indoorSceneSwitchControl==t||"street"==b?c&&c.aa():"inter"==b&&(c||(c=new ok(a,a.R)),c.O0(a.Zb()),c.show())}a.addEventListener("scene_type_changed",b);a.addEventListener("indoor_default_switch_mode_changed",b);var c=s}); x.extend(ok.prototype,{dC:function(){this.gQ();this.vz()},Zp:function(a){function b(){e.W.Ad({heading:c.heading,pitch:c.pitch});e.W.removeEventListener("position_changed",b)}var c=this.cB[a];this.W.Gc(c.panoId);var e=this;this.W.addEventListener("position_changed",b)},next:function(){this.Zp(++this.Sq)},a_:function(){this.Zp(--this.Sq)},rs:function(){var a=this.DJ=F("div"),b=a.style;b.position="absolute";b.zIndex="2000";b.width="100%";b.top=b.left="0px";this.R.appendChild(a);this.ng=F("a");this.ng.style.left= "2%";this.ng.href="javascript: void(0);";this.ng.className="pano_switch_left";a.appendChild(this.ng);this.Wh=F("a");this.Wh.style.right="2%";this.ng.href="javascript: void(0);";this.Wh.className="pano_switch_right";K()&&(this.Wh.style.height="34px",this.Wh.style.width="34px",this.Wh.style.borderRadius="17px",this.ng.style.height="34px",this.ng.style.width="34px",this.ng.style.borderRadius="17px");a.appendChild(this.Wh);this.ng.style.top=this.Wh.style.top=this.W.ph().height/2-14+"px"},O0:function(a){var b= this,c=this.W.Zb();this.Vl.Bx(a,function(a){var f=b.W.Zb();f===c&&(b.cB=a,b.QO(f))})},aa:function(){this.Wa=t;this.DJ.style.display="none"},show:function(){this.Wa=q;this.DJ.style.display="block"},Uc:u("Wa"),QO:function(a){for(var b=this.cB,c=b.length-1;0<=c;c--)b[c].panoId==a&&(this.Sq=c);x.U.rc(this.ng,"pano_switch_disable");x.U.rc(this.Wh,"pano_switch_disable");1===this.Sq?x.U.ib(this.ng,"pano_switch_disable"):this.Sq==b.length-1&&x.U.ib(this.Wh,"pano_switch_disable")},gQ:function(){var a=this; ka.V(this.ng,"click",function(b){x.U.jt(b.target,"pano_switch_disable")||a.a_()});ka.V(this.Wh,"click",function(b){x.U.jt(b.target,"pano_switch_disable")||a.next()})},vz:function(){var a=this,b=a.W;b.addEventListener("position_changed",function(){if(a.Uc()){var c=b.Zb();a.QO(c)}})}});function pk(a){zf.call(this);this.W=a;this.Vl=new Yc(s,{Ye:"api"});this.Oq={admission:"",photoDate:"",roadName:"",providerUrl:"",providerName:""};this.Ur=s;this.Fr=[];this.PA=q;this.za()}A.Sk(function(a){new pk(a)});x.lang.xa(pk,zf,"PanoramaCopyright"); x.extend(pk.prototype,{za:function(){this.R=this.Uj(1900);this.W.Ta();this.W.Ta().appendChild(this.R);var a=this;this.Vl.qL(function(b){a.Fr=b;a.Ha()});this.ha(this.W);this.W.m.copyrightControlOptions.logoVisible==t&&this.Ix()},Ha:function(){var a=this.XR(),b=[];b.push(\'<div style="width: 1000px; overflow:hidden;">\');if(this.PA){b.push(\'<a target="_blank" title="\\u5230\\u767e\\u5ea6\\u5730\\u56fe\\u67e5\\u770b\\u6b64\\u533a\\u57df" href=\'+this.W.mL()+\' style="outline:none;float:left;margin-left:3px">\');var c= J.ta+"copyright_logo.png";K()?(c=J.ta+"copyright_logo_hd.png",b.push("<img style=\'border:none;width:68px;height:25px;vertical-align:bottom;\' src=\'"+c+"\' />")):6==x.ga.oa?b.push("<div style=\'float: left;cursor:pointer;width:77px;height:32px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+c+")\'></div>"):b.push("<img style=\'border:none;width:77px;height:32px;vertical-align:bottom;\' src=\'"+c+"\' />");b.push("</a>")}b.push(\'<div style="float:left;\');K()?b.push(\'margin-top:8px;font-family:sans-serif;">\'): (b.push("margin-top:13px;"),x.platform.lM?b.push(\'font-family:sans-serif;">\'):b.push(\'">\'));a.roadName&&b.push(\'<span style="margin-left: 5px;">\'+a.roadName+"</span><span>|</span>");a.providerName&&(a.providerUrl?b.push(\'<span style="margin-left: 5px;">Data \\u00a9</span><span><a style="text-decoration: none;color: rgb(54, 54, 54);" target="_blank" href="\'+a.providerUrl+\'" style="display:inline;">\'+a.providerName+"</a></span>"):b.push(\'<span style="margin-left: 5px;">Data \\u00a9</span><span>\'+a.providerName+ "</span>"));a.admission&&b.push(\'<span style="margin-left: 5px;">\'+a.admission+"</span>");b.push("</div>");b.push("</div>");this.R.innerHTML=b.join("")},Uj:function(a){var b=F("div"),c=b.style;c.overflow="hidden";c.position="absolute";c.bottom=c.left="0";c.zIndex=a||"0";c.width="100%";c.fontSize="11px";c.height=K()?"27px":"34px";c.o6="none";c.WebkitTextSizeAdjust="none";c.WebkitUserSelect="none";c.visibility="hidden";c.fontFamily="sans-serif";c.color="rgb(54, 54, 54)";c.lineHeight="20px";return b}, ha:function(a){var b=this;a.addEventListener("copyright_changed",function(a){a.copyright&&(b.Ur=a.copyright,b.Ha())});a.addEventListener("visible_changed",function(){b.R.style.visibility=a.Dx()?"visible":"hidden"});a.addEventListener("copyright_options_changed",function(){a.m.copyrightControlOptions.logoVisible==t?b.Ix():b.zF()})},XR:function(){if(this.Ur){for(var a in this.Oq)this.Oq[a]=this.Ur[a];a=this.TX(this.Ur.dataProviderIndex);this.Oq.providerName=a.name+this.Ur.username;this.Oq.providerUrl= a.url}return this.Oq},TX:function(a){for(var b={name:"",url:"",id:""},c=this.Fr.length-1;0<=c;c--)if(this.Fr[c].id==a){var b=this.Fr[c],e;for(e in b)b[e]=x.trim(this.Fr[c][e])}return b},Ix:function(){/baidu\\.com/.test(document.domain)&&(this.PA=t,this.Ha())},zF:function(){this.PA=q;this.Ha()}}); ');
