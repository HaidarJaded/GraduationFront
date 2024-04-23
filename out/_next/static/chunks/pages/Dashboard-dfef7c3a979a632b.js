(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[156],{4555:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Dashboard",function(){return n(1717)}])},5745:function(e,t,n){"use strict";n.d(t,{R:function(){return c}});var r=n(1752),l=n.n(r),i=n(5250),s=n(1993);let{publicRuntimeConfig:a}=l()(),d="".concat(a.apiUrl),c={getAll:async e=>{try{return await s.Z.get("".concat(d).concat("api/completed_devices"),{params:e}).then(async e=>{var t;return await (null==e?void 0:null===(t=e.data)||void 0===t?void 0:t.body)})}catch(e){(0,i.Z)(null==e?void 0:e.response)}}}},1717:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return T}});var r=n(5893),l=n(1163),i=n(7294),s=n(1955),a=n(9239),d=n(822),c=n(6242),o=n(2023),x=n(4267),u=n(9417),h=n(5861),g=n(3946),m=n(4613),j=n(7564);d.Z;let b=e=>{let{name:t,number:n,children:l}=e;return(0,r.jsxs)(i.Fragment,{children:[(0,r.jsxs)(x.Z,{sx:{direction:"rtl",backgroundColor:"white",px:0,pt:2.5,pb:0,minWidth:260,maxWidth:260},children:[(0,r.jsx)(h.Z,{sx:{mx:2,mb:.4,fontSize:14},color:"text.primary",children:t}),(0,r.jsxs)(h.Z,{sx:{fontSize:26,fontWeight:"bold"},variant:"body2",children:[(0,r.jsx)(g.Z,{"aria-label":"icon",children:(0,r.jsx)(j.Z,{sx:{fontSize:"0.5rem",height:"3em",width:"4em",color:"#694096"},children:l})}),n]})]}),(0,r.jsx)(o.Z,{children:(0,r.jsx)(u.Z,{size:"small",sx:{color:"#6d40dc",height:"1.5em"},children:(0,r.jsx)(m.Z,{sx:{height:"2rem",width:"2em"}})})})]})};function f(e){let{name:t,number:n,children:l}=e;return(0,r.jsx)(d.Z,{sx:{mx:2,my:1},children:(0,r.jsx)(c.Z,{variant:"outlined",sx:{borderRadius:"15px",boxShadow:"8px 6px 11px -1px rgba(0,0,0,0.2)"},children:(0,r.jsx)(b,{name:t,number:n,children:l})})})}var p=n(4979),Z=n(55),v=n(6024),w=n(1865),y=n(406),_=n(2017),k=n(5745);function C(){let[e,t]=(0,i.useState)([]);(0,i.useEffect)(()=>{(async()=>{let e=await a.Uh.getAll({repaired_in_center:1,with:"client,user",deliver_to_client:0});e?t(e):t([])})()},[]);let[n,l]=(0,i.useState)([]);(0,i.useEffect)(()=>{(async()=>{let e=await k.R.getAll({repaired_in_center:1});e?l(e):l([])})()},[]);let s=new Date,d=s.getMonth()+1;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{style:{display:" flex",alignContent:"center",alignItems:"baseline",flexDirection:"row-reverse",flexWrap:"wrap",justifyContent:" flex-start"},children:[(0,r.jsx)(f,{name:"عدد الأجهزة الموجودة في المركز",number:e.length,children:(0,r.jsx)(p.Z,{})}),(0,r.jsx)(f,{name:"عدد الجاهز منها",number:e.filter(e=>"جاهز"===e.status).length,children:(0,r.jsx)(Z.Z,{})}),(0,r.jsx)(f,{name:"عدد الذي يتم العمل عليه",number:e.filter(e=>"قيد العمل"===e.status).length,children:(0,r.jsx)(v.Z,{})}),(0,r.jsx)(f,{name:"عدد الاجهزة القابلة للتسليم",number:e.filter(e=>"لا يصلح"===e.status||"لم يوافق على العمل به"===e.status||"غير جاهز"===e.status||"جاهز"===e.status).length,children:(0,r.jsx)(v.Z,{})}),(0,r.jsx)(f,{name:" عدد التي تم تسليمها جاهزة",number:n.filter(e=>"جاهز"===e.status).length,children:(0,r.jsx)(w.Z,{})}),(0,r.jsx)(f,{name:" عدد التي تم تسليمها غير جاهزة",number:n.filter(e=>"غير جاهز"===e.status||"لا يصلح"===e.status).length,children:(0,r.jsx)(y.Z,{})}),(0,r.jsx)(f,{name:"عدد الأجهزة التي تم تسليمها هذا الشهر",number:n.filter(e=>{let t=new Date(e.date_delivery),n=t.getMonth()+1;return t.getFullYear()===s.getFullYear()&&n===d}).length,children:(0,r.jsx)(_.Z,{})})]})})}var E=n(3679),S=n(2734);function A(){return(0,S.Z)(),(0,r.jsx)("div",{style:{backgroundColor:"White",display:"flex",alignItems:"center",height:"300px",padding:"20px"},children:(0,r.jsx)(E.u,{series:[{data:[{id:0,value:10,label:"mmmm",color:"rgba(34,110,138,0.64)"},{id:2,value:14,label:"series C",color:"rgba(49,32,103,0.82)"},{id:1,value:15,label:"series B",color:"rgb(248,217,106)"}]}],width:500,height:240})})}var F=n(8547);function N(){return(0,r.jsx)("div",{style:{backgroundColor:"White",borderRadius:"10px",boxShadow:"0 45px 50% black",display:"flex",alignItems:"center",height:"300px",padding:"20px"},children:(0,r.jsx)(F.v,{xAxis:[{scaleType:"band",data:["الاسبوع الاول","السبوع الثاني","الاسبوع الثالث","الاسبوع الرابع"]}],series:[{data:[4,3,5,8],color:"rgb(248,217,106)",label:"المبيعات"},{data:[1,6,3,7],color:"rgb(60,57,85)",label:"التكاليف"},{data:[2,5,6,7],color:"rgba(45,45,45,0.56)",label:"الجودة"}],width:590,height:300})})}var R=n(948),W=n(629),D=n(6886);function P(e){let{title:t}=e;return(0,r.jsx)("h3",{style:{backgroundColor:"rgba(219,206,206,0.19)",marginBottom:8,padding:5,color:"#442d5d",direction:"rtl",borderRadius:"5%"},children:t})}let z=(0,R.ZP)(W.Z)(e=>{let{theme:t}=e;return{backgroundColor:"dark"===t.palette.mode?"#1A2027":"#fff",...t.typography.body2,padding:t.spacing(2),textAlign:"center",color:t.palette.text.secondary}});function I(e){let{title:t,children:n}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(D.ZP,{item:!0,xs:12,md:6,sx:{mt:8},children:[(0,r.jsx)(P,{title:t}),(0,r.jsx)(z,{children:n})]})})}function T(){let e=(0,l.useRouter)();return(0,i.useEffect)(()=>{s.Z.get("auth-token")||e.push("/auth/login")},[e]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"Devices",children:[(0,r.jsx)(P,{title:"الأجهزة"}),(0,r.jsx)(C,{})]}),(0,r.jsx)(d.Z,{sx:{flexGrow:1},children:(0,r.jsxs)(D.ZP,{container:!0,spacing:2,children:[(0,r.jsx)(I,{title:"الموارد البشرية",children:(0,r.jsx)(N,{})}),(0,r.jsx)(I,{title:"الموارد",children:(0,r.jsx)(A,{})})]})})]})}}},function(e){e.O(0,[410,698,888,774,179],function(){return e(e.s=4555)}),_N_E=e.O()}]);