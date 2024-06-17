import{r as t,j as e,h as A,d as q,H as U,i as J,I as K,e as X,F as Z}from"./Footer-5b55d698.js";import{F as I}from"./Filters-74b6bb7b.js";import{c as ee,d as ae,s as se,Q as c,S as te,f as ne,T as re,u as le,a as oe,b,L as ie}from"./Spinner-fd53bf80.js";import{P as ce,i as de}from"./inititalStatePet-f6fa53de.js";import{I as me}from"./ImageModal-6ba9a32e.js";import"./ReactSelect-fc5a41ef.js";import"./initialStateCustomer-6990e1eb.js";import"./BreedModal-d1190aaa.js";function ue({petI:a,setPet:j,setOption:S,setOpenModal:l,setHelper:C,setMustLoad:k,setMustAnimate:g,setImage:w,transitionName:F,setTransitionName:h,setIsDeleted:o}){var m,f,x,_,r,E,n,N;const[v,d]=t.useState(!1),y=()=>{se("¿Quieres eliminar esta mascota?",()=>{o(!0),g(!1);const p=c(e.jsx(te,{message:`Eliminando a ${a.name}`}),{autoClose:3e3,hideProgressBar:!0});ne("DELETE","/pets/destroy",{id:a.id}).then(u=>{if(k(!1),u.errors)return o(!1),c.update(p,{render:e.jsx(e.Fragment,{children:e.jsx(re,{data:u.errors})}),type:c.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(u.message)return o(!1),c.update(p,{render:e.jsx(e.Fragment,{children:u.message}),type:c.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});c.update(p,{render:`Mascota ${a.name} ha sido eliminado.`,type:c.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),C(D=>D+1)}).catch(u=>{o(!1),c.update(p,{render:"Hay problemas de conexión",type:c.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})})},"Se eliminarán los datos asociados a esta mascota como el historial de las mismas.")};return e.jsxs(e.Fragment,{children:[e.jsx("img",{className:"w-full h-60 object-cover cursor-pointer",src:a.pet_image_url,alt:a.name,onClick:()=>{document.startViewTransition?document.startViewTransition(()=>{A.flushSync(()=>{h(`${a.name}-${a.id}`),w({url:a.pet_image_url,label:a.name})})}):A.flushSync(()=>{h(`${a.name}-${a.id}`),w({url:a.pet_image_url,label:a.name})})},style:{viewTransitionName:!F&&`${a.name}-${a.id}`}}),e.jsxs("div",{className:"px-8 pt-5 flex flex-col justify-between flex-1",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"uppercase tracking-wide text-sm text-indigo-500 font-semibold",children:["Nombre: ",a.name]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Edad: ",a.age]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Raza: ",(m=a.breed)==null?void 0:m.name]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Sexo: ",a.sex]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["C/E: ",a.ce]}),e.jsxs("p",{className:"mt-2 text-gray-700",children:["Dueño: ",(f=a.customer)==null?void 0:f.name,((_=(x=a.customer)==null?void 0:x.identity_document)==null?void 0:_.abbreviation)&&e.jsxs(e.Fragment,{children:[e.jsx("br",{})," ",(E=(r=a.customer)==null?void 0:r.identity_document)==null?void 0:E.abbreviation,": ",(n=a.customer)==null?void 0:n.document_number]})]}),e.jsxs("p",{className:"my-1 text-gray-700",children:["Fecha: ",ee(a.created_at)]}),((N=a.observations)==null?void 0:N.length)>50?e.jsxs("div",{children:[e.jsx("button",{className:"bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-1 rounded-lg",onClick:()=>d(!0),children:"Observaciones"}),e.jsxs("article",{className:`${v?"-translate-y-0":"translate-y-full"} z-10 ease-in duration-150 absolute flex top-0 left-0 w-full h-full bg-vetgreen-100 text-black font-medium rounded-lg`,children:[e.jsx("button",{className:"fixed bg-red-900 text-white font-semibold px-3 py-1 rounded-lg top-2 right-0 me-5 mt-1 animate-bounce",onClick:()=>d(!1),children:"Cerrar"}),e.jsx("p",{className:"overflow-auto p-3 pt-10",children:a.observations})]})]}):e.jsxs("p",{className:"text-gray-700 font-semibold",children:[" ",e.jsx("strong",{children:"Observaciones:"})," ",a.observations||"---"]})]}),e.jsxs("div",{className:"my-3 flex gap-2 pb-4",children:[e.jsx("button",{className:"bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400",onClick:()=>{S("Actualizar"),l(!0),j(a)},children:"Editar"}),e.jsx("button",{className:"bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500",onClick:y,children:"Eliminar"})]}),e.jsxs("p",{className:"text-gray-600 font-medium text-sm absolute bottom-1 right-6",children:["Agregado ",ae(a.created_at)]})]})]})}function xe(){var M,O,H;const a={...de},j=[{name:"Nombre",value:"name"},{name:"Nombre del dueño",value:"customer_id"},{name:"Número de documento del dueño",value:"document_number"},{name:"Raza",value:"breed_id"}],[S,l]=t.useState(1),[C,k]=t.useState(12),[g,w]=t.useState("name"),[F,h]=t.useState(""),[o,v]=t.useState(""),[d,y]=t.useState(""),[m,f]=t.useState(""),{debounceValue:x}=le(F,500),[_,r]=t.useState(0),E=`/pets/list?page=${S}&limit=${C}&filter=${g}&inputFilter=${x}&sex=${o}&startDate=${d}&finishDate=${m}`,{data:n,loading:N}=oe(E,[S,C,_]),[p,u]=t.useState("Crear"),[D,T]=t.useState(!1),[Y,B]=t.useState(a),[Q,P]=t.useState(!0),[V,$]=t.useState(!0),[G,W]=t.useState({url:"",label:""}),[R,L]=t.useState("");return t.useEffect(()=>{N||(P(!0),$(!0),l(1),r(s=>s+1))},[x]),e.jsxs(e.Fragment,{children:[e.jsx(U,{icon:J,message:"Gestión de mascotas",name:"mascota",setOpen:T,setOption:u,setData:B,initialState:a}),e.jsx(I,{children:e.jsx("div",{className:"w-full flex justify-between flex-wrap lg:flex-nowrap gap-y-1",children:j.map((s,i)=>e.jsx("button",{className:`${g===s.value?"bg-vetgreen-200 text-white":"bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white"} cursor-pointer py-2 md:mx-2 mx-1 rounded-xl lg:rounded-full flex-grow`,onClick:()=>{var z;w(s.value),h(""),(z=document.getElementById("input_search"))==null||z.focus()},children:s.name},i))})}),e.jsxs(b,{children:[e.jsxs(b.Search,{inputFilter:F,setInputFilter:h,handleReset:()=>{v(""),y(""),f(""),l(1),r(s=>s+1)},filter:g,filters:j,children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Sexo de la mascota"}),e.jsxs("select",{className:"p-2 rounded-xl bg-gray-300 w-full",value:o,onChange:s=>{v(s.target.value),l(1),r(i=>i+1)},children:[e.jsx("option",{value:"",children:"Ambos"}),e.jsx("option",{value:"Macho",children:"Macho"}),e.jsx("option",{value:"Hembra",children:"Hembra"})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de inicio"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:d,onChange:s=>{y(s.target.value),l(1),r(i=>i+1)}})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de finalización"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:m,onChange:s=>{f(s.target.value),l(1),r(i=>i+1)}})]})]}),e.jsx(b.FilterBar,{hide:!x&&!o&&!d&&!m,data:[{tag:(M=j.find(s=>s.value===g))==null?void 0:M.name,input:x,handleClick:()=>h("")},{tag:"Sexo de la mascota",input:o.length>0?o:null,handleClick:()=>{v(""),l(1),r(s=>s+1)}},{tag:"Fecha de inicio",input:d.length>0?d:null,handleClick:()=>{y(""),l(1),r(s=>s+1)}},{tag:"Fecha de finalización",input:m.length>0?m:null,handleClick:()=>{f(""),l(1),r(s=>s+1)}}]}),e.jsx(b.CardContainer,{children:N&Q?e.jsx(ie,{message:"Cargando mascotas"}):((O=n.data)==null?void 0:O.length)===0?e.jsx("div",{className:"bg-white p-4 border rounded shadow-lg text-center",children:e.jsxs("p",{className:"text-gray-600 text-lg",children:[e.jsx(K,{icon:X,css:"mr-3"}),"No hay datos disponibles."]})}):e.jsx(e.Fragment,{children:(H=n==null?void 0:n.data)==null?void 0:H.map((s,i)=>e.jsx(b.CardContainer.Card,{mustAnimate:V,setMustAnimate:$,children:e.jsx(ue,{petI:s,setPet:B,setOption:u,setOpenModal:T,setHelper:r,setMustLoad:P,setMustAnimate:$,setImage:W,transitionName:R,setTransitionName:L})},`${s.id}-${i}`))})}),e.jsx(b.Pagination,{pageQuantity:n.current_page*n.per_page,quantity:n.total,setMustLoad:P,setLimit:k,setPage:l,nextPage:n.next_page_url,prevPage:n.prev_page_url,page:n.current_page,lastPage:n.last_page,setMustAnimate:$})]}),R&&e.jsx(me,{image:G,transitionName:R,setTransitionName:L}),e.jsx(ce,{pet:Y,option:p,open:D,setOpen:T,setMustLoad:P,setHelper:r}),e.jsx(Z,{})]})}const ge=q.createRoot(document.getElementById("pet"));ge.render(e.jsx(xe,{}));
