import{j as e,r as n,k as R,d as H,H as I,I as z,e as U,F as q}from"./Footer-b3d1db75.js";import{F as G}from"./Filters-2dba2531.js";import{e as Q,s as W,Q as s,S as A,f as B,T as D,M as _,u as V,a as J,b as y,L as K}from"./Spinner-bdd0ae22.js";function X({serviceI:t,setService:r,setOption:h,setOpenModal:m,setHelper:f,setMustLoad:v,setMustAnimate:l,setIsDeleted:d}){const p=()=>{W("¿Quieres eliminar este servicio?",()=>{d(!0),l(!1);const c=s(e.jsx(A,{message:`Eliminando a ${t.name}`}),{autoClose:3e3,hideProgressBar:!0});B("DELETE","/services/destroy",{id:t.id}).then(o=>{if(v(!1),o.errors)return d(!1),s.update(c,{render:e.jsx(e.Fragment,{children:e.jsx(D,{data:o.errors})}),type:s.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(o.message)return d(!1),s.update(c,{render:e.jsx(e.Fragment,{children:o.message}),type:s.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});s.update(c,{render:`Servicio ${t.name} ha sido eliminado.`,type:s.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),f(b=>b+1)}).catch(o=>{d(!1),s.update(c,{render:"Hay problemas de conexión",type:s.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})})})};return e.jsxs("div",{className:"flex flex-wrap flex-col md:flex-row p-2 md:p-0 md:mx-5",children:[e.jsxs("p",{className:"uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center md:text-start md:w-5/12 m-auto",children:["Nombre: ",t.name]}),e.jsxs("p",{className:"text-gray-900 font-semibold text-center m-auto",children:["Código: ",Q("S",t.id)]}),e.jsxs("p",{className:"text-gray-900 font-semibold text-center m-auto",children:["Precio: S/",t.price]}),e.jsxs("div",{className:"my-3 flex justify-center items-center gap-2",children:[e.jsx("button",{className:"bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400",onClick:()=>{h("Actualizar"),m(!0),r(t)},children:"Editar"}),e.jsx("button",{className:"bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500",onClick:p,children:"Eliminar"})]})]})}const x={id:"MODIFY_ID",name:"MODIFY_NAME",price:"MODIFY_PRICE"};function Z(t,r){switch(r.type){case x.id:return{...t,id:r.payload};case x.name:return{...t,name:r.payload};case x.price:return{...t,price:r.payload};default:return t}}function ee({service:t,option:r,open:h,setOpen:m,setMustLoad:f,setHelper:v}){const l={method:r==="Crear"?"POST":"PUT",url:r!=="Actualizar"?"/services/store":"/services/update",sucessMessage:r==="Crear"?"Servicio agregado":"Servicio actualizado",loadingMessage:r!=="Actualizar"?"Agregando servicio":"Actualizando servicio"},[d,p]=n.useReducer(Z,t),[c,o]=n.useState(!1),b=i=>{i.preventDefault(),o(!0);const g=s(e.jsx(A,{message:l.loadingMessage}),{autoClose:1e4,hideProgressBar:!0});B(l.method,l.url,d).then(a=>{if(a.errors)return s.update(g,{render:e.jsx(e.Fragment,{children:e.jsx(D,{data:a.errors})}),type:s.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});s.update(g,{render:l.sucessMessage,type:s.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),f(!1),v(j=>j+1),m(!1)}).catch(a=>{console.log(a),s.update(g,{render:"Hay problemas de conexión",type:s.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})}).finally(()=>o(!1))};return n.useEffect(()=>{for(const i in x){const g=x[i],a=t.hasOwnProperty(i)?t[i]:"";p({type:g,payload:a})}},[t]),e.jsxs(e.Fragment,{children:[e.jsxs(_,{option:r,open:h,setOpen:m,isLoading:c,handleSubmit:b,icon:R,text:"Servicio",children:[e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:d.name,onChange:i=>{p({type:x.name,payload:i.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Nombre"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:d.price,onChange:i=>{p({type:x.price,payload:i.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Precio"})]})]}),e.jsx(_.ToastifyModal,{})]})}function te(){var F,T,M;const t={id:"",name:"",price:""},r=[{name:"Nombre",value:"name"},{name:"Código",value:"id"}],[h,m]=n.useState(1),[f,v]=n.useState(12),[l,d]=n.useState("name"),[p,c]=n.useState(""),{debounceValue:o}=V(p,500),[b,i]=n.useState(0),g=`/services/list?page=${h}&limit=${f}&filter=${l}&inputFilter=${o}`,{data:a,loading:j}=J(g,[h,f,b]),[O,N]=n.useState("Crear"),[Y,E]=n.useState(!1),[k,w]=n.useState(t),[L,S]=n.useState(!0),[$,C]=n.useState(!0);return n.useEffect(()=>{j||(S(!0),C(!0),m(1),i(u=>u+1))},[o]),e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:R,message:"Gestión de servicios",name:"servicio",setOpen:E,setOption:N,setData:w,initialState:t}),e.jsx(G,{children:r.map((u,P)=>e.jsx("button",{className:`${l===u.value?"bg-vetgreen-200 text-white":"bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white"} cursor-pointer py-2 md:mx-2 mx-1 rounded-full flex-grow`,onClick:()=>{d(u.value),c("")},children:u.name},P))}),e.jsxs(y,{children:[e.jsx(y.Search,{inputFilter:p,setInputFilter:c,filter:l,filters:r,renderMoreFilters:!1}),e.jsx(y.FilterBar,{hide:!o,data:[{tag:(F=r.find(u=>u.value===l))==null?void 0:F.name,input:o,handleClick:()=>c("")}]}),e.jsx(y.CardContainer,{children:j&L?e.jsx(K,{message:"Cargando servicios"}):((T=a.data)==null?void 0:T.length)===0?e.jsx("div",{className:"bg-white p-4 border rounded shadow-lg text-center",children:e.jsxs("p",{className:"text-gray-600 text-lg",children:[e.jsx(z,{icon:U,css:"mr-3"}),"No hay datos disponibles."]})}):e.jsx(e.Fragment,{children:(M=a==null?void 0:a.data)==null?void 0:M.map((u,P)=>e.jsx(y.CardContainer.Card,{mustAnimate:$,setMustAnimate:C,width:"w-full",children:e.jsx(X,{serviceI:u,setService:w,setOption:N,setOpenModal:E,setHelper:i,setMustLoad:S,setMustAnimate:C})},`${u.id}-${P}`))})}),e.jsx(y.Pagination,{pageQuantity:a.current_page*a.per_page,quantity:a.total,setMustLoad:S,setLimit:v,setPage:m,nextPage:a.next_page_url,prevPage:a.prev_page_url,page:a.current_page,lastPage:a.last_page,setMustAnimate:C})]}),e.jsx(ee,{service:k,option:O,open:Y,setOpen:E,setMustLoad:S,setHelper:i}),e.jsx(q,{})]})}const ae=H.createRoot(document.getElementById("service"));ae.render(e.jsx(te,{}));
