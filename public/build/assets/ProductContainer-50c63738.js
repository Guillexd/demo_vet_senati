import{r as n,j as e,m as I,c as Z,H as ee,I as ae,d as te,F as re}from"./Footer-a0a9b1e3.js";import{F as se}from"./Filters-47922677.js";import{e as ne,k as le,g as ie,d as oe,s as ce,Q as c,S as $,f as A,T as B,M as L,u as de,a as pe,i as ue,j as me,b as C,L as ge}from"./Spinner-66f4b8d4.js";import{I as xe}from"./ImageModal-3e64c72f.js";function ye({productI:a,setProduct:s,setOption:j,setOpenModal:u,setHelper:N,setMustLoad:w,setMustAnimate:y,setOpenImage:l,setImage:p,setIsDeleted:v}){var d;const[h,b]=n.useState(!1),t=()=>{ce("¿Quieres eliminar este producto?",()=>{v(!0),y(!1);const o=c(e.jsx($,{message:`Eliminando a ${a.name}`}),{autoClose:3e3,hideProgressBar:!0});A("DELETE","/products/destroy",{id:a.id}).then(m=>{if(w(!1),m.errors)return v(!1),c.update(o,{render:e.jsx(e.Fragment,{children:e.jsx(B,{data:m.errors})}),type:c.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(m.message)return v(!1),c.update(o,{render:e.jsx(e.Fragment,{children:m.message}),type:c.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});c.update(o,{render:`Producto ${a.name} ha sido eliminado.`,type:c.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),N(_=>_+1)}).catch(m=>{c.update(o,{render:"Hay problemas de conexión",type:c.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})})})};return e.jsxs(e.Fragment,{children:[e.jsx("img",{className:"w-full h-96 object-contain",src:a.product_image_url||"/image/juguete.webp",alt:a.name,onClick:()=>{p({url:a.product_image_url||"/image/juguete.webp",label:a.name}),l(!0)}}),e.jsxs("div",{className:"px-8 pt-5 flex flex-col justify-between flex-1",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"uppercase tracking-wide text-sm text-indigo-500 font-semibold",children:["Nombre: ",a.name]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Precio: S/",a.price]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Stock: ",a.stock," u."]}),e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Código: ",ne("P",a.id)]}),a.serie&&e.jsxs("p",{className:"text-gray-900 font-semibold",children:["Serie: ",a.serie]}),e.jsxs("p",{className:"mt-2 text-gray-700",children:["Precio de compra: S/",a.purchase_price]}),e.jsxs("p",{className:"text-gray-700",children:["Utilidad: S/",a.utility]}),e.jsxs("p",{className:"text-gray-900",children:["Fecha de vencimiento: ",a.due_date?le(a.due_date):"---"]}),e.jsxs("p",{className:"text-gray-700",children:["Fecha: ",ie(a.created_at)]}),e.jsx("p",{className:"text-gray-900",children:oe(a.created_at)}),((d=a.description)==null?void 0:d.length)>50?e.jsxs("div",{children:[e.jsx("button",{className:"bg-indigo-500 text-white font-semibold px-3 py-1 rounded-lg",onClick:()=>b(!0),children:"Descripción"}),e.jsxs("article",{className:`${h?"-translate-y-0":"translate-y-full"} ease-in duration-150 absolute flex top-0 left-0 w-full h-full bg-vetgreen-200 text-black font-medium rounded-lg`,children:[e.jsx("button",{className:"fixed bg-red-900 text-white font-semibold px-3 py-1 rounded-lg top-1 right-0 me-5 mt-1 animate-bounce",onClick:()=>b(!1),children:"Cerrar"}),e.jsx("p",{className:"overflow-auto p-3 pt-8",children:a.description})]})]}):e.jsxs("p",{className:"text-gray-700 font-semibold",children:[" ",e.jsx("strong",{children:"Descripción:"})," ",a.description||"---"]})]}),e.jsxs("div",{className:"my-3 flex gap-2",children:[e.jsx("button",{className:"bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400",onClick:()=>{j("Actualizar"),u(!0),s(a)},children:"Editar"}),e.jsx("button",{className:"bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500",onClick:t,children:"Eliminar"})]})]})]})}const i={id:"MODIFY_ID",name:"MODIFY_NAME",price:"MODIFY_PRICE",purchase_price:"MODIFY_PURCHASE_PRICE",stock:"MODIFY_STOCK",utility:"MODIFY_UTILITY",serie:"MODIFY_SERIE",product_image:"MODIFY_PRODUCT_IMAGE",description:"MODIFY_DESCRIPTION",due_date:"MODIFY_DUE_DATE"};function he(a,s){switch(s.type){case i.id:return{...a,id:s.payload||""};case i.name:return{...a,name:s.payload||""};case i.price:return{...a,price:s.payload||""};case i.purchase_price:return{...a,purchase_price:s.payload||""};case i.stock:return{...a,stock:s.payload||""};case i.utility:return{...a,utility:s.payload||""};case i.serie:return{...a,serie:s.payload||""};case i.product_image:return{...a,product_image:s.payload||""};case i.description:return{...a,description:s.payload||""};case i.due_date:return{...a,due_date:s.payload||""};default:return a}}function fe({product:a,option:s,open:j,setOpen:u,setMustLoad:N,setHelper:w}){const y={method:"POST",url:s!=="Actualizar"?"/products/store":"/products/update",sucessMessage:s==="Crear"?"Producto agregado":"Producto actualizado",loadingMessage:s!=="Actualizar"?"Agregando producto":"Actualizando producto"},[l,p]=n.useReducer(he,a),[v,h]=n.useState(!1),b=t=>{t.preventDefault(),h(!0);const d=c(e.jsx($,{message:y.loadingMessage}),{autoClose:3e4,hideProgressBar:!0});A(y.method,y.url,l,!0).then(o=>{if(o.errors)return c.update(d,{render:e.jsx(e.Fragment,{children:e.jsx(B,{data:o.errors})}),type:c.TYPE.ERROR,autoClose:3e3,hideProgressBar:!1});if(o.message)return c.update(d,{render:e.jsx(e.Fragment,{children:o.message}),type:c.TYPE.INFO,autoClose:3e3,hideProgressBar:!1});c.update(d,{render:y.sucessMessage,type:c.TYPE.SUCCESS,autoClose:1500,hideProgressBar:!1}),N(!1),w(m=>m+1),u(!1)}).catch(o=>{console.log(o),c.update(d,{render:"Hay problemas de conexión",type:c.TYPE.WARNING,autoClose:2500,hideProgressBar:!1})}).finally(()=>h(!1))};return n.useEffect(()=>{const t=document.getElementById("product_image");t.value="";for(const d in i){const o=i[d],m=a.hasOwnProperty(d)?a[d]:"";p({type:o,payload:m})}},[a]),n.useEffect(()=>{Number(l.price)&&Number(l.purchase_price)&&p({type:"MODIFY_UTILITY",payload:(parseFloat(l.price)-parseFloat(l.purchase_price)).toFixed(2)})},[l.price,l.purchase_price]),e.jsxs(e.Fragment,{children:[e.jsxs(L,{option:s,open:j,setOpen:u,isLoading:v,handleSubmit:b,icon:I,text:"Producto",children:[e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-1 order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.name,onChange:t=>{p({type:i.name,payload:t.target.value})},required:!0,autoFocus:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Nombre"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-1 order-1",children:[e.jsx("input",{type:"number",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.stock,onChange:t=>{p({type:i.stock,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Stock"})]}),e.jsxs("div",{className:"w-full col-span-full order-1 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-x-6",children:[e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"number",step:"any",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.price,onChange:t=>{p({type:i.price,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Precio"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"number",step:"any",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.purchase_price,onChange:t=>{p({type:i.purchase_price,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Precio de compra"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1",children:[e.jsx("input",{type:"number",step:"any",min:0,className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.utility,onChange:t=>{p({type:i.utility,payload:t.target.value})},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Utilidad"})]})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full order-1",children:[e.jsx("input",{type:"file",className:"hidden",id:"product_image",accept:"image/*",onChange:t=>{const d=t.target.files&&t.target.files[0];p({type:i.product_image,payload:d})}}),e.jsx("label",{htmlFor:"product_image",className:"cursor-pointer block w-full py-2 text-center text-gray-600 bg-transparent rounded transition duration-200 ease-in-out hover:bg-gray-300",children:"--- Seleccionar foto (opcional) ---"})]}),l.product_image&&e.jsx("img",{src:URL.createObjectURL(l.product_image),alt:"mascota",className:"order-1 w-3/5 col-span-full mx-auto rounded-lg"}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full order-1 col-span-full sm:col-span-1",children:[e.jsx("input",{type:"datetime-local",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.due_date,onChange:t=>{p({type:i.due_date,payload:t.target.value})}}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Fecha de vencimiento (opcional)"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full sm:col-span-1 order-1",children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:l.serie,onChange:t=>{p({type:i.serie,payload:t.target.value})}}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Serie (opcional)"})]}),e.jsxs("div",{className:"relative border border-gray-600 rounded w-full col-span-full order-1",children:[e.jsx("textarea",{className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",rows:"4",value:l.description,onChange:t=>{p({type:i.description,payload:t.target.value})}}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:"Descripción (opcional)"})]})]}),e.jsx(L.ToastifyModal,{})]})}function ve(){var M,R,Y;const a={id:"",name:"",price:"",purchase_price:"",stock:"",utility:"",serie:"",product_image:null,description:"No hay descripción.",due_date:""},s=[{name:"Nombre",value:"name"},{name:"Código",value:"id"},{name:"Serie",value:"serie"}],[j,u]=n.useState(1),[N,w]=n.useState(12),[y,l]=n.useState("name"),[p,v]=n.useState(""),[h,b]=n.useState(""),[t,d]=n.useState(""),[o,m]=n.useState(""),{debounceValue:_}=de(p,500),[U,f]=n.useState(0),H=`/products/list?page=${j}&limit=${N}&filter=${y}&inputFilter=${_}&dueDate=${h}&startDate=${t}&finishDate=${o}`,{data:x,loading:D}=pe(H,[j,N,U]),[z,k]=n.useState("Crear"),[q,E]=n.useState(!1),[G,T]=n.useState(a),[Q,S]=n.useState(!0),[W,F]=n.useState(!0),[K,O]=n.useState(!1),[V,J]=n.useState({url:"",label:""});return n.useEffect(()=>{D||(S(!0),F(!0),u(1),f(r=>r+1))},[_]),n.useEffect(()=>{setTimeout(()=>{ue("/products/by_due_date").then(r=>{if(r.count==0)return;const g=document.createElement("p");g.classList.add("text-center"),g.innerText=`!Tienes ${r.count} producto(s) por vencer en el rango de 30 días!`;const P=document.createElement("div");P.classList.add("text-start"),P.classList.add("ms-5"),r.products.forEach(X=>{P.innerHTML+=`
            <li class='font-bold'>${X.name}</li>
          `}),me(g,P)})},1e3)},[]),e.jsxs(e.Fragment,{children:[e.jsx(ee,{icon:I,message:"Gestión de productos",name:"producto",setOpen:E,setOption:k,setData:T,initialState:a}),e.jsx(se,{children:s.map((r,g)=>e.jsx("button",{className:`${y===r.value?"bg-vetgreen-200 text-white":"bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white"} cursor-pointer py-2 md:mx-2 mx-1 rounded-full flex-grow`,onClick:()=>{l(r.value),v("")},children:r.name},g))}),e.jsxs(C,{children:[e.jsxs(C.Search,{inputFilter:p,setInputFilter:v,handleReset:()=>{b(""),d(""),m(""),u(1),f(r=>r+1)},children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de vencimiento"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:h,onChange:r=>{b(r.target.value),u(1),f(g=>g+1)}})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha inicio"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:t,onChange:r=>{d(r.target.value),u(1),f(g=>g+1)}})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-bold text-sm my-2",children:"Fecha de finalización"}),e.jsx("input",{type:"date",className:"p-2 rounded-xl bg-gray-300 w-full",value:o,onChange:r=>{m(r.target.value),u(1),f(g=>g+1)}})]})]}),e.jsx(C.FilterBar,{hide:!_&&!t&&!o&&!h,data:[{tag:(M=s.find(r=>r.value===y))==null?void 0:M.name,input:_,handleClick:()=>v("")},{tag:"Fecha de inicio",input:t.length>0?t:null,handleClick:()=>{d(""),u(1),f(r=>r+1)}},{tag:"Fecha de finalización",input:o.length>0?o:null,handleClick:()=>{m(""),u(1),f(r=>r+1)}},{tag:"Fecha de vencimiento",input:h.length>0?h:null,handleClick:()=>{b(""),u(1),f(r=>r+1)}}]}),e.jsx(C.CardContainer,{children:D&Q?e.jsx(ge,{message:"Cargando productos"}):((R=x.data)==null?void 0:R.length)===0?e.jsx("div",{className:"bg-white p-4 border rounded shadow-lg text-center",children:e.jsxs("p",{className:"text-gray-600 text-lg",children:[e.jsx(ae,{icon:te,css:"mr-3"}),"No hay datos disponibles."]})}):e.jsx(e.Fragment,{children:(Y=x==null?void 0:x.data)==null?void 0:Y.map((r,g)=>e.jsx(C.CardContainer.Card,{mustAnimate:W,setMustAnimate:F,children:e.jsx(ye,{productI:r,setProduct:T,setOption:k,setOpenModal:E,setHelper:f,setMustLoad:S,setMustAnimate:F,setOpenImage:O,setImage:J})},`${r.id}-${g}`))})}),e.jsx(C.Pagination,{pageQuantity:x.current_page*x.per_page,quantity:x.total,setMustLoad:S,setLimit:w,setPage:u,nextPage:x.next_page_url,prevPage:x.prev_page_url,page:x.current_page,lastPage:x.last_page,setMustAnimate:F})]}),e.jsx(xe,{image:V,open:K,setOpen:O}),e.jsx(fe,{product:G,option:z,open:q,setOpen:E,setMustLoad:S,setHelper:f}),e.jsx(re,{})]})}const be=Z.createRoot(document.getElementById("product"));be.render(e.jsx(ve,{}));
