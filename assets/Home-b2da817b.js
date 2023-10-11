import{m as L,q as $t,b as te,c as ne,d as U,a as A,f as ae,g as se,h as H,u as E,r as me,s as ge,t as ce,v as He,e as de,w as Xe,x as Ye,n as Z,i as D,V as We,j as Nt,l as Rt,p as jt,o as Ot}from"./VApp-9d8b2bd3.js";import{C as Ee,g as I,D as le,b as Gt,h as he,p as S,E as ie,e as c,c as i,F as zt,G as Te,m as G,d as z,f as qe,t as T,H as Ke,I as Mt,J as Je,K as Ft,k as ye,w as be,L as Dt,l as Qe,o as Ut,M as Ht,N as Xt,O as Yt,q as Wt,r as Ze,s as et,S as qt,i as B,v as Kt,u as Ce,a as Jt,P as Qt,Q as Ae,R as Zt,U as en,V as $e,W as O,X as tt,Y as nt,Z as re,x as tn,y as nn,z as V,_ as F,A as W}from"./index-775616c2.js";const an=["top","bottom"],sn=["start","end","left","right"];function ln(e,a){let[t,n]=e.split(" ");return n||(n=Ee(an,t)?"start":Ee(sn,t)?"top":"center"),{side:Ne(t,a),align:Ne(n,a)}}function Ne(e,a){return e==="start"?a?"right":"left":e==="end"?a?"left":"right":e}function _e(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",t=arguments.length>2?arguments[2]:void 0;return I()({name:t??le(Gt(e.replace(/__/g,"-"))),props:{tag:{type:String,default:a},...L()},setup(n,l){let{slots:s}=l;return()=>{var r;return he(n.tag,{class:[e,n.class],style:n.style},(r=s.default)==null?void 0:r.call(s))}}})}const rn=[null,"default","comfortable","compact"],J=S({density:{type:String,default:"default",validator:e=>rn.includes(e)}},"density");function oe(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:ie();return{densityClasses:c(()=>`${a}--density-${e.density}`)}}const on=["elevated","flat","tonal","outlined","text","plain"];function ke(e,a){return i(zt,null,[e&&i("span",{key:"overlay",class:`${a}__overlay`},null),i("span",{key:"underlay",class:`${a}__underlay`},null)])}const ue=S({color:String,variant:{type:String,default:"elevated",validator:e=>on.includes(e)}},"variant");function Se(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:ie();const t=c(()=>{const{variant:s}=Te(e);return`${a}--variant-${s}`}),{colorClasses:n,colorStyles:l}=$t(c(()=>{const{variant:s,color:r}=Te(e);return{[["elevated","flat"].includes(s)?"background":"text"]:r}}));return{colorClasses:n,colorStyles:l,variantClasses:t}}const at=S({divided:Boolean,...te(),...L(),...J(),...ne(),...U(),...A(),...G(),...ue()},"VBtnGroup"),Re=I()({name:"VBtnGroup",props:at(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=z(e),{densityClasses:l}=oe(e),{borderClasses:s}=ae(e),{elevationClasses:r}=se(e),{roundedClasses:u}=H(e);qe({VBtn:{height:"auto",color:T(e,"color"),density:T(e,"density"),flat:!0,variant:T(e,"variant")}}),E(()=>i(e.tag,{class:["v-btn-group",{"v-btn-group--divided":e.divided},n.value,s.value,l.value,r.value,u.value,e.class],style:e.style},t))}}),un=S({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},"group"),cn=S({value:null,disabled:Boolean,selectedClass:String},"group-item");function dn(e,a){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;const n=Ke("useGroupItem");if(!n)throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");const l=Mt();Je(Symbol.for(`${a.description}:id`),l);const s=Ft(a,null);if(!s){if(!t)return s;throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${a.description}`)}const r=T(e,"value"),u=c(()=>!!(s.disabled.value||e.disabled));s.register({id:l,value:r,disabled:u},n),ye(()=>{s.unregister(l)});const o=c(()=>s.isSelected(l)),m=c(()=>o.value&&[s.selectedClass.value,e.selectedClass]);return be(o,h=>{n.emit("group:selected",{value:h})}),{id:l,isSelected:o,toggle:()=>s.select(l,!o.value),select:h=>s.select(l,h),selectedClass:m,value:r,disabled:u,group:s}}function vn(e,a){let t=!1;const n=Dt([]),l=Qe(e,"modelValue",[],d=>d==null?[]:st(n,Xt(d)),d=>{const v=mn(n,d);return e.multiple?v:v[0]}),s=Ke("useGroup");function r(d,v){const b=d,g=Symbol.for(`${a.description}:id`),k=Yt(g,s==null?void 0:s.vnode).indexOf(v);k>-1?n.splice(k,0,b):n.push(b)}function u(d){if(t)return;o();const v=n.findIndex(b=>b.id===d);n.splice(v,1)}function o(){const d=n.find(v=>!v.disabled);d&&e.mandatory==="force"&&!l.value.length&&(l.value=[d.id])}Ut(()=>{o()}),ye(()=>{t=!0});function m(d,v){const b=n.find(g=>g.id===d);if(!(v&&(b!=null&&b.disabled)))if(e.multiple){const g=l.value.slice(),C=g.findIndex(f=>f===d),k=~C;if(v=v??!k,k&&e.mandatory&&g.length<=1||!k&&e.max!=null&&g.length+1>e.max)return;C<0&&v?g.push(d):C>=0&&!v&&g.splice(C,1),l.value=g}else{const g=l.value.includes(d);if(e.mandatory&&g)return;l.value=v??!g?[d]:[]}}function h(d){if(e.multiple,l.value.length){const v=l.value[0],b=n.findIndex(k=>k.id===v);let g=(b+d)%n.length,C=n[g];for(;C.disabled&&g!==b;)g=(g+d)%n.length,C=n[g];if(C.disabled)return;l.value=[n[g].id]}else{const v=n.find(b=>!b.disabled);v&&(l.value=[v.id])}}const y={register:r,unregister:u,selected:l,select:m,disabled:T(e,"disabled"),prev:()=>h(n.length-1),next:()=>h(1),isSelected:d=>l.value.includes(d),selectedClass:c(()=>e.selectedClass),items:c(()=>n),getItemIndex:d=>fn(n,d)};return Je(a,y),y}function fn(e,a){const t=st(e,[a]);return t.length?e.findIndex(n=>n.id===t[0]):-1}function st(e,a){const t=[];return a.forEach(n=>{const l=e.find(r=>Ht(n,r.value)),s=e[n];(l==null?void 0:l.value)!=null?t.push(l.id):s!=null&&t.push(s.id)}),t}function mn(e,a){const t=[];return a.forEach(n=>{const l=e.findIndex(s=>s.id===n);if(~l){const s=e[l];t.push(s.value!=null?s.value:l)}}),t}const lt=Symbol.for("vuetify:v-btn-toggle"),gn=S({...at(),...un()},"VBtnToggle");I()({name:"VBtnToggle",props:gn(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{isSelected:n,next:l,prev:s,select:r,selected:u}=vn(e,lt);return E(()=>{const[o]=Re.filterProps(e);return i(Re,Wt({class:["v-btn-toggle",e.class]},o,{style:e.style}),{default:()=>{var m;return[(m=t.default)==null?void 0:m.call(t,{isSelected:n,next:l,prev:s,select:r,selected:u})]}})}),{next:l,prev:s,select:r}}});function it(e,a){const t=Ze(),n=et(!1);if(qt){const l=new IntersectionObserver(s=>{e==null||e(s,l),n.value=!!s.find(r=>r.isIntersecting)},a);ye(()=>{l.disconnect()}),be(t,(s,r)=>{r&&(l.unobserve(r),n.value=!1),s&&l.observe(s)},{flush:"post"})}return{intersectionRef:t,isIntersecting:n}}const hn=S({bgColor:String,color:String,indeterminate:[Boolean,String],modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},...L(),...me(),...A({tag:"div"}),...G()},"VProgressCircular"),yn=I()({name:"VProgressCircular",props:hn(),setup(e,a){let{slots:t}=a;const n=20,l=2*Math.PI*n,s=Ze(),{themeClasses:r}=z(e),{sizeClasses:u,sizeStyles:o}=ge(e),{textColorClasses:m,textColorStyles:h}=ce(T(e,"color")),{textColorClasses:y,textColorStyles:d}=ce(T(e,"bgColor")),{intersectionRef:v,isIntersecting:b}=it(),{resizeRef:g,contentRect:C}=He(),k=c(()=>Math.max(0,Math.min(100,parseFloat(e.modelValue)))),f=c(()=>Number(e.width)),_=c(()=>o.value?Number(e.size):C.value?C.value.width:Math.max(f.value,32)),P=c(()=>n/(1-f.value/_.value)*2),w=c(()=>f.value/_.value*P.value),R=c(()=>B((100-k.value)/100*l));return Kt(()=>{v.value=s.value,g.value=s.value}),E(()=>i(e.tag,{ref:s,class:["v-progress-circular",{"v-progress-circular--indeterminate":!!e.indeterminate,"v-progress-circular--visible":b.value,"v-progress-circular--disable-shrink":e.indeterminate==="disable-shrink"},r.value,u.value,m.value,e.class],style:[o.value,h.value,e.style],role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":e.indeterminate?void 0:k.value},{default:()=>[i("svg",{style:{transform:`rotate(calc(-90deg + ${Number(e.rotate)}deg))`},xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${P.value} ${P.value}`},[i("circle",{class:["v-progress-circular__underlay",y.value],style:d.value,fill:"transparent",cx:"50%",cy:"50%",r:n,"stroke-width":w.value,"stroke-dasharray":l,"stroke-dashoffset":0},null),i("circle",{class:"v-progress-circular__overlay",fill:"transparent",cx:"50%",cy:"50%",r:n,"stroke-width":w.value,"stroke-dasharray":l,"stroke-dashoffset":R.value},null)]),t.default&&i("div",{class:"v-progress-circular__content"},[t.default({value:k.value})])]})),{}}});const je={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},pe=S({location:String},"location");function Ve(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,t=arguments.length>2?arguments[2]:void 0;const{isRtl:n}=Ce();return{locationStyles:c(()=>{if(!e.location)return{};const{side:s,align:r}=ln(e.location.split(" ").length>1?e.location:`${e.location} center`,n.value);function u(m){return t?t(m):0}const o={};return s!=="center"&&(a?o[je[s]]=`calc(100% - ${u(s)}px)`:o[s]=0),r!=="center"?a?o[je[r]]=`calc(100% - ${u(r)}px)`:o[r]=0:(s==="center"?o.top=o.left="50%":o[{top:"left",bottom:"left",left:"top",right:"top"}[s]]="50%",o.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[s]),o})}}const bn=S({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...L(),...pe({location:"top"}),...U(),...A(),...G()},"VProgressLinear"),Cn=I()({name:"VProgressLinear",props:bn(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=Qe(e,"modelValue"),{isRtl:l,rtlClasses:s}=Ce(),{themeClasses:r}=z(e),{locationStyles:u}=Ve(e),{textColorClasses:o,textColorStyles:m}=ce(e,"color"),{backgroundColorClasses:h,backgroundColorStyles:y}=de(c(()=>e.bgColor||e.color)),{backgroundColorClasses:d,backgroundColorStyles:v}=de(e,"color"),{roundedClasses:b}=H(e),{intersectionRef:g,isIntersecting:C}=it(),k=c(()=>parseInt(e.max,10)),f=c(()=>parseInt(e.height,10)),_=c(()=>parseFloat(e.bufferValue)/k.value*100),P=c(()=>parseFloat(n.value)/k.value*100),w=c(()=>l.value!==e.reverse),R=c(()=>e.indeterminate?"fade-transition":"slide-x-transition"),M=c(()=>e.bgOpacity==null?e.bgOpacity:parseFloat(e.bgOpacity));function X(p){if(!g.value)return;const{left:N,right:Y,width:$}=g.value.getBoundingClientRect(),j=w.value?$-p.clientX+(Y-$):p.clientX-N;n.value=Math.round(j/$*k.value)}return E(()=>i(e.tag,{ref:g,class:["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&C.value,"v-progress-linear--reverse":w.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},b.value,r.value,s.value,e.class],style:[{bottom:e.location==="bottom"?0:void 0,top:e.location==="top"?0:void 0,height:e.active?B(f.value):0,"--v-progress-linear-height":B(f.value),...u.value},e.style],role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:P.value,onClick:e.clickable&&X},{default:()=>[e.stream&&i("div",{key:"stream",class:["v-progress-linear__stream",o.value],style:{...m.value,[w.value?"left":"right"]:B(-f.value),borderTop:`${B(f.value/2)} dotted`,opacity:M.value,top:`calc(50% - ${B(f.value/4)})`,width:B(100-_.value,"%"),"--v-progress-linear-stream-to":B(f.value*(w.value?1:-1))}},null),i("div",{class:["v-progress-linear__background",h.value],style:[y.value,{opacity:M.value,width:B(e.stream?_.value:100,"%")}]},null),i(Jt,{name:R.value},{default:()=>[e.indeterminate?i("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map(p=>i("div",{key:p,class:["v-progress-linear__indeterminate",p,d.value],style:v.value},null))]):i("div",{class:["v-progress-linear__determinate",d.value],style:[v.value,{width:B(P.value,"%")}]},null)]}),t.default&&i("div",{class:"v-progress-linear__content"},[t.default({value:P.value,buffer:_.value})])]})),{}}}),rt=S({loading:[Boolean,String]},"loader");function ot(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:ie();return{loaderClasses:c(()=>({[`${a}--loading`]:e.loading}))}}function _n(e,a){var n;let{slots:t}=a;return i("div",{class:`${e.name}__loader`},[((n=t.default)==null?void 0:n.call(t,{color:e.color,isActive:e.active}))||i(Cn,{active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const kn=["static","relative","fixed","absolute","sticky"],ut=S({position:{type:String,validator:e=>kn.includes(e)}},"position");function ct(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:ie();return{positionClasses:c(()=>e.position?`${a}--${e.position}`:void 0)}}function dt(e,a){const t=Qt("RouterLink"),n=c(()=>!!(e.href||e.to)),l=c(()=>(n==null?void 0:n.value)||Ae(a,"click")||Ae(e,"click"));if(typeof t=="string")return{isLink:n,isClickable:l,href:T(e,"href")};const s=e.to?t.useLink(e):void 0;return{isLink:n,isClickable:l,route:s==null?void 0:s.route,navigate:s==null?void 0:s.navigate,isActive:s&&c(()=>{var r,u;return e.exact?(r=s.isExactActive)==null?void 0:r.value:(u=s.isActive)==null?void 0:u.value}),href:c(()=>e.to?s==null?void 0:s.route.value.href:e.href)}}const vt=S({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");function Sn(e,a){be(()=>{var t;return(t=e.isActive)==null?void 0:t.value},t=>{e.isLink.value&&t&&a&&Zt(()=>{a(!0)})},{immediate:!0})}const ve=Symbol("rippleStop"),pn=80;function Oe(e,a){e.style.transform=a,e.style.webkitTransform=a}function fe(e){return e.constructor.name==="TouchEvent"}function ft(e){return e.constructor.name==="KeyboardEvent"}const Vn=function(e,a){var y;let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=0,l=0;if(!ft(e)){const d=a.getBoundingClientRect(),v=fe(e)?e.touches[e.touches.length-1]:e;n=v.clientX-d.left,l=v.clientY-d.top}let s=0,r=.3;(y=a._ripple)!=null&&y.circle?(r=.15,s=a.clientWidth/2,s=t.center?s:s+Math.sqrt((n-s)**2+(l-s)**2)/4):s=Math.sqrt(a.clientWidth**2+a.clientHeight**2)/2;const u=`${(a.clientWidth-s*2)/2}px`,o=`${(a.clientHeight-s*2)/2}px`,m=t.center?u:`${n-s}px`,h=t.center?o:`${l-s}px`;return{radius:s,scale:r,x:m,y:h,centerX:u,centerY:o}},ee={show(e,a){var v;let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!((v=a==null?void 0:a._ripple)!=null&&v.enabled))return;const n=document.createElement("span"),l=document.createElement("span");n.appendChild(l),n.className="v-ripple__container",t.class&&(n.className+=` ${t.class}`);const{radius:s,scale:r,x:u,y:o,centerX:m,centerY:h}=Vn(e,a,t),y=`${s*2}px`;l.className="v-ripple__animation",l.style.width=y,l.style.height=y,a.appendChild(n);const d=window.getComputedStyle(a);d&&d.position==="static"&&(a.style.position="relative",a.dataset.previousPosition="static"),l.classList.add("v-ripple__animation--enter"),l.classList.add("v-ripple__animation--visible"),Oe(l,`translate(${u}, ${o}) scale3d(${r},${r},${r})`),l.dataset.activated=String(performance.now()),setTimeout(()=>{l.classList.remove("v-ripple__animation--enter"),l.classList.add("v-ripple__animation--in"),Oe(l,`translate(${m}, ${h}) scale3d(1,1,1)`)},0)},hide(e){var s;if(!((s=e==null?void 0:e._ripple)!=null&&s.enabled))return;const a=e.getElementsByClassName("v-ripple__animation");if(a.length===0)return;const t=a[a.length-1];if(t.dataset.isHiding)return;t.dataset.isHiding="true";const n=performance.now()-Number(t.dataset.activated),l=Math.max(250-n,0);setTimeout(()=>{t.classList.remove("v-ripple__animation--in"),t.classList.add("v-ripple__animation--out"),setTimeout(()=>{var u;e.getElementsByClassName("v-ripple__animation").length===1&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),((u=t.parentNode)==null?void 0:u.parentNode)===e&&e.removeChild(t.parentNode)},300)},l)}};function mt(e){return typeof e>"u"||!!e}function q(e){const a={},t=e.currentTarget;if(!(!(t!=null&&t._ripple)||t._ripple.touched||e[ve])){if(e[ve]=!0,fe(e))t._ripple.touched=!0,t._ripple.isTouch=!0;else if(t._ripple.isTouch)return;if(a.center=t._ripple.centered||ft(e),t._ripple.class&&(a.class=t._ripple.class),fe(e)){if(t._ripple.showTimerCommit)return;t._ripple.showTimerCommit=()=>{ee.show(e,t,a)},t._ripple.showTimer=window.setTimeout(()=>{var n;(n=t==null?void 0:t._ripple)!=null&&n.showTimerCommit&&(t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null)},pn)}else ee.show(e,t,a)}}function Ge(e){e[ve]=!0}function x(e){const a=e.currentTarget;if(a!=null&&a._ripple){if(window.clearTimeout(a._ripple.showTimer),e.type==="touchend"&&a._ripple.showTimerCommit){a._ripple.showTimerCommit(),a._ripple.showTimerCommit=null,a._ripple.showTimer=window.setTimeout(()=>{x(e)});return}window.setTimeout(()=>{a._ripple&&(a._ripple.touched=!1)}),ee.hide(a)}}function gt(e){const a=e.currentTarget;a!=null&&a._ripple&&(a._ripple.showTimerCommit&&(a._ripple.showTimerCommit=null),window.clearTimeout(a._ripple.showTimer))}let K=!1;function ht(e){!K&&(e.keyCode===$e.enter||e.keyCode===$e.space)&&(K=!0,q(e))}function yt(e){K=!1,x(e)}function bt(e){K&&(K=!1,x(e))}function Ct(e,a,t){const{value:n,modifiers:l}=a,s=mt(n);if(s||ee.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=s,e._ripple.centered=l.center,e._ripple.circle=l.circle,en(n)&&n.class&&(e._ripple.class=n.class),s&&!t){if(l.stop){e.addEventListener("touchstart",Ge,{passive:!0}),e.addEventListener("mousedown",Ge);return}e.addEventListener("touchstart",q,{passive:!0}),e.addEventListener("touchend",x,{passive:!0}),e.addEventListener("touchmove",gt,{passive:!0}),e.addEventListener("touchcancel",x),e.addEventListener("mousedown",q),e.addEventListener("mouseup",x),e.addEventListener("mouseleave",x),e.addEventListener("keydown",ht),e.addEventListener("keyup",yt),e.addEventListener("blur",bt),e.addEventListener("dragstart",x,{passive:!0})}else!s&&t&&_t(e)}function _t(e){e.removeEventListener("mousedown",q),e.removeEventListener("touchstart",q),e.removeEventListener("touchend",x),e.removeEventListener("touchmove",gt),e.removeEventListener("touchcancel",x),e.removeEventListener("mouseup",x),e.removeEventListener("mouseleave",x),e.removeEventListener("keydown",ht),e.removeEventListener("keyup",yt),e.removeEventListener("dragstart",x),e.removeEventListener("blur",bt)}function wn(e,a){Ct(e,a,!1)}function In(e){delete e._ripple,_t(e)}function xn(e,a){if(a.value===a.oldValue)return;const t=mt(a.oldValue);Ct(e,a,t)}const kt={mounted:wn,unmounted:In,updated:xn},Ln=S({active:{type:Boolean,default:void 0},symbol:{type:null,default:lt},flat:Boolean,icon:[Boolean,String,Function,Object],prependIcon:O,appendIcon:O,block:Boolean,stacked:Boolean,ripple:{type:[Boolean,Object],default:!0},text:String,...te(),...L(),...J(),...Xe(),...ne(),...cn(),...rt(),...pe(),...ut(),...U(),...vt(),...me(),...A({tag:"button"}),...G(),...ue({variant:"elevated"})},"VBtn"),Q=I()({name:"VBtn",directives:{Ripple:kt},props:Ln(),emits:{"group:selected":e=>!0},setup(e,a){let{attrs:t,slots:n}=a;const{themeClasses:l}=z(e),{borderClasses:s}=ae(e),{colorClasses:r,colorStyles:u,variantClasses:o}=Se(e),{densityClasses:m}=oe(e),{dimensionStyles:h}=Ye(e),{elevationClasses:y}=se(e),{loaderClasses:d}=ot(e),{locationStyles:v}=Ve(e),{positionClasses:b}=ct(e),{roundedClasses:g}=H(e),{sizeClasses:C,sizeStyles:k}=ge(e),f=dn(e,e.symbol,!1),_=dt(e,t),P=c(()=>{var p;return e.active!==void 0?e.active:_.isLink.value?(p=_.isActive)==null?void 0:p.value:f==null?void 0:f.isSelected.value}),w=c(()=>(f==null?void 0:f.disabled.value)||e.disabled),R=c(()=>e.variant==="elevated"&&!(e.disabled||e.flat||e.border)),M=c(()=>{if(e.value!==void 0)return Object(e.value)===e.value?JSON.stringify(e.value,null,0):e.value});function X(p){var N;w.value||_.isLink.value&&(p.metaKey||p.ctrlKey||p.shiftKey||p.button!==0||t.target==="_blank")||((N=_.navigate)==null||N.call(_,p),f==null||f.toggle())}return Sn(_,f==null?void 0:f.select),E(()=>{var xe,Le;const p=_.isLink.value?"a":e.tag,N=!!(e.prependIcon||n.prepend),Y=!!(e.appendIcon||n.append),$=!!(e.icon&&e.icon!==!0),j=(f==null?void 0:f.isSelected.value)&&(!_.isLink.value||((xe=_.isActive)==null?void 0:xe.value))||!f||((Le=_.isActive)==null?void 0:Le.value);return tt(i(p,{type:p==="a"?void 0:"button",class:["v-btn",f==null?void 0:f.selectedClass.value,{"v-btn--active":P.value,"v-btn--block":e.block,"v-btn--disabled":w.value,"v-btn--elevated":R.value,"v-btn--flat":e.flat,"v-btn--icon":!!e.icon,"v-btn--loading":e.loading,"v-btn--stacked":e.stacked},l.value,s.value,j?r.value:void 0,m.value,y.value,d.value,b.value,g.value,C.value,o.value,e.class],style:[j?u.value:void 0,h.value,v.value,k.value,e.style],disabled:w.value||void 0,href:_.href.value,onClick:X,value:M.value},{default:()=>{var Pe;return[ke(!0,"v-btn"),!e.icon&&N&&i("span",{key:"prepend",class:"v-btn__prepend"},[n.prepend?i(D,{key:"prepend-defaults",disabled:!e.prependIcon,defaults:{VIcon:{icon:e.prependIcon}}},n.prepend):i(Z,{key:"prepend-icon",icon:e.prependIcon},null)]),i("span",{class:"v-btn__content","data-no-activator":""},[!n.default&&$?i(Z,{key:"content-icon",icon:e.icon},null):i(D,{key:"content-defaults",disabled:!$,defaults:{VIcon:{icon:e.icon}}},{default:()=>{var Be;return[((Be=n.default)==null?void 0:Be.call(n))??e.text]}})]),!e.icon&&Y&&i("span",{key:"append",class:"v-btn__append"},[n.append?i(D,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VIcon:{icon:e.appendIcon}}},n.append):i(Z,{key:"append-icon",icon:e.appendIcon},null)]),!!e.loading&&i("span",{key:"loader",class:"v-btn__loader"},[((Pe=n.loader)==null?void 0:Pe.call(n))??i(yn,{color:typeof e.loading=="boolean"?void 0:e.loading,indeterminate:!0,size:"23",width:"2"},null)])]}}),[[nt("ripple"),!w.value&&e.ripple,null]])}),{}}}),Pn=(e,a)=>{const t=e.__vccOpts||e;for(const[n,l]of a)t[n]=l;return t};const St=I()({name:"VCardActions",props:L(),setup(e,a){let{slots:t}=a;return qe({VBtn:{variant:"text"}}),E(()=>{var n;return i("div",{class:["v-card-actions",e.class],style:e.style},[(n=t.default)==null?void 0:n.call(t)])}),{}}}),Bn=_e("v-card-subtitle"),pt=_e("v-card-title");const En=S({start:Boolean,end:Boolean,icon:O,image:String,...L(),...J(),...U(),...me(),...A(),...G(),...ue({variant:"flat"})},"VAvatar"),ze=I()({name:"VAvatar",props:En(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=z(e),{colorClasses:l,colorStyles:s,variantClasses:r}=Se(e),{densityClasses:u}=oe(e),{roundedClasses:o}=H(e),{sizeClasses:m,sizeStyles:h}=ge(e);return E(()=>i(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},n.value,l.value,u.value,o.value,m.value,r.value,e.class],style:[s.value,h.value,e.style]},{default:()=>{var y;return[e.image?i(We,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?i(Z,{key:"icon",icon:e.icon},null):(y=t.default)==null?void 0:y.call(t),ke(!1,"v-avatar")]}})),{}}}),Tn=S({appendAvatar:String,appendIcon:O,prependAvatar:String,prependIcon:O,subtitle:String,title:String,...L(),...J()},"VCardItem"),An=I()({name:"VCardItem",props:Tn(),setup(e,a){let{slots:t}=a;return E(()=>{var m;const n=!!(e.prependAvatar||e.prependIcon),l=!!(n||t.prepend),s=!!(e.appendAvatar||e.appendIcon),r=!!(s||t.append),u=!!(e.title||t.title),o=!!(e.subtitle||t.subtitle);return i("div",{class:["v-card-item",e.class],style:e.style},[l&&i("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?i(D,{key:"prepend-defaults",disabled:!n,defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar}}},t.prepend):n&&i(ze,{key:"prepend-avatar",density:e.density,icon:e.prependIcon,image:e.prependAvatar},null)]),i("div",{class:"v-card-item__content"},[u&&i(pt,{key:"title"},{default:()=>{var h;return[((h=t.title)==null?void 0:h.call(t))??e.title]}}),o&&i(Bn,{key:"subtitle"},{default:()=>{var h;return[((h=t.subtitle)==null?void 0:h.call(t))??e.subtitle]}}),(m=t.default)==null?void 0:m.call(t)]),r&&i("div",{key:"append",class:"v-card-item__append"},[t.append?i(D,{key:"append-defaults",disabled:!s,defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar}}},t.append):s&&i(ze,{key:"append-avatar",density:e.density,icon:e.appendIcon,image:e.appendAvatar},null)])])}),{}}}),$n=_e("v-card-text"),Nn=S({appendAvatar:String,appendIcon:O,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:O,ripple:{type:[Boolean,Object],default:!0},subtitle:String,text:String,title:String,...te(),...L(),...J(),...Xe(),...ne(),...rt(),...pe(),...ut(),...U(),...vt(),...A(),...G(),...ue({variant:"elevated"})},"VCard"),Rn=I()({name:"VCard",directives:{Ripple:kt},props:Nn(),setup(e,a){let{attrs:t,slots:n}=a;const{themeClasses:l}=z(e),{borderClasses:s}=ae(e),{colorClasses:r,colorStyles:u,variantClasses:o}=Se(e),{densityClasses:m}=oe(e),{dimensionStyles:h}=Ye(e),{elevationClasses:y}=se(e),{loaderClasses:d}=ot(e),{locationStyles:v}=Ve(e),{positionClasses:b}=ct(e),{roundedClasses:g}=H(e),C=dt(e,t),k=c(()=>e.link!==!1&&C.isLink.value),f=c(()=>!e.disabled&&e.link!==!1&&(e.link||C.isClickable.value));return E(()=>{const _=k.value?"a":e.tag,P=!!(n.title||e.title),w=!!(n.subtitle||e.subtitle),R=P||w,M=!!(n.append||e.appendAvatar||e.appendIcon),X=!!(n.prepend||e.prependAvatar||e.prependIcon),p=!!(n.image||e.image),N=R||X||M,Y=!!(n.text||e.text);return tt(i(_,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":f.value},l.value,s.value,r.value,m.value,y.value,d.value,b.value,g.value,o.value,e.class],style:[u.value,h.value,v.value,e.style],href:C.href.value,onClick:f.value&&C.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var $;return[p&&i("div",{key:"image",class:"v-card__image"},[n.image?i(D,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},n.image):i(We,{key:"image-img",cover:!0,src:e.image},null)]),i(_n,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:n.loader}),N&&i(An,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:n.item,prepend:n.prepend,title:n.title,subtitle:n.subtitle,append:n.append}),Y&&i($n,{key:"text"},{default:()=>{var j;return[((j=n.text)==null?void 0:j.call(n))??e.text]}}),($=n.default)==null?void 0:$.call(n),n.actions&&i(St,null,{default:n.actions}),ke(f.value,"v-card")]}}),[[nt("ripple"),f.value&&e.ripple]])}),{}}});const jn=S({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...te(),...L(),...ne(),...Nt(),...U(),...A({tag:"footer"}),...G()},"VFooter"),On=I()({name:"VFooter",props:jn(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=z(e),{backgroundColorClasses:l,backgroundColorStyles:s}=de(T(e,"color")),{borderClasses:r}=ae(e),{elevationClasses:u}=se(e),{roundedClasses:o}=H(e),m=et(32),{resizeRef:h}=He(v=>{v.length&&(m.value=v[0].target.clientHeight)}),y=c(()=>e.height==="auto"?m.value:parseInt(e.height,10)),{layoutItemStyles:d}=Rt({id:e.name,order:c(()=>parseInt(e.order,10)),position:c(()=>"bottom"),layoutSize:y,elementSize:c(()=>e.height==="auto"?void 0:y.value),active:c(()=>e.app),absolute:T(e,"absolute")});return E(()=>i(e.tag,{ref:h,class:["v-footer",n.value,l.value,r.value,u.value,o.value,e.class],style:[s.value,e.app?d.value:{height:B(e.height)},e.style]},t)),{}}});const Gn=S({fluid:{type:Boolean,default:!1},...L(),...A()},"VContainer"),Me=I()({name:"VContainer",props:Gn(),setup(e,a){let{slots:t}=a;const{rtlClasses:n}=Ce();return E(()=>i(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},n.value,e.class],style:e.style},t)),{}}}),Vt=(()=>re.reduce((e,a)=>(e[a]={type:[Boolean,String,Number],default:!1},e),{}))(),wt=(()=>re.reduce((e,a)=>{const t="offset"+le(a);return e[t]={type:[String,Number],default:null},e},{}))(),It=(()=>re.reduce((e,a)=>{const t="order"+le(a);return e[t]={type:[String,Number],default:null},e},{}))(),Fe={col:Object.keys(Vt),offset:Object.keys(wt),order:Object.keys(It)};function zn(e,a,t){let n=e;if(!(t==null||t===!1)){if(a){const l=a.replace(e,"");n+=`-${l}`}return e==="col"&&(n="v-"+n),e==="col"&&(t===""||t===!0)||(n+=`-${t}`),n.toLowerCase()}}const Mn=["auto","start","end","center","baseline","stretch"],Fn=S({cols:{type:[Boolean,String,Number],default:!1},...Vt,offset:{type:[String,Number],default:null},...wt,order:{type:[String,Number],default:null},...It,alignSelf:{type:String,default:null,validator:e=>Mn.includes(e)},...L(),...A()},"VCol"),De=I()({name:"VCol",props:Fn(),setup(e,a){let{slots:t}=a;const n=c(()=>{const l=[];let s;for(s in Fe)Fe[s].forEach(u=>{const o=e[u],m=zn(s,u,o);m&&l.push(m)});const r=l.some(u=>u.startsWith("v-col-"));return l.push({"v-col":!r||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),l});return()=>{var l;return he(e.tag,{class:[n.value,e.class],style:e.style},(l=t.default)==null?void 0:l.call(t))}}}),we=["start","end","center"],xt=["space-between","space-around","space-evenly"];function Ie(e,a){return re.reduce((t,n)=>{const l=e+le(n);return t[l]=a(),t},{})}const Dn=[...we,"baseline","stretch"],Lt=e=>Dn.includes(e),Pt=Ie("align",()=>({type:String,default:null,validator:Lt})),Un=[...we,...xt],Bt=e=>Un.includes(e),Et=Ie("justify",()=>({type:String,default:null,validator:Bt})),Hn=[...we,...xt,"stretch"],Tt=e=>Hn.includes(e),At=Ie("alignContent",()=>({type:String,default:null,validator:Tt})),Ue={align:Object.keys(Pt),justify:Object.keys(Et),alignContent:Object.keys(At)},Xn={align:"align",justify:"justify",alignContent:"align-content"};function Yn(e,a,t){let n=Xn[e];if(t!=null){if(a){const l=a.replace(e,"");n+=`-${l}`}return n+=`-${t}`,n.toLowerCase()}}const Wn=S({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:Lt},...Pt,justify:{type:String,default:null,validator:Bt},...Et,alignContent:{type:String,default:null,validator:Tt},...At,...L(),...A()},"VRow"),qn=I()({name:"VRow",props:Wn(),setup(e,a){let{slots:t}=a;const n=c(()=>{const l=[];let s;for(s in Ue)Ue[s].forEach(r=>{const u=e[r],o=Yn(s,r,u);o&&l.push(o)});return l.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),l});return()=>{var l;return he(e.tag,{class:["v-row",n.value,e.class],style:e.style},(l=t.default)==null?void 0:l.call(t))}}}),Kn={computed:{appleLink(){return"webcal://thesanogoeffect.github.io/forejt/forejt.ics"},outlookLink(){return"webcal://thesanogoeffect.github.io/forejt/forejt.ics"},icsLink(){return"https://thesanogoeffect.github.io/forejt/forejt.ics"},googleLink(){return"https://www.google.com/calendar/render?cid=webcal://thesanogoeffect.github.io/forejt/forejt.ics"}}},Jn=F("h1",{class:"display-1"},"Forejt",-1),Qn=F("span",{class:"headline"},"Custom iCal Variants",-1),Zn=["href"],ea=["href"],ta=["href"],na=["href"];function aa(e,a,t,n,l,s){return tn(),nn(jt,null,{default:V(()=>[i(Ot,null,{default:V(()=>[i(Me,{class:"text-center py-5"},{default:V(()=>[Jn]),_:1}),i(Me,{fluid:""},{default:V(()=>[i(qn,{align:"center",justify:"center"},{default:V(()=>[i(De,{cols:"12",md:"6",lg:"4"},{default:V(()=>[i(Rn,{class:"mx-auto mb-5"},{default:V(()=>[i(pt,{class:"text-center"},{default:V(()=>[Qn]),_:1}),i(St,{class:"justify-center"},{default:V(()=>[F("a",{href:s.appleLink},[i(Q,{color:"primary"},{default:V(()=>[W("Apple")]),_:1})],8,Zn),F("a",{href:s.outlookLink},[i(Q,{color:"primary"},{default:V(()=>[W("Outlook")]),_:1})],8,ea),F("a",{href:s.icsLink},[i(Q,{color:"primary"},{default:V(()=>[W(".ics")]),_:1})],8,ta),F("a",{href:s.googleLink},[i(Q,{color:"primary"},{default:V(()=>[W("Google")]),_:1})],8,na)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),i(On,{fixed:"",padless:""},{default:V(()=>[i(De,{class:"text-center py-2",cols:"12"},{default:V(()=>[W(" made with ❤️, by Jakub Werner ")]),_:1})]),_:1})]),_:1})}const ia=Pn(Kn,[["render",aa]]);export{ia as default};