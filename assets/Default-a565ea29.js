import{p as $,i as O,c as u,r as fe,a as B,g as G,s as M,o as Q,b as ee,d as R,f as ye,e as pe,h as he,j as ge,k as be,m as te,l as j,n as oe,t as J,q as h,u as _e,v as we,w as ae,x as Ie,y as P,z as N,F as xe,A as I,B as Se,C as Ve}from"./index-54252110.js";import{u as ne,m as Ce,a as q,b as ke,c as ze,d as se,e as Be,f as Re,g as $e,h as Le,i as D,V as Pe}from"./VCol-a3e54490.js";const A=Symbol.for("vuetify:layout"),le=Symbol.for("vuetify:layout-item"),Y=1e3,Ae=$({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),Me=$({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function Fe(){const e=O(A);if(!e)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function Ee(e){const a=O(A);if(!a)throw new Error("[Vuetify] Could not find injected layout");const t=e.id??`layout-item-${pe()}`,s=G("useLayoutItem");ee(le,{id:t});const n=M(!1);he(()=>n.value=!0),ge(()=>n.value=!1);const{layoutItemStyles:i,layoutItemScrimStyles:r}=a.register(s,{...e,active:u(()=>n.value?!1:e.active.value),id:t});return be(()=>a.unregister(t)),{layoutItemStyles:i,layoutRect:a.layoutRect,layoutItemScrimStyles:r}}const Te=(e,a,t,s)=>{let n={top:0,left:0,right:0,bottom:0};const i=[{id:"",layer:{...n}}];for(const r of e){const m=a.get(r),f=t.get(r),y=s.get(r);if(!m||!f||!y)continue;const b={...n,[m.value]:parseInt(n[m.value],10)+(y.value?parseInt(f.value,10):0)};i.push({id:r,layer:b}),n=b}return i};function He(e){const a=O(A,null),t=u(()=>a?a.rootZIndex.value-100:Y),s=fe([]),n=B(new Map),i=B(new Map),r=B(new Map),m=B(new Map),f=B(new Map),{resizeRef:y,contentRect:b}=ne(),L=u(()=>{const l=new Map,v=e.overlaps??[];for(const o of v.filter(d=>d.includes(":"))){const[d,c]=o.split(":");if(!s.value.includes(d)||!s.value.includes(c))continue;const g=n.get(d),w=n.get(c),C=i.get(d),k=i.get(c);!g||!w||!C||!k||(l.set(c,{position:g.value,amount:parseInt(C.value,10)}),l.set(d,{position:w.value,amount:-parseInt(k.value,10)}))}return l}),_=u(()=>{const l=[...new Set([...r.values()].map(o=>o.value))].sort((o,d)=>o-d),v=[];for(const o of l){const d=s.value.filter(c=>{var g;return((g=r.get(c))==null?void 0:g.value)===o});v.push(...d)}return Te(v,n,i,m)}),x=u(()=>!Array.from(f.values()).some(l=>l.value)),S=u(()=>_.value[_.value.length-1].layer),ue=u(()=>({"--v-layout-left":R(S.value.left),"--v-layout-right":R(S.value.right),"--v-layout-top":R(S.value.top),"--v-layout-bottom":R(S.value.bottom),...x.value?void 0:{transition:"none"}})),V=u(()=>_.value.slice(1).map((l,v)=>{let{id:o}=l;const{layer:d}=_.value[v],c=i.get(o),g=n.get(o);return{id:o,...d,size:Number(c.value),position:g.value}})),K=l=>V.value.find(v=>v.id===l),F=G("createLayout"),U=M(!1);Q(()=>{U.value=!0}),ee(A,{register:(l,v)=>{let{id:o,order:d,position:c,layoutSize:g,elementSize:w,active:C,disableTransitions:k,absolute:ce}=v;r.set(o,d),n.set(o,c),i.set(o,g),m.set(o,C),k&&f.set(o,k);const Z=ye(le,F==null?void 0:F.vnode).indexOf(l);Z>-1?s.value.splice(Z,0,o):s.value.push(o);const W=u(()=>V.value.findIndex(z=>z.id===o)),E=u(()=>t.value+_.value.length*2-W.value*2),de=u(()=>{const z=c.value==="left"||c.value==="right",T=c.value==="right",me=c.value==="bottom",X={[c.value]:0,zIndex:E.value,transform:`translate${z?"X":"Y"}(${(C.value?0:-110)*(T||me?-1:1)}%)`,position:ce.value||t.value!==Y?"absolute":"fixed",...x.value?void 0:{transition:"none"}};if(!U.value)return X;const p=V.value[W.value];if(!p)throw new Error(`[Vuetify] Could not find layout item "${o}"`);const H=L.value.get(o);return H&&(p[H.position]+=H.amount),{...X,height:z?`calc(100% - ${p.top}px - ${p.bottom}px)`:w.value?`${w.value}px`:void 0,left:T?void 0:`${p.left}px`,right:T?`${p.right}px`:void 0,top:c.value!=="bottom"?`${p.top}px`:void 0,bottom:c.value!=="top"?`${p.bottom}px`:void 0,width:z?w.value?`${w.value}px`:void 0:`calc(100% - ${p.left}px - ${p.right}px)`}}),ve=u(()=>({zIndex:E.value-1}));return{layoutItemStyles:de,layoutItemScrimStyles:ve,zIndex:E}},unregister:l=>{r.delete(l),n.delete(l),i.delete(l),m.delete(l),f.delete(l),s.value=s.value.filter(v=>v!==l)},mainRect:S,mainStyles:ue,getLayoutItem:K,items:V,layoutRect:b,rootZIndex:t});const ie=u(()=>["v-layout",{"v-layout--full-height":e.fullHeight}]),re=u(()=>({zIndex:a?t.value:void 0,position:a?"relative":void 0,overflow:a?"hidden":void 0}));return{layoutClasses:ie,layoutStyles:re,getLayoutItem:K,items:V,layoutRect:b,layoutRef:y}}const Ne=$({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...Ce(),...q(),...ke(),...Me(),...ze(),...se({tag:"footer"}),...te()},"VFooter"),Oe=j()({name:"VFooter",props:Ne(),setup(e,a){let{slots:t}=a;const{themeClasses:s}=oe(e),{backgroundColorClasses:n,backgroundColorStyles:i}=Be(J(e,"color")),{borderClasses:r}=Re(e),{elevationClasses:m}=$e(e),{roundedClasses:f}=Le(e),y=M(32),{resizeRef:b}=ne(x=>{x.length&&(y.value=x[0].target.clientHeight)}),L=u(()=>e.height==="auto"?y.value:parseInt(e.height,10)),{layoutItemStyles:_}=Ee({id:e.name,order:u(()=>parseInt(e.order,10)),position:u(()=>"bottom"),layoutSize:L,elementSize:u(()=>e.height==="auto"?void 0:L.value),active:u(()=>e.app),absolute:J(e,"absolute")});return D(()=>h(e.tag,{ref:b,class:["v-footer",s.value,n.value,r.value,m.value,f.value,e.class],style:[i.value,e.app?_.value:{height:R(e.height)},e.style]},t)),{}}});function je(){const e=M(!1);return Q(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:u(()=>e.value?void 0:{transition:"none !important"}),isBooted:_e(e)}}const qe=$({scrollable:Boolean,...q(),...se({tag:"main"})},"VMain"),De=j()({name:"VMain",props:qe(),setup(e,a){let{slots:t}=a;const{mainStyles:s}=Fe(),{ssrBootStyles:n}=je();return D(()=>h(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[s.value,n.value,e.style]},{default:()=>{var i,r;return[e.scrollable?h("div",{class:"v-main__scroller"},[(i=t.default)==null?void 0:i.call(t)]):(r=t.default)==null?void 0:r.call(t)]}})),{}}}),Ke=I("a",{href:"https://www.linkedin.com/in/jakubwerner"},"Jakub Werner",-1),Ue=I("br",null,null,-1),Ze=I("a",{href:"https://www.psmf.cz"},"psmf.cz",-1),We=I("br",null,null,-1),Xe=I("br",null,null,-1),Je=I("br",null,null,-1),Ye=I("a",{href:"mailto:jakubwerner1@gmail.com"},"Contact",-1),Ge={__name:"View",setup(e){return(a,t)=>{const s=we("router-view");return ae(),Ie(xe,null,[h(De,null,{default:P(()=>[h(s)]),_:1}),h(Oe,{fixed:"",padless:""},{default:P(()=>[h(Pe,{class:"text-center py-2",cols:"12"},{default:P(()=>[N(" made with ❤️ by "),Ke,N(),Ue,N("using data from "),Ze,We,Xe,Je,Ye]),_:1})]),_:1})],64)}}};const Qe=$({...q(),...Ae({fullHeight:!0}),...te()},"VApp"),et=j()({name:"VApp",props:Qe(),setup(e,a){let{slots:t}=a;const s=oe(e),{layoutClasses:n,getLayoutItem:i,items:r,layoutRef:m}=He(e),{rtlClasses:f}=Se();return D(()=>{var y;return h("div",{ref:m,class:["v-application",s.themeClasses.value,n.value,f.value,e.class],style:[e.style]},[h("div",{class:"v-application__wrap"},[(y=t.default)==null?void 0:y.call(t)])])}),{getLayoutItem:i,items:r,theme:s}}}),nt={__name:"Default",setup(e){return(a,t)=>(ae(),Ve(et,null,{default:P(()=>[h(Ge)]),_:1}))}};export{nt as default};
