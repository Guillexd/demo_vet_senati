import{r as s,j as e,h as z,p as O,d as se,l as ne,D as le,I as ie,e as oe,F as ce}from"./Footer-1433491c.js";import{F as de}from"./Filters-7240b55f.js";import{e as pe,k as ue,g as me,d as ge,s as xe,Q as o,S as q,f as I,T as G,M as H,u as ye,a as he,i as fe,j as ve,b as E,L as be}from"./Spinner-b109c97d.js";import{B as je,I as Ne}from"./ImportExcelModal-7121b9bf.js";import{I as _e}from"./ImageModal-d806c578.js";function Ce({productI:a,setProduct:n,setOption:w,setOpenModal:u,setHelper:N,setMustLoad:S,setMustAnimate:y,setImage:l,transitionName:d,setTransitionName:j,rol:g,setIsDeleted:f}){var v;const[t,c]=s.useState(!1),p=()=>{xe("¿Quieres eliminar este producto?",()=>{f(!0),y(!1);const b=o(e.jsx(q,{message:`Eliminando a ${a.name}`}),{autoClose:3e3,hideProgressBar:!0});I("DELETE","/products/destroy",{id:a.id}).then(_=>{if(S(!1),_.errors)return f(!1),o.update(b,{render:e.jsx(e.Fragment,{children:e.jsx(G,{data:_.errors})}),type:o.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(_.message)return f(!1),o.update(b,{render:e.jsx(e.Fragment,{children:_.message}),type:o.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});o.update(b,{render:`Producto ${a.name} ha sido eliminado.`,type:o.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),N(x=>x+1)}).catch(_=>{f(!1),o.update(b,{render:"Hay problemas de conexión",type:o.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})})})};return e.jsxs(e.Fragment,{children:[e.jsxs("figure",{className:"relative",children:[e.jsx("img",{className:"w-full h-60 object-cover cursor-pointer",src:a.product_image_url,alt:a.name,onClick:()=>{document.startViewTransition?document.startViewTransition(()=>{z.flushSync(()=>{j(`${a.name}-${a.id}`),l({url:a.product_image_url,label:a.name})})}):z.flushSync(()=>{j(`${a.name}-${a.id}`),l({url:a.product_image_url,label:a.name})})},style:{viewTransitionName:!d&&`${a.name}-${a.id}`}}),g==1&!a.isActive?e.jsx("section",{className:"absolute top-0 bg-gray-300 h-full w-full opacity-50"}):null]}),e.jsxs("div",{className:`px-8 pt-5 flex flex-col justify-between flex-1 ${!a.isActive&&"bg-gray-300"}`,children:[g==1&&e.jsx(je,{isActive:a.isActive,id:a.id,name:a.name,model:"products",setHelper:N,setMustLoad:S,css:"top-0 right-0"}),e.jsxs("div",{className:`mb-3 ${g!=1&&"pb-4"}`,children:[e.jsxs("div",{className:"uppercase tracking-wide text-sm text-indigo-500 font-semibold",children:["Nombre: ",a.name]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Precio: S/. ",a.price]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Stock: ",a.stock," u."]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Código: ",pe("P",a.id)]}),a.serie&&e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Serie: ",a.serie]}),e.jsxs("p",{className:"mt-2 text-gray-700",children:["Precio de compra: S/. ",a.purchase_price]}),e.jsxs("p",{className:"text-gray-700",children:["Utilidad: S/. ",a.utility]}),e.jsxs("p",{className:"text-gray-900",children:["Fecha de vencimiento: ",a.due_date?e.jsxs(e.Fragment,{children:[e.jsx("br",{}),ue(a.due_date)]}):"--"]}),e.jsxs("p",{className:"my-1 text-gray-700",children:["Fecha: ",me(a.created_at)]}),((v=a.description)==null?void 0:v.length)>50?e.jsxs("div",{children:[e.jsx("button",{className:"bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-1 rounded-lg",onClick:()=>c(!0),children:"Descripción"}),e.jsxs("article",{className:`${t?"-translate-y-0":"translate-y-full"} z-10 ease-in duration-150 absolute flex top-0 left-0 w-full h-full bg-vetgreen-100 text-black font-medium rounded-lg`,children:[e.jsx("button",{className:"fixed bg-red-900 text-white font-semibold px-3 py-1 rounded-lg top-1 right-0 me-5 mt-1 animate-bounce",onClick:()=>c(!1),children:"Cerrar"}),e.jsx("p",{className:"overflow-auto p-3 pt-10",children:a.description})]})]}):e.jsxs("p",{className:"text-gray-700 font-semibold",children:[" ",e.jsx("strong",{children:"Descripción:"})," ",a.description||"---"]})]}),g==1&&e.jsxs("div",{className:"mb-3 flex gap-2 pb-4",children:[e.jsx("button",{className:"bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400",onClick:()=>{w("Actualizar"),u(!0),n(a)},children:"Editar"}),e.jsx("button",{className:"bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500",onClick:p,children:"Eliminar"})]}),e.jsxs("p",{className:"text-gray-600 font-medium text-sm absolute bottom-1 right-6",children:["Agregado ",ge(a.created_at)]})]})]})}const i={id:"MODIFY_ID",name:"MODIFY_NAME",price:"MODIFY_PRICE",purchase_price:"MODIFY_PURCHASE_PRICE",stock:"MODIFY_STOCK",utility:"MODIFY_UTILITY",serie:"MODIFY_SERIE",product_image:"MODIFY_PRODUCT_IMAGE",description:"MODIFY_DESCRIPTION",due_date:"MODIFY_DUE_DATE"};function we(a,n){switch(n.type){case i.id:return{...a,id:n.payload||""};case i.name:return{...a,name:n.payload||""};case i.price:return{...a,price:n.payload||""};case i.purchase_price:return{...a,purchase_price:n.payload||""};case i.stock:return{...a,stock:n.payload||""};case i.utility:return{...a,utility:n.payload||""};case i.serie:return{...a,serie:n.payload||""};case i.product_image:return{...a,product_image:n.payload||""};case i.description:return{...a,description:n.payload||""};case i.due_date:return{...a,due_date:n.payload||""};default:return a}}function Se({product:a,option:n,open:w,setOpen:u,setMustLoad:N,setHelper:S}){const y={method:"POST",url:n!=="Actualizar"?"/products/store":"/products/update",sucessMessage:n==="Crear"?"Producto agregado":"Producto actualizado",loadingMessage:n!=="Actualizar"?"Agregando producto":"Actualizando producto"},[l,d]=s.useReducer(we,a),[j,g]=s.useState(!1),f=t=>{t.preventDefault(),g(!0);const c=o(e.jsx(q,{message:y.loadingMessage}),{autoClose:3e4,hideProgressBar:!0});I(y.method,y.url,l,!0).then(p=>{if(p.errors)return o.update(c,{render:e.jsx(e.Fragment,{children:e.jsx(G,{data:p.errors})}),type:o.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(p.message)return o.update(c,{render:e.jsx(e.Fragment,{children:p.message}),type:o.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});o.update(c,{render:y.sucessMessage,type:o.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),N(!1),S(v=>v+1),u(!1)}).catch(p=>{console.log(p),o.update(c,{render:"Hay problemas de conexión",type:o.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})}).finally(()=>g(!1))};return s.useEffect(()=>{const t=document.getElementById("product_image");t.value="";for(const c in i){const p=i[c],v=a.hasOwnProperty(c)?a[c]:"";d({type:p,payload:v})}},[a]),s.useEffect(()=>{Number(l.price)&&Number(l.purchase_price)&&d({type:"MODIFY_UTILITY",payload:(parseFloat(l.price)-parseFloat(l.purchase_price)).toFixed(2)})},[l.price,l.purchase_price]),e.jsxs(e.Fragment,{children:[e.jsxs(H,{option:n,open:w,setOpen:u,isLoading:j,handleSubmit:f,icon:O,text:"Producto",children:[e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-1 order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.name,onChange:t=>{d({type:i.name,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Nombre"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-1 order-1",children:[e.jsx("input",{type:"number",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.stock,onChange:t=>{d({type:i.stock,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Stock"})]}),e.jsxs("div",{className:"w-full col-span-full order-1 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-x-6",children:[e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"number",step:"any",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.price,onChange:t=>{d({type:i.price,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Precio"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"number",step:"any",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.purchase_price,onChange:t=>{d({type:i.purchase_price,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Precio de compra"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"number",step:"any",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.utility,onChange:t=>{d({type:i.utility,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Utilidad"})]})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full order-1",children:[e.jsx("input",{type:"file",className:"hidden",id:"product_image",accept:"image/*",onChange:t=>{const c=t.target.files&&t.target.files[0];d({type:i.product_image,payload:c})}}),e.jsx("label",{htmlFor:"product_image",className:"cursor-pointer block w-full py-2 text-center text-gray-600 bg-transparent rounded transition duration-200 ease-in-out hover:bg-gray-300",children:"--- Seleccionar foto (opcional) ---"})]}),l.product_image&&e.jsx("img",{src:URL.createObjectURL(l.product_image),alt:"mascota",className:"order-1 w-3/5 col-span-full mx-auto rounded-lg"}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1 col-span-full sm:col-span-1",children:[e.jsx("input",{type:"datetime-local",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.due_date,onChange:t=>{d({type:i.due_date,payload:t.target.value})}}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Fecha de vencimiento (opcional)"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full sm:col-span-1 order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.serie,onChange:t=>{d({type:i.serie,payload:t.target.value})}}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Serie (opcional)"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full order-1",children:[e.jsx("textarea",{className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",rows:"4",value:l.description,onChange:t=>{d({type:i.description,payload:t.target.value})}}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Descripción (opcional)"})]})]}),e.jsx(H.ToastifyModal,{})]})}function Ee(){var B,L,U;const a={id:"",name:"",price:"",purchase_price:"",stock:"",utility:"",serie:"",product_image:null,description:"No hay descripción.",due_date:""},n=[{name:"Nombre",value:"name"},{name:"Código",value:"id"},{name:"Serie",value:"serie"}],[w,u]=s.useState(1),[N,S]=s.useState(12),[y,l]=s.useState("name"),[d,j]=s.useState(""),[g,f]=s.useState(""),[t,c]=s.useState(""),[p,v]=s.useState(""),{debounceValue:b}=ye(d),[_,x]=s.useState(0),V=`/products/list?page=${w}&limit=${N}&filter=${y}&inputFilter=${b}&dueDate=${g}&startDate=${t}&finishDate=${p}`,{data:h,loading:M}=he(V,[w,N,_]),[Q,R]=s.useState("Crear"),[W,D]=s.useState(!1),[K,$]=s.useState(a),[J,F]=s.useState(!0),[X,P]=s.useState(!0),[Z,ee]=s.useState({url:"",label:""}),[T,Y]=s.useState(""),[ae,k]=s.useState(!1);s.useEffect(()=>{M||(F(!0),P(!0),u(1),x(r=>r+1))},[b]),s.useEffect(()=>{setTimeout(()=>{fe("/products/by_due_date").then(r=>{if(r.count==0)return;const m=document.createElement("p");m.classList.add("text-center"),m.innerText=`!Tienes ${r.count} producto(s) por vencer en el rango de 30 días!`;const C=document.createElement("div");C.classList.add("text-start"),C.classList.add("ms-5"),r.products.forEach(re=>{C.innerHTML+=`
            <li class='font-bold'>${re.name}</li>
          `}),ve(m,C)})},1e3)},[]);const[A,te]=s.useState(2);return s.useEffect(()=>{const m=document.getElementById("product").getAttribute("role");te(m)},[]),e.jsxs(e.Fragment,{children:[A==1?e.jsx(ne,{icon:O,message:"Gestión de productos",name:"producto",setOpen:D,setOption:R,setData:$,initialState:a,setOpenImport:k}):e.jsx(le,{icon:O,message:"Gestión de productos",setOpenImport:k}),e.jsx(de,{children:n.map((r,m)=>e.jsx("button",{className:`${y===r.value?"bg-vetgreen-200 text-white":"bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white"} cursor-pointer py-2 md:mx-2 mx-1 rounded-full flex-grow`,onClick:()=>{var C;l(r.value),j(""),(C=document.getElementById("input_search"))==null||C.focus()},children:r.name},m))}),e.jsxs(E,{children:[e.jsxs(E.Search,{inputFilter:d,setInputFilter:j,handleReset:()=>{f(""),c(""),v(""),u(1),x(r=>r+1)},filter:y,filters:n,children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de vencimiento"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:g,onChange:r=>{f(r.target.value),u(1),x(m=>m+1)}})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha inicio"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:t,onChange:r=>{c(r.target.value),u(1),x(m=>m+1)}})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de finalización"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:p,onChange:r=>{v(r.target.value),u(1),x(m=>m+1)}})]})]}),e.jsx(E.FilterBar,{hide:!b&&!t&&!p&&!g,data:[{tag:(B=n.find(r=>r.value===y))==null?void 0:B.name,input:b,handleClick:()=>j("")},{tag:"Fecha de inicio",input:t.length>0?t:null,handleClick:()=>{c(""),u(1),x(r=>r+1)}},{tag:"Fecha de finalización",input:p.length>0?p:null,handleClick:()=>{v(""),u(1),x(r=>r+1)}},{tag:"Fecha de vencimiento",input:g.length>0?g:null,handleClick:()=>{f(""),u(1),x(r=>r+1)}}]}),e.jsx(E.CardContainer,{children:M&J?e.jsx(be,{message:"Cargando productos"}):((L=h.data)==null?void 0:L.length)===0?e.jsx("div",{className:"bg-white p-4 border rounded shadow-lg text-center",children:e.jsxs("p",{className:"text-gray-600 text-lg",children:[e.jsx(ie,{icon:oe,css:"mr-3"}),"No hay datos disponibles."]})}):e.jsx(e.Fragment,{children:(U=h==null?void 0:h.data)==null?void 0:U.map((r,m)=>e.jsx(E.CardContainer.Card,{mustAnimate:X,setMustAnimate:P,children:e.jsx(Ce,{productI:r,setProduct:$,setOption:R,setOpenModal:D,setHelper:x,setMustLoad:F,setMustAnimate:P,setImage:ee,transitionName:T,setTransitionName:Y,rol:A})},`${r.id}-${m}`))})}),e.jsx(E.Pagination,{pageQuantity:h.current_page*h.per_page,quantity:h.total,setMustLoad:F,setLimit:S,setPage:u,nextPage:h.next_page_url,prevPage:h.prev_page_url,page:h.current_page,lastPage:h.last_page,setMustAnimate:P})]}),T&&e.jsx(_e,{image:Z,transitionName:T,setTransitionName:Y}),e.jsx(Se,{product:K,option:Q,open:W,setOpen:D,setMustLoad:F,setHelper:x}),e.jsx(Ne,{open:ae,setOpen:k,url:"/products/import",format:"formato_productos.xlsx",setPage:u,setHelper:x}),e.jsx(ce,{})]})}const Fe=se.createRoot(document.getElementById("product"));Fe.render(e.jsx(Ee,{}));