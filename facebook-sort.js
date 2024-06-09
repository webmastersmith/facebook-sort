(function(){"use strict";function v(a,t,o=[],c=!0){var r,n,f,u,i,h,b,l;for(const e of a){const s=e.querySelector('a[href*="/marketplace/item"] > div > div:last-of-type');if(!s){e.style.display="none",e.setAttribute("data-price","0"),e.setAttribute("data-reason","Not a listing");continue}e.setAttribute("data-id",((n=(r=e.querySelector('a[href*="/marketplace/item"]').getAttribute("href"))==null?void 0:r.split("/")[3])==null?void 0:n.trim())||"");const p=s.childNodes;let d=parseInt((u=(f=p[0])==null?void 0:f.innerText)==null?void 0:u.trim().replaceAll(/\$|,/g,""));Number.isNaN(d)&&(d="0"),e.setAttribute("data-price",`${d}`);const m=((h=(i=p[1])==null?void 0:i.innerText)==null?void 0:h.trim())||"",k=((l=(b=p[2])==null?void 0:b.innerText)==null?void 0:l.trim())||"",g=`${m} ${k}`;e.setAttribute("data-search-text",g),c&&!x(t,g)&&(e.style.display="none"),o[0]&&x(o,g,!0)&&(e.style.display="none")}}function y(a){return new Promise(t=>setTimeout(t,a))}function x(a,t,o=!1){const c=t.toLowerCase();return o?a.some(r=>c.includes(r.toLowerCase())):a.every(r=>c.includes(r.toLowerCase()))}function w(a){try{const t=document.createElement("form");t.id="facebook-sort-form-id",t.style="margin-bottom: 2rem; background-color: white;";const o=document.createElement("div");o.className="all-content-wrapper";const c=document.createElement("p");c.className="facebook-sort-name",c.innerText="Facebook Sort",o.appendChild(c);const r=document.createElement("div");r.className="facebook-sort-search-btn-wrapper";const n=document.createElement("div");n.className="facebook-sort-input-container",r.append(n);const f=document.createElement("div");f.className="facebook-sort-search-page-div";const u=document.createElement("label");u.htmlFor="facebook-sort-search-page-input-id",u.className="labelBox facebook-sort-search-page-label",u.innerText="SEARCH ITEMS";const i=document.createElement("input");i.id="facebook-sort-search-page-input-id",i.className="inputBox facebook-sort-search-page-input",i.type="number",i.placeholder="100",i.min="25",i.max="500",i.step="25",f.appendChild(u),f.appendChild(i);const h=document.createElement("div");h.className="facebook-sort-search-page-div";const b=document.createElement("label");b.htmlFor="facebook-sort-remove-input-id",b.className="labelBox facebook-sort-search-page-label",b.innerText="REMOVE LIST";const l=document.createElement("input");l.id="facebook-sort-remove-input-id",l.className="inputBox facebook-sort-remove-input",l.type="text",l.placeholder="comma separated list",h.appendChild(b),h.appendChild(l),n.appendChild(f),n.appendChild(h);const e=document.createElement("div");e.id="facebook-sort-checkbox-btn-id";const s=document.createElement("div");s.className="facebook-sort-checkbox-div";const p=document.createElement("input");p.id="facebook-sort-checkbox-id",p.className="facebook-sort-checkbox",p.type="checkbox",p.checked=!0;const d=document.createElement("label");d.htmlFor="facebook-sort-checkbox-id",d.className="facebook-sort-checkbox-label",d.innerText="FILTER RESULTS?",s.appendChild(p),s.appendChild(d),e.appendChild(s);const m=document.createElement("div");m.id="facebook-sort-btn-id",m.className="facebook-sort-btn",m.onclick=a,m.role="button",m.innerText="GO!",e.appendChild(m),r.appendChild(e),o.appendChild(r);const k=document.createElement("p");return k.className="facebook-sort-signature",k.innerText="webmastersmith",o.appendChild(k),t.appendChild(o),{form:t,checkboxFilter:p,searchInput:i,btn:m,removeInput:l}}catch(t){console.log("Could not create the form",t)}}function C(){try{const a=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");a.appendChild(t);const o="#03399e";return t.appendChild(document.createTextNode(`
      :root {
        --facebook-sort-btn-background: #075ad3;
        --facebook-sort-btn-background-hover: #03399e;
        --facebook-sort-btn-shadow: #4892e0;
      }
      /* form */
      #facebook-sort-form-id {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        padding-bottom: 1rem !important;
        gap: 1.5rem !important;
        width: 100% !important;
        padding-top: 1rem !important;
        border: solid 1px rgba(0, 0, 0, 0.3) !important;
        border-radius: 5px !important;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
      }
      /* form div container */ 
      .all-content-wrapper {
        position: relative !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        padding-bottom: 0.5rem !important;
      }
      /* title div */
      .facebook-sort-name {
        font-size: 3rem !important;
        color: var(--facebook-sort-btn-background-hover) !important;
        font-weight: bold !important;
        padding: 0 !important;
        margin: 0 !important;
        margin-bottom: 1rem !important;
      }
      /* all inputs and btn container div */
      .facebook-sort-search-btn-wrapper {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 1.5rem !important;
      }
      /* all input container */
      .facebook-sort-input-container {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 1.5rem !important;
      }

      /* div around search input and label */
      .facebook-sort-search-page-div {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        gap: 0.5rem !important;
      }
      
      /* all inputs */
      .inputBox {
        width: 100% !important;
        min-height: 2.6rem !important;
        color: var(--facebook-sort-btn-background) !important;
      }
      .labelBox {
        font-weight: bold !important;
      }
      
      /* search input */
      .facebook-sort-search-page-input { 
        font-size: 2rem !important;
        max-width: 140px !important;
        text-align: center !important;
      }
      
      /* remove input */
      .facebook-sort-remove-input {
        font-size: 1.2rem !important;
        text-align: start !important;

      }
      
      /* input label*/
      .facebook-sort-search-page-label {    }
      
      /* Checkbox & Button */
      #facebook-sort-checkbox-btn-id {
      }
      /* Checkbox */
      .facebook-sort-checkbox-div {
        margin-bottom: 4px !important;
        display: flex !important;
        gap: 0.5rem !important;
      }
      .facebook-sort-checkbox {
      }
      .facebook-sort-checkbox-label {
        font-weight: bold !important;
      }
      /* Button */
      .facebook-sort-btn {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        font-size: 24px !important;
        text-align: center !important;
        width: 100% !important;
        height: 40px !important;
        cursor: pointer !important;
        outline: none !important;
        color: #fff !important;
        background-color: var(--facebook-sort-btn-background) !important;
        border: none !important;
        border-radius: 15px !important;
        box-shadow: 0 9px var(--facebook-sort-btn-shadow) !important;
      }
      .facebook-sort-btn:hover {
        background-color: var(--facebook-sort-btn-background-hover) !important;
        box-shadow: 0 9px var(--facebook-sort-btn-background) !important;
      }
      .facebook-sort-btn:active {
        background-color: var(--facebook-sort-btn-background-hover) !important;
        box-shadow: 0 5px var() !important;
        transform: translateY(4px) !important;
      }
  
      /* Start Loading Pages */
      #facebook-sort-loading-wrapper {
        position: relative !important;
        margin-top: 0.5rem !important;
        margin-bottom: 2rem !important;
      }
      .filterResults {
        display: inline !important;
        font-size: 3rem !important;
        color: var(--facebook-sort-btn-background-hover) !important;
        font-weight: bold !important;
        margin: 3rem 0 !important;
      }
      .facebook-sort-lds-ring {
        display: inline !important;
        position: absolute !important;
        top: -15px !important;
        left: 505px !important;
        width: 60px !important;
        height: 60px !important;
      }
      .facebook-sort-lds-ring div {
        box-sizing: border-box !important;
        display: block !important;
        position: absolute !important;
        width: 40px !important;
        height: 40px !important;
        margin: 8px !important;
        border: 8px solid var(--facebook-sort-btn-background-hover) !important;
        border-radius: 50% !important;
        animation: facebook-sort-lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite !important;
        border-color: var(--facebook-sort-btn-background-hover) transparent transparent transparent !important;
      }
      .facebook-sort-lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .facebook-sort-lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .facebook-sort-lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes facebook-sort-lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .facebook-sort-signature {
        position: absolute !important;
        bottom: -1rem !important;
        color: rgba(0, 0, 0, 0.2) !important;
        margin: 0 !important;
      }
          `)),a}catch(a){return console.log(a),null}}(async function(){if(/(file)|(facebook\.com\/marketplace\/.*\/search.*query)/i.test(location.href)){if(!C())throw new Error("Could not attach style sheet.");const{form:t,searchInput:o,checkboxFilter:c,removeInput:r}=w(f);if(!t)throw new Error("Could not create form.");const n=document.querySelector('div[role="main"] div[style^="max-width"] > div:last-of-type');if(!n)throw new Error("Could not get container div.");n.insertBefore(t,n.firstChild);async function f(){var b,l,e;const u=+(o==null?void 0:o.value)||100,i=(c==null?void 0:c.checked)??!0,h=((b=r==null?void 0:r.value)==null?void 0:b.split(","))??[];try{const s=document.querySelector('div[role="navigation"] input[aria-label="Search Marketplace"]'),p=((e=(l=s==null?void 0:s.value)==null?void 0:l.trim())==null?void 0:e.split(" "))??[];if(p.length<1)throw new Error("No Search Term Found");let d=0;for(;n.childNodes.length<u&&!(d>30);)d++,window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),console.log("waiting for new items to load..."),await y(1500);const m=[...n.childNodes];v(m,p,h,i),m.sort((k,g)=>+k.dataset.price-+g.dataset.price),n.replaceChildren(...m),window.scrollTo(0,0)}catch(s){console.error(s);return}}}})()})();
