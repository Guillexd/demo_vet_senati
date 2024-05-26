import{j as e,c as O,r as a,H as A,i as M,I as Y,d as Q,F as G}from"./Footer-53ea2814.js";import{F as W}from"./Filters-4ad1a5e0.js";import{s as q,Q as l,S as U,f as V,T as J,u as K,a as X,b as u,L as Z}from"./Spinner-fcab2623.js";import{B as I,i as ee}from"./BreedModal-4be4f506.js";function te({breedI:r,setBreed:p,setOption:h,setOpenModal:i,setHelper:f,setMustLoad:C,setMustAnimate:m,setIsDeleted:j}){const b=()=>{q("¿Quieres eliminar esta raza?",()=>{j(!0),m(!1);const o=l(e.jsx(U,{message:`Eliminando a ${r.name}`}),{autoClose:3e3,hideProgressBar:!0});V("DELETE","/breeds/destroy",{id:r.id}).then(s=>{if(C(!1),s.errors)return l.update(o,{render:e.jsx(e.Fragment,{children:e.jsx(J,{data:s.errors})}),type:l.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(s.message)return j(!1),l.update(o,{render:e.jsx(e.Fragment,{children:s.message}),type:l.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});l.update(o,{render:`Raza ${r.name} ha sido eliminado.`,type:l.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),f(x=>x+1)}).catch(s=>{l.update(o,{render:"Hay problemas de conexión",type:l.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})})})};return e.jsxs("div",{className:"px-8 pt-5 flex flex-col justify-between flex-1",children:[e.jsxs("div",{children:[e.jsx("img",{src:"/image/breed.svg",alt:r.name,className:"h-20 mx-auto"}),e.jsxs("div",{className:"uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center",children:["Nombre: ",r.name]})]}),e.jsxs("div",{className:"my-3 flex justify-center gap-2",children:[e.jsx("button",{className:"bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400",onClick:()=>{h("Actualizar"),i(!0),p(r)},children:"Editar"}),e.jsx("button",{className:"bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500",onClick:b,children:"Eliminar"})]})]})}function ae(){var w,D,$;const r={...ee},p=[{name:"Nombre",value:"name"}],[h,i]=a.useState(1),[f,C]=a.useState(12),[m,j]=a.useState("name"),[b,o]=a.useState(""),[s,x]=a.useState(""),[g,N]=a.useState(""),{debounceValue:v}=K(b,500),[T,d]=a.useState(0),k=`/breeds/list?page=${h}&limit=${f}&filter=${m}&inputFilter=${v}&startDate=${s}&finishDate=${g}`,{data:n,loading:E}=X(k,[h,f,T]),[z,B]=a.useState("Crear"),[R,F]=a.useState(!1),[_,P]=a.useState(r),[L,y]=a.useState(!0),[H,S]=a.useState(!0);return a.useEffect(()=>{E||(y(!0),S(!0),i(1),d(t=>t+1))},[v]),e.jsxs(e.Fragment,{children:[e.jsx(A,{icon:M,message:"Gestión de razas",name:"raza",setOpen:F,setOption:B,setData:P,initialState:r}),e.jsx(W,{children:p.map((t,c)=>e.jsx("button",{className:`${m===t.value?"bg-vetgreen-200 text-white":"bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white"} cursor-pointer py-2 md:mx-2 mx-1 rounded-full flex-grow`,onClick:()=>{j(t.value),o("")},children:t.name},c))}),e.jsxs(u,{children:[e.jsxs(u.Search,{inputFilter:b,setInputFilter:o,handleReset:()=>{x(""),N(""),i(1),d(t=>t+1)},children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de inicio"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:s,onChange:t=>{x(t.target.value),i(1),d(c=>c+1)}})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de finalización"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:g,onChange:t=>{N(t.target.value),i(1),d(c=>c+1)}})]})]}),e.jsx(u.FilterBar,{hide:!v&&!s&&!g,data:[{tag:(w=p.find(t=>t.value===m))==null?void 0:w.name,input:v,handleClick:()=>o("")},{tag:"Fecha de inicio",input:s.length>0?s:null,handleClick:()=>{x(""),i(1),d(t=>t+1)}},{tag:"Fecha de finalización",input:g.length>0?g:null,handleClick:()=>{N(""),i(1),d(t=>t+1)}}]}),e.jsx(u.CardContainer,{children:E&L?e.jsx(Z,{message:"Cargando razas de mascotas"}):((D=n.data)==null?void 0:D.length)===0?e.jsx("div",{className:"bg-white p-4 border rounded shadow-lg text-center",children:e.jsxs("p",{className:"text-gray-600 text-lg",children:[e.jsx(Y,{icon:Q,css:"mr-3"}),"No hay datos disponibles."]})}):e.jsx(e.Fragment,{children:($=n==null?void 0:n.data)==null?void 0:$.map((t,c)=>e.jsx(u.CardContainer.Card,{mustAnimate:H,setMustAnimate:S,children:e.jsx(te,{breedI:t,setBreed:P,setOption:B,setOpenModal:F,setHelper:d,setMustLoad:y,setMustAnimate:S})},`${t.id}-${c}`))})}),e.jsx(u.Pagination,{pageQuantity:n.current_page*n.per_page,quantity:n.total,setMustLoad:y,setLimit:C,setPage:i,nextPage:n.next_page_url,prevPage:n.prev_page_url,page:n.current_page,lastPage:n.last_page,setMustAnimate:S})]}),e.jsx(I,{breed:_,option:z,open:R,setOpen:F,setMustLoad:y,setHelper:d}),e.jsx(G,{})]})}const se=O.createRoot(document.getElementById("breed"));se.render(e.jsx(ae,{}));