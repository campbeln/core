/* Class: ish; By: Nick Campbell; License: MIT; Keep this line or you violate the copyright! */
!function(){"use strict";var d,n,r,i,o,a,s,t,e,c,l,u,p,f,y,b,m,h,g,v="undefined"==typeof window,k=v?global:window,w=v?{}:document,j=null,x=Object.prototype.toString,O=Date.now,S={},E={config:{ver:"0.12.2019-09-28",onServer:v,debug:!0,target:"ish",plugins:{},typeOrder:["bool","int","float","date","str","fn","dom","arr","obj","symbol"]},public:{expectedErrorHandler:function(){}}},L=function(){return{data:{},ui:{}}},T={};function A(){}function C(e){try{e+=""}catch(t){e=""}return e}function N(t,e){var n,r,i,o;if(e=T.type.arr.mk(e,T.config.ish().typeOrder),T.type.arr.is(e,!0))for(i=0;i<e.length;i++)if(r=e[i],(n=(T.type[r]||{}).is||T.type.is[r]||T.type.fn.mk(r))(t)){o=n;break}return o}function q(t,e){var n="[object Date]"===x.call(t);return n||(e&&T.type.is.numeric(t)?(t=new Date(parseFloat(t)),n=!isNaN(t.valueOf())):T.type.str.is(t)&&(t=new Date(t),n=!isNaN(t.valueOf()))),{b:n,d:t}}function F(t){try{return JSON.parse(t)}catch(t){}}function M(t,e,n,r){var i=!(!t||t!==Object(t)||!e&&T.type.fn.is(t)||r&&"[object Object]"!==x.call(t));return!i&&n&&T.type.str.is(t,!0)&&(i=!!(t=F(t))),{b:i,o:t}}function P(t,e,n){var r,i,o=a.i.indexOf(t);for(e=T.type.obj.mk(e),n=T.type.obj.mk(n),r=-1===o?(a.i.push(t),a.p.push(e),function(t){a[t].push(n[t]||s.d[t])}):(a.p[o]=e,function(t){n.hasOwnProperty(t)&&(a[t][o]=n[t])}),i=0;i<s.n.length;i++)r(s.n[i])}function D(t,e){return T.type.arr.rm(l[t],e)}function B(t,e){var n,r=l[t],i=T.type.arr.is(r,!0);for(i||(r=l[t]=[]),r.last=e,n=0;n<r.length;n++)n+=I(t,r[n],e);return r.fired=!0,i}function I(t,e,n){var r=0;return D===T.type.fn.call(e,d,n)&&(D(t,e),r--),r}function $(t,e){T.config.ish().debug&&T.type.fn.call(T.resolve(k,["console",t]),j,e)}function U(t,e,n,r){return{dom:t,url:e,loaded:!!n,timedout:!!r}}function H(t){return T.type.fn.is(t)?{callback:t}:T.extend({},t)}function R(t,o,e){var a,n,r=T.type.arr.mk(t,[t]),s=[],c=!0;function l(t,e,n,r,i){t.onError=t.onLoad=T.type.fn.noop,s.push(U(e,n,!0!==r,r&&i)),r&&T.type.fn.call(o.onError,j,[e,n]),s.length===a&&T.type.fn.call(o.callback,j,[s,c])}if(T.type.arr.is(r,!0))for(o=T.config.require(o),a=r.length,n=0;n<a;n++)!function(i){e(i,o,function(e,t){var n,r={onError:function(t){l(r,e,i,!(c=!1),t)},onLoad:function(){clearTimeout(n),l(r,e,i)}};return t?r.onLoad():(e.onload=function(){r.onLoad()},e.onerror=function(){r.onError()},n=setTimeout(function(){r.onError(!0)},1e3*o.waitSeconds)),r})}(r[n]);else T.type.fn.call(o.callback,j,[s,c])}function J(t){return function(){T.io.console.error("ish.require."+t+" is not available on the serverside.")}}T.type=((N.is=function(t,e){try{return t instanceof e}catch(t){return!1}}).native=(n=Object.prototype.toString,r=Function.prototype.toString,i=/^\[object .+?Constructor\]$/,o=RegExp("^"+String(n).replace(/[.*+?^${}()|[\]/\\]/g,"\\$&").replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),function(t){var e=typeof t;return"function"==e?o.test(r.call(t)):t&&"object"==e&&i.test(n.call(t))||!1}),N.is.collection=function(t,e){var n=T.type.obj.mk(e),r=!0===e||n.disallow0Length;return n.allowObject&&T.type.obj.is(t,{nonEmpty:r})||n.allowArray&&T.type.arr.is(t,r)||t&&T.type.is.numeric(t.length)&&(!r||0<t.length)&&/^\[object (HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection|NodeList|NamedNodeMap|Arguments)\]$/.test(Object.prototype.toString.call(t))},N.is.numeric=function(t){var e=!1;try{e=/^[-0-9]?[0-9]*(\.[0-9]{1,})?$/.test(t)&&!isNaN(parseFloat(t))&&isFinite(t)}catch(t){}return e},N.is.ish=function(t){return 0===arguments.length||t===T},N.bool={is:function(t,e){var n=C(t).toLowerCase();return"[object Boolean]"===x.call(t)||e&&("true"===n||"false"===n)},mk:function(t,e){var n=1<arguments.length?e:!!t;return e=n,T.type.bool.is(t)?n=t:T.type.str.is(t,!0)&&(n="true"===(t=t.trim().toLowerCase())||"false"!==t&&e),n}},N.int={is:function(t){var e=T.type.float.mk(t);return T.type.is.numeric(t)&&e%1==0},mk:function(t,e,n){var r=parseInt(t,1<n&&n<37?n:10);return isNaN(r)?1<arguments.length?e:0:r}},N.float={is:function(t){var e=T.type.float.mk(t);return T.type.is.numeric(t)&&e%1!=0},mk:function(t,e,n){var r;try{r=parseFloat(t,1<n&&n<37?n:10)}catch(t){}return isNaN(r)?1<arguments.length?e:0:r}},N.date={is:function(t,e){return q(t,e).b},mk:function(t,e){var n=q(t,!0);return n.b?n.d:1<arguments.length?e:new Date}},N.str={is:function(t,e,n){return!(!("string"==typeof t||t instanceof String)||e&&""===t||n&&""===C(t).trim())},mk:function(t,e){var n=T.type.obj.is(t,{strict:!0})?JSON.stringify(t):C(t);return(t||!1===t||0===t)&&n?n:1<arguments.length?e:""}},N.fn={is:function(t){return"[object Function]"===x.call(t)},mk:function(t,e){var n,r=T.resolve||function(t,e){return t[e]},i=1<arguments.length?e:A;return T.type.fn.is(t)?i=t:(n=T.type.str.is(t)||T.type.arr.is(t)?r(k,t):d,T.type.fn.is(n)&&(i=n)),i}},N.arr={is:function(t,e){return"[object Array]"===x.call(t)&&(!e||0<t.length)},mk:function(t,e){return t=T.type.is.collection(t)?Array.prototype.slice.call(t):t,T.type.arr.is(t)?t:1<arguments.length?e:[]}},N.obj={is:function(t,e){var n,r,i,o,a=e&&e===Object(e)?e:{},s=a.requiredKeys,c=a.interface,l=!(!0!==e&&!a.nonEmpty);if(o=(t=M(t,a.allowFn,a.allowJSON,a.strict)).b,t=t.o,o){if((o=!l||0!==Object.keys(t).length)&&T.type.arr.is(s,!0))for(i=0;i<s.length;i++)if(!t.hasOwnProperty(s[0])){o=!1;break}if(o&&M(c).b)for(r=Object.keys(c),i=0;i<r.length;i++)if(n=c[r[i]],n=T.type.fn.is(n)?n:T.resolve(T.type,[r[i],"is"]),!t.hasOwnProperty(r[i])||!T.type.fn.call(n,null,t[r[i]])){o=!1;break}}return o},mk:function(t,e){return T.type.str.is(t,!0)&&(t=F(t)),T.type.obj.is(t,{allowFn:!0})?t:1<arguments.length?e:{}}},N.symbol={exists:function(){return T.type.fn.is(k.Symbol)},is:function(t){return T.type.symbol.exists()&&"symbol"==typeof t},mk:function(t,e){return T.type.symbol.is(t)?t:1===arguments.length?k.Symbol():e}},N),T.resolve=function(){function t(t){return t!==j&&t!==d}var e,n,r,i,o,a,s,c,l=!0,u={allowFn:!0},p=Array.prototype.slice.call(arguments),f=p[0]===T.resolve.returnMetadata,y=!1;if(f&&p.shift(),!0===p[0]?(c=!0,i=p[1],r=p[2],3<p.length&&(s=!0,n=p[3])):(c=!1,i=p[0],r=p[1],2<p.length&&(s=!0,n=p[2])),e=T.type.obj.is(i,u)?i:d,t(i)&&(T.type.str.is(r)||T.type.arr.is(r,!0)&&T.type.str.is(r[0]))){for(o=T.type.arr.is(r)?r:r.split("."),e=i,a=0;a<o.length;a++)if(T.type.obj.is(e,u))if(o[a]in e)e=(i=e)[o[a]];else{if(!c){e=d,l=!1;break}e=(i=e)[o[a]]={},y=!0}else if(t(e)&&e[o[a]]!==d)e=e[o[a]];else{if(!(c||s&&a===o.length-1)){e=d,l=!1;break}i[o[a]]=e={},y=!0}s&&l&&(i[o[o.length-1]]=e=n)}return f?{value:e,created:y,existed:l&&!y}:e},T.resolve.returnMetadata=A,T.extend=function(){function t(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var e,n,r,i,o,a,s,c,l=arguments;for(a=T.type.int.is(l[0])||T.type.bool.is(l[0])?(o=!0===l[0]?0:!1===l[0]?1:T.type.int.mk(l[0]),n=l[1],2):(n=l[o=0],1),n=T.type.obj.is(n,{allowFn:!0})?n:{};a<l.length;a++)if(r=l[a],e=Object.keys(r||{}),T.type.fn.is(r)&&!t(n,i))n=r;else if(0<e.length)for(s=0;s<e.length;s++)if(r[i=e[s]]!==d&&t(r,i))if(1!==o&&T.type.arr.is(r[i]))for(n[i]=r[i].slice(),c=0;c<n[i].length;c++)(T.type.obj.is(n[i][c])||T.type.arr.is(n[i][c]))&&(n[i][c]=T.extend(o-1,{},r[i][c]));else 1!==o&&T.type.obj.is(r[i])?n[i]=T.extend(o-1,n[i],r[i]):T.type.date.is(r[i])?n[i]=new Date(r[i]):n[i]=r[i];return n},T.config=function(e){return function(t){return 0<arguments.length&&T.extend(e,t),T.extend(!0,{},e)}},T.oop=(s={n:[],d:[]},P(t={partial:function(t,e){var n=a.i.indexOf(t),r=-1===n?{}:a.p[n],i={allowFn:!0};if(!T.type.obj.is(t,i)||!T.type.obj.is(e,i))throw"ish.oop.partial: Object or function required for `vTarget` and `vPartial`.";P(t,r),T.extend(t,T.type.fn.is(e)?e.apply(r,[r]):e)},protected:function(t,e){P(t,e)}},{oopData:a={i:[],p:[]},addOopDataType:function(t,e){var n=s.n.indexOf(t),r=-1===n&&"i"!==t&&"p"!==t;if(r)for(s.n.push(t),s.d.push(e),a[t]=[],n=0;n<a.i.length;n++)a[t].push(e);return r},setOopEntry:P}),t),T.oop.partial(T.type,function(t){function o(t,e,n){var r,i,o,a=!1,s=0;for(T.type.arr.is(e)?r=e:T.type.obj.is(e)&&(r=Object.keys(e),a=!0),o=0;o<r.length;o++)i=r[o],t.hasOwnProperty(i)&&(s++,a&&(t[e[i]]=t[i]),n?t[i]=d:delete t[i]);return s}function i(t,e,n){var r,i=0;if(T.type.arr.is(t,!0))for(r=0;r<t.length;r++)i+=o(t[r],e,n);else T.type.obj.is(t)&&(i=o(t,e,n));return i}return t.processObj=i,E.public.import=function(t,e){var n;for(t=T.type.arr.mk(t,[t]),e=T.extend({callback:function(t,e){T.io.event.fire("ish.pluginsLoaded",[t,e])},onAppend:function(t){!v&&t&&t.setAttribute("importedBy",e.importedBy||"type.is.ish.import")}},T.config.ish().plugins,e),n=0;n<t.length;n++)t[n]+=".js";T.require(t,e)},T.config.ish=T.config(E.config),{is:{ish:E.public,val:function(t){return t!==d&&t!==j},primitive:function(t){return t===j||t===d||T.type.bool.is(t)||T.type.is.numeric(t)||T.type.str.is(t)||T.type.symbol.is(t)}},date:{timestamp:function(){var t=k.performance,e=T.resolve(t,"timing");return t&&t.now&&e&&e.navigationStart?t.now()+e.navigationStart:O()}},str:{is:{json:function(t){try{return JSON.parse(t),!0}catch(t){return!1}}}},arr:{rm:function(t,e,n){var r,i,o=-1,a=3===arguments.length,s=T.type.arr.is(n),c=T.type.arr.is(e)?e:[e],l=!1;if(T.type.arr.is(t,!0))for(a&&s&&(o=n.length),i=0;i<c.length;i++)-1<(r=t.indexOf(c[i]))&&(l=!0,a?t[r]=s&&i<o?n[i]:n:t.splice(r,1));return l},of:function(t,e){var n,r=T.type.arr.is(t,!0)&&T.type.fn.is(e);if(r)for(n=0;n<t.length;n++)if(!e(t[n])){r=!1;break}return r}},obj:{rm:function(t,e,n){var r;return T.type.str.is(e,!0)&&(e=[e]),T.type.arr.is(e,!0)&&(r=i(t,e,n)),r},ownKeys:function(t){var e,n;if(T.type.obj.is(t,{allowFn:!0}))for(e=(n=Object.keys(t)).length;0<e;e--)t.hasOwnProperty(n[e])||n.splice(e,1);return n},get:function(t,e){var n,r;if(T.type.obj.is(t))for(n in e=T.type.str.mk(e).toLowerCase(),t)if(n.toLowerCase()===e){r=t[n];break}return r}},fn:{arguments:function(t){return"[object Arguments]"===Object.prototype.toString.call(t)},convert:u,noop:A,call:function(t,e,n){var r;if(T.type.fn.is(t))switch(arguments.length){case 1:r=t();break;case 2:r=t.apply(e);break;default:r=t.apply(e,u(n))}return r},run:function(t,e){var n,r=T.type.fn.arguments(e)?u(e):T.type.arr.is(e)?e:d,i=p(r?{}:e,{args:r,default:d});return n=i.default,T.type.fn.is(t)&&(n=t.apply(i.context,i.args)),n},once:function(t,e){var n;return(e=p(e,{rereturn:!0})).call=0,function(){return T.type.fn.is(t)&&(n=t.apply(e.context,u(arguments)),t=j),1==++e.call||e.rereturn?n:d}},tryCatch:function(t,e){var n;return e=p(e,{returnObj:!1}),function(){n={result:e.default,error:j};try{n.result=t.apply(e.context,u(arguments))}catch(t){n.error=t}return e.returnObj?n:n.result}},throttle:function(n,r){function i(){l=!1===r.leading?0:O(),c=j,s=n.apply(o,a),c||(o=a=j)}var o,a,s,c=j,l=0;return r=p(r,{leading:!0,trailing:!1},500),function(){var t,e=O();return l||!1!==r.leading||(l=e),t=r.wait-(e-l),o=r.context,a=u(arguments),t<=0||t>r.wait?(c&&(clearTimeout(c),c=j),l=e,s=n.apply(o,a),c||(o=a=j)):c||!1===r.trailing||(c=setTimeout(i,t)),s}},debounce:function(e,n){var r,i,o,a,s,c=function(){var t=O()-a;t<n.wait&&0<=t?r=setTimeout(c,n.wait-t):(r=j,n.immediate||(s=e.apply(o,i),r||(o=i=j)))};return n=p(n,{immediate:!1},500),function(){var t=n.immediate&&!r;return o=n.context,i=u(arguments),a=O(),r=r||setTimeout(c,n.wait),t&&(s=e.apply(o,i),o=i=j),s}},poll:(e.expBackoff=function(t){var e=1;return t=T.type.int.mk(t,100)/2,function(){return t*Math.pow(2,e++)}},e)}};function u(t){return T.type.arr.mk(t,t===d?[]:[t])}function p(t,e,n){return T.extend({context:{}},e,t,n!==d&&T.type.obj.is(t)?{wait:T.type.int.mk(t.wait,n)}:j)}function e(e,n){var r,i,t,o=0;return n=T.extend({},n),t=T.type.int.mk(n.wait,500),n.wait=T.type.fn.is(n.wait)?n.wait:function(){return t},n.retries=T.type.int.mk(n.retries,4),function(){i=u(arguments),function t(){o++,(r=T.type.fn.call(e,n.context,i))?T.type.fn.call(n.callback,n.context,[!0,o,r]):o<n.retries?setTimeout(t,n.wait(o)):T.type.fn.call(n.callback,n.context,[!1,o,r])}()}}}),T.io={console:{log:function(){$("log",arguments)},warn:function(){$("warn",arguments)},error:function(){$("error",arguments)}},event:(l={},e=T.extend(B,{fire:B,unwatch:D,registered:function(t,e){var n;switch(arguments.length){case 0:n=T.type.obj.ownKeys(l);break;case 1:n=T.type.str.is(t,!0)&&T.type.arr.is(l[t]);break;case 2:n=T.type.fn.is(e)&&T.type.str.is(t,!0)&&T.type.arr.is(l[t],!0)&&-1<l[t].indexOf(e)}return n},unregister:function(t){var e=T.type.str.is(t,!0)&&T.type.obj.is(l[t]);return e&&delete l[t],e},fired:function(t){return!0===T.resolve(l,[t,"fired"])},watch:function(t,e){var n=T.type.fn.is(e);return n&&((l[t]=l[t]||[]).push(e),l[t].fired&&(I(t,e,l[t].last),T.type.fn.call(l[t].callback,d,l[t].last))),n}}),v||(c=T.type.fn.once(function(){e.fire("docready")}),"complete"===w.readyState||!w.attachEvent&&"interactive"===w.readyState?c():w.addEventListener?(w.addEventListener("DOMContentLoaded",c),k.addEventListener("load",c,!1)):w.attachEvent?w.attachEvent("onreadystatechange",function(){"complete"===w.readyState&&c()}):k.attachEvent("onload",c)),e)},T.require=(y={onError:function(t,e){T.io.console.error("Unable to include `"+e+"`.")}},u=v?T.extend(function(t,e){var n,r=T.type.arr.mk(t,[t]),i=H(e),o=__dirname+(/^win/.test(process.platform)?"\\":"/"),a=[],s=!0;for(T.config.ish().baseUrl=o,n=0;n<r.length;n++)try{require(o+r[n])(T),a.push(U(d,r[n],!0,!1))}catch(t){s=!1,T.type.fn.run(i.onError,[d,r[n]]),a.push(U(d,r[n],!1,!1))}T.type.fn.run(i.callback,[a,s])},{scripts:J("scripts"),links:J("scripts"),css:J("scripts")}):(T.extend(y,{waitSeconds:7,baseUrl:"",urlArgs:""}),p=w.head,f=w.querySelector.bind(w),T.extend(function(t,e){var n,r=T.type.arr.mk(t,[t]),i=H(e),o=i.callback,a=!0,s=[],c=[],l=[];if(T.type.arr.is(r,!0)){for(n=0;n<r.length;n++)switch(T.type.str.mk(r[n]).match(/\.([^\./\?#]+)($|\?|#)/)[1].toLowerCase()){case"js":s.push(r[n]);break;case"css":c.push(r[n]);break;default:l.push(r[n])}r=[],n=0,i.callback=function(t,e){T.type.arr.is(t,!0)&&(r=r.concat(t),a=a&&e),0==--n&&T.type.fn.call(o,j,[r,a])},T.type.arr.is(s,!0)&&(n++,T.require.scripts(s,i)),T.type.arr.is(c,!0)&&(n++,T.require.css(c,i)),T.type.arr.is(l,!0)&&(n++,T.require.links(l,i))}else T.type.fn.call(o,j,[r,a])},{scripts:function(t,e){R(t,H(e),function(t,e,n){var r=e.baseUrl+t+e.urlArgs,i=f("script[src='"+r+"']");T.type.dom.is(i)?n(i,!0):(n(i=w.createElement("script")),i.onreadystatechange=i.readyState?function(t){return function(){"loaded"!=t.readyState&&"complete"!=t.readyState||(t.onreadystatechange=j,t.onload())}}(i):j,i.setAttribute("type","text/javascript"),i.setAttribute("src",r),p.appendChild(i),T.type.fn.call(e.onAppend,j,[i,t]))})},links:function(t,e){R(t,T.extend({rel:"",type:"",media:""},H(e)),function(t,e,n){var r,i=e.baseUrl+t+e.urlArgs,o=f("link[href='"+i+"']");T.type.dom.is(o)?n(o,!0):(o=w.createElement("link"),r=n(o),"onload"in o||(r.i=w.createElement("img"),r.i.onload=r.i.onerror=function(){r.onLoad()},r.i.src=i),o.rel=e.rel,o.type=e.type,o.href=i,o.media=e.media,p.appendChild(o),T.type.fn.call(e.onAppend,j,[o,t]))})},css:function(t,e){T.require.links(t,T.extend({rel:"stylesheet",type:"text/css",media:"all"},H(e)))}})),T.config.require=T.config(y),T.extend(u,{modules:function(n,t){var r=0,e=H(t),i=e.callback,o=!0,a=[];function s(){T.require(n[r++],e)}function c(){T.type.fn.call(i,j,[a,o])}e.callback=function(t,e){o=o&&e,a.push({module:t,loaded:e}),(o&&r<n.length?s:c)()},(T.type.arr.is(n,!0)?s:c)()}})),T.lib=L(),T.app=L(),v?S.init=function(){"object"==typeof module&&module.exports?module.exports=T:"function"==typeof define&&define.amd&&define([],T)}:(h=w.head,g=w.querySelector.bind(w),S.init=function(){var r,i=w.currentScript||g("SCRIPT["+a+"]"),o=T.config.ish(),a=o.target;function n(t){var e=T.resolve(k,a),n=T.type.obj.is(e);t&&(r=T.config.require().baseUrl||i.src,T.config.require({baseUrl:r.substr(0,r.lastIndexOf("/")+1)}),T.type.is.ish.import(o.plugins.import,T.extend({importedBy:"SCRIPT["+a+"]"},o.plugins)),a=o.target),n&&(T.extend(T,e),T.extend(e,T)),t!==j&&T.type.str.is(a,!0)&&T.resolve(!0,k,a,n?e:T)}i&&i.hasAttribute(a)?(r=i.getAttribute(a),T.type.str.is(r,!0)&&(T.type.str.is.json(r)?T.extend(o,T.type.obj.mk(r)):T.type.obj.is(T.resolve(k,r))?T.extend(o,T.resolve(k,r)):T.io.net.get(r,function(t,e){T.extend(o,t?e.data:j),n(i)}))):(i||(i=w.createElement("SCRIPT"),h.appendChild(i)),i.setAttribute(a,"")),i[a]=T,n(i)},T.type.str.is.selector=(b=w.createElement("br"),function(t){var e=!1;try{b.querySelector(t),e=!0}catch(t){}return e}),T.type.dom=((m={_:[1,"<div>","</div>"],option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],body:[0,"",""]}).head=m.body,m.optgroup=m.option,m.th=m.td,m.tbody=m.tfoot=m.colgroup=m.caption=m.thead,{is:function(t,e){return e=T.type.obj.mk(e,{allowSelector:!!e}),T.type.str.is(t,!0)&&(e.allowSelector&&T.type.str.is.selector(t)?t=g(t)||w.getElementById(t):e.allowHTML&&(t=T.resolve(T.type.dom.parse(t),"0"))),t&&T.type.str.is(t.tagName)&&""!==t.tagName&&T.type.fn.is(t.getAttribute)},mk:function(t,e){var n=w.createElement("div"),r=1<arguments.length?e:n;return T.type.str.is(t,!0)?(t=t.trim(),r=T.type.str.is.selector(t)?g(t)||w.getElementById(t)||r:T.resolve(T.type.fn.run(T.type.dom.parse,arguments),"0")||r):T.type.dom.is(t)?r=t:t&&t[0]&&T.type.dom.is(t[0])&&(r=t[0]),r},parse:function(t,e){var n,r,i,o,a,s,c;for(t=T.type.str.mk(t).trim(),a="head"===(o=T.type.str.mk((/<([^\/!]\w*)[\s\S]*?>/g.exec(t)||[0,""])[1]).toLowerCase()),s="body"===o,i=m[o]||m._,(r=w.createElement(a||s?"html":"div")).innerHTML=i[1]+t+i[2],c=i[0];c--;)r=r.children[0];return n=T.type.arr.mk(r.childNodes),s?n.shift():a&&n.unshift(),n=T.type.arr.is(n,!0)?n:1<arguments.length?[e]:d}}),T.ui={scrollTo:function(n,r){var i=T.type.dom.mk(n,null),t=null!==i,o=function(t){var e=parseInt(.2*i.getBoundingClientRect().top);w.body.scrollTop+=e,w.documentElement.scrollTop+=e,!t||t>Math.abs(e)?setTimeout(function(){o(Math.abs(e))},20):r&&T.type.str.is(n)&&(location.hash="#"+n)};return t&&o(),t},clearSelection:function(){k.getSelection?k.getSelection().removeAllRanges():w.selection&&w.selection.empty()}}),S.init()}();
