(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[856],{94544:function(B,C,e){"use strict";var i=e(28991),E=e(81253),x=e(67294),a=e(20147),v=e(85893),g=["fieldProps","popoverProps","proFieldProps","colors"],c=function(_,f){var Z=_.fieldProps,r=_.popoverProps,p=_.proFieldProps,o=_.colors,P=(0,E.Z)(_,g);return(0,v.jsx)(a.Z,(0,i.Z)({valueType:"color",fieldProps:(0,i.Z)({popoverProps:r,colors:o},Z),ref:f,proFieldProps:p,filedConfig:{defaultProps:{width:"100%"}}},P))};C.Z=x.forwardRef(c)},15643:function(B,C,e){"use strict";e.d(C,{Z:function(){return l}});var i=e(28991),E=e(81253),x=e(22122),a=e(67294),v=e(94737),g=e(50699),c=function(u,j){return a.createElement(g.Z,(0,x.Z)({},u,{ref:j,icon:v.Z}))},d=a.forwardRef(c),_=e(94412),f=e(71577),Z=e(44190),r=e(17969),p=e(85893),o=["fieldProps","action","accept","listType","title","max","icon","buttonProps","disabled","proFieldProps"],P=function(u,j){var F,h=u.fieldProps,L=u.action,b=u.accept,m=u.listType,O=u.title,M=O===void 0?"\u5355\u51FB\u4E0A\u4F20":O,s=u.max,t=u.icon,I=t===void 0?(0,p.jsx)(d,{}):t,$=u.buttonProps,K=u.disabled,S=u.proFieldProps,D=(0,E.Z)(u,o),T=(0,a.useMemo)(function(){var W;return(W=D.fileList)!==null&&W!==void 0?W:D.value},[D.fileList,D.value]),G=(0,a.useContext)(Z.A),N=(S==null?void 0:S.mode)||G.mode||"edit",V=(s===void 0||!T||(T==null?void 0:T.length)<s)&&N!=="read",H=(m!=null?m:h==null?void 0:h.listType)==="picture-card";return(0,p.jsx)(_.Z,(0,i.Z)((0,i.Z)({action:L,accept:b,ref:j,listType:m||"picture",fileList:T},h),{},{name:(F=h==null?void 0:h.name)!==null&&F!==void 0?F:"file",onChange:function(J){var w;h==null||(w=h.onChange)===null||w===void 0||w.call(h,J)},children:V&&(H?(0,p.jsxs)("span",{children:[I," ",M]}):(0,p.jsxs)(f.Z,(0,i.Z)((0,i.Z)({disabled:K||(h==null?void 0:h.disabled)},$),{},{children:[I,M]})))}))},n=(0,r.G)(a.forwardRef(P),{getValueFromEvent:function(u){return u.fileList}}),l=n},5894:function(B,C,e){"use strict";e.d(C,{A:function(){return b}});var i=e(9715),E=e(903),x=e(28991),a=e(85893),v=e(84683),g=e(96156),c=e(49111),d=e(19650),_=e(84305),f=e(88182),Z=e(28481),r=e(43929),p=e(56725),o=e(53621),P=e(94184),n=e.n(P),l=e(67294),y=e(66758),u=e(2514),j=e(96138),F=l.forwardRef(function(m,O){var M=l.useContext(y.Z),s=M.groupProps,t=(0,x.Z)((0,x.Z)({},s),m),I=t.children,$=t.collapsible,K=t.defaultCollapsed,S=t.style,D=t.labelLayout,T=t.title,G=T===void 0?m.label:T,N=t.tooltip,V=t.align,H=V===void 0?"start":V,W=t.direction,J=t.size,w=J===void 0?32:J,ue=t.titleStyle,ee=t.titleRender,U=t.spaceProps,Y=t.extra,Q=t.autoFocus,de=(0,p.Z)(function(){return K||!1},{value:m.collapsed,onChange:m.onCollapse}),te=(0,Z.Z)(de,2),X=te[0],_e=te[1],ce=(0,l.useContext)(f.ZP.ConfigContext),pe=ce.getPrefixCls,re=(0,u.zx)(m),me=re.ColWrapper,ne=re.RowWrapper,k=pe("pro-form-group"),oe=$&&(0,a.jsx)(r.Z,{style:{marginRight:8},rotate:X?void 0:90}),ae=(0,a.jsx)(o.Z,{label:oe?(0,a.jsxs)("div",{children:[oe,G]}):G,tooltip:N}),le=(0,l.useCallback)(function(A){var z=A.children;return(0,a.jsx)(d.Z,(0,x.Z)((0,x.Z)({},U),{},{className:n()("".concat(k,"-container"),U==null?void 0:U.className),size:w,align:H,direction:W,style:(0,x.Z)({rowGap:0},U==null?void 0:U.style),children:z}))},[H,k,W,w,U]),se=ee?ee(ae,m):ae,ve=(0,l.useMemo)(function(){var A=[],z=l.Children.toArray(I).map(function(R,Ee){var q;return l.isValidElement(R)&&(R==null||(q=R.props)===null||q===void 0?void 0:q.hidden)?(A.push(R),null):Ee===0&&l.isValidElement(R)&&Q?l.cloneElement(R,(0,x.Z)((0,x.Z)({},R.props),{},{autoFocus:Q})):R});return[(0,a.jsx)(ne,{Wrapper:le,children:z},"children"),A.length>0?(0,a.jsx)("div",{style:{display:"none"},children:A}):null]},[I,ne,le,Q]),ie=(0,Z.Z)(ve,2),fe=ie[0],Pe=ie[1];return(0,a.jsx)(me,{children:(0,a.jsxs)("div",{className:n()(k,(0,g.Z)({},"".concat(k,"-twoLine"),D==="twoLine")),style:S,ref:O,children:[Pe,(G||N||Y)&&(0,a.jsx)("div",{className:"".concat(k,"-title"),style:ue,onClick:function(){_e(!X)},children:Y?(0,a.jsxs)("div",{style:{display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between"},children:[se,(0,a.jsx)("span",{onClick:function(z){return z.stopPropagation()},children:Y})]}):se}),$&&X?null:fe]})})});F.displayName="ProForm-Group";var h=F,L=e(5163);function b(m){return(0,a.jsx)(v.I,(0,x.Z)({layout:"vertical",submitter:{render:function(M,s){return s.reverse()}},contentRender:function(M,s){return(0,a.jsxs)(a.Fragment,{children:[M,s]})}},m))}b.Group=h,b.useForm=E.Z.useForm,b.Item=L.Z,b.useWatch=E.Z.useWatch,b.ErrorList=E.Z.ErrorList,b.Provider=E.Z.Provider,b.useFormInstance=E.Z.useFormInstance},24739:function(B,C,e){"use strict";e.d(C,{UW:function(){return E}});var i=e(5894),E=i.A.Group},96138:function(){},88032:function(B,C,e){"use strict";var i=e(39428),E=e(3182),x=e(67294),a=e(37476),v=e(5966),g=e(90672),c=e(64317),d=e(24739),_=e(25049),f=e(94544),Z=e(15643),r=e(85893),p=function(P){var n=P.record,l=P.setShowModal,y=P.showModal,u=P.actionRef,j=P.updatePageDetailsFunc;n!=null&&n.background_img&&(n.background_img=[{url:n==null?void 0:n.background_img}]);var F=n.id?n:{c_type:"protected",grid_row_col:"[[24]]",grid_gutter:"[16, 24]",font_color:"#0000E0",font_family:"Arial",font_size:14,background_color:"#FFFFFF",text_flex_justify:"flex-end",text_flex_align:"flex-end",text_opacity:1};return(0,r.jsxs)(a.Y,{title:n!=null&&n.id?"\u7F16\u8F91\u9875\u9762\u6A21\u677F:".concat(n==null?void 0:n.id):"\u65B0\u5EFA\u9875\u9762\u6A21\u677F",width:"750px",layout:"horizontal",visible:y,initialValues:F,onVisibleChange:l,onFinish:function(){var h=(0,E.Z)((0,i.Z)().mark(function L(b){var m,O;return(0,i.Z)().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(m=new FormData,Object.keys(b).forEach(function(t){t==="background_img"?b[t][0].originFileObj&&m.append(t,b[t][0].originFileObj):m.append(t,b[t])}),!(n!=null&&n.id)){s.next=9;break}return m.append("id",n==null?void 0:n.id),s.next=6,(0,_.fc)(n==null?void 0:n.id,m);case 6:O=s.sent,s.next=12;break;case 9:return s.next=11,(0,_.Lk)(m);case 11:O=s.sent;case 12:if(!O){s.next=20;break}if(l(!1),!j){s.next=19;break}return s.next=17,j();case 17:s.next=20;break;case 19:u.current&&u.current.reload();case 20:case"end":return s.stop()}},L)}));return function(L){return h.apply(this,arguments)}}(),children:[(0,r.jsx)(v.Z,{rules:[{required:!0}],label:"\u6807\u9898",name:"title"}),(0,r.jsx)(g.Z,{rules:[{required:!0}],label:"\u63CF\u8FF0",name:"description"}),(0,r.jsx)(c.Z,{rules:[{required:!0}],label:"\u7C7B\u578B",name:"c_type",options:[{label:"\u5B8C\u5168\u516C\u5F00",value:"public"},{label:"\u5185\u90E8\u4F7F\u7528",value:"protected"},{label:"\u79C1\u6709",value:"private"}]}),(0,r.jsxs)(d.UW,{children:[(0,r.jsx)(v.Z,{rules:[{required:!0}],label:"\u6805\u683C\u5E03\u5C40",name:"grid_row_col"}),(0,r.jsx)(v.Z,{rules:[{required:!0}],label:"\u6805\u683C\u95F4\u8DDD",name:"grid_gutter"})]}),(0,r.jsxs)(d.UW,{children:[(0,r.jsx)(f.Z,{label:"\u5B57\u4F53\u989C\u8272",rules:[{required:!0}],name:"font_color"}),(0,r.jsx)(v.Z,{rules:[{required:!0}],label:"\u5B57\u4F53",width:150,name:"font_family"}),(0,r.jsx)(v.Z,{rules:[{required:!0}],label:"\u5B57\u4F53\u5927\u5C0F",width:125,name:"font_size"})]}),(0,r.jsxs)(d.UW,{children:[(0,r.jsx)(Z.Z,{name:"background_img",label:"\u80CC\u666F\u56FE",max:1,fieldProps:{data:{},defaultFileList:[],multiple:!1,listType:"picture-card",accept:".png,.jpg,.jpeg",maxCount:1},extra:"\u652F\u6301 JPG\u3001PNG \u683C\u5F0F"}),(0,r.jsx)(f.Z,{label:"\u80CC\u666F\u989C\u8272",rules:[{required:!0}],name:"background_color"})]}),(0,r.jsxs)(d.UW,{children:[(0,r.jsx)(c.Z,{rules:[{required:!0}],label:"\u6587\u672C\u4E3B\u8F74\u4F4D\u7F6E",name:"text_flex_justify",fieldProps:{dropdownMatchSelectWidth:!1},options:[{label:"flex-start",value:"flex-start"},{label:"center",value:"center"},{label:"flex-end",value:"flex-end"},{label:"space-between",value:"space-between"},{label:"space-around",value:"space-around"},{label:"space-evenly",value:"space-evenly"}]}),(0,r.jsx)(c.Z,{rules:[{required:!0}],label:"\u6587\u672C\u4EA4\u53C9\u8F74\u4F4D\u7F6E",name:"text_flex_align",fieldProps:{dropdownMatchSelectWidth:!1},options:[{label:"flex-start",value:"flex-start"},{label:"center",value:"center"},{label:"flex-end",value:"flex-end"}]}),(0,r.jsx)(v.Z,{rules:[{required:!0}],label:"\u6587\u672C\u900F\u660E\u5EA6",name:"text_opacity",width:80})]})]})};C.Z=p},15279:function(B,C,e){"use strict";e.r(C);var i=e(39428),E=e(3182),x=e(57663),a=e(71577),v=e(12968),g=e(20352),c=e(2824),d=e(51042),_=e(67294),f=e(17294),Z=e(99552),r=e(25049),p=e(88032),o=e(85893),P=function(){var l=(0,_.useState)(!1),y=(0,c.Z)(l,2),u=y[0],j=y[1],F=(0,_.useState)({}),h=(0,c.Z)(F,2),L=h[0],b=h[1],m=(0,_.useRef)(),O=[{title:"ID",dataIndex:"id"},{title:"\u6807\u9898",dataIndex:"title"},{title:"\u63CF\u8FF0",dataIndex:"description",valueType:"textarea"},{title:"\u7C7B\u578B",dataIndex:"c_type",filters:!0,onFilter:!0,valueEnum:{public:"\u5B8C\u5168\u516C\u5F00",protected:"\u5185\u90E8\u4F7F\u7528",private:"\u79C1\u6709"}},{title:"\u6805\u683C\u5E03\u5C40",dataIndex:"grid_row_col"},{title:"\u6805\u683C\u95F4\u8DDD",dataIndex:"grid_gutter"},{title:"\u989C\u8272",dataIndex:"font_color",render:function(s,t){return[(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{children:t==null?void 0:t.font_color}),(0,o.jsx)("div",{style:{backgroundColor:t==null?void 0:t.font_color,width:"55px",height:"20px",border:"1px solid lightgray",display:"inline-block"}})]})]}},{title:"\u5B57\u4F53",dataIndex:"font_family"},{title:"\u6587\u5B57\u5927\u5C0F",dataIndex:"font_size"},{title:"\u80CC\u666F\u56FE\u7247",dataIndex:"background_img",render:function(s,t){return[(0,o.jsx)(g.Z,{src:t==null?void 0:t.background_img,width:35,height:35})]}},{title:"\u80CC\u666F\u989C\u8272",dataIndex:"background_color",render:function(s,t){return[(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{children:t==null?void 0:t.background_color}),(0,o.jsx)("div",{style:{backgroundColor:t==null?void 0:t.background_color,width:"55px",height:"20px",border:"1px solid lightgray",display:"inline-block"}})]})]}},{title:"\u6587\u672C\u4E3B\u8F74\u4F4D\u7F6E",dataIndex:"text_flex_justify"},{title:"\u6587\u672C\u4EA4\u53C9\u4F4D\u7F6E",dataIndex:"text_flex_align"},{title:"\u6587\u672C\u900F\u660E\u5EA6",dataIndex:"text_opacity"},{title:"\u64CD\u4F5C\u4EBA",dataIndex:"user"},{title:"\u4FEE\u6539\u65F6\u95F4",dataIndex:"utime"},{title:"\u64CD\u4F5C",dataIndex:"option",valueType:"option",render:function(s,t){return[(0,o.jsx)("a",{onClick:function(){j(!0),b(t)},children:"\u4FEE\u6539"},"config")]}}];return(0,o.jsxs)(f.ZP,{title:!1,pageHeaderRender:!1,children:[(0,o.jsx)(Z.ZP,{headerTitle:"\u6A21\u677F\u5217\u8868",actionRef:m,rowKey:"key",size:"small",search:!1,options:{density:!1},toolBarRender:function(){return[(0,o.jsxs)(a.Z,{type:"primary",onClick:function(){b({}),j(!0)},children:[(0,o.jsx)(d.Z,{})," \u65B0\u5EFA"]},"primary")]},request:function(){var M=(0,E.Z)((0,i.Z)().mark(function s(t,I,$){var K;return(0,i.Z)().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:return D.next=2,(0,r.Nk)(t);case 2:return K=D.sent,D.abrupt("return",{data:K});case 4:case"end":return D.stop()}},s)}));return function(s,t,I){return M.apply(this,arguments)}}(),columns:O}),u&&(0,o.jsx)(p.Z,{record:L,setShowModal:j,showModal:u,actionRef:m})]})};C.default=P},25049:function(B,C,e){"use strict";e.d(C,{Nk:function(){return v},fc:function(){return c},Lk:function(){return _}});var i=e(39428),E=e(11849),x=e(3182),a=e(78370);function v(p,o){return g.apply(this,arguments)}function g(){return g=(0,x.Z)((0,i.Z)().mark(function p(o,P){return(0,i.Z)().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.abrupt("return",(0,a.Z)("/api/pic_book/layout/",(0,E.Z)({method:"GET",params:(0,E.Z)({},o)},P||{})));case 1:case"end":return l.stop()}},p)})),g.apply(this,arguments)}function c(p,o,P){return d.apply(this,arguments)}function d(){return d=(0,x.Z)((0,i.Z)().mark(function p(o,P,n){return(0,i.Z)().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return y.abrupt("return",(0,a.Z)("/api/pic_book/layout/".concat(o,"/"),(0,E.Z)({method:"PATCH",data:P},n||{})));case 1:case"end":return y.stop()}},p)})),d.apply(this,arguments)}function _(p,o){return f.apply(this,arguments)}function f(){return f=(0,x.Z)((0,i.Z)().mark(function p(o,P){return(0,i.Z)().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.abrupt("return",(0,a.Z)("/api/pic_book/layout/",(0,E.Z)({method:"POST",data:o},P||{})));case 1:case"end":return l.stop()}},p)})),f.apply(this,arguments)}function Z(p,o){return r.apply(this,arguments)}function r(){return r=_asyncToGenerator(_regeneratorRuntime().mark(function p(o,P){var n,l;return _regeneratorRuntime().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return n=o.id,l=n===void 0?0:n,u.abrupt("return",request("/api/pic_book/layout/".concat(l),_objectSpread({method:"DELETE"},P||{})));case 2:case"end":return u.stop()}},p)})),r.apply(this,arguments)}},78370:function(B,C,e){"use strict";var i=e(39428),E=e(34792),x=e(48086),a=e(3182),v=e(11849),g=e(11238);g.ZP.interceptors.request.use(function(c,d){if(c!="/v2api/auth/users/current/"){var _={Authorization:"Token "+localStorage.getItem("token")};return{url:c,options:(0,v.Z)((0,v.Z)({},d),{},{headers:_,interceptors:!0})}}return{url:c,options:(0,v.Z)((0,v.Z)({},d),{},{interceptors:!0})}}),g.ZP.interceptors.request.use(function(c,d){return{url:"".concat(c),options:(0,v.Z)((0,v.Z)({},d),{},{interceptors:!0})}},{global:!0}),g.ZP.interceptors.response.use(function(c,d){var _=c.headers.get("Content-Type");return c}),g.ZP.interceptors.response.use(function(){var c=(0,a.Z)((0,i.Z)().mark(function d(_){var f;return(0,i.Z)().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return f={500:"\u670D\u52A1\u5668\u53D1\u751F\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5",502:"\u7F51\u5173\u9519\u8BEF\u3002",503:"\u670D\u52A1\u4E0D\u53EF\u7528\uFF0C\u670D\u52A1\u5668\u6682\u65F6\u8FC7\u8F7D\u6216\u7EF4\u62A4\u3002",504:"\u7F51\u5173\u8D85\u65F6\u3002"},f[_.status]&&x.ZP.error(f[_.status]),r.abrupt("return",_);case 3:case"end":return r.stop()}},d)}));return function(d){return c.apply(this,arguments)}}()),g.ZP.interceptors.response.use(function(){var c=(0,a.Z)((0,i.Z)().mark(function d(_){var f;return(0,i.Z)().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,_.clone().json();case 2:return f=r.sent,f&&f.NOT_LOGIN&&(location.href="\u767B\u5F55url"),r.abrupt("return",_);case 5:case"end":return r.stop()}},d)}));return function(d){return c.apply(this,arguments)}}()),C.Z=g.ZP}}]);
