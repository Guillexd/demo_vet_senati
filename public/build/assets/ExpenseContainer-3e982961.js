import{j as e,d as k,r as s,H as z,p as A,I as D,e as H,F as M}from"./Footer-b3d1db75.js";import{F as O}from"./Filters-2dba2531.js";import{s as Y,Q as n,S as Q,f as G,T as U,u as W,a as q,b as c,L as V}from"./Spinner-bdd0ae22.js";import{E as J}from"./ExpenseModal-ed7e66fa.js";function K({expenseI:o,setExpense:u,setOption:p,setOpenModal:g,setHelper:m,setMustLoad:j,setMustAnimate:l,setIsDeleted:d}){const x=()=>{Y("¿Quieres eliminar esta razón?",()=>{d(!0),l(!1);const i=n(e.jsx(Q,{message:`Eliminando a ${o.reason}`}),{autoClose:3e3,hideProgressBar:!0});G("DELETE","/expenses/destroy",{id:o.id}).then(a=>{if(j(!1),a.errors)return d(!1),n.update(i,{render:e.jsx(e.Fragment,{children:e.jsx(U,{data:a.errors})}),type:n.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(a.message)return d(!1),n.update(i,{render:e.jsx(e.Fragment,{children:a.message}),type:n.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});n.update(i,{render:`Razón ${o.reason} ha sido eliminada.`,type:n.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),m(E=>E+1)}).catch(a=>{d(!1),n.update(i,{render:"Hay problemas de conexión",type:n.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})})})};return e.jsxs("div",{className:"flex flex-wrap flex-col justify-between lg:flex-row p-2 md:p-3 md:mx-5",children:[e.jsxs("p",{className:"uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center md:text-start lg:w-9/12",children:[e.jsx("strong",{children:"Razón de egreso:"})," ",o.reason]}),e.jsxs("div",{className:"my-3 flex justify-center items-center gap-2",children:[e.jsx("button",{className:"bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400",onClick:()=>{p("Actualizar"),g(!0),u(o)},children:"Editar"}),e.jsx("button",{className:"bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500",onClick:x,children:"Eliminar"})]})]})}const X={id:"",reason:""};function Z(){var w,P,N;const o={...X},u=[{name:"Razón",value:"reason"}],[p,g]=s.useState(1),[m,j]=s.useState(12),[l,d]=s.useState("reason"),[x,i]=s.useState(""),{debounceValue:a}=W(x,500),[E,b]=s.useState(0),T=`/expenses/list?page=${p}&limit=${m}&filter=${l}&inputFilter=${a}`,{data:t,loading:C}=q(T,[p,m,E]),[$,v]=s.useState("Crear"),[R,S]=s.useState(!1),[_,F]=s.useState(o),[B,h]=s.useState(!0),[L,f]=s.useState(!0);return s.useEffect(()=>{C||(h(!0),f(!0),g(1),b(r=>r+1))},[a]),e.jsxs(e.Fragment,{children:[e.jsx(z,{icon:A,message:"Gestión de egresos",name:"egreso",setOpen:S,setOption:v,setData:F,initialState:o}),e.jsx(O,{children:u.map((r,y)=>e.jsx("button",{className:`${l===r.value?"bg-vetgreen-200 text-white":"bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white"} cursor-pointer p-2 rounded-md flex-grow`,onClick:()=>{d(r.value),i("")},children:r.name},y))}),e.jsxs(c,{children:[e.jsx(c.Search,{inputFilter:x,setInputFilter:i,filter:l,filters:u,renderMoreFilters:!1}),e.jsx(c.FilterBar,{hide:!a,data:[{tag:(w=u.find(r=>r.value===l))==null?void 0:w.name,input:a,handleClick:()=>i("")}]}),e.jsx(c.CardContainer,{children:C&B?e.jsx(V,{message:"Cargando razones de egreso"}):((P=t.data)==null?void 0:P.length)===0?e.jsx("div",{className:"bg-white p-4 border rounded shadow-lg text-center",children:e.jsxs("p",{className:"text-gray-600 text-lg",children:[e.jsx(D,{icon:H,css:"mr-3"}),"No hay datos disponibles."]})}):e.jsx(e.Fragment,{children:(N=t==null?void 0:t.data)==null?void 0:N.map((r,y)=>e.jsx(c.CardContainer.Card,{mustAnimate:L,setMustAnimate:f,width:"w-full",children:e.jsx(K,{expenseI:r,setExpense:F,setOption:v,setOpenModal:S,setHelper:b,setMustLoad:h,setMustAnimate:f})},`${r.id}-${y}`))})}),e.jsx(c.Pagination,{pageQuantity:t.current_page*t.per_page,quantity:t.total,setMustLoad:h,setLimit:j,setPage:g,nextPage:t.next_page_url,prevPage:t.prev_page_url,page:t.current_page,lastPage:t.last_page,setMustAnimate:f})]}),e.jsx(J,{expense:_,option:$,open:R,setOpen:S,setMustLoad:h,setHelper:b}),e.jsx(M,{})]})}const I=k.createRoot(document.getElementById("expense"));I.render(e.jsx(Z,{}));
