(this.webpackJsonpview=this.webpackJsonpview||[]).push([[0],[,,,,,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(4),r=n.n(c),o=(n(10),n(11),n(12),function(e){return i.a.createElement("div",{className:"item-list"},i.a.createElement("div",{className:"item-list-title"},"item list"),e.items.map((function(t,n){return n===e.selected?i.a.createElement("div",{key:n,className:"item-text item-selected",onClick:function(){return e.set(n)}},t.name):i.a.createElement("div",{key:n,className:"item-text",onClick:function(){return e.set(n)}},t.name)})))}),s=(n(13),function(){return i.a.createElement("div",{className:"main-menu"},i.a.createElement("div",{className:"menu-element"},"click on an item in the item list"),i.a.createElement("div",{className:"menu-element"},"mouse down on the pic and move"),i.a.createElement("div",{className:"menu-element"},"mouse down on the pic and scroll"))}),m=n(1),u=(n(14),"https://".concat("raw.githubusercontent.com/asm-jaime/gin-react-360-image/master/public/testdata.json")),l="http://".concat("localhost:8081/api/v1","/items"),d="http://".concat("localhost:8081/api/v1","/images"),f=function(e){var t=i.a.useState({start:0,startIndex:0}),n=Object(m.a)(t,2),a=n[0],c=n[1],r=i.a.useState(!1),o=Object(m.a)(r,2),s=o[0],u=o[1],l=i.a.useState(0),d=Object(m.a)(l,2),f=d[0],g=d[1],p=i.a.useState(0),E=Object(m.a)(p,2),v=E[0],h=E[1],y=i.a.useState("./loading.gif"),I=Object(m.a)(y,2),w=I[0],b=I[1],j=function(t){t.preventDefault(),t.deltaY<0&&v<e.item.qualitysize-1?(h(v+1),e.getImage(f,v).then(b)):t.deltaY>0&&v>0&&(h(v-1),e.getImage(f,v).then(b))},O=function(){u(!1)},S=function(t){s&&function(t){var n=e.item.size,i=360/n*1,c=(a.start-t)/i,r=Math.floor(c)%n;r<0&&(r=n+r-1),(r=(r+a.startIndex)%n)!==f&&(g(r),e.getImage(f,v).then(b))}(t.screenX)};i.a.useEffect((function(){e.getImage(0,0).then(b)}),[e.getImage,e]),i.a.useEffect((function(){return document.addEventListener("mousemove",S,!1),document.addEventListener("mouseup",O,!1),document.getElementById("item360").addEventListener("wheel",j,!1),function(){document.getElementById("item360").removeEventListener("wheel",j,!1),document.removeEventListener("mousemove",S,!1),document.removeEventListener("mouseup",O,!1)}}));return i.a.createElement("div",{className:"item360"},i.a.createElement("div",{className:"item360-quality"},"quality: ",v),i.a.createElement("div",{className:"image-container",onMouseDown:function(e){e.persist(),u(!0),c({start:e.screenX,startIndex:f})},onDragStart:function(e){e.preventDefault()},id:"item360"},i.a.createElement("img",{className:"image-360",alt:"",src:w})))},g=n(2),p=i.a.createContext(),E={current:0,items:[{name:"empty",size:1,qualitysize:0,images:[[{image:"./loading.gif"}],[{image:"./loading.gif"}]]}]};function v(e,t){switch(console.log("action: ",t),console.log("state: ",e),t.type){case"ITEM_SET":return Object(g.a)({},e,{current:t.payload});case"ITEM_IMAGE_SET":var n=e.items.slice(),a=n[e.current].images.slice();return a[t.payload.quality][t.payload.index].image=t.payload.image,n[e.current].images=a,Object(g.a)({},e,{items:n});case"ITEMS_LOAD":return Object(g.a)({},e,{items:t.payload});case"STATE_LOAD":return Object(g.a)({},e,{},t.payload);default:return e}}var h=function(){var e=i.a.useContext(p),t=e.state,n=e.dispatch;return i.a.useEffect((function(){fetch(l).then((function(e){return e.json()})).then((function(e){return e.body.map((function(e){return{name:e.name,size:e.size,quality:0,qualitysize:e.qualitysize,images:Array.apply(null,{length:e.qualitysize}).map((function(){return Array.apply(null,{length:e.size}).map((function(){return{image:""}}))}))}}))})).then((function(e){return n({type:"ITEMS_LOAD",payload:e})})).catch((function(){return fetch("".concat(u))})).then((function(e){return e.json()})).then((function(e){return n({type:"STATE_LOAD",payload:e})})).catch(console.log)}),[n]),i.a.createElement("div",{className:"App"},i.a.createElement(s,null),i.a.createElement(o,{selected:t.current,items:t.items,set:function(e){return n({type:"ITEM_SET",payload:e})}}),i.a.createElement(f,{item:t.items[t.current],getImage:function(e,a){return""===t.items[t.current].images[a][e].image?function(e,a){var i=t.items[t.current];return fetch("".concat(d,"/").concat(i.name,"/").concat(a,"/").concat(e)).then((function(e){return e.json()})).then((function(t){return n({type:"ITEM_IMAGE_SET",payload:{index:e,quality:a,image:t.body.image}}),t.body.image}))}(e,a):new Promise((function(n){n(t.items[t.current].images[a][e].image)}))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement((function(e){var t=i.a.useReducer(v,E),n=Object(m.a)(t,2),a={state:n[0],dispatch:n[1]};return i.a.createElement(p.Provider,{value:a},e.children)}),null,i.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[5,1,2]]]);
//# sourceMappingURL=main.8567c042.chunk.js.map