import{r as n,j as e,h as Z,o as B,d as ee,H as ae,I as te,e as re,F as se}from"./Footer-5a793555.js";import{F as ne}from"./Filters-5c1cd9b5.js";import{e as le,k as ie,g as oe,d as ce,s as de,Q as o,S as U,f as I,T as z,M as A,u as pe,a as ue,i as me,j as ge,b as C,L as xe}from"./Spinner-0b2ec88a.js";import{I as ye}from"./ImageModal-18c81fb5.js";function he({productI:a,setProduct:s,setOption:N,setOpenModal:u,setHelper:_,setMustLoad:w,setMustAnimate:y,setImage:l,transitionName:d,setTransitionName:b,setIsDeleted:g}){var c;const[j,t]=n.useState(!1),p=()=>{de("¿Quieres eliminar este producto?",()=>{g(!0),y(!1);const x=o(e.jsx(U,{message:`Eliminando a ${a.name}`}),{autoClose:3e3,hideProgressBar:!0});I("DELETE","/products/destroy",{id:a.id}).then(f=>{if(w(!1),f.errors)return g(!1),o.update(x,{render:e.jsx(e.Fragment,{children:e.jsx(z,{data:f.errors})}),type:o.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(f.message)return g(!1),o.update(x,{render:e.jsx(e.Fragment,{children:f.message}),type:o.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});o.update(x,{render:`Producto ${a.name} ha sido eliminado.`,type:o.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),_(E=>E+1)}).catch(f=>{o.update(x,{render:"Hay problemas de conexión",type:o.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})})})};return e.jsxs(e.Fragment,{children:[e.jsx("img",{className:"w-full h-60 object-cover",src:a.product_image_url,alt:a.name,onClick:()=>{document.startViewTransition(()=>{Z.flushSync(()=>{b(`${a.name}-${a.id}`),l({url:a.product_image_url,label:a.name})})})},style:{viewTransitionName:!d&&`${a.name}-${a.id}`}}),e.jsxs("div",{className:"px-8 pt-5 flex flex-col justify-between flex-1",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"uppercase tracking-wide text-sm text-indigo-500 font-semibold",children:["Nombre: ",a.name]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Precio: S/. ",a.price]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Stock: ",a.stock," u."]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Código: ",le("P",a.id)]}),a.serie&&e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Serie: ",a.serie]}),e.jsxs("p",{className:"mt-2 text-gray-700",children:["Precio de compra: S/. ",a.purchase_price]}),e.jsxs("p",{className:"text-gray-700",children:["Utilidad: S/. ",a.utility]}),e.jsxs("p",{className:"text-gray-900",children:["Fecha de vencimiento: ",a.due_date?e.jsxs(e.Fragment,{children:[e.jsx("br",{}),ie(a.due_date)]}):"--"]}),e.jsxs("p",{className:"my-1 text-gray-700",children:["Fecha: ",oe(a.created_at)]}),((c=a.description)==null?void 0:c.length)>50?e.jsxs("div",{children:[e.jsx("button",{className:"bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-1 rounded-lg",onClick:()=>t(!0),children:"Descripción"}),e.jsxs("article",{className:`${j?"-translate-y-0":"translate-y-full"} z-10 ease-in duration-150 absolute flex top-0 left-0 w-full h-full bg-vetgreen-100 text-black font-medium rounded-lg`,children:[e.jsx("button",{className:"fixed bg-red-900 text-white font-semibold px-3 py-1 rounded-lg top-1 right-0 me-5 mt-1 animate-bounce",onClick:()=>t(!1),children:"Cerrar"}),e.jsx("p",{className:"overflow-auto p-3 pt-10",children:a.description})]})]}):e.jsxs("p",{className:"text-gray-700 font-semibold",children:[" ",e.jsx("strong",{children:"Descripción:"})," ",a.description||"---"]})]}),e.jsxs("div",{className:"my-3 flex gap-2 pb-4",children:[e.jsx("button",{className:"bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400",onClick:()=>{N("Actualizar"),u(!0),s(a)},children:"Editar"}),e.jsx("button",{className:"bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500",onClick:p,children:"Eliminar"})]}),e.jsxs("p",{className:"text-gray-600 font-medium text-sm absolute bottom-1 right-6",children:["Agregado ",ce(a.created_at)]})]})]})}const i={id:"MODIFY_ID",name:"MODIFY_NAME",price:"MODIFY_PRICE",purchase_price:"MODIFY_PURCHASE_PRICE",stock:"MODIFY_STOCK",utility:"MODIFY_UTILITY",serie:"MODIFY_SERIE",product_image:"MODIFY_PRODUCT_IMAGE",description:"MODIFY_DESCRIPTION",due_date:"MODIFY_DUE_DATE"};function fe(a,s){switch(s.type){case i.id:return{...a,id:s.payload||""};case i.name:return{...a,name:s.payload||""};case i.price:return{...a,price:s.payload||""};case i.purchase_price:return{...a,purchase_price:s.payload||""};case i.stock:return{...a,stock:s.payload||""};case i.utility:return{...a,utility:s.payload||""};case i.serie:return{...a,serie:s.payload||""};case i.product_image:return{...a,product_image:s.payload||""};case i.description:return{...a,description:s.payload||""};case i.due_date:return{...a,due_date:s.payload||""};default:return a}}function ve({product:a,option:s,open:N,setOpen:u,setMustLoad:_,setHelper:w}){const y={method:"POST",url:s!=="Actualizar"?"/products/store":"/products/update",sucessMessage:s==="Crear"?"Producto agregado":"Producto actualizado",loadingMessage:s!=="Actualizar"?"Agregando producto":"Actualizando producto"},[l,d]=n.useReducer(fe,a),[b,g]=n.useState(!1),j=t=>{t.preventDefault(),g(!0);const p=o(e.jsx(U,{message:y.loadingMessage}),{autoClose:3e4,hideProgressBar:!0});I(y.method,y.url,l,!0).then(c=>{if(c.errors)return o.update(p,{render:e.jsx(e.Fragment,{children:e.jsx(z,{data:c.errors})}),type:o.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(c.message)return o.update(p,{render:e.jsx(e.Fragment,{children:c.message}),type:o.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});o.update(p,{render:y.sucessMessage,type:o.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),_(!1),w(x=>x+1),u(!1)}).catch(c=>{console.log(c),o.update(p,{render:"Hay problemas de conexión",type:o.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})}).finally(()=>g(!1))};return n.useEffect(()=>{const t=document.getElementById("product_image");t.value="";for(const p in i){const c=i[p],x=a.hasOwnProperty(p)?a[p]:"";d({type:c,payload:x})}},[a]),n.useEffect(()=>{Number(l.price)&&Number(l.purchase_price)&&d({type:"MODIFY_UTILITY",payload:(parseFloat(l.price)-parseFloat(l.purchase_price)).toFixed(2)})},[l.price,l.purchase_price]),e.jsxs(e.Fragment,{children:[e.jsxs(A,{option:s,open:N,setOpen:u,isLoading:b,handleSubmit:j,icon:B,text:"Producto",children:[e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-1 order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.name,onChange:t=>{d({type:i.name,payload:t.target.value})},required:!0,autoFocus:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Nombre"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-1 order-1",children:[e.jsx("input",{type:"number",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.stock,onChange:t=>{d({type:i.stock,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Stock"})]}),e.jsxs("div",{className:"w-full col-span-full order-1 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-x-6",children:[e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"number",step:"any",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.price,onChange:t=>{d({type:i.price,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Precio"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"number",step:"any",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.purchase_price,onChange:t=>{d({type:i.purchase_price,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Precio de compra"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"number",step:"any",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.utility,onChange:t=>{d({type:i.utility,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Utilidad"})]})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full order-1",children:[e.jsx("input",{type:"file",className:"hidden",id:"product_image",accept:"image/*",onChange:t=>{const p=t.target.files&&t.target.files[0];d({type:i.product_image,payload:p})}}),e.jsx("label",{htmlFor:"product_image",className:"cursor-pointer block w-full py-2 text-center text-gray-600 bg-transparent rounded transition duration-200 ease-in-out hover:bg-gray-300",children:"--- Seleccionar foto (opcional) ---"})]}),l.product_image&&e.jsx("img",{src:URL.createObjectURL(l.product_image),alt:"mascota",className:"order-1 w-3/5 col-span-full mx-auto rounded-lg"}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1 col-span-full sm:col-span-1",children:[e.jsx("input",{type:"datetime-local",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.due_date,onChange:t=>{d({type:i.due_date,payload:t.target.value})}}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Fecha de vencimiento (opcional)"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full sm:col-span-1 order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.serie,onChange:t=>{d({type:i.serie,payload:t.target.value})}}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Serie (opcional)"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full order-1",children:[e.jsx("textarea",{className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",rows:"4",value:l.description,onChange:t=>{d({type:i.description,payload:t.target.value})}}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Descripción (opcional)"})]})]}),e.jsx(A.ToastifyModal,{})]})}function be(){var Y,$,L;const a={id:"",name:"",price:"",purchase_price:"",stock:"",utility:"",serie:"",product_image:null,description:"No hay descripción.",due_date:""},s=[{name:"Nombre",value:"name"},{name:"Código",value:"id"},{name:"Serie",value:"serie"}],[N,u]=n.useState(1),[_,w]=n.useState(12),[y,l]=n.useState("name"),[d,b]=n.useState(""),[g,j]=n.useState(""),[t,p]=n.useState(""),[c,x]=n.useState(""),{debounceValue:f}=pe(d,500),[E,v]=n.useState(0),H=`/products/list?page=${N}&limit=${_}&filter=${y}&inputFilter=${f}&dueDate=${g}&startDate=${t}&finishDate=${c}`,{data:h,loading:k}=ue(H,[N,_,E]),[q,M]=n.useState("Crear"),[G,D]=n.useState(!1),[Q,O]=n.useState(a),[W,S]=n.useState(!0),[V,F]=n.useState(!0),[K,J]=n.useState({url:"",label:""}),[T,R]=n.useState("");return n.useEffect(()=>{k||(S(!0),F(!0),u(1),v(r=>r+1))},[f]),n.useEffect(()=>{setTimeout(()=>{me("/products/by_due_date").then(r=>{if(r.count==0)return;const m=document.createElement("p");m.classList.add("text-center"),m.innerText=`!Tienes ${r.count} producto(s) por vencer en el rango de 30 días!`;const P=document.createElement("div");P.classList.add("text-start"),P.classList.add("ms-5"),r.products.forEach(X=>{P.innerHTML+=`
            <li class='font-bold'>${X.name}</li>
          `}),ge(m,P)})},1e3)},[]),e.jsxs(e.Fragment,{children:[e.jsx(ae,{icon:B,message:"Gestión de productos",name:"producto",setOpen:D,setOption:M,setData:O,initialState:a}),e.jsx(ne,{children:s.map((r,m)=>e.jsx("button",{className:`${y===r.value?"bg-vetgreen-200 text-white":"bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white"} cursor-pointer py-2 md:mx-2 mx-1 rounded-full flex-grow`,onClick:()=>{l(r.value),b("")},children:r.name},m))}),e.jsxs(C,{children:[e.jsxs(C.Search,{inputFilter:d,setInputFilter:b,handleReset:()=>{j(""),p(""),x(""),u(1),v(r=>r+1)},filter:y,filters:s,children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de vencimiento"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:g,onChange:r=>{j(r.target.value),u(1),v(m=>m+1)}})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha inicio"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:t,onChange:r=>{p(r.target.value),u(1),v(m=>m+1)}})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de finalización"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:c,onChange:r=>{x(r.target.value),u(1),v(m=>m+1)}})]})]}),e.jsx(C.FilterBar,{hide:!f&&!t&&!c&&!g,data:[{tag:(Y=s.find(r=>r.value===y))==null?void 0:Y.name,input:f,handleClick:()=>b("")},{tag:"Fecha de inicio",input:t.length>0?t:null,handleClick:()=>{p(""),u(1),v(r=>r+1)}},{tag:"Fecha de finalización",input:c.length>0?c:null,handleClick:()=>{x(""),u(1),v(r=>r+1)}},{tag:"Fecha de vencimiento",input:g.length>0?g:null,handleClick:()=>{j(""),u(1),v(r=>r+1)}}]}),e.jsx(C.CardContainer,{children:k&W?e.jsx(xe,{message:"Cargando productos"}):(($=h.data)==null?void 0:$.length)===0?e.jsx("div",{className:"bg-white p-4 border rounded shadow-lg text-center",children:e.jsxs("p",{className:"text-gray-600 text-lg",children:[e.jsx(te,{icon:re,css:"mr-3"}),"No hay datos disponibles."]})}):e.jsx(e.Fragment,{children:(L=h==null?void 0:h.data)==null?void 0:L.map((r,m)=>e.jsx(C.CardContainer.Card,{mustAnimate:V,setMustAnimate:F,children:e.jsx(he,{productI:r,setProduct:O,setOption:M,setOpenModal:D,setHelper:v,setMustLoad:S,setMustAnimate:F,setImage:J,transitionName:T,setTransitionName:R})},`${r.id}-${m}`))})}),e.jsx(C.Pagination,{pageQuantity:h.current_page*h.per_page,quantity:h.total,setMustLoad:S,setLimit:w,setPage:u,nextPage:h.next_page_url,prevPage:h.prev_page_url,page:h.current_page,lastPage:h.last_page,setMustAnimate:F})]}),T&&e.jsx(ye,{image:K,transitionName:T,setTransitionName:R}),e.jsx(ve,{product:Q,option:q,open:G,setOpen:D,setMustLoad:S,setHelper:v}),e.jsx(se,{})]})}const je=ee.createRoot(document.getElementById("product"));je.render(e.jsx(be,{}));
