import{r as l,j as e,I as j,K as N}from"./Footer-1433491c.js";function F({children:s,mustSearch:n,setMustSearch:i,filters:a,filter:u,setFilter:c,input:d,setInput:r,label:p,setHelper:m,debounceValue:f,setHelperSearch:x,anotherAction:g=!1,actions:b,css:h,listStyle:y}){const[v,o]=l.useState(!1);return l.useEffect(()=>{n&&m(t=>t+1)},[f]),e.jsxs(e.Fragment,{children:[a?e.jsx("div",{className:"bg-gray-400 border-white border-2 w-full col-span-full mx-auto rounded-md flex justify-between font-semibold shadow-lg overflow-y-auto order-1",children:a.map((t,w)=>e.jsx("button",{type:"button",className:`${t.value===u?"bg-gray-600":"hover:bg-gray-600"} text-white cursor-pointer p-2 rounded-md flex-grow`,onClick:()=>c(t.value),children:t.tag},w))}):null,e.jsxs("div",{className:`relative border border-gray-600 rounded ${h||"w-full col-span-full order-1"}`,children:[e.jsx("input",{type:"text",className:"peer block min-h-[auto] w-full rounded border-0 bg-transparent pr-14 pl-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",value:d,onFocus:()=>{x(!0),o(!0)},onBlur:()=>setTimeout(()=>{o(!1)},200),onChange:t=>{i(!0),r(t.target.value)},required:!0}),e.jsx("label",{className:"pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary",children:p}),e.jsx("div",{className:`${v?"absolute":"hidden"} text-white font-semibold bg-black opacity-95 overflow-y-auto mt-1 rounded-lg z-10 ${y||"w-full max-h-44"}`,children:s}),e.jsx("div",{className:"absolute top-0 right-0 h-full animate-bounce cursor-pointer",onClick:()=>{r(""),g&&b()},children:e.jsx(j,{icon:N,css:"h-full text-gray-600"})})]})]})}export{F as R};