if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const a=s=>i(s,l),u={module:{uri:l},exports:t,require:a};e[l]=Promise.all(n.map((s=>u[s]||a(s)))).then((s=>(r(...s),t)))}}define(["./workbox-1ab968a5"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-2616375f.css",revision:null},{url:"assets/app-89e2b661.js",revision:null},{url:"assets/app-93d8b085.css",revision:null},{url:"assets/BreedContainer-69b7b806.js",revision:null},{url:"assets/BreedModal-22a0fb81.js",revision:null},{url:"assets/ButtonStatus-b916148a.js",revision:null},{url:"assets/CashRegisterContainer-61680561.js",revision:null},{url:"assets/CustomerContainer-e375887d.js",revision:null},{url:"assets/ExpenseContainer-45b0e911.js",revision:null},{url:"assets/Filters-74b6bb7b.js",revision:null},{url:"assets/Footer-5b55d698.js",revision:null},{url:"assets/Graphics-6e4f216a.js",revision:null},{url:"assets/ImageModal-6ba9a32e.js",revision:null},{url:"assets/index-7c0738bf.js",revision:null},{url:"assets/initialStateCustomer-d86a4788.js",revision:null},{url:"assets/initialStateExpense-16218fb6.js",revision:null},{url:"assets/inititalStatePet-8c1edebd.js",revision:null},{url:"assets/PetContainer-87b1df24.js",revision:null},{url:"assets/PetHistoryContainer-33d8cc87.css",revision:null},{url:"assets/PetHistoryContainer-c43efe97.js",revision:null},{url:"assets/ProductContainer-a0bd53f7.js",revision:null},{url:"assets/ReactSelect-a746f969.js",revision:null},{url:"assets/ServiceContainer-a35da466.js",revision:null},{url:"assets/Spinner-b58555d6.js",revision:null},{url:"assets/Spinner-f424a175.css",revision:null},{url:"assets/UserContainer-40a47bfb.js",revision:null},{url:"manifest.json",revision:"3b12cc09455a6a5577bce8565ceb033e"},{url:"manifest.webmanifest",revision:"b1b5b96e6611a5463e358cefde3eea09"},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"b1b5b96e6611a5463e358cefde3eea09"}],{}),s.cleanupOutdatedCaches()}));
