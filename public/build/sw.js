if(!self.define){let s,e={};const n=(n,r)=>(n=new URL(n+".js",r).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(r,i)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const o=s=>n(s,l),a={module:{uri:l},exports:t,require:o};e[l]=Promise.all(r.map((s=>a[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-1ab968a5"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-93d8b085.css",revision:null},{url:"assets/app-addceeab.css",revision:null},{url:"assets/app-ca6cf29d.js",revision:null},{url:"assets/BreedContainer-1bddf4dc.js",revision:null},{url:"assets/BreedModal-985309ef.js",revision:null},{url:"assets/CashRegisterContainer-ccc2751e.js",revision:null},{url:"assets/CustomerContainer-9c584ef0.js",revision:null},{url:"assets/ExpenseContainer-20fd1925.js",revision:null},{url:"assets/Filters-4780ecd9.js",revision:null},{url:"assets/Footer-890d0c98.js",revision:null},{url:"assets/Graphics-cdde5f09.js",revision:null},{url:"assets/ImageModal-3eba34aa.js",revision:null},{url:"assets/index-7c0738bf.js",revision:null},{url:"assets/initialStateCustomer-fb21044a.js",revision:null},{url:"assets/PetContainer-e43f7459.js",revision:null},{url:"assets/PetHistoryContainer-33d8cc87.css",revision:null},{url:"assets/PetHistoryContainer-71b0e75e.js",revision:null},{url:"assets/ProductContainer-2b3d7b27.js",revision:null},{url:"assets/ReactSelect-4c55cf99.js",revision:null},{url:"assets/Selector-0bd25776.js",revision:null},{url:"assets/ServiceContainer-0efd1602.js",revision:null},{url:"assets/Spinner-1f1ad60d.js",revision:null},{url:"assets/Spinner-f424a175.css",revision:null},{url:"assets/UserContainer-4b1ad5f7.js",revision:null},{url:"manifest.json",revision:"80481bae4d747a6d95227d60b6dca6e4"},{url:"manifest.webmanifest",revision:"b1b5b96e6611a5463e358cefde3eea09"},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"b1b5b96e6611a5463e358cefde3eea09"}],{}),s.cleanupOutdatedCaches()}));
