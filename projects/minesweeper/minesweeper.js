!function(n){"use strict";function r(n,r,t){return t.a=n,t.f=r,t}function i(t){return r(2,t,function(r){return function(n){return t(r,n)}})}function v(e){return r(3,e,function(t){return function(r){return function(n){return e(t,r,n)}}})}function o(u){return r(4,u,function(e){return function(t){return function(r){return function(n){return u(e,t,r,n)}}}})}function B(a){return r(5,a,function(u){return function(e){return function(t){return function(r){return function(n){return a(u,e,t,r,n)}}}}})}function G(f){return r(6,f,function(a){return function(u){return function(e){return function(t){return function(r){return function(n){return f(a,u,e,t,r,n)}}}}}})}function s(n,r,t){return 2===n.a?n.f(r,t):n(r)(t)}function d(n,r,t,e){return 3===n.a?n.f(r,t,e):n(r)(t)(e)}function l(n,r,t,e,u){return 4===n.a?n.f(r,t,e,u):n(r)(t)(e)(u)}function c(n,r,t,e,u,a){return 5===n.a?n.f(r,t,e,u,a):n(r)(t)(e)(u)(a)}function z(n,r,t,e,u,a,f){return 6===n.a?n.f(r,t,e,u,a,f):n(r)(t)(e)(u)(a)(f)}function f(n,r){for(var t,e=[],u=M(n,r,0,e);u&&(t=e.pop());u=M(t.a,t.b,0,e));return u}function M(n,r,t,e){if(n!==r){if("object"!=typeof n||null===n||null===r)return"function"==typeof n&&nn(5),!1;if(100<t)return e.push({a:n,b:r}),!0;for(var u in n.$<0&&(n=Er(n),r=Er(r)),n)if(!M(n[u],r[u],t+1,e))return!1}return!0}function h(n,r,t){if("object"!=typeof n)return n===r?0:n<r?-1:1;if(void 0===n.$)return(t=h(n.a,r.a))||(t=h(n.b,r.b))?t:h(n.c,r.c);for(;n.b&&r.b&&!(t=h(n.a,r.a));n=n.b,r=r.b);return t||(n.b?1:r.b?-1:0)}var S=i(function(n,r){n=h(n,r);return n<0?qr:n?kr:jr}),Y=0;function u(n,r){var t,e={};for(t in n)e[t]=n[t];for(t in r)e[t]=r[t];return e}var $={$:0};function H(n,r){return{$:1,a:n,b:r}}var O=i(H);function g(n){for(var r=$,t=n.length;t--;)r={$:1,a:n[t],b:r};return r}var P=v(function(n,r,t){for(var e=Array(n),u=0;u<n;u++)e[u]=t(r+u);return e}),V=i(function(n,r){for(var t=Array(n),e=0;e<n&&r.b;e++)t[e]=r.a,r=r.b;return t.length=e,{a:t,b:r}}),W=i(function(n,r){return r[n]}),K=v(function(n,r,t){for(var e=t.length,u=Array(e),a=0;a<e;a++)u[a]=t[a];return u[n]=r,u}),Q=v(function(n,r,t){for(var e=t.length-1;0<=e;e--)r=s(n,t[e],r);return r}),U=i(function(n,r){for(var t=r.length,e=Array(t),u=0;u<t;u++)e[u]=n(r[u]);return e}),X=v(function(n,r,t){return t.slice(n,r)}),Z=v(function(n,r,t){for(var e=r.length,u=n-e,n=e+(u=t.length<u?t.length:u),a=Array(n),f=0;f<e;f++)a[f]=r[f];for(f=0;f<u;f++)a[f+e]=t[f];return a});function nn(n){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+n+".md")}var rn=Math.ceil,tn=Math.floor,en=Math.log;var un={$:2,b:function(n){return"string"==typeof n?_(n):n instanceof String?_(n+""):m("a STRING",n)}};var an=i(function(n,r){return{$:6,d:n,b:r}});var fn=i(function(n,r){return{$:9,f:n,g:[r]}}),on=i(p);function p(n,r){switch(n.$){case 2:return n.b(r);case 5:return null===r?_(n.c):m("null",r);case 3:return bn(r)?cn(n.b,r,g):m("a LIST",r);case 4:return bn(r)?cn(n.b,r,vn):m("an ARRAY",r);case 6:var t=n.d;if("object"!=typeof r||null===r||!(t in r))return m("an OBJECT with a field named `"+t+"`",r);var e=p(n.b,r[t]);return E(e)?e:w(s(Ir,t,e.a));case 7:t=n.e;if(!bn(r))return m("an ARRAY",r);if(r.length<=t)return m("a LONGER array. Need index "+t+" but only see "+r.length+" entries",r);e=p(n.b,r[t]);return E(e)?e:w(s(Lr,t,e.a));case 8:if("object"!=typeof r||null===r||bn(r))return m("an OBJECT",r);var u,a=$;for(u in r)if(r.hasOwnProperty(u)){e=p(n.b,r[u]);if(!E(e))return w(s(Ir,u,e.a));a={$:1,a:{a:u,b:e.a},b:a}}return _(Mr(a));case 9:for(var f=n.f,i=n.g,o=0;o<i.length;o++){e=p(i[o],r);if(!E(e))return e;f=f(e.a)}return _(f);case 10:e=p(n.b,r);return E(e)?p(n.h(e.a),r):e;case 11:for(var c=$,b=n.g;b.b;b=b.b){e=p(b.a,r);if(E(e))return e;c={$:1,a:e.a,b:c}}return w(Jr(Mr(c)));case 1:return w(s(Dr,n.a,r));case 0:return _(n.a)}}function cn(n,r,t){for(var e=r.length,u=Array(e),a=0;a<e;a++){var f=p(n,r[a]);if(!E(f))return w(s(Lr,a,f.a));u[a]=f.a}return _(t(u))}function bn(n){return Array.isArray(n)||"undefined"!=typeof FileList&&n instanceof FileList}function vn(r){return s(nt,r.length,function(n){return r[n]})}function m(n,r){return w(s(Dr,"Expecting "+n,r))}function sn(n,r){if(n===r)return!0;if(n.$!==r.$)return!1;switch(n.$){case 0:case 1:return n.a===r.a;case 2:return n.b===r.b;case 5:return n.c===r.c;case 3:case 4:case 8:return sn(n.b,r.b);case 6:return n.d===r.d&&sn(n.b,r.b);case 7:return n.e===r.e&&sn(n.b,r.b);case 9:return n.f===r.f&&dn(n.g,r.g);case 10:return n.h===r.h&&sn(n.b,r.b);case 11:return dn(n.g,r.g)}}function dn(n,r){var t=n.length;if(t!==r.length)return!1;for(var e=0;e<t;e++)if(!sn(n[e],r[e]))return!1;return!0}function ln(n){return n}function hn(n){return{$:0,a:n}}var $n=i(function(n,r){return{$:3,b:n,d:r}});var gn=0;function pn(n){n={$:0,e:gn++,f:n,g:null,h:[]};return jn(n),n}function mn(r){return{$:2,b:function(n){n({$:0,a:pn(r)})},c:null}}function An(n,r){n.h.push(r),jn(n)}var yn=i(function(r,t){return{$:2,b:function(n){An(r,t),n({$:0,a:Y})},c:null}});var wn=!1,_n=[];function jn(n){if(_n.push(n),!wn){for(wn=!0;n=_n.shift();)!function(r){for(;r.f;){var n=r.f.$;if(0===n||1===n){for(;r.g&&r.g.$!==n;)r.g=r.g.i;if(!r.g)return;r.f=r.g.b(r.f.a),r.g=r.g.i}else{if(2===n)return r.f.c=r.f.b(function(n){r.f=n,jn(r)});if(5===n){if(0===r.h.length)return;r.f=r.f.b(r.h.shift())}else r.g={$:3===n?0:1,b:r.f.b,i:r.g},r.f=r.f.d}}}(n);wn=!1}}function kn(n,r,t,e,u,a){var n=s(on,n,r?r.flags:void 0),f=(E(n)||nn(2),{}),r=t(n.a),i=r.a,o=a(c,i),t=function(n,r){var t,e;for(e in b){var u=b[e];u.a&&((t=t||{})[e]=u.a(e,r)),n[e]=function(n,r){var e={g:r,h:void 0},u=n.c,a=n.d,f=n.e,i=n.f;function o(t){return s($n,o,{$:5,b:function(n){var r=n.a;return 0===n.$?d(a,e,r,t):f&&i?l(u,e,r.i,r.j,t):d(u,e,f?r.i:r.j,t)}})}return e.h=pn(s($n,o,n.b))}(u,r)}return t}(f,c);function c(n,r){n=s(e,n,i);o(i=n.a,r),Dn(f,n.b,u(i))}return Dn(f,r.b,u(i)),t?{ports:t}:{}}var b={};var qn=i(function(r,t){return{$:2,b:function(n){r.g(t),n({$:0,a:Y})},c:null}}),Nn=i(function(n,r){return s(yn,n.h,{$:0,a:r})});function En(r){return function(n){return{$:1,k:r,l:n}}}var Fn=i(function(n,r){return{$:3,n:n,o:r}}),Tn=[],Cn=!1;function Dn(n,r,t){if(Tn.push({p:n,q:r,r:t}),!Cn){Cn=!0;for(var e;e=Tn.shift();)!function(n,r,t){var e,u={};for(e in In(!0,r,u,null),In(!1,t,u,null),n)An(n[e],{$:"fx",a:u[e]||{i:$,j:$}})}(e.p,e.q,e.r);Cn=!1}}function In(n,r,t,e){switch(r.$){case 1:var u=r.k,a=function(n,r,t,e){function u(n){for(var r=t;r;r=r.t)n=r.s(n);return n}return s(n?b[r].e:b[r].f,u,e)}(n,u,e,r.l);return void(t[u]=function(n,r,t){return t=t||{i:$,j:$},n?t.i={$:1,a:r,b:t.i}:t.j={$:1,a:r,b:t.j},t}(n,a,t[u]));case 2:for(var f=r.m;f.b;f=f.b)In(n,f.a,t,e);return;case 3:In(n,r.o,t,{s:r.n,t:e})}}var Ln;var Jn="undefined"!=typeof document?document:{};function xn(n){return{$:0,a:n}}var Rn=i(function(a,f){return i(function(n,r){for(var t=[],e=0;r.b;r=r.b){var u=r.a;e+=u.b||0,t.push(u)}return e+=t.length,{$:1,c:f,d:Sn(n),e:t,f:a,b:e}})})(void 0);i(function(a,f){return i(function(n,r){for(var t=[],e=0;r.b;r=r.b){var u=r.a;e+=u.b.b||0,t.push(u)}return e+=t.length,{$:2,c:f,d:Sn(n),e:t,f:a,b:e}})})(void 0);var Bn=i(function(n,r){return{$:"a0",n:n,o:r}}),Gn=i(function(n,r){return{$:"a2",n:n,o:r}}),zn=i(function(n,r){return{$:"a3",n:n,o:r}});var Mn;function Sn(n){for(var r={};n.b;n=n.b){var t,e=n.a,u=e.$,a=e.n,e=e.o;"a2"===u?"className"===a?Yn(r,a,e):r[a]=e:(t=r[u]||(r[u]={}),"a3"===u&&"class"===a?Yn(t,a,e):t[a]=e)}return r}function Yn(n,r,t){var e=n[r];n[r]=e?e+" "+t:t}function A(n,r){var t=n.$;if(5===t)return A(n.k||(n.k=n.m()),r);if(0===t)return Jn.createTextNode(n.a);if(4===t){for(var e=n.k,u=n.j;4===e.$;)"object"!=typeof u?u=[u,e.j]:u.push(e.j),e=e.k;var a={j:u,p:r};return(f=A(e,a)).elm_event_node_ref=a,f}if(3===t)return Hn(f=n.h(n.g),r,n.d),f;var f=n.f?Jn.createElementNS(n.f,n.c):Jn.createElement(n.c);Ln&&"a"==n.c&&f.addEventListener("click",Ln(f)),Hn(f,r,n.d);for(var i=n.e,o=0;o<i.length;o++)f.appendChild(A(1===t?i[o]:i[o].b,r));return f}function Hn(n,r,t){for(var e in t){var u=t[e];"a1"===e?function(n,r){var t,e=n.style;for(t in r)e[t]=r[t]}(n,u):"a0"===e?function(n,r,t){var e,u=n.elmFs||(n.elmFs={});for(e in t){var a=t[e],f=u[e];if(a){if(f){if(f.q.$===a.$){f.q=a;continue}n.removeEventListener(e,f)}f=function(o,n){function c(n){var r=c.q,t=p(r.a,n);if(E(t)){for(var e,r=et(r),t=t.a,u=r?r<3?t.a:t.bd:t,a=1==r?t.b:3==r&&t.bv,f=(a&&n.stopPropagation(),(2==r?t.b:3==r&&t.bs)&&n.preventDefault(),o);e=f.j;){if("function"==typeof e)u=e(u);else for(var i=e.length;i--;)u=e[i](u);f=f.p}f(u,a)}}return c.q=n,c}(r,a),n.addEventListener(e,f,Mn&&{passive:et(a)<2}),u[e]=f}else n.removeEventListener(e,f),u[e]=void 0}}(n,r,u):"a3"===e?function(n,r){for(var t in r){var e=r[t];void 0!==e?n.setAttribute(t,e):n.removeAttribute(t)}}(n,u):"a4"===e?function(n,r){for(var t in r){var e=r[t],u=e.f,e=e.o;void 0!==e?n.setAttributeNS(u,t,e):n.removeAttributeNS(u,t)}}(n,u):("value"!==e&&"checked"!==e||n[e]!==u)&&(n[e]=u)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Mn=!0}}))}catch(n){}function On(n,r){var t=[];return T(n,r,t,0),t}function F(n,r,t,e){r={$:r,r:t,s:e,t:void 0,u:void 0};return n.push(r),r}function T(n,r,t,e){if(n!==r){var u=n.$,a=r.$;if(u!==a){if(1!==u||2!==a)return void F(t,0,e,r);r=function(n){for(var r=n.e,t=r.length,e=Array(t),u=0;u<t;u++)e[u]=r[u].b;return{$:1,c:n.c,d:n.d,e:e,f:n.f,b:n.b}}(r),a=1}switch(a){case 5:for(var f=n.l,i=r.l,o=f.length,c=o===i.length;c&&o--;)c=f[o]===i[o];if(c)return void(r.k=n.k);r.k=r.m();var b=[];return T(n.k,r.k,b,0),void(0<b.length&&F(t,1,e,b));case 4:for(var v=n.j,s=r.j,d=!1,l=n.k;4===l.$;)d=!0,"object"!=typeof v?v=[v,l.j]:v.push(l.j),l=l.k;for(var h=r.k;4===h.$;)d=!0,"object"!=typeof s?s=[s,h.j]:s.push(h.j),h=h.k;return d&&v.length!==s.length?void F(t,0,e,r):((d?function(n,r){for(var t=0;t<n.length;t++)if(n[t]!==r[t])return;return 1}(v,s):v===s)||F(t,2,e,s),void T(l,h,t,e+1));case 0:return void(n.a!==r.a&&F(t,3,e,r.a));case 1:return void Pn(n,r,t,e,Wn);case 2:return void Pn(n,r,t,e,Kn);case 3:if(n.h!==r.h)return void F(t,0,e,r);b=Vn(n.d,r.d),b=(b&&F(t,4,e,b),r.i(n.g,r.g));b&&F(t,5,e,b)}}}function Pn(n,r,t,e,u){var a;n.c!==r.c||n.f!==r.f?F(t,0,e,r):((a=Vn(n.d,r.d))&&F(t,4,e,a),u(n,r,t,e))}function Vn(n,r,t){var e,u,a,f,i;for(u in n)"a1"===u||"a0"===u||"a3"===u||"a4"===u?(a=Vn(n[u],r[u]||{},u))&&((e=e||{})[u]=a):u in r?(a=n[u])===(f=r[u])&&"value"!==u&&"checked"!==u||"a0"===t&&function(n,r){return n.$==r.$&&sn(n.a,r.a)}(a,f)||((e=e||{})[u]=f):(e=e||{})[u]=t?"a1"===t?"":"a0"===t||"a3"===t?void 0:{f:n[u].f,o:void 0}:"string"==typeof n[u]?"":null;for(i in r)i in n||((e=e||{})[i]=r[i]);return e}function Wn(n,r,t,e){var u=n.e,a=r.e,n=u.length,r=a.length;r<n?F(t,6,e,{v:r,i:n-r}):n<r&&F(t,7,e,{v:n,e:a});for(var f=n<r?n:r,i=0;i<f;i++){var o=u[i];T(o,a[i],t,++e),e+=o.b||0}}function Kn(n,r,t,e){for(var u=[],a={},f=[],i=n.e,o=r.e,c=i.length,b=o.length,v=0,s=0,d=e;v<c&&s<b;){var l=i[v],h=o[s],$=l.a,g=h.a,p=l.b,m=h.b,A=void 0,y=void 0;if($===g)T(p,m,u,++d),d+=p.b||0,v++,s++;else{var w,_,j,k,q=i[v+1],N=o[s+1];if(q&&(_=q.b,y=g===(w=q.a)),N&&(k=N.b,A=$===(j=N.a)),A&&y)T(p,k,u,++d),Un(a,u,$,m,s,f),d+=p.b||0,Xn(a,u,$,_,++d),d+=_.b||0,v+=2,s+=2;else if(A)d++,Un(a,u,g,m,s,f),T(p,k,u,d),d+=p.b||0,v+=1,s+=2;else if(y)Xn(a,u,$,p,++d),d+=p.b||0,T(_,m,u,++d),d+=_.b||0,v+=2,s+=1;else{if(!q||w!==j)break;Xn(a,u,$,p,++d),Un(a,u,g,m,s,f),d+=p.b||0,T(_,k,u,++d),d+=_.b||0,v+=2,s+=2}}}for(;v<c;){p=(l=i[v]).b;Xn(a,u,l.a,p,++d),d+=p.b||0,v++}for(;s<b;){var E=E||[];Un(a,u,(h=o[s]).a,h.b,void 0,E),s++}(0<u.length||0<f.length||E)&&F(t,8,e,{w:u,x:f,y:E})}var Qn="_elmW6BL";function Un(n,r,t,e,u,a){var f,i=n[t];if(i)return 1===i.c?(a.push({r:u,A:i}),i.c=2,T(i.z,e,f=[],i.r),i.r=u,void(i.s.s={w:f,A:i})):void Un(n,r,t+Qn,e,u,a);a.push({r:u,A:i={c:0,z:e,r:u,s:void 0}}),n[t]=i}function Xn(n,r,t,e,u){var a,f=n[t];if(f)return 0===f.c?(f.c=2,T(e,f.z,a=[],u),void F(r,9,u,{w:a,A:f})):void Xn(n,r,t+Qn,e,u);a=F(r,9,u,void 0),n[t]={c:1,z:e,r:u,s:a}}function Zn(n,r,t,e){!function n(r,t,e,u,a,f,i){var o=e[u];var c=o.r;for(;c===a;){var b,v=o.$;if(1===v?Zn(r,t.k,o.s,i):8===v?(o.t=r,o.u=i,0<(b=o.s.w).length&&n(r,t,b,0,a,f,i)):9===v?(o.t=r,o.u=i,(v=o.s)&&(v.A.s=r,0<(b=v.w).length&&n(r,t,b,0,a,f,i))):(o.t=r,o.u=i),!(o=e[++u])||(c=o.r)>f)return u}var s=t.$;if(4===s){for(var d=t.k;4===d.$;)d=d.k;return n(r,d,e,u,a+1,f,r.elm_event_node_ref)}var l=t.e;var h=r.childNodes;for(var $=0;$<l.length;$++){var g=1===s?l[$]:l[$].b,p=++a+(g.b||0);if(a<=c&&c<=p&&(u=n(h[$],g,e,u,a,p,i),!(o=e[u])||(c=o.r)>f))return u;a=p}return u}(n,r,t,0,0,r.b,e)}function nr(n,r,t,e){return 0===t.length?n:(Zn(n,r,t,e),rr(n,t))}function rr(n,r){for(var t=0;t<r.length;t++){var e=r[t],u=e.t,e=function(n,r){switch(r.$){case 0:return function(n,r,t){var e=n.parentNode,r=A(r,t);r.elm_event_node_ref||(r.elm_event_node_ref=n.elm_event_node_ref);e&&r!==n&&e.replaceChild(r,n);return r}(n,r.s,r.u);case 4:return Hn(n,r.u,r.s),n;case 3:return n.replaceData(0,n.length,r.s),n;case 1:return rr(n,r.s);case 2:return n.elm_event_node_ref?n.elm_event_node_ref.j=r.s:n.elm_event_node_ref={j:r.s,p:r.u},n;case 6:for(var t=r.s,e=0;e<t.i;e++)n.removeChild(n.childNodes[t.v]);return n;case 7:for(var u=(t=r.s).e,e=t.v,a=n.childNodes[e];e<u.length;e++)n.insertBefore(A(u[e],r.u),a);return n;case 9:if(!(t=r.s))return n.parentNode.removeChild(n),n;var f=t.A;return void 0!==f.r&&n.parentNode.removeChild(n),f.s=rr(n,t.w),n;case 8:return function(n,r){for(var t=r.s,e=function(n,r){if(n){for(var t=Jn.createDocumentFragment(),e=0;e<n.length;e++){var u=n[e].A;t.appendChild(2===u.c?u.s:A(u.z,r.u))}return t}}(t.y,r),u=(n=rr(n,t.w),t.x),a=0;a<u.length;a++){var f=u[a],i=f.A,i=2===i.c?i.s:A(i.z,r.u);n.insertBefore(i,n.childNodes[f.r])}e&&n.appendChild(e);return n}(n,r);case 5:return r.s(n);default:nn(10)}}(u,e);u===n&&(n=e)}return n}function tr(n){if(3===n.nodeType)return{$:0,a:n.textContent};if(1!==n.nodeType)return{$:0,a:""};for(var r=$,t=n.attributes,e=t.length;e--;)var u=t[e],r={$:1,a:s(zn,u.name,u.value),b:r};for(var a=n.tagName.toLowerCase(),f=$,i=n.childNodes,e=i.length;e--;)f={$:1,a:tr(i[e]),b:f};return d(Rn,a,r,f)}var er=o(function(r,n,t,f){return kn(n,f,r.bc,r.bA,r.bw,function(t,n){var e=r.bB,u=f.node,a=tr(u);return ar(n,function(n){var n=e(n),r=On(a,n);u=nr(u,a,r,t),a=n})})}),ur="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(n){return setTimeout(n,1e3/60)};function ar(t,e){e(t);var u=0;function a(){u=1===u?0:(ur(a),e(t),1)}return function(n,r){t=n,r?(e(t),2===u&&(u=1)):(0===u&&ur(a),u=2)}}var fr=i(function(t,e){return{$:2,b:function(n){var r=setInterval(function(){pn(e)},t);return function(){clearInterval(r)}},c:null}});function ir(n){return d(j,i(function(n,r){return r+1}),0,n)}function or(n){return n}function cr(n){return d(at,ot(y),C($),n)}function br(n){return z(st,n.b,n.a,0,!1,!0,!1)}function vr(n){switch(n){case 0:return{a:l($t,9,9,10,n),b:e};case 1:return{a:l($t,16,16,40,n),b:e};default:return{a:l($t,30,16,99,n),b:e}}}function sr(n){return{$:7,a:n}}function dr(n){return d(j,Mt,zt,n)}function lr(n){return s(Pt,0,n)}function hr(n){return Cr(n.G)}function $r(n){return n.H}function gr(n){var r=n.b;return s(oe,1664525*n.a+r>>>0,r)}function pr(r){return function(n){return{a:r,b:n}}}function mr(n){return((n=277803737*((n=n.a)^n>>>4+(n>>>28)))>>>22^n)>>>0}function Ar(n){var r=function(n){return Ce(n.d)?0:De(n)?1:3}(n);return r?{a:u(n,{q:r}),b:e}:{a:u(n,{q:0,d:Ie(n.d)}),b:e}}function yr(n){switch(n){case"Easy":return a(0);case"Medium":return a(1);case"Advanced":return a(2);default:return a(0)}}function wr(n){return s(au,"contextmenu",tt({bd:n,bs:!0,bv:!0}))}var _r,jr=1,kr=2,qr=0,y=O,Nr=v(function(n,r,t){for(;;){if(-2===t.$)return r;var e=t.d,u=n,a=d(n,t.b,t.c,d(Nr,n,r,t.e));n=u,r=a,t=e}}),Er=function(n){return d(Nr,v(function(n,r,t){return s(y,{a:n,b:r},t)}),$,n)},Fr=Q,Tr=v(function(t,n,r){var e=r.c,r=r.d,u=i(function(n,r){return d(Fr,n.$?t:u,r,n.a)});return d(Fr,u,d(Fr,t,n,r),e)}),Cr=function(n){return d(Tr,y,$,n)},w=function(n){return{$:1,a:n}},Dr=i(function(n,r){return{$:3,a:n,b:r}}),Ir=i(function(n,r){return{$:0,a:n,b:r}}),Lr=i(function(n,r){return{$:1,a:n,b:r}}),_=function(n){return{$:0,a:n}},Jr=function(n){return{$:2,a:n}},xr=function(n){return{$:0,a:n}},Rr={$:1},Br=function(n){return n+""},j=v(function(n,r,t){for(;;){if(!t.b)return r;var e=t.b,u=n,a=s(n,t.a,r);n=u,r=a,t=e}}),Gr=v(function(n,r,t){for(;;){if(h(n,r)>=1)return t;var e=n,u=r-1,a=s(y,r,t);n=e,r=u,t=a}}),zr=i(function(n,r){return d(Gr,n,r,$)}),Mr=function(n){return d(j,y,$,n)},k=o(function(n,r,t,e){return{$:0,a:n,b:r,c:t,d:e}}),Sr=[],Yr=rn,Hr=i(function(n,r){return en(r)/en(n)}),q=Yr(s(Hr,2,32)),Or=l(k,0,q,Sr,Sr),Pr=P,Vr=tn,N=function(n){return n.length},Wr=i(function(n,r){return 0<h(n,r)?n:r}),Kr=V,Qr=i(function(n,r){for(;;){var t=s(Kr,32,n),e=t.b,t=s(y,{$:0,a:t.a},r);if(!e.b)return Mr(t);n=e,r=t}}),Ur=i(function(n,r){for(;;){var t=Yr(r/32);if(1===t)return s(Kr,32,n).a;n=s(Qr,n,$),r=t}}),Xr=i(function(n,r){var t,e;return r.e?(e=Vr(s(Hr,32,(t=32*r.e)-1)),n=n?Mr(r.h):r.h,n=s(Ur,n,r.e),l(k,N(r.g)+t,s(Wr,5,e*q),n,r.g)):l(k,N(r.g),q,Sr,r.g)}),Zr=B(function(n,r,t,e,u){for(;;){if(r<0)return s(Xr,!1,{h:e,e:t/32|0,g:u});var a={$:1,a:d(Pr,32,r,n)};n=n,r=r-32,t=t,e=s(y,a,e),u=u}}),nt=i(function(n,r){var t;return 0<n?c(Zr,r,n-(t=n%32)-32,n,$,d(Pr,t,n-t,r)):Or}),E=function(n){return!n.$},rt=fn,tt=function(n){return{$:0,a:n}},et=function(n){switch(n.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},C=hn,O=C(0),ut=o(function(n,r,t,e){var u,a,f,i;return e.b?(u=e.a,(e=e.b).b?(a=e.a,(e=e.b).b?(f=e.a,(e=e.b).b?(i=e.b,s(n,u,s(n,a,s(n,f,s(n,e.a,500<t?d(j,n,r,Mr(i)):l(ut,n,r,t+1,i)))))):s(n,u,s(n,a,s(n,f,r)))):s(n,u,s(n,a,r))):s(n,u,r)):r}),at=v(function(n,r,t){return l(ut,n,r,0,t)}),ft=i(function(t,n){return d(at,i(function(n,r){return s(y,t(n),r)}),$,n)}),D=$n,it=i(function(r,n){return s(D,function(n){return C(r(n))},n)}),ot=v(function(t,n,e){return s(D,function(r){return s(D,function(n){return C(s(t,r,n))},e)},n)}),ct=qn,bt=i(function(n,r){return mn(s(D,ct(n),r))}),Q=v(function(n,r,t){return s(it,function(n){return 0},cr(s(ft,bt(n),r)))}),rn=(b.Task={b:O,c:Q,d:v(function(n,r,t){return C(0)}),e:i(function(n,r){return s(it,n,r)}),f:void 0},En("Task"),er),vt=G(function(n,r,t,e,u,a){return{Y:u,A:t,q:e,au:a,_:r,d:n}}),st=G(function(n,r,t,e,u,a){return{D:a,t:u,F:e,I:t,a:n,b:r}}),dt=i(function(n,r){return{a:1+(r/n|0),b:1+r%n}}),lt=v(function(n,r,t){return{G:s(nt,n*r,function(n){return t(s(dt,r,n))}),H:r,J:n}}),ht=i(function(n,r){return d(lt,r,n,br)}),$t=o(function(n,r,t,e){return z(vt,s(ht,n,r),t,0,2,0,e)}),e=function(n){return{$:2,m:n}}($),gt=i(function(n,r){return{$:0,a:n,b:r}}),pt=i(function(n,r){return{aJ:r,aV:n}}),mt={$:-2},At=mt,P=C(s(pt,At,At)),yt=S,wt=i(function(n,r){for(;;){if(-2===r.$)return Rr;var t=r.c,e=r.d,u=r.e;switch(s(yt,n,r.b)){case 0:n=n,r=e;continue;case 1:return xr(t);default:n=n,r=u;continue}}}),I=B(function(n,r,t,e,u){return{$:-1,a:n,b:r,c:t,d:e,e:u}}),_t=B(function(n,r,t,e,u){var a,f,i,o;return-1!==u.$||u.a?-1!==e.$||e.a||-1!==e.d.$||e.d.a?c(I,n,r,t,e,u):(a=e.d,o=e.e,c(I,0,e.b,e.c,c(I,1,a.b,a.c,a.d,a.e),c(I,1,r,t,o,u))):(a=u.b,f=u.c,i=u.d,u=u.e,-1!==e.$||e.a?c(I,n,a,f,c(I,0,r,t,e,i),u):c(I,0,r,t,c(I,1,e.b,e.c,e.d,o=e.e),c(I,1,a,f,i,u)))}),jt=v(function(n,r,t){if(-2===t.$)return c(I,0,n,r,mt,mt);var e=t.a,u=t.b,a=t.c,f=t.d,i=t.e;switch(s(yt,n,u)){case 0:return c(_t,e,u,a,d(jt,n,r,f),i);case 1:return c(I,e,u,r,f,i);default:return c(_t,e,u,a,f,d(jt,n,r,i))}}),kt=v(function(n,r,t){n=d(jt,n,r,t);return-1!==n.$||n.a?n:c(I,1,n.b,n.c,n.d,n.e)}),qt=i(function(n,r){var t=n.a,n=n.b,e=s(wt,t,r);return d(kt,t,1===e.$?g([n]):s(y,n,e.a),r)}),Nt=function(t){return{$:2,b:function(n){var r=t.f;2===r.$&&r.c&&r.c(),t.f=null,n({$:0,a:Y})},c:null}},Et=v(function(n,r,t){for(;;){if(-2===t.$)return r;var e=t.e,u=n,a=d(n,t.b,t.c,d(Et,n,r,t.d));n=u,r=a,t=e}}),Ft=G(function(o,c,b,n,r,t){n=d(Et,v(function(n,r,t){for(;;){var e=t.a,u=t.b;if(!e.b)return{a:e,b:d(b,n,r,u)};var a=e.a,f=a.a,a=a.b,i=e.b;if(0<=h(f,n))return 0<h(f,n)?{a:e,b:d(b,n,r,u)}:{a:i,b:l(c,f,a,r,u)};n=n,r=r,t={a:i,b:d(o,f,a,u)}}}),{a:Er(n),b:t},r),t=n.a,r=n.b;return d(j,i(function(n,r){return d(o,n.a,n.b,r)}),r,t)}),Tt=Nn,Ct=fr,Dt=mn,It=v(function(r,n,t){var e,u;return n.b?(u=n.b,n=Dt(s(Ct,e=n.a,s(Tt,r,e))),s(D,function(n){return d(It,r,u,d(kt,e,n,t))},n)):C(t)}),tn=v(function(r,n,t){var t=t.aJ,e=v(function(n,r,t){var e=t.c;return{a:t.a,b:t.b,c:s(D,function(n){return e},Nt(r))}}),u=d(j,qt,At,n),n=z(Ft,v(function(n,r,t){var e=t.b,u=t.c;return{a:s(y,n,t.a),b:e,c:u}}),o(function(n,r,t,e){var u=e.c;return{a:e.a,b:d(kt,n,t,e.b),c:u}}),e,u,t,{a:$,b:At,c:C(0)}),a=n.a,f=n.b;return s(D,function(n){return C(s(pt,u,n))},s(D,function(n){return d(It,r,a,f)},n.c))}),Lt=(_r=or,{$:2,b:function(n){n({$:0,a:_r(Date.now())})},c:null}),V=v(function(t,n,r){var e,n=s(wt,n,r.aV);return 1===n.$?C(r):(e=n.a,s(D,function(n){return C(r)},s(D,function(r){return cr(s(ft,function(n){return s(ct,t,n(r))},e))},Lt)))}),Jt=v(function(n,r,t){return n(r(t))}),xt=(b.Time={b:P,c:tn,d:V,e:0,f:i(function(n,r){return s(gt,r.a,s(Jt,n,r.b))})},En("Time")),Rt=i(function(n,r){return xt(s(gt,n,r))}),a=function(n){return{$:0,a:n}},Bt={$:6},Gt=i(function(t,n){return d(at,i(function(n,r){return t(n)?s(y,n,r):r}),$,n)}),zt=At,Mt=i(function(n,r){return d(kt,n,0,r)}),St=i(function(e,n){return d(Et,v(function(n,r,t){return s(e,n,r)?d(kt,n,r,t):t}),At,n)}),Yt=i(function(n,r){return!s(wt,n,r).$}),Ht=i(function(n,t){return s(St,i(function(n,r){return s(Yt,n,t)}),n)}),Ot=i(function(n,r){return s(Ht,n,r)}),Pt=i(function(n,r){for(;;){if(-2===r.$)return n;var t=r.d;n=s(Pt,n+1,r.e),r=t}}),Vt=i(function(n,r){return lr(s(Ot,dr(g([{a:n.a-1,b:n.b-1},{a:n.a-1,b:n.b+0},{a:n.a-1,b:n.b+1},{a:n.a+0,b:n.b-1},{a:n.a+0,b:n.b+1},{a:n.a+1,b:n.b-1},{a:n.a+1,b:n.b+0},{a:n.a+1,b:n.b+1}])),dr(s(ft,function(n){return{a:n.a,b:n.b}},s(Gt,function(n){return n.D},hr(r))))))}),Wt=br({a:0,b:0}),Kt=i(function(n,r){return(r.a-1)*n+r.b-1}),L=4294967295>>>32-q,Qt=W,Ut=v(function(n,r,t){for(;;){var e=s(Qt,L&r>>>n,t);if(e.$)return s(Qt,L&r,e.a);n=n-q,r=r,t=e.a}}),Xt=i(function(n,r){var t=r.a,e=r.b,u=r.c,r=r.d;return n<0||-1<h(n,t)?Rr:-1<h(n,t>>>5<<5)?xr(s(Qt,L&n,r)):xr(d(Ut,e,n,u))}),Zt=v(function(n,r,t){var e=t.H,u=t.G;return 0<h(n,t.J)||0<h(r,e)?Rr:s(Xt,s(Kt,e,{a:n,b:r}),u)}),ne=function(n){return n.J},re=U,te=i(function(r,n){function t(n){return n.$?{$:1,a:s(re,r,n.a)}:{$:0,a:s(re,t,n.a)}}var e=n.d;return l(k,n.a,n.b,s(re,t,n.c),s(re,r,e))}),ee=i(function(n,r){return{G:s(te,n,r.G),H:r.H,J:r.J}}),ue=o(function(r,t,e,n){return s(ee,function(n){return f(n.a,r)&&f(n.b,t)?e:n},n)}),ae=i(function(n,r){return r.$?n:r.a}),J=v(function(n,r,t){var e=s(ae,u(Wt,{t:!1}),d(Zt,r,n,t));return n<1||r<1||0<h(n,$r(t))||0<h(r,ne(t))||!e.t||e.D?t:0<e.I||e.F?l(ue,e.a,e.b,u(e,{t:!1}),t):d(J,e.a+1,e.b+1,d(J,e.a+1,e.b+0,d(J,e.a+1,e.b-1,d(J,e.a+0,e.b+1,d(J,e.a+0,e.b-1,d(J,e.a-1,e.b+1,d(J,e.a-1,e.b+0,d(J,e.a-1,e.b-1,l(ue,e.a,e.b,u(e,{t:!1}),t)))))))))}),fe=i(function(n,r){return f(n.I,s(Vt,n,r))?d(J,n.a+1,n.b+1,d(J,n.a+1,n.b+0,d(J,n.a+1,n.b-1,d(J,n.a+0,n.b+1,d(J,n.a+0,n.b-1,d(J,n.a-1,n.b+1,d(J,n.a-1,n.b+0,d(J,n.a-1,n.b-1,r)))))))):r}),ie=i(function(n,r){return{$:5,a:n,b:r}}),oe=i(function(n,r){return{$:0,a:n,b:r}}),fn=s(D,function(n){return C(function(n){var r=gr(s(oe,0,1013904223));return gr(s(oe,r.a+n>>>0,r.b))}(n))},Lt),ce=i(function(n,r){return n(r)}),be=v(function(r,n,t){var e,u;return n.b?(e=n.b,u=(n=s(ce,n.a,t)).b,s(D,function(n){return d(be,r,e,u)},s(ct,r,n.a))):C(t)}),qn=v(function(n,r,t){return C(t)}),ve=i(function(t,n){var e=n;return function(n){var n=e(n),r=n.b;return{a:t(n.a),b:r}}}),se=(b.Random={b:fn,c:be,d:qn,e:i(function(n,r){return s(ve,n,r)}),f:void 0},En("Random")),de=i(function(n,r){return se(s(ve,n,r))}),le=i(function(t,n){var e=n;return function(n){var n=e(n),r=n.b;return t(n.a)(r)}}),he=i(function(r,t){return s(le,function(n){return r(n)?pr(n):s(he,r,t)},t)}),$e=i(function(o,c){return function(n){var r=h(o,c)<0?{a:o,b:c}:{a:c,b:o},t=r.a,e=r.b-t+1;if(!(e-1&e))return{a:((e-1&mr(n))>>>0)+t,b:gr(n)};for(var u=(-e>>>0)%e>>>0,a=n;;){var f=mr(a),i=gr(a);if(h(f,u)>=0)return{a:f%e+t,b:i};a=i}}}),ge=v(function(e,n,r){var u=n,a=r;return function(n){var n=u(n),r=n.a,n=a(n.b),t=n.b;return{a:s(e,r,n.a),b:t}}}),pe=i(function(n,r){return d(ge,i(function(n,r){return{a:n,b:r}}),n,r)}),me=i(function(n,u){var a=v(function(r,t,e){return 0<t&&10!==e?s(le,function(n){n=s(Mt,n,r);return f(lr(n),lr(r))?d(a,r,t,e+1):d(a,n,t-1,0)},u):pr(r)});return d(a,zt,n,0)}),Ae=o(function(t,n,r,e){return s(me,e,s(he,function(n){var r=n.b;return!(f(n.a,t.a)&&f(r,t.b))},s(pe,s($e,1,n),s($e,1,r))))}),ye=i(function(n,r){return s(de,ie(n),l(Ae,n,$r(r.d),ne(r.d),r._))}),we=i(function(n,r){return lr(s(Ot,r,dr(g([{a:n.a-1,b:n.b-1},{a:n.a-1,b:n.b+0},{a:n.a-1,b:n.b+1},{a:n.a+0,b:n.b-1},{a:n.a+0,b:n.b+1},{a:n.a+1,b:n.b-1},{a:n.a+1,b:n.b+0},{a:n.a+1,b:n.b+1}]))))}),_e=i(function(n,r){return s(Yt,n,r)}),je=i(function(r,n){return s(ee,function(n){return u(n,{I:s(we,n,r)})},s(ee,function(n){return u(n,{F:s(_e,{a:n.a,b:n.b},r)})},n.d))}),ke=i(function(n,r){return f(n.a,r.a)&&f(n.b,r.b)?u(r,{D:!0}):r}),qe=i(function(n,r){return u(r,{A:r.A+1,q:3,d:s(ee,ke(n),r.d)})}),Ne=i(function(n,r){return u(r,{A:r.A-1,d:l(ue,n.a,n.b,u(n,{D:!1}),r.d)})}),Ee=i(function(n,r){return n.F?l(ue,n.a,n.b,u(n,{t:!1}),r):d(J,n.a,n.b,r)}),Fe=s(Fn,i(function(n,r){return n})(Bt),e),Te=i(function(n,r){return h(n,r)<0}),Ce=function(n){return s(Te,0,ir(s(Gt,function(n){return n.F&&!n.t},hr(n))))},De=function(n){return f(d(at,function(r){return function(n){return r.t?n+1:n}},0,hr(n.d)),n.A)&&f(n.A,n._)},Ie=function(n){return s(ee,function(n){return u(n,{t:!1})},n)},Le=i(function(n,r){if(!(1!==r.q&&r.q||f(n,a(0))||f(n,a(1))||f(n,a(2))))return{a:r,b:e};switch(n.$){case 0:return vr(n.a);case 7:return 3===r.q?{a:u(r,{Y:r.Y+1}),b:e}:{a:r,b:e};case 3:var t=n.a;return 2===r.q?{a:s(qe,t,r),b:s(ye,t,r)}:s(Le,Bt,s(qe,t,r));case 4:return{a:s(Ne,t=n.a,r),b:Fe};case 1:t=n.a;return 2===r.q?{a:u(r,{q:3}),b:s(ye,t,r)}:s(Le,Bt,u(r,{d:s(Ee,t,r.d)}));case 5:return{a:u(r,{d:d(J,(t=n.a).a,t.b,s(je,n.b,r))}),b:e};case 6:return Ar(r);default:return s(Le,Bt,u(r,{d:s(fe,t=n.a,r.d)}))}}),Je=ln,t=i(function(n,r){return s(Gn,n,Je(r))})("className"),x=Rn("div"),xe=function(n){return{a:n,b:!0}},Re=Bn,Be=i(function(n,r){return s(Re,n,{$:1,a:r})}),Ge=an,O=un,ze=s(i(function(n,r){return d(at,Ge,r,n)}),g(["target","value"]),O),Me=Rn("option"),Se=Rn("select"),R=xn,Ye=Rn("button"),He=i(function(n,r){return s(Re,n,{$:0,a:r})}),Oe=function(n){return s(He,"click",tt(n))},Pe=v(function(n,r,t){for(;;){var e=s(Kr,32,n),u=e.a,e=e.b;if(h(N(u),32)<0)return s(Xr,!0,{h:r,e:t,g:u});n=e,r=s(y,{$:1,a:u},r),t=t+1}}),Ve=Z,We=X,Ke=i(function(n,r){var t=N(n),e=32-N(r.g)-t,u=d(Ve,32,r.g,n);return e<0?{h:s(y,{$:1,a:u},r.h),e:r.e+1,g:d(We,e,t,n)}:e?{h:r.h,e:r.e,g:u}:{h:s(y,{$:1,a:u},r.h),e:r.e+1,g:Sr}}),Qe=i(function(n,r){for(;;){if(n<=0)return r;if(!r.b)return r;n=n-1,r=r.b}}),Ue=i(function(n,r){var t,e=r.a,u=r.c,a=r.d;return n?-1<h(n,e>>>5<<5)?l(k,e-n,q,Sr,d(We,n-(e>>>5<<5),N(a),a)):(e=n/32|0,a=d(Fr,t=i(function(n,r){return n.$?s(y,n.a,r):d(Fr,t,r,n.a)}),g([a]),u),(u=s(Qe,e,a)).b?(a=u.b,e={h:$,e:0,g:d(We,n-32*e,N(n=u.a),n)},s(Xr,!0,d(j,Ke,e,a))):Or):r}),Xe=o(function(n,r,t,e){for(;;){var u=s(Qt,L&t>>>n,e);if(u.$)return d(We,0,L&r,u.a);n=n-q,r=r,t=t,e=u.a}}),Ze=v(function(n,r,t){for(;;){if(h(n,r)<1||!N(t))return t;var e=s(Qt,0,t);if(e.$)return t;n=n-q,r=r,t=e.a}}),nu=K,ru=v(function(n,r,t){var e=L&r>>>n,u=s(Qt,e,t);return!u.$&&N(n=d(ru,n-q,r,u.a))?d(nu,e,{$:0,a:n},d(We,0,1+e,t)):d(We,0,e,t)}),tu=i(function(n,r){var t=r.a,e=r.b,u=r.c,a=r.d;return f(n,t)?r:-1<h(n,t>>>5<<5)?l(k,n,e,u,d(We,0,L&n,a)):(t=Vr(s(Hr,32,s(Wr,1,(r=n>>>5<<5)-1))),l(k,n,a=s(Wr,5,t*q),d(Ze,e,a,d(ru,e,r,u)),l(Xe,e,n,r,u)))}),eu=i(function(n,r){r=r.a,n=n<0?r+n:n;return n<0?0:0<h(n,r)?r:n}),uu=v(function(n,r,t){r=s(eu,r,t),n=s(eu,n,t);return 0<h(n,r)?Or:s(Ue,n,s(tu,r,t))}),au=i(function(n,r){return s(Re,n,{$:3,a:r})}),fu=i(function(n,r){return r.F&&!r.t?s(x,g([t("cell mine")]),g([R("💣")])):n||!r.D||r.F?r.D?s(x,g([t("cell"),wr({$:4,a:r})]),g([R("🚩")])):r.t?s(x,g([t("cell hidden"),Oe({$:1,a:r}),wr({$:3,a:r})]),g([R(" ")])):r.I?s(x,g([t("cell revealed nearby-"+Br(r.I)),s(He,"dblclick",tt({$:2,a:r}))]),g([R(Br(r.I))])):s(x,g([t("cell revealed")]),g([R("")])):s(x,g([t("cell mine")]),g([s(x,g([t("wrong-flag")]),g([R("❌")])),R("🚩")]))}),iu=i(function(n,r){return s(x,g([t("row")]),Cr(s(te,fu(n.q),d(uu,(r-1)*$r(n.d),r*$r(n.d),(r=hr(n.d)).b?d(Pe,r,$,0):Or))))}),Q=rn({bc:function(n){return vr(0)},bw:function(n){return s(Rt,1e3,sr)},bA:Le,bB:function(n){return s(x,$,g([s(x,g([t("choose")]),g([s(Se,g([s(Be,"input",s(rt,xe,s(rt,yr,ze)))]),g([s(Me,$,g([R("Easy")])),s(Me,$,g([R("Medium")])),s(Me,$,g([R("Advanced")]))]))])),s(x,g([t("container")]),g([s(x,g([t("header")]),g([s(x,$,g([s(x,g([t("header-flags")]),g([R(Br(n._-n.A))]))])),s(x,g([t("header-middle")]),g([s(x,g([t("header-newgame")]),g([function(n){return s(Ye,g([Oe(a(n.au))]),g([function(){switch(n.q){case 2:return R("🙂");case 0:return R("🤯");case 1:return R("😎");default:return R("🙂")}}()]))}(n)]))])),s(x,$,g([s(x,g([t("header-time")]),g([R(Br(n.Y))]))]))])),function(n){return s(x,g([t("map")]),s(ft,iu(n),s(zr,1,ne(n.d))))}(n)]))]))}});er={Minesweeper:{init:Q(tt(0))(0)}},n.Elm?function n(r,t){for(var e in t)e in r?"init"==e?nn(6):n(r[e],t[e]):r[e]=t[e]}(n.Elm,er):n.Elm=er}(this);