import{a as i,b as y,h as a,C as c}from"./entry.c1fb098b.js";const l=i({props:{path:{type:String,required:!1,default:"/"},query:{type:Object,required:!1,default:void 0}},render(d){const e=y(),{path:o,query:f}=d,p=Object.assign(f||{},{path:o}),u=(t,n)=>a("pre",null,JSON.stringify({message:"You should use slots with <ContentList>",slot:t,data:n},null,2));return a(c,p,{default:e!=null&&e.default?({data:t,refresh:n,isPartial:r})=>e==null?void 0:e.default({list:t,refresh:n,isPartial:r,...this.$attrs}):({data:t})=>u("default",t),empty:t=>e!=null&&e.empty?e.empty(t):({data:n})=>u("default",n),"not-found":t=>{var n;return e!=null&&e["not-found"]?(n=e==null?void 0:e["not-found"])==null?void 0:n.call(e,t):({data:r})=>u("not-found",r)}})}});export{l as default};
