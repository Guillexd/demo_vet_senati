if(!self.define){let s,e={};const n=(n,r)=>(n=new URL(n+".js",r).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(r,i)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const o=s=>n(s,l),a={module:{uri:l},exports:t,require:o};e[l]=Promise.all(r.map((s=>a[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-1ab968a5"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-02104225.css",revision:null},{url:"assets/app-3ec38794.js",revision:null},{url:"assets/app-93d8b085.css",revision:null},{url:"assets/BreedContainer-f803ecca.js",revision:null},{url:"assets/BreedModal-c7e631c0.js",revision:null},{url:"assets/CashRegisterContainer-52cfd114.js",revision:null},{url:"assets/CustomerContainer-d58cd561.js",revision:null},{url:"assets/ExpenseContainer-6527511d.js",revision:null},{url:"assets/Filters-5c1cd9b5.js",revision:null},{url:"assets/Footer-5a793555.js",revision:null},{url:"assets/Graphics-4cc98626.js",revision:null},{url:"assets/ImageModal-6ecf0888.js",revision:null},{url:"assets/index-7c0738bf.js",revision:null},{url:"assets/initialStateCustomer-db3f42bb.js",revision:null},{url:"assets/PetContainer-9bd3a868.js",revision:null},{url:"assets/PetHistoryContainer-12aaf2d8.js",revision:null},{url:"assets/PetHistoryContainer-33d8cc87.css",revision:null},{url:"assets/ProductContainer-4019fc32.js",revision:null},{url:"assets/ReactSelect-a5a841a5.js",revision:null},{url:"assets/Selector-eee34858.js",revision:null},{url:"assets/ServiceContainer-9c8ad506.js",revision:null},{url:"assets/Spinner-4014f47c.js",revision:null},{url:"assets/Spinner-f424a175.css",revision:null},{url:"assets/UserContainer-c5770578.js",revision:null},{url:"manifest.json",revision:"439cb54270a2cf6d291abdc8afbd91d8"},{url:"manifest.webmanifest",revision:"b1b5b96e6611a5463e358cefde3eea09"},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"b1b5b96e6611a5463e358cefde3eea09"}],{}),s.cleanupOutdatedCaches()}));
