import{r as d,j as e,l as P}from"./Footer-5b55d698.js";import{M as y,Q as o,f as R,T as b,S as C}from"./Spinner-fd53bf80.js";const A={id:"",name:""},l={id:"MODIFY_ID",name:"MODIFY_NAME",image:"MODIFY_IMAGE"};function S(t,a){switch(a.type){case l.id:return{...t,id:a.payload};case l.name:return{...t,name:a.payload};default:return t}}function N({breed:t,option:a,open:g,setOpen:c,setMustLoad:h,setHelper:x,actions:E=!0,mustBeToast:v=!0,onChangeComponent:u}){const i={method:a==="Crear"?"POST":"PUT",url:a!=="Actualizar"?"/breeds/store":"/breeds/update",sucessMessage:a==="Crear"?"Raza agregada":"Raza actualizada",loadingMessage:a!=="Actualizar"?"Agregando raza":"Actualizando raza"},[p,f]=d.useReducer(S,t),[M,m]=d.useState(!1),T=r=>{r.preventDefault(),m(!0);const n=o(e.jsx(C,{message:i.loadingMessage}),{autoClose:1e4,hideProgressBar:!0});R(i.method,i.url,p).then(s=>{if(s.errors)return o.update(n,{render:e.jsx(e.Fragment,{children:e.jsx(b,{data:s.errors})}),type:o.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});o.update(n,{render:i.sucessMessage,type:o.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),E&&(h(!1),x(j=>j+1)),c(!1),typeof u=="function"&&u(s)}).catch(s=>{console.log(s),o.update(n,{render:"Hay problemas de conexión",type:o.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})}).finally(()=>m(!1))};return d.useEffect(()=>{for(const r in l){const n=l[r],s=t.hasOwnProperty(r)?t[r]:"";f({type:n,payload:s})}},[t]),e.jsxs(e.Fragment,{children:[e.jsx(y,{option:a,open:g,setOpen:c,isLoading:M,handleSubmit:T,icon:P,text:"Raza",children:e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:p.name,onChange:r=>{f({type:l.name,payload:r.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Nombre"})]})}),v&&e.jsx(y.ToastifyModal,{})]})}export{N as B,A as i};
