import{j as e,r as s,k as _,c as U,H as Q,I as W,d as q,F as V}from"./Footer-a0a9b1e3.js";import{F as J}from"./Filters-47922677.js";import{s as K,Q as r,S as A,f as k,T as O,M,u as X,a as Z,b,L as ee}from"./Spinner-66f4b8d4.js";function ae({breedI:t,setBreed:n,setOption:j,setOpenModal:o,setHelper:v,setMustLoad:C,setMustAnimate:u,setIsDeleted:x}){const h=()=>{K("¿Quieres eliminar esta raza?",()=>{x(!0),u(!1);const p=r(e.jsx(A,{message:`Eliminando a ${t.name}`}),{autoClose:3e3,hideProgressBar:!0});k("DELETE","/breeds/destroy",{id:t.id}).then(l=>{if(C(!1),l.errors)return r.update(p,{render:e.jsx(e.Fragment,{children:e.jsx(O,{data:l.errors})}),type:r.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(l.message)return x(!1),r.update(p,{render:e.jsx(e.Fragment,{children:l.message}),type:r.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});r.update(p,{render:`Raza ${t.name} ha sido eliminado.`,type:r.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),v(f=>f+1)}).catch(l=>{r.update(p,{render:"Hay problemas de conexión",type:r.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})})})};return e.jsxs("div",{className:"px-8 pt-5 flex flex-col justify-between flex-1",children:[e.jsxs("div",{children:[e.jsx("img",{src:"/image/breed.svg",alt:t.name,className:"h-20 mx-auto"}),e.jsxs("div",{className:"uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center",children:["Nombre: ",t.name]})]}),e.jsxs("div",{className:"my-3 flex justify-center gap-2",children:[e.jsx("button",{className:"bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400",onClick:()=>{j("Actualizar"),o(!0),n(t)},children:"Editar"}),e.jsx("button",{className:"bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500",onClick:h,children:"Eliminar"})]})]})}const S={id:"MODIFY_ID",name:"MODIFY_NAME",image:"MODIFY_IMAGE"};function te(t,n){switch(n.type){case S.id:return{...t,id:n.payload};case S.name:return{...t,name:n.payload};default:return t}}function se({breed:t,option:n,open:j,setOpen:o,setMustLoad:v,setHelper:C}){const u={method:n==="Crear"?"POST":"PUT",url:n!=="Actualizar"?"/breeds/store":"/breeds/update",sucessMessage:n==="Crear"?"Raza agregada":"Raza actualizada",loadingMessage:n!=="Actualizar"?"Agregando raza":"Actualizando raza"},[x,h]=s.useReducer(te,t),[p,l]=s.useState(!1),f=i=>{i.preventDefault(),l(!0);const m=r(e.jsx(A,{message:u.loadingMessage}),{autoClose:1e4,hideProgressBar:!0});k(u.method,u.url,x).then(d=>{if(d.errors)return r.update(m,{render:e.jsx(e.Fragment,{children:e.jsx(O,{data:d.errors})}),type:r.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});r.update(m,{render:u.sucessMessage,type:r.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),v(!1),C(F=>F+1),o(!1)}).catch(d=>{console.log(d),r.update(m,{render:"Hay problemas de conexión",type:r.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})}).finally(()=>l(!1))};return s.useEffect(()=>{for(const i in S){const m=S[i],d=t.hasOwnProperty(i)?t[i]:"";h({type:m,payload:d})}},[t]),e.jsxs(e.Fragment,{children:[e.jsx(M,{option:n,open:j,setOpen:o,isLoading:p,handleSubmit:f,icon:_,text:"Raza",children:e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:x.name,onChange:i=>{h({type:S.name,payload:i.target.value})},required:!0,autoFocus:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Nombre"})]})}),e.jsx(M.ToastifyModal,{})]})}function re(){var w,z,B;const t={id:"",name:""},n=[{name:"Nombre",value:"name"}],[j,o]=s.useState(1),[v,C]=s.useState(12),[u,x]=s.useState("name"),[h,p]=s.useState(""),[l,f]=s.useState(""),[i,m]=s.useState(""),{debounceValue:d}=X(h,500),[F,g]=s.useState(0),Y=`/breeds/list?page=${j}&limit=${v}&filter=${u}&inputFilter=${d}&startDate=${l}&finishDate=${i}`,{data:c,loading:T}=Z(Y,[j,v,F]),[$,D]=s.useState("Crear"),[L,P]=s.useState(!1),[I,R]=s.useState(t),[H,E]=s.useState(!0),[G,N]=s.useState(!0);return s.useEffect(()=>{T||(E(!0),N(!0),o(1),g(a=>a+1))},[d]),e.jsxs(e.Fragment,{children:[e.jsx(Q,{icon:_,message:"Gestión de razas",name:"raza",setOpen:P,setOption:D,setData:R,initialState:t}),e.jsx(J,{children:n.map((a,y)=>e.jsx("button",{className:`${u===a.value?"bg-vetgreen-200 text-white":"bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white"} cursor-pointer py-2 md:mx-2 mx-1 rounded-full flex-grow`,onClick:()=>{x(a.value),p("")},children:a.name},y))}),e.jsxs(b,{children:[e.jsxs(b.Search,{inputFilter:h,setInputFilter:p,handleReset:()=>{f(""),m(""),o(1),g(a=>a+1)},children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de inicio"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:l,onChange:a=>{f(a.target.value),o(1),g(y=>y+1)}})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de finalización"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:i,onChange:a=>{m(a.target.value),o(1),g(y=>y+1)}})]})]}),e.jsx(b.FilterBar,{hide:!d&&!l&&!i,data:[{tag:(w=n.find(a=>a.value===u))==null?void 0:w.name,input:d,handleClick:()=>p("")},{tag:"Fecha de inicio",input:l.length>0?l:null,handleClick:()=>{f(""),o(1),g(a=>a+1)}},{tag:"Fecha de finalización",input:i.length>0?i:null,handleClick:()=>{m(""),o(1),g(a=>a+1)}}]}),e.jsx(b.CardContainer,{children:T&H?e.jsx(ee,{message:"Cargando razas de mascotas"}):((z=c.data)==null?void 0:z.length)===0?e.jsx("div",{className:"bg-white p-4 border rounded shadow-lg text-center",children:e.jsxs("p",{className:"text-gray-600 text-lg",children:[e.jsx(W,{icon:q,css:"mr-3"}),"No hay datos disponibles."]})}):e.jsx(e.Fragment,{children:(B=c==null?void 0:c.data)==null?void 0:B.map((a,y)=>e.jsx(b.CardContainer.Card,{mustAnimate:G,setMustAnimate:N,children:e.jsx(ae,{breedI:a,setBreed:R,setOption:D,setOpenModal:P,setHelper:g,setMustLoad:E,setMustAnimate:N})},`${a.id}-${y}`))})}),e.jsx(b.Pagination,{pageQuantity:c.current_page*c.per_page,quantity:c.total,setMustLoad:E,setLimit:C,setPage:o,nextPage:c.next_page_url,prevPage:c.prev_page_url,page:c.current_page,lastPage:c.last_page,setMustAnimate:N})]}),e.jsx(se,{breed:I,option:$,open:L,setOpen:P,setMustLoad:E,setHelper:g}),e.jsx(V,{})]})}const ne=U.createRoot(document.getElementById("breed"));ne.render(e.jsx(re,{}));
