if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const a=s=>i(s,l),o={module:{uri:l},exports:t,require:a};e[l]=Promise.all(n.map((s=>o[s]||a(s)))).then((s=>(r(...s),t)))}}define(["./workbox-1ab968a5"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-273bda0a.css",revision:null},{url:"assets/app-93d8b085.css",revision:null},{url:"assets/app-fe9c251a.js",revision:null},{url:"assets/BreedContainer-e1c5b3e0.js",revision:null},{url:"assets/BreedModal-24198814.js",revision:null},{url:"assets/CashRegisterContainer-a529c2f7.js",revision:null},{url:"assets/CustomerContainer-5450e3f2.js",revision:null},{url:"assets/ExpenseContainer-7dbc54c1.js",revision:null},{url:"assets/Filters-7240b55f.js",revision:null},{url:"assets/Footer-1433491c.js",revision:null},{url:"assets/Graphics-67a587e3.js",revision:null},{url:"assets/ImageModal-d806c578.js",revision:null},{url:"assets/ImportExcelModal-df085d06.js",revision:null},{url:"assets/index-7c0738bf.js",revision:null},{url:"assets/initialStateCustomer-9bca4a80.js",revision:null},{url:"assets/initialStateExpense-60aafb84.js",revision:null},{url:"assets/inititalStatePet-3cd80687.js",revision:null},{url:"assets/PetContainer-92e30fda.js",revision:null},{url:"assets/PetHistoryContainer-13d8a707.js",revision:null},{url:"assets/PetHistoryContainer-33d8cc87.css",revision:null},{url:"assets/ProductContainer-926be1d6.js",revision:null},{url:"assets/ReactSelect-050f0c0e.js",revision:null},{url:"assets/ServiceContainer-6a542033.js",revision:null},{url:"assets/Spinner-b109c97d.js",revision:null},{url:"assets/Spinner-f424a175.css",revision:null},{url:"assets/UserContainer-a84d052b.js",revision:null},{url:"manifest.json",revision:"32efcf2e29ac938851464cb631973e6a"},{url:"manifest.webmanifest",revision:"b1b5b96e6611a5463e358cefde3eea09"},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"b1b5b96e6611a5463e358cefde3eea09"}],{}),s.cleanupOutdatedCaches()}));
