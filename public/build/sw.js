if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const a=s=>i(s,l),u={module:{uri:l},exports:t,require:a};e[l]=Promise.all(n.map((s=>u[s]||a(s)))).then((s=>(r(...s),t)))}}define(["./workbox-1ab968a5"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-1e25e49d.js",revision:null},{url:"assets/app-2616375f.css",revision:null},{url:"assets/app-93d8b085.css",revision:null},{url:"assets/BreedContainer-c75a3250.js",revision:null},{url:"assets/BreedModal-d1190aaa.js",revision:null},{url:"assets/ButtonStatus-966703df.js",revision:null},{url:"assets/CashRegisterContainer-7b9e0005.js",revision:null},{url:"assets/CustomerContainer-ca9a9f2a.js",revision:null},{url:"assets/ExpenseContainer-95b9fc21.js",revision:null},{url:"assets/Filters-74b6bb7b.js",revision:null},{url:"assets/Footer-5b55d698.js",revision:null},{url:"assets/Graphics-6e4f216a.js",revision:null},{url:"assets/ImageModal-6ba9a32e.js",revision:null},{url:"assets/index-7c0738bf.js",revision:null},{url:"assets/initialStateCustomer-6990e1eb.js",revision:null},{url:"assets/initialStateExpense-1a81d72d.js",revision:null},{url:"assets/inititalStatePet-f6fa53de.js",revision:null},{url:"assets/PetContainer-e2031d07.js",revision:null},{url:"assets/PetHistoryContainer-1b2e4996.js",revision:null},{url:"assets/PetHistoryContainer-33d8cc87.css",revision:null},{url:"assets/ProductContainer-3e6b12fb.js",revision:null},{url:"assets/ReactSelect-fc5a41ef.js",revision:null},{url:"assets/ServiceContainer-c074e365.js",revision:null},{url:"assets/Spinner-f424a175.css",revision:null},{url:"assets/Spinner-fd53bf80.js",revision:null},{url:"assets/UserContainer-9b656f51.js",revision:null},{url:"manifest.json",revision:"f121b09cccfb3d4d44a8a019eedcb38c"},{url:"manifest.webmanifest",revision:"b1b5b96e6611a5463e358cefde3eea09"},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"b1b5b96e6611a5463e358cefde3eea09"}],{}),s.cleanupOutdatedCaches()}));
