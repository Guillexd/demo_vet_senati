import{r as a,j as e,h as c,I as i,u}from"./Footer-1433491c.js";function m({image:r,transitionName:s,setTransitionName:o,setHide:l}){const t=a.useRef(null);return a.useEffect(()=>{s?setTimeout(()=>{t.current.classList.add("backdrop-blur-md")},300):t.current.classList.remove("backdrop-blur-md")},[s]),e.jsx(e.Fragment,{children:e.jsxs("div",{ref:t,className:"fixed top-0 left-0 w-full h-full flex items-center justify-center",style:{zIndex:"50"},onClick:()=>{document.startViewTransition?document.startViewTransition(()=>{c.flushSync(()=>{o(""),typeof l=="function"&&setTimeout(()=>{l(!1)},400)})}):c.flushSync(()=>{o("")})},children:[e.jsx("button",{className:"bg-gray-400 right-0 top-0 absolute p-3 rounded-xl m-2 opacity-80 hover:opacity-45",children:e.jsx(i,{css:"text-green-800",icon:u,size:"22px"})}),e.jsx("img",{className:"object-cover max-h-[80vh] max-w-screen rounded-2xl mx-auto",src:r.url,alt:r.label,onClick:n=>n.stopPropagation(),style:{viewTransitionName:s}})]})})}export{m as I};
