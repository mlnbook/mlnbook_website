(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[257],{23178:function(G,E,a){"use strict";a.r(E),a.d(E,{default:function(){return ae}});var d=a(39428),b=a(3182),O=a(57663),A=a(71577),$=a(12968),L=a(20352),x=a(2824),p=a(67294),V=a(17294),W=a(29402),z=a(9684),N=a(51042),F=a(61870),m=a(65554),re=a(71194),H=a(50146),te=a(9715),J=a(903),K=a(37476),Q=a(5966),y=a(64317),X=a(60451),Y=a(90672),t=a(85893),q=function(C){var l=C.record,j=C.setShowModal,P=C.showModal,B=C.actionRef,R=J.Z.useForm(),D=(0,x.Z)(R,1),S=D[0],w=(0,p.useState)(!1),I=(0,x.Z)(w,2),u=I[0],r=I[1],e=(0,p.useState)(""),i=(0,x.Z)(e,2),M=i[0],T=i[1],U=(0,p.useState)({}),v=(0,x.Z)(U,2),k=v[0],ne=v[1];return(0,p.useEffect)((0,b.Z)((0,d.Z)().mark(function g(){var s,n;return(0,d.Z)().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(!(l!=null&&l.id)){o.next=8;break}return o.next=3,(0,F.Cy)({id:l==null?void 0:l.id});case 3:n=o.sent,n.author=(n==null||(s=n.author)===null||s===void 0?void 0:s.map(function(c){return c.id}))||[],ne(n),n!=null&&n.cover_img&&(n.cover_img=[{url:n==null?void 0:n.cover_img}]),S.setFieldsValue(n);case 8:case"end":return o.stop()}},g)})),[l==null?void 0:l.id]),(0,t.jsxs)(K.Y,{title:l!=null&&l.id?"\u7F16\u8F91\u7ED8\u672C:".concat(l==null?void 0:l.id):"\u65B0\u5EFA\u7ED8\u672C",form:S,labelCol:{span:3},layout:"horizontal",visible:P,onVisibleChange:j,initialValues:k!=null&&k.id?k:{language:"en_US",language_level:"A1",phase:"preschool",grade:"age1-preschool",voice_template:[1]},onFinish:function(){var g=(0,b.Z)((0,d.Z)().mark(function s(n){var f,o,c;return(0,d.Z)().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:if(f=new FormData,Object.keys(n).forEach(function(Z){Z==="cover_img"?n[Z][0].originFileObj&&f.append(Z,n[Z][0].originFileObj):f.append(Z,n[Z])}),!(l!=null&&l.id)){h.next=9;break}return f.append("id",l==null?void 0:l.id),h.next=6,(0,F.zk)(l==null?void 0:l.id,f);case 6:o=h.sent,h.next=12;break;case 9:return h.next=11,(0,F.Zz)(f);case 11:o=h.sent;case 12:o&&(j(!1),B==null||(c=B.current)===null||c===void 0||c.reload());case 13:case"end":return h.stop()}},s)}));return function(s){return g.apply(this,arguments)}}(),children:[(0,t.jsx)(Q.Z,{rules:[{required:!0}],name:"title",label:"\u4E66\u540D",placeholder:"\u8F93\u5165\u7ED8\u672C\u540D\u79F0"}),(0,t.jsx)(y.Z,{label:"\u8BED\u8A00",rules:[{required:!0}],name:"language",placeholder:"\u9009\u62E9\u7ED8\u672C\u8BED\u8A00",options:m.uq}),(0,t.jsx)(y.Z,{label:"\u8BED\u8A00\u7EA7\u522B",rules:[{required:!0}],name:"language_level",placeholder:"\u9009\u62E9\u7ED8\u672C\u8BED\u8A00",options:m.EM}),(0,t.jsx)(y.Z,{label:"\u5B66\u6BB5",rules:[{required:!0}],name:"phase",placeholder:"\u9009\u62E9\u7ED8\u672C\u5B66\u6BB5",options:m.PW}),(0,t.jsx)(y.Z,{label:"\u5E74\u7EA7",rules:[{required:!0}],name:"phase",placeholder:"\u9009\u62E9\u7ED8\u672C\u5E74\u7EA7",options:m.rT}),(0,t.jsx)(X.Z,{name:"cover_img",label:"\u5C01\u9762\u56FE",max:1,fieldProps:{data:{},defaultFileList:[],multiple:!1,onPreview:function(s){T(s.url||s.thumbUrl),r(!0)},listType:"picture-card",accept:".png,.jpg,.jpeg",maxCount:1},extra:"\u652F\u6301 JPG\u3001PNG \u683C\u5F0F"}),(0,t.jsx)(H.Z,{open:u,footer:null,onCancel:function(){r(!1)},children:(0,t.jsx)("img",{alt:"example",style:{width:"100%"},src:M})}),(0,t.jsx)(y.Z,{label:"\u4F5C\u8005",rules:[{required:!0}],name:"author",mode:"multiple",placeholder:"\u9009\u62E9\u4F5C\u8005",request:(0,b.Z)((0,d.Z)().mark(function g(){var s,n;return(0,d.Z)().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,(0,F.Dh)();case 2:return s=o.sent,n=s==null?void 0:s.map(function(c){return{label:"".concat(c.name,"(id:").concat(c.id,")"),value:c.id}}),o.abrupt("return",n);case 5:case"end":return o.stop()}},g)}))}),(0,t.jsx)(Y.Z,{name:"description",label:"\u63CF\u8FF0"})]})},_=q,ee=function(){var C=(0,p.useState)(!1),l=(0,x.Z)(C,2),j=l[0],P=l[1],B=(0,p.useState)(),R=(0,x.Z)(B,2),D=R[0],S=R[1],w=(0,p.useRef)(),I=[{title:"ID",dataIndex:"id"},{title:"\u6807\u9898",dataIndex:"title"},{title:"\u63CF\u8FF0",dataIndex:"description",valueType:"textarea",width:"15%"},{title:"\u5C01\u9762\u56FE",dataIndex:"cover_img",render:function(r,e){return[e!=null&&e.cover_img?(0,t.jsx)(L.Z,{src:e==null?void 0:e.cover_img,width:35,height:35}):null]}},{title:"\u8BED\u8A00",dataIndex:"language",filters:!0,onFilter:!0,valueEnum:m.uq.reduce(function(u,r){var e=r.value,i=r.label;return u[e]={text:i},u},{})},{title:"\u8BED\u8A00\u7EA7\u522B",dataIndex:"language_level",filters:!0,onFilter:!0,valueEnum:m.EM.reduce(function(u,r){var e=r.value,i=r.label;return u[e]={text:i},u},{})},{title:"\u5B66\u6BB5",dataIndex:"phase",filters:!0,onFilter:!0,valueEnum:m.PW.reduce(function(u,r){var e=r.value,i=r.label;return u[e]={text:i},u},{})},{title:"\u5E74\u7EA7",dataIndex:"grade",filters:!0,onFilter:!0,valueEnum:m.rT.reduce(function(u,r){var e=r.value,i=r.label;return u[e]={text:i},u},{})},{title:"\u4F5C\u8005",dataIndex:"author",render:function(r,e){var i;return(e==null||(i=e.author)===null||i===void 0?void 0:i.map(function(M){return M.name}).join(", "))||""}},{title:"\u4FEE\u6539\u65F6\u95F4",dataIndex:"utime"},{title:"\u64CD\u4F5C",dataIndex:"option",valueType:"option",render:function(r,e){return[(0,t.jsx)("a",{onClick:function(){P(!0),S(e)},children:"\u7F16\u8F91"},"config"),(0,t.jsx)("a",{onClick:function(){z.m.push({pathname:"/mlnbook/pic_book/designing",query:{id:e==null?void 0:e.id}})},children:"\u6392\u7248"},"config"),(0,t.jsx)("a",{onClick:function(){z.m.push({pathname:"/mlnbook/pic_book/voice",query:{id:e==null?void 0:e.id}})},children:"\u8BED\u97F3\u751F\u6210"},"config")]}}];return(0,t.jsxs)(V.ZP,{title:!1,pageHeaderRender:!1,children:[(0,t.jsx)(W.Z,{headerTitle:"\u7ED8\u672C\u5217\u8868",actionRef:w,rowKey:"key",size:"small",search:!1,options:{density:!1},toolBarRender:function(){return[(0,t.jsxs)(A.Z,{type:"primary",onClick:function(){P(!0),S({})},children:[(0,t.jsx)(N.Z,{})," \u65B0\u5EFA"]},"primary")]},request:function(){var u=(0,b.Z)((0,d.Z)().mark(function r(e,i,M){var T;return(0,d.Z)().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,(0,F.lQ)(e);case 2:return T=v.sent,v.abrupt("return",{data:T});case 4:case"end":return v.stop()}},r)}));return function(r,e,i){return u.apply(this,arguments)}}(),columns:I}),j&&(0,t.jsx)(_,{record:D,setShowModal:P,showModal:j,actionRef:w})]})},ae=ee},65554:function(G,E,a){"use strict";a.d(E,{uq:function(){return d},EM:function(){return b},PW:function(){return O},rT:function(){return A},n_:function(){return $}});var d=[{value:"en_US",label:"\u82F1\u8BED"},{value:"zh_CN",label:"\u7B80\u4F53\u4E2D\u6587"},{value:"fr_FR",label:"\u6CD5\u8BED"},{value:"es_ES",label:"\u897F\u73ED\u7259\u8BED"},{value:"ar_AE",label:"\u963F\u62C9\u4F2F\u8BED"},{value:"ru_RU",label:"\u4FC4\u8BED"}],b=[{value:"A1",label:"\u5165\u95E8\u7EA7"},{value:"A2",label:"\u57FA\u7840\u7EA7"},{value:"B1",label:"\u8FDB\u9636\u7EA7"},{value:"B2",label:"\u9AD8\u9636\u7EA7"},{value:"C1",label:"\u6D41\u5229\u8FD0\u7528\u7EA7"},{value:"C2",label:"\u7CBE\u901A\u7EA7"}],O=[{value:"preschool",label:"\u5B66\u524D\u73ED"},{value:"kindergarten",label:"\u5E7C\u513F\u56ED"},{value:"primary",label:"\u5C0F\u5B66"},{value:"middle",label:"\u521D\u4E2D"},{value:"high",label:"\u9AD8\u4E2D"},{value:"university",label:"\u5927\u5B66"}],A=[{value:"age1-preschool",label:"\u5B66\u524D1\u5C81"},{value:"age2-preschool",label:"\u5B66\u524D2\u5C81"},{value:"age3-preschool",label:"\u5B66\u524D3\u5C81"},{value:"age4-preschool",label:"\u5B66\u524D4\u5C81"},{value:"age5-preschool",label:"\u5B66\u524D5\u5C81"},{value:"kindergarten",label:"\u5E7C\u513F\u56ED"},{value:"grade1-primary",label:"\u5C0F\u5B66\u4E00\u5E74\u7EA7"},{value:"grade2-primary",label:"\u5C0F\u5B66\u4E8C\u5E74\u7EA7"},{value:"grade3-primary",label:"\u5C0F\u5B66\u4E09\u5E74\u7EA7"},{value:"grade4-primary",label:"\u5C0F\u5B66\u56DB\u5E74\u7EA7"},{value:"grade5-primary",label:"\u5C0F\u5B66\u4E94\u5E74\u7EA7"},{value:"grade6-primary",label:"\u5C0F\u5B66\u516D\u5E74\u7EA7"},{value:"grade7-middle",label:"\u521D\u4E2D\u4E00\u5E74\u7EA7"},{value:"grade8-middle",label:"\u521D\u4E2D\u4E8C\u5E74\u7EA7"},{value:"grade9-middle",label:"\u521D\u4E2D\u4E09\u5E74\u7EA7"},{value:"grade10-high",label:"\u9AD8\u4E2D\u4E00\u5E74\u7EA7"},{value:"grade11-high",label:"\u9AD8\u4E2D\u4E8C\u5E74\u7EA7"},{value:"grade12-high",label:"\u9AD8\u4E2D\u4E09\u5E74\u7EA7"},{value:"freshman-university",label:"\u5927\u5B66\u4E00\u5E74\u7EA7"},{value:"sophomore-university",label:"\u5927\u5B66\u4E8C\u5E74\u7EA7"},{value:"junior-university",label:"\u5927\u5B66\u4E09\u5E74\u7EA7"},{value:"senior-university",label:"\u5927\u5B66\u56DB\u5E74\u7EA7"}],$={iPhone12Pro:{height:"844px",width:"390px"},iPhoneXR:{height:"896px",width:"414px"},iPhone14ProMax:{height:"932px",width:"430px"}}}}]);
