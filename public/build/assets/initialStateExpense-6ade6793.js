import{r as d,j as e,C as P}from"./Footer-1433491c.js";import{M as y,Q as o,f as b,T as z,S as C}from"./Spinner-e40162ab.js";const l={id:"MODIFY_ID",reason:"MODIFY_REASON"};function M(r,a){switch(a.type){case l.id:return{...r,id:a.payload};case l.reason:return{...r,reason:a.payload};default:return r}}function I({expense:r,option:a,open:m,setOpen:c,setMustLoad:h,setHelper:x,actions:E=!0,mustBeToast:v=!0,onChangeComponent:u}){const i={method:a==="Crear"?"POST":"PUT",url:a!=="Actualizar"?"/expenses/store":"/expenses/update",sucessMessage:a==="Crear"?"Razón agregada":"Razón actualizada",loadingMessage:a!=="Actualizar"?"Agregando razón":"Actualizando razón"},[p,f]=d.useReducer(M,r),[R,g]=d.useState(!1),T=t=>{t.preventDefault(),g(!0);const n=o(e.jsx(C,{message:i.loadingMessage}),{autoClose:1e4,hideProgressBar:!0});b(i.method,i.url,p).then(s=>{if(s.errors)return o.update(n,{render:e.jsx(e.Fragment,{children:e.jsx(z,{data:s.errors})}),type:o.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});o.update(n,{render:i.sucessMessage,type:o.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),E&&(h(!1),x(j=>j+1)),c(!1),typeof u=="function"&&u(s)}).catch(s=>{console.log(s),o.update(n,{render:"Hay problemas de conexión",type:o.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})}).finally(()=>g(!1))};return d.useEffect(()=>{for(const t in l){const n=l[t],s=r.hasOwnProperty(t)?r[t]:"";f({type:n,payload:s})}},[r]),e.jsxs(e.Fragment,{children:[e.jsx(y,{option:a,open:m,setOpen:c,isLoading:R,handleSubmit:T,icon:P,text:"Razón",children:e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full order-1",children:[e.jsx("textarea",{className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",rows:"4",value:p.reason,onChange:t=>{f({type:l.reason,payload:t.target.value})}}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Razón de egreso"})]})}),v&&e.jsx(y.ToastifyModal,{})]})}const N={id:"",reason:""};export{I as E,N as i};