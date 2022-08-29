import e,{useState as n,useRef as t,useEffect as r}from"react";function a(e){var n={exports:{}};return e(n,n.exports),n.exports}var i="function"==typeof Symbol&&Symbol.for,o=i?Symbol.for("react.element"):60103,u=i?Symbol.for("react.portal"):60106,s=i?Symbol.for("react.fragment"):60107,c=i?Symbol.for("react.strict_mode"):60108,l=i?Symbol.for("react.profiler"):60114,m=i?Symbol.for("react.provider"):60109,d=i?Symbol.for("react.context"):60110,p=i?Symbol.for("react.async_mode"):60111,f=i?Symbol.for("react.concurrent_mode"):60111,b=i?Symbol.for("react.forward_ref"):60112,y=i?Symbol.for("react.suspense"):60113,g=i?Symbol.for("react.suspense_list"):60120,v=i?Symbol.for("react.memo"):60115,h=i?Symbol.for("react.lazy"):60116,M=i?Symbol.for("react.block"):60121,S=i?Symbol.for("react.fundamental"):60117,E=i?Symbol.for("react.responder"):60118,_=i?Symbol.for("react.scope"):60119;function w(e){if("object"==typeof e&&null!==e){var n=e.$$typeof;switch(n){case o:switch(e=e.type){case p:case f:case s:case l:case c:case y:return e;default:switch(e=e&&e.$$typeof){case d:case b:case h:case v:case m:return e;default:return n}}case u:return n}}}function k(e){return w(e)===f}var N={AsyncMode:p,ConcurrentMode:f,ContextConsumer:d,ContextProvider:m,Element:o,ForwardRef:b,Fragment:s,Lazy:h,Memo:v,Portal:u,Profiler:l,StrictMode:c,Suspense:y,isAsyncMode:function(e){return k(e)||w(e)===p},isConcurrentMode:k,isContextConsumer:function(e){return w(e)===d},isContextProvider:function(e){return w(e)===m},isElement:function(e){return"object"==typeof e&&null!==e&&e.$$typeof===o},isForwardRef:function(e){return w(e)===b},isFragment:function(e){return w(e)===s},isLazy:function(e){return w(e)===h},isMemo:function(e){return w(e)===v},isPortal:function(e){return w(e)===u},isProfiler:function(e){return w(e)===l},isStrictMode:function(e){return w(e)===c},isSuspense:function(e){return w(e)===y},isValidElementType:function(e){return"string"==typeof e||"function"==typeof e||e===s||e===f||e===l||e===c||e===y||e===g||"object"==typeof e&&null!==e&&(e.$$typeof===h||e.$$typeof===v||e.$$typeof===m||e.$$typeof===d||e.$$typeof===b||e.$$typeof===S||e.$$typeof===E||e.$$typeof===_||e.$$typeof===M)},typeOf:w},O=a(function(e,n){"production"!==process.env.NODE_ENV&&function(){var e="function"==typeof Symbol&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,a=e?Symbol.for("react.fragment"):60107,i=e?Symbol.for("react.strict_mode"):60108,o=e?Symbol.for("react.profiler"):60114,u=e?Symbol.for("react.provider"):60109,s=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,l=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,d=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,f=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,y=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,v=e?Symbol.for("react.responder"):60118,h=e?Symbol.for("react.scope"):60119;function M(e){if("object"==typeof e&&null!==e){var n=e.$$typeof;switch(n){case t:var p=e.type;switch(p){case c:case l:case a:case o:case i:case d:return p;default:var y=p&&p.$$typeof;switch(y){case s:case m:case b:case f:case u:return y;default:return n}}case r:return n}}}var S=l,E=s,_=u,w=t,k=m,N=a,O=b,C=f,R=r,T=o,$=i,j=d,x=!1;function P(e){return M(e)===l}n.AsyncMode=c,n.ConcurrentMode=S,n.ContextConsumer=E,n.ContextProvider=_,n.Element=w,n.ForwardRef=k,n.Fragment=N,n.Lazy=O,n.Memo=C,n.Portal=R,n.Profiler=T,n.StrictMode=$,n.Suspense=j,n.isAsyncMode=function(e){return x||(x=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),P(e)||M(e)===c},n.isConcurrentMode=P,n.isContextConsumer=function(e){return M(e)===s},n.isContextProvider=function(e){return M(e)===u},n.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===t},n.isForwardRef=function(e){return M(e)===m},n.isFragment=function(e){return M(e)===a},n.isLazy=function(e){return M(e)===b},n.isMemo=function(e){return M(e)===f},n.isPortal=function(e){return M(e)===r},n.isProfiler=function(e){return M(e)===o},n.isStrictMode=function(e){return M(e)===i},n.isSuspense=function(e){return M(e)===d},n.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===a||e===l||e===o||e===i||e===d||e===p||"object"==typeof e&&null!==e&&(e.$$typeof===b||e.$$typeof===f||e.$$typeof===u||e.$$typeof===s||e.$$typeof===m||e.$$typeof===g||e.$$typeof===v||e.$$typeof===h||e.$$typeof===y)},n.typeOf=M}()}),C=a(function(e){e.exports="production"===process.env.NODE_ENV?N:O}),R=Object.getOwnPropertySymbols,T=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;function j(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var x=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var n={},t=0;t<10;t++)n["_"+String.fromCharCode(t)]=t;var r=Object.getOwnPropertyNames(n).map(function(e){return n[e]});if("0123456789"!==r.join(""))return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach(function(e){a[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},a)).join("")}catch(e){return!1}}()?Object.assign:function(e,n){for(var t,r,a=j(e),i=1;i<arguments.length;i++){for(var o in t=Object(arguments[i]))T.call(t,o)&&(a[o]=t[o]);if(R){r=R(t);for(var u=0;u<r.length;u++)$.call(t,r[u])&&(a[r[u]]=t[r[u]])}}return a},P=Function.call.bind(Object.prototype.hasOwnProperty),q="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",D=P,I=function(){};if("production"!==process.env.NODE_ENV){var H=q,F={},A=D;I=function(e){var n="Warning: "+e;"undefined"!=typeof console&&console.error(n);try{throw new Error(n)}catch(e){}}}function L(e,n,t,r,a){if("production"!==process.env.NODE_ENV)for(var i in e)if(A(e,i)){var o;try{if("function"!=typeof e[i]){var u=Error((r||"React class")+": "+t+" type `"+i+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[i]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw u.name="Invariant Violation",u}o=e[i](n,i,r,t,null,H)}catch(e){o=e}if(!o||o instanceof Error||I((r||"React class")+": type specification of "+t+" `"+i+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof o+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),o instanceof Error&&!(o.message in F)){F[o.message]=!0;var s=a?a():"";I("Failed "+t+" type: "+o.message+(null!=s?s:""))}}}L.resetWarningCache=function(){"production"!==process.env.NODE_ENV&&(F={})};var V=L,W=function(){};function B(){return null}function K(){}function z(){}"production"!==process.env.NODE_ENV&&(W=function(e){var n="Warning: "+e;"undefined"!=typeof console&&console.error(n);try{throw new Error(n)}catch(e){}}),z.resetWarningCache=K;var U=a(function(e){e.exports="production"!==process.env.NODE_ENV?function(e,n){var t="function"==typeof Symbol&&Symbol.iterator,r="<<anonymous>>",a={array:s("array"),bigint:s("bigint"),bool:s("boolean"),func:s("function"),number:s("number"),object:s("object"),string:s("string"),symbol:s("symbol"),any:u(B),arrayOf:function(e){return u(function(n,t,r,a,i){if("function"!=typeof e)return new o("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var u=n[t];if(!Array.isArray(u))return new o("Invalid "+a+" `"+i+"` of type `"+m(u)+"` supplied to `"+r+"`, expected an array.");for(var s=0;s<u.length;s++){var c=e(u,s,r,a,i+"["+s+"]",q);if(c instanceof Error)return c}return null})},element:u(function(n,t,r,a,i){var u=n[t];return e(u)?null:new o("Invalid "+a+" `"+i+"` of type `"+m(u)+"` supplied to `"+r+"`, expected a single ReactElement.")}),elementType:u(function(e,n,t,r,a){var i=e[n];return C.isValidElementType(i)?null:new o("Invalid "+r+" `"+a+"` of type `"+m(i)+"` supplied to `"+t+"`, expected a single ReactElement type.")}),instanceOf:function(e){return u(function(n,t,a,i,u){return n[t]instanceof e?null:new o("Invalid "+i+" `"+u+"` of type `"+((s=n[t]).constructor&&s.constructor.name?s.constructor.name:r)+"` supplied to `"+a+"`, expected instance of `"+(e.name||r)+"`.");var s})},node:u(function(e,n,t,r,a){return l(e[n])?null:new o("Invalid "+r+" `"+a+"` supplied to `"+t+"`, expected a ReactNode.")}),objectOf:function(e){return u(function(n,t,r,a,i){if("function"!=typeof e)return new o("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var u=n[t],s=m(u);if("object"!==s)return new o("Invalid "+a+" `"+i+"` of type `"+s+"` supplied to `"+r+"`, expected an object.");for(var c in u)if(D(u,c)){var l=e(u,c,r,a,i+"."+c,q);if(l instanceof Error)return l}return null})},oneOf:function(e){if(!Array.isArray(e))return"production"!==process.env.NODE_ENV&&W(arguments.length>1?"Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).":"Invalid argument supplied to oneOf, expected an array."),B;function n(n,t,r,a,u){for(var s=n[t],c=0;c<e.length;c++)if(i(s,e[c]))return null;var l=JSON.stringify(e,function(e,n){return"symbol"===d(n)?String(n):n});return new o("Invalid "+a+" `"+u+"` of value `"+String(s)+"` supplied to `"+r+"`, expected one of "+l+".")}return u(n)},oneOfType:function(e){if(!Array.isArray(e))return"production"!==process.env.NODE_ENV&&W("Invalid argument supplied to oneOfType, expected an instance of array."),B;for(var n=0;n<e.length;n++){var t=e[n];if("function"!=typeof t)return W("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+p(t)+" at index "+n+"."),B}return u(function(n,t,r,a,i){for(var u=[],s=0;s<e.length;s++){var c=(0,e[s])(n,t,r,a,i,q);if(null==c)return null;c.data&&D(c.data,"expectedType")&&u.push(c.data.expectedType)}return new o("Invalid "+a+" `"+i+"` supplied to `"+r+"`"+(u.length>0?", expected one of type ["+u.join(", ")+"]":"")+".")})},shape:function(e){return u(function(n,t,r,a,i){var u=n[t],s=m(u);if("object"!==s)return new o("Invalid "+a+" `"+i+"` of type `"+s+"` supplied to `"+r+"`, expected `object`.");for(var l in e){var p=e[l];if("function"!=typeof p)return c(r,a,i,l,d(p));var f=p(u,l,r,a,i+"."+l,q);if(f)return f}return null})},exact:function(e){return u(function(n,t,r,a,i){var u=n[t],s=m(u);if("object"!==s)return new o("Invalid "+a+" `"+i+"` of type `"+s+"` supplied to `"+r+"`, expected `object`.");var l=x({},n[t],e);for(var p in l){var f=e[p];if(D(e,p)&&"function"!=typeof f)return c(r,a,i,p,d(f));if(!f)return new o("Invalid "+a+" `"+i+"` key `"+p+"` supplied to `"+r+"`.\nBad object: "+JSON.stringify(n[t],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "));var b=f(u,p,r,a,i+"."+p,q);if(b)return b}return null})}};function i(e,n){return e===n?0!==e||1/e==1/n:e!=e&&n!=n}function o(e,n){this.message=e,this.data=n&&"object"==typeof n?n:{},this.stack=""}function u(e){function n(n,t,a,i,u,s,c){if(i=i||r,s=s||a,c!==q){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}return null==t[a]?n?new o(null===t[a]?"The "+u+" `"+s+"` is marked as required in `"+i+"`, but its value is `null`.":"The "+u+" `"+s+"` is marked as required in `"+i+"`, but its value is `undefined`."):null:e(t,a,i,u,s)}process;var t=n.bind(null,!1);return t.isRequired=n.bind(null,!0),t}function s(e){return u(function(n,t,r,a,i,u){var s=n[t];return m(s)!==e?new o("Invalid "+a+" `"+i+"` of type `"+d(s)+"` supplied to `"+r+"`, expected `"+e+"`.",{expectedType:e}):null})}function c(e,n,t,r,a){return new o((e||"React class")+": "+n+" type `"+t+"."+r+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+a+"`.")}function l(n){switch(typeof n){case"number":case"string":case"undefined":return!0;case"boolean":return!n;case"object":if(Array.isArray(n))return n.every(l);if(null===n||e(n))return!0;var r=function(e){var n=e&&(t&&e[t]||e["@@iterator"]);if("function"==typeof n)return n}(n);if(!r)return!1;var a,i=r.call(n);if(r!==n.entries){for(;!(a=i.next()).done;)if(!l(a.value))return!1}else for(;!(a=i.next()).done;){var o=a.value;if(o&&!l(o[1]))return!1}return!0;default:return!1}}function m(e){var n=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":function(e,n){return"symbol"===e||!!n&&("Symbol"===n["@@toStringTag"]||"function"==typeof Symbol&&n instanceof Symbol)}(n,e)?"symbol":n}function d(e){if(null==e)return""+e;var n=m(e);if("object"===n){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return n}function p(e){var n=d(e);switch(n){case"array":case"object":return"an "+n;case"boolean":case"date":case"regexp":return"a "+n;default:return n}}return o.prototype=Error.prototype,a.checkPropTypes=V,a.resetWarningCache=V.resetWarningCache,a.PropTypes=a,a}(C.isElement):function(){function e(e,n,t,r,a,i){if(i!==q){var o=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function n(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:z,resetWarningCache:K};return t.PropTypes=t,t}()});function Y(...e){return e.filter(Boolean).join(" ")}const J=({id:n,className:t,children:r})=>{const a=Y("rmm__top-bar",t&&t);/*#__PURE__*/return e.createElement("div",{id:n,className:a},r)};J.defaultProps={id:"top"},J.propTypes={id:U.string,className:U.string,children:U.node.isRequired};const G=({id:n,src:t,rel:r,className:a,alt:i})=>{const o=Y("rmm__logo",a&&a);/*#__PURE__*/return e.createElement("img",{id:n,src:t,className:o,rel:r,alt:i})};G.defaultProps={alt:"",rel:""},G.propTypes={id:U.string.isRequired,src:U.string.isRequired,className:U.string,rel:U.string,alt:U.string};const Q=({id:n,className:t,children:r})=>{const a=Y("rmm__top-bar-title",t&&t);/*#__PURE__*/return e.createElement("h1",{id:n,className:a},r)};Q.propTypes={id:U.string,className:U.string,children:U.node.isRequired};const X=({label:n,state:t,onClick:r})=>(""===t?t="rmm__hamburger--closed":"open"===t&&(t="rmm__hamburger--open"),/*#__PURE__*/e.createElement("button",{className:`rmm__hamburger ${t}`,onClick:r},/*#__PURE__*/e.createElement("div",{className:"rmm_hamburger--slice-container"},/*#__PURE__*/e.createElement("span",{className:"rmm_hamburger--slice"}),/*#__PURE__*/e.createElement("span",{className:"rmm_hamburger--slice"}),/*#__PURE__*/e.createElement("span",{className:"rmm_hamburger--slice"}),/*#__PURE__*/e.createElement("span",{className:"rmm_hamburger--slice"})),n&&/*#__PURE__*/e.createElement("div",{className:"rmm_hamburger--label-container"},/*#__PURE__*/e.createElement("span",{className:"rmm_hamburger--label"},n))));X.defaultProps={label:null},X.propTypes={label:U.string,state:U.oneOf(["","open","closed"]),onClick:U.func};const Z=({id:n,ariaLabel:t,activeState:r,children:a})=>{const i=Y("rmm__nav",r&&`rmm__nav--${r}`);/*#__PURE__*/return e.createElement("nav",{id:n,className:i,"aria-label":t},a)};Z.defaultProps={ariaLabel:"Main Navigation",activeState:""},Z.propTypes={id:U.string.isRequired,ariaLabel:U.string.isRequired,activeState:U.oneOf(["","open","closed"]).isRequired,children:U.node.isRequired};const ee=({id:n,children:t,ariaLabel:r})=>/*#__PURE__*/e.createElement("ul",{id:n,role:"menubar","aria-label":r,className:"rmm__main-list"},t);ee.defaultProps={ariaLabel:"Main menu"},ee.propTypes={id:U.string.isRequired,children:U.node.isRequired,ariaLabel:U.string.isRequired};const ne=({id:n,activeState:t,children:r})=>{const a=Y("rmm__mega-list",t&&`rmm__mega-list--${t}`);/*#__PURE__*/return e.createElement("ul",{role:"menu",className:a,id:n,"aria-labelledby":n},r)};ne.defaultProps={activeState:""},ne.propTypes={id:U.string.isRequired,activeState:U.oneOf(["open","closed"]).isRequired,children:U.node.isRequired};const te=({id:n,role:t,isHeading:r,isChildren:a,isForward:i,className:o,children:u})=>{const s=Y("rmm__main-nav-item",r&&"rmm__main-nav-item--heading",a&&"rmm__main-nav-item--children",i&&"rmm__main-nav-item--forward",o&&o);/*#__PURE__*/return e.createElement("li",{id:n,role:t,className:s},u)};te.defaultProps={role:"none",isHeading:!1,hasChildren:!1,isForward:!1},te.propTypes={id:U.string.isRequired,role:U.string,isHeading:U.bool,isChildren:U.bool,isForward:U.bool,className:U.string,children:U.node.isRequired};const re=({id:n,role:t,href:r,isBack:a,isForward:i,isActive:o,className:u,onClick:s,onKeyDown:c,ariaHaspopup:l,ariaControls:m,children:d})=>{const p=Y("rmm__main-nav-item-link",a&&"rmm__main-nav-item-link--back",i&&"rmm__main-nav-item-link--forward",o&&"rmm__main-nav-item-link--active",u&&u);/*#__PURE__*/return e.createElement("a",{id:n,role:t,href:r,className:p,onClick:s,onKeyDown:c,"aria-haspopup":l,"aria-controls":m},d)};re.defaultProps={role:"menuitem",isBack:!1,isForward:!1,isActive:!1},re.propTypes={id:U.string.isRequired,role:U.string,href:U.string.isRequired,isBack:U.bool,isForward:U.bool,isActive:U.bool,className:U.string,onClick:U.func,onKeyDown:U.func,ariaHaspopup:U.string,ariaControls:U.string,children:U.node.isRequired};const ae=({id:n,role:t,isHeading:r,isForward:a,className:i,children:o})=>{const u=Y("rmm__nav-item",r&&"rmm__nav-item--heading",a&&"rmm__nav-item--forward",i&&i);/*#__PURE__*/return e.createElement("li",{id:n,role:t,className:u},o)};ae.defaultProps={role:"none",isHeading:!1,hasChildren:!1,isForward:!1},ae.propTypes={id:U.string.isRequired,role:U.string,isHeading:U.bool,isForward:U.bool,className:U.string,children:U.node.isRequired};const ie=({id:n,role:t,href:r,isBack:a,isHeading:i,isForward:o,isActive:u,className:s,onClick:c,onKeyDown:l,ariaHaspopup:m,ariaControls:d,children:p})=>{const f=Y("rmm__nav-item-link",a&&"rmm__nav-item-link--back",i&&"rmm__nav-item-link--heading",o&&"rmm__nav-item-link--forward",u&&"rmm__nav-item-link--active",s&&s);/*#__PURE__*/return e.createElement("a",{id:n,role:t,href:r,className:f,onClick:c,onKeyDown:l,"aria-haspopup":m,"aria-controls":d},p)};ie.defaultProps={role:"menuitem",isBack:!1,isHeading:!1,isForward:!1,isActive:!1},ie.propTypes={id:U.string.isRequired,role:U.string,href:U.string.isRequired,isBack:U.bool,isHeading:U.bool,isForward:U.bool,isActive:U.bool,className:U.string,onClick:U.func,onKeyDown:U.func,ariaHaspopup:U.string,ariaControls:U.string,children:U.node.isRequired};const oe=({id:n,role:t,isSub:r,isSubSub:a,isDropdown:i,activeState:o,ariaLabelledby:u,children:s})=>{const c=Y("rmm__nav-list",`rmm__nav-list--${o}`,r&&"rmm__nav-list--sub",a&&"rmm__nav-list--sub-sub",i&&"rmm__nav-list--dropdown");/*#__PURE__*/return e.createElement("ul",{id:n,role:t,"aria-labelledby":u,className:c},s)};oe.defaultProps={role:"menubar",isSub:!1,isSubSub:!1,isDropdown:!1,activeState:""},oe.propTypes={id:U.string.isRequired,role:U.string,isSub:U.bool,isSubSub:U.bool,isDropdown:U.bool,activeState:U.oneOf(["","open","closed"]).isRequired,ariaLabelledby:U.string.isRequired,children:U.node.isRequired};const ue=({className:n,children:t})=>{const r=Y("rmm__nav-item-description",n&&n);/*#__PURE__*/return e.createElement("p",{className:r},t)};ue.propTypes={className:U.string,children:U.node.isRequired};const se=e=>{const n=["closed","open"];let t="open";return n.includes(e)&&(t=e===n[0]?n[1]:n[0]),t},ce=({logoImage:a})=>{const[i,o]=n(""),[u,s]=n(""),[c,l]=n(""),[m,d]=n([]),[p,f]=n(!0),b=t(null),y=()=>{d([]),s("closed"),l("closed")},g=(e,n)=>{"open"===e?d([...m,n]):"closed"===e&&d(m.filter(e=>e!==n))},v=(e,n)=>{e.preventDefault();const t=se(u);s(se(u)),p?g(t,n):m.includes(n)?d([]):d([n])},h=(e,n)=>{e.preventDefault();const t=se(c);l(se(c)),g(t,n)};r(()=>{window.innerWidth>=1024?f(!1):f(!0)},[m,p]);const M=e=>{27===e.keyCode&&y()},S=e=>{const n=e.charCode||e.keyCode;if(32===n||13===n)return!0};var E;return r(()=>(document.addEventListener("keydown",M,!1),()=>{document.removeEventListener("keydown",M,!1)})),r(()=>{const e=e=>{E.current&&!E.current.contains(e.target)&&y()};return document.addEventListener("mousedown",e),document.addEventListener("keydown",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("keydown",e)}},[E=b]),/*#__PURE__*/e.createElement("div",{role:"navigation",className:"rmm__root",ref:b},/*#__PURE__*/e.createElement(J,null,a&&/*#__PURE__*/e.createElement(G,{id:"menuitem-logo",src:a,alt:"Your brand's logo",rel:"home"}),/*#__PURE__*/e.createElement(Q,null,"Your Brand Name")),/*#__PURE__*/e.createElement(X,{label:"Menu",state:i,onClick:e=>((e,n)=>{e.preventDefault();const t=se(i);o(t),g(t,"nav-main"),"open"===i&&y()})(e)}),/*#__PURE__*/e.createElement(Z,{id:"site-nav",activeState:i,ariaLabel:"Main Navigation"},/*#__PURE__*/e.createElement(ee,{id:"menubar-main",ariaLabel:"Main Menu"},/*#__PURE__*/e.createElement(te,{role:"none",id:"nav-home"},/*#__PURE__*/e.createElement(re,{id:"menuitem-home",role:"menuitem",href:"/"},"Home")),/*#__PURE__*/e.createElement(te,{id:"nav-Mega-Menu",role:"none",isChildren:!0},/*#__PURE__*/e.createElement(re,{role:"menuitem",id:"menuitem-Mega-Menu",href:"/?page=mega-menu",isForward:!0,isActive:!!m.includes("menu-Mega-Menu"),onClick:e=>v(e,"menu-Mega-Menu"),onKeyDown:e=>S(e)&&v(e,"menu-Mega-Menu"),ariaHaspopup:"true",ariaControls:"menu-Mega-Menu"},"Mega Menu"),/*#__PURE__*/e.createElement(ne,{id:"menu-Mega-Menu",activeState:m.includes("menu-Mega-Menu")?"open":"closed"},/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-back",isHeading:!0},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-back",href:"/?page=mega-menu",onClick:e=>v(e,"menu-Mega-Menu"),onKeyDown:e=>S(e)&&v(e,"menu-Mega-Menu"),ariaControls:"nav-main-Mega-Menu",isBack:!0},"Mega Menu")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-1",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-1",role:"menuitem",href:"/?page=sub-menu-item-1",isHeading:!0},"Sub menu item 1"),/*#__PURE__*/e.createElement(ue,null,"Single line description that accompanies link")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-2",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-2",role:"menuitem",href:"/?page=sub-menu-item-2",isHeading:!0},"Sub menu item 2"),/*#__PURE__*/e.createElement(ue,null,"Double lined small description that accompanies link in the React Mega Menu project")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-3",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-3",role:"menuitem",href:"/?page=sub-menu-item-3",isHeading:!0,isForward:!0,onClick:e=>h(e,"menu-Mega-Menu-Sub-menu-item-3"),onKeyDown:e=>S(e)&&h(e,"menu-Mega-Menu-Sub-menu-item-3"),ariaHaspopup:"true",ariaControls:"menu-Mega-Menu-Sub-menu-item-3"},"Sub menu item 3"),/*#__PURE__*/e.createElement(ue,null,"Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who‘s to say, really. We‘ll leave it to fate to decide."),/*#__PURE__*/e.createElement(oe,{id:"menu-Mega-Menu-Sub-menu-item-3",role:"menu",isSub:!0,isSubSub:!0,activeState:m.includes("menu-Mega-Menu-Sub-menu-item-3")?"open":"closed",ariaLabelledby:"menuitem-Mega-Menu-Sub-menu-item-3"},/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-3-back",role:"none",isHeading:!0},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-3-back",role:"menuitem",href:"/?page=sub-menu-item-3",isBack:!0,onClick:e=>h(e,"menu-Mega-Menu-Sub-menu-item-3"),onKeyDown:e=>S(e)&&h(e,"menu-Mega-Menu-Sub-menu-item-3"),ariaHaspopup:"true",ariaControls:"menu-Mega-Menu-Sub-menu-item-3"},"Sub menu item 3")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-3.1",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-3.1",role:"menuitem",href:"/?page=sub-menu-item-3.1"},"Sub menu item 3.1"),/*#__PURE__*/e.createElement(ue,null,"Single line description that accompanies link")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-3.2",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-3.2",role:"menuitem",href:"/?page=sub-menu-item-3.2"},"Sub menu item 3.2"),/*#__PURE__*/e.createElement(ue,null,"Double lined small description that accompanies link in the React Mega Menu project")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-3.3",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-3.3",role:"menuitem",href:"/?page=sub-menu-item-3.3"},"Sub menu item 3.3"),/*#__PURE__*/e.createElement(ue,null,"Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who‘s to say, really. We‘ll leave it to fate to decide.")))),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-4",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-4",role:"menuitem",href:"/?page=sub-menu-item-4",isHeading:!0,isForward:!0,onClick:e=>h(e,"menu-Mega-Menu-Sub-menu-item-4"),onKeyDown:e=>S(e)&&h(e,"menu-Mega-Menu-Sub-menu-item-4"),ariaHaspopup:"true",ariaControls:"menu-Mega-Menu-Sub-menu-item-4"},"Sub menu item 4"),/*#__PURE__*/e.createElement(ue,null,"Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who&lsqio;s to say, really. We‘ll leave it to fate to decide."),/*#__PURE__*/e.createElement(oe,{id:"menu-Mega-Menu-Sub-menu-item-4",role:"menu",isSub:!0,isSubSub:!0,activeState:m.includes("menu-Mega-Menu-Sub-menu-item-4")?"open":"closed",ariaLabelledby:"menuitem-Mega-Menu-Sub-menu-item-4"},/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-4-back",role:"none",isHeading:!0},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-4-back",role:"menuitem",href:"/?page=sub-menu-item-4",isBack:!0,onClick:e=>h(e,"menu-Mega-Menu-Sub-menu-item-4"),onKeyDown:e=>S(e)&&h(e,"menu-Mega-Menu-Sub-menu-item-4"),ariaHaspopup:"true",ariaControls:"menu-Mega-Menu-Sub-menu-item-4"},"Sub menu item 4")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-4.1",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-4.1",role:"menuitem",href:"/?page=sub-menu-item-4.1"},"Sub menu item 4.1")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-4.2",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-4.2",role:"menuitem",href:"/?page=sub-menu-item-4.2"},"Sub menu item 4.2")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-4.3",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-4.3",role:"menuitem",href:"/?page=sub-menu-item-4.3"},"Sub menu item 4.3")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-4.4",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-4.4",role:"menuitem",href:"/?page=sub-menu-item-4.4"},"Sub menu item 4.4")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-4.5",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-4.5",role:"menuitem",href:"/?page=sub-menu-item-4.5"},"Sub menu item 4.5")),/*#__PURE__*/e.createElement(ae,{id:"nav-Mega-Menu-Sub-menu-item-4.6",role:"none"},/*#__PURE__*/e.createElement(ie,{id:"menuitem-Mega-Menu-Sub-menu-item-4.6",role:"menuitem",href:"/?page=sub-menu-item-4.6"},"Sub menu item 4.6")))))),/*#__PURE__*/e.createElement(te,{id:"nav-contact",role:"none"},/*#__PURE__*/e.createElement(re,{id:"menuitem-contact",role:"menuitem",href:"/?page=contact"},"Contact")))))};ce.defaultProps={logoImage:null},ce.propTypes={logoImage:U.string};export{ce as default};
//# sourceMappingURL=index.modern.js.map
