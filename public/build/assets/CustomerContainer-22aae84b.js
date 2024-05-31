import{j as e,I as F,d as M,r as s,H as Y,g as Q,e as W,F as G}from"./Footer-5a793555.js";import{F as q}from"./Filters-5c1cd9b5.js";import{g as U,d as V,s as J,Q as o,S as K,f as X,T as Z,u as I,a as ee,b as g,L as te}from"./Spinner-0b2ec88a.js";import{f as k}from"./index-7c0738bf.js";import{C as ae,i as se}from"./initialStateCustomer-11164938.js";function ne({customerI:t,setCustomer:f,setOption:b,setOpenModal:r,setHelper:y,setMustLoad:_,setMustAnimate:p,setIsDeleted:j}){var u,d,x;const v=()=>{J("¿Quieres eliminar este cliente?",()=>{j(!0),p(!1);const i=o(e.jsx(K,{message:`Eliminando a ${t.name}`}),{autoClose:3e3,hideProgressBar:!0});X("DELETE","/customers/destroy",{id:t.id}).then(l=>{if(_(!1),l.errors)return j(!1),o.update(i,{render:e.jsx(e.Fragment,{children:e.jsx(Z,{data:l.errors})}),type:o.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(l.message)return j(!1),o.update(i,{render:e.jsx(e.Fragment,{children:l.message}),type:o.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});o.update(i,{render:`Cliente ${t.name} ha sido eliminado.`,type:o.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),y(h=>h+1)}).catch(l=>{o.update(i,{render:"Hay problemas de conexión",type:o.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})})},"Se eliminarán los datos asociados a este cliente como sus mascotas y el historial de las mismas.")};return e.jsxs("div",{className:"px-8 pt-5 flex flex-col justify-between flex-1",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"uppercase tracking-wide text-sm text-indigo-500 font-semibold",children:["Nombre: ",t.name]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Tipo de documento: ",(u=t.identity_document)!=null&&u.description?`${(d=t.identity_document)==null?void 0:d.description} (${(x=t.identity_document)==null?void 0:x.abbreviation})`:"---"]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Documento de identidad: ",t.document_number||"---"]}),t.first_phone?e.jsx("div",{className:"mt-2",children:e.jsxs("p",{className:"text-gray-700",children:["1º teléfono:",e.jsxs("a",{href:`https://api.whatsapp.com/send/?phone=${t.first_phone}&text=Hola,%20¿cómo%20estás%20${t.name}?&type=phone_number&app_absent=0`,target:"_blank",className:"font-bold bg-emerald-300 p-1 rounded-md hover:bg-green-400",children:[e.jsx(F,{icon:k,css:"mr-1",size:"22px"}),t.first_phone]})]})}):e.jsx("p",{className:"mt-2 text-gray-700",children:"1º teléfono: ---"}),t.second_phone?e.jsx("div",{className:"mt-2",children:e.jsxs("p",{className:"text-gray-700",children:["2º teléfono:",e.jsxs("a",{href:`https://api.whatsapp.com/send/?phone=${t.second_phone}&text=Hola,%20¿cómo%20estás%20${t.name}?&type=phone_number&app_absent=0`,target:"_blank",className:"font-bold bg-emerald-300 p-1 rounded-md hover:bg-green-400",children:[e.jsx(F,{icon:k,css:"mr-1",size:"22px"}),t.second_phone]})]})}):e.jsx("p",{className:"text-gray-700",children:"2º teléfono: ---"}),e.jsxs("p",{className:"text-gray-700",children:["Dirección: ",t.direction||"---"]}),e.jsxs("p",{className:"text-gray-700",children:["Fecha: ",U(t.created_at)]})]}),e.jsxs("div",{className:"my-3 flex gap-2 pb-4",children:[e.jsx("button",{className:"bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400",onClick:()=>{b("Actualizar"),r(!0),f(t)},children:"Editar"}),e.jsx("button",{className:"bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500",onClick:v,children:"Eliminar"})]}),e.jsxs("p",{className:"text-gray-600 font-medium text-sm absolute bottom-1 right-8",children:["Agregado ",V(t.created_at)]})]})}function ie(){var D,P,T;const t={...se},f=[{name:"Nombre",value:"name"},{name:"Documento de identidad",value:"document_number"},{name:"1° teléfono",value:"first_phone"},{name:"2° teléfono",value:"second_phone"}],[b,r]=s.useState(1),[y,_]=s.useState(12),[p,j]=s.useState("name"),[v,u]=s.useState(""),[d,x]=s.useState(""),[i,l]=s.useState(""),{debounceValue:h}=I(v,500),[L,c]=s.useState(0),R=`/customers/list?page=${b}&limit=${y}&filter=${p}&inputFilter=${h}&startDate=${d}&finishDate=${i}`,{data:n,loading:w}=ee(R,[b,y,L]),[B,E]=s.useState("Crear"),[H,S]=s.useState(!1),[z,$]=s.useState(t),[A,N]=s.useState(!0),[O,C]=s.useState(!0);return s.useEffect(()=>{w||(N(!0),C(!0),r(1),c(a=>a+1))},[h]),e.jsxs(e.Fragment,{children:[e.jsx(Y,{icon:Q,message:"Gestión de clientes",name:"cliente",setOpen:S,setOption:E,setData:$,initialState:t}),e.jsx(q,{children:e.jsx("div",{className:"w-full flex justify-between flex-wrap sm:flex-nowrap gap-y-1",children:f.map((a,m)=>e.jsx("button",{className:`${p===a.value?"bg-vetgreen-200 text-white":"bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white"} min-w-20 cursor-pointer py-2 md:mx-2 mx-1 rounded-xl sm:rounded-full flex-grow`,onClick:()=>{j(a.value),u("")},children:a.name},m))})}),e.jsxs(g,{children:[e.jsxs(g.Search,{inputFilter:v,setInputFilter:u,handleReset:()=>{x(""),l(""),r(1),c(a=>a+1)},filter:p,filters:f,children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de inicio"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:d,onChange:a=>{x(a.target.value),r(1),c(m=>m+1)}})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de finalización"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:i,onChange:a=>{l(a.target.value),r(1),c(m=>m+1)}})]})]}),e.jsx(g.FilterBar,{hide:!h&&!d&&!i,data:[{tag:(D=f.find(a=>a.value===p))==null?void 0:D.name,input:h,handleClick:()=>u("")},{tag:"Fecha de inicio",input:d.length>0?d:null,handleClick:()=>{x(""),r(1),c(a=>a+1)}},{tag:"Fecha de finalización",input:i.length>0?i:null,handleClick:()=>{l(""),r(1),c(a=>a+1)}}]}),e.jsx(g.CardContainer,{children:w&A?e.jsx(te,{message:"Cargando clientes"}):((P=n.data)==null?void 0:P.length)===0?e.jsx("div",{className:"bg-white p-4 border rounded shadow-lg text-center",children:e.jsxs("p",{className:"text-gray-600 text-lg",children:[e.jsx(F,{icon:W,css:"mr-3"}),"No hay datos disponibles."]})}):e.jsx(e.Fragment,{children:(T=n==null?void 0:n.data)==null?void 0:T.map((a,m)=>e.jsx(g.CardContainer.Card,{mustAnimate:O,setMustAnimate:C,children:e.jsx(ne,{customerI:a,setCustomer:$,setOption:E,setOpenModal:S,setHelper:c,setMustLoad:N,setMustAnimate:C})},`${a.id}-${m}`))})}),e.jsx(g.Pagination,{pageQuantity:n.current_page*n.per_page,quantity:n.total,setMustLoad:N,setLimit:_,setPage:r,nextPage:n.next_page_url,prevPage:n.prev_page_url,page:n.current_page,lastPage:n.last_page,setMustAnimate:C})]}),e.jsx(ae,{customer:z,option:B,open:H,setOpen:S,setMustLoad:N,setHelper:c}),e.jsx(G,{})]})}const re=M.createRoot(document.getElementById("customer"));re.render(e.jsx(ie,{}));
