(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{a3w7:function(e,a,t){"use strict";t.r(a);t("+L6B");var r=t("2/Rp"),s=(t("sRBo"),t("kaz8")),n=(t("Q9mQ"),t("diRs")),l=(t("5NDa"),t("5rEg")),c=(t("MXD1"),t("CFYs")),o=t("WmNS"),i=t.n(o),m=(t("miYZ"),t("tsqr")),u=t("k1fw"),p=t("PpiC"),d=t("9og8"),g=t("tJVT"),h=(t("y8nQ"),t("Vl3Y")),w=t("cDcd"),_=t.n(w),f=t("9kvl"),v=t("55Ip"),E=t("aCH8"),b=t.n(E),j=t("sYde"),k=t.n(j),y=t("io9h");function N(e){return O.apply(this,arguments)}function O(){return O=Object(d["a"])(i.a.mark((function e(a){return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(y["a"])("/user/register",{method:"POST",data:a}));case 1:case"end":return e.stop()}}),e)}))),O.apply(this,arguments)}var P=t("c+yx"),F=h["a"].Item,x={ok:_.a.createElement("div",{className:k.a.success},"\u5f3a\u5ea6\uff1a\u5f3a"),pass:_.a.createElement("div",{className:k.a.warning},"\u5f3a\u5ea6\uff1a\u4e2d"),poor:_.a.createElement("div",{className:k.a.error},"\u5f3a\u5ea6\uff1a\u592a\u77ed")},V={ok:"success",pass:"normal",poor:"exception"},z=function(){var e=Object(w["useState"])(!1),a=Object(g["a"])(e,2),t=a[0],o=a[1],E=Object(w["useState"])(!1),j=Object(g["a"])(E,2),y=j[0],O=j[1],z=Object(w["useState"])(!1),C=Object(g["a"])(z,2),S=C[0],q=C[1],J=!1,Y=h["a"].useForm(),B=Object(g["a"])(Y,1),D=B[0],Q=function(){var e=D.getFieldValue("pwd");return e&&e.length>9?"ok":e&&e.length>5?"pass":"poor"},R=function(){var e=Object(d["a"])(i.a.mark((function e(a){var t,r,s;return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=a.pwd,r=Object(p["a"])(a,["pwd"]),q(!0),e.next=4,N(Object(u["a"])({pwd:b()(t)},r));case 4:s=e.sent,s.token?(Object(P["c"])(s.token),m["a"].success("\u6ce8\u518c\u6210\u529f\uff01"),f["f"].push({pathname:"/user/register-result",state:{account:r.email}})):m["a"].error(s.message),q(!1);case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),T=function(e,a){return a&&a!==D.getFieldValue("pwd")?Promise.reject("\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u5339\u914d!"):Promise.resolve()},I=function(e,a){return a?(t||o(!!a),O(!y),a.length<6?Promise.reject(""):(a&&J&&D.validateFields(["confirm"]),Promise.resolve())):(o(!!a),Promise.reject("\u8bf7\u8f93\u5165\u5bc6\u7801\uff01"))},M=function(){var e=D.getFieldValue("pwd"),a=Q();return e&&e.length?_.a.createElement("div",{className:k.a["progress-".concat(a)]},_.a.createElement(c["a"],{status:V[a],className:k.a.progress,strokeWidth:6,percent:10*e.length>100?100:10*e.length,showInfo:!1})):null};return _.a.createElement("div",{className:k.a.main},_.a.createElement("h3",null,"\u6ce8\u518c"),_.a.createElement(h["a"],{form:D,name:"UserRegister",onFinish:R},_.a.createElement(F,{name:"name",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d\uff01"}]},_.a.createElement(l["a"],{size:"large",placeholder:"\u7528\u6237\u540d"})),_.a.createElement(F,{name:"email",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u90ae\u7bb1\u5730\u5740\uff01"},{type:"email",message:"\u90ae\u7bb1\u5730\u5740\u683c\u5f0f\u9519\u8bef\uff01"}]},_.a.createElement(l["a"],{size:"large",placeholder:"\u90ae\u7bb1"})),_.a.createElement(n["a"],{getPopupContainer:function(e){return e&&e.parentNode?e.parentNode:e},content:t&&_.a.createElement("div",{style:{padding:"4px 0"}},x[Q()],M(),_.a.createElement("div",{style:{marginTop:10}},"\u8bf7\u81f3\u5c11\u8f93\u5165 6 \u4e2a\u5b57\u7b26\u3002\u8bf7\u4e0d\u8981\u4f7f\u7528\u5bb9\u6613\u88ab\u731c\u5230\u7684\u5bc6\u7801\u3002")),overlayStyle:{width:240},placement:"right",visible:t},_.a.createElement(F,{name:"pwd",className:D.getFieldValue("pwd")&&D.getFieldValue("pwd").length>0&&k.a.password,rules:[{validator:I}]},_.a.createElement(l["a"],{size:"large",type:"password",placeholder:"\u81f3\u5c116\u4f4d\u5bc6\u7801\uff0c\u533a\u5206\u5927\u5c0f\u5199"}))),_.a.createElement(F,{name:"confirm",rules:[{required:!0,message:"\u8bf7\u786e\u8ba4\u5bc6\u7801\uff01"},{validator:T}]},_.a.createElement(l["a"],{size:"large",type:"password",placeholder:"\u786e\u8ba4\u5bc6\u7801"})),_.a.createElement(F,{name:"agreement",valuePropName:"checked",rules:[{validator:function(e,a){return a?Promise.resolve():Promise.reject("\u8bf7\u9605\u8bfb\u5e76\u540c\u610f\u7528\u6237\u534f\u8bae")}}]},_.a.createElement(s["a"],null,"\u6211\u5df2\u9605\u8bfb\u5e76\u540c\u610f",_.a.createElement("a",{target:"_blank",href:"/agreement/"},"\u300aPushy\u70ed\u66f4\u65b0\u7528\u6237\u534f\u8bae\u4e0e\u9690\u79c1\u6761\u6b3e\u300b"))),_.a.createElement(F,null,_.a.createElement(r["default"],{size:"large",loading:S,className:k.a.submit,type:"primary",htmlType:"submit"},"\u6ce8\u518c"),_.a.createElement(v["a"],{className:k.a.login,to:"/user/login"},"\u4f7f\u7528\u5df2\u6709\u8d26\u6237\u767b\u5f55"))))};a["default"]=z},sYde:function(e,a,t){e.exports={main:"main___2kx2N",password:"password___2JDrd",getCaptcha:"getCaptcha___1oboe",submit:"submit___34wM2",login:"login___1qBuj",success:"success___3hl98",warning:"warning___2i2r2",error:"error___3JfQo","progress-pass":"progress-pass___BM1Xu",progress:"progress___2s68u"}}}]);