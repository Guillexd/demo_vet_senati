import{r as d,j as e,l as T}from"./Footer-b3d1db75.js";import{M as f,Q as s,f as j,T as P,S as R}from"./Spinner-bdd0ae22.js";const I={id:"",name:""},l={id:"MODIFY_ID",name:"MODIFY_NAME",image:"MODIFY_IMAGE"};function b(t,a){switch(a.type){case l.id:return{...t,id:a.payload};case l.name:return{...t,name:a.payload};default:return t}}function A({breed:t,option:a,open:g,setOpen:c,setMustLoad:y,setHelper:h,actions:x=!0,mustBeToast:E=!0}){const i={method:a==="Crear"?"POST":"PUT",url:a!=="Actualizar"?"/breeds/store":"/breeds/update",sucessMessage:a==="Crear"?"Raza agregada":"Raza actualizada",loadingMessage:a!=="Actualizar"?"Agregando raza":"Actualizando raza"},[u,p]=d.useReducer(b,t),[v,m]=d.useState(!1),M=r=>{r.preventDefault(),m(!0);const n=s(e.jsx(R,{message:i.loadingMessage}),{autoClose:1e4,hideProgressBar:!0});j(i.method,i.url,u).then(o=>{if(o.errors)return s.update(n,{render:e.jsx(e.Fragment,{children:e.jsx(P,{data:o.errors})}),type:s.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});s.update(n,{render:i.sucessMessage,type:s.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),x&&(y(!1),h(C=>C+1)),c(!1)}).catch(o=>{console.log(o),s.update(n,{render:"Hay problemas de conexión",type:s.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})}).finally(()=>m(!1))};return d.useEffect(()=>{for(const r in l){const n=l[r],o=t.hasOwnProperty(r)?t[r]:"";p({type:n,payload:o})}},[t]),e.jsxs(e.Fragment,{children:[e.jsx(f,{option:a,open:g,setOpen:c,isLoading:v,handleSubmit:M,icon:T,text:"Raza",children:e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:u.name,onChange:r=>{p({type:l.name,payload:r.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Nombre"})]})}),E&&e.jsx(f.ToastifyModal,{})]})}export{A as B,I as i};
