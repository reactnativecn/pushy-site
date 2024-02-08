(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[736],{37748:function(s,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/integration",function(){return n(77909)}])},77909:function(s,e,n){"use strict";n.r(e),n.d(e,{__toc:function(){return i}});var l=n(11527),r=n(5013),o=n(43196);let i=[{depth:3,value:"获取 appKey",id:"获取-appkey"},{depth:3,value:"初始化服务",id:"初始化服务"},{depth:3,value:"自定义更新界面",id:"自定义更新界面"},{depth:3,value:"统计数据",id:"统计数据"}];function c(s){let e=Object.assign({callout:"callout",p:"p",h3:"h3",code:"code",pre:"pre",span:"span",a:"a",ol:"ol",li:"li"},(0,o.a)(),s.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.callout,{type:"info",children:"\n  请注意，当前版本的api经过了完全重构，与之前的版本(v10.0以下)不兼容。如果你需要查看之前版本的文档，请点击[这里](https://v9--pushy-site.netlify.app/)\n"}),"\n",(0,l.jsx)(e.p,{children:"安装配置完成后，确定应用编译顺利通过，下面我们来进行代码集成。"}),"\n",(0,l.jsx)(e.h3,{id:"获取-appkey",children:"获取 appKey"}),"\n",(0,l.jsxs)(e.p,{children:["检查更新时必须提供你的",(0,l.jsx)(e.code,{children:"appKey"}),"，这个值保存在",(0,l.jsx)(e.code,{children:"update.json"}),"中（使用",(0,l.jsx)(e.code,{children:"pushy createApp"}),"或",(0,l.jsx)(e.code,{children:"pushy selectApp"}),"命令后会自动生成），并且根据平台不同而不同。你可以用如下的代码获取",(0,l.jsx)(e.code,{children:"appKey"}),"："]}),"\n",(0,l.jsx)(e.pre,{"data-language":"javascript","data-theme":"default",children:(0,l.jsxs)(e.code,{"data-language":"javascript","data-theme":"default",children:[(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"import"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" { Platform } "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"from"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-string-expression)"},children:'"react-native"'}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:";"})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:" "}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"import"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" _updateConfig "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"from"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-string-expression)"},children:'"./update.json"'}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:";"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"const"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" { "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"appKey"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" } "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" _updateConfig["}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Platform"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"."}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"OS"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"];"})]})]})}),"\n",(0,l.jsx)(e.p,{children:"如果你不使用 pushy 命令行，也可以从网页端查看到两个应用 appKey，并根据平台的不同来选择。"}),"\n",(0,l.jsx)(e.h3,{id:"初始化服务",children:"初始化服务"}),"\n",(0,l.jsx)(e.pre,{"data-language":"js","data-theme":"default",children:(0,l.jsxs)(e.code,{"data-language":"js","data-theme":"default",children:[(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"import"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" { PushyProvider"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" Pushy } "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"from"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-string-expression)"},children:'"react-native-update"'}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:";"})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:" "}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-comment)"},children:"// 唯一必填参数是appKey，其他选项请参阅 api 文档"})}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"const"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"pushyClient"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"new"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"Pushy"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"({"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  appKey"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"});"})}),"\n",(0,l.jsx)(e.span,{className:"line",children:" "}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-comment)"},children:"// 在根组件外加上PushyProvider后导出"})}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"export"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"default"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"function"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"Root"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"() {"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"return"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" ("})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    <"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"PushyProvider"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"client"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"{pushyClient}>"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"      {"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-comment)"},children:"/* ↓ 整个应用的根组件放到PushyProvider中 */"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"}"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"      <"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"App"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" />"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    </"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"PushyProvider"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  );"})}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"}"})})]})}),"\n",(0,l.jsx)(e.p,{children:"如没有特别的自定义需求，那么到此热更新已经可以开始正常运作。默认配置下，在 App 启动，以及从后台切换到前台时会触发更新检查，弹出提示的内容也固定。如需自定义触发时机，以及修改界面提示等，请参考下面的自定义更新界面。"}),"\n",(0,l.jsx)(e.h3,{id:"自定义更新界面",children:"自定义更新界面"}),"\n",(0,l.jsx)(e.p,{children:"默认配置下，pushy会以系统alert的形式来弹出更新提示，如需自定义更新界面，首先请关闭默认的 alert 弹窗："}),"\n",(0,l.jsx)(e.pre,{"data-language":"diff","data-theme":"default",children:(0,l.jsxs)(e.code,{"data-language":"diff","data-theme":"default",children:[(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"const pushyClient = new Pushy({"})}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  appKey,"})}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"#4BB74A"},children:"+  showAlert: false,"})}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"});"})})]})}),"\n",(0,l.jsxs)(e.p,{children:["所有更新相关的数据可以通过一个单一的",(0,l.jsx)(e.a,{href:"/docs/api#usepushy",children:(0,l.jsx)(e.code,{children:"usePushy()"})}),"hook函数来获取，然后可以根据其提供的数据来自行渲染自定义的界面，如下面的例子："]}),"\n",(0,l.jsx)(e.pre,{"data-language":"js","data-theme":"default",children:(0,l.jsxs)(e.code,{"data-language":"js","data-theme":"default",children:[(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"import"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" {Icon"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" PaperProvider"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" Snackbar"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" Banner} "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"from"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-string-expression)"},children:"'react-native-paper'"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:";"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"function"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"App"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"() {"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"const"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" {"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"checkUpdate"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"downloadUpdate"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"switchVersionLater"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"switchVersion"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"updateInfo"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    progress: {"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"received"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"total"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"} "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" {}"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  } "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"usePushy"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"();"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"const"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" ["}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"showUpdateBanner"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"setShowUpdateBanner"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"] "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"useState"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"false"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:");"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"const"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" ["}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"showUpdateSnackbar"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"setShowUpdateSnackbar"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"] "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"useState"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"false"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:");"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"const"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"snackbarVisible"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    showUpdateSnackbar "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"&&"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"updateInfo"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"?.update "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"&&"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"!"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"useDefaultAlert;"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"return"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" ("})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    <"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"View"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"style"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"{"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"styles"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:".container}>"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"      <"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Text"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"        更新下载进度：{received} / {total}"})}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"      </"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Text"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"      <"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Pressable"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"onPress"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"{checkUpdate}>"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"        <"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Text"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">点击这里检查更新</"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Text"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"      </"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Pressable"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"      {snackbarVisible "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"&&"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" ("})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"        <"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Snackbar"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"visible"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"{"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"true"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"}"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"onDismiss"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"{() "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"=>"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" {"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"            "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"setShowUpdateSnackbar"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"false"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:");"})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          }}"})}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"action"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"{{"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"            label"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-string-expression)"},children:"'更新'"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"            "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"onPress"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"async"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" () "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"=>"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" {"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"              "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"setShowUpdateSnackbar"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"false"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:");"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"              "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"await"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"downloadUpdate"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"();"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"              "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"setShowUpdateBanner"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"true"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:");"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"            }"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          }}>"})}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          <"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Text"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">有新版本({"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"updateInfo"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:".name})可用，是否更新？</"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Text"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"        </"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Snackbar"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"      )}"})}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"      <"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Banner"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"        "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"visible"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"{showUpdateBanner}"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"        "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"actions"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"{["})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          {"})}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"            label"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-string-expression)"},children:"'立即重启'"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"            onPress"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" switchVersion"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          }"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          {"})}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"            label"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-string-expression)"},children:"'下次再说'"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"            "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"onPress"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" () "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"=>"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" {"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"              "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"switchVersionLater"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"();"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"              "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"setShowUpdateBanner"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"false"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:");"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"            }"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          }"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"        ]}"})}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"        "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"icon"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"{({size}) "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"=>"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" ("})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"          <"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Icon"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"name"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-string-expression)"},children:'"checkcircleo"'}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"size"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"{size} "}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"color"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-string-expression)"},children:'"#00f"'}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" />"})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"        )}>"})}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"        更新已完成，是否立即重启？"})}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"      </"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"Banner"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,l.jsxs)(e.span,{className:"line",children:[(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"    </"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"View"}),(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  );"})}),"\n",(0,l.jsx)(e.span,{className:"line",children:(0,l.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"}"})}),"\n",(0,l.jsx)(e.span,{className:"line",children:" "})]})}),"\n",(0,l.jsxs)(e.p,{children:["其中",(0,l.jsx)(e.code,{children:"checkUpdate"}),"方法可以用来手动触发更新检查。检查后返回的",(0,l.jsx)(e.a,{href:"api#async-function-checkupdateappkey",children:(0,l.jsx)(e.code,{children:"updateInfo"})}),"有三种情况："]}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.code,{children:"{expired: true}"}),"：该应用原生包已过期（三种情况：1. 主动设置为过期状态，2. 主动删除，3. 从未上传），开发者应该在 pushy 的管理后台添加一个更新下载链接，并自行提示用户下载。"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.code,{children:"{upToDate: true}"}),"：当前已经更新到最新，无需进行更新。"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.code,{children:"{update: true}"}),"：当前有新版本可以更新。info 的",(0,l.jsx)(e.code,{children:"name"}),"、",(0,l.jsx)(e.code,{children:"description"}),"字段可以用于提示用户，而",(0,l.jsx)(e.code,{children:"metaInfo"}),"字段则可以根据你的需求自定义其它属性(如是否静默更新、是否强制更新等等)，具体用法可参考",(0,l.jsx)(e.a,{href:"bestpractice#%E5%85%83%E4%BF%A1%E6%81%AFmeta-info%E7%9A%84%E4%BD%BF%E7%94%A8",children:"场景实践"}),"。另外还有几个字段，包含了补丁包的下载地址等。 pushy 会首先尝试耗费流量更少的更新方式。"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.p,{children:["当返回的",(0,l.jsx)(e.code,{children:"updateInfo"}),"中",(0,l.jsx)(e.code,{children:"update"}),"字段为true时，即可调用",(0,l.jsx)(e.code,{children:"downloadUpdate"}),"方法来下载更新，此时可以获取到下载的进度数据",(0,l.jsx)(e.code,{children:"progress"}),"。下载完成后可以调用",(0,l.jsx)(e.code,{children:"switchVersion"}),"来立即重启更新，也可以使用",(0,l.jsx)(e.code,{children:"switchVersionLater"}),"来标记下次启动时更新。"]}),"\n",(0,l.jsx)(e.h3,{id:"统计数据",children:"统计数据"}),"\n",(0,l.jsxs)(e.p,{children:["以上提及的所有 api 的说明文档可在",(0,l.jsx)(e.a,{href:"api",children:"这里"}),"查看。"]}),"\n",(0,l.jsxs)(e.p,{children:["现在，你的应用已经可以通过 pushy 服务检查版本并进行更新了。下一步，你可以开始尝试发布应用包和版本，请参阅",(0,l.jsx)(e.a,{href:"publish",children:"发布热更新"}),"。"]})]})}e.default=(0,r.j)({MDXContent:function(){let s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:e}=Object.assign({},(0,o.a)(),s.components);return e?(0,l.jsx)(e,{...s,children:(0,l.jsx)(c,{...s})}):c(s)},pageOpts:{filePath:"pages/docs/integration.md",route:"/docs/integration",frontMatter:{order:1,title:"代码集成",type:"快速入门"},title:"代码集成",headings:i},pageNextRoute:"/docs/integration"})}},function(s){s.O(0,[13,774,888,179],function(){return s(s.s=37748)}),_N_E=s.O()}]);