import{w as u,e as i,j as c,f as h,a as m,t as v,i as g,b as d,h as y}from"./entry.761f9dbe.js";const w=a=>{const t=a==null?void 0:a.params(),n=u(t?`/navigation/${i(t)}`:"/navigation");return $fetch(n,{method:"GET",responseType:"json",params:{_params:c(t||{}),previewToken:h("previewToken").value}})},C=m({props:{query:{type:Object,required:!1,default:void 0}},async setup(a){const{query:t}=v(a),{data:n,refresh:e}=await g(`content-navigation-${i(t.value)}`,()=>w(t.value),"$S4kfQoJwUW");return{data:n,refresh:e}},render(a){var o;const t=d(),{query:n,data:e,refresh:r}=a,s=(p,f)=>y("pre",null,JSON.stringify({message:"You should use slots with <ContentNavigation>",slot:p,data:f},null,2));return(t==null?void 0:t.empty)&&(!e||!(e!=null&&e.length))?((o=t==null?void 0:t.empty)==null?void 0:o.call(t,{query:n,...this.$attrs}))||s("empty",{query:n,data:e}):t!=null&&t.default?t.default({navigation:e,refresh:r,...this.$attrs}):s("default",e)}});export{C as default};
