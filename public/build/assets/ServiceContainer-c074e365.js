import{j as e,r as s,k as P,d as I,H as U,D as q,I as Q,e as W,F as V}from"./Footer-5b55d698.js";import{F as J}from"./Filters-74b6bb7b.js";import{e as K,s as X,Q as n,S as R,f as O,T as Y,M,u as Z,a as ee,b,L as te}from"./Spinner-fd53bf80.js";import{B as ae}from"./ButtonStatus-966703df.js";function re({serviceI:t,setService:r,setOption:y,setOpenModal:m,setHelper:g,setMustLoad:v,setMustAnimate:l,rol:p,setIsDeleted:d}){const x=()=>{X("¿Quieres eliminar este servicio?",()=>{d(!0),l(!1);const i=n(e.jsx(R,{message:`Eliminando a ${t.name}`}),{autoClose:3e3,hideProgressBar:!0});O("DELETE","/services/destroy",{id:t.id}).then(u=>{if(v(!1),u.errors)return d(!1),n.update(i,{render:e.jsx(e.Fragment,{children:e.jsx(Y,{data:u.errors})}),type:n.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(u.message)return d(!1),n.update(i,{render:e.jsx(e.Fragment,{children:u.message}),type:n.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});n.update(i,{render:`Servicio ${t.name} ha sido eliminado.`,type:n.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),g(o=>o+1)}).catch(u=>{d(!1),n.update(i,{render:"Hay problemas de conexión",type:n.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})})})};return e.jsx("section",{className:`${!t.isActive&&"bg-gray-300"}`,children:e.jsxs("div",{className:"flex flex-wrap flex-col lg:flex-row my-3 p-2 md:p-0 md:px-5",children:[p==1&&e.jsx(ae,{isActive:t.isActive,id:t.id,name:t.name,model:"services",setHelper:g,setMustLoad:v,css:"bottom-2 right-2"}),e.jsxs("p",{className:"uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center md:text-start md:w-5/12 m-auto",children:["Nombre: ",t.name]}),e.jsxs("p",{className:"text-gray-900 font-semibold text-center m-auto",children:["Código: ",K("S",t.id)]}),e.jsxs("p",{className:"text-gray-900 font-semibold text-center m-auto",children:["Precio: S/",t.price]}),p==1&&e.jsxs("div",{className:"flex justify-center items-center gap-2 lg:me-10",children:[e.jsx("button",{className:"bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400",onClick:()=>{y("Actualizar"),m(!0),r(t)},children:"Editar"}),e.jsx("button",{className:"bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500",onClick:x,children:"Eliminar"})]})]})})}const f={id:"MODIFY_ID",name:"MODIFY_NAME",price:"MODIFY_PRICE"};function se(t,r){switch(r.type){case f.id:return{...t,id:r.payload};case f.name:return{...t,name:r.payload};case f.price:return{...t,price:r.payload};default:return t}}function ne({service:t,option:r,open:y,setOpen:m,setMustLoad:g,setHelper:v}){const l={method:r==="Crear"?"POST":"PUT",url:r!=="Actualizar"?"/services/store":"/services/update",sucessMessage:r==="Crear"?"Servicio agregado":"Servicio actualizado",loadingMessage:r!=="Actualizar"?"Agregando servicio":"Actualizando servicio"},[p,d]=s.useReducer(se,t),[x,i]=s.useState(!1),u=o=>{o.preventDefault(),i(!0);const h=n(e.jsx(R,{message:l.loadingMessage}),{autoClose:1e4,hideProgressBar:!0});O(l.method,l.url,p).then(a=>{if(a.errors)return n.update(h,{render:e.jsx(e.Fragment,{children:e.jsx(Y,{data:a.errors})}),type:n.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});n.update(h,{render:l.sucessMessage,type:n.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),g(!1),v(S=>S+1),m(!1)}).catch(a=>{console.log(a),n.update(h,{render:"Hay problemas de conexión",type:n.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})}).finally(()=>i(!1))};return s.useEffect(()=>{for(const o in f){const h=f[o],a=t.hasOwnProperty(o)?t[o]:"";d({type:h,payload:a})}},[t]),e.jsxs(e.Fragment,{children:[e.jsxs(M,{option:r,open:y,setOpen:m,isLoading:x,handleSubmit:u,icon:P,text:"Servicio",children:[e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:p.name,onChange:o=>{d({type:f.name,payload:o.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Nombre"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:p.price,onChange:o=>{d({type:f.price,payload:o.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Precio"})]})]}),e.jsx(M.ToastifyModal,{})]})}function oe(){var _,A,B;const t={id:"",name:"",price:""},r=[{name:"Nombre",value:"name"},{name:"Código",value:"id"}],[y,m]=s.useState(1),[g,v]=s.useState(12),[l,p]=s.useState("name"),[d,x]=s.useState(""),{debounceValue:i}=Z(d,500),[u,o]=s.useState(0),h=`/services/list?page=${y}&limit=${g}&filter=${l}&inputFilter=${i}`,{data:a,loading:S}=ee(h,[y,g,u]),[k,w]=s.useState("Crear"),[$,N]=s.useState(!1),[L,F]=s.useState(t),[H,C]=s.useState(!0),[z,E]=s.useState(!0);s.useEffect(()=>{S||(C(!0),E(!0),m(1),o(c=>c+1))},[i]);const[T,G]=s.useState(2);return s.useEffect(()=>{const j=document.getElementById("service").getAttribute("role");G(j)},[]),e.jsxs(e.Fragment,{children:[T==1?e.jsx(U,{icon:P,message:"Gestión de servicios",name:"servicio",setOpen:N,setOption:w,setData:F,initialState:t}):e.jsx(q,{icon:P,message:"Gestión de servicios"}),e.jsx(J,{children:r.map((c,j)=>e.jsx("button",{className:`${l===c.value?"bg-vetgreen-200 text-white":"bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white"} cursor-pointer py-2 md:mx-2 mx-1 rounded-full flex-grow`,onClick:()=>{var D;p(c.value),x(""),(D=document.getElementById("input_search"))==null||D.focus()},children:c.name},j))}),e.jsxs(b,{children:[e.jsx(b.Search,{inputFilter:d,setInputFilter:x,filter:l,filters:r,renderMoreFilters:!1}),e.jsx(b.FilterBar,{hide:!i,data:[{tag:(_=r.find(c=>c.value===l))==null?void 0:_.name,input:i,handleClick:()=>x("")}]}),e.jsx(b.CardContainer,{children:S&H?e.jsx(te,{message:"Cargando servicios"}):((A=a.data)==null?void 0:A.length)===0?e.jsx("div",{className:"bg-white p-4 border rounded shadow-lg text-center",children:e.jsxs("p",{className:"text-gray-600 text-lg",children:[e.jsx(Q,{icon:W,css:"mr-3"}),"No hay datos disponibles."]})}):e.jsx(e.Fragment,{children:(B=a==null?void 0:a.data)==null?void 0:B.map((c,j)=>e.jsx(b.CardContainer.Card,{mustAnimate:z,setMustAnimate:E,width:"w-full",children:e.jsx(re,{serviceI:c,setService:F,setOption:w,setOpenModal:N,setHelper:o,setMustLoad:C,setMustAnimate:E,rol:T})},`${c.id}-${j}`))})}),e.jsx(b.Pagination,{pageQuantity:a.current_page*a.per_page,quantity:a.total,setMustLoad:C,setLimit:v,setPage:m,nextPage:a.next_page_url,prevPage:a.prev_page_url,page:a.current_page,lastPage:a.last_page,setMustAnimate:E})]}),e.jsx(ne,{service:L,option:k,open:$,setOpen:N,setMustLoad:C,setHelper:o}),e.jsx(V,{})]})}const ie=I.createRoot(document.getElementById("service"));ie.render(e.jsx(oe,{}));
