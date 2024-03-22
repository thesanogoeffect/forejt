import{p as B,i as O,c as u,r as me,a as z,g as G,s as M,o as Q,b as ee,d as fe,e as ye,f as pe,h as ge,j as R,k as he,m as te,l as j,n as oe,u as be,q as h,t as J,v as we,w as Ie,x as _e,y as Se,z as P,A as N,B as $}from"./index-d9638af7.js";import{u as ae,m as q,a as D,b as xe,c as Ve,d as Ce,e as ne,f as ke,g as ze,h as Re,i as Be,V as $e}from"./VCol-c0ab6804.js";const A=Symbol.for("vuetify:layout"),se=Symbol.for("vuetify:layout-item"),Y=1e3,Le=B({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),Pe=B({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function Ae(){const e=O(A);if(!e)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function Me(e){const n=O(A);if(!n)throw new Error("[Vuetify] Could not find injected layout");const t=e.id??`layout-item-${fe()}`,s=G("useLayoutItem");ee(se,{id:t});const a=M(!1);ye(()=>a.value=!0),pe(()=>a.value=!1);const{layoutItemStyles:i,layoutItemScrimStyles:r}=n.register(s,{...e,active:u(()=>a.value?!1:e.active.value),id:t});return ge(()=>n.unregister(t)),{layoutItemStyles:i,layoutRect:n.layoutRect,layoutItemScrimStyles:r}}const Te=(e,n,t,s)=>{let a={top:0,left:0,right:0,bottom:0};const i=[{id:"",layer:{...a}}];for(const r of e){const m=n.get(r),f=t.get(r),y=s.get(r);if(!m||!f||!y)continue;const b={...a,[m.value]:parseInt(a[m.value],10)+(y.value?parseInt(f.value,10):0)};i.push({id:r,layer:b}),a=b}return i};function Ee(e){const n=O(A,null),t=u(()=>n?n.rootZIndex.value-100:Y),s=me([]),a=z(new Map),i=z(new Map),r=z(new Map),m=z(new Map),f=z(new Map),{resizeRef:y,contentRect:b}=ae(),L=u(()=>{const l=new Map,v=e.overlaps??[];for(const o of v.filter(d=>d.includes(":"))){const[d,c]=o.split(":");if(!s.value.includes(d)||!s.value.includes(c))continue;const g=a.get(d),I=a.get(c),V=i.get(d),C=i.get(c);!g||!I||!V||!C||(l.set(c,{position:g.value,amount:parseInt(V.value,10)}),l.set(d,{position:I.value,amount:-parseInt(C.value,10)}))}return l}),w=u(()=>{const l=[...new Set([...r.values()].map(o=>o.value))].sort((o,d)=>o-d),v=[];for(const o of l){const d=s.value.filter(c=>{var g;return((g=r.get(c))==null?void 0:g.value)===o});v.push(...d)}return Te(v,a,i,m)}),_=u(()=>!Array.from(f.values()).some(l=>l.value)),S=u(()=>w.value[w.value.length-1].layer),le=u(()=>({"--v-layout-left":R(S.value.left),"--v-layout-right":R(S.value.right),"--v-layout-top":R(S.value.top),"--v-layout-bottom":R(S.value.bottom),..._.value?void 0:{transition:"none"}})),x=u(()=>w.value.slice(1).map((l,v)=>{let{id:o}=l;const{layer:d}=w.value[v],c=i.get(o),g=a.get(o);return{id:o,...d,size:Number(c.value),position:g.value}})),K=l=>x.value.find(v=>v.id===l),T=G("createLayout"),U=M(!1);Q(()=>{U.value=!0}),ee(A,{register:(l,v)=>{let{id:o,order:d,position:c,layoutSize:g,elementSize:I,active:V,disableTransitions:C,absolute:re}=v;r.set(o,d),a.set(o,c),i.set(o,g),m.set(o,V),C&&f.set(o,C);const Z=he(se,T==null?void 0:T.vnode).indexOf(l);Z>-1?s.value.splice(Z,0,o):s.value.push(o);const W=u(()=>x.value.findIndex(k=>k.id===o)),E=u(()=>t.value+w.value.length*2-W.value*2),ce=u(()=>{const k=c.value==="left"||c.value==="right",F=c.value==="right",ve=c.value==="bottom",X={[c.value]:0,zIndex:E.value,transform:`translate${k?"X":"Y"}(${(V.value?0:-110)*(F||ve?-1:1)}%)`,position:re.value||t.value!==Y?"absolute":"fixed",..._.value?void 0:{transition:"none"}};if(!U.value)return X;const p=x.value[W.value];if(!p)throw new Error(`[Vuetify] Could not find layout item "${o}"`);const H=L.value.get(o);return H&&(p[H.position]+=H.amount),{...X,height:k?`calc(100% - ${p.top}px - ${p.bottom}px)`:I.value?`${I.value}px`:void 0,left:F?void 0:`${p.left}px`,right:F?`${p.right}px`:void 0,top:c.value!=="bottom"?`${p.top}px`:void 0,bottom:c.value!=="top"?`${p.bottom}px`:void 0,width:k?I.value?`${I.value}px`:void 0:`calc(100% - ${p.left}px - ${p.right}px)`}}),de=u(()=>({zIndex:E.value-1}));return{layoutItemStyles:ce,layoutItemScrimStyles:de,zIndex:E}},unregister:l=>{r.delete(l),a.delete(l),i.delete(l),m.delete(l),f.delete(l),s.value=s.value.filter(v=>v!==l)},mainRect:S,mainStyles:le,getLayoutItem:K,items:x,layoutRect:b,rootZIndex:t});const ue=u(()=>["v-layout",{"v-layout--full-height":e.fullHeight}]),ie=u(()=>({zIndex:n?t.value:void 0,position:n?"relative":void 0,overflow:n?"hidden":void 0}));return{layoutClasses:ue,layoutStyles:ie,getLayoutItem:K,items:x,layoutRect:b,layoutRef:y}}const Fe=B({...q(),...Le({fullHeight:!0}),...te()},"VApp"),He=j()({name:"VApp",props:Fe(),setup(e,n){let{slots:t}=n;const s=oe(e),{layoutClasses:a,getLayoutItem:i,items:r,layoutRef:m}=Ee(e),{rtlClasses:f}=be();return D(()=>{var y;return h("div",{ref:m,class:["v-application",s.themeClasses.value,a.value,f.value,e.class],style:[e.style]},[h("div",{class:"v-application__wrap"},[(y=t.default)==null?void 0:y.call(t)])])}),{getLayoutItem:i,items:r,theme:s}}});const Ne=B({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...xe(),...q(),...Ve(),...Pe(),...Ce(),...ne({tag:"footer"}),...te()},"VFooter"),Oe=j()({name:"VFooter",props:Ne(),setup(e,n){let{slots:t}=n;const{themeClasses:s}=oe(e),{backgroundColorClasses:a,backgroundColorStyles:i}=ke(J(e,"color")),{borderClasses:r}=ze(e),{elevationClasses:m}=Re(e),{roundedClasses:f}=Be(e),y=M(32),{resizeRef:b}=ae(_=>{_.length&&(y.value=_[0].target.clientHeight)}),L=u(()=>e.height==="auto"?y.value:parseInt(e.height,10)),{layoutItemStyles:w}=Me({id:e.name,order:u(()=>parseInt(e.order,10)),position:u(()=>"bottom"),layoutSize:L,elementSize:u(()=>e.height==="auto"?void 0:L.value),active:u(()=>e.app),absolute:J(e,"absolute")});return D(()=>h(e.tag,{ref:b,class:["v-footer",s.value,a.value,r.value,m.value,f.value,e.class],style:[i.value,e.app?w.value:{height:R(e.height)},e.style]},t)),{}}});function je(){const e=M(!1);return Q(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:u(()=>e.value?void 0:{transition:"none !important"}),isBooted:we(e)}}const qe=B({scrollable:Boolean,...q(),...ne({tag:"main"})},"VMain"),De=j()({name:"VMain",props:qe(),setup(e,n){let{slots:t}=n;const{mainStyles:s}=Ae(),{ssrBootStyles:a}=je();return D(()=>h(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[s.value,a.value,e.style]},{default:()=>{var i,r;return[e.scrollable?h("div",{class:"v-main__scroller"},[(i=t.default)==null?void 0:i.call(t)]):(r=t.default)==null?void 0:r.call(t)]}})),{}}}),Ke=$("a",{href:"https://www.linkedin.com/in/jakubwerner"},"Jakub Werner",-1),Ue=$("br",null,null,-1),Ze=$("a",{href:"https://www.psmf.cz"},"psmf.cz",-1),We=$("br",null,null,-1),Xe=$("a",{href:"mailto:jakubwerner1@gmail.com"},"Contact",-1),Qe={__name:"DefaultView",setup(e){return(n,t)=>{const s=Ie("router-view");return _e(),Se(He,null,{default:P(()=>[h(De,null,{default:P(()=>[h(s)]),_:1}),h(Oe,{fixed:"",padless:""},{default:P(()=>[h($e,{class:"text-center py-2",cols:"12"},{default:P(()=>[N(" made with ❤️ by "),Ke,N(),Ue,N("using data from "),Ze,We,Xe]),_:1})]),_:1})]),_:1})}}};export{Qe as default};