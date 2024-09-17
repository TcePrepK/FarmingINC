(()=>{"use strict";var e={291:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(601),o=n.n(r),s=n(314),i=n.n(s)()(o());i.push([e.id,'#interface-hit-box{position:absolute;width:calc(100vw - 10rem);min-height:5rem;left:3rem;padding:0 2rem 2rem 2rem;z-index:1}#interface-hit-box:hover>#template-interface{transform:translateY(0)}#interface-hit-box #template-interface{min-height:calc(100% - 4rem);padding:0 1rem 1rem 1rem;margin:0 auto;border-radius:0 0 15px 15px;background:#248;box-shadow:0 0 7px 0 #000;transition:transform .2s;transform:translateY(calc(1rem - 100%))}#interface-hit-box #template-interface.edit{transform:translateY(0)}#interface-hit-box #template-interface::after{content:" ";position:absolute;top:0;left:1rem;width:calc(100% - 2rem);height:calc(100% - 1rem);background:rgba(0,0,0,0);border-radius:0 0 7.5px 7.5px;box-shadow:0 0 15px 0 #222 inset;pointer-events:none}#interface-hit-box #template-interface #container{position:relative;width:calc(100% - 1.5rem);min-height:calc(100% - 2.5rem);background:#248;border-radius:0 0 15px 15px;padding:.75rem;margin:0 auto;font-family:Arial,Helvetica,sans-serif;display:flex;gap:5px;overflow-x:auto;overflow-y:hidden}#interface-hit-box #template-interface #container.firefox-scrollbar{scrollbar-color:#368 #1d3a65}#interface-hit-box #template-interface #container::-webkit-scrollbar{height:1.25rem;background:#247;border-radius:15px;box-shadow:0 0 10px #222 inset}#interface-hit-box #template-interface #container::-webkit-scrollbar-thumb{background:#368;border-radius:15px;box-shadow:0 0 5px #222 inset}#interface-hit-box #template-interface #container::-webkit-scrollbar-thumb:hover{background:#2c778f;cursor:pointer}#interface-hit-box #template-interface #container .buffer{display:flex;justify-content:center;align-items:center;position:relative;padding:.5rem 1.5rem;font-size:1.2rem;white-space:nowrap;color:#9ad;border-radius:10px;background:#359;box-shadow:0 0 10px #248 inset;border:none;cursor:pointer;user-select:none}#interface-hit-box #template-interface #container .buffer:empty::before{content:"Enter Name";color:#999}#interface-hit-box #template-interface #container .buffer:hover{background:#4060c0}#interface-hit-box #template-interface #container .buffer:focus{background:#4060df;outline:none}#interface-hit-box #template-interface #container .buffer.active{color:#abf;text-decoration:underline}#interface-hit-box #template-interface #container .buffer::after{content:" ";position:absolute;bottom:0;right:-5px;width:5px;height:100%;background:#248}#interface-hit-box #template-interface #container #buffer-more{position:relative;width:1.5rem;margin:auto 0;padding:.5rem;user-select:none}#interface-hit-box #template-interface #container #buffer-more:hover{cursor:pointer;filter:invert(34%) sepia(57%) saturate(1323%) hue-rotate(200deg) brightness(89%) contrast(87%)}@keyframes ui-expand{0%{transform:translateX(calc(1rem - 100%))}70%{transform:translateX(-1rem)}75%{transform:translateX(0)}}@keyframes ui-collapse{0%{transform:translateX(0)}70%,80%{transform:translateX(calc(2rem - 100%))}100%{transform:translateX(calc(1rem - 100%))}}#node-interface{display:flex;flex-direction:column;flex-wrap:wrap;row-gap:1rem;background:#248;position:relative;width:min-content;height:calc(100% - 13rem);z-index:1;padding:1rem;margin:auto 0;animation:ui-collapse .5s ease-out;border-radius:0 15px 15px 0;box-shadow:3px 0 10px 0 #000}#node-interface #selection .wobble{scale:var(--node-scale-multiplier)}#node-interface #selection .node:not(.wobble){scale:var(--node-scale-multiplier);animation:node-wobble .5s cubic-bezier(0.5, 0, 0.5, 1) !important}#node-interface{transform:translateX(calc(1rem - 100%))}#node-interface.expanded{animation:ui-expand .5s;transform:translateX(0)}#node-interface #selection{display:flex;flex-direction:column;width:100%;height:calc(100% - 6rem);background:#469;border-radius:15px;box-shadow:0 0 15px #000 inset;overflow-y:auto;overflow-x:hidden;user-select:none;-webkit-user-drag:none}#node-interface #selection.firefox-scrollbar{scrollbar-color:#368 #1d3a65}#node-interface #selection::-webkit-scrollbar{width:1.25rem;background:#247;border-radius:0 15px 15px 0;box-shadow:0 0 10px #222 inset}#node-interface #selection::-webkit-scrollbar-thumb{background:#368;border-radius:15px;box-shadow:0 0 5px #222 inset}#node-interface #selection::-webkit-scrollbar-thumb:hover{background:#2c778f;cursor:pointer}#node-interface #visuals #drawer-handle{position:absolute;top:50%;transform:translate(calc(0.5rem - 2px), -50%);fill:#248;width:3rem;padding:.5rem;cursor:pointer;user-select:none;filter:drop-shadow(5px 2px 4px rgba(0, 0, 0, 0.7))}#playground{position:absolute;width:100%;height:100%;background:#333}#playground #playground-canvas{position:absolute;top:0;left:0}#playground #logo-wrapper{position:absolute;display:flex;justify-content:center;pointer-events:none;user-select:none;transform:translate(-50%, -50%)}#playground #logo-wrapper #logo{width:25vh;height:25vh;filter:brightness(1.5);pointer-events:none}#playground #logo-wrapper #background-name{font-family:sans-serif;font-size:8vh;font-weight:1000;line-height:.8;margin:auto 0 0 -2.5vh;color:#4f4f4f;opacity:.6}#playground #logo-wrapper #background-name #df{position:absolute;top:-0.75vh;font-size:1.5em}#playground #blue-screen{position:absolute;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle, rgba(0, 100, 150, 0.2) 20%, rgba(0, 255, 255, 0.1) 100%)}#category-selection{display:flex;flex-direction:row;width:12rem;height:4rem;margin:0 auto;background:#469;border:solid #248;border-radius:1.5rem;box-shadow:0 0 15px #000 inset}#category-selection .category{position:relative;width:4rem;height:4rem;background:var(--option-color);border-radius:.5rem;background-image:linear-gradient(to top, var(--option-color), color-mix(in oklab, var(--option-color) 60%, #fff), color-mix(in oklab, var(--option-color) 30%, #fff));box-shadow:0 0 5px #000 inset;cursor:pointer}.stage{position:relative;width:25rem;padding:.75rem;background:#247;border-radius:1rem;box-shadow:0 0 10px #333;color:#aaf}.stage .header{display:flex;justify-content:center;align-items:center;width:100%;height:1.75rem;margin:-0.25rem 0 .5rem 0;background:#247;border-radius:1rem 1rem 0 0;cursor:grab}.stage .header:after{content:"";position:absolute;top:-0.5rem;left:-0.5rem;width:calc(100% + 1rem);height:3.75rem}.stage .header .title{font-size:1.5rem;font-weight:bold;font-family:Arial,Helvetica,sans-serif}.stage .header .button-holder{display:flex;justify-content:flex-end;align-items:center;gap:.5rem;position:absolute;right:.75rem;z-index:1}.stage .header .button-holder .button{width:1rem;aspect-ratio:1;border-radius:100%;background:var(--color);cursor:pointer}.stage .header .button-holder .button:hover{background:color-mix(in oklab, var(--color) 90%, #000)}.stage .header .button-holder .button:active{background:color-mix(in oklab, var(--color) 80%, #000)}.stage .inner-body{display:flex;flex-direction:column;width:100%;background:#2d4d7e;border-radius:.5rem}.stage .inner-body .currency-body{display:flex;justify-content:center;align-items:center;width:100%;height:5rem;background:linear-gradient(to bottom, rgba(17, 17, 17, 0.3333333333), rgba(0, 0, 0, 0));border-radius:.5rem;font-size:1.5rem;font-weight:bold;font-family:Arial,Helvetica,sans-serif}.stage .inner-body .buyable-body{display:flex;gap:.5rem;flex-direction:row;flex-wrap:wrap;justify-content:center;padding:1rem}.stage .inner-body .buyable-body .generator-body{display:flex;flex-direction:column;gap:.5rem;width:100%}.stage .inner-body .buyable-body .generator-body .generator{width:100%}.stage .inner-body .buyable-body .generator-body .generator .button{width:100%;padding:.5rem 0;border:none;border-radius:.5rem;background:#469;box-shadow:0 0 10px #333;transition:all .1s ease-in-out}.stage .inner-body .buyable-body .generator-body .generator .button:hover{scale:1.02}.stage .inner-body .buyable-body .generator-body .generator .button:active{box-shadow:0 0 2px #333 inset;scale:1}.stage .inner-body .buyable-body .generator-body .generator .button .name{margin:.25rem 0}html,body{background:#333;user-select:none}#main-screen{position:absolute;width:100%;height:100%;top:0;left:0;display:flex;flex-direction:column;background:#3060dd}#structure{position:absolute;width:100%;height:100%;top:0;left:0}.preload{animation-duration:0s !important;transition:background-color 0s,opacity 0s,color 0s,width 0s,height 0s,padding 0s,margin 0s !important}',""]);const a=i},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,s){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var a=0;a<this.length;a++){var c=this[a][0];null!=c&&(i[c]=!0)}for(var d=0;d<e.length;d++){var l=[].concat(e[d]);r&&i[l[0]]||(void 0!==s&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=s),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),t.push(l))}},t}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var s={},i=[],a=0;a<e.length;a++){var c=e[a],d=r.base?c[0]+r.base:c[0],l=s[d]||0,h="".concat(d," ").concat(l);s[d]=l+1;var u=n(h),m={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)t[u].references++,t[u].updater(m);else{var p=o(m,r);r.byIndex=a,t.splice(a,0,{identifier:h,updater:p,references:1})}i.push(h)}return i}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var s=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<s.length;i++){var a=n(s[i]);t[a].references--}for(var c=r(e,o),d=0;d<s.length;d++){var l=n(s[d]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}s=c}}},659:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={id:r,exports:{}};return e[r](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0;class r{constructor(e,t){this.renderName=!0,this.renderSymbol=!0,this.name=e,this.symbol=t}log(...e){const t=new Array,n=new Array;for(const r of e)"string"==typeof r?t.push(r):n.push(r);console.log(this.getFixed(...t),...n)}warn(...e){const t=new Array,n=new Array;for(const r of e)"string"==typeof r?t.push(r):n.push(r);console.warn(this.getFixed(...t),...n)}error(...e){const t=new Array,n=new Array;for(const r of e)"string"==typeof r?t.push(r):n.push(r);console.error(this.getFixed(...t),...n)}throw(...e){throw this.getFixed(...e)}toggleName(){this.renderName=!this.renderName}toggleSymbol(){this.renderSymbol=!this.renderSymbol}getFixed(...e){return this.renderSymbol&&this.symbol?this.renderName?`${this.symbol} [${this.name}] ${e} ${this.symbol}`:`${this.symbol} ${e} ${this.symbol}`:this.renderName?`[${this.name}] ${e}`:`${e}`}}var o,s,i=n(72),a=n.n(i),c=n(825),d=n.n(c),l=n(659),h=n.n(l),u=n(56),m=n.n(u),p=n(540),f=n.n(p),b=n(113),g=n.n(b),w=n(291),x={};x.styleTagTransform=g(),x.setAttributes=m(),x.insert=h().bind(null,"head"),x.domAPI=d(),x.insertStyleElement=f(),a()(w.A,x),w.A&&w.A.locals&&w.A.locals;class y{constructor(){this.lastTime=performance.now(),this.FPS=0}update(){const e=performance.now(),t=e-this.lastTime;return this.lastTime=e,this.FPS=1e3/t,t}}class v{}function E(e,t,...n){const r=document.createElement(e);return void 0!==t&&(void 0!==t.parent&&(t.parent.appendChild(r),delete t.parent),void 0!==t.classes&&t.classes.length>0&&(r.classList.add(...t.classes),delete t.classes),Object.assign(r,t)),r.append(...n),r}function k(e,...t){return E("div",e,...t)}function S(e,...t){return E("span",e,...t)}function T(e){const t=document.getElementById(e);return function(e,t,n=""){if(null==e)throw new Error(t+"\n"+n)}(t,`Element with id "${e}" not found.`),t}v.time=0,function(e){e[e.LEFT=0]="LEFT",e[e.MIDDLE=1]="MIDDLE",e[e.RIGHT=2]="RIGHT"}(o||(o={}));class L{constructor(e){this.x=0,this.y=0,this.element=e,this.element.addEventListener("mousemove",(e=>{this.x=e.clientX,this.y=e.clientY}))}static getAttachment(e){return L.instances.has(e)?L.instances.get(e):new L(e)}set onDown(e){this.element.addEventListener("mousedown",(t=>e(t.button)))}set onUp(e){this.element.addEventListener("mouseup",(t=>e(t.button)))}set onClick(e){this.element.addEventListener("click",(t=>e(t.button)))}set onMove(e){this.element.addEventListener("mousemove",(t=>e(t.movementX,t.movementY)))}set onDrag(e){this.element.addEventListener("drag",(t=>e(t.movementX,t.movementY)))}set onDragStart(e){this.element.addEventListener("dragstart",(()=>e()))}set onDragStop(e){this.element.addEventListener("dragend",(()=>e()))}set onDragOver(e){this.element.addEventListener("dragover",(()=>e()))}set onEnter(e){this.element.addEventListener("mouseenter",(()=>e()))}set onLeave(e){this.element.addEventListener("mouseleave",(()=>e()))}set onWheel(e){this.element.addEventListener("wheel",(t=>e(t.deltaY)))}set onResize(e){this.element.addEventListener("resize",(()=>e(this.element.clientWidth,this.element.clientHeight)))}set onDownRaw(e){this.element.addEventListener("mousedown",e)}set onUpRaw(e){this.element.addEventListener("mouseup",e)}set onClickRaw(e){this.element.addEventListener("click",e)}set onMoveRaw(e){this.element.addEventListener("mousemove",e)}set onDragRaw(e){this.element.addEventListener("drag",e)}set onDragStartRaw(e){this.element.addEventListener("dragstart",e)}set onDragStopRaw(e){this.element.addEventListener("dragend",e)}set onDragOverRaw(e){this.element.addEventListener("dragover",e)}set onEnterRaw(e){this.element.addEventListener("mouseenter",e)}set onLeaveRaw(e){this.element.addEventListener("mouseleave",e)}set onWheelRaw(e){this.element.addEventListener("wheel",e)}}L.instances=new Map;class F{constructor(e){this.root=e}update(e){}updateFrame(){}}class A extends F{constructor(){super(...arguments),this.worldX=0,this.worldY=0}initialize(){const e=T("playground-canvas");this.ctx=e.getContext("2d");const t=T("logo-wrapper");t.style.left=this.root.windowWidth/2+"px",t.style.top=this.root.windowHeight/2+"px",e.width=this.root.windowWidth,e.height=this.root.windowHeight,this.root.windowMouse.onResize=(n,r)=>{e.width=n,e.height=r,t.style.left=this.root.windowWidth/2+"px",t.style.top=this.root.windowHeight/2+"px"};{const e=T("playground"),n=L.getAttachment(e);let r=!1;n.onDown=e=>{e===o.LEFT&&(r=!0)},n.onUp=e=>{e===o.LEFT&&(r=!1)},n.onLeave=()=>r=!1,n.onMove=(e,n)=>{if(!r)return;this.worldX+=e,this.worldY+=n,this.root.simulation.updateWorldTransform();const o=this.worldX+this.root.windowWidth/2,s=this.worldY+this.root.windowHeight/2;t.style.left=`${o}px`,t.style.top=`${s}px`}}}updateFrame(){this.ctx.clearRect(0,0,this.root.windowWidth,this.root.windowHeight);const e=this.worldX+this.root.windowWidth/2,t=this.worldY+this.root.windowHeight/2;this.ctx.translate(e,t),this.lines(128,2,"#454570"),this.lines(32,1,"#353560"),this.ctx.translate(-e,-t)}lines(e,t,n){const r=this.ctx;r.strokeStyle=n,r.lineWidth=t;const o=this.root.windowWidth/2,s=this.root.windowHeight/2,i=Math.floor(-o/e)*e,a=Math.floor(-s/e)*e,c=Math.ceil(o/e)*e,d=Math.ceil(s/e)*e;for(let t=i;t<c;t++)r.beginPath(),r.moveTo(t*e,a*e),r.lineTo(t*e,d*e),r.stroke();for(let t=a;t<d;t++)r.beginPath(),r.moveTo(i*e,t*e),r.lineTo(c*e,t*e),r.stroke()}}class M{constructor(e=0,t=0){this.setParts(e,t)}static fromNumber(e){if(isNaN(e)||!isFinite(e))throw new Error("Invalid number.");const[t,n]=e.toExponential().split("e").map(Number);return new M(t,n)}static fromString(e){const[t,n]=e.split("e").map(Number);return new M(t,n)}toString(){return this.exponent<6?`${Math.round(this.mantissa*Math.pow(10,this.exponent))}`:`${this.mantissa.toFixed(2)}e${this.exponent}`}setParts(e,t){if(isNaN(e)||isNaN(t)||!isFinite(e)||!isFinite(t))throw new Error("Invalid number parts.");this.mantissa=e,this.exponent=Math.floor(t),this.normalize()}normalize(){if(0===this.mantissa)this.exponent=0;else{for(;Math.abs(this.mantissa)>=10;)this.mantissa/=10,this.exponent++;for(;Math.abs(this.mantissa)<1&&0!==this.mantissa;)this.mantissa*=10,this.exponent--;this.mantissa=parseFloat(this.mantissa.toFixed(6))}}equals(e){return this.mantissa===e.mantissa&&this.exponent===e.exponent}greaterThan(e){return this.mantissa>e.mantissa||this.mantissa===e.mantissa&&this.exponent>e.exponent}greaterThanScalar(e){return this.greaterThan(M.fromNumber(e))}lessThan(e){return this.mantissa<e.mantissa||this.mantissa===e.mantissa&&this.exponent<e.exponent}lessThanScalar(e){return this.lessThan(M.fromNumber(e))}add(e){let t,n;this.exponent>e.exponent?(t=this,n=e):(t=e,n=this);const r=t.exponent-n.exponent,o=n.mantissa*Math.pow(10,-r),s=t.mantissa+o;return new M(s,t.exponent)}sub(e){return this.add(new M(-e.mantissa,e.exponent))}mult(e){const t=this.mantissa*e.mantissa,n=this.exponent+e.exponent;return new M(t,n)}div(e){if(0===e.mantissa)throw new Error("Division by zero.");const t=this.mantissa/e.mantissa,n=this.exponent-e.exponent;return new M(t,n)}pow(e){const t=(Math.log(this.mantissa)+this.exponent*Math.LN10)*(e.mantissa*Math.pow(10,e.exponent)),n=Math.exp(t);return M.fromNumber(n)}addScalar(e){return this.add(new M(e,0))}subScalar(e){return this.sub(new M(e,0))}multScalar(e){return this.mult(new M(e,0))}divScalar(e){return this.div(new M(e,0))}powScalar(e){const t=Math.pow(this.mantissa,e),n=this.exponent*e;return new M(t,n)}log10(){const e=Math.log10(this.mantissa)+this.exponent;return new M(e,0)}ln(){const e=Math.log(this.mantissa)+this.exponent*Math.LN10;return new M(e,0)}}class z extends F{getChild(e){return this.body.querySelector(`#${e}`)}}class N extends z{constructor(e,t,n){super(e),this.name=t,this.amount=M.fromNumber(n)}updateFrame(){this.body.innerText=`${this.amount} ${this.name}`}createElement(e){this.body=S({innerText:`${this.amount} ${this.name}`,classes:["currency"],parent:e})}}class H extends N{constructor(e){super(e,"Seeds",0)}}class $ extends z{constructor(e,t){super(e),this.stageX=0,this.stageY=0,this.id=t,this.currency=new H(e)}createElement(e){const t=k({id:this.id,classes:["stage"],parent:e}),n=this.createHeader(t),r=k({classes:["inner-body"],parent:t});this.body=t,this.structure={body:t,header:n,innerBody:r}}createHeader(e){const t=k({classes:["header"],parent:e});return{body:t,title:k({classes:["title"],parent:t}),buttons:this.createHeaderButtons(t)}}createHeaderButtons(e){const t=k({classes:["button-holder"],parent:e}),n=["#fd3","#1f2","#f21"],r=[];for(let e=0;e<3;e++){const o=k({classes:["button"],parent:t});o.style.setProperty("--color",n[e]),r.push(o)}return r}setupDragging(){const e=L.getAttachment(this.structure.header.body);let t=!1;e.onDownRaw=e=>{e.button===o.LEFT&&(t||(t=!0))},this.root.windowMouse.onMove=(e,n)=>{t&&(this.stageX+=e,this.stageY+=n,this.updateTransform())},this.root.windowMouse.onUp=e.onClick=e=>{e===o.LEFT&&t&&(t=!1)},this.root.windowMouse.onLeave=()=>t=!1,this.updateTransform(),this.root.windowMouse.onResize=()=>{this.updateTransform()}}updateTransform(){const e=this.body.getBoundingClientRect(),t=this.root.background.worldX,n=this.root.background.worldY,r=this.stageX+t-(e.width-this.root.windowWidth)/2,o=this.stageY+n-(e.height-this.root.windowHeight)/2;this.body.style.left=`${r}px`,this.body.style.top=`${o}px`}}class R extends z{constructor(e,t,n,r=0){super(e),this.name=t,this.desc=n,this.boughtAmount=M.fromNumber(r),this.effectiveAmount=M.fromNumber(r)}initialize(e){this.root=e}onClick(e){e===o.LEFT&&(this.boughtAmount=this.boughtAmount.addScalar(1),this.effectiveAmount=this.effectiveAmount.addScalar(1))}createElement(e){this.body=k({id:this.name,classes:["buyable"],parent:e}),L.getAttachment(this.body).onUp=this.onClick.bind(this)}}class C extends R{createElement(e){super.createElement(e),this.body.classList.add("generator"),this.nameElement=E("h2",{classes:["name"]}),function(e,...t){E("button",e,...t)}({classes:["button"],parent:this.body},this.nameElement,S({classes:["desc"],innerText:this.desc})),this.updateFrame()}updateFrame(){this.nameElement.innerText=`${this.name} [${this.boughtAmount}`,this.boughtAmount.sub(this.effectiveAmount).lessThanScalar(0)&&(this.nameElement.innerText+=` + ${this.effectiveAmount}`),this.nameElement.innerText+="]"}}class I extends ${constructor(e){super(e,"main-stage"),this.generators=[]}initialize(){this.setupGenerator("Farmland","Generates Seeds"),this.setupGenerator("Slaves","Generates Farmland"),this.setupGenerator("Human Trafficking","Generates Slaves")}update(e){for(let t=0;t<this.generators.length;t++){const n=this.generators[t].effectiveAmount.multScalar(e);0===t?this.currency.amount=this.currency.amount.add(n):this.generators[t-1].effectiveAmount=this.generators[t-1].effectiveAmount.add(n)}}updateFrame(){this.currency.updateFrame();for(const e of this.generators)e.updateFrame()}setupGenerator(e,t){const n=new C(this.root,e,t);n.initialize(this.root),this.generators.push(n)}createElement(e){super.createElement(e),this.structure.header.title.innerText="Main Stage";const t=this.structure.innerBody,n=k({classes:["currency-body"],parent:t});this.currency.createElement(n);const r=k({classes:["buyable-body"],parent:t}),o=k({classes:["generator-body"],parent:r});for(const e of this.generators)e.createElement(o);this.setupDragging()}}class W extends F{constructor(){super(...arguments),this.stages=[]}initialize(){this.body=T("structure")}update(e){for(const t of this.stages)t.update(e)}updateFrame(){for(const e of this.stages)e.updateFrame()}setupStages(){this.setupStage(new I(this.root))}setupStage(e){e.initialize(),e.createElement(this.body),this.stages.push(e)}updateWorldTransform(){for(const e of this.stages)e.updateTransform()}}class D extends F{constructor(e){super(e),this.structure=new W(this.root)}initialize(){this.structure.initialize(),this.structure.setupStages()}update(e){this.structure.update(e)}updateFrame(){this.structure.updateFrame()}updateWorldTransform(){this.structure.updateWorldTransform()}}class X{constructor(){this.windowWidth=0,this.windowHeight=0,this.background=new A(this),this.simulation=new D(this)}initialize(){this.windowMouse=L.getAttachment(document.body),this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight,document.body.dispatchEvent(new Event("resize")),window.addEventListener("resize",(()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight,document.body.dispatchEvent(new Event("resize"))})),this.background.initialize(),this.simulation.initialize()}update(e){this.simulation.update(e)}updateFrame(){this.background.updateFrame(),this.simulation.updateFrame()}}!function(e){e[e.Chrome=0]="Chrome",e[e.Firefox=1]="Firefox",e[e.Safari=2]="Safari",e[e.Edge=3]="Edge",e[e.IE=4]="IE",e[e.Opera=5]="Opera",e[e.Unknown=6]="Unknown"}(s||(s={}));const Y=new r("Browser Support","✔️");class B{static initialize(){this.browser=this.detectBrowser(),Y.log("Browser: "+s[this.browser]),this.updateScrollbars()}static updateScrollbars(){if(this.browser!==s.Firefox)return;const e=[...document.getElementsByClassName("scrollable")];for(const t of e)t.classList.remove("scrollable"),t.classList.add("firefox-scrollbar")}static detectBrowser(){const e=navigator.userAgent;return/chrome|crios|crmo/i.test(e)?s.Chrome:/firefox|fxios/i.test(e)?s.Firefox:/safari/i.test(e)?s.Safari:/edg/i.test(e)?s.Edge:/trident/i.test(e)?s.IE:/opr\//i.test(e)?s.Opera:s.Unknown}}const j=new r("Error Screen","❌");class P{static setInactive(){T("error-screen").style.display="none"}static setActive(e=null){let t=e;e instanceof Error&&(t=e.message),e&&(T("error-screen").style.display="flex",document.querySelector("#error-screen .error").innerHTML=`<span>Error: </span> ${t}`),T("main-screen").remove(),j.toggleName(),j.toggleSymbol(),j.error(e)}}class O{constructor(){this.root=new X,this.fpsCounter=new y}initialize(){B.initialize(),this.root.initialize(),this.preload(),this.startRunning()}preload(){setTimeout((()=>{const e=[...document.getElementsByClassName("preload")];for(const t of e)t.classList.remove("preload")}),500),P.setInactive()}startRunning(){const e=this.fpsCounter.update();v.time+=e/1e3,this.root.update(e/1e3),this.root.updateFrame(),requestAnimationFrame((()=>this.startRunning()))}}const U=new r("Index Initialization","✅");U.log("Renderer initialized successfully!"),U.log("Imported main successfully!"),U.log("Starting the main process...");try{(new O).initialize()}catch(e){P.setActive(e)}})();