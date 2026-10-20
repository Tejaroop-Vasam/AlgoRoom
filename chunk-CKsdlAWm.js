import{$ as Ri$1,$n as yt$1,$t as hC,A as J$,An as sl,B as MM,Bn as ve,Bt as ct$1,C as Gb,Ct as Z,D as IM,Dn as rt$1,Dt as Zn$1,E as Gp,En as re$1,Et as Zf,F as Kt$1,Fn as tz,Ft as bt$1,Gn as wy,Gt as eR,H as Mo,Hn as vv,I as LG,In as uC,It as by,J as Pr$1,Jn as xr$1,Jt as ez,K as Oe,Kn as x,Kt as eW,Ln as ue,Lt as cC,M as Jo$1,Mn as ss,Mt as aC,N as K,Nn as te,Nt as ai$1,O as Ie,Ot as Zt$1,Pn as tt$1,Pt as at$1,Q as Re$1,Qn as yn,Qt as ge,R as Lg,Rn as ui$1,Rt as ce,S as GI,Sn as pC,T as Gf,Tn as rD,Tt as Ze,U as My,Un as vy,Ut as de,V as Me,Vn as vn,Vt as dW,W as Ne,Wt as di$1,X as QS,Xn as y0,Y as Pu,Yn as y,Yt as fC,Z as Qt$1,Zn as yc$1,Zt as gC,_ as Ee,_n as oD,_t as X,a as Ac,an as jy,at as Sr$1,b as Ey,bn as os$1,bt as Yf,c as At,cn as ko,ct as Tc,d as C,dn as mt,dt as Ty$1,en as hb,et as Ro,f as Ce$1,fn as nW,ft as U,g as E,gn as nz,gt as WI,hn as nt$1,ht as W,i as AT,in as je,it as Sc$1,j as JA,jn as so$1,jt as _o,k as Iy,kn as sT,kt as _M,l as B,ln as m,lt as Te,m as Dt$1,mn as ne,mt as Vy,n as $n$1,nr as zf,nt as Rt,o as Ai,on as kT,ot as Sy,p as Dn,pn as nc$1,pt as V,qn as xi,qt as et,r as A,rn as jT,rr as zn$1,rt as S,s as Ar$1,sn as ki$1,st as TM,t as $E,tn as is$1,tr as ze,tt as Rr$1,u as Bn$1,un as m_,ut as Tt$1,v as Et$1,vn as oe$1,vt as YA,w as Ge$1,wn as pe$1,wt as ZC,x as Fy,xn as p,xt as Yh,yn as on,yt as Ye,z as Ln$1,zn as ul$1,zt as cl$1}from"./main-W73YS2PR.js";function Bt(n){return n.buttons===0||n.detail===0}function Vt(n){let i=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return!!i&&i.identifier===-1&&(i.radiusX==null||i.radiusX===1)&&(i.radiusY==null||i.radiusY===1)}var wi;function Wo(){if(wi==null){let n=typeof document<`u`?document.head:null;wi=!!(n&&(n.createShadowRoot||n.attachShadow))}return wi}function Ni(n){if(Wo()){let i=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<`u`&&ShadowRoot&&i instanceof ShadowRoot)return i}return null}function jt(){let n=typeof document<`u`&&document?document.activeElement:null;for(;n&&n.shadowRoot;){let i=n.shadowRoot.activeElement;if(i===n)break;n=i}return n}function pe(n){if(n.composedPath)try{return n.composedPath()[0]}catch{}return n.target}var Ei;try{Ei=typeof Intl<`u`&&Intl.v8BreakIterator}catch{Ei=!1}var q=(()=>{class n{_platformId=p(Ri$1);isBrowser=this._platformId?LG(this._platformId):typeof document==`object`&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||Ei)&&typeof CSS<`u`&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!(`MSStream`in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var Ht;function Uo(){if(Ht==null&&typeof window<`u`)try{window.addEventListener(`test`,null,Object.defineProperty({},"passive",{get:()=>Ht=!0}))}finally{Ht=Ht||!1}return Ht}function gt(n){return Uo()?n:!!n.capture}function bt(n,i=0){return Go(n)?Number(n):arguments.length===2?i:0}function Go(n){return!isNaN(parseFloat(n))&&!isNaN(Number(n))}function De(n){return n instanceof et?n.nativeElement:n}var Yo=new y(`cdk-input-modality-detector-options`);var Ko={ignoreKeys:[18,17,224,91,16]};var qo=650;var Mi={passive:!0,capture:!0};var Xo=(()=>{class n{_platform=p(q);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Re$1(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(t=>t===e.keyCode)||(this._modality.next(`keyboard`),this._mostRecentTarget=pe(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<qo||(this._modality.next(Bt(e)?`keyboard`:`mouse`),this._mostRecentTarget=pe(e))};_onTouchstart=e=>{if(Vt(e)){this._modality.next(`keyboard`);return}this._lastTouchMs=Date.now(),this._modality.next(`touch`),this._mostRecentTarget=pe(e)};constructor(){let e=p(Ie),t=p(de),o=p(Yo,{optional:!0});if(this._options=m(m({},Ko),o),this.modalityDetected=this._modality.pipe(pC(1)),this.modalityChanged=this.modalityDetected.pipe(uC()),this._platform.isBrowser){let r=p(Sr$1).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[r.listen(t,`keydown`,this._onKeydown,Mi),r.listen(t,`mousedown`,this._onMousedown,Mi),r.listen(t,`touchstart`,this._onTouchstart,Mi)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var Wt=(function(n){return n[n.IMMEDIATE=0]=`IMMEDIATE`,n[n.EVENTUAL=1]=`EVENTUAL`,n})(Wt||{});var $o=new y(`cdk-focus-monitor-default-options`);var In=gt({passive:!0,capture:!0});var Ut=(()=>{class n{_ngZone=p(Ie);_platform=p(q);_inputModalityDetector=p(Xo);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=p(de);_stopInputModalityDetector=new K;constructor(){let e=p($o,{optional:!0});this._detectionMode=e?.detectionMode||Wt.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let t=pe(e);for(let o=t;o;o=o.parentElement)e.type===`focus`?this._onFocus(e,o):this._onBlur(e,o)};monitor(e,t=!1){let o=De(e);if(!this._platform.isBrowser||o.nodeType!==1)return E();let r=Ni(o)||this._document,a=this._elementInfo.get(o);if(a)return t&&(a.checkChildren=!0),a.subject;let m={checkChildren:t,subject:new K,rootNode:r};return this._elementInfo.set(o,m),this._registerGlobalListeners(m),m.subject}stopMonitoring(e){let t=De(e),o=this._elementInfo.get(t);o&&(o.subject.complete(),this._setClasses(t),this._elementInfo.delete(t),this._removeGlobalListeners(o))}focusVia(e,t,o){let r=De(e);r===this._document.activeElement?this._getClosestElementsInfo(r).forEach(([m,b])=>this._originChanged(m,t,b)):(this._setOrigin(t),typeof r.focus==`function`&&r.focus(o))}ngOnDestroy(){this._elementInfo.forEach((e,t)=>this.stopMonitoring(t))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?`touch`:`program`:this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?`mouse`:`program`}_shouldBeAttributedToTouch(e){return this._detectionMode===Wt.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,t){e.classList.toggle(`cdk-focused`,!!t),e.classList.toggle(`cdk-touch-focused`,t===`touch`),e.classList.toggle(`cdk-keyboard-focused`,t===`keyboard`),e.classList.toggle(`cdk-mouse-focused`,t===`mouse`),e.classList.toggle(`cdk-program-focused`,t===`program`)}_setOrigin(e,t=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e===`touch`&&t,this._detectionMode===Wt.IMMEDIATE){clearTimeout(this._originTimeoutId);let o=this._originFromTouchInteraction?qo:1;this._originTimeoutId=setTimeout(()=>this._origin=null,o)}})}_onFocus(e,t){let o=this._elementInfo.get(t),r=pe(e);!o||!o.checkChildren&&t!==r||this._originChanged(t,this._getFocusOrigin(r),o)}_onBlur(e,t){let o=this._elementInfo.get(t);!o||o.checkChildren&&e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||(this._setClasses(t),this._emitOrigin(o,null))}_emitOrigin(e,t){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(t))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let t=e.rootNode,o=this._rootNodeFocusListenerCount.get(t)||0;o||this._ngZone.runOutsideAngular(()=>{t.addEventListener(`focus`,this._rootNodeFocusAndBlurListener,In),t.addEventListener(`blur`,this._rootNodeFocusAndBlurListener,In)}),this._rootNodeFocusListenerCount.set(t,o+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener(`focus`,this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(di$1(this._stopInputModalityDetector)).subscribe(r=>{this._setOrigin(r,!0)}))}_removeGlobalListeners(e){let t=e.rootNode;if(this._rootNodeFocusListenerCount.has(t)){let o=this._rootNodeFocusListenerCount.get(t);o>1?this._rootNodeFocusListenerCount.set(t,o-1):(t.removeEventListener(`focus`,this._rootNodeFocusAndBlurListener,In),t.removeEventListener(`blur`,this._rootNodeFocusAndBlurListener,In),this._rootNodeFocusListenerCount.delete(t))}--this._monitoredElementCount||(this._getWindow().removeEventListener(`focus`,this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,t,o){this._setClasses(e,t),this._emitOrigin(o,t),this._lastFocusOrigin=t}_getClosestElementsInfo(e){let t=[];return this._elementInfo.forEach((o,r)=>{(r===e||o.checkChildren&&r.contains(e))&&t.push([r,o])}),t}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:t,mostRecentModality:o}=this._inputModalityDetector;if(o!==`mouse`||!t||t===e||e.nodeName!==`INPUT`&&e.nodeName!==`TEXTAREA`||e.disabled)return!1;let r=e.labels;if(r){for(let a=0;a<r.length;a++)if(r[a].contains(t))return!0}return!1}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var On=new WeakMap;var xe=(()=>{class n{_appRef;_injector=p(Oe);_environmentInjector=p(ue);load(e){let t=this._appRef=this._appRef||this._injector.get($n$1),o=On.get(t);o||(o={loaders:new Set,refs:[]},On.set(t,o),t.onDestroy(()=>{On.get(t)?.refs.forEach(r=>r.destroy()),On.delete(t)})),o.loaders.has(e)||(o.loaders.add(e),o.refs.push(nz(e,{environmentInjector:this._environmentInjector})))}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var An=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`ng-component`]],exportAs:[`cdkVisuallyHidden`],decls:0,vars:0,template:function(t,o){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2})}return n})();var Rn;function Ga(){if(Rn===void 0&&(Rn=null,typeof window<`u`)){let n=window;if(n.trustedTypes!==void 0)try{Rn=n.trustedTypes.createPolicy(`angular#components`,{createHTML:i=>i})}catch(i){console.error(i)}}return Rn}function tt(n){return Ga()?.createHTML(n)||n}function Zo(n,i,e){n.innerHTML=tt(e.sanitize(te.HTML,i)||``)}function Di(n){return Array.isArray(n)?n:[n]}var Qo=new Set;var nt;var ki=(()=>{class n{_platform=p(q);_nonce=p(xi,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):Ka}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&Ya(e,this._nonce),this._matchMedia(e)}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();function Ya(n,i){if(!Qo.has(n))try{nt||(nt=document.createElement(`style`),i&&nt.setAttribute(`nonce`,i),nt.setAttribute(`type`,`text/css`),document.head.appendChild(nt)),nt.sheet&&(nt.sheet.insertRule(`@media ${n.replace(/[{}]/g,``)} {body{ }}`,0),Qo.add(n))}catch(e){console.error(e)}}function Ka(n){return{matches:n===`all`||n===``,media:n,addListener:()=>{},removeListener:()=>{}}}var qa=(()=>{class n{create(e){return typeof MutationObserver>`u`?null:new MutationObserver(e)}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var Jo=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({providers:[qa]})}return n})();var Ii=(()=>{class n{_platform=p(q);isDisabled(e){return e.hasAttribute(`disabled`)}isVisible(e){return $a(e)&&getComputedStyle(e).visibility===`visible`}isTabbable(e){if(!this._platform.isBrowser)return!1;let t=Xa(os(e));if(t&&(er(t)===-1||!this.isVisible(t)))return!1;let o=e.nodeName.toLowerCase(),r=er(e);return e.hasAttribute(`contenteditable`)?r!==-1:o===`iframe`||o===`object`||this._platform.WEBKIT&&this._platform.IOS&&!ns(e)?!1:o===`audio`?e.hasAttribute(`controls`)?r!==-1:!1:o===`video`?r===-1?!1:r!==null?!0:this._platform.FIREFOX||e.hasAttribute(`controls`):e.tabIndex>=0}isFocusable(e,t){return is(e)&&!this.isDisabled(e)&&(t?.ignoreVisibility||this.isVisible(e))}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();function Xa(n){try{return n.frameElement}catch{return null}}function $a(n){return!!(n.offsetWidth||n.offsetHeight||typeof n.getClientRects==`function`&&n.getClientRects().length)}function Za(n){let i=n.nodeName.toLowerCase();return i===`input`||i===`select`||i===`button`||i===`textarea`}function Qa(n){return es(n)&&n.type==`hidden`}function Ja(n){return ts(n)&&n.hasAttribute(`href`)}function es(n){return n.nodeName.toLowerCase()==`input`}function ts(n){return n.nodeName.toLowerCase()==`a`}function tr(n){if(!n.hasAttribute(`tabindex`)||n.tabIndex===void 0)return!1;let i=n.getAttribute(`tabindex`);return!!(i&&!isNaN(parseInt(i,10)))}function er(n){if(!tr(n))return null;let i=parseInt(n.getAttribute(`tabindex`)||``,10);return isNaN(i)?-1:i}function ns(n){let i=n.nodeName.toLowerCase(),e=i===`input`&&n.type;return e===`text`||e===`password`||i===`select`||i===`textarea`}function is(n){return Qa(n)?!1:Za(n)||Ja(n)||n.hasAttribute(`contenteditable`)||tr(n)}function os(n){return n.ownerDocument&&n.ownerDocument.defaultView||window}var Ti=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=!1;startAnchorListener=()=>{!this.focusLastTabbableElement()&&this._checker.isFocusable(this._element)&&this._element.focus()};endAnchorListener=()=>{!this.focusFirstTabbableElement()&&this._checker.isFocusable(this._element)&&this._element.focus()};get enabled(){return this._enabled}set enabled(i){this._enabled=i,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(i,this._startAnchor),this._toggleAnchorTabIndex(i,this._endAnchor))}_enabled=!0;constructor(i,e,t,o,r=!1,a){this._element=i,this._checker=e,this._ngZone=t,this._document=o,this._injector=a,r||this.attachAnchors()}destroy(){let i=this._startAnchor,e=this._endAnchor;i&&(i.removeEventListener(`focus`,this.startAnchorListener),i.remove()),e&&(e.removeEventListener(`focus`,this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener(`focus`,this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener(`focus`,this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(i){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(i)))})}focusFirstTabbableElementWhenReady(i){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(i)))})}focusLastTabbableElementWhenReady(i){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(i)))})}_getRegionBoundary(i){let e=this._element.querySelectorAll(`[cdk-focus-region-${i}], [cdkFocusRegion${i}], [cdk-focus-${i}]`);return i==`start`?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(i){let e=this._element.querySelector(`[cdk-focus-initial], [cdkFocusInitial]`);if(e){if(!this._checker.isFocusable(e)){let t=this._getFirstTabbableElement(e);return t?.focus(i),!!t}return e.focus(i),!0}return this.focusFirstTabbableElement(i)}focusFirstTabbableElement(i){let e=this._getRegionBoundary(`start`);return e&&e.focus(i),!!e}focusLastTabbableElement(i){let e=this._getRegionBoundary(`end`);return e&&e.focus(i),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(i){if(this._checker.isFocusable(i)&&this._checker.isTabbable(i))return i;let e=i.children;for(let t=0;t<e.length;t++){let o=e[t].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[t]):null;if(o)return o}return null}_getLastTabbableElement(i){if(this._checker.isFocusable(i)&&this._checker.isTabbable(i))return i;let e=i.children;for(let t=e.length-1;t>=0;t--){let o=e[t].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[t]):null;if(o)return o}return null}_createAnchor(){let i=this._document.createElement(`div`);return this._toggleAnchorTabIndex(this._enabled,i),i.classList.add(`cdk-visually-hidden`),i.classList.add(`cdk-focus-trap-anchor`),i.setAttribute(`aria-hidden`,`true`),i}_toggleAnchorTabIndex(i,e){i?e.setAttribute(`tabindex`,`0`):e.removeAttribute(`tabindex`)}toggleAnchors(i){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(i,this._startAnchor),this._toggleAnchorTabIndex(i,this._endAnchor))}_executeOnStable(i){yc$1(i,{injector:this._injector})}};var Oi=(()=>{class n{_checker=p(Ii);_ngZone=p(Ie);_document=p(de);_injector=p(Oe);constructor(){p(xe).load(An)}create(e,t=!1){return new Ti(e,this._checker,this._ngZone,this._document,t,this._injector)}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var nr=new y(`liveAnnouncerElement`,{providedIn:`root`,factory:()=>null});var ir=new y(`LIVE_ANNOUNCER_DEFAULT_OPTIONS`);var rs=0;var Ri=(()=>{class n{_ngZone=p(Ie);_defaultOptions=p(ir,{optional:!0});_liveElement;_document=p(de);_sanitizer=p(y0);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=p(nr,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...t){let o=this._defaultOptions,r,a;return t.length===1&&typeof t[0]==`number`?a=t[0]:[r,a]=t,this.clear(),clearTimeout(this._previousTimeout),r||(r=o&&o.politeness?o.politeness:`polite`),a==null&&o&&(a=o.duration),this._liveElement.setAttribute(`aria-live`,r),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(m=>this._currentResolve=m)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e==`string`?this._liveElement.textContent=e:Zo(this._liveElement,e,this._sanitizer),typeof a==`number`&&(this._previousTimeout=setTimeout(()=>this.clear(),a)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent=``)}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e=`cdk-live-announcer-element`,t=this._document.getElementsByClassName(e),o=this._document.createElement(`div`);for(let r=0;r<t.length;r++)t[r].remove();return o.classList.add(e),o.classList.add(`cdk-visually-hidden`),o.setAttribute(`aria-atomic`,`true`),o.setAttribute(`aria-live`,`polite`),o.id=`cdk-live-announcer-${rs++}`,this._document.body.appendChild(o),o}_exposeAnnouncerToModals(e){let t=this._document.querySelectorAll(`body > .cdk-overlay-container [aria-modal="true"]`);for(let o=0;o<t.length;o++){let r=t[o],a=r.getAttribute(`aria-owns`);a?a.indexOf(e)===-1&&r.setAttribute(`aria-owns`,a+` `+e):r.setAttribute(`aria-owns`,e)}}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var as=200;var Fn=class{_letterKeyStream=new K;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new K;selectedItem=this._selectedItem;constructor(i,e){let t=typeof e?.debounceInterval==`number`?e.debounceInterval:as;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(i),this._setupKeyHandler(t)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(i){this._selectedItemIndex=i}setItems(i){this._items=i}handleKey(i){let e=i.keyCode;i.key&&i.key.length===1?this._letterKeyStream.next(i.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(i){this._letterKeyStream.pipe(at$1(e=>this._pressedLetters.push(e)),Gp(i),Ye(()=>this._pressedLetters.length>0),W(()=>this._pressedLetters.join(``).toLocaleUpperCase())).subscribe(e=>{for(let t=1;t<this._items.length+1;t++){let o=(this._selectedItemIndex+t)%this._items.length,r=this._items[o];if(!this._skipPredicateFn?.(r)&&r.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(r);break}}this._pressedLetters=[]})}};function Ce(n,...i){return i.length?i.some(e=>n[e]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var Pn=class{_items;_activeItemIndex=V(-1);_activeItem=V(null);_wrap=!1;_typeaheadSubscription=ce.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=i=>i.disabled;constructor(i,e){this._items=i,i instanceof nc$1?this._itemChangesSubscription=i.changes.subscribe(t=>this._itemsChanged(t.toArray())):ki$1(i)&&(this._effectRef=Ln$1(()=>this._itemsChanged(i()),{injector:e}))}tabOut=new K;change=new K;skipPredicate(i){return this._skipPredicateFn=i,this}withWrap(i=!0){return this._wrap=i,this}withVerticalOrientation(i=!0){return this._vertical=i,this}withHorizontalOrientation(i){return this._horizontal=i,this}withAllowedModifierKeys(i){return this._allowedModifierKeys=i,this}withTypeAhead(i=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new Fn(e,{debounceInterval:typeof i==`number`?i:void 0,skipPredicate:t=>this._skipPredicateFn(t)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(t=>{this.setActiveItem(t)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(i=!0){return this._homeAndEnd=i,this}withPageUpDown(i=!0,e=10){return this._pageUpAndDown={enabled:i,delta:e},this}setActiveItem(i){let e=this._activeItem();this.updateActiveItem(i),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(i){let e=i.keyCode,o=[`altKey`,`ctrlKey`,`metaKey`,`shiftKey`].every(r=>!i[r]||this._allowedModifierKeys.indexOf(r)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&o){this.setNextItemActive();break}else return;case 38:if(this._vertical&&o){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&o){this._horizontal===`rtl`?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&o){this._horizontal===`rtl`?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&o){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&o){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(r>0?r:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(r<a?r:a-1,-1);break}else return;default:(o||Ce(i,`shiftKey`))&&this._typeahead?.handleKey(i);return}this._typeahead?.reset(),i.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(i){let e=this._getItemsArray(),t=typeof i==`number`?i:e.indexOf(i),o=e[t];this._activeItem.set(o??null),this._activeItemIndex.set(t),this._typeahead?.setCurrentSelectedItemIndex(t)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(i){this._wrap?this._setActiveInWrapMode(i):this._setActiveInDefaultMode(i)}_setActiveInWrapMode(i){let e=this._getItemsArray();for(let t=1;t<=e.length;t++){let o=(this._activeItemIndex()+i*t+e.length)%e.length,r=e[o];if(!this._skipPredicateFn(r)){this.setActiveItem(o);return}}}_setActiveInDefaultMode(i){this._setActiveItemByIndex(this._activeItemIndex()+i,i)}_setActiveItemByIndex(i,e){let t=this._getItemsArray();if(t[i]){for(;this._skipPredicateFn(t[i]);)if(i+=e,!t[i])return;this.setActiveItem(i)}}_getItemsArray(){return ki$1(this._items)?this._items():this._items instanceof nc$1?this._items.toArray():this._items}_itemsChanged(i){this._typeahead?.setItems(i);let e=this._activeItem();if(e){let t=i.indexOf(e);t>-1&&t!==this._activeItemIndex()&&(this._activeItemIndex.set(t),this._typeahead?.setCurrentSelectedItemIndex(t))}}};var Gt=class extends Pn{setActiveItem(i){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(i),this.activeItem&&this.activeItem.setActiveStyles()}};var sr=new Map;var ee=class n{_appId=p(Ai);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(i,e=!1){this._appId!==`ng`&&(i+=this._appId);let t=sr.get(i);return t===void 0?t=0:t++,sr.set(i,t),`${i}${e?n._infix+`-`:``}${t}`}static ɵfac=function(e){return new(e||n)};static ɵprov=X({token:n,factory:n.ɵfac})};var ls=new y(`cdk-dir-doc`,{providedIn:`root`,factory:()=>p(de)});var ds=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function lr(n){let i=n?.toLowerCase()||``;return i===`auto`&&typeof navigator<`u`&&navigator?.language?ds.test(navigator.language)?`rtl`:`ltr`:i===`rtl`?`rtl`:`ltr`}var Re=(()=>{class n{get value(){return this.valueSignal()}valueSignal=V(`ltr`);change=new ge;constructor(){let e=p(ls,{optional:!0});if(e){let t=e.body?e.body.dir:null,o=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(lr(t||o||`ltr`))}}ngOnDestroy(){this.change.complete()}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var oe=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({})}return n})();function re(n){return n==null?``:typeof n==`string`?n:`${n}px`}function _t(n){return n!=null&&`${n}`!=`false`}var it;function dr(){if(it==null){if(typeof document!=`object`||!document||typeof Element!=`function`||!Element)return it=!1,it;if(document.documentElement?.style&&`scrollBehavior`in document.documentElement.style)it=!0;else{let n=Element.prototype.scrollTo;n?it=!/\{\s*\[native code\]\s*\}/.test(n.toString()):it=!1}}return it}function Pi(){return typeof __karma__<`u`&&!!__karma__||typeof jasmine<`u`&&!!jasmine||typeof jest<`u`&&!!jest||typeof Mocha<`u`&&!!Mocha}var vt;var cr=[`color`,`button`,`checkbox`,`date`,`datetime-local`,`email`,`file`,`hidden`,`image`,`month`,`number`,`password`,`radio`,`range`,`reset`,`search`,`submit`,`tel`,`text`,`time`,`url`,`week`];function Li(){if(vt)return vt;if(typeof document!=`object`||!document)return vt=new Set(cr),vt;let n=document.createElement(`input`);return vt=new Set(cr.filter(i=>(n.setAttribute(`type`,i),n.type===i))),vt}var zi=class{_box;_destroyed=new K;_resizeSubject=new K;_resizeObserver;_elementObservables=new Map;constructor(i){this._box=i,typeof ResizeObserver<`u`&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(i){return this._elementObservables.has(i)||this._elementObservables.set(i,new x(e=>{let t=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(i,{box:this._box}),()=>{this._resizeObserver?.unobserve(i),t.unsubscribe(),this._elementObservables.delete(i)}}).pipe(Ye(e=>e.some(t=>t.target===i)),hC({bufferSize:1,refCount:!0}),di$1(this._destroyed))),this._elementObservables.get(i)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}};var mr=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=p(Ie);constructor(){}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,t){let o=t?.box||`content-box`;return this._observers.has(o)||this._observers.set(o,new zi(o)),this._observers.get(o).observe(e)}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var cs=new y(`MATERIAL_ANIMATIONS`);var ur=null;function ms(){return p(cs,{optional:!0})?.animationsDisabled||p(ZC,{optional:!0})===`NoopAnimations`?`di-disabled`:(ur??=p(ki).matchMedia(`(prefers-reduced-motion)`).matches,ur?`reduced-motion`:`enabled`)}function _e(){return ms()!==`enabled`}var us=[`notch`];var ps=[`*`];var pr=[`iconPrefixContainer`];var fr=[`textPrefixContainer`];var hr=[`iconSuffixContainer`];var gr=[`textSuffixContainer`];var fs=[`textField`];var hs=[`*`,[[`mat-label`]],[[``,`matPrefix`,``],[``,`matIconPrefix`,``]],[[``,`matTextPrefix`,``]],[[``,`matTextSuffix`,``]],[[``,`matSuffix`,``],[``,`matIconSuffix`,``]],[[`mat-error`],[``,`matError`,``]],[[`mat-hint`,3,`align`,`end`]],[[`mat-hint`,`align`,`end`]]];var gs=[`*`,`mat-label`,`[matPrefix], [matIconPrefix]`,`[matTextPrefix]`,`[matTextSuffix]`,`[matSuffix], [matIconSuffix]`,`mat-error, [matError]`,`mat-hint:not([align='end'])`,`mat-hint[align='end']`];function bs(n,i){n&1&&rt$1(0,`span`,21)}function _s(n,i){if(n&1&&(ne(0,`label`,20),is$1(1,1),ze(2,bs,1,0,`span`,21),re$1()),n&2){let e=Ne(2);Dt$1(`floating`,e._shouldLabelFloat())(`monitorResize`,e._hasOutline())(`id`,e._labelId),nt$1(`for`,e._control.disableAutomaticLabeling?null:e._control.id),Z(2),Ge$1(!e.hideRequiredMarker&&e._control.required?2:-1)}}function vs(n,i){if(n&1&&ze(0,_s,3,5,`label`,20),n&2)Ge$1(Ne()._hasFloatingLabel()?0:-1)}function ys(n,i){n&1&&rt$1(0,`div`,7)}function xs(n,i){}function Cs(n,i){if(n&1&&vy(0,xs,0,0,`ng-template`,13),n&2){Ne(2);Dt$1(`ngTemplateOutlet`,sT(1))}}function Ss(n,i){if(n&1&&(ne(0,`div`,9),ze(1,Cs,1,1,null,13),re$1()),n&2){let e=Ne();Dt$1(`matFormFieldNotchedOutlineOpen`,e._shouldLabelFloat()),Z(),Ge$1(e._forceDisplayInfixLabel()?-1:1)}}function ws(n,i){n&1&&(ne(0,`div`,10,2),is$1(2,2),re$1())}function Ns(n,i){n&1&&(ne(0,`div`,11,3),is$1(2,3),re$1())}function Es(n,i){}function Ms(n,i){if(n&1&&vy(0,Es,0,0,`ng-template`,13),n&2){Ne();Dt$1(`ngTemplateOutlet`,sT(1))}}function Ds(n,i){n&1&&(ne(0,`div`,14,4),is$1(2,4),re$1())}function ks(n,i){n&1&&(ne(0,`div`,15,5),is$1(2,5),re$1())}function Ts(n,i){n&1&&rt$1(0,`div`,16)}function Is(n,i){n&1&&(ne(0,`div`,18),is$1(1,6),re$1())}function Os(n,i){if(n&1&&(ne(0,`mat-hint`,22),Me(1),re$1()),n&2){let e=Ne(2);Dt$1(`id`,e._hintLabelId),Z(),Kt$1(e.hintLabel)}}function Rs(n,i){if(n&1&&(ne(0,`div`,19),ze(1,Os,2,2,`mat-hint`,22),is$1(2,7),rt$1(3,`div`,23),is$1(4,8),re$1()),n&2){let e=Ne();Z(),Ge$1(e.hintLabel?1:-1)}}var ot=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[`mat-label`]]})}return n})();var Sr=new y(`MatError`);var Yt=(()=>{class n{id=p(ee).getId(`mat-mdc-error-`);static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[`mat-error`],[``,`matError`,``]],hostAttrs:[1,`mat-mdc-form-field-error`,`mat-mdc-form-field-bottom-align`],hostVars:1,hostBindings:function(t,o){t&2&&by(`id`,o.id)},inputs:{id:`id`},features:[Dn([{provide:Sr,useExisting:n}])]})}return n})();var rt=(()=>{class n{align=`start`;id=p(ee).getId(`mat-mdc-hint-`);static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[`mat-hint`]],hostAttrs:[1,`mat-mdc-form-field-hint`,`mat-mdc-form-field-bottom-align`],hostVars:4,hostBindings:function(t,o){t&2&&(by(`id`,o.id),nt$1(`align`,null),Qt$1(`mat-mdc-form-field-hint-end`,o.align===`end`))},inputs:{align:`align`,id:`id`}})}return n})();var wr=new y(`MatPrefix`);var Kt=(()=>{class n{set _isTextSelector(e){this._isText=!0}_isText=!1;static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[``,`matPrefix`,``],[``,`matIconPrefix`,``],[``,`matTextPrefix`,``]],inputs:{_isTextSelector:[0,`matTextPrefix`,`_isTextSelector`]},features:[Dn([{provide:wr,useExisting:n}])]})}return n})();var Nr=new y(`MatSuffix`);var qt=(()=>{class n{set _isTextSelector(e){this._isText=!0}_isText=!1;static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[``,`matSuffix`,``],[``,`matIconSuffix`,``],[``,`matTextSuffix`,``]],inputs:{_isTextSelector:[0,`matTextSuffix`,`_isTextSelector`]},features:[Dn([{provide:Nr,useExisting:n}])]})}return n})();var Er=new y(`FloatingLabelParent`);var br=(()=>{class n{_elementRef=p(et);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=p(mr);_ngZone=p(Ie);_parent=p(Er);_resizeSubscription=new ce;ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return As(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:`border-box`}).subscribe(()=>this._handleResize())})}static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[`label`,`matFormFieldFloatingLabel`,``]],hostAttrs:[1,`mdc-floating-label`,`mat-mdc-floating-label`],hostVars:2,hostBindings:function(t,o){t&2&&Qt$1(`mdc-floating-label--float-above`,o.floating)},inputs:{floating:`floating`,monitorResize:`monitorResize`}})}return n})();function As(n){let i=n;if(i.offsetParent!==null)return i.scrollWidth;let e=i.cloneNode(!0);e.style.setProperty(`position`,`absolute`),e.style.setProperty(`transform`,`translate(-9999px, -9999px)`),document.documentElement.appendChild(e);let t=e.scrollWidth;return e.remove(),t}var _r=`mdc-line-ripple--active`;var Ln=`mdc-line-ripple--deactivating`;var vr=(()=>{class n{_elementRef=p(et);_cleanupTransitionEnd;constructor(){let e=p(Ie),t=p(mt);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=t.listen(this._elementRef.nativeElement,`transitionend`,this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(Ln),e.add(_r)}deactivate(){this._elementRef.nativeElement.classList.add(Ln)}_handleTransitionEnd=e=>{let t=this._elementRef.nativeElement.classList,o=t.contains(Ln);e.propertyName===`opacity`&&o&&t.remove(_r,Ln)};ngOnDestroy(){this._cleanupTransitionEnd()}static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[`div`,`matFormFieldLineRipple`,``]],hostAttrs:[1,`mdc-line-ripple`]})}return n})();var yr=(()=>{class n{_elementRef=p(et);_ngZone=p(Ie);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,t=e.querySelector(`.mdc-floating-label`);t?(e.classList.add(`mdc-notched-outline--upgraded`),typeof requestAnimationFrame==`function`&&(t.style.transitionDuration=`0s`,this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>t.style.transitionDuration=``)}))):e.classList.add(`mdc-notched-outline--no-label`)}_setNotchWidth(e){let t=this._notch.nativeElement;!this.open||!e?t.style.width=``:t.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty(`--mat-form-field-notch-max-width`,`calc(100% - ${e}px)`)}static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`div`,`matFormFieldNotchedOutline`,``]],viewQuery:function(t,o){if(t&1&&Iy(us,5),t&2){let r;Sy(r=Ty$1())&&(o._notch=r.first)}},hostAttrs:[1,`mdc-notched-outline`],hostVars:2,hostBindings:function(t,o){t&2&&Qt$1(`mdc-notched-outline--notched`,o.open)},inputs:{open:[0,`matFormFieldNotchedOutlineOpen`,`open`]},ngContentSelectors:ps,decls:5,vars:0,consts:[[`notch`,``],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__leading`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__notch`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__trailing`]],template:function(t,o){t&1&&(os$1(),Ro(0,`div`,1),Et$1(1,`div`,2,0),is$1(3),bt$1(),Ro(4,`div`,3))},encapsulation:2})}return n})();var Xt=(()=>{class n{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n})}return n})();var $t=new y(`MatFormField`);var Fs=new y(`MAT_FORM_FIELD_DEFAULT_OPTIONS`);var xr=`fill`;var Ps=`auto`;var Cr=`fixed`;var Ls=`translateY(-50%)`;var yt=(()=>{class n{_elementRef=p(et);_changeDetectorRef=p(Rr$1);_platform=p(q);_idGenerator=p(ee);_ngZone=p(Ie);_defaults=p(Fs,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=oD(`iconPrefixContainer`);_textPrefixContainerSignal=oD(`textPrefixContainer`);_iconSuffixContainerSignal=oD(`iconSuffixContainer`);_textSuffixContainerSignal=oD(`textSuffixContainer`);_prefixSuffixContainers=oe$1(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=J$(ot);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=_t(e)}_hideRequiredMarker=!1;color=`primary`;get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||Ps}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let t=e||this._defaults?.appearance||xr;this._appearanceSignal.set(t)}_appearanceSignal=V(xr);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||Cr}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||Cr}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel=``;_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId(`mat-mdc-form-field-label-`);_hintLabelId=this._idGenerator.getId(`mat-mdc-hint-`);_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new K;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=_e();constructor(){let e=this._defaults,t=p(Re);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),Ln$1(()=>this._currentDirection=t.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-form-field-animations-enabled`)},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control,this._changeDetectorRef.markForCheck()),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=oe$1(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel=`always`)}_initializeControl(e){let t=this._control,o=`mat-mdc-form-field-type-`;e&&this._elementRef.nativeElement.classList.remove(o+e.controlType),t.controlType&&this._elementRef.nativeElement.classList.add(o+t.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=t.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=t.stateChanges.pipe(ul$1([void 0,void 0]),W(()=>[t.errorState,t.userAriaDescribedBy]),fC(),Ye(([[r,a],[m,b]])=>r!==m||a!==b)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),t.ngControl&&t.ngControl.valueChanges&&(this._valueChanges=t.ngControl.valueChanges.pipe(di$1(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),aC(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle(`mat-focused`,e),this._textField?.nativeElement.classList.toggle(`mdc-text-field--focused`,e)}_syncOutlineLabelOffset(){tz({earlyRead:()=>{if(this._appearanceSignal()!==`outline`)return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:`border-box`})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel===`always`}_hasOutline(){return this.appearance===`outline`}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=oe$1(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let t=this._control?this._control.ngControl:null;return t&&t[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?`error`:`hint`}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy==`string`&&e.push(...this._control.userAriaDescribedBy.split(` `)),this._getSubscriptMessageType()===`hint`){let r=this._hintChildren?this._hintChildren.find(m=>m.align===`start`):null,a=this._hintChildren?this._hintChildren.find(m=>m.align===`end`):null;r?e.push(r.id):this._hintLabel&&e.push(this._hintLabelId),a&&e.push(a.id)}else this._errorChildren&&e.push(...this._errorChildren.map(r=>r.id));let t=this._control.describedByIds,o;if(t){let r=this._describedByIds||e;o=e.concat(t.filter(a=>a&&!r.includes(a)))}else o=e;this._control.setDescribedByIds(o),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return[``,null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,t=this._textPrefixContainer?.nativeElement,o=this._iconSuffixContainer?.nativeElement,r=this._textSuffixContainer?.nativeElement,a=e?.getBoundingClientRect().width??0,m=t?.getBoundingClientRect().width??0,b=o?.getBoundingClientRect().width??0,w=r?.getBoundingClientRect().width??0;return[`var(--mat-mdc-form-field-label-transform, ${Ls} translateX(${`calc(${this._currentDirection===`rtl`?`-1`:`1`} * (${`${a+m}px`} + var(--mat-mdc-form-field-label-offset-x, 0px)))`}))`,a+m+b+w]}_writeOutlinedLabelStyles(e){if(e!==null){let[t,o]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=t),o!==null&&this._notchedOutline?._setMaxWidth(o)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let t=e.getRootNode();return t&&t!==e}return document.documentElement.contains(e)}static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`mat-form-field`]],contentQueries:function(t,o,r){if(t&1&&(My(r,o._labelChild,ot,5),Yf(r,Xt,5)(r,wr,5)(r,Nr,5)(r,Sr,5)(r,rt,5)),t&2){Zf();let a;Sy(a=Ty$1())&&(o._formFieldControl=a.first),Sy(a=Ty$1())&&(o._prefixChildren=a),Sy(a=Ty$1())&&(o._suffixChildren=a),Sy(a=Ty$1())&&(o._errorChildren=a),Sy(a=Ty$1())&&(o._hintChildren=a)}},viewQuery:function(t,o){if(t&1&&(Sc$1(o._iconPrefixContainerSignal,pr,5)(o._textPrefixContainerSignal,fr,5)(o._iconSuffixContainerSignal,hr,5)(o._textSuffixContainerSignal,gr,5),Iy(fs,5)(pr,5)(fr,5)(hr,5)(gr,5)(br,5)(yr,5)(vr,5)),t&2){Zf(4);let r;Sy(r=Ty$1())&&(o._textField=r.first),Sy(r=Ty$1())&&(o._iconPrefixContainer=r.first),Sy(r=Ty$1())&&(o._textPrefixContainer=r.first),Sy(r=Ty$1())&&(o._iconSuffixContainer=r.first),Sy(r=Ty$1())&&(o._textSuffixContainer=r.first),Sy(r=Ty$1())&&(o._floatingLabel=r.first),Sy(r=Ty$1())&&(o._notchedOutline=r.first),Sy(r=Ty$1())&&(o._lineRipple=r.first)}},hostAttrs:[1,`mat-mdc-form-field`],hostVars:38,hostBindings:function(t,o){t&2&&Qt$1(`mat-mdc-form-field-label-always-float`,o._shouldAlwaysFloat())(`mat-mdc-form-field-has-icon-prefix`,o._hasIconPrefix)(`mat-mdc-form-field-has-icon-suffix`,o._hasIconSuffix)(`mat-form-field-invalid`,o._control.errorState)(`mat-form-field-disabled`,o._control.disabled)(`mat-form-field-autofilled`,o._control.autofilled)(`mat-form-field-appearance-fill`,o.appearance==`fill`)(`mat-form-field-appearance-outline`,o.appearance==`outline`)(`mat-form-field-hide-placeholder`,o._hasFloatingLabel()&&!o._shouldLabelFloat())(`mat-primary`,o.color!==`accent`&&o.color!==`warn`)(`mat-accent`,o.color===`accent`)(`mat-warn`,o.color===`warn`)(`ng-untouched`,o._shouldForward(`untouched`))(`ng-touched`,o._shouldForward(`touched`))(`ng-pristine`,o._shouldForward(`pristine`))(`ng-dirty`,o._shouldForward(`dirty`))(`ng-valid`,o._shouldForward(`valid`))(`ng-invalid`,o._shouldForward(`invalid`))(`ng-pending`,o._shouldForward(`pending`))},inputs:{hideRequiredMarker:`hideRequiredMarker`,color:`color`,floatLabel:`floatLabel`,appearance:`appearance`,subscriptSizing:`subscriptSizing`,hintLabel:`hintLabel`},exportAs:[`matFormField`],features:[Dn([{provide:$t,useExisting:n},{provide:Er,useExisting:n}])],ngContentSelectors:gs,decls:18,vars:21,consts:[[`labelTemplate`,``],[`textField`,``],[`iconPrefixContainer`,``],[`textPrefixContainer`,``],[`textSuffixContainer`,``],[`iconSuffixContainer`,``],[1,`mat-mdc-text-field-wrapper`,`mdc-text-field`,3,`click`],[1,`mat-mdc-form-field-focus-overlay`],[1,`mat-mdc-form-field-flex`],[`matFormFieldNotchedOutline`,``,3,`matFormFieldNotchedOutlineOpen`],[1,`mat-mdc-form-field-icon-prefix`],[1,`mat-mdc-form-field-text-prefix`],[1,`mat-mdc-form-field-infix`],[3,`ngTemplateOutlet`],[1,`mat-mdc-form-field-text-suffix`],[1,`mat-mdc-form-field-icon-suffix`],[`matFormFieldLineRipple`,``],[`aria-atomic`,`true`,`aria-live`,`polite`,1,`mat-mdc-form-field-subscript-wrapper`,`mat-mdc-form-field-bottom-align`],[1,`mat-mdc-form-field-error-wrapper`],[1,`mat-mdc-form-field-hint-wrapper`],[`matFormFieldFloatingLabel`,``,3,`floating`,`monitorResize`,`id`],[`aria-hidden`,`true`,1,`mat-mdc-form-field-required-marker`,`mdc-floating-label--required`],[3,`id`],[1,`mat-mdc-form-field-hint-spacer`]],template:function(t,o){if(t&1&&(os$1(hs),vy(0,vs,1,1,`ng-template`,null,0,jT),ne(2,`div`,6,1),Te(`click`,function(a){return o._control.onContainerClick(a)}),ze(4,ys,1,0,`div`,7),ne(5,`div`,8),ze(6,Ss,2,2,`div`,9),ze(7,ws,3,0,`div`,10),ze(8,Ns,3,0,`div`,11),ne(9,`div`,12),ze(10,Ms,1,1,null,13),is$1(11),re$1(),ze(12,Ds,3,0,`div`,14),ze(13,ks,3,0,`div`,15),re$1(),ze(14,Ts,1,0,`div`,16),re$1(),ne(15,`div`,17),ze(16,Is,2,0,`div`,18)(17,Rs,5,1,`div`,19),re$1()),t&2){let r;Z(2),Qt$1(`mdc-text-field--filled`,!o._hasOutline())(`mdc-text-field--outlined`,o._hasOutline())(`mdc-text-field--no-label`,!o._hasFloatingLabel())(`mdc-text-field--disabled`,o._control.disabled)(`mdc-text-field--invalid`,o._control.errorState),Z(2),Ge$1(!o._hasOutline()&&!o._control.disabled?4:-1),Z(2),Ge$1(o._hasOutline()?6:-1),Z(),Ge$1(o._hasIconPrefix?7:-1),Z(),Ge$1(o._hasTextPrefix?8:-1),Z(2),Ge$1(!o._hasOutline()||o._forceDisplayInfixLabel()?10:-1),Z(2),Ge$1(o._hasTextSuffix?12:-1),Z(),Ge$1(o._hasIconSuffix?13:-1),Z(),Ge$1(o._hasOutline()?-1:14),Z(),Qt$1(`mat-mdc-form-field-subscript-dynamic-size`,o.subscriptSizing===`dynamic`);let a=o._getSubscriptMessageType();Z(),Ge$1((r=a)===`error`?16:r===`hint`?17:-1)}},dependencies:[br,yr,MM,vr,rt],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-filled-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-outlined-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-filled-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-outlined-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-top-right-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) {
  background-color: var(--%NS%mat-form-field-filled-container-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--%NS%mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-hover-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-filled-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-filled-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-filled-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-filled-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-outlined-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-outlined-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-outlined-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-outlined-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-outline-color, var(--%NS%mat-sys-outline));
  border-width: var(--%NS%mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-hover-outline-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-focus-outline-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-hover-outline-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-focus-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--%NS%mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--%NS%mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--%NS%mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-active-indicator-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-hover-active-indicator-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-active-indicator-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-hover-active-indicator-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--%NS%mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-focus-active-indicator-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-focus-active-indicator-color, var(--%NS%mat-sys-error));
}

.mdc-line-ripple--%NS%active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--%NS%deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--%NS%no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --%NS%mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--%NS%mat-form-field-container-height, 56px);
  padding-top: var(--%NS%mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--%NS%mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--%NS%mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--%NS%mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--%NS%mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--%NS%mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --%NS%mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--%NS%mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--%NS%mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--%NS%mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--%NS%mat-form-field-error-text-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-subscript-text-font, var(--%NS%mat-sys-body-small-font));
  line-height: var(--%NS%mat-form-field-subscript-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  font-size: var(--%NS%mat-form-field-subscript-text-size, var(--%NS%mat-sys-body-small-size));
  letter-spacing: var(--%NS%mat-form-field-subscript-text-tracking, var(--%NS%mat-sys-body-small-tracking));
  font-weight: var(--%NS%mat-form-field-subscript-text-weight, var(--%NS%mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--%NS%mat-form-field-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--%NS%mat-form-field-select-option-text-color, var(--%NS%mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--%NS%mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--%NS%mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--%NS%mat-form-field-enabled-select-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-focus-select-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --%NS%mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-container-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-form-field-container-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-form-field-container-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-form-field-container-text-tracking, var(--%NS%mat-sys-body-large-tracking));
  font-weight: var(--%NS%mat-form-field-container-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--%NS%mat-form-field-outlined-label-text-populated-size) * var(--%NS%mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--%NS%mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-leading-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-trailing-icon-color, var(--%NS%mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-hover-trailing-icon-color, var(--%NS%mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-focus-trailing-icon-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--%NS%filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2})}return n})();var Ue=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({imports:[Jo,yt,oe]})}return n})();var zs=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`ng-component`]],hostAttrs:[`cdk-text-field-style-loader`,``],decls:0,vars:0,template:function(t,o){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2})}return n})();var Bs={passive:!0};var Dr=(()=>{class n{_platform=p(q);_ngZone=p(Ie);_renderer=p(Sr$1).createRenderer(null,null);_styleLoader=p(xe);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return Ce$1;this._styleLoader.load(zs);let t=De(e),o=this._monitoredElements.get(t);if(o)return o.subject;let r=new K,a=`cdk-text-field-autofilled`,m=w=>{w.animationName===`cdk-text-field-autofill-start`&&!t.classList.contains(a)?(t.classList.add(a),this._ngZone.run(()=>r.next({target:w.target,isAutofilled:!0}))):w.animationName===`cdk-text-field-autofill-end`&&t.classList.contains(a)&&(t.classList.remove(a),this._ngZone.run(()=>r.next({target:w.target,isAutofilled:!1})))},b=this._ngZone.runOutsideAngular(()=>(t.classList.add(`cdk-text-field-autofill-monitored`),this._renderer.listen(t,`animationstart`,m,Bs)));return this._monitoredElements.set(t,{subject:r,unlisten:b}),r}stopMonitoring(e){let t=De(e),o=this._monitoredElements.get(t);o&&(o.unlisten(),o.subject.complete(),t.classList.remove(`cdk-text-field-autofill-monitored`),t.classList.remove(`cdk-text-field-autofilled`),this._monitoredElements.delete(t))}ngOnDestroy(){this._monitoredElements.forEach((e,t)=>this.stopMonitoring(t))}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var kr=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({})}return n})();var zn=new y(``);var Tr=new y(`MAT_INPUT_VALUE_ACCESSOR`);var Bn=(()=>{class n{isErrorState(e,t){return!!(e&&e.invalid&&(e.touched||t&&t.submitted))}isSignalErrorState(e){if(!e)return!1;let t=e().invalid(),o=e().touched();return t&&o}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var xt=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;ngControl;formField;constructor(i,e,t,o,r){this._defaultMatcher=i,this._parentFormGroup=t,this._parentForm=o,this._stateChanges=r,e?ki$1(e.field)&&!e.updateValueAndValidity?(this.formField=e,this.ngControl=null):(this.formField=null,this.ngControl=e):this.ngControl=this.formField=null}updateErrorState(){let i=this.errorState,e=this._getCurrentErrorState(this.matcher||this._defaultMatcher);e!==i&&(this.errorState=e,this._stateChanges.next())}_getCurrentErrorState(i){if(this.formField&&i?.isSignalErrorState)return i.isSignalErrorState(this.formField.field())??!1;let e=this._parentFormGroup||this._parentForm,t=this.ngControl?this.ngControl.control:null;return i?.isErrorState(t,e)??!1}};var Hs=[`button`,`checkbox`,`file`,`hidden`,`image`,`radio`,`range`,`reset`,`submit`];var Ws=new y(`MAT_INPUT_CONFIG`);var Ir=(()=>{class n{_elementRef=p(et);_platform=p(q);ngControl=p(Jo$1,{optional:!0,self:!0});_autofillMonitor=p(Dr);_ngZone=p(Ie);_formField=p($t,{optional:!0});_renderer=p(mt);_uid=p(ee).getId(`mat-input-`);_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=p(Ws,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new K;controlType=`mat-input`;autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=_t(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Yh.required)??!1}set required(e){this._required=_t(e)}_required;get type(){return this._type}set type(e){this._type=e||`text`,this._validateType(),!this._isTextarea&&Li().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type=`text`;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=_t(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=[`date`,`datetime`,`datetime-local`,`month`,`time`,`week`].filter(e=>Li().has(e));constructor(){let e=p(YA,{optional:!0}),t=p(JA,{optional:!0}),o=p(Bn),r=p(Tr,{optional:!0,self:!0}),a=p(zn,{optional:!0,self:!0}),m=this._elementRef.nativeElement,b=m.nodeName.toLowerCase();r?ki$1(r.value)?this._signalBasedValueAccessor=r:this._inputValueAccessor=r:this._inputValueAccessor=m,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(m,`keyup`,this._iOSKeyupListener)}),this._errorStateTracker=new xt(o,a||this.ngControl,t,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=b===`select`,this._isTextarea=b===`textarea`,this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=m.multiple?`mat-native-select-multiple`:`mat-native-select`),this._signalBasedValueAccessor&&Ln$1(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let t=this._elementRef.nativeElement;t.type===`number`?(t.type=`text`,t.setSelectionRange(0,0),t.type=`number`):t.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let t=this._elementRef.nativeElement;this._previousPlaceholder=e,e?t.setAttribute(`placeholder`,e):t.removeAttribute(`placeholder`)}}_getPlaceholder(){return this.placeholder||null}_validateType(){Hs.indexOf(this._type)}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,t=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&t&&t.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute(`aria-describedby`,e.join(` `)):t.removeAttribute(`aria-describedby`)}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let t=e.target;!t.value&&t.selectionStart===0&&t.selectionEnd===0&&(t.setSelectionRange(1,1),t.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?`true`:null}static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[`input`,`matInput`,``],[`textarea`,`matInput`,``],[`select`,`matNativeControl`,``],[`input`,`matNativeControl`,``],[`textarea`,`matNativeControl`,``]],hostAttrs:[1,`mat-mdc-input-element`],hostVars:21,hostBindings:function(t,o){t&1&&Te(`focus`,function(){return o._focusChanged(!0)})(`blur`,function(){return o._focusChanged(!1)})(`input`,function(){return o._onInput()}),t&2&&(by(`id`,o.id)(`disabled`,o.disabled&&!o.disabledInteractive)(`required`,o.required),nt$1(`name`,o.name||null)(`readonly`,o._getReadonlyAttribute())(`aria-disabled`,o.disabled&&o.disabledInteractive?`true`:null)(`aria-invalid`,o.empty&&o.required?null:o.errorState)(`aria-required`,o.required)(`id`,o.id),Qt$1(`mat-input-server`,o._isServer)(`mat-mdc-form-field-textarea-control`,o._isInFormField&&o._isTextarea)(`mat-mdc-form-field-input-control`,o._isInFormField)(`mat-mdc-input-disabled-interactive`,o.disabledInteractive)(`mdc-text-field__input`,o._isInFormField)(`mat-mdc-native-select-inline`,o._isInlineSelect()))},inputs:{disabled:`disabled`,id:`id`,placeholder:`placeholder`,name:`name`,required:`required`,type:`type`,errorStateMatcher:`errorStateMatcher`,userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],value:`value`,readonly:`readonly`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,xr$1]},exportAs:[`matInput`],features:[Dn([{provide:Xt,useExisting:n}]),yt$1]})}return n})();var Or=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({imports:[Ue,Ue,kr,oe]})}return n})();function Rr(n){return Error(`Unable to find icon with the name "${n}"`)}function Gs(){return Error(`Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.`)}function Ar(n){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${n}".`)}function Fr(n){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${n}".`)}var Ge=class{url;svgText;options;svgElement=null;constructor(i,e,t){this.url=i,this.svgText=e,this.options=t}};var Lr=(()=>{class n{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=[`material-icons`,`mat-ligature-font`];constructor(e,t,o,r){this._httpClient=e,this._sanitizer=t,this._errorHandler=r,this._document=o}addSvgIcon(e,t,o){return this.addSvgIconInNamespace(``,e,t,o)}addSvgIconLiteral(e,t,o){return this.addSvgIconLiteralInNamespace(``,e,t,o)}addSvgIconInNamespace(e,t,o,r){return this._addSvgIconConfig(e,t,new Ge(o,null,r))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,t,o,r){let a=this._sanitizer.sanitize(te.HTML,o);if(!a)throw Fr(o);let m=tt(a);return this._addSvgIconConfig(e,t,new Ge(``,m,r))}addSvgIconSet(e,t){return this.addSvgIconSetInNamespace(``,e,t)}addSvgIconSetLiteral(e,t){return this.addSvgIconSetLiteralInNamespace(``,e,t)}addSvgIconSetInNamespace(e,t,o){return this._addSvgIconSetConfig(e,new Ge(t,null,o))}addSvgIconSetLiteralInNamespace(e,t,o){let r=this._sanitizer.sanitize(te.HTML,t);if(!r)throw Fr(t);let a=tt(r);return this._addSvgIconSetConfig(e,new Ge(``,a,o))}registerFontClassAlias(e,t=e){return this._fontCssClassesByAlias.set(e,t),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let t=this._sanitizer.sanitize(te.RESOURCE_URL,e);if(!t)throw Ar(e);let o=this._cachedIconsByUrl.get(t);return o?E(Vn(o)):this._loadSvgIconFromConfig(new Ge(e,null)).pipe(at$1(r=>this._cachedIconsByUrl.set(t,r)),W(r=>Vn(r)))}getNamedSvgIcon(e,t=``){let o=Pr(t,e),r=this._svgIconConfigs.get(o);if(r)return this._getSvgFromConfig(r);if(r=this._getIconConfigFromResolvers(t,e),r)return this._svgIconConfigs.set(o,r),this._getSvgFromConfig(r);let a=this._iconSetConfigs.get(t);return a?this._getSvgFromIconSetConfigs(e,a):U(Rr(o))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?E(Vn(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(W(t=>Vn(t)))}_getSvgFromIconSetConfigs(e,t){let o=this._extractIconWithNameFromAnySet(e,t);if(o)return E(o);return sl(t.filter(a=>!a.svgText).map(a=>this._loadSvgIconSetFromConfig(a).pipe(pe$1(m=>{let w=`Loading icon set URL: ${this._sanitizer.sanitize(te.RESOURCE_URL,a.url)} failed: ${m.message}`;return this._errorHandler.handleError(new Error(w)),E(null)})))).pipe(W(()=>{let a=this._extractIconWithNameFromAnySet(e,t);if(!a)throw Rr(e);return a}))}_extractIconWithNameFromAnySet(e,t){for(let o=t.length-1;o>=0;o--){let r=t[o];if(r.svgText&&r.svgText.toString().indexOf(e)>-1){let a=this._svgElementFromConfig(r),m=this._extractSvgIconFromSet(a,e,r.options);if(m)return m}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(at$1(t=>e.svgText=t),W(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?E(null):this._fetchIcon(e).pipe(at$1(t=>e.svgText=t))}_extractSvgIconFromSet(e,t,o){let r=e.querySelector(`[id="${t}"]`);if(!r)return null;let a=r.cloneNode(!0);if(a.removeAttribute(`id`),a.nodeName.toLowerCase()===`svg`)return this._setSvgAttributes(a,o);if(a.nodeName.toLowerCase()===`symbol`)return this._setSvgAttributes(this._toSvgElement(a),o);let m=this._svgElementFromString(tt(`<svg></svg>`));return m.appendChild(a),this._setSvgAttributes(m,o)}_svgElementFromString(e){let t=this._document.createElement(`DIV`);t.innerHTML=e;let o=t.querySelector(`svg`);if(!o)throw Error(`<svg> tag not found`);return o}_toSvgElement(e){let t=this._svgElementFromString(tt(`<svg></svg>`)),o=e.attributes;for(let r=0;r<o.length;r++){let{name:a,value:m}=o[r];a!==`id`&&t.setAttribute(a,m)}for(let r=0;r<e.childNodes.length;r++)e.childNodes[r].nodeType===this._document.ELEMENT_NODE&&t.appendChild(e.childNodes[r].cloneNode(!0));return t}_setSvgAttributes(e,t){return e.setAttribute(`fit`,``),e.setAttribute(`height`,`100%`),e.setAttribute(`width`,`100%`),e.setAttribute(`preserveAspectRatio`,`xMidYMid meet`),e.setAttribute(`focusable`,`false`),t&&t.viewBox&&e.setAttribute(`viewBox`,t.viewBox),e}_fetchIcon(e){let{url:t,options:o}=e,r=o?.withCredentials??!1;if(!this._httpClient)throw Gs();if(t==null)throw Error(`Cannot fetch icon from URL "${t}".`);let a=this._sanitizer.sanitize(te.RESOURCE_URL,t);if(!a)throw Ar(t);let m=this._inProgressUrlFetches.get(a);if(m)return m;let b=this._httpClient.get(a,{responseType:`text`,withCredentials:r}).pipe(W(w=>tt(w)),so$1(()=>this._inProgressUrlFetches.delete(a)),cl$1());return this._inProgressUrlFetches.set(a,b),b}_addSvgIconConfig(e,t,o){return this._svgIconConfigs.set(Pr(e,t),o),this}_addSvgIconSetConfig(e,t){let o=this._iconSetConfigs.get(e);return o?o.push(t):this._iconSetConfigs.set(e,[t]),this}_svgElementFromConfig(e){if(!e.svgElement){let t=this._svgElementFromString(e.svgText);this._setSvgAttributes(t,e.options),e.svgElement=t}return e.svgElement}_getIconConfigFromResolvers(e,t){for(let o=0;o<this._resolvers.length;o++){let r=this._resolvers[o](t,e);if(r)return Ys(r)?new Ge(r.url,null,r.options):new Ge(r,null)}}static ɵfac=function(t){return new(t||n)(C(Pr$1,8),C(y0),C(de,8),C(ct$1))};static ɵprov=S({token:n,factory:n.ɵfac,providedIn:`root`})}return n})();function Vn(n){return n.cloneNode(!0)}function Pr(n,i){return n+`:`+i}function Ys(n){return!!(n.url&&n.options)}var Ks=[`*`];var qs=new y(`MAT_ICON_DEFAULT_OPTIONS`);var Xs=new y(`mat-icon-location`,{providedIn:`root`,factory:()=>{let n=p(de),i=n?n.location:null;return{getPathname:()=>i?i.pathname+i.search:``}}});var zr=[`clip-path`,`color-profile`,`src`,`cursor`,`fill`,`filter`,`marker`,`marker-start`,`marker-mid`,`marker-end`,`mask`,`stroke`];var $s=zr.map(n=>`[${n}]`).join(`, `);var Zs=/^url\(['"]?#(.*?)['"]?\)$/;var jn=(()=>{class n{_elementRef=p(et);_iconRegistry=p(Lr);_location=p(Xs);_errorHandler=p(ct$1);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let t=this._cleanupFontValue(e);t!==this._fontSet&&(this._fontSet=t,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let t=this._cleanupFontValue(e);t!==this._fontIcon&&(this._fontIcon=t,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=ce.EMPTY;constructor(){let e=p(new Ac(`aria-hidden`),{optional:!0}),t=p(qs,{optional:!0});t&&(t.color&&(this.color=this._defaultColor=t.color),t.fontSet&&(this.fontSet=t.fontSet)),e||this._elementRef.nativeElement.setAttribute(`aria-hidden`,`true`)}_splitIconName(e){if(!e)return[``,``];let t=e.split(`:`);switch(t.length){case 1:return[``,t[0]];case 2:return t;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let t=this._location.getPathname();t!==this._previousPath&&(this._previousPath=t,this._prependPathToReferences(t))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let t=this._location.getPathname();this._previousPath=t,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(t),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,t=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();t--;){let o=e.childNodes[t];(o.nodeType!==1||o.nodeName.toLowerCase()===`svg`)&&o.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,t=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(o=>o.length>0);this._previousFontSetClass.forEach(o=>e.classList.remove(o)),t.forEach(o=>e.classList.add(o)),this._previousFontSetClass=t,this.fontIcon!==this._previousFontIconClass&&!t.includes(`mat-ligature-font`)&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e==`string`?e.trim().split(` `)[0]:e}_prependPathToReferences(e){let t=this._elementsWithExternalReferences;t&&t.forEach((o,r)=>{o.forEach(a=>{r.setAttribute(a.name,`url('${e}#${a.value}')`)})})}_cacheChildrenWithExternalReferences(e){let t=e.querySelectorAll($s),o=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let r=0;r<t.length;r++)zr.forEach(a=>{let m=t[r],b=m.getAttribute(a),w=b?b.match(Zs):null;if(w){let x=o.get(m);x||(x=[],o.set(m,x)),x.push({name:a,value:w[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[t,o]=this._splitIconName(e);t&&(this._svgNamespace=t),o&&(this._svgName=o),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(o,t).pipe(on(1)).subscribe(r=>this._setSvgElement(r),r=>{let a=`Error retrieving icon ${t}:${o}! ${r.message}`;this._errorHandler.handleError(new Error(a))})}}static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`mat-icon`]],hostAttrs:[`role`,`img`,1,`mat-icon`,`notranslate`],hostVars:10,hostBindings:function(t,o){t&2&&(nt$1(`data-mat-icon-type`,o._usingFontIcon()?`font`:`svg`)(`data-mat-icon-name`,o._svgName||o.fontIcon)(`data-mat-icon-namespace`,o._svgNamespace||o.fontSet)(`fontIcon`,o._usingFontIcon()?o.fontIcon:null),ss(o.color?`mat-`+o.color:``),Qt$1(`mat-icon-inline`,o.inline)(`mat-icon-no-color`,o.color!==`primary`&&o.color!==`accent`&&o.color!==`warn`))},inputs:{color:`color`,inline:[2,`inline`,`inline`,xr$1],svgIcon:`svgIcon`,fontSet:`fontSet`,fontIcon:`fontIcon`},exportAs:[`matIcon`],ngContentSelectors:Ks,decls:1,vars:0,template:function(t,o){t&1&&(os$1(),is$1(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--%NS%mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2})}return n})();var Hn=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({imports:[oe]})}return n})();var ke=(function(n){return n[n.FADING_IN=0]=`FADING_IN`,n[n.VISIBLE=1]=`VISIBLE`,n[n.FADING_OUT=2]=`FADING_OUT`,n[n.HIDDEN=3]=`HIDDEN`,n})(ke||{});var Bi=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=ke.HIDDEN;constructor(i,e,t,o=!1){this._renderer=i,this.element=e,this.config=t,this._animationForciblyDisabledThroughCss=o}fadeOut(){this._renderer.fadeOutRipple(this)}};var Vr=gt({passive:!0,capture:!0});var Vi=class{_events=new Map;addHandler(i,e,t,o){let r=this._events.get(e);if(r){let a=r.get(t);a?a.add(o):r.set(t,new Set([o]))}else this._events.set(e,new Map([[t,new Set([o])]])),i.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,Vr)})}removeHandler(i,e,t){let o=this._events.get(i);if(!o)return;let r=o.get(e);r&&(r.delete(t),r.size===0&&o.delete(e),o.size===0&&(this._events.delete(i),document.removeEventListener(i,this._delegateEventHandler,Vr)))}_delegateEventHandler=i=>{let e=pe(i);e&&this._events.get(i.type)?.forEach((t,o)=>{(o===e||o.contains(e))&&t.forEach(r=>r.handleEvent(i))})}};var Zt={enterDuration:225,exitDuration:150};var Qs=800;var jr=gt({passive:!0,capture:!0});var Hr=[`mousedown`,`touchstart`];var Wr=[`mouseup`,`mouseleave`,`touchend`,`touchcancel`];var Js=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`ng-component`]],hostAttrs:[`mat-ripple-style-loader`,``],decls:0,vars:0,template:function(t,o){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--%NS%mat-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2})}return n})();var Qt=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Vi;constructor(i,e,t,o,r){this._target=i,this._ngZone=e,this._platform=o,o.isBrowser&&(this._containerElement=De(t)),r&&r.get(xe).load(Js)}fadeInRipple(i,e,t={}){let o=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),r=m(m({},Zt),t.animation);t.centered&&(i=o.left+o.width/2,e=o.top+o.height/2);let a=t.radius||el(i,e,o),m$1=i-o.left,b=e-o.top,w=r.enterDuration,x=document.createElement(`div`);x.classList.add(`mat-ripple-element`),x.style.left=`${m$1-a}px`,x.style.top=`${b-a}px`,x.style.height=`${a*2}px`,x.style.width=`${a*2}px`,t.color!=null&&(x.style.backgroundColor=t.color),x.style.transitionDuration=`${w}ms`,this._containerElement.appendChild(x);let L=window.getComputedStyle(x),ce=L.transitionProperty,me=L.transitionDuration,le=ce===`none`||me===`0s`||me===`0s, 0s`||o.width===0&&o.height===0,ae=new Bi(this,x,t,le);x.style.transform=`scale3d(1, 1, 1)`,ae.state=ke.FADING_IN,t.persistent||(this._mostRecentTransientRipple=ae);let et=null;return!le&&(w||r.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let mo=()=>{et&&(et.fallbackTimer=null),clearTimeout(uo),this._finishRippleTransition(ae)},pi=()=>this._destroyRipple(ae),uo=setTimeout(pi,w+100);x.addEventListener(`transitionend`,mo),x.addEventListener(`transitioncancel`,pi),et={onTransitionEnd:mo,onTransitionCancel:pi,fallbackTimer:uo}}),this._activeRipples.set(ae,et),(le||!w)&&this._finishRippleTransition(ae),ae}fadeOutRipple(i){if(i.state===ke.FADING_OUT||i.state===ke.HIDDEN)return;let e=i.element,t=m(m({},Zt),i.config.animation);e.style.transitionDuration=`${t.exitDuration}ms`,e.style.opacity=`0`,i.state=ke.FADING_OUT,(i._animationForciblyDisabledThroughCss||!t.exitDuration)&&this._finishRippleTransition(i)}fadeOutAll(){this._getActiveRipples().forEach(i=>i.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(i=>{i.config.persistent||i.fadeOut()})}setupTriggerEvents(i){let e=De(i);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,Hr.forEach(t=>{n._eventManager.addHandler(this._ngZone,t,e,this)}))}handleEvent(i){i.type===`mousedown`?this._onMousedown(i):i.type===`touchstart`?this._onTouchStart(i):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{Wr.forEach(e=>{this._triggerElement.addEventListener(e,this,jr)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(i){i.state===ke.FADING_IN?this._startFadeOutTransition(i):i.state===ke.FADING_OUT&&this._destroyRipple(i)}_startFadeOutTransition(i){let e=i===this._mostRecentTransientRipple,{persistent:t}=i.config;i.state=ke.VISIBLE,!t&&(!e||!this._isPointerDown)&&i.fadeOut()}_destroyRipple(i){let e=this._activeRipples.get(i)??null;this._activeRipples.delete(i),this._activeRipples.size||(this._containerRect=null),i===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),i.state=ke.HIDDEN,e!==null&&(i.element.removeEventListener(`transitionend`,e.onTransitionEnd),i.element.removeEventListener(`transitioncancel`,e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),i.element.remove()}_onMousedown(i){let e=Bt(i),t=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+Qs;!this._target.rippleDisabled&&!e&&!t&&(this._isPointerDown=!0,this.fadeInRipple(i.clientX,i.clientY,this._target.rippleConfig))}_onTouchStart(i){if(!this._target.rippleDisabled&&!Vt(i)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=i.changedTouches;if(e)for(let t=0;t<e.length;t++)this.fadeInRipple(e[t].clientX,e[t].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(i=>{let e=i.state===ke.VISIBLE||i.config.terminateOnPointerUp&&i.state===ke.FADING_IN;!i.config.persistent&&e&&i.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let i=this._triggerElement;i&&(Hr.forEach(e=>n._eventManager.removeHandler(e,i,this)),this._pointerUpEventsRegistered&&(Wr.forEach(e=>i.removeEventListener(e,this,jr)),this._pointerUpEventsRegistered=!1))}};function el(n,i,e){let t=Math.max(Math.abs(n-e.left),Math.abs(n-e.right)),o=Math.max(Math.abs(i-e.top),Math.abs(i-e.bottom));return Math.sqrt(t*t+o*o)}var ji=new y(`mat-ripple-global-options`);var Ur=(()=>{class n{_elementRef=p(et);_animationsDisabled=_e();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=p(Ie),t=p(q),o=p(ji,{optional:!0}),r=p(Oe);this._globalOptions=o||{},this._rippleRenderer=new Qt(this,e,this._elementRef,t,r)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:m(m(m({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,t=0,o){return typeof e==`number`?this._rippleRenderer.fadeInRipple(e,t,m(m({},this.rippleConfig),o)):this._rippleRenderer.fadeInRipple(0,0,m(m({},this.rippleConfig),e))}static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[``,`mat-ripple`,``],[``,`matRipple`,``]],hostAttrs:[1,`mat-ripple`],hostVars:2,hostBindings:function(t,o){t&2&&Qt$1(`mat-ripple-unbounded`,o.unbounded)},inputs:{color:[0,`matRippleColor`,`color`],unbounded:[0,`matRippleUnbounded`,`unbounded`],centered:[0,`matRippleCentered`,`centered`],radius:[0,`matRippleRadius`,`radius`],animation:[0,`matRippleAnimation`,`animation`],disabled:[0,`matRippleDisabled`,`disabled`],trigger:[0,`matRippleTrigger`,`trigger`]},exportAs:[`matRipple`]})}return n})();var tl={capture:!0};var nl=[`focus`,`mousedown`,`mouseenter`,`touchstart`];var Hi=`mat-ripple-loader-uninitialized`;var Wi=`mat-ripple-loader-class-name`;var Gr=`mat-ripple-loader-centered`;var Wn=`mat-ripple-loader-disabled`;var Yr=(()=>{class n{_document=p(de);_animationsDisabled=_e();_globalRippleOptions=p(ji,{optional:!0});_platform=p(q);_ngZone=p(Ie);_injector=p(Oe);_eventCleanups;_hosts=new Map;constructor(){let e=p(Sr$1).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>nl.map(t=>e.listen(this._document,t,this._onInteraction,tl)))}ngOnDestroy(){let e=this._hosts.keys();for(let t of e)this.destroyRipple(t);this._eventCleanups.forEach(t=>t())}configureRipple(e,t){e.setAttribute(Hi,this._globalRippleOptions?.namespace??``),(t.className||!e.hasAttribute(Wi))&&e.setAttribute(Wi,t.className||``),t.centered&&e.setAttribute(Gr,``),t.disabled&&e.setAttribute(Wn,``)}setDisabled(e,t){let o=this._hosts.get(e);o?(o.target.rippleDisabled=t,!t&&!o.hasSetUpEvents&&(o.hasSetUpEvents=!0,o.renderer.setupTriggerEvents(e))):t?e.setAttribute(Wn,``):e.removeAttribute(Wn)}_onInteraction=e=>{let t=pe(e);if(t instanceof HTMLElement){let o=t.closest(`[${Hi}="${this._globalRippleOptions?.namespace??``}"]`);o&&this._createRipple(o)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(`.mat-ripple`)?.remove();let t=this._document.createElement(`span`);t.classList.add(`mat-ripple`,e.getAttribute(Wi)),e.append(t);let o=this._globalRippleOptions,r=this._animationsDisabled?0:o?.animation?.enterDuration??Zt.enterDuration,a=this._animationsDisabled?0:o?.animation?.exitDuration??Zt.exitDuration,m={rippleDisabled:this._animationsDisabled||o?.disabled||e.hasAttribute(Wn),rippleConfig:{centered:e.hasAttribute(Gr),terminateOnPointerUp:o?.terminateOnPointerUp,animation:{enterDuration:r,exitDuration:a}}},b=new Qt(m,this._ngZone,t,this._platform,this._injector),w=!m.rippleDisabled;w&&b.setupTriggerEvents(e),this._hosts.set(e,{target:m,renderer:b,hasSetUpEvents:w}),e.removeAttribute(Hi)}destroyRipple(e){let t=this._hosts.get(e);t&&(t.renderer._removeTriggerEvents(),this._hosts.delete(e))}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var Un=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`structural-styles`]],decls:0,vars:0,template:function(t,o){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--%NS%mat-focus-indicator-display, none);
  border-width: var(--%NS%mat-focus-indicator-border-width, 3px);
  border-style: var(--%NS%mat-focus-indicator-border-style, solid);
  border-color: var(--%NS%mat-focus-indicator-border-color, transparent);
  border-radius: var(--%NS%mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --%NS%mat-focus-indicator-display: block;
    --%NS%mat-focus-indicator-fallback-border-style: none;
  }
}
`],encapsulation:2})}return n})();var il=[`*`,[[``,`progressIndicator`,``]]];var ol=[`*`,`[progressIndicator]`];function rl(n,i){n&1&&(Et$1(0,`div`,1),is$1(1,1),bt$1())}var al=new y(`MAT_BUTTON_CONFIG`);function Kr(n){return n==null?void 0:ez(n)}var qr=(()=>{class n{_elementRef=p(et);_ngZone=p(Ie);_animationsDisabled=_e();_config=p(al,{optional:!0});_focusMonitor=p(Ut);_cleanupClick;_renderer=p(mt);_rippleLoader=p(Yr);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}showProgress=B(!1,{transform:xr$1});constructor(){p(xe).load(Un);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName===`A`,this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:`mat-mdc-button-ripple`})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e=`program`,t){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,t):this._elementRef.nativeElement.focus(t)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,`click`,e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,hostAttrs:[1,`mat-mdc-button-base`],hostVars:15,hostBindings:function(t,o){t&2&&(nt$1(`disabled`,o._getDisabledAttribute())(`aria-disabled`,o._getAriaDisabled())(`tabindex`,o._getTabIndex()),ss(o.color?`mat-`+o.color:``),Qt$1(`mat-mdc-button-progress-indicator-shown`,o.showProgress())(`mat-mdc-button-disabled`,o.disabled)(`mat-mdc-button-disabled-interactive`,o.disabledInteractive)(`mat-unthemed`,!o.color)(`_mat-animation-noopable`,o._animationsDisabled))},inputs:{color:`color`,disableRipple:[2,`disableRipple`,`disableRipple`,xr$1],disabled:[2,`disabled`,`disabled`,xr$1],ariaDisabled:[2,`aria-disabled`,`ariaDisabled`,xr$1],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,xr$1],tabIndex:[2,`tabIndex`,`tabIndex`,Kr],_tabindex:[2,`tabindex`,`_tabindex`,Kr],showProgress:[1,`showProgress`]}})}return n})();var Ui=(()=>{class n extends qr{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`button`,`mat-icon-button`,``],[`a`,`mat-icon-button`,``],[`button`,`matIconButton`,``],[`a`,`matIconButton`,``]],hostAttrs:[1,`mdc-icon-button`,`mat-mdc-icon-button`],exportAs:[`matButton`,`matAnchor`],features:[tt$1],ngContentSelectors:ol,decls:5,vars:1,consts:[[1,`mat-mdc-button-persistent-ripple`,`mdc-icon-button__ripple`],[1,`mat-mdc-button-progress-indicator-container`],[1,`mat-focus-indicator`],[1,`mat-mdc-button-touch-target`]],template:function(t,o){t&1&&(os$1(il),Ro(0,`span`,0),is$1(1),ze(2,rl,2,0,`div`,1),Ro(3,`span`,2)(4,`span`,3)),t&2&&(Z(2),Ge$1(o.showProgress()?2:-1))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--%NS%mat-icon-button-state-layer-size, 40px);
  height: var(--%NS%mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--%NS%mat-icon-button-state-layer-size, 40px) - var(--%NS%mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--%NS%mat-icon-button-icon-size, 24px);
  color: var(--%NS%mat-icon-button-icon-color, var(--%NS%mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--%NS%mat-icon-button-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface-variant) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-icon-button-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-icon-button-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-icon-button-touch-target-size, 48px);
  display: var(--%NS%mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--%NS%mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--%NS%mat-icon-button-icon-size, 24px);
  height: var(--%NS%mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {
  width: inherit;
  height: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {
  height: 100%;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})}return n})();var Gn=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({imports:[oe]})}return n})();var Xr=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({imports:[Gn,oe]})}return n})();var Ct=class n{label=B(``);placeholder=B(``);appearance=B(`outline`);inputId=B(``);prefixIcon=B(void 0);suffixIcon=B(void 0);hint=B(``);errorMessage=B(``);clearable=B(!1);required=B(!1);readonly=B(!1);disabled=B(!1);autocomplete=B(`off`);value=rD(``);touch=Ar$1();onInputChange(i){let e=i.target;this.value.set(e.value)}onBlur(){this.touch.emit()}clearValue(i){i&&i.stopPropagation(),this.value.set(``)}static ɵfac=function(e){return new(e||n)};static ɵdir=ve({type:n,inputs:{label:[1,`label`],placeholder:[1,`placeholder`],appearance:[1,`appearance`],inputId:[1,`inputId`],prefixIcon:[1,`prefixIcon`],suffixIcon:[1,`suffixIcon`],hint:[1,`hint`],errorMessage:[1,`errorMessage`],clearable:[1,`clearable`],required:[1,`required`],readonly:[1,`readonly`],disabled:[1,`disabled`],autocomplete:[1,`autocomplete`],value:[1,`value`]},outputs:{value:`valueChange`,touch:`touch`}})};function ll(n,i){if(n&1&&(ne(0,`mat-label`),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.label())}}function dl(n,i){if(n&1&&(ne(0,`mat-icon`,1),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.prefixIcon())}}function cl(n,i){if(n&1){let e=zn$1();ne(0,`button`,6),Te(`click`,function(o){At(e);return Rt(Ne().clearValue(o))}),ne(1,`mat-icon`),Me(2,`close`),re$1()()}}function ml(n,i){if(n&1){let e=zn$1();ne(0,`button`,7),Te(`click`,function(o){At(e);return Rt(Ne().togglePasswordVisibility(o))}),ne(1,`mat-icon`),Me(2),re$1()()}if(n&2){let e=Ne();Z(2),Kt$1(e.showPassword()?`visibility_off`:`visibility`)}}function ul(n,i){if(n&1&&(ne(0,`mat-icon`,5),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.suffixIcon())}}function pl(n,i){if(n&1&&(ne(0,`mat-hint`),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.hint())}}function fl(n,i){if(n&1&&(ne(0,`mat-error`),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.errorMessage())}}var $r=class n extends Ct{type=B(`text`);min=B(void 0);max=B(void 0);step=B(void 0);showPassword=V(!1);actualType(){return this.type()===`password`?this.showPassword()?`text`:`password`:this.type()}onInputChange(i){let e=i.target,t=this.type()===`number`&&e.value!==``?e.valueAsNumber:e.value;this.value.set(t)}togglePasswordVisibility(i){i.stopPropagation(),this.showPassword.update(e=>!e)}static ɵfac=(()=>{let i;return function(t){return(i||(i=Mo(n)))(t||n)}})();static ɵcmp=Ee({type:n,selectors:[[`app-input`]],hostAttrs:[1,`d-block`,`w-full`],inputs:{type:[1,`type`],min:[1,`min`],max:[1,`max`],step:[1,`step`]},features:[tt$1],decls:9,vars:23,consts:[[1,`w-full`,3,`appearance`],[`matPrefix`,``,1,`mr-2`,`text-muted`],[`matInput`,``,3,`input`,`blur`,`id`,`type`,`placeholder`,`disabled`,`readonly`,`required`,`min`,`max`,`step`,`autocomplete`,`value`],[`mat-icon-button`,``,`matSuffix`,``,`type`,`button`,`aria-label`,`Clear value`,1,`text-muted`,`hover-primary`],[`mat-icon-button`,``,`matSuffix`,``,`type`,`button`,`aria-label`,`Toggle password visibility`,1,`text-muted`,`hover-primary`],[`matSuffix`,``,1,`ml-2`,`text-muted`],[`mat-icon-button`,``,`matSuffix`,``,`type`,`button`,`aria-label`,`Clear value`,1,`text-muted`,`hover-primary`,3,`click`],[`mat-icon-button`,``,`matSuffix`,``,`type`,`button`,`aria-label`,`Toggle password visibility`,1,`text-muted`,`hover-primary`,3,`click`]],template:function(e,t){e&1&&(ne(0,`mat-form-field`,0),ze(1,ll,2,1,`mat-label`),ze(2,dl,2,1,`mat-icon`,1),ne(3,`input`,2),Te(`input`,function(r){return t.onInputChange(r)})(`blur`,function(){return t.onBlur()}),re$1(),ze(4,cl,3,0,`button`,3),ze(5,ml,3,1,`button`,4),ze(6,ul,2,1,`mat-icon`,5),ze(7,pl,2,1,`mat-hint`),ze(8,fl,2,1,`mat-error`),re$1()),e&2&&(Qt$1(`has-prefix`,t.prefixIcon())(`has-suffix`,t.suffixIcon()||t.type()===`password`||t.clearable()),Dt$1(`appearance`,t.appearance()),Z(),Ge$1(t.label()?1:-1),Z(),Ge$1(t.prefixIcon()?2:-1),Z(),Dt$1(`id`,t.inputId())(`type`,t.actualType())(`placeholder`,t.placeholder())(`disabled`,t.disabled())(`readonly`,t.readonly())(`required`,t.required())(`min`,t.min())(`max`,t.max())(`step`,t.step())(`autocomplete`,t.autocomplete())(`value`,t.value()),Z(),Ge$1(t.clearable()&&t.value()&&!t.disabled()?4:-1),Z(),Ge$1(t.type()===`password`?5:-1),Z(),Ge$1(t.suffixIcon()&&t.type()!==`password`?6:-1),Z(),Ge$1(t.hint()?7:-1),Z(),Ge$1(t.errorMessage()?8:-1))},dependencies:[je,Ue,yt,ot,rt,Yt,Kt,qt,Or,Ir,Hn,jn,Xr,Ui],encapsulation:2})};var hl=[`*`];function gl(n,i){if(n&1&&rt$1(0,`app-icon`,1),n&2){let e=Ne();Dt$1(`name`,e.icon())(`size`,e.size()===`sm`?`sm`:`base`)}}function bl(n,i){if(n&1&&rt$1(0,`app-icon`,1),n&2){let e=Ne();Dt$1(`name`,e.icon())(`size`,e.size()===`sm`?`sm`:`base`)}}function _l(n,i){if(n&1&&rt$1(0,`app-icon`,2),n&2){let e=Ne();Dt$1(`spin`,!0)(`size`,e.size()===`sm`?`sm`:`base`)}}var Yn=class n{variant=B(`primary`);size=B(`md`);type=B(`button`);fullWidth=B(!1);disabled=B(!1);loading=B(!1);icon=B(void 0);iconPosition=B(`end`);clicked=Ar$1();handleClick(i){!this.disabled()&&!this.loading()&&this.clicked.emit(i)}static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-button`]],hostVars:6,hostBindings:function(e,t){e&2&&Qt$1(`w-full`,t.fullWidth())(`d-block`,t.fullWidth())(`d-inline-block`,!t.fullWidth())},inputs:{variant:[1,`variant`],size:[1,`size`],type:[1,`type`],fullWidth:[1,`fullWidth`],disabled:[1,`disabled`],loading:[1,`loading`],icon:[1,`icon`],iconPosition:[1,`iconPosition`]},outputs:{clicked:`clicked`},ngContentSelectors:hl,decls:5,vars:53,consts:[[1,`flex`,`items-center`,`justify-center`,`gap-2`,`rounded-xl`,`font-sans`,`font-semibold`,`cursor-pointer`,`border-0`,3,`click`,`type`,`disabled`],[3,`name`,`size`],[`name`,`progress_activity`,3,`spin`,`size`]],template:function(e,t){e&1&&(os$1(),ne(0,`button`,0),Te(`click`,function(r){return t.handleClick(r)}),ze(1,gl,1,2,`app-icon`,1),is$1(2),ze(3,bl,1,2,`app-icon`,1),ze(4,_l,1,2,`app-icon`,2),re$1()),e&2&&(Qt$1(`w-full`,t.fullWidth())(`py-2`,t.size()===`sm`)(`px-3`,t.size()===`sm`)(`text-xs`,t.size()===`sm`)(`py-3`,t.size()===`md`)(`px-4`,t.size()===`md`)(`text-sm`,t.size()===`md`)(`py-4`,t.size()===`lg`)(`px-6`,t.size()===`lg`)(`text-base`,t.size()===`lg`)(`bg-primary-container`,t.variant()===`primary`)(`text-on-primary-container`,t.variant()===`primary`)(`hover-opacity-95`,t.variant()===`primary`)(`bg-secondary`,t.variant()===`secondary`)(`text-on-secondary`,t.variant()===`secondary`)(`text-on-surface`,t.variant()===`surface`||t.variant()===`outline`||t.variant()===`ghost`)(`bg-surface-container-high`,t.variant()===`surface`)(`hover-bg-surface-bright`,t.variant()===`surface`)(`border`,t.variant()===`outline`)(`border-outline-variant`,t.variant()===`outline`)(`bg-transparent`,t.variant()===`outline`)(`bg-surface`,t.variant()===`ghost`)(`opacity-50`,t.disabled()||t.loading())(`cursor-not-allowed`,t.disabled()||t.loading()),Dt$1(`type`,t.type())(`disabled`,t.disabled()||t.loading()),Z(),Ge$1(t.icon()&&t.iconPosition()===`start`&&!t.loading()?1:-1),Z(2),Ge$1(t.icon()&&t.iconPosition()===`end`&&!t.loading()?3:-1),Z(),Ge$1(t.loading()?4:-1))},dependencies:[je,Zn$1],encapsulation:2})};function vl(n,i){if(n&1&&(Et$1(0,`span`,2),Me(1),bt$1(),Ro(2,`div`,1)),n&2){let e=Ne();Z(),Kt$1(e.label())}}var Zr=class n{label=B(``);static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-divider`]],hostAttrs:[1,`d-block`,`w-full`],inputs:{label:[1,`label`]},decls:3,vars:1,consts:[[1,`flex`,`items-center`,`my-4`,`w-full`],[1,`flex-1`,`bg-surface-container-highest`,2,`height`,`0.0625rem`],[1,`px-4`,`font-mono`,`text-xs`,`text-outline`,`uppercase`,`tracking-wider`,`whitespace-nowrap`]],template:function(e,t){e&1&&(Et$1(0,`div`,0),Ro(1,`div`,1),ze(2,vl,3,1),bt$1()),e&2&&(Z(2),Ge$1(t.label()?2:-1))},dependencies:[je],styles:[`[_nghost-%COMP%]{display:block;width:100%}`]})};function yl(n,i){if(n&1&&rt$1(0,`span`,4),n&2){let e=Ne();Qt$1(`bg-secondary`,e.variant()===`secondary`)(`bg-primary`,e.variant()===`primary`)(`bg-tertiary`,e.variant()===`tertiary`)(`bg-error`,e.variant()===`error`)}}function xl(n,i){if(n&1&&rt$1(0,`app-icon`,2),n&2)Dt$1(`name`,Ne().icon())}var St=class n{label=B(``);variant=B(`secondary`);pulse=B(!1);icon=B(void 0);shape=B(`pill`);size=B(`md`);static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-badge`]],hostAttrs:[1,`d-inline-flex`],inputs:{label:[1,`label`],variant:[1,`variant`],pulse:[1,`pulse`],icon:[1,`icon`],shape:[1,`shape`],size:[1,`size`]},decls:5,vars:49,consts:[[1,`d-inline-flex`,`items-center`,`border`],[1,`d-inline-block`,`rounded-full`,2,`width`,`0.5rem`,`height`,`0.5rem`,3,`bg-secondary`,`bg-primary`,`bg-tertiary`,`bg-error`],[`size`,`xs`,3,`name`],[1,`font-mono`,`tracking-wider`],[1,`d-inline-block`,`rounded-full`,2,`width`,`0.5rem`,`height`,`0.5rem`]],template:function(e,t){e&1&&(ne(0,`div`,0),ze(1,yl,1,8,`span`,1),ze(2,xl,1,1,`app-icon`,2),ne(3,`span`,3),Me(4),re$1()()),e&2&&(Qt$1(`gap-2`,t.size()===`md`)(`px-3`,t.size()===`md`)(`py-1`,t.size()===`md`)(`gap-1`,t.size()===`sm`)(`px-2`,t.size()===`sm`)(`rounded-full`,t.shape()===`pill`)(`rounded-xs`,t.shape()===`square`)(`bg-surface-container-high`,t.shape()===`pill`)(`border-surface-highest`,t.shape()===`pill`)(`badge-tinted`,t.shape()===`square`)(`badge-secondary`,t.variant()===`secondary`)(`badge-primary`,t.variant()===`primary`)(`badge-tertiary`,t.variant()===`tertiary`)(`badge-error`,t.variant()===`error`)(`badge-surface`,t.variant()===`surface`),Z(),Ge$1(t.pulse()?1:-1),Z(),Ge$1(t.icon()?2:-1),Z(),Qt$1(`text-xs`,t.size()===`md`)(`text-2xs`,t.size()===`sm`)(`font-bold`,t.shape()===`square`)(`text-secondary`,t.variant()===`secondary`)(`text-primary`,t.variant()===`primary`)(`text-tertiary`,t.variant()===`tertiary`)(`text-error`,t.variant()===`error`)(`text-on-surface`,t.variant()===`surface`),Z(),yn(` `,t.label(),` `))},dependencies:[je,Zn$1],styles:[`[_nghost-%COMP%]{display:inline-flex}.badge-tinted[_ngcontent-%COMP%]{--%NS%badge-tint: var(--%NS%color-on-surface);background-color:color-mix(in srgb,var(--%NS%badge-tint) 14%,transparent);border-color:color-mix(in srgb,var(--%NS%badge-tint) 24%,transparent)}.badge-tinted.badge-secondary[_ngcontent-%COMP%]{--%NS%badge-tint: var(--%NS%color-secondary)}.badge-tinted.badge-primary[_ngcontent-%COMP%]{--%NS%badge-tint: var(--%NS%color-primary)}.badge-tinted.badge-tertiary[_ngcontent-%COMP%]{--%NS%badge-tint: var(--%NS%color-tertiary)}.badge-tinted.badge-error[_ngcontent-%COMP%]{--%NS%badge-tint: var(--%NS%color-error)}.badge-tinted.badge-surface[_ngcontent-%COMP%]{--%NS%badge-tint: var(--%NS%color-outline)}`]})};var Jt=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new K;bulk={select:i=>this._select(i),deselect:i=>this._deselect(i),setSelection:i=>this._setSelection(i)};constructor(i=!1,e,t=!0,o){this._multiple=i,this._emitChanges=t,this.compareWith=o,e&&e.length&&(i?e.forEach(r=>this._markSelected(r)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...i){return this._select(i)}deselect(...i){return this._deselect(i)}setSelection(...i){return this._setSelection(i)}toggle(i){return this.isSelected(i)?this.deselect(i):this.select(i)}clear(i=!0){this._unmarkAll();let e=this._hasQueuedChanges();return i&&this._emitChangeEvent(),e}isSelected(i){return this._selection.has(this._getConcreteValue(i))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(i){this._multiple&&this.selected&&this._selected.sort(i)}isMultipleSelection(){return this._multiple}_select(i){this._verifyValueAssignment(i),i.forEach(t=>this._markSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_deselect(i){this._verifyValueAssignment(i),i.forEach(t=>this._unmarkSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_setSelection(i){this._verifyValueAssignment(i);let e=this.selected,t=new Set(i.map(r=>this._getConcreteValue(r)));i.forEach(r=>this._markSelected(r)),e.filter(r=>!t.has(this._getConcreteValue(r,t))).forEach(r=>this._unmarkSelected(r));let o=this._hasQueuedChanges();return this._emitChangeEvent(),o}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(i){i=this._getConcreteValue(i),this.isSelected(i)||(this._multiple||this._unmarkAll(),this.isSelected(i)||this._selection.add(i),this._emitChanges&&this._selectedToEmit.push(i))}_unmarkSelected(i){i=this._getConcreteValue(i),this.isSelected(i)&&(this._selection.delete(i),this._emitChanges&&this._deselectedToEmit.push(i))}_unmarkAll(){this.isEmpty()||this._selection.forEach(i=>this._unmarkSelected(i))}_verifyValueAssignment(i){i.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(i,e){if(this.compareWith){e=e??this._selection;for(let t of e)if(this.compareWith(i,t))return t;return i}else return i}};var Qr=(()=>{class n{_listeners=[];notify(e,t){for(let o of this._listeners)o(e,t)}listen(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>e!==t)}}ngOnDestroy(){this._listeners=[]}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var Cl=20;var Gi=(()=>{class n{_ngZone=p(Ie);_platform=p(q);_renderer=p(Sr$1).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new K;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=Cl){return this._platform.isBrowser?new x(t=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen(`document`,`scroll`,()=>this._scrolled.next())));let o=e>0?this._scrolled.pipe(cC(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{o.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):E()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){let o=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe(Ye(r=>!r||o.indexOf(r)>-1))}getAncestorScrollContainers(e){let t=[];return this.scrollContainers.forEach((o,r)=>{this._targetContainsElement(r,e)&&t.push(r)}),t}_targetContainsElement(e,t){let o=De(t),r=e.getElementRef().nativeElement;do if(o==r)return!0;while(o=o.parentElement);return!1}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var Sl=20;var at=(()=>{class n{_platform=p(q);_listeners;_viewportSize=null;_change=new K;_document=p(de);constructor(){let e=p(Ie),t=p(Sr$1).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let o=r=>this._change.next(r);this._listeners=[t.listen(`window`,`resize`,o),t.listen(`window`,`orientationchange`,o)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:t,height:o}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+o,right:e.left+t,height:o,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,t=this._getWindow(),o=e.documentElement,r=o.getBoundingClientRect();return{top:-r.top||e.body?.scrollTop||t.scrollY||o.scrollTop||0,left:-r.left||e.body?.scrollLeft||t.scrollX||o.scrollLeft||0}}change(e=Sl){return e>0?this._change.pipe(cC(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var Kn=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({})}return n})();var Yi=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({imports:[oe,Kn,oe,Kn]})}return n})();var en=class{_attachedHost=null;attach(i){return this._attachedHost=i,i.attach(this)}detach(){let i=this._attachedHost;i!=null&&(this._attachedHost=null,i.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(i){this._attachedHost=i}};var wt=class extends en{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(i,e,t,o,r,a){super(),this.component=i,this.viewContainerRef=e,this.injector=t,this.projectableNodes=o,this.bindings=r||null,this.directives=a||null}};var st=class extends en{templateRef;viewContainerRef;context;injector;constructor(i,e,t,o){super(),this.templateRef=i,this.viewContainerRef=e,this.context=t,this.injector=o}get origin(){return this.templateRef.elementRef}attach(i,e=this.context){return this.context=e,super.attach(i)}detach(){return this.context=void 0,super.detach()}};var Ki=class extends en{element;constructor(i){super(),this.element=i instanceof et?i.nativeElement:i}};var Nt=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(i){if(i instanceof wt)return this._attachedPortal=i,this.attachComponentPortal(i);if(i instanceof st)return this._attachedPortal=i,this.attachTemplatePortal(i);if(this.attachDomPortal&&i instanceof Ki)return this._attachedPortal=i,this.attachDomPortal(i)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(i){this._disposeFn=i}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var qn=class extends Nt{outletElement;_appRef;_defaultInjector;constructor(i,e,t){super(),this.outletElement=i,this._appRef=e,this._defaultInjector=t}attachComponentPortal(i){let e;if(i.viewContainerRef){let t=i.injector||i.viewContainerRef.injector,o=t.get(Bn$1,null,{optional:!0})||void 0;e=i.viewContainerRef.createComponent(i.component,{index:i.viewContainerRef.length,injector:t,ngModuleRef:o,projectableNodes:i.projectableNodes||void 0,bindings:i.bindings||void 0,directives:i.directives||void 0}),this.setDisposeFn(()=>e.destroy())}else{let t=this._appRef,o=i.injector||this._defaultInjector||Oe.NULL,r=o.get(ue,t.injector);e=nz(i.component,{elementInjector:o,environmentInjector:r,projectableNodes:i.projectableNodes||void 0,bindings:i.bindings||void 0,directives:i.directives||void 0}),t.attachView(e.hostView),this.setDisposeFn(()=>{t.viewCount>0&&t.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=i,e}attachTemplatePortal(i){let e=i.viewContainerRef,t=e.createEmbeddedView(i.templateRef,i.context,{injector:i.injector});return t.rootNodes.forEach(o=>this.outletElement.appendChild(o)),t.detectChanges(),this.setDisposeFn(()=>{let o=e.indexOf(t);o!==-1&&e.remove(o)}),this._attachedPortal=i,t}attachDomPortal=i=>{let e=i.element;e.parentNode;let t=this.outletElement.ownerDocument.createComment(`dom-portal`);e.parentNode.insertBefore(t,e),this.outletElement.appendChild(e),this._attachedPortal=i,super.setDisposeFn(()=>{t.parentNode&&t.parentNode.replaceChild(e,t)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(i){return i.hostView.rootNodes[0]}};var tn=(()=>{class n extends Nt{_moduleRef=p(Bn$1,{optional:!0});_document=p(de);_viewContainerRef=p(vn);_isInitialized=!1;_attachedRef=null;get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new ge;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let t=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,o=t.createComponent(e.component,{index:t.length,injector:e.injector||t.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0,directives:e.directives||void 0});return t!==this._viewContainerRef&&this._getRootNode().appendChild(o.hostView.rootNodes[0]),super.setDisposeFn(()=>o.destroy()),this._attachedPortal=e,this._attachedRef=o,this.attached.emit(o),o}attachTemplatePortal(e){e.setAttachedHost(this);let t=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=t,this.attached.emit(t),t}attachDomPortal=e=>{let t=e.element;t.parentNode;let o=this._document.createComment(`dom-portal`);e.setAttachedHost(this),t.parentNode.insertBefore(o,t),this._getRootNode().appendChild(t),this._attachedPortal=e,super.setDisposeFn(()=>{o.parentNode&&o.parentNode.replaceChild(t,o)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static ɵfac=(()=>{let e;return function(o){return(e||(e=Mo(n)))(o||n)}})();static ɵdir=ve({type:n,selectors:[[``,`cdkPortalOutlet`,``]],inputs:{portal:[0,`cdkPortalOutlet`,`portal`]},outputs:{attached:`attached`},exportAs:[`cdkPortalOutlet`],features:[tt$1]})}return n})();var Xn=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({})}return n})();var Jr=dr();function Dt(n){return new $n(n.get(at),n.get(de))}var $n=class{_viewportRuler;_previousHTMLStyles={top:``,left:``};_previousScrollPosition;_isEnabled=!1;_document;constructor(i,e){this._viewportRuler=i,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let i=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=i.style.left||``,this._previousHTMLStyles.top=i.style.top||``,i.style.left=re(-this._previousScrollPosition.left),i.style.top=re(-this._previousScrollPosition.top),i.classList.add(`cdk-global-scrollblock`),this._isEnabled=!0}}disable(){if(this._isEnabled){let i=this._document.documentElement,e=this._document.body,t=i.style,o=e.style,r=t.scrollBehavior||``,a=o.scrollBehavior||``;this._isEnabled=!1,t.left=this._previousHTMLStyles.left,t.top=this._previousHTMLStyles.top,i.classList.remove(`cdk-global-scrollblock`),Jr&&(t.scrollBehavior=o.scrollBehavior=`auto`),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),Jr&&(t.scrollBehavior=r,o.scrollBehavior=a)}}_canBeEnabled(){if(this._document.documentElement.classList.contains(`cdk-global-scrollblock`)||this._isEnabled)return!1;let e=this._document.documentElement,t=this._viewportRuler.getViewportSize();return e.scrollHeight>t.height||e.scrollWidth>t.width}};function aa(n,i){return new Zn(n.get(Gi),n.get(Ie),n.get(at),i)}var Zn=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(i,e,t,o){this._scrollDispatcher=i,this._ngZone=e,this._viewportRuler=t,this._config=o}attach(i){this._overlayRef,this._overlayRef=i}enable(){if(this._scrollSubscription)return;let i=this._scrollDispatcher.scrolled(0).pipe(Ye(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=i.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=i.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var nn=class{enable(){}disable(){}attach(){}};function Xi(n,i){return i.some(e=>{let t=n.bottom<e.top,o=n.top>e.bottom,r=n.right<e.left,a=n.left>e.right;return t||o||r||a})}function ea(n,i){return i.some(e=>{let t=n.top<e.top,o=n.bottom>e.bottom,r=n.left<e.left,a=n.right>e.right;return t||o||r||a})}function rn(n,i){return new Qn(n.get(Gi),n.get(at),n.get(Ie),i)}var Qn=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(i,e,t,o){this._scrollDispatcher=i,this._viewportRuler=e,this._ngZone=t,this._config=o}attach(i){this._overlayRef,this._overlayRef=i}enable(){if(!this._scrollSubscription){let i=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(i).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:t,height:o}=this._viewportRuler.getViewportSize();Xi(e,[{width:t,height:o,bottom:o,right:t,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}};var sa=(()=>{class n{_injector=p(Oe);noop=()=>new nn;close=e=>aa(this._injector,e);block=()=>Dt(this._injector);reposition=e=>rn(this._injector,e);static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var dt=class{positionStrategy;scrollStrategy=new nn;panelClass=``;hasBackdrop=!1;backdropClass=`cdk-overlay-dark-backdrop`;disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(i){if(i){let e=Object.keys(i);for(let t of e)i[t]!==void 0&&(this[t]=i[t])}}};var Jn=class{connectionPair;scrollableViewProperties;constructor(i,e){this.connectionPair=i,this.scrollableViewProperties=e}};var la=(()=>{class n{_attachedOverlays=[];_document=p(de);_isAttached=!1;ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let t=this._attachedOverlays.indexOf(e);t>-1&&this._attachedOverlays.splice(t,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,t,o){return o.observers.length<1?!1:e.eventPredicate?e.eventPredicate(t):!0}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var da=(()=>{class n extends la{_ngZone=p(Ie);_renderer=p(Sr$1).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen(`body`,`keydown`,this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let t=this._attachedOverlays;for(let o=t.length-1;o>-1;o--){let r=t[o];if(this.canReceiveEvent(r,e,r._keydownEvents)){this._ngZone.run(()=>r._keydownEvents.next(e));break}}};static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var ca=(()=>{class n extends la{_platform=p(q);_ngZone=p(Ie);_renderer=p(Sr$1).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let t=this._document.body,o={capture:!0},r=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[r.listen(t,`pointerdown`,this._pointerDownListener,o),r.listen(t,`click`,this._clickListener,o),r.listen(t,`auxclick`,this._clickListener,o),r.listen(t,`contextmenu`,this._clickListener,o)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=t.style.cursor,t.style.cursor=`pointer`,this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=pe(e)};_clickListener=e=>{let t=pe(e),o=e.type===`click`&&this._pointerDownEventTarget?this._pointerDownEventTarget:t;this._pointerDownEventTarget=null;let r=this._attachedOverlays.slice();for(let a=r.length-1;a>-1;a--){let m=r[a],b=m._outsidePointerEvents;if(!(!m.hasAttached()||!this.canReceiveEvent(m,e,b))){if(ta(m.overlayElement,t)||ta(m.overlayElement,o))break;this._ngZone?this._ngZone.run(()=>b.next(e)):b.next(e)}}};static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();function ta(n,i){let e=typeof ShadowRoot<`u`&&ShadowRoot,t=i;for(;t;){if(t===n)return!0;t=e&&t instanceof ShadowRoot?t.host:t.parentNode}return!1}var ma=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`ng-component`]],hostAttrs:[`cdk-overlay-style-loader`,``],decls:0,vars:0,template:function(t,o){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2})}return n})();var ni=(()=>{class n{_platform=p(q);_containerElement;_document=p(de);_styleLoader=p(xe);ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e=`cdk-overlay-container`;if(this._platform.isBrowser||Pi()){let o=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let r=0;r<o.length;r++)o[r].remove()}let t=this._document.createElement(`div`);t.classList.add(e),Pi()?t.setAttribute(`platform`,`test`):this._platform.isBrowser||t.setAttribute(`platform`,`server`),this._document.body.appendChild(t),this._containerElement=t}_loadStyles(){this._styleLoader.load(ma)}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var $i=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(i,e,t,o){this._renderer=e,this._ngZone=t,this.element=i.createElement(`div`),this.element.classList.add(`cdk-overlay-backdrop`),this._cleanupClick=e.listen(this.element,`click`,o)}detach(){this._ngZone.runOutsideAngular(()=>{let i=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(i,`transitionend`,this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),i.style.pointerEvents=`none`,i.classList.remove(`cdk-overlay-backdrop-showing`)})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Zi(n){return n&&n.nodeType===1}var qi=new Set;var Et=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new K;_attachments=new K;_detachments=new K;_positionStrategy;_scrollStrategy;_locationChanges=ce.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new K;_outsidePointerEvents=new K;_afterNextRenderRef;constructor(i,e,t,o,r,a,m,b,w,x=!1,L,ce){this._portalOutlet=i,this._host=e,this._pane=t,this._config=o,this._ngZone=r,this._keyboardDispatcher=a,this._document=m,this._location=b,this._outsideClickDispatcher=w,this._animationsDisabled=x,this._injector=L,this._renderer=ce,o.scrollStrategy&&(this._scrollStrategy=o.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=o.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(i){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(i);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),qi.add(this),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=yc$1(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy==`function`&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let i=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),qi.delete(this),i}dispose(){if(this._disposed)return;let i=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,i&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0,qi.delete(this)}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(i){i!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=i,this.hasAttached()&&(i.attach(this),this.updatePosition()))}updateSize(i){this._config=m(m({},this._config),i),this._updateElementSize()}setDirection(i){this._config=A(m({},this._config),{direction:i}),this._updateElementDirection()}addPanelClass(i){this._pane&&this._toggleClasses(this._pane,i,!0)}removePanelClass(i){this._pane&&this._toggleClasses(this._pane,i,!1)}getDirection(){let i=this._config.direction;return i?typeof i==`string`?i:i.value:`ltr`}updateScrollStrategy(i){i!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=i,this.hasAttached()&&(i.attach(this),i.enable()))}_updateElementDirection(){this._host.setAttribute(`dir`,this.getDirection())}_updateElementSize(){if(!this._pane)return;let i=this._pane.style;i.width=re(this._config.width),i.height=re(this._config.height),i.minWidth=re(this._config.minWidth),i.minHeight=re(this._config.minHeight),i.maxWidth=re(this._config.maxWidth),i.maxHeight=re(this._config.maxHeight)}_togglePointerEvents(i){this._pane.style.pointerEvents=i?``:`none`}_attachHost(){if(!this._host.parentElement){let i=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Zi(i)?i.after(this._host):i?.type===`parent`?i.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let i=`cdk-overlay-backdrop-showing`;this._backdropRef?.dispose(),this._backdropRef=new $i(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add(`cdk-overlay-backdrop-noop-animation`),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<`u`?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(i))}):this._backdropRef.element.classList.add(i)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(i,e,t){let o=Di(e||[]).filter(r=>!!r);o.length&&(t?i.classList.add(...o):i.classList.remove(...o))}_detachContentWhenEmpty(){let i=!1;try{this._detachContentAfterRenderRef=yc$1(()=>{i=!0,this._detachContent()},{injector:this._injector})}catch(e){if(i)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let i=this._scrollStrategy;i?.disable(),i?.detach?.()}};var na=`cdk-overlay-connected-position-bounding-box`;var wl=/([A-Za-z%]+)$/;function Qi(n,i){return new ei(i,n.get(at),n.get(de),n.get(q),n.get(ni))}var ei=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new K;_resizeSubscription=ce.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation=`global`;positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(i,e,t,o,r){this._viewportRuler=e,this._document=t,this._platform=o,this._overlayContainer=r,this.setOrigin(i)}attach(i){this._overlayRef&&this._overlayRef,this._validatePositions(),i.hostElement.classList.add(na),this._overlayRef=i,this._boundingBox=i.hostElement,this._pane=i.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let i=this._originRect,e=this._overlayRect,t=this._viewportRect,o=this._containerRect,r=[],a;for(let m of this._preferredPositions){let b=this._getOriginPoint(i,o,m),w=this._getOverlayPoint(b,e,m),x=this._getOverlayFit(w,e,t,m);if(x.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(m,b);return}if(this._canFitWithFlexibleDimensions(x,w,t)){r.push({position:m,origin:b,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(b,m)});continue}(!a||a.overlayFit.visibleArea<x.visibleArea)&&(a={overlayFit:x,overlayPoint:w,originPoint:b,position:m,overlayRect:e})}if(r.length){let m=null,b=-1;for(let w of r){let x=w.boundingBoxRect.width*w.boundingBoxRect.height*(w.position.weight||1);x>b&&(b=x,m=w)}this._isPushed=!1,this._applyPosition(m.position,m.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(a.position,a.originPoint);return}this._applyPosition(a.position,a.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&lt(this._boundingBox.style,{top:``,left:``,right:``,bottom:``,height:``,width:``,alignItems:``,justifyContent:``}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(na),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let i=this._lastPosition;i?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(i,this._getOriginPoint(this._originRect,this._containerRect,i))):this.apply()}withScrollableContainers(i){return this._scrollables=i,this}withPositions(i){return this._preferredPositions=i,i.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(i){return this._viewportMargin=i,this}withFlexibleDimensions(i=!0){return this._hasFlexibleDimensions=i,this}withGrowAfterOpen(i=!0){return this._growAfterOpen=i,this}withPush(i=!0){return this._canPush=i,this}withLockedPosition(i=!0){return this._positionLocked=i,this}setOrigin(i){return this._origin=i,this}withDefaultOffsetX(i){return this._offsetX=i,this}withDefaultOffsetY(i){return this._offsetY=i,this}withTransformOriginOn(i){return this._transformOriginSelector=i,this}withPopoverLocation(i){return this._popoverLocation=i,this}getPopoverInsertionPoint(){return this._popoverLocation===`global`?null:this._popoverLocation!==`inline`?this._popoverLocation:this._origin instanceof et?this._origin.nativeElement:Zi(this._origin)?this._origin:null}_getOriginPoint(i,e,t){let o;if(t.originX==`center`)o=i.left+i.width/2;else{let a=this._isRtl()?i.right:i.left,m=this._isRtl()?i.left:i.right;o=t.originX==`start`?a:m}e.left<0&&(o-=e.left);let r;return t.originY==`center`?r=i.top+i.height/2:r=t.originY==`top`?i.top:i.bottom,e.top<0&&(r-=e.top),{x:o,y:r}}_getOverlayPoint(i,e,t){let o;t.overlayX==`center`?o=-e.width/2:t.overlayX===`start`?o=this._isRtl()?-e.width:0:o=this._isRtl()?0:-e.width;let r;return t.overlayY==`center`?r=-e.height/2:r=t.overlayY==`top`?0:-e.height,{x:i.x+o,y:i.y+r}}_getOverlayFit(i,e,t,o){let r=oa(e),{x:a,y:m}=i,b=this._getOffset(o,`x`),w=this._getOffset(o,`y`);b&&(a+=b),w&&(m+=w);let x=0-a,L=a+r.width-t.width,ce=0-m,me=m+r.height-t.height,le=this._subtractOverflows(r.width,x,L),ae=this._subtractOverflows(r.height,ce,me),et=le*ae;return{visibleArea:et,isCompletelyWithinViewport:r.width*r.height===et,fitsInViewportVertically:ae===r.height,fitsInViewportHorizontally:le==r.width}}_canFitWithFlexibleDimensions(i,e,t){if(this._hasFlexibleDimensions){let o=t.bottom-e.y,r=t.right-e.x,a=ia(this._overlayRef.getConfig().minHeight),m=ia(this._overlayRef.getConfig().minWidth),b=i.fitsInViewportVertically||a!=null&&a<=o,w=i.fitsInViewportHorizontally||m!=null&&m<=r;return b&&w}return!1}_pushOverlayOnScreen(i,e,t){if(this._previousPushAmount&&this._positionLocked)return{x:i.x+this._previousPushAmount.x,y:i.y+this._previousPushAmount.y};let o=oa(e),r=this._viewportRect,a=Math.max(i.x+o.width-r.width,0),m=Math.max(i.y+o.height-r.height,0),b=Math.max(r.top-t.top-i.y,0),w=Math.max(r.left-t.left-i.x,0),x=0,L=0;return o.width<=r.width?x=w||-a:x=i.x<this._getViewportMarginStart()?r.left-t.left-i.x:0,o.height<=r.height?L=b||-m:L=i.y<this._getViewportMarginTop()?r.top-t.top-i.y:0,this._previousPushAmount={x,y:L},{x:i.x+x,y:i.y+L}}_applyPosition(i,e){if(this._setTransformOrigin(i),this._setOverlayElementStyles(e,i),this._setBoundingBoxStyles(e,i),i.panelClass&&this._addPanelClasses(i.panelClass),this._positionChanges.observers.length){let t=this._getScrollVisibility();if(i!==this._lastPosition||!this._lastScrollVisibility||!Nl(this._lastScrollVisibility,t)){let o=new Jn(i,t);this._positionChanges.next(o)}this._lastScrollVisibility=t}this._lastPosition=i,this._isInitialRender=!1}_setTransformOrigin(i){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),t,o=i.overlayY;i.overlayX===`center`?t=`center`:this._isRtl()?t=i.overlayX===`start`?`right`:`left`:t=i.overlayX===`start`?`left`:`right`;for(let r=0;r<e.length;r++)e[r].style.transformOrigin=`${t} ${o}`}_calculateBoundingBoxRect(i,e){let t=this._viewportRect,o=this._isRtl(),r,a,m;if(e.overlayY===`top`)a=i.y,r=t.height-a+this._getViewportMarginBottom();else if(e.overlayY===`bottom`)m=t.height-i.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),r=t.height-m+this._getViewportMarginTop();else{let me=Math.min(t.bottom-i.y+t.top,i.y),le=this._lastBoundingBoxSize.height;r=me*2,a=i.y-me,r>le&&!this._isInitialRender&&!this._growAfterOpen&&(a=i.y-le/2)}let b=e.overlayX===`start`&&!o||e.overlayX===`end`&&o,w=e.overlayX===`end`&&!o||e.overlayX===`start`&&o,x,L,ce;if(w)ce=t.width-i.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),x=i.x-this._getViewportMarginStart();else if(b)L=i.x,x=t.right-i.x-this._getViewportMarginEnd();else{let me=Math.min(t.right-i.x+t.left,i.x),le=this._lastBoundingBoxSize.width;x=me*2,L=i.x-me,x>le&&!this._isInitialRender&&!this._growAfterOpen&&(L=i.x-le/2)}return{top:a,left:L,bottom:m,right:ce,width:x,height:r}}_setBoundingBoxStyles(i,e){let t=this._calculateBoundingBoxRect(i,e);!this._isInitialRender&&!this._growAfterOpen&&(t.height=Math.min(t.height,this._lastBoundingBoxSize.height),t.width=Math.min(t.width,this._lastBoundingBoxSize.width));let o={};if(this._hasExactPosition())o.top=o.left=`0`,o.bottom=o.right=`auto`,o.maxHeight=o.maxWidth=``,o.width=o.height=`100%`;else{let r=this._overlayRef.getConfig().maxHeight,a=this._overlayRef.getConfig().maxWidth;o.width=re(t.width),o.height=re(t.height),o.top=re(t.top)||`auto`,o.bottom=re(t.bottom)||`auto`,o.left=re(t.left)||`auto`,o.right=re(t.right)||`auto`,e.overlayX===`center`?o.alignItems=`center`:o.alignItems=e.overlayX===`end`?`flex-end`:`flex-start`,e.overlayY===`center`?o.justifyContent=`center`:o.justifyContent=e.overlayY===`bottom`?`flex-end`:`flex-start`,r&&(o.maxHeight=re(r)),a&&(o.maxWidth=re(a))}this._lastBoundingBoxSize=t,lt(this._boundingBox.style,o)}_resetBoundingBoxStyles(){lt(this._boundingBox.style,{top:`0`,left:`0`,right:`0`,bottom:`0`,height:``,width:``,alignItems:``,justifyContent:``})}_resetOverlayElementStyles(){lt(this._pane.style,{top:``,left:``,bottom:``,right:``,position:``,transform:``})}_setOverlayElementStyles(i,e){let t={},o=this._hasExactPosition(),r=this._hasFlexibleDimensions,a=this._overlayRef.getConfig();if(o){let x=this._viewportRuler.getViewportScrollPosition();lt(t,this._getExactOverlayY(e,i,x)),lt(t,this._getExactOverlayX(e,i,x))}else t.position=`static`;let m=``,b=this._getOffset(e,`x`),w=this._getOffset(e,`y`);b&&(m+=`translateX(${b}px) `),w&&(m+=`translateY(${w}px)`),t.transform=m.trim(),a.maxHeight&&(o?t.maxHeight=re(a.maxHeight):r&&(t.maxHeight=``)),a.maxWidth&&(o?t.maxWidth=re(a.maxWidth):r&&(t.maxWidth=``)),lt(this._pane.style,t)}_getExactOverlayY(i,e,t){let o={top:``,bottom:``},r=this._getOverlayPoint(e,this._overlayRect,i);if(this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,t)),i.overlayY===`bottom`)o.bottom=`${this._document.documentElement.clientHeight-(r.y+this._overlayRect.height)}px`;else o.top=re(r.y);return o}_getExactOverlayX(i,e,t){let o={left:``,right:``},r=this._getOverlayPoint(e,this._overlayRect,i);this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,t));let a;if(this._isRtl()?a=i.overlayX===`end`?`left`:`right`:a=i.overlayX===`end`?`right`:`left`,a===`right`)o.right=`${this._document.documentElement.clientWidth-(r.x+this._overlayRect.width)}px`;else o.left=re(r.x);return o}_getScrollVisibility(){let i=this._getOriginRect(),e=this._pane.getBoundingClientRect(),t=this._scrollables.map(o=>o.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:ea(i,t),isOriginOutsideView:Xi(i,t),isOverlayClipped:ea(e,t),isOverlayOutsideView:Xi(e,t)}}_subtractOverflows(i,...e){return e.reduce((t,o)=>t-Math.max(o,0),i)}_getNarrowedViewportRect(){let i=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,t=this._viewportRuler.getViewportScrollPosition();return{top:t.top+this._getViewportMarginTop(),left:t.left+this._getViewportMarginStart(),right:t.left+i-this._getViewportMarginEnd(),bottom:t.top+e-this._getViewportMarginBottom(),width:i-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()===`rtl`}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(i,e){return e===`x`?i.offsetX==null?this._offsetX:i.offsetX:i.offsetY==null?this._offsetY:i.offsetY}_validatePositions(){}_addPanelClasses(i){this._pane&&Di(i).forEach(e=>{e!==``&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(i=>{this._pane.classList.remove(i)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let i=this._origin;if(i instanceof et)return i.nativeElement.getBoundingClientRect();if(i instanceof Element)return i.getBoundingClientRect();let e=i.width||0,t=i.height||0;return{top:i.y,bottom:i.y+t,left:i.x,right:i.x+e,height:t,width:e}}_getContainerRect(){let i=this._overlayRef.getConfig().usePopover&&this._popoverLocation!==`global`,e=this._overlayContainer.getContainerElement();i&&(e.style.display=`block`);let t=e.getBoundingClientRect();return i&&(e.style.display=``),t}};function lt(n,i){for(let e in i)i.hasOwnProperty(e)&&(n[e]=i[e]);return n}function ia(n){if(typeof n!=`number`&&n!=null){let[i,e]=n.split(wl);return!e||e===`px`?parseFloat(i):null}return n||null}function oa(n){return{top:Math.floor(n.top),right:Math.floor(n.right),bottom:Math.floor(n.bottom),left:Math.floor(n.left),width:Math.floor(n.width),height:Math.floor(n.height)}}function Nl(n,i){return n===i?!0:n.isOriginClipped===i.isOriginClipped&&n.isOriginOutsideView===i.isOriginOutsideView&&n.isOverlayClipped===i.isOverlayClipped&&n.isOverlayOutsideView===i.isOverlayOutsideView}var ra=`cdk-global-overlay-wrapper`;function kt(n){return new ti}var ti=class{_overlayRef;_cssPosition=`static`;_topOffset=``;_bottomOffset=``;_alignItems=``;_xPosition=``;_xOffset=``;_width=``;_height=``;_isDisposed=!1;attach(i){let e=i.getConfig();this._overlayRef=i,this._width&&!e.width&&i.updateSize({width:this._width}),this._height&&!e.height&&i.updateSize({height:this._height}),i.hostElement.classList.add(ra),this._isDisposed=!1}top(i=``){return this._bottomOffset=``,this._topOffset=i,this._alignItems=`flex-start`,this}left(i=``){return this._xOffset=i,this._xPosition=`left`,this}bottom(i=``){return this._topOffset=``,this._bottomOffset=i,this._alignItems=`flex-end`,this}right(i=``){return this._xOffset=i,this._xPosition=`right`,this}start(i=``){return this._xOffset=i,this._xPosition=`start`,this}end(i=``){return this._xOffset=i,this._xPosition=`end`,this}width(i=``){return this._overlayRef?this._overlayRef.updateSize({width:i}):this._width=i,this}height(i=``){return this._overlayRef?this._overlayRef.updateSize({height:i}):this._height=i,this}centerHorizontally(i=``){return this.left(i),this._xPosition=`center`,this}centerVertically(i=``){return this.top(i),this._alignItems=`center`,this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let i=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,{width:o,height:r,maxWidth:a,maxHeight:m}=this._overlayRef.getConfig(),b=(o===`100%`||o===`100vw`)&&(!a||a===`100%`||a===`100vw`),w=(r===`100%`||r===`100vh`)&&(!m||m===`100%`||m===`100vh`),x=this._xPosition,L=this._xOffset,ce=this._overlayRef.getConfig().direction===`rtl`,me=``,le=``,ae=``;b?ae=`flex-start`:x===`center`?(ae=`center`,ce?le=L:me=L):ce?x===`left`||x===`end`?(ae=`flex-end`,me=L):(x===`right`||x===`start`)&&(ae=`flex-start`,le=L):x===`left`||x===`start`?(ae=`flex-start`,me=L):(x===`right`||x===`end`)&&(ae=`flex-end`,le=L),i.position=this._cssPosition,i.marginLeft=b?`0`:me,i.marginTop=w?`0`:this._topOffset,i.marginBottom=this._bottomOffset,i.marginRight=b?`0`:le,e.justifyContent=ae,e.alignItems=w?`flex-start`:this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let i=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,t=e.style;e.classList.remove(ra),t.justifyContent=t.alignItems=i.marginTop=i.marginBottom=i.marginLeft=i.marginRight=i.position=``,this._overlayRef=null,this._isDisposed=!0}};var ua=(()=>{class n{_injector=p(Oe);global(){return kt()}flexibleConnectedTo(e){return Qi(this._injector,e)}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var an=new y(`OVERLAY_DEFAULT_CONFIG`);function sn(n,i){n.get(xe).load(ma);let e=n.get(ni),t=n.get(de),o=n.get(ee),r=n.get($n$1),a=n.get(Re),m=n.get(mt,null,{optional:!0})||n.get(Sr$1).createRenderer(null,null),b=new dt(i),w=n.get(an,null,{optional:!0})?.usePopover??!0;b.direction=b.direction||a.value,!t.body||!(`showPopover`in t.body)?b.usePopover=!1:b.usePopover=i?.usePopover??w;let x=t.createElement(`div`),L=t.createElement(`div`);x.id=o.getId(`cdk-overlay-`),x.classList.add(`cdk-overlay-pane`),L.appendChild(x),b.usePopover&&(L.setAttribute(`popover`,`manual`),L.classList.add(`cdk-overlay-popover`));let ce=b.usePopover?b.positionStrategy?.getPopoverInsertionPoint?.():null;return Zi(ce)?ce.after(L):ce?.type===`parent`?ce.element.appendChild(L):e.getContainerElement().appendChild(L),new Et(new qn(x,r,n),L,x,b,n.get(Ie),n.get(da),t,n.get(ko),n.get(ca),i?.disableAnimations??n.get(ZC,null,{optional:!0})===`NoopAnimations`,n.get(ue),m)}var pa=(()=>{class n{scrollStrategies=p(sa);_positionBuilder=p(ua);_injector=p(Oe);create(e){return sn(this._injector,e)}position(){return this._positionBuilder}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var El=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`}];var Ml=new y(`cdk-connected-overlay-scroll-strategy`,{providedIn:`root`,factory:()=>{let n=p(Oe);return()=>rn(n)}});var Mt=(()=>{class n{elementRef=p(et);static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[``,`cdk-overlay-origin`,``],[``,`overlay-origin`,``],[``,`cdkOverlayOrigin`,``]],exportAs:[`cdkOverlayOrigin`]})}return n})();var fa=new y(`cdk-connected-overlay-default-config`);var ii=(()=>{class n{_dir=p(Re,{optional:!0});_injector=p(Oe);_overlayRef;_templatePortal;_backdropSubscription=ce.EMPTY;_attachSubscription=ce.EMPTY;_detachSubscription=ce.EMPTY;_positionSubscription=ce.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=p(Ml);_ngZone=p(Ie);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(e){typeof e!=`string`&&this._assignConfig(e)}backdropClick=new ge;positionChange=new ge;attach=new ge;detach=new ge;overlayKeydown=new ge;overlayOutsideClick=new ge;constructor(){let e=p(_o),t=p(vn),o=p(fa,{optional:!0}),r=p(an,{optional:!0});this.usePopover=r?.usePopover===!1?null:`global`,this._templatePortal=new st(e,t),this.scrollStrategy=this._scrollStrategyFactory(),o&&this._assignConfig(o)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:`ltr`}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=El);let e=this._overlayRef=sn(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(t=>{this.overlayKeydown.next(t),t.keyCode===27&&!this.disableClose&&!Ce(t)&&(t.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(t=>{let o=this._getOriginElement(),r=pe(t);(!o||o!==r&&!o.contains(r))&&this.overlayOutsideClick.next(t)})}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),t=new dt({direction:this._dir||`ltr`,positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(t.height=this.height),(this.minWidth||this.minWidth===0)&&(t.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(t.minHeight=this.minHeight),this.backdropClass&&(t.backdropClass=this.backdropClass),this.panelClass&&(t.panelClass=this.panelClass),t}_updatePositionStrategy(e){let t=this.positions.map(o=>({originX:o.originX,originY:o.originY,overlayX:o.overlayX,overlayY:o.overlayY,offsetX:o.offsetX||this.offsetX,offsetY:o.offsetY||this.offsetY,panelClass:o.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(t).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?`global`:this.usePopover)}_createPositionStrategy(){let e=Qi(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof Mt?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof Mt?this.origin.elementRef.nativeElement:this.origin instanceof et?this.origin.nativeElement:typeof Element<`u`&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(t=>this.backdropClick.emit(t)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(gC(()=>this.positionChange.observers.length>0)).subscribe(t=>{this._ngZone.run(()=>this.positionChange.emit(t)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth}static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[``,`cdk-connected-overlay`,``],[``,`connected-overlay`,``],[``,`cdkConnectedOverlay`,``]],inputs:{origin:[0,`cdkConnectedOverlayOrigin`,`origin`],positions:[0,`cdkConnectedOverlayPositions`,`positions`],positionStrategy:[0,`cdkConnectedOverlayPositionStrategy`,`positionStrategy`],offsetX:[0,`cdkConnectedOverlayOffsetX`,`offsetX`],offsetY:[0,`cdkConnectedOverlayOffsetY`,`offsetY`],width:[0,`cdkConnectedOverlayWidth`,`width`],height:[0,`cdkConnectedOverlayHeight`,`height`],minWidth:[0,`cdkConnectedOverlayMinWidth`,`minWidth`],minHeight:[0,`cdkConnectedOverlayMinHeight`,`minHeight`],backdropClass:[0,`cdkConnectedOverlayBackdropClass`,`backdropClass`],panelClass:[0,`cdkConnectedOverlayPanelClass`,`panelClass`],viewportMargin:[0,`cdkConnectedOverlayViewportMargin`,`viewportMargin`],scrollStrategy:[0,`cdkConnectedOverlayScrollStrategy`,`scrollStrategy`],open:[0,`cdkConnectedOverlayOpen`,`open`],disableClose:[0,`cdkConnectedOverlayDisableClose`,`disableClose`],transformOriginSelector:[0,`cdkConnectedOverlayTransformOriginOn`,`transformOriginSelector`],hasBackdrop:[2,`cdkConnectedOverlayHasBackdrop`,`hasBackdrop`,xr$1],lockPosition:[2,`cdkConnectedOverlayLockPosition`,`lockPosition`,xr$1],flexibleDimensions:[2,`cdkConnectedOverlayFlexibleDimensions`,`flexibleDimensions`,xr$1],growAfterOpen:[2,`cdkConnectedOverlayGrowAfterOpen`,`growAfterOpen`,xr$1],push:[2,`cdkConnectedOverlayPush`,`push`,xr$1],disposeOnNavigation:[2,`cdkConnectedOverlayDisposeOnNavigation`,`disposeOnNavigation`,xr$1],usePopover:[0,`cdkConnectedOverlayUsePopover`,`usePopover`],matchWidth:[2,`cdkConnectedOverlayMatchWidth`,`matchWidth`,xr$1],_config:[0,`cdkConnectedOverlay`,`_config`]},outputs:{backdropClick:`backdropClick`,positionChange:`positionChange`,attach:`attach`,detach:`detach`,overlayKeydown:`overlayKeydown`,overlayOutsideClick:`overlayOutsideClick`},exportAs:[`cdkConnectedOverlay`],features:[yt$1]})}return n})();var ln=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({providers:[pa],imports:[oe,Xn,Yi,Yi]})}return n})();var ha=(()=>{class n{_animationsDisabled=_e();state=`unchecked`;disabled=!1;appearance=`full`;static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`mat-pseudo-checkbox`]],hostAttrs:[1,`mat-pseudo-checkbox`],hostVars:12,hostBindings:function(t,o){t&2&&Qt$1(`mat-pseudo-checkbox-indeterminate`,o.state===`indeterminate`)(`mat-pseudo-checkbox-checked`,o.state===`checked`)(`mat-pseudo-checkbox-disabled`,o.disabled)(`mat-pseudo-checkbox-minimal`,o.appearance===`minimal`)(`mat-pseudo-checkbox-full`,o.appearance===`full`)(`_mat-animation-noopable`,o._animationsDisabled)},inputs:{state:`state`,disabled:`disabled`,appearance:`appearance`},decls:0,vars:0,template:function(t,o){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--%NS%mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--%NS%mat-pseudo-checkbox-full-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--%NS%mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--%NS%mat-pseudo-checkbox-full-selected-icon-color, var(--%NS%mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-full-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return n})();var Dl=[`text`];var kl=[[[`mat-icon`]],`*`];var Tl=[`mat-icon`,`*`];function Il(n,i){if(n&1&&rt$1(0,`mat-pseudo-checkbox`,1),n&2){let e=Ne();Dt$1(`disabled`,e.disabled)(`state`,e.selected?`checked`:`unchecked`)}}function Ol(n,i){if(n&1&&rt$1(0,`mat-pseudo-checkbox`,3),n&2)Dt$1(`disabled`,Ne().disabled)}function Rl(n,i){if(n&1&&(ne(0,`span`,4),Me(1),re$1()),n&2){let e=Ne();Z(),yn(`(`,e.group.label,`)`)}}var eo=new y(`MAT_OPTION_PARENT_COMPONENT`);var to=new y(`MatOptgroup`);var Ji=class{source;isUserInput;constructor(i,e=!1){this.source=i,this.isUserInput=e}};var Tt=(()=>{class n{_element=p(et);_changeDetectorRef=p(Rr$1);_parent=p(eo,{optional:!0});group=p(to,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue=``;get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=p(ee).getId(`mat-option-`);get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=V(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new ge;_text;_stateChanges=new K;constructor(){let e=p(xe);e.load(Un),e.load(An),this._signalDisableRipple=!!this._parent&&ki$1(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||``).trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,t){let o=this._getHostElement();typeof o.focus==`function`&&o.focus(t)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!Ce(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?`-1`:`0`}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new Ji(this,e))}static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`mat-option`]],viewQuery:function(t,o){if(t&1&&Iy(Dl,7),t&2){let r;Sy(r=Ty$1())&&(o._text=r.first)}},hostAttrs:[`role`,`option`,1,`mat-mdc-option`,`mdc-list-item`],hostVars:11,hostBindings:function(t,o){t&1&&Te(`click`,function(){return o._selectViaInteraction()})(`keydown`,function(a){return o._handleKeydown(a)}),t&2&&(by(`id`,o.id),nt$1(`aria-selected`,o.selected)(`aria-disabled`,o.disabled.toString()),Qt$1(`mdc-list-item--selected`,o.selected)(`mat-mdc-option-multiple`,o.multiple)(`mat-mdc-option-active`,o.active)(`mdc-list-item--disabled`,o.disabled))},inputs:{value:`value`,id:`id`,disabled:[2,`disabled`,`disabled`,xr$1]},outputs:{onSelectionChange:`onSelectionChange`},exportAs:[`matOption`],ngContentSelectors:Tl,decls:8,vars:5,consts:[[`text`,``],[`aria-hidden`,`true`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`,`state`],[1,`mdc-list-item__primary-text`],[`state`,`checked`,`aria-hidden`,`true`,`appearance`,`minimal`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`],[1,`cdk-visually-hidden`],[`aria-hidden`,`true`,`mat-ripple`,``,1,`mat-mdc-option-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`]],template:function(t,o){t&1&&(os$1(kl),ze(0,Il,1,2,`mat-pseudo-checkbox`,1),is$1(1),ne(2,`span`,2,0),is$1(4,1),re$1(),ze(5,Ol,1,1,`mat-pseudo-checkbox`,3),ze(6,Rl,2,1,`span`,4),rt$1(7,`div`,5)),t&2&&(Ge$1(o.multiple?0:-1),Z(5),Ge$1(!o.multiple&&o.selected&&!o.hideSingleSelectionIndicator?5:-1),Z(),Ge$1(o.group&&o.group._inert?6:-1),Z(),Dt$1(`matRippleTrigger`,o._getHostElement())(`matRippleDisabled`,o.disabled||o.disableRipple))},dependencies:[ha,Ur],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--%NS%mat-option-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-option-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-option-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-option-label-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-option-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  font-weight: var(--%NS%mat-option-label-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--%NS%mat-option-hover-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--%NS%mat-option-focus-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--%NS%selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--%NS%mat-option-selected-state-layer-color, var(--%NS%mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--%NS%selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--%NS%mat-option-selected-state-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-option-selected-state-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--%NS%selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--%NS%selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --%NS%mat-list-list-item-selected-container-color: var(--%NS%mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})}return n})();function ga(n,i,e){if(e.length){let t=i.toArray(),o=e.toArray(),r=0;for(let a=0;a<n+1;a++)t[a].group&&t[a].group===o[r]&&r++;return r}return 0}function ba(n,i,e,t){return n<e?n:n+i>e+t?Math.max(0,n-t+i):e}var _a=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({imports:[oe]})}return n})();var no=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({imports:[Gn,_a,Tt,oe]})}return n})();var Al=[`trigger`];var Fl=[`panel`];var Pl=[[[`mat-select-trigger`]],`*`];var Ll=[`mat-select-trigger`,`*`];function zl(n,i){if(n&1&&(ne(0,`span`,4),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.placeholder)}}function Bl(n,i){n&1&&is$1(0)}function Vl(n,i){if(n&1&&(ne(0,`span`,11),Me(1),re$1()),n&2){let e=Ne(2);Z(),Kt$1(e.triggerValue)}}function jl(n,i){if(n&1&&(ne(0,`span`,5),ze(1,Bl,1,0)(2,Vl,2,1,`span`,11),re$1()),n&2){let e=Ne();Z(),Ge$1(e.customTrigger?1:2)}}function Hl(n,i){if(n&1){let e=zn$1();ne(0,`div`,12,1),Te(`keydown`,function(o){At(e);return Rt(Ne()._handleKeydown(o))}),is$1(2,1),re$1()}if(n&2){let e=Ne();ss(e.panelClass),Qt$1(`mat-select-panel-animations-enabled`,!e._animationsDisabled)(`mat-primary`,e._parentFormField?.color===`primary`)(`mat-accent`,e._parentFormField?.color===`accent`)(`mat-warn`,e._parentFormField?.color===`warn`)(`mat-undefined`,!e._parentFormField?.color),nt$1(`id`,e.id+`-panel`)(`aria-multiselectable`,e.multiple)(`aria-label`,e.ariaLabel||null)(`aria-labelledby`,e._getPanelAriaLabelledby())}}var Wl=new y(`mat-select-scroll-strategy`,{providedIn:`root`,factory:()=>{let n=p(Oe);return()=>rn(n)}});var Ul=new y(`MAT_SELECT_CONFIG`);var va=new y(`MatSelectTrigger`);var io=class{source;value;constructor(i,e){this.source=i,this.value=e}};var ya=(()=>{class n{_viewportRuler=p(at);_changeDetectorRef=p(Rr$1);_elementRef=p(et);_dir=p(Re,{optional:!0});_idGenerator=p(ee);_renderer=p(mt);_parentFormField=p($t,{optional:!0});ngControl=p(Jo$1,{self:!0,optional:!0});_liveAnnouncer=p(Ri);_defaultOptions=p(Ul,{optional:!0});_animationsDisabled=_e();_popoverLocation;_initialized=new K;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let o=this.panel.nativeElement,r=ga(e,this.options,this.optionGroups),a=t._getHostElement();e===0&&r===1?o.scrollTop=0:o.scrollTop=ba(a.offsetTop,a.offsetHeight,o.scrollTop,o.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new io(this,e)}_scrollStrategyFactory=p(Wl);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId(`mat-select-`);_triggerAriaLabelledBy=null;_previousControl;_destroy=new K;_errorStateTracker;stateChanges=new K;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId(`mat-select-value-`);_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||``;get focused(){return this._focused||this._panelOpen}_focused=!1;controlType=`mat-select`;trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=V(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Yh.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel=``;ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<`u`?this._defaultOptions.panelWidth:`auto`;canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=ui$1(()=>{let e=this.options;return e?e.changes.pipe(ul$1(e),Ze(()=>aC(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(Ze(()=>this.optionSelectionChanges))});openedChange=new ge;_openedStream=this.openedChange.pipe(Ye(e=>e),W(()=>{}));_closedStream=this.openedChange.pipe(Ye(e=>!e),W(()=>{}));selectionChange=new ge;valueChange=new ge;constructor(){let e=p(Bn),t=p(YA,{optional:!0}),o=p(JA,{optional:!0}),r=p(new Ac(`tabindex`),{optional:!0}),a=p(an,{optional:!0}),m=p(zn,{optional:!0,self:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new xt(e,m||this.ngControl,o,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=r==null?0:parseInt(r)||0,this._popoverLocation=a?.usePopover===!1?null:`inline`,this.id=this.id}ngOnInit(){this._selectionModel=new Jt(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(di$1(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(di$1(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(ul$1(null),di$1(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let o=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?o.setAttribute(`aria-labelledby`,e):o.removeAttribute(`aria-labelledby`)}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=!0,this._overlayDir.positionChange.pipe(on(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(o),this._cleanupDetach=void 0};let e=this.panel.nativeElement,t=this._renderer.listen(e,`animationend`,r=>{r.animationName===`_mat-select-exit`&&(this._cleanupDetach?.(),this._detachOverlay())}),o=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add(`mat-select-panel-exit`)}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return``;if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(`, `)}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value===`rtl`:!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,o=t===40||t===38||t===37||t===39,r=t===13||t===32,a=this._keyManager;if(!a.isTyping()&&r&&!Ce(e)||(this.multiple||e.altKey)&&o)e.preventDefault(),this.open();else if(!this.multiple){let m=this.selected;a.onKeydown(e);let b=this.selected;b&&m!==b&&this._liveAnnouncer.announce(b.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,o=e.keyCode,r=o===40||o===38,a=t.isTyping();if(r&&e.altKey)e.preventDefault(),this.close();else if(!a&&(o===13||o===32)&&t.activeItem&&!Ce(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!a&&this._multiple&&o===65&&e.ctrlKey){e.preventDefault();let m=this.options.some(b=>!b.disabled&&!b.selected);this.options.forEach(b=>{b.disabled||(m?b.select():b.deselect())})}else{let m=t.activeItemIndex;t.onKeydown(e),this._multiple&&r&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==m&&t.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!Ce(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(o=>{if(this._selectionModel.isSelected(o))return!1;try{return(o.value!=null||this.canSelectNullableOptions)&&this._compareWith(o.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth===`auto`?(e instanceof Mt?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?``:this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Gt(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`).withHomeAndEnd().withPageUpDown().withAllowedModifierKeys([`shiftKey`]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=aC(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(di$1(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),aC(...this.options.map(t=>t._stateChanges)).pipe(di$1(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let o=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(o!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),o!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,o)=>this.sortComparator?this.sortComparator(t,o,e):e.indexOf(t)-e.indexOf(o)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(o=>o.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+` `:``;return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||``;return this.ariaLabelledby&&(e+=` `+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute(`aria-describedby`,e.join(` `)):t.removeAttribute(`aria-describedby`)}onContainerClick(e){let t=pe(e);t&&(t.tagName===`MAT-OPTION`||t.classList.contains(`cdk-overlay-backdrop`)||t.closest(`.mat-mdc-select-panel`))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`mat-select`]],contentQueries:function(t,o,r){if(t&1&&Yf(r,va,5)(r,Tt,5)(r,to,5),t&2){let a;Sy(a=Ty$1())&&(o.customTrigger=a.first),Sy(a=Ty$1())&&(o.options=a),Sy(a=Ty$1())&&(o.optionGroups=a)}},viewQuery:function(t,o){if(t&1&&Iy(Al,5)(Fl,5)(ii,5),t&2){let r;Sy(r=Ty$1())&&(o.trigger=r.first),Sy(r=Ty$1())&&(o.panel=r.first),Sy(r=Ty$1())&&(o._overlayDir=r.first)}},hostAttrs:[`role`,`combobox`,`aria-haspopup`,`listbox`,1,`mat-mdc-select`],hostVars:21,hostBindings:function(t,o){t&1&&Te(`keydown`,function(a){return o._handleKeydown(a)})(`focus`,function(){return o._onFocus()})(`blur`,function(){return o._onBlur()}),t&2&&(nt$1(`id`,o.id)(`tabindex`,o.disabled?-1:o.tabIndex)(`aria-controls`,o.panelOpen?o.id+`-panel`:null)(`aria-expanded`,o.panelOpen)(`aria-label`,o.ariaLabel||null)(`aria-required`,o.required.toString())(`aria-disabled`,o.disabled.toString())(`aria-invalid`,o.errorState)(`aria-activedescendant`,o._getAriaActiveDescendant()),Qt$1(`mat-mdc-select-disabled`,o.disabled)(`mat-mdc-select-invalid`,o.errorState)(`mat-mdc-select-required`,o.required)(`mat-mdc-select-empty`,o.empty)(`mat-mdc-select-multiple`,o.multiple)(`mat-select-open`,o.panelOpen))},inputs:{userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],panelClass:`panelClass`,disabled:[2,`disabled`,`disabled`,xr$1],disableRipple:[2,`disableRipple`,`disableRipple`,xr$1],tabIndex:[2,`tabIndex`,`tabIndex`,e=>e==null?0:ez(e)],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,xr$1],placeholder:`placeholder`,required:[2,`required`,`required`,xr$1],multiple:[2,`multiple`,`multiple`,xr$1],disableOptionCentering:[2,`disableOptionCentering`,`disableOptionCentering`,xr$1],compareWith:`compareWith`,value:`value`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],errorStateMatcher:`errorStateMatcher`,typeaheadDebounceInterval:[2,`typeaheadDebounceInterval`,`typeaheadDebounceInterval`,ez],sortComparator:`sortComparator`,id:`id`,panelWidth:`panelWidth`,canSelectNullableOptions:[2,`canSelectNullableOptions`,`canSelectNullableOptions`,xr$1]},outputs:{openedChange:`openedChange`,_openedStream:`opened`,_closedStream:`closed`,selectionChange:`selectionChange`,valueChange:`valueChange`},exportAs:[`matSelect`],features:[Dn([{provide:Xt,useExisting:n},{provide:eo,useExisting:n}]),yt$1],ngContentSelectors:Ll,decls:11,vars:10,consts:[[`fallbackOverlayOrigin`,`cdkOverlayOrigin`,`trigger`,``],[`panel`,``],[`cdk-overlay-origin`,``,1,`mat-mdc-select-trigger`,3,`click`],[1,`mat-mdc-select-value`],[1,`mat-mdc-select-placeholder`,`mat-mdc-select-min-line`],[1,`mat-mdc-select-value-text`],[1,`mat-mdc-select-arrow-wrapper`],[1,`mat-mdc-select-arrow`],[`viewBox`,`0 0 24 24`,`width`,`24px`,`height`,`24px`,`focusable`,`false`,`aria-hidden`,`true`],[`d`,`M7 10l5 5 5-5z`],[`cdk-connected-overlay`,``,`cdkConnectedOverlayHasBackdrop`,``,`cdkConnectedOverlayBackdropClass`,`cdk-overlay-transparent-backdrop`,3,`detach`,`backdropClick`,`overlayKeydown`,`cdkConnectedOverlayDisableClose`,`cdkConnectedOverlayPanelClass`,`cdkConnectedOverlayScrollStrategy`,`cdkConnectedOverlayOrigin`,`cdkConnectedOverlayPositions`,`cdkConnectedOverlayWidth`,`cdkConnectedOverlayFlexibleDimensions`,`cdkConnectedOverlayUsePopover`],[1,`mat-mdc-select-min-line`],[`role`,`listbox`,`tabindex`,`-1`,1,`mat-mdc-select-panel`,`mdc-menu-surface`,`mdc-menu-surface--open`,3,`keydown`]],template:function(t,o){if(t&1&&(os$1(Pl),ne(0,`div`,2,0),Te(`click`,function(){return o.open()}),ne(3,`div`,3),ze(4,zl,2,1,`span`,4)(5,jl,3,1,`span`,5),re$1(),ne(6,`div`,6)(7,`div`,7),Lg(),ne(8,`svg`,8),rt$1(9,`path`,9),re$1()()()(),vy(10,Hl,3,16,`ng-template`,10),Te(`detach`,function(){return o.close()})(`backdropClick`,function(){return o.close()})(`overlayKeydown`,function(a){return o._handleOverlayKeydown(a)})),t&2){let r=sT(1);Z(3),nt$1(`id`,o._valueId),Z(),Ge$1(o.empty?4:5),Z(6),Dt$1(`cdkConnectedOverlayDisableClose`,!0)(`cdkConnectedOverlayPanelClass`,o._overlayPanelClass)(`cdkConnectedOverlayScrollStrategy`,o._scrollStrategy)(`cdkConnectedOverlayOrigin`,o._preferredOverlayOrigin||r)(`cdkConnectedOverlayPositions`,o._positions)(`cdkConnectedOverlayWidth`,o._overlayWidth)(`cdkConnectedOverlayFlexibleDimensions`,!0)(`cdkConnectedOverlayUsePopover`,o._popoverLocation)}},dependencies:[Mt,ii],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--%NS%mat-select-enabled-trigger-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-select-trigger-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-select-trigger-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-select-trigger-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-select-trigger-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-select-trigger-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--%NS%mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-select-invalid-arrow-color, var(--%NS%mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--%NS%mat-select-enabled-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-focused-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-disabled-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--%NS%mat-select-panel-background-color, var(--%NS%mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--%NS%mat-select-placeholder-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--%NS%mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2})}return n})();var xa=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[`mat-select-trigger`]],features:[Dn([{provide:va,useExisting:n}])]})}return n})();var Ca=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Zt$1({type:n});static ɵinj=Tt$1({imports:[ln,no,oe,Kn,Ue,no]})}return n})();var Yl=(n,i)=>i.value;function Kl(n,i){if(n&1&&(ne(0,`mat-label`),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.label())}}function ql(n,i){if(n&1&&(ne(0,`mat-icon`,1),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.prefixIcon())}}function Xl(n,i){if(n&1&&(ne(0,`mat-select-trigger`),Me(1),re$1()),n&2){let e=Ne();Z(),Fy(``,e.valuePrefix(),` `,e.selectedLabel())}}function $l(n,i){if(n&1&&(ne(0,`mat-icon`),Me(1),re$1()),n&2){let e=Ne().$implicit;Z(),Kt$1(e.icon)}}function Zl(n,i){if(n&1&&(ne(0,`mat-option`,3),ze(1,$l,2,1,`mat-icon`),Me(2),re$1()),n&2){let e=i.$implicit;Dt$1(`value`,e.value)(`disabled`,e.disabled),Z(),Ge$1(e.icon?1:-1),Z(),yn(` `,e.label,` `)}}function Ql(n,i){if(n&1){let e=zn$1();ne(0,`button`,5),Te(`click`,function(o){At(e);return Rt(Ne().clearValue(o))}),ne(1,`mat-icon`),Me(2,`close`),re$1()()}}function Jl(n,i){if(n&1&&(ne(0,`mat-hint`),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.hint())}}function ed(n,i){if(n&1&&(ne(0,`mat-error`),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.errorMessage())}}var ai=class n extends Ct{options=B([]);multiple=B(!1);valuePrefix=B(``);size=B(`base`);onSelectionChange(i){this.value.set(i)}selectedLabel(){let i=this.options().find(e=>e.value===this.value());return i?i.label:``}clearValue(i){i&&i.stopPropagation(),this.value.set(null)}static ɵfac=(()=>{let i;return function(t){return(i||(i=Mo(n)))(t||n)}})();static ɵcmp=Ee({type:n,selectors:[[`app-select`]],hostAttrs:[1,`d-block`,`w-full`],inputs:{options:[1,`options`],multiple:[1,`multiple`],valuePrefix:[1,`valuePrefix`],size:[1,`size`]},features:[tt$1],decls:10,vars:17,consts:[[`subscriptSizing`,`dynamic`,1,`w-full`,3,`appearance`],[`matPrefix`,``,1,`mr-2`,`text-muted`],[3,`valueChange`,`closed`,`id`,`placeholder`,`disabled`,`required`,`multiple`,`value`],[3,`value`,`disabled`],[`matSuffix`,``,`type`,`button`,`aria-label`,`Clear selection`,1,`d-inline-flex`,`items-center`,`border-0`,`bg-transparent`,`cursor-pointer`,`mr-2`,`text-muted`,`hover-primary`],[`matSuffix`,``,`type`,`button`,`aria-label`,`Clear selection`,1,`d-inline-flex`,`items-center`,`border-0`,`bg-transparent`,`cursor-pointer`,`mr-2`,`text-muted`,`hover-primary`,3,`click`]],template:function(e,t){e&1&&(ne(0,`mat-form-field`,0),ze(1,Kl,2,1,`mat-label`),ze(2,ql,2,1,`mat-icon`,1),ne(3,`mat-select`,2),Te(`valueChange`,function(r){return t.onSelectionChange(r)})(`closed`,function(){return t.onBlur()}),ze(4,Xl,2,2,`mat-select-trigger`),zf(5,Zl,3,4,`mat-option`,3,Yl),re$1(),ze(7,Ql,3,0,`button`,4),ze(8,Jl,2,1,`mat-hint`),ze(9,ed,2,1,`mat-error`),re$1()),e&2&&(Qt$1(`select-sm`,t.size()===`sm`)(`has-prefix`,t.prefixIcon()),Dt$1(`appearance`,t.appearance()),Z(),Ge$1(t.label()?1:-1),Z(),Ge$1(t.prefixIcon()?2:-1),Z(),Dt$1(`id`,t.inputId())(`placeholder`,t.placeholder())(`disabled`,t.disabled()||t.readonly())(`required`,t.required())(`multiple`,t.multiple())(`value`,t.value()),Z(),Ge$1(t.valuePrefix()&&!t.multiple()?4:-1),Z(),Gf(t.options()),Z(2),Ge$1(t.clearable()&&t.value()!==null&&t.value()!==``&&!t.disabled()&&!t.multiple()?7:-1),Z(),Ge$1(t.hint()?8:-1),Z(),Ge$1(t.errorMessage()?9:-1))},dependencies:[je,Ue,yt,ot,rt,Yt,Kt,qt,Ca,ya,xa,Tt,Hn,jn],styles:[`[_nghost-%COMP%]{display:block}.select-sm[_ngcontent-%COMP%]{font-size:.75rem;line-height:1}.select-sm[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper{height:1.875rem!important;min-height:1.875rem!important;padding:0 .5rem!important;display:flex!important;align-items:center!important;border-radius:.375rem!important}.select-sm[_ngcontent-%COMP%]     .mat-mdc-form-field-flex{height:1.875rem!important;min-height:1.875rem!important;align-items:center!important}.select-sm[_ngcontent-%COMP%]     .mat-mdc-form-field-infix{padding-top:0!important;padding-bottom:0!important;min-height:1.875rem!important;display:flex!important;align-items:center!important}.select-sm[_ngcontent-%COMP%]     .mat-mdc-select{display:flex!important;align-items:center!important;height:100%!important}.select-sm[_ngcontent-%COMP%]     .mat-mdc-select-trigger{font-size:.75rem!important;height:100%!important;display:flex!important;align-items:center!important}.select-sm[_ngcontent-%COMP%]     .mat-mdc-select-value{font-size:.75rem!important;line-height:1.25!important}.select-sm[_ngcontent-%COMP%]     .mat-mdc-select-arrow-wrapper{transform:scale(.8);display:flex!important;align-items:center!important}.select-sm[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper{display:none!important}`]})};var si=class n{runnerClient=p(hb);run(i){return Gb(this.runnerClient.run(i))}submit(i){return Gb(this.runnerClient.submit(i))}format(i){return Gb(this.runnerClient.format(i))}static ɵfac=function(e){return new(e||n)};static ɵprov=S({token:n,factory:n.ɵfac,providedIn:`root`})};function nd(n,i){n&1&&(ne(0,`span`,8),Me(1,`READ-ONLY`),re$1())}function id(n,i){if(n&1){let e=zn$1();ne(0,`button`,17),Te(`click`,function(){At(e);return Rt(Ne().onReset())}),rt$1(1,`app-icon`,18),re$1()}}function od(n,i){if(n&1){let e=zn$1();ne(0,`button`,19),Te(`click`,function(){At(e);return Rt(Ne().formatCode())}),rt$1(1,`app-icon`,20),re$1()}if(n&2){let e=Ne();nt$1(`aria-label`,e.isFormatted()?`Formatted`:`Format code`),Z(),Dt$1(`name`,e.isFormatted()?`check`:`auto_fix_high`)(`color`,e.isFormatted()?`var(--color-secondary)`:void 0)}}function rd(n,i){if(n&1){let e=zn$1();ne(0,`button`,21),Te(`click`,function(){At(e);return Rt(Ne().copyCode())}),rt$1(1,`app-icon`,20),re$1()}if(n&2){let e=Ne();nt$1(`aria-label`,e.isCopied()?`Copied`:`Copy code`),Z(),Dt$1(`name`,e.isCopied()?`check`:`content_copy`)(`color`,e.isCopied()?`var(--color-secondary)`:void 0)}}function ad(n,i){if(n&1){let e=zn$1();ne(0,`button`,22),Te(`click`,function(){At(e);return Rt(Ne().onFullscreenToggle())}),rt$1(1,`app-icon`,23),re$1()}}function sd(n,i){n&1&&(ne(0,`div`,14),rt$1(1,`app-icon`,24),re$1()),n&2&&(Z(),Dt$1(`spin`,!0))}function ld(n,i){if(n&1&&(ne(0,`div`,16)(1,`div`,25)(2,`span`),Me(3),re$1(),ne(4,`span`),Me(5),re$1(),ne(6,`span`),Me(7),re$1()(),ne(8,`div`,25)(9,`span`,26),rt$1(10,`span`,27),Me(11,` UTF-8 `),re$1()()()),n&2){let e=Ne();Z(3),Fy(`Ln `,e.currentLine(),`, Col `,e.currentCol()),Z(2),Fy(``,e.totalLines(),` `,e.totalLines()===1?`line`:`lines`),Z(2),yn(``,e.charCount(),` chars`)}}var Sa=class n{runnerApi=p(si,{optional:!0});themeService=p(Pu,{optional:!0});code=rD(``);fileName=B(`untitled`);language=rD.required();availableLanguages=B([`python`,`java`,`javascript`]);languageOptions=oe$1(()=>this.availableLanguages().map(i=>({label:i,value:i})));theme=B(void 0);readonly=B(!1);resolvedTheme=oe$1(()=>{let i=this.theme();return i?i===`light`||i===`stitch-light`?`stitch-light`:i===`dark`||i===`stitch-dark`?`stitch-dark`:i:this.themeService?.isDark()===!1?`stitch-light`:`stitch-dark`});showLineNumbers=B(!0);showDots=B(!0);showStatusBar=B(!0);showMinimap=B(!1);copyable=B(!0);minHeight=B(`16rem`);maxHeight=B(`36rem`);tabSize=B(4);showReset=B(!1);showFullscreen=B(!1);saved=Ar$1();reset=Ar$1();fullscreenToggle=Ar$1();bannerAction=Ar$1();run=Ar$1();submit=Ar$1();editor;isLoading=V(!0);currentLine=V(1);currentCol=V(1);totalLines=V(1);charCount=V(0);isCopied=V(!1);isFormatted=V(!1);statusMessage=V(`READY`);onReset(){this.reset.emit()}onFullscreenToggle(){this.fullscreenToggle.emit()}onBannerAction(){this.bannerAction.emit()}constructor(){Ln$1(()=>{let i=this.language();if(this.editor){let e=this.editor.getModel(),t=window.monaco;e&&t&&t.editor.setModelLanguage(e,i)}}),Ln$1(()=>{let i=this.resolvedTheme(),e=window.monaco;this.editor&&e&&e.editor.setTheme(i)})}onLanguageChange(i){i&&this.language.set(i)}editorOptions=oe$1(()=>({theme:this.resolvedTheme(),language:this.language(),fontSize:12,lineHeight:22,fontFamily:`'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`,fontLigatures:!0,minimap:{enabled:this.showMinimap()},lineNumbers:this.showLineNumbers()?`on`:`off`,glyphMargin:!1,folding:!0,lineDecorationsWidth:0,lineNumbersMinChars:3,readOnly:this.readonly(),domReadOnly:this.readonly(),tabSize:this.tabSize(),automaticLayout:!0,formatOnPaste:!0,formatOnType:!0,scrollBeyondLastLine:!1,renderLineHighlight:`all`,cursorBlinking:`smooth`,cursorSmoothCaretAnimation:`on`,smoothScrolling:!0,padding:{top:12,bottom:12},scrollbar:{verticalScrollbarSize:8,horizontalScrollbarSize:8,alwaysConsumeMouseWheel:!1}}));onEditorInit(i){this.editor=i,this.isLoading.set(!1),this.updateCounts(),setTimeout(()=>{i.layout()},100),this.readonly()&&this.statusMessage.set(`READ ONLY`),i.onDidChangeCursorPosition(t=>{this.currentLine.set(t.position.lineNumber),this.currentCol.set(t.position.column)}),i.onDidChangeModelContent(()=>{this.updateCounts()});let e=window.monaco;e&&(i.addCommand(e.KeyMod.CtrlCmd|e.KeyCode.KeyS,()=>{this.saved.emit(this.code()),this.statusMessage.set(`SAVED`),setTimeout(()=>this.statusMessage.set(this.readonly()?`READ ONLY`:`READY`),2e3)}),i.addCommand(e.KeyMod.CtrlCmd|e.KeyCode.Enter,()=>{this.run.emit()}),i.addCommand(e.KeyMod.CtrlCmd|e.KeyMod.Shift|e.KeyCode.Enter,()=>{this.submit.emit()}),i.addCommand(e.KeyMod.Shift|e.KeyMod.Alt|e.KeyCode.KeyF,()=>{this.formatCode()}))}async formatCode(){if(this.readonly()||!this.editor)return;let i=this.editor.getValue(),e=this.language();if(this.runnerApi&&i.trim())try{let o=await this.runnerApi.format({language:e,code:i});if(o.formatted&&o.code!==void 0){if(o.code!==i){let r=this.editor.getModel();r&&(this.editor.executeEdits(`format`,[{range:r.getFullModelRange(),text:o.code,forceMoveMarkers:!0}]),this.code.set(o.code))}this.notifyFormatted();return}}catch{}let t=this.editor.getAction(`editor.action.formatDocument`);t&&t.run().then(()=>{this.notifyFormatted()}).catch(()=>{})}notifyFormatted(){this.isFormatted.set(!0),this.statusMessage.set(`FORMATTED`),this.updateCounts(),setTimeout(()=>{this.isFormatted.set(!1),this.statusMessage.set(this.readonly()?`READ ONLY`:`READY`)},1500)}copyCode(){let i=this.editor?this.editor.getValue():this.code();navigator?.clipboard&&navigator.clipboard.writeText(i).then(()=>{this.isCopied.set(!0),setTimeout(()=>this.isCopied.set(!1),2e3)})}updateCounts(){if(this.editor){let e=this.editor.getModel();if(e){this.totalLines.set(e.getLineCount()),this.charCount.set(e.getValueLength());return}}let i=this.code()||``;this.totalLines.set(i.split(`
`).length),this.charCount.set(i.length)}static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-code-editor`]],hostAttrs:[1,`d-block`,`w-full`],inputs:{code:[1,`code`],fileName:[1,`fileName`],language:[1,`language`],availableLanguages:[1,`availableLanguages`],theme:[1,`theme`],readonly:[1,`readonly`],showLineNumbers:[1,`showLineNumbers`],showDots:[1,`showDots`],showStatusBar:[1,`showStatusBar`],showMinimap:[1,`showMinimap`],copyable:[1,`copyable`],minHeight:[1,`minHeight`],maxHeight:[1,`maxHeight`],tabSize:[1,`tabSize`],showReset:[1,`showReset`],showFullscreen:[1,`showFullscreen`]},outputs:{code:`codeChange`,language:`languageChange`,saved:`saved`,reset:`reset`,fullscreenToggle:`fullscreenToggle`,bannerAction:`bannerAction`,run:`run`,submit:`submit`},decls:19,vars:15,consts:[[1,`w-full`,`h-full`,`flex`,`flex-col`,`rounded-2xl`,`bg-surface-container`,`border`,`border-surface-highest`,`relative`,`overflow-hidden`,`group`],[1,`flex`,`items-center`,`justify-between`,`px-3`,`py-2`,`border-b`,`border-surface-highest`,`bg-surface-container-lowest`,`select-none`,`relative`,`z-10`,`min-h-11`],[1,`flex`,`items-center`,`gap-2`],[1,`flex`,`items-center`,`gap-2`,`px-2`,`py-1`,`rounded-md`,`text-xs`,`font-medium`,`text-white`,`bg-surface-container-high`,`border`,`border-surface-highest`],[`name`,`code`,`size`,`sm`,`color`,`var(--color-secondary)`],[1,`flex`,`items-center`,2,`width`,`8rem`],[`size`,`sm`,3,`valueChange`,`options`,`value`],[1,`flex`,`items-center`,`gap-1`,`text-outline`],[1,`font-mono`,`text-xs`,`text-outline`,`px-2`,`py-0.5`,`rounded`,`bg-surface-container-high`,`mr-1`],[`type`,`button`,`title`,`Reset code definition`,1,`flex`,`items-center`,`justify-center`,`w-7`,`h-7`,`rounded`,`bg-transparent`,`border-0`,`text-outline`,`hover-text-white`,`hover-bg-surface-container-high`,`transition-colors`,`cursor-pointer`],[`type`,`button`,`title`,`Format code (Shift + Option + F)`,1,`flex`,`items-center`,`justify-center`,`w-7`,`h-7`,`rounded`,`bg-transparent`,`border-0`,`text-outline`,`hover-text-white`,`hover-bg-surface-container-high`,`transition-colors`,`cursor-pointer`],[`type`,`button`,`title`,`Copy code`,1,`flex`,`items-center`,`justify-center`,`w-7`,`h-7`,`rounded`,`bg-transparent`,`border-0`,`text-outline`,`hover-text-white`,`hover-bg-surface-container-high`,`transition-colors`,`cursor-pointer`],[`type`,`button`,`title`,`Toggle Fullscreen`,1,`flex`,`items-center`,`justify-center`,`w-7`,`h-7`,`rounded`,`bg-transparent`,`border-0`,`text-outline`,`hover-text-white`,`hover-bg-surface-container-high`,`transition-colors`,`cursor-pointer`],[1,`monaco-wrapper`,`relative`,`w-full`,`flex-1`,`overflow-hidden`,`z-10`],[1,`absolute`,`inset-0`,`flex`,`items-center`,`justify-center`,`bg-surface-container/80`,`z-20`],[1,`w-full`,`h-full`,`block`,3,`ngModelChange`,`onInit`,`options`,`ngModel`],[1,`flex`,`items-center`,`justify-between`,`px-4`,`py-2`,`border-t`,`border-surface-highest`,`bg-surface-container-lowest`,`font-mono`,`text-xs`,`text-outline`,`select-none`,`relative`,`z-10`],[`type`,`button`,`title`,`Reset code definition`,1,`flex`,`items-center`,`justify-center`,`w-7`,`h-7`,`rounded`,`bg-transparent`,`border-0`,`text-outline`,`hover-text-white`,`hover-bg-surface-container-high`,`transition-colors`,`cursor-pointer`,3,`click`],[`name`,`refresh`,`size`,`base`],[`type`,`button`,`title`,`Format code (Shift + Option + F)`,1,`flex`,`items-center`,`justify-center`,`w-7`,`h-7`,`rounded`,`bg-transparent`,`border-0`,`text-outline`,`hover-text-white`,`hover-bg-surface-container-high`,`transition-colors`,`cursor-pointer`,3,`click`],[`size`,`base`,3,`name`,`color`],[`type`,`button`,`title`,`Copy code`,1,`flex`,`items-center`,`justify-center`,`w-7`,`h-7`,`rounded`,`bg-transparent`,`border-0`,`text-outline`,`hover-text-white`,`hover-bg-surface-container-high`,`transition-colors`,`cursor-pointer`,3,`click`],[`type`,`button`,`title`,`Toggle Fullscreen`,1,`flex`,`items-center`,`justify-center`,`w-7`,`h-7`,`rounded`,`bg-transparent`,`border-0`,`text-outline`,`hover-text-white`,`hover-bg-surface-container-high`,`transition-colors`,`cursor-pointer`,3,`click`],[`name`,`fullscreen`,`size`,`base`],[`name`,`progress_activity`,`size`,`md`,`color`,`var(--color-primary)`,3,`spin`],[1,`flex`,`items-center`,`gap-4`],[1,`flex`,`items-center`,`gap-1.5`],[1,`rounded-full`,`bg-secondary`,2,`width`,`0.375rem`,`height`,`0.375rem`]],template:function(e,t){e&1&&(ne(0,`div`,0)(1,`div`,1)(2,`div`,2)(3,`div`,3),rt$1(4,`app-icon`,4),ne(5,`span`),Me(6,`Code`),re$1()(),ne(7,`div`,5)(8,`app-select`,6),Te(`valueChange`,function(r){return t.onLanguageChange(r)}),re$1()()(),ne(9,`div`,7),ze(10,nd,2,0,`span`,8),ze(11,id,2,0,`button`,9),ze(12,od,2,3,`button`,10),ze(13,rd,2,3,`button`,11),ze(14,ad,2,0,`button`,12),re$1()(),ne(15,`div`,13),ze(16,sd,2,1,`div`,14),ne(17,`ngx-monaco-editor`,15),Vy(`ngModelChange`,function(r){return AT(t.code,r)||(t.code=r),r}),Te(`onInit`,function(r){return t.onEditorInit(r)}),re$1(),GI(),re$1(),ze(18,ld,12,5,`div`,16),re$1()),e&2&&(Z(8),Dt$1(`options`,t.languageOptions())(`value`,t.language()),Z(2),Ge$1(t.readonly()?10:-1),Z(),Ge$1(t.showReset()?11:-1),Z(),Ge$1(t.readonly()?-1:12),Z(),Ge$1(t.copyable()?13:-1),Z(),Ge$1(t.showFullscreen()?14:-1),Z(),Tc(`height`,t.minHeight()),Z(),Ge$1(t.isLoading()?16:-1),Z(),Tc(`height`,t.minHeight()),Dt$1(`options`,t.editorOptions()),jy(`ngModel`,t.code),WI(),Z(),Ge$1(t.showStatusBar()?18:-1))},dependencies:[je,nW,eW,eR,dW,Zn$1,ai],styles:[`[_nghost-%COMP%]{display:block;width:100%}.monaco-wrapper[_ngcontent-%COMP%]{position:relative;width:100%;overflow:hidden}ngx-monaco-editor[_ngcontent-%COMP%]{display:block;width:100%;height:100%}[_nghost-%COMP%]     .editor-container{width:100%!important;height:100%!important}[_nghost-%COMP%]     .monaco-editor{width:100%!important;height:100%!important}`]})};var dd=[`*`];function cd(n,i){if(n&1&&(Et$1(0,`kbd`,1),Me(1),bt$1()),n&2){let e=i.$implicit;Z(),Kt$1(e)}}function md(n,i){n&1&&(Et$1(0,`kbd`,1),is$1(1),bt$1())}var li=class n{keys=B([]);static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-kbd`]],hostAttrs:[1,`d-inline-flex`],inputs:{keys:[1,`keys`]},ngContentSelectors:dd,decls:4,vars:1,consts:[[1,`d-inline-flex`,`items-center`,`gap-1`],[1,`kbd`,`d-inline-flex`,`items-center`,`justify-center`,`px-2`,`py-0`,`rounded-sm`,`font-mono`,`text-2xs`,`uppercase`,`tracking-wider`]],template:function(e,t){e&1&&(os$1(),Et$1(0,`span`,0),zf(1,cd,2,1,`kbd`,1,QS),ze(3,md,2,0,`kbd`,1),bt$1()),e&2&&(Z(),Gf(t.keys()),Z(2),Ge$1(t.keys().length===0?3:-1))},dependencies:[je],styles:[`[_nghost-%COMP%]{display:inline-flex}.kbd[_ngcontent-%COMP%]{min-width:1.5rem;height:1.375rem;background-color:var(--%NS%color-surface-container-high);border:.0625rem solid var(--%NS%color-surface-container-highest);color:var(--%NS%color-on-surface-variant)}`]})};function ud(n,i){}var Je=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext;bindings};var ro=(()=>{class n extends Nt{_elementRef=p(et);_focusTrapFactory=p(Oi);_config;_interactivityChecker=p(Ii);_ngZone=p(Ie);_focusMonitor=p(Ut);_renderer=p(mt);_changeDetectorRef=p(Rr$1);_injector=p(Oe);_platform=p(q);_document=p(de);_portalOutlet;_focusTrapped=new K;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=p(Je,{optional:!0})||new Je,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let t=this._ariaLabelledByQueue.indexOf(e);t>-1&&(this._ariaLabelledByQueue.splice(t,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),t}attachTemplatePortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),t}attachDomPortal=e=>{this._portalOutlet.hasAttached();let t=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),t};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let o=()=>{r(),a(),e.removeAttribute(`tabindex`)},r=this._renderer.listen(e,`blur`,o),a=this._renderer.listen(e,`mousedown`,o)})),e.focus(t)}_focusByCssSelector(e,t){let o=this._elementRef.nativeElement.querySelector(e);o&&this._forceFocus(o,t)}_trapFocus(e){this._isDestroyed||yc$1(()=>{let t=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case`dialog`:this._containsFocus()||t.focus(e);break;case!0:case`first-tabbable`:this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case`first-heading`:this._focusByCssSelector(`h1, h2, h3, h4, h5, h6, [role="heading"]`,e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,t=null;if(typeof e==`string`?t=this._document.querySelector(e):typeof e==`boolean`?t=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(t=e),this._config.restoreFocus&&t&&typeof t.focus==`function`){let o=jt(),r=this._elementRef.nativeElement;(!o||o===this._document.body||o===r||r.contains(o))&&(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,t=jt();return e===t||e.contains(t)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=jt()))}static ɵfac=function(t){return new(t||n)};static ɵcmp=Ee({type:n,selectors:[[`cdk-dialog-container`]],viewQuery:function(t,o){if(t&1&&Iy(tn,7),t&2){let r;Sy(r=Ty$1())&&(o._portalOutlet=r.first)}},hostAttrs:[`tabindex`,`-1`,1,`cdk-dialog-container`],hostVars:6,hostBindings:function(t,o){t&2&&nt$1(`id`,o._config.id||null)(`role`,o._config.role)(`aria-modal`,o._config.ariaModal)(`aria-labelledby`,o._config.ariaLabel?null:o._ariaLabelledByQueue[0])(`aria-label`,o._config.ariaLabel)(`aria-describedby`,o._config.ariaDescribedBy||null)},features:[tt$1],decls:1,vars:0,consts:[[`cdkPortalOutlet`,``]],template:function(t,o){t&1&&vy(0,ud,0,0,`ng-template`,0)},dependencies:[tn],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2,changeDetection:1})}return n})();var ct=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new K;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(i,e){this.overlayRef=i,this.config=e,this.disableClose=e.disableClose,this.backdropClick=i.backdropClick(),this.keydownEvents=i.keydownEvents(),this.outsidePointerEvents=i.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!Ce(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:`keyboard`}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:`mouse`}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=i.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(i,e){if(this._canClose(i)){let t=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||`program`,this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(i),t.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(i=``,e=``){return this.overlayRef.updateSize({width:i,height:e}),this}addPanelClass(i){return this.overlayRef.addPanelClass(i),this}removePanelClass(i){return this.overlayRef.removePanelClass(i),this}_canClose(i){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(i,e,this.componentInstance))}};var pd=new y(`DialogScrollStrategy`,{providedIn:`root`,factory:()=>{let n=p(Oe);return()=>Dt(n)}});var fd=new y(`DialogData`);var hd=new y(`DefaultDialogConfig`);function gd(n){let i=V(n),e=new ge;return{valueSignal:i,get value(){return i()},change:e,ngOnDestroy(){e.complete()}}}var wa=(()=>{class n{_injector=p(Oe);_defaultOptions=p(hd,{optional:!0});_parentDialog=p(n,{optional:!0,skipSelf:!0});_overlayContainer=p(ni);_idGenerator=p(ee);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new K;_afterOpenedAtThisLevel=new K;_ariaHiddenElements=new Map;_scrollStrategy=p(pd);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=ui$1(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(ul$1(void 0)));open(e,t){t=m(m({},this._defaultOptions||new Je),t),t.id=t.id||this._idGenerator.getId(`cdk-dialog-`),t.id&&this.getDialogById(t.id);let r=this._getOverlayConfig(t),a=sn(this._injector,r),m$2=new ct(a,t),b=this._attachContainer(a,m$2,t);if(m$2.containerInstance=b,!this.openDialogs.length){let w=this._overlayContainer.getContainerElement();b._focusTrapped?b._focusTrapped.pipe(on(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(w)}):this._hideNonDialogContentFromAssistiveTechnology(w)}return this._attachDialogContent(e,m$2,b,t),this.openDialogs.push(m$2),m$2.closed.subscribe(()=>this._removeOpenDialog(m$2,!0)),this.afterOpened.next(m$2),m$2}closeAll(){oo(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){oo(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),oo(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let t=new dt({positionStrategy:e.positionStrategy||kt().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}_attachContainer(e,t,o){let r=o.injector||o.viewContainerRef?.injector,a=[{provide:Je,useValue:o},{provide:ct,useValue:t},{provide:Et,useValue:e}],m;o.container?typeof o.container==`function`?m=o.container:(m=o.container.type,a.push(...o.container.providers(o))):m=ro;let b=new wt(m,o.viewContainerRef,Oe.create({parent:r||this._injector,providers:a}));return e.attach(b).instance}_attachDialogContent(e,t,o,r){if(e instanceof _o){let a=this._createInjector(r,t,o,void 0),m$3={$implicit:r.data,dialogRef:t};r.templateContext&&(m$3=m(m({},m$3),typeof r.templateContext==`function`?r.templateContext():r.templateContext)),o.attachTemplatePortal(new st(e,null,m$3,a))}else{let a=this._createInjector(r,t,o,this._injector),m=o.attachComponentPortal(new wt(e,r.viewContainerRef,a,null,r.bindings));t.componentRef=m,t.componentInstance=m.instance}}_createInjector(e,t,o,r){let a=e.injector||e.viewContainerRef?.injector,m=[{provide:fd,useValue:e.data},{provide:ct,useValue:t}];return e.providers&&(typeof e.providers==`function`?m.push(...e.providers(t,e,o)):m.push(...e.providers)),e.direction&&(!a||!a.get(Re,null,{optional:!0}))&&m.push({provide:Re,useValue:gd(e.direction)}),Oe.create({parent:a||r,providers:m})}_removeOpenDialog(e,t){let o=this.openDialogs.indexOf(e);o>-1&&(this.openDialogs.splice(o,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((r,a)=>{r?a.setAttribute(`aria-hidden`,r):a.removeAttribute(`aria-hidden`)}),this._ariaHiddenElements.clear(),t&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let t=e.parentElement.children;for(let o=t.length-1;o>-1;o--){let r=t[o];r!==e&&r.nodeName!==`SCRIPT`&&r.nodeName!==`STYLE`&&!r.hasAttribute(`aria-live`)&&!r.hasAttribute(`popover`)&&(this._ariaHiddenElements.set(r,r.getAttribute(`aria-hidden`)),r.setAttribute(`aria-hidden`,`true`))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();function oo(n,i){let e=n.length;for(;e--;)i(n[e])}function bd(n,i){}var ci=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration;bindings};var ao=`mdc-dialog--open`;var Na=`mdc-dialog--opening`;var Ea=`mdc-dialog--closing`;var _d=150;var vd=75;var yd=(()=>{class n extends ro{_animationStateChanged=new ge;_animationsEnabled=!_e();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?Da(this._config.enterAnimationDuration)??_d:0;_exitAnimationDuration=this._animationsEnabled?Da(this._config.exitAnimationDuration)??vd:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:`opening`,totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(Ma,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Na,ao)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(ao),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:`closing`,totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(ao),this._animationsEnabled?(this._hostElement.style.setProperty(Ma,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Ea)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:`closed`,totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(Na,Ea)}_waitForAnimationToComplete(e,t){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(t,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame==`function`?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:`opened`,totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let t=super.attachComponentPortal(e);return t.location.nativeElement.classList.add(`mat-mdc-dialog-component-host`),t}static ɵfac=(()=>{let e;return function(o){return(e||(e=Mo(n)))(o||n)}})();static ɵcmp=Ee({type:n,selectors:[[`mat-dialog-container`]],hostAttrs:[`tabindex`,`-1`,1,`mat-mdc-dialog-container`,`mdc-dialog`],hostVars:10,hostBindings:function(t,o){t&2&&(by(`id`,o._config.id),nt$1(`aria-modal`,o._config.ariaModal)(`role`,o._config.role)(`aria-labelledby`,o._config.ariaLabel?null:o._ariaLabelledByQueue[0])(`aria-label`,o._config.ariaLabel)(`aria-describedby`,o._config.ariaDescribedBy||null),Qt$1(`_mat-animation-noopable`,!o._animationsEnabled)(`mat-mdc-dialog-container-with-actions`,o._actionSectionCount>0))},features:[tt$1],decls:3,vars:0,consts:[[1,`mat-mdc-dialog-inner-container`,`mdc-dialog__container`],[1,`mat-mdc-dialog-surface`,`mdc-dialog__surface`],[`cdkPortalOutlet`,``]],template:function(t,o){t&1&&(ne(0,`div`,0)(1,`div`,1),vy(2,bd,0,0,`ng-template`,2),re$1()())},dependencies:[tn],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--%NS%mat-dialog-container-max-width, 560px);
  min-width: var(--%NS%mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--%NS%mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--%NS%mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--%NS%mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--%NS%mat-dialog-container-elevation-shadow, none);
  border-radius: var(--%NS%mat-dialog-container-shape, var(--%NS%mat-sys-corner-extra-large, 4px));
  background-color: var(--%NS%mat-dialog-container-color, var(--%NS%mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--%NS%mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--%NS%mat-dialog-subhead-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-dialog-subhead-font, var(--%NS%mat-sys-headline-small-font, inherit));
  line-height: var(--%NS%mat-dialog-subhead-line-height, var(--%NS%mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--%NS%mat-dialog-subhead-size, var(--%NS%mat-sys-headline-small-size, 1rem));
  font-weight: var(--%NS%mat-dialog-subhead-weight, var(--%NS%mat-sys-headline-small-weight, 400));
  letter-spacing: var(--%NS%mat-dialog-subhead-tracking, var(--%NS%mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--%NS%mat-dialog-supporting-text-color, var(--%NS%mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--%NS%mat-dialog-supporting-text-font, var(--%NS%mat-sys-body-medium-font, inherit));
  line-height: var(--%NS%mat-dialog-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--%NS%mat-dialog-supporting-text-size, var(--%NS%mat-sys-body-medium-size, 1rem));
  font-weight: var(--%NS%mat-dialog-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight, 400));
  letter-spacing: var(--%NS%mat-dialog-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--%NS%mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--%NS%mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--%NS%mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--%NS%mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2,changeDetection:1})}return n})();var Ma=`--mat-dialog-transition-duration`;function Da(n){return n==null?null:typeof n==`number`?n:n.endsWith(`ms`)?bt(n.substring(0,n.length-2)):n.endsWith(`s`)?bt(n.substring(0,n.length-1))*1e3:n===`0`?0:null}var di=(function(n){return n[n.OPEN=0]=`OPEN`,n[n.CLOSING=1]=`CLOSING`,n[n.CLOSED=2]=`CLOSED`,n})(di||{});var dn=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new ai$1(1);_beforeClosed=new ai$1(1);_result;_closeFallbackTimeout;_state=di.OPEN;_closeInteractionType;constructor(i,e,t){this._ref=i,this._config=e,this._containerInstance=t,this.disableClose=e.disableClose,this.id=i.id,i.addPanelClass(`mat-mdc-dialog-panel`),t._animationStateChanged.pipe(Ye(o=>o.state===`opened`),on(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),t._animationStateChanged.pipe(Ye(o=>o.state===`closed`),on(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),i.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),aC(this.backdropClick(),this.keydownEvents().pipe(Ye(o=>o.keyCode===27&&!this.disableClose&&!Ce(o)))).subscribe(o=>{this.disableClose||(o.preventDefault(),xd(this,o.type===`keydown`?`keyboard`:`mouse`))})}close(i){let e=this._config.closePredicate;e&&!e(i,this._config,this.componentInstance)||(this._result=i,this._containerInstance._animationStateChanged.pipe(Ye(t=>t.state===`closing`),on(1)).subscribe(t=>{this._beforeClosed.next(i),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),t.totalTime+100)}),this._state=di.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(i){let e=this._ref.config.positionStrategy;return i&&(i.left||i.right)?i.left?e.left(i.left):e.right(i.right):e.centerHorizontally(),i&&(i.top||i.bottom)?i.top?e.top(i.top):e.bottom(i.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(i=``,e=``){return this._ref.updateSize(i,e),this}addPanelClass(i){return this._ref.addPanelClass(i),this}removePanelClass(i){return this._ref.removePanelClass(i),this}getState(){return this._state}_finishDialogClose(){this._state=di.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function xd(n,i,e){return n._closeInteractionType=i,n.close(e)}var so=new y(`MatMdcDialogData`);var Cd=new y(`mat-mdc-dialog-default-options`);var Sd=new y(`mat-mdc-dialog-scroll-strategy`,{providedIn:`root`,factory:()=>{let n=p(Oe);return()=>Dt(n)}});var ka=(()=>{class n{_defaultOptions=p(Cd,{optional:!0});_scrollStrategy=p(Sd);_parentDialog=p(n,{optional:!0,skipSelf:!0});_idGenerator=p(ee);_injector=p(Oe);_dialog=p(wa);_animationsDisabled=_e();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new K;_afterOpenedAtThisLevel=new K;dialogConfigClass=ci;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=ui$1(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(ul$1(void 0)));constructor(){this._dialogRefConstructor=dn,this._dialogContainerType=yd,this._dialogDataToken=so}open(e,t){let o;t=m(m({},this._defaultOptions||new ci),t),t.id=t.id||this._idGenerator.getId(`mat-mdc-dialog-`),t.scrollStrategy=t.scrollStrategy||this._scrollStrategy();let r=this._dialog.open(e,A(m({},t),{positionStrategy:kt(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||t.enterAnimationDuration?.toLocaleString()===`0`||t.exitAnimationDuration?.toString()===`0`,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:t},{provide:Je,useValue:t}]},templateContext:()=>({dialogRef:o}),providers:(a,m,b)=>(o=new this._dialogRefConstructor(a,t,b),o.updatePosition(t?.position),[{provide:this._dialogContainerType,useValue:b},{provide:this._dialogDataToken,useValue:m.data},{provide:this._dialogRefConstructor,useValue:o},{provide:ct,useValue:null}])}));return o.componentRef=r.componentRef,o.componentInstance=r.componentInstance,this.openDialogs.push(o),this.afterOpened.next(o),o.afterClosed().subscribe(()=>{let a=this.openDialogs.indexOf(o);a>-1&&(this.openDialogs.splice(a,1),this.openDialogs.length||this._getAfterAllClosed().next())}),o}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let t=e.length;for(;t--;)e[t].close()}static ɵfac=function(t){return new(t||n)};static ɵprov=X({token:n,factory:n.ɵfac})}return n})();var wd=()=>[`Esc`];function Nd(n,i){if(n&1&&(ne(0,`div`,5),rt$1(1,`app-icon`,12),re$1()),n&2){let e=Ne(2);Z(),Dt$1(`name`,e.config?.icon)}}function Ed(n,i){if(n&1&&(ne(0,`div`,6),rt$1(1,`span`,13),ne(2,`span`,14),Me(3),re$1()()),n&2){let e=Ne(2);Z(3),Kt$1(e.config?.eyebrow)}}function Md(n,i){if(n&1&&(ne(0,`h3`,7),Me(1),re$1()),n&2){let e=Ne(2);Z(),yn(` `,e.config?.title,` `)}}function Dd(n,i){if(n&1&&(ne(0,`p`,8),Me(1),re$1()),n&2){let e=Ne(2);Z(),yn(` `,e.config?.description,` `)}}function kd(n,i){n&1&&rt$1(0,`app-kbd`,10),n&2&&Dt$1(`keys`,kT(1,wd))}function Td(n,i){if(n&1){let e=zn$1();ne(0,`button`,15),Te(`click`,function(){At(e);return Rt(Ne(2).close())}),rt$1(1,`app-icon`,16),re$1()}}function Id(n,i){if(n&1&&(ne(0,`div`,2)(1,`div`,4),ze(2,Nd,2,1,`div`,5),ne(3,`div`),ze(4,Ed,4,1,`div`,6),ze(5,Md,2,1,`h3`,7),ze(6,Dd,2,1,`p`,8),re$1()(),ne(7,`div`,9),ze(8,kd,1,2,`app-kbd`,10),ze(9,Td,2,0,`button`,11),re$1()()),n&2){let e=Ne();Z(2),Ge$1(e.config?.icon?2:-1),Z(2),Ge$1(e.config?.eyebrow?4:-1),Z(),Ge$1(e.config?.title?5:-1),Z(),Ge$1(e.config?.description?6:-1),Z(2),Ge$1(e.config?.showEscHint&&!e.config?.disableClose?8:-1),Z(),Ge$1(e.config?.showCloseButton!==!1?9:-1)}}function Od(n,i){n&1&&Ey(0)}function Rd(n,i){if(n&1&&vy(0,Od,1,0,`ng-container`,17),n&2){let e=Ne();Dt$1(`ngTemplateOutlet`,e.data.template)(`ngTemplateOutletContext`,e.templateContext)}}function Ad(n,i){n&1&&Ey(0)}function Fd(n,i){if(n&1&&vy(0,Ad,1,0,`ng-container`,18),n&2)Dt$1(`ngComponentOutlet`,Ne().data.component)}function Pd(n,i){n&1&&Ey(0)}function Ld(n,i){if(n&1&&(ne(0,`div`,3),vy(1,Pd,1,0,`ng-container`,17),re$1()),n&2){let e=Ne();Z(),Dt$1(`ngTemplateOutlet`,e.config.footer)(`ngTemplateOutletContext`,e.templateContext)}}var mi=class n{dialogRef=p(dn);data=p(so);get config(){return this.data.config}get showHeader(){return!!(this.config?.title||this.config?.icon||this.config?.eyebrow||this.config?.showCloseButton!==!1)}get templateContext(){return{$implicit:this.config?.data,data:this.config?.data,close:i=>this.close(i)}}close(i){this.dialogRef.close(i)}static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-modal-container`]],decls:7,vars:4,consts:[[1,`w-full`],[1,`w-full`,`bg-surface-container-lowest`,`rounded-2xl`,`border`,`border-surface-high`,`p-6`,`relative`,`font-sans`,`text-on-surface`],[1,`flex`,`items-center`,`justify-between`,`pb-4`,`mb-4`,`border-b`,`border-surface-high`],[1,`flex`,`items-center`,`justify-between`,`gap-4`,`pt-4`,`mt-4`,`border-t`,`border-surface-high`],[1,`flex`,`items-center`,`gap-3`],[1,`w-9`,`h-9`,`rounded-lg`,`bg-primary-fixed`,`flex`,`items-center`,`justify-center`,`text-primary`],[1,`d-flex`,`items-center`,`gap-2`,`mb-1`],[1,`font-sans`,`text-lg`,`text-on-surface`,`font-bold`,`m-0`,`leading-tight`],[1,`font-sans`,`text-xs`,`text-on-surface-variant`,`m-0`,`mt-0.5`],[1,`flex`,`items-center`,`gap-2`],[3,`keys`],[`type`,`button`,`title`,`Dismiss`,1,`border-0`,`bg-transparent`,`text-outline`,`hover-text-on-surface`,`cursor-pointer`,`p-1`,`rounded-lg`],[`size`,`md`,3,`name`],[1,`d-inline-block`,`w-2`,`h-2`,`rounded-full`,`bg-primary`],[1,`font-mono`,`text-2xs`,`font-bold`,`uppercase`,`tracking-wider`,`text-primary`],[`type`,`button`,`title`,`Dismiss`,1,`border-0`,`bg-transparent`,`text-outline`,`hover-text-on-surface`,`cursor-pointer`,`p-1`,`rounded-lg`,3,`click`],[`name`,`close`,`size`,`md`],[4,`ngTemplateOutlet`,`ngTemplateOutletContext`],[4,`ngComponentOutlet`]],template:function(e,t){e&1&&(ne(0,`div`,0)(1,`div`,1),ze(2,Id,10,6,`div`,2),ne(3,`div`,0),ze(4,Rd,1,2,`ng-container`),ze(5,Fd,1,1,`ng-container`),re$1(),ze(6,Ld,2,2,`div`,3),re$1()()),e&2&&(Z(2),Ge$1(t.showHeader?2:-1),Z(2),Ge$1(t.data.template?4:-1),Z(),Ge$1(t.data.component?5:-1),Z(),Ge$1(t.config?.footer?6:-1))},dependencies:[je,IM,MM,Zn$1,li],styles:[`[_nghost-%COMP%]{display:block}`]})};var lo=class n{dialog=p(ka);open(i,e){let t=i instanceof _o,o={template:t?i:void 0,component:t?void 0:i,config:e},r=[`app-modal-panel`];return e?.panelClass&&(Array.isArray(e.panelClass)?r.push(...e.panelClass):r.push(e.panelClass)),this.dialog.open(mi,{width:e?.width||`36rem`,maxWidth:e?.maxWidth||`90vw`,disableClose:e?.disableClose??!1,panelClass:r,data:o})}closeAll(){this.dialog.closeAll()}static ɵfac=function(e){return new(e||n)};static ɵprov=S({token:n,factory:n.ɵfac,providedIn:`root`})};var zd=(n,i)=>i.name;function Bd(n,i){if(n&1&&(ne(0,`div`,4),rt$1(1,`span`,6),ne(2,`span`,7),Me(3),re$1()()),n&2){let e=Ne(2);Z(3),Kt$1(e.title())}}function Vd(n,i){if(n&1&&(ne(0,`span`,5),rt$1(1,`app-icon`,8),ne(2,`span`),Me(3),re$1()()),n&2){let e=Ne(2);Z(3),Kt$1(e.remainingTime())}}function jd(n,i){if(n&1&&(ne(0,`div`,1),ze(1,Bd,4,1,`div`,4),ze(2,Vd,4,1,`span`,5),re$1()),n&2){let e=Ne();Z(),Ge$1(e.title()?1:-1),Z(),Ge$1(e.remainingTime()?2:-1)}}function Hd(n,i){n&1&&(ne(0,`span`,13),Me(1,` YOU `),re$1())}function Wd(n,i){n&1&&rt$1(0,`app-icon`,15)}function Ud(n,i){if(n&1&&(ne(0,`div`,17)(1,`span`,21),rt$1(2,`app-icon`,22),ne(3,`span`),Me(4,`Runs: `),ne(5,`strong`,23),Me(6),re$1()()(),ne(7,`span`,24),rt$1(8,`app-icon`,25),ne(9,`span`),Me(10,`Submissions: `),ne(11,`strong`,23),Me(12),re$1()()(),ne(13,`span`,26),rt$1(14,`app-icon`,27),ne(15,`span`),Me(16,`Compile Errors: `),ne(17,`strong`,23),Me(18),re$1()()(),ne(19,`span`,28),rt$1(20,`app-icon`,29),ne(21,`span`),Me(22,`Runtime Errors: `),ne(23,`strong`,23),Me(24),re$1()()()()),n&2){let e=Ne().$implicit;Z(6),Kt$1(e.runs??0),Z(6),Kt$1(e.submissions??0),Z(2),Qt$1(`text-error`,(e.compileErrors??0)>0),Z(3),Qt$1(`text-error`,(e.compileErrors??0)>0),Z(),Kt$1(e.compileErrors??0),Z(2),Qt$1(`text-error`,(e.runtimeErrors??0)>0),Z(3),Qt$1(`text-error`,(e.runtimeErrors??0)>0),Z(),Kt$1(e.runtimeErrors??0)}}function Gd(n,i){if(n&1&&(ne(0,`div`,9)(1,`div`,10)(2,`div`,4)(3,`span`,11),Me(4),re$1(),ne(5,`span`,12),Me(6),re$1(),ze(7,Hd,2,0,`span`,13),ne(8,`span`,14),ze(9,Wd,1,0,`app-icon`,15),ne(10,`span`),Me(11),re$1()()(),ne(12,`span`,16),Me(13),re$1()(),ze(14,Ud,25,12,`div`,17),ne(15,`div`,18)(16,`div`,19),rt$1(17,`div`,20),re$1()()()),n&2){let e=i.$implicit;Qt$1(`border-primary`,e.isCurrentUser)(`border-surface-high`,!e.isCurrentUser)(`opacity-75`,!e.isCurrentUser&&e.rank>2),Z(3),Qt$1(`text-secondary`,e.rank===1)(`text-primary`,e.isCurrentUser)(`text-on-surface-variant`,!e.isCurrentUser&&e.rank!==1),Z(),yn(` #`,e.rank,` `),Z(2),Kt$1(e.name),Z(),Ge$1(e.isCurrentUser?7:-1),Z(),Qt$1(`text-secondary`,e.hasPassedTests)(`text-primary`,e.isCurrentUser&&!e.hasPassedTests)(`text-on-surface-variant`,!e.isCurrentUser&&!e.hasPassedTests),Z(),Ge$1(e.hasPassedTests?9:-1),Z(2),Kt$1(e.status),Z(),Qt$1(`text-on-surface`,e.rank===1)(`text-primary`,e.isCurrentUser)(`text-on-surface-variant`,!e.isCurrentUser&&e.rank!==1),Z(),yn(` `,e.time,` `),Z(),Ge$1(e.runs!==void 0||e.submissions!==void 0||e.compileErrors!==void 0||e.runtimeErrors!==void 0?14:-1),Z(3),Tc(`width`,e.progressPercent,`%`),Qt$1(`bg-secondary`,e.rank===1)(`bg-primary`,e.isCurrentUser)(`bg-surface-container-highest`,!e.isCurrentUser&&e.rank!==1)}}var Ia=class n{title=B(``);remainingTime=B(``);competitors=B([]);sortedCompetitors=oe$1(()=>[...this.competitors()].sort((i,e)=>i.rank-e.rank));static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-live-grid`]],hostAttrs:[1,`d-block`,`w-full`],inputs:{title:[1,`title`],remainingTime:[1,`remainingTime`],competitors:[1,`competitors`]},decls:5,vars:1,consts:[[1,`bg-surface-container-low`,`border`,`border-surface-high`,`rounded-xl`,`p-4`,`flex`,`flex-col`,`gap-3`,`font-mono`,`text-xs`,`w-full`],[1,`flex`,`items-center`,`justify-between`,`pb-2`,`border-b`,`border-surface-high`],[1,`flex`,`flex-col`,`gap-2`],[1,`p-3`,`rounded-lg`,`bg-surface-container-lowest`,`flex`,`flex-col`,`gap-2`,`border`,`shadow-xs`,3,`border-primary`,`border-surface-high`,`opacity-75`],[1,`flex`,`items-center`,`gap-2`],[1,`font-bold`,`text-on-surface-variant`,`bg-surface-container-high`,`px-2`,`py-0.5`,`rounded`,`flex`,`items-center`,`gap-1`],[1,`w-2`,`h-2`,`rounded-full`,`bg-secondary`,`animate-pulse`],[1,`font-semibold`,`text-on-surface`,`uppercase`],[`name`,`schedule`,`size`,`xs`],[1,`p-3`,`rounded-lg`,`bg-surface-container-lowest`,`flex`,`flex-col`,`gap-2`,`border`,`shadow-xs`],[1,`flex`,`items-center`,`justify-between`],[1,`font-mono`,`text-xs`,`font-bold`],[1,`font-semibold`,`text-on-surface`,`font-sans`],[1,`px-1`,`rounded`,`bg-primary`,`text-on-primary`,`font-semibold`,`text-xs`],[1,`flex`,`items-center`,`gap-1`,`font-medium`],[`name`,`check_circle`,`size`,`xs`,1,`text-secondary`],[1,`font-bold`],[1,`flex`,`items-center`,`gap-4`,`text-xs`,`text-on-surface-variant`,`flex-wrap`],[1,`w-full`,`pt-1`],[1,`w-full`,`h-1-5`,`bg-surface-container-high`,`rounded-full`,`overflow-hidden`],[1,`h-full`],[`title`,`Runs`,1,`flex`,`items-center`,`gap-1`],[`name`,`play_arrow`,`size`,`xs`],[1,`text-on-surface`],[`title`,`Submissions`,1,`flex`,`items-center`,`gap-1`],[`name`,`send`,`size`,`xs`],[`title`,`Compile Errors`,1,`flex`,`items-center`,`gap-1`],[`name`,`error_outline`,`size`,`xs`],[`title`,`Runtime Errors`,1,`flex`,`items-center`,`gap-1`],[`name`,`warning`,`size`,`xs`]],template:function(e,t){e&1&&(ne(0,`div`,0),ze(1,jd,3,2,`div`,1),ne(2,`div`,2),zf(3,Gd,18,39,`div`,3,zd),re$1()()),e&2&&(Z(),Ge$1(t.title()||t.remainingTime()?1:-1),Z(2),Gf(t.sortedCompetitors()))},dependencies:[je,Zn$1],styles:[`[_nghost-%COMP%]{display:block}`]})};var Yd=[[[``,`trailing`,``]],[[``,`header-end`,``]],`*`];var Kd=[`[trailing]`,`[header-end]`,`*`];var qd=(n,i)=>i.value;function Xd(n,i){if(n&1&&rt$1(0,`app-icon`,5),n&2){let e=Ne().$implicit;Dt$1(`name`,e.icon)}}function $d(n,i){if(n&1){let e=zn$1();ne(0,`button`,4),Te(`click`,function(){let o=At(e).$implicit;return Rt(Ne().select(o))}),ze(1,Xd,1,1,`app-icon`,5),Me(2),re$1()}if(n&2){let e=i.$implicit,t=Ne();Qt$1(`flex-1`,t.fullWidth())(`segment-active`,t.value()===e.value)(`px-3`,t.size()===`sm`)(`py-1`,t.size()===`sm`)(`text-xs`,t.size()===`sm`)(`px-4`,t.size()===`md`)(`py-2`,t.size()===`md`)(`text-sm`,t.size()===`md`)(`opacity-50`,t.disabled()||e.disabled)(`cursor-not-allowed`,t.disabled()||e.disabled),Dt$1(`disabled`,t.disabled()||e.disabled),nt$1(`aria-checked`,t.value()===e.value),Z(),Ge$1(e.icon?1:-1),Z(),yn(` `,e.label,` `)}}var ui=class n{options=B([]);size=B(`md`);fullWidth=B(!1);disabled=B(!1);allowDeselect=B(!1);ariaLabel=B(void 0);headerClass=B(``);value=rD(void 0);select(i){if(!(this.disabled()||i.disabled)){if(this.allowDeselect()&&this.value()===i.value){this.value.set(void 0);return}this.value.set(i.value)}}static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-segmented-control`]],hostAttrs:[1,`flex-col`],hostVars:6,hostBindings:function(e,t){e&2&&Qt$1(`d-flex`,t.fullWidth())(`d-inline-flex`,!t.fullWidth())(`w-full`,t.fullWidth())},inputs:{options:[1,`options`],size:[1,`size`],fullWidth:[1,`fullWidth`],disabled:[1,`disabled`],allowDeselect:[1,`allowDeselect`],ariaLabel:[1,`ariaLabel`],headerClass:[1,`headerClass`],value:[1,`value`]},outputs:{value:`valueChange`},ngContentSelectors:Kd,decls:8,vars:8,consts:[[1,`segmented-header`,`flex`,`items-center`,`justify-between`,3,`ngClass`],[1,`flex`,`items-center`,`gap-2`,`select-none`],[`role`,`radiogroup`,1,`segmented`,`d-flex`,`items-stretch`,`gap-1`,`p-1`,`rounded-md`,`bg-surface-container-lowest`,`border`,`border-surface-high`],[`type`,`button`,`role`,`radio`,1,`segment`,`d-flex`,`items-center`,`justify-center`,`gap-1`,`border-0`,`rounded-sm`,`font-mono`,`cursor-pointer`,`transition`,3,`disabled`,`flex-1`,`segment-active`,`px-3`,`py-1`,`text-xs`,`px-4`,`py-2`,`text-sm`,`opacity-50`,`cursor-not-allowed`],[`type`,`button`,`role`,`radio`,1,`segment`,`d-flex`,`items-center`,`justify-center`,`gap-1`,`border-0`,`rounded-sm`,`font-mono`,`cursor-pointer`,`transition`,3,`click`,`disabled`],[`size`,`sm`,3,`name`]],template:function(e,t){e&1&&(os$1(Yd),ne(0,`div`,0)(1,`div`,1)(2,`div`,2),zf(3,$d,3,24,`button`,3,qd),re$1(),is$1(5),re$1(),is$1(6,1),re$1(),is$1(7,2)),e&2&&(Qt$1(`w-full`,t.fullWidth()),Dt$1(`ngClass`,t.headerClass()),Z(),Qt$1(`w-full`,t.fullWidth()),Z(),Qt$1(`w-full`,t.fullWidth()),nt$1(`aria-label`,t.ariaLabel()||null),Z(),Gf(t.options()))},dependencies:[je,_M,Zn$1],styles:[`.segment[_ngcontent-%COMP%]{background-color:transparent;color:var(--%NS%color-on-surface-variant)}.segment[_ngcontent-%COMP%]:hover:not(.segment-active):not(:disabled){background-color:var(--%NS%color-surface-container-high)}.segment[_ngcontent-%COMP%]:focus-visible{outline:.125rem solid var(--%NS%color-primary);outline-offset:.0625rem}.segment-active[_ngcontent-%COMP%]{background-color:var(--%NS%color-primary-container);color:var(--%NS%color-on-primary);font-weight:700}`]})};var Zd=[`*`];function Qd(n,i){n&1&&rt$1(0,`app-icon`,2),n&2&&Dt$1(`weight`,700)}function Jd(n,i){if(n&1&&(ne(0,`div`,4),rt$1(1,`app-icon`,10),re$1()),n&2){let e=Ne();Z(),Dt$1(`name`,e.icon())}}function ec(n,i){if(n&1&&(ne(0,`span`,7),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.subtitle())}}function tc(n,i){if(n&1&&(ne(0,`p`,8),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.description())}}var Oa=class n{title=B(``);subtitle=B(``);description=B(``);icon=B(void 0);disabled=B(!1);selected=rD(!1);select(){this.disabled()||this.selected.set(!0)}static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-option-card`]],hostAttrs:[1,`d-block`],inputs:{title:[1,`title`],subtitle:[1,`subtitle`],description:[1,`description`],icon:[1,`icon`],disabled:[1,`disabled`],selected:[1,`selected`]},outputs:{selected:`selectedChange`},ngContentSelectors:Zd,decls:12,vars:16,consts:[[`role`,`radio`,1,`option-card`,`relative`,`d-flex`,`flex-col`,`gap-3`,`h-full`,`p-4`,`rounded-lg`,`border`,`transition`,3,`click`,`keydown.enter`,`keydown.space`],[1,`option-card-indicator`,`absolute`,`top-0`,`right-0`,`m-4`,`d-flex`,`items-center`,`justify-center`,`rounded-full`],[`name`,`check`,`size`,`xs`,3,`weight`],[1,`d-flex`,`items-center`,`gap-3`,`pr-8`],[1,`option-card-icon`,`d-flex`,`items-center`,`justify-center`,`w-10`,`h-10`,`rounded-md`,`shrink-0`],[1,`d-flex`,`flex-col`,`min-w-0`],[1,`option-card-title`,`font-sans`,`text-xl`,`font-semibold`,`leading-tight`],[1,`option-card-subtitle`,`font-mono`,`text-xs`,`mt-1`],[1,`font-sans`,`text-sm`,`text-on-surface-variant`,`leading-normal`,`m-0`],[1,`d-flex`,`flex-wrap`,`gap-2`,`empty-hidden`],[`size`,`md`,3,`name`]],template:function(e,t){e&1&&(os$1(),ne(0,`div`,0),Te(`click`,function(){return t.select()})(`keydown.enter`,function(){return t.select()})(`keydown.space`,function(r){return r.preventDefault(),t.select()}),ne(1,`span`,1),ze(2,Qd,1,1,`app-icon`,2),re$1(),ne(3,`div`,3),ze(4,Jd,2,1,`div`,4),ne(5,`div`,5)(6,`span`,6),Me(7),re$1(),ze(8,ec,2,1,`span`,7),re$1()(),ze(9,tc,2,1,`p`,8),ne(10,`div`,9),is$1(11),re$1()()),e&2&&(Qt$1(`option-card-selected`,t.selected())(`opacity-50`,t.disabled())(`cursor-not-allowed`,t.disabled())(`cursor-pointer`,!t.disabled()),nt$1(`aria-checked`,t.selected())(`aria-disabled`,t.disabled()||null)(`tabindex`,t.disabled()?-1:0),Z(2),Ge$1(t.selected()?2:-1),Z(2),Ge$1(t.icon()?4:-1),Z(3),Kt$1(t.title()),Z(),Ge$1(t.subtitle()?8:-1),Z(),Ge$1(t.description()?9:-1))},dependencies:[je,Zn$1],styles:[`.option-card[_ngcontent-%COMP%]{background-color:var(--%NS%color-surface-container-low);border-color:var(--%NS%color-surface-container-high);color:var(--%NS%color-on-surface)}.option-card[_ngcontent-%COMP%]:hover:not(.option-card-selected):not([aria-disabled]){border-color:var(--%NS%color-outline-variant)}.option-card[_ngcontent-%COMP%]:focus-visible{outline:.125rem solid var(--%NS%color-primary);outline-offset:.125rem}.option-card-selected[_ngcontent-%COMP%]{background-color:var(--%NS%color-surface-container);border-color:var(--%NS%color-primary)}.option-card-indicator[_ngcontent-%COMP%]{width:1.25rem;height:1.25rem;background-color:var(--%NS%color-surface-container-high);color:var(--%NS%color-on-primary)}.option-card-selected[_ngcontent-%COMP%]   .option-card-indicator[_ngcontent-%COMP%]{background-color:var(--%NS%color-primary-container)}.option-card-icon[_ngcontent-%COMP%]{background-color:var(--%NS%color-surface-container-high);color:var(--%NS%color-on-surface-variant)}.option-card-selected[_ngcontent-%COMP%]   .option-card-icon[_ngcontent-%COMP%]{background-color:var(--%NS%color-primary-container);color:var(--%NS%color-on-primary)}.option-card-subtitle[_ngcontent-%COMP%]{color:var(--%NS%color-outline)}.option-card-selected[_ngcontent-%COMP%]   .option-card-subtitle[_ngcontent-%COMP%]{color:var(--%NS%color-primary);font-weight:700}.option-card-title[_ngcontent-%COMP%]{color:var(--%NS%color-heading)}.empty-hidden[_ngcontent-%COMP%]:empty{display:none}`]})};var nc=[`*`];function ic(n,i){if(n&1&&rt$1(0,`app-icon`,2),n&2)Dt$1(`size`,Ne().size()===`sm`?`xs`:`sm`)(`weight`,700)}function oc(n,i){if(n&1&&rt$1(0,`app-icon`,3),n&2)Dt$1(`size`,Ne().size()===`sm`?`xs`:`sm`)(`weight`,700)}function rc(n,i){if(n&1&&(ne(0,`span`),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.label())}}var Ra=class n{label=B(``);size=B(`md`);indeterminate=B(!1);disabled=B(!1);ariaLabel=B(void 0);checked=rD(!1);toggle(i){i.stopPropagation(),this.disabled()||this.checked.update(e=>!e)}static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-checkbox`]],hostAttrs:[1,`d-inline-flex`],inputs:{label:[1,`label`],size:[1,`size`],indeterminate:[1,`indeterminate`],disabled:[1,`disabled`],ariaLabel:[1,`ariaLabel`],checked:[1,`checked`]},outputs:{checked:`checkedChange`},ngContentSelectors:nc,decls:6,vars:21,consts:[[`type`,`button`,`role`,`checkbox`,1,`d-inline-flex`,`items-center`,`gap-2`,`border-0`,`bg-transparent`,`p-0`,`font-sans`,`text-sm`,`text-on-surface`,3,`click`,`disabled`],[1,`checkbox-box`,`d-inline-flex`,`items-center`,`justify-center`,`rounded-xs`,`shrink-0`,`transition`],[`name`,`remove`,3,`size`,`weight`],[`name`,`check`,3,`size`,`weight`]],template:function(e,t){e&1&&(os$1(),ne(0,`button`,0),Te(`click`,function(r){return t.toggle(r)}),ne(1,`span`,1),ze(2,ic,1,2,`app-icon`,2)(3,oc,1,2,`app-icon`,3),re$1(),ze(4,rc,2,1,`span`),is$1(5),re$1()),e&2&&(Qt$1(`cursor-pointer`,!t.disabled())(`cursor-not-allowed`,t.disabled())(`opacity-50`,t.disabled()),Dt$1(`disabled`,t.disabled()),nt$1(`aria-checked`,t.indeterminate()?`mixed`:t.checked())(`aria-label`,t.ariaLabel()||t.label()||null),Z(),Tc(`width`,t.size()===`md`?`1.25rem`:null)(`height`,t.size()===`md`?`1.25rem`:null),Qt$1(`checkbox-checked`,t.checked()||t.indeterminate())(`w-4`,t.size()===`sm`)(`h-4`,t.size()===`sm`),Z(),Ge$1(t.indeterminate()?2:t.checked()?3:-1),Z(2),Ge$1(t.label()?4:-1))},dependencies:[je,Zn$1],styles:[`.checkbox-box[_ngcontent-%COMP%]{background-color:var(--%NS%color-surface-container-high);border:.0625rem solid var(--%NS%color-outline-variant);color:var(--%NS%color-on-primary)}button[_ngcontent-%COMP%]:focus-visible   .checkbox-box[_ngcontent-%COMP%]{outline:.125rem solid var(--%NS%color-primary);outline-offset:.125rem}button[_ngcontent-%COMP%]:hover:not(:disabled)   .checkbox-box[_ngcontent-%COMP%]:not(.checkbox-checked){border-color:var(--%NS%color-outline)}.checkbox-checked[_ngcontent-%COMP%]{background-color:var(--%NS%color-primary-container);border-color:var(--%NS%color-primary-container)}`]})};function ac(n,i){if(n&1){let e=zn$1();Et$1(0,`img`,2),wy(`error`,function(){At(e);return Rt(Ne().imageFailed.set(!0))}),bt$1()}if(n&2){let e=Ne();by(`src`,e.src(),vv)(`alt`,e.name())}}function sc(n,i){if(n&1&&Me(0),n&2)yn(` `,Ne().initials(),` `)}var Aa=class n{name=B(``);src=B(void 0);size=B(`md`);variant=B(`primary`);imageFailed=V(!1);initials=oe$1(()=>{let i=this.name().trim().split(/\s+/).filter(Boolean);return i.length===0?`?`:i.length===1?i[0].charAt(0).toUpperCase():(i[0].charAt(0)+i[i.length-1].charAt(0)).toUpperCase()});dimension=oe$1(()=>({xs:`1.25rem`,sm:`1.5rem`,md:`2rem`,lg:`2.5rem`})[this.size()]);static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-avatar`]],hostAttrs:[1,`d-inline-flex`],inputs:{name:[1,`name`],src:[1,`src`],size:[1,`size`],variant:[1,`variant`]},decls:3,vars:29,consts:[[`role`,`img`,1,`d-inline-flex`,`items-center`,`justify-center`,`rounded-full`,`overflow-hidden`,`font-sans`,`font-semibold`,`select-none`,`shrink-0`],[1,`w-full`,`h-full`,2,`object-fit`,`cover`,3,`src`,`alt`],[1,`w-full`,`h-full`,2,`object-fit`,`cover`,3,`error`,`src`,`alt`]],template:function(e,t){e&1&&(Et$1(0,`span`,0),ze(1,ac,1,2,`img`,1)(2,sc,1,1),bt$1()),e&2&&(Tc(`width`,t.dimension())(`height`,t.dimension()),Qt$1(`text-2xs`,t.size()===`xs`)(`text-xs`,t.size()===`sm`||t.size()===`md`)(`text-sm`,t.size()===`lg`)(`bg-primary-container`,t.variant()===`primary`)(`text-on-primary`,t.variant()===`primary`)(`bg-secondary`,t.variant()===`secondary`)(`text-on-secondary`,t.variant()===`secondary`)(`bg-tertiary`,t.variant()===`tertiary`)(`text-on-tertiary`,t.variant()===`tertiary`)(`bg-surface-container-highest`,t.variant()===`surface`)(`text-on-surface`,t.variant()===`surface`),nt$1(`title`,t.name()||null)(`aria-label`,t.name()||`Avatar`),Z(),Ge$1(t.src()&&!t.imageFailed()?1:2))},dependencies:[je],styles:[`[_nghost-%COMP%]{display:inline-flex}`]})};function lc(n,i){if(n&1&&(Et$1(0,`span`),Me(1),bt$1()),n&2){let e=Ne();Z(),Kt$1(e.label())}}var Fa=class n{label=B(``);labelPosition=B(`end`);size=B(`md`);disabled=B(!1);ariaLabel=B(void 0);checked=rD(!1);toggle(){this.disabled()||this.checked.update(i=>!i)}static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-toggle-switch`]],hostAttrs:[1,`d-inline-flex`],inputs:{label:[1,`label`],labelPosition:[1,`labelPosition`],size:[1,`size`],disabled:[1,`disabled`],ariaLabel:[1,`ariaLabel`],checked:[1,`checked`]},outputs:{checked:`checkedChange`},decls:4,vars:16,consts:[[`type`,`button`,`role`,`switch`,1,`d-inline-flex`,`items-center`,`gap-2`,`border-0`,`bg-transparent`,`p-0`,`font-sans`,`text-sm`,`text-on-surface`,3,`click`,`disabled`],[1,`switch-track`,`relative`,`d-inline-block`,`rounded-full`,`shrink-0`,`transition`],[1,`switch-thumb`,`absolute`,`rounded-full`,`transition`]],template:function(e,t){e&1&&(Et$1(0,`button`,0),wy(`click`,function(){return t.toggle()}),Et$1(1,`span`,1),Ro(2,`span`,2),bt$1(),ze(3,lc,2,1,`span`),bt$1()),e&2&&(Qt$1(`flex-row-rev`,t.labelPosition()===`start`)(`cursor-pointer`,!t.disabled())(`cursor-not-allowed`,t.disabled())(`opacity-50`,t.disabled()),by(`disabled`,t.disabled()),nt$1(`aria-checked`,t.checked())(`aria-label`,t.ariaLabel()||t.label()||null),Z(),Qt$1(`switch-on`,t.checked())(`switch-sm`,t.size()===`sm`),Z(2),Ge$1(t.label()?3:-1))},dependencies:[je],styles:[`.switch-track[_ngcontent-%COMP%]{--%NS%track-w: 2.25rem;--%NS%track-h: 1.25rem;--%NS%thumb: .875rem;width:var(--%NS%track-w);height:var(--%NS%track-h);background-color:var(--%NS%color-surface-container-highest);border:.0625rem solid var(--%NS%color-outline-variant)}.switch-sm[_ngcontent-%COMP%]{--%NS%track-w: 1.75rem;--%NS%track-h: 1rem;--%NS%thumb: .625rem}.switch-thumb[_ngcontent-%COMP%]{width:var(--%NS%thumb);height:var(--%NS%thumb);top:50%;left:.125rem;transform:translateY(-50%);background-color:var(--%NS%color-outline)}.switch-on[_ngcontent-%COMP%]{background-color:var(--%NS%color-primary-container);border-color:var(--%NS%color-primary-container)}.switch-on[_ngcontent-%COMP%]   .switch-thumb[_ngcontent-%COMP%]{left:calc(var(--%NS%track-w) - var(--%NS%thumb) - .25rem);background-color:var(--%NS%color-on-primary)}button[_ngcontent-%COMP%]:focus-visible   .switch-track[_ngcontent-%COMP%]{outline:.125rem solid var(--%NS%color-primary);outline-offset:.125rem}`]})};var co=new y(`CdkAccordion`);var Pa=(()=>{class n{_stateChanges=new K;_openCloseAllActions=new K;id=p(ee).getId(`cdk-accordion-`);multi=!1;openAll(){this.multi&&this._openCloseAllActions.next(!0)}closeAll(){this._openCloseAllActions.next(!1)}ngOnChanges(e){this._stateChanges.next(e)}ngOnDestroy(){this._stateChanges.complete(),this._openCloseAllActions.complete()}static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[`cdk-accordion`],[``,`cdkAccordion`,``]],inputs:{multi:[2,`multi`,`multi`,xr$1]},exportAs:[`cdkAccordion`],features:[Dn([{provide:co,useExisting:n}]),yt$1]})}return n})();var La=(()=>{class n{accordion=p(co,{optional:!0,skipSelf:!0});_changeDetectorRef=p(Rr$1);_expansionDispatcher=p(Qr);_openCloseAllSubscription=ce.EMPTY;closed=new ge;opened=new ge;destroyed=new ge;expandedChange=new ge;id=p(ee).getId(`cdk-accordion-child-`);get expanded(){return this._expanded}set expanded(e){if(this._expanded!==e){if(this._expanded=e,this.expandedChange.emit(e),e){this.opened.emit();let t=this.accordion?this.accordion.id:this.id;this._expansionDispatcher.notify(this.id,t)}else this.closed.emit();this._changeDetectorRef.markForCheck()}}_expanded=!1;get disabled(){return this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=V(!1);_removeUniqueSelectionListener=()=>{};ngOnInit(){this._removeUniqueSelectionListener=this._expansionDispatcher.listen((e,t)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===t&&this.id!==e&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(e=>{this.disabled||(this.expanded=e)})}static ɵfac=function(t){return new(t||n)};static ɵdir=ve({type:n,selectors:[[`cdk-accordion-item`],[``,`cdkAccordionItem`,``]],inputs:{expanded:[2,`expanded`,`expanded`,xr$1],disabled:[2,`disabled`,`disabled`,xr$1]},outputs:{closed:`closed`,opened:`opened`,destroyed:`destroyed`,expandedChange:`expandedChange`},exportAs:[`cdkAccordionItem`],features:[Dn([{provide:co,useValue:void 0}])]})}return n})();var dc=[`*`];var za=class n{multi=B(!1);static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-accordion`]],hostAttrs:[1,`d-flex`,`flex-col`,`w-full`,`gap-2`],inputs:{multi:[1,`multi`]},ngContentSelectors:dc,decls:2,vars:1,consts:[[`cdkAccordion`,``,1,`w-full`,`flex`,`flex-col`,`gap-2`,3,`multi`]],template:function(e,t){e&1&&(os$1(),ne(0,`div`,0),is$1(1),re$1()),e&2&&Dt$1(`multi`,t.multi())},dependencies:[je,Pa],styles:[`[_nghost-%COMP%]{display:flex}`]})};var cc=[`*`];function mc(n,i){if(n&1&&rt$1(0,`app-icon`,4),n&2){let e=Ne();Dt$1(`name`,e.icon())(`color`,e.iconColor())}}function uc(n,i){if(n&1&&(ne(0,`span`,7),Me(1),re$1()),n&2){let e=Ne();Z(),Kt$1(e.subtitle())}}function pc(n,i){if(n&1&&rt$1(0,`app-badge`,9),n&2){let e=Ne();Dt$1(`label`,e.badge())(`variant`,e.badgeVariant())}}function fc(n,i){if(n&1&&(ne(0,`div`,11),is$1(1),re$1()),n&2){Ne();let e=sT(1);nt$1(`id`,`accordion-body-`+e.id)(`aria-labelledby`,`accordion-header-`+e.id)}}var Ba=class n{title=B(``);subtitle=B(void 0);icon=B(void 0);iconColor=B(void 0);badge=B(void 0);badgeVariant=B(`surface`);disabled=B(!1);expanded=rD(!1);static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-accordion-item`]],hostAttrs:[1,`d-block`,`w-full`],inputs:{title:[1,`title`],subtitle:[1,`subtitle`],icon:[1,`icon`],iconColor:[1,`iconColor`],badge:[1,`badge`],badgeVariant:[1,`badgeVariant`],disabled:[1,`disabled`],expanded:[1,`expanded`]},outputs:{expanded:`expandedChange`},ngContentSelectors:cc,decls:13,vars:21,consts:[[`accordionItem`,`cdkAccordionItem`],[`cdkAccordionItem`,``,`role`,`button`,`tabindex`,`0`,1,`w-full`,`rounded-lg`,`border`,`border-surface-highest`,`overflow-hidden`,`transition-colors`,3,`expandedChange`,`expanded`,`disabled`],[`type`,`button`,1,`w-full`,`flex`,`items-center`,`justify-between`,`p-3.5`,`text-left`,`bg-transparent`,`border-0`,`text-white`,`cursor-pointer`,`select-none`,`transition-colors`,`hover-bg-surface-container-high`,3,`click`,`disabled`],[1,`flex`,`items-center`,`gap-2.5`,`min-w-0`],[`size`,`sm`,3,`name`,`color`],[1,`flex`,`flex-col`,`min-w-0`],[1,`text-xs`,`font-semibold`,`text-white`,`tracking-wide`,`truncate`],[1,`text-xs`,`text-outline`,`font-normal`,`truncate`],[1,`flex`,`items-center`,`gap-2.5`,`flex-shrink-0`],[`size`,`sm`,3,`label`,`variant`],[`name`,`expand_more`,`size`,`sm`,1,`transition-transform`,`duration-200`],[`role`,`region`,1,`p-4`,`border-t`,`border-surface-highest`,`bg-surface-container-lowest`,`text-xs`,`text-on-surface-variant`,`leading-relaxed`,`font-sans`]],template:function(e,t){if(e&1){let o=zn$1();os$1(),ne(0,`div`,1,0),Vy(`expandedChange`,function(a){return At(o),AT(t.expanded,a)||(t.expanded=a),Rt(a)}),ne(2,`button`,2),Te(`click`,function(){At(o);return Rt(sT(1).toggle())}),ne(3,`div`,3),ze(4,mc,1,2,`app-icon`,4),ne(5,`div`,5)(6,`span`,6),Me(7),re$1(),ze(8,uc,2,1,`span`,7),re$1()(),ne(9,`div`,8),ze(10,pc,1,2,`app-badge`,9),rt$1(11,`app-icon`,10),re$1()(),ze(12,fc,2,2,`div`,11),re$1()}if(e&2){let o=sT(1);Qt$1(`bg-surface-container-low`,o.expanded)(`bg-surface-container`,!o.expanded)(`opacity-50`,t.disabled()),jy(`expanded`,t.expanded),Dt$1(`disabled`,t.disabled()),nt$1(`id`,`accordion-header-`+o.id)(`aria-expanded`,o.expanded)(`aria-controls`,`accordion-body-`+o.id),Z(2),Qt$1(`cursor-not-allowed`,t.disabled()),Dt$1(`disabled`,t.disabled()),Z(2),Ge$1(t.icon()?4:-1),Z(3),Kt$1(t.title()),Z(),Ge$1(t.subtitle()?8:-1),Z(2),Ge$1(t.badge()?10:-1),Z(),Qt$1(`rotate-180`,o.expanded),Z(),Ge$1(o.expanded?12:-1)}},dependencies:[je,La,Zn$1,St],styles:[`[_nghost-%COMP%]{display:block}.rotate-180[_ngcontent-%COMP%]{transform:rotate(180deg)}`]})};var hc=[[[``,`pane-1`,``]],[[``,`pane-2`,``]]];var gc=[`[pane-1]`,`[pane-2]`];var Va=class n{elementRef=p(et);direction=B(`horizontal`);split=rD(50);minSize=B(15);maxSize=B(85);gutterSize=B(`0.375rem`);isDragging=V(!1);pane1Style=oe$1(()=>{let i=this.split();return this.direction()===`horizontal`?{width:`${i}%`,height:`100%`}:{height:`${i}%`,width:`100%`}});pane2Style=oe$1(()=>{let i=100-this.split();return this.direction()===`horizontal`?{width:`${i}%`,height:`100%`}:{height:`${i}%`,width:`100%`}});gutterStyle=oe$1(()=>{let i=this.gutterSize();return this.direction()===`horizontal`?{width:i,cursor:`col-resize`}:{height:i,cursor:`row-resize`}});onGutterMouseDown(i){i.preventDefault(),this.isDragging.set(!0)}onMouseMove(i){if(!this.isDragging())return;let e=this.elementRef.nativeElement.getBoundingClientRect(),t;this.direction()===`horizontal`?t=(i.clientX-e.left)/e.width*100:t=(i.clientY-e.top)/e.height*100;let o=Math.min(Math.max(t,this.minSize()),this.maxSize());this.split.set(Math.round(o*10)/10)}onMouseUp(){this.isDragging()&&this.isDragging.set(!1)}static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-split-pane`]],hostAttrs:[1,`d-flex`,`w-full`,`h-full`,`overflow-hidden`,`relative`,`select-none`],hostVars:4,hostBindings:function(e,t){e&1&&Te(`mousemove`,function(r){return t.onMouseMove(r)},m_)(`mouseup`,function(){return t.onMouseUp()},m_),e&2&&Qt$1(`flex-row`,t.direction()===`horizontal`)(`flex-col`,t.direction()===`vertical`)},inputs:{direction:[1,`direction`],split:[1,`split`],minSize:[1,`minSize`],maxSize:[1,`maxSize`],gutterSize:[1,`gutterSize`]},outputs:{split:`splitChange`},ngContentSelectors:gc,decls:6,vars:15,consts:[[1,`relative`,`overflow-hidden`,`flex`,`flex-col`,`min-w-0`,`min-h-0`,3,`ngStyle`],[1,`gutter`,`flex`,`items-center`,`justify-center`,`flex-shrink-0`,`relative`,`transition-colors`,`duration-150`,`hover-bg-primary`,3,`mousedown`,`ngStyle`],[1,`rounded-full`,`bg-outline-variant`],[1,`relative`,`overflow-hidden`,`flex`,`flex-col`,`min-w-0`,`min-h-0`,`flex-1`,3,`ngStyle`]],template:function(e,t){e&1&&(os$1(hc),ne(0,`div`,0),is$1(1),re$1(),ne(2,`div`,1),Te(`mousedown`,function(r){return t.onGutterMouseDown(r)}),rt$1(3,`div`,2),re$1(),ne(4,`div`,3),is$1(5,1),re$1()),e&2&&(Dt$1(`ngStyle`,t.pane1Style()),Z(2),Qt$1(`bg-surface-container-highest`,!t.isDragging())(`bg-primary`,t.isDragging()),Dt$1(`ngStyle`,t.gutterStyle()),Z(),Qt$1(`w-1`,t.direction()===`horizontal`)(`h-4`,t.direction()===`horizontal`)(`h-1`,t.direction()===`vertical`)(`w-4`,t.direction()===`vertical`),Z(),Dt$1(`ngStyle`,t.pane2Style()))},dependencies:[je,TM],styles:[`[_nghost-%COMP%]{display:flex}.gutter[_ngcontent-%COMP%]{z-index:10;-webkit-user-select:none;user-select:none}`]})};var bc=(n,i)=>i.name;function _c(n,i){if(n&1){let e=zn$1();ne(0,`div`,14)(1,`span`,15),Me(2),re$1(),ne(3,`div`,16)(4,`input`,17),Vy(`ngModelChange`,function(o){let r=At(e).$implicit;return AT(r.value,o)||(r.value=o),Rt(o)}),re$1(),GI(),re$1()()}if(n&2){let e=i.$implicit;Z(2),yn(``,e.name,` =`),Z(2),jy(`ngModel`,e.value),Dt$1(`placeholder`,`Enter value for `+e.name),WI()}}function vc(n,i){n&1&&(ne(0,`div`,13),zf(1,_c,5,3,`div`,14,bc),re$1()),n&2&&(Z(),Gf(i.params))}function yc(n,i){if(n&1){let e=zn$1();ne(0,`app-segmented-control`,10),Vy(`valueChange`,function(o){At(e);let r=Ne();return AT(r.activeCaseIndex,o)||(r.activeCaseIndex=o),Rt(o)}),ne(1,`button`,11),Te(`click`,function(){At(e);return Rt(Ne().addCustomCase())}),rt$1(2,`app-icon`,12),re$1(),ze(3,vc,3,0,`div`,13),re$1()}if(n&2){let e,t=Ne();Dt$1(`options`,t.caseOptions()),jy(`value`,t.activeCaseIndex),Z(3),Ge$1((e=t.activeCase())?3:-1,e)}}function xc(n,i){if(n&1&&(ne(0,`span`,23),Me(1,` Runtime: `),ne(2,`strong`,26),Me(3),re$1()()),n&2){let e=Ne();Z(3),yn(``,e.runtimeMs,` ms`)}}function Cc(n,i){if(n&1&&(ne(0,`span`,23),Me(1,` Memory: `),ne(2,`strong`,26),Me(3),re$1()()),n&2){let e=Ne();Z(3),yn(``,e.memoryMb,` MB`)}}function Sc(n,i){if(n&1&&(ne(0,`div`,25)(1,`span`,27),Me(2,`Input`),re$1(),ne(3,`div`,28),Me(4),re$1()()),n&2){let e=Ne();Z(4),yn(` `,e.input,` `)}}function wc(n,i){if(n&1&&(ne(0,`div`,25)(1,`span`,27),Me(2,`Output`),re$1(),ne(3,`div`,28),Me(4),re$1()()),n&2){let e=Ne();Z(4),yn(` `,e.output,` `)}}function Nc(n,i){if(n&1&&(ne(0,`div`,25)(1,`span`,27),Me(2,`Expected`),re$1(),ne(3,`div`,29),Me(4),re$1()()),n&2){let e=Ne();Z(4),yn(` `,e.expectedOutput,` `)}}function Ec(n,i){if(n&1&&(ne(0,`div`,25)(1,`span`,30),Me(2,`Error Message`),re$1(),ne(3,`div`,31),Me(4),re$1()()),n&2){let e=Ne();Z(4),yn(` `,e.errorMessage,` `)}}function Mc(n,i){if(n&1&&(ne(0,`div`,18),Me(1,`
~ `),ne(2,`div`,20)(3,`div`,21),rt$1(4,`app-badge`,22),ze(5,xc,4,1,`span`,23),ze(6,Cc,4,1,`span`,23),re$1()(),ne(7,`div`,24),ze(8,Sc,5,1,`div`,25),ze(9,wc,5,1,`div`,25),ze(10,Nc,5,1,`div`,25),ze(11,Ec,5,1,`div`,25),re$1()()),n&2){let e=i,t=Ne(2);Z(4),Dt$1(`label`,t.formattedResultStatus())(`variant`,t.resultBadgeVariant()),Z(),Ge$1(e.runtimeMs!==void 0?5:-1),Z(),Ge$1(e.memoryMb!==void 0?6:-1),Z(2),Ge$1(e.input?8:-1),Z(),Ge$1(e.output?9:-1),Z(),Ge$1(e.expectedOutput?10:-1),Z(),Ge$1(e.errorMessage?11:-1)}}function Dc(n,i){n&1&&(ne(0,`div`,19),rt$1(1,`app-icon`,32),ne(2,`span`,33),Me(3,`You must run your code to view test results.`),re$1()())}function kc(n,i){if(n&1&&ze(0,Mc,12,8,`div`,18)(1,Dc,4,0,`div`,19),n&2){let e;Ge$1((e=Ne().testResult())?0:1,e)}}var ja=class n{testcases=rD([]);activeTab=rD(`testcase`);activeCaseIndex=rD(0);testResult=B(null);isRunning=B(!1);isSubmitting=B(!1);runClicked=Ar$1();submitClicked=Ar$1();consoleTabOptions=[{label:`Testcase`,value:`testcase`,icon:`check_box`},{label:`Test Result`,value:`result`,icon:`terminal`}];caseOptions=oe$1(()=>this.testcases().map((i,e)=>({label:i.label,value:e})));activeCase=oe$1(()=>{let i=this.testcases();return i[this.activeCaseIndex()??0]||i[0]||null});resultBadgeVariant=oe$1(()=>{let i=this.testResult();return i?i.status===`ACCEPTED`?`secondary`:i.status===`WRONG_ANSWER`||i.status===`COMPILE_ERROR`||i.status===`RUNTIME_ERROR`?`error`:`tertiary`:`surface`});formattedResultStatus=oe$1(()=>{let i=this.testResult();if(!i)return`Ready`;switch(i.status){case`ACCEPTED`:return`Accepted`;case`WRONG_ANSWER`:return`Wrong Answer`;case`COMPILE_ERROR`:return`Compile Error`;case`RUNTIME_ERROR`:return`Runtime Error`;case`TIME_LIMIT_EXCEEDED`:return`Time Limit Exceeded`;default:return i.status}});setTab(i){this.activeTab.set(i)}selectCase(i){this.activeCaseIndex.set(i)}addCustomCase(){let i=this.testcases(),e=i.length+1,t=i[0]?.params.map(r=>({name:r.name,value:``}))??[{name:`input`,value:``}],o={id:e,label:`Case ${e}`,params:t};this.testcases.set([...i,o]),this.activeCaseIndex.set(i.length)}onRun(){let i=this.activeCase();i&&this.runClicked.emit(i)}onSubmit(){this.submitClicked.emit()}static ɵfac=function(e){return new(e||n)};static ɵcmp=Ee({type:n,selectors:[[`app-testcase-console`]],hostAttrs:[1,`d-flex`,`flex-col`,`w-full`,`h-full`,`bg-surface-container-lowest`,`border`,`border-surface-highest`,`rounded-xl`,`overflow-hidden`],inputs:{testcases:[1,`testcases`],activeTab:[1,`activeTab`],activeCaseIndex:[1,`activeCaseIndex`],testResult:[1,`testResult`],isRunning:[1,`isRunning`],isSubmitting:[1,`isSubmitting`]},outputs:{testcases:`testcasesChange`,activeTab:`activeTabChange`,activeCaseIndex:`activeCaseIndexChange`,runClicked:`runClicked`,submitClicked:`submitClicked`},decls:14,vars:5,consts:[[`size`,`sm`,`headerClass`,`px-3 py-2 border-b border-surface-highest bg-surface-container select-none`,1,`flex-1`,`flex`,`flex-col`,`min-h-0`,`w-full`,3,`valueChange`,`options`,`value`],[1,`flex-1`,`overflow-y-auto`,`p-4`,`flex`,`flex-col`,`gap-3`,`min-h-0`],[`size`,`sm`,3,`options`,`value`],[1,`flex`,`items-center`,`justify-between`,`px-3`,`py-2`,`border-t`,`border-surface-highest`,`bg-surface-container`,`select-none`],[1,`flex`,`items-center`,`gap-1.5`,`text-xs`,`text-outline`,`cursor-pointer`,`hover-text-white`],[`name`,`terminal`,`size`,`xs`],[1,`font-medium`],[1,`flex`,`items-center`,`gap-2`],[`variant`,`surface`,`size`,`sm`,`icon`,`play_arrow`,`iconPosition`,`start`,3,`clicked`,`loading`],[`variant`,`primary`,`size`,`sm`,`icon`,`cloud_upload`,`iconPosition`,`start`,3,`clicked`,`loading`],[`size`,`sm`,3,`valueChange`,`options`,`value`],[`trailing`,``,`type`,`button`,`title`,`Add new testcase`,1,`w-7`,`h-7`,`flex`,`items-center`,`justify-center`,`rounded-lg`,`bg-surface-container`,`text-outline`,`hover-text-white`,`hover-bg-surface-container-high`,`border-0`,`cursor-pointer`,3,`click`],[`name`,`add`,`size`,`xs`],[1,`flex`,`flex-col`,`gap-3`,`mt-3`],[1,`flex`,`flex-col`,`gap-1.5`],[1,`text-xs`,`font-mono`,`text-outline`,`font-medium`],[1,`rounded-lg`,`bg-surface-container`,`border`,`border-surface-highest`,`p-2.5`],[`type`,`text`,1,`w-full`,`bg-transparent`,`border-0`,`outline-none`,`text-white`,`font-mono`,`text-xs`,3,`ngModelChange`,`ngModel`,`placeholder`],[1,`flex`,`flex-col`,`gap-4`],[1,`flex`,`flex-col`,`items-center`,`justify-center`,`p-8`,`text-outline`,`gap-2`],[1,`flex`,`items-center`,`justify-between`],[1,`flex`,`items-center`,`gap-2.5`],[`shape`,`pill`,`size`,`md`,3,`label`,`variant`],[1,`text-xs`,`font-mono`,`text-outline`],[1,`flex`,`flex-col`,`gap-3`,`font-mono`,`text-xs`],[1,`flex`,`flex-col`,`gap-1`],[1,`text-white`],[1,`text-outline`,`font-semibold`],[1,`p-2.5`,`rounded-lg`,`bg-surface-container`,`border`,`border-surface-highest`,`text-white`],[1,`p-2.5`,`rounded-lg`,`bg-surface-container`,`border`,`border-surface-highest`,`text-secondary`],[1,`text-error`,`font-semibold`],[1,`p-2.5`,`rounded-lg`,`bg-surface-container`,`border`,`border-error`,`text-error`,`whitespace-pre-wrap`],[`name`,`terminal`,`size`,`lg`],[1,`text-xs`]],template:function(e,t){e&1&&(ne(0,`app-segmented-control`,0),Vy(`valueChange`,function(r){return AT(t.activeTab,r)||(t.activeTab=r),r}),ne(1,`div`,1),ze(2,yc,4,3,`app-segmented-control`,2)(3,kc,2,1),re$1()(),ne(4,`div`,3)(5,`div`,4),rt$1(6,`app-icon`,5),ne(7,`span`,6),Me(8,`Console`),re$1()(),ne(9,`div`,7)(10,`app-button`,8),Te(`clicked`,function(){return t.onRun()}),Me(11,` Run `),re$1(),ne(12,`app-button`,9),Te(`clicked`,function(){return t.onSubmit()}),Me(13,` Submit `),re$1()()()),e&2&&(Dt$1(`options`,t.consoleTabOptions),jy(`value`,t.activeTab),Z(2),Ge$1(t.activeTab()===`testcase`?2:t.activeTab()===`result`?3:-1),Z(8),Dt$1(`loading`,t.isRunning()),Z(2),Dt$1(`loading`,t.isSubmitting()))},dependencies:[je,nW,$E,eW,eR,St,Yn,Zn$1,ui],styles:[`[_nghost-%COMP%]{display:flex}`]})};function Ha(){if(typeof navigator>`u`)return!1;let n=navigator.platform||navigator.userAgentData?.platform||navigator.userAgent||``;return/Mac|iPhone|iPod|iPad/i.test(n)}function Ty(){return Ha()?`cmd`:`Ctrl`}function Wa(n){return Ha()?n.metaKey&&!n.ctrlKey:n.ctrlKey&&!n.metaKey}var Ua=class n{enabled=B(!0,{alias:`appRunShortcuts`,transform:xr$1});listenGlobal=B(!0,{transform:xr$1});allowInInputs=B(!1,{transform:xr$1});run=Ar$1();submit=Ar$1();onDocumentKeyDown(i){!this.enabled()||!this.listenGlobal()||this.handleKeyEvent(i)}onHostKeyDown(i){!this.enabled()||this.listenGlobal()||this.handleKeyEvent(i)}handleKeyEvent(i){if(i.key!==`Enter`||!Wa(i))return;let e=i.target;e?.tagName?.toLowerCase()===`input`&&!e?.classList.contains(`monaco-editor`)&&!this.allowInInputs()||(i.preventDefault(),i.stopPropagation(),i.shiftKey?this.submit.emit():this.run.emit())}static ɵfac=function(e){return new(e||n)};static ɵdir=ve({type:n,selectors:[[``,`appRunShortcuts`,``]],hostBindings:function(e,t){e&1&&Te(`keydown`,function(r){return t.onDocumentKeyDown(r)},m_)(`keydown`,function(r){return t.onHostKeyDown(r)})},inputs:{enabled:[1,`appRunShortcuts`,`enabled`],listenGlobal:[1,`listenGlobal`],allowInInputs:[1,`allowInInputs`]},outputs:{run:`run`,submit:`submit`}})};export{pe as A,at as C,li as D,ja as E,ui as M,xe as N,lo as O,za as P,ai as S,ee as T,Ua as _,De as a,Yn as b,Gi as c,Oa as d,Ra as f,Ty as g,St as h,Bt as i,si as j,mi as k,Ia as l,Sa as m,Aa as n,Di as o,Re as p,Ba as r,Fa as s,$r as t,Ni as u,Va as v,bt as w,Zr as x,Vt as y};