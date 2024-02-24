(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[850],{46840:function(s,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/publish",function(){return n(76492)}])},76492:function(s,e,n){"use strict";n.r(e),n.d(e,{__toc:function(){return o}});var i=n(11527),r=n(38567),l=n(87088),a=n(45122);let o=[{depth:2,value:"发布原生基准版本",id:"发布原生基准版本"},{depth:3,value:"iOS",id:"ios"},{depth:3,value:"Android",id:"android"},{depth:2,value:"发布热更新版本",id:"发布热更新版本"},{depth:2,value:"测试、发布与回滚",id:"测试发布与回滚"}];function c(s){let e=Object.assign({p:"p",ol:"ol",li:"li",code:"code",a:"a",h2:"h2",h3:"h3",pre:"pre",span:"span",strong:"strong",blockquote:"blockquote"},(0,l.a)(),s.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.p,{children:"现在你的应用已经具备了检测更新的功能，下面我们来尝试发布并更新它。流程可参考下图："}),"\n",(0,i.jsx)(a.G,{chart:'flowchart TD\n    codebase["\uD83D\uDDA5️&nbsp;&nbsp;项目代码库"]\n    subgraph 发布原生基准版本\n    tagNativeVersion["\uD83C\uDFF7️&nbsp;&nbsp;(在 git 上)标记原生版本号"]\n    newNativeVersion["\uD83D\uDDC2️&nbsp;&nbsp;新的原生基准版本"]\n    nativePackage["\uD83D\uDCE6&nbsp;&nbsp;原生完整包(apk或ipa文件)"]\n    tagNativeVersion--"\uD83D\uDD28&nbsp;&nbsp;编译"-->nativePackage\n    nativePackage--"⬆️&nbsp;&nbsp;使用<br/>pushy uploadApk/uploadIpa<br/>命令上传"-->newNativeVersion\n    end\n    subgraph 发布热更新版本\n    tagBundleVersion["\uD83C\uDFF7️&nbsp;&nbsp;(在 git 上)标记热更新版本号"]\n    bundlePackage["\uD83C\uDF81&nbsp;&nbsp;js代码与资源包(ppk文件)"]\n    tagBundleVersion--"\uD83D\uDD28&nbsp;&nbsp;使用<br/>pushy bundle<br/>命令生成并上传"-->bundlePackage\n    someNativeVersions["\uD83D\uDDC2️&nbsp;&nbsp;一个或多个原生基准版本"]\n    bundlePackage--"\uD83D\uDD87️&nbsp;&nbsp;绑定"-->someNativeVersions\n    end\n    user["\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66&nbsp;&nbsp;安装有对应原生基准版本的用户"]\n    codebase--"✏️&nbsp;&nbsp;改动js代码，<br/>或添加、更新js组件，<br/>或添加、更新js代码中引用的图片等资源"-->发布热更新版本\n    codebase--"\uD83D\uDD8A️&nbsp;&nbsp;改动原生代码、设置，<br/>或添加、更新原生组件，<br/>或添加、更新原生代码中引用的图片等资源"-->发布原生基准版本\n    发布热更新版本--"\uD83D\uDCF2&nbsp;&nbsp;推送增量热更新(diff文件)"-->user'}),"\n",(0,i.jsx)(e.p,{children:"流程总结如下："}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["我们需要先打包一个原生 release 版本，在打包前请确保已集成了",(0,i.jsx)(e.code,{children:"react-native-update"}),"并在调试过程中运行正常，安卓端",(0,i.jsxs)(e.a,{href:"/docs/getting-started#%E7%A6%81%E7%94%A8-android-%E7%9A%84-crunch-%E4%BC%98%E5%8C%96",children:["关闭了",(0,i.jsx)(e.code,{children:"crunchPngs"}),"设置"]}),"，打包说明可参考",(0,i.jsx)(e.a,{href:"https://reactnative.cn/docs/publishing-to-app-store",children:"iOS 打包"}),"和",(0,i.jsx)(e.a,{href:"https://reactnative.cn/docs/signed-apk-android",children:"android 打包"}),"。打包完成后请使用",(0,i.jsx)(e.code,{children:"pushy uploadIpa"}),"或者",(0,i.jsx)(e.code,{children:"pushy uploadApk"}),"命令来把这个安装包上传到 pushy 服务器端，以作为之后热更差量对比的基准。同时请保留好这个安装包，上架和分发给用户所使用的安装包",(0,i.jsx)(e.code,{children:"需要和服务器端完全一致"}),"。建议使用 git tag 功能来标记原生版本号（例如",(0,i.jsx)(e.code,{children:"v1.0.0"}),"）。"]}),"\n",(0,i.jsxs)(e.li,{children:["然后在基准版本之上迭代业务逻辑（增删 js 代码，增删图片等静态资源），使用",(0,i.jsx)(e.code,{children:"pushy bundle"}),"命令来生成和发布热更新版本，而不需要重新打包。建议使用 git tag 功能来标记热更版本号（例如",(0,i.jsx)(e.code,{children:"v1.0.1"}),"）。"]}),"\n",(0,i.jsx)(e.li,{children:"如果迭代过程中有原生方面的修改，则需要发布并上传新的原生基准版本（重复步骤 1，但需要设置不同的原生版本号）。可以只保留一个原生基准版本，也可以多版本同时维护。"}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"发布原生基准版本",children:"发布原生基准版本"}),"\n",(0,i.jsx)(e.h3,{id:"ios",children:"iOS"}),"\n",(0,i.jsxs)(e.p,{children:["首先参考",(0,i.jsx)(e.a,{href:"https://reactnative.cn/docs/running-on-device",children:"文档-在设备上运行"}),"，确定你正在使用离线包。然后点击菜单。"]}),"\n",(0,i.jsxs)(e.p,{children:["按照正常的发布流程打包",(0,i.jsx)(e.code,{children:".ipa"}),"文件："]}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsx)(e.li,{children:"Xcode 中运行设备选真机或 Generic iOS Device"}),"\n",(0,i.jsx)(e.li,{children:"菜单中选择 Product - Archive"}),"\n",(0,i.jsxs)(e.li,{children:["Archive 完成后选择",(0,i.jsx)(e.code,{children:"Export"}),"生成.ipa 文件"]}),"\n",(0,i.jsx)(e.li,{children:"然后运行如下命令上传到 pushy 服务器以供后续版本比对之用"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{"data-language":"bash","data-theme":"default",children:(0,i.jsx)(e.code,{"data-language":"bash","data-theme":"default",children:(0,i.jsxs)(e.span,{className:"line",children:[(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"$"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"pushy"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"uploadIpa"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"<"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"ipa后缀文"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"件"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:">"})]})})}),"\n",(0,i.jsxs)(e.p,{children:["此 ipa 的",(0,i.jsx)(e.code,{children:"CFBundleShortVersionString"}),"字段(位于",(0,i.jsx)(e.code,{children:"ios/项目名/Info.plist"}),"中)会被记录为原生版本号",(0,i.jsx)(e.code,{children:"packageVersion"}),"。"]}),"\n",(0,i.jsxs)(e.p,{children:["随后你可以选择往 AppStore 上传这个版本（可以重新 export 并调整相关选项，但请不要重新 archive），也可以先通过",(0,i.jsx)(e.a,{href:"https://developer.apple.com/cn/testflight/",children:"Test flight"}),"或",(0,i.jsx)(e.a,{href:"https://www.pgyer.com/doc/view/build_ipa",children:"蒲公英"}),"等渠道进行真机安装测试。请注意：暂不支持通过 Xcode 直接进行热更新测试。"]}),"\n",(0,i.jsxs)(e.p,{children:["如果后续需要再次 archive 打包（例如修改原生代码或配置。如果只是修改 js 代码则不需要重新打包。），请先",(0,i.jsx)(e.strong,{children:"更改版本号"}),"，并在打包完成后再次",(0,i.jsx)(e.code,{children:"uploadIpa"}),"到服务器端记录，否则后续生成的相同版本的原生包会由于",(0,i.jsxs)(e.a,{href:"faq#%E7%83%AD%E6%9B%B4%E6%96%B0%E6%8A%A5%E9%94%99%EF%BC%9A%E7%83%AD%E6%9B%B4%E6%96%B0%E5%B7%B2%E6%9A%82%E5%81%9C%EF%BC%8C%E5%8E%9F%E5%9B%A0%EF%BC%9Abuildtime-mismatch%E3%80%82",children:["编译时间戳不一致而",(0,i.jsx)(e.code,{children:"无法获取热更新"})]}),"。"]}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsx)(e.p,{children:"注意：如果你在上传之前就运行了新的原生版本，由于服务器端没有记录，会暂停其更新数小时。可删除原先安装的 app 再重新安装以清空暂停设置。在上传之后安装的客户端不会受此影响。"}),"\n"]}),"\n",(0,i.jsx)(e.h3,{id:"android",children:"Android"}),"\n",(0,i.jsxs)(e.p,{children:["首先参考",(0,i.jsx)(e.a,{href:"https://reactnative.cn/docs/signed-apk-android",children:"文档-打包 APK"}),"设置签名，然后在 android 文件夹下运行",(0,i.jsx)(e.code,{children:"./gradlew assembleRelease"}),"或",(0,i.jsx)(e.code,{children:"./gradlew aR"}),"，你就可以在",(0,i.jsx)(e.code,{children:"android/app/build/outputs/apk/release/app-release.apk"}),"中找到你的应用包。"]}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsxs)(e.p,{children:["如果你需要使用 aab 格式（android app bundle，google 市场专用）的包，请参考这里的",(0,i.jsx)(e.a,{href:"bestpractice#%E5%A6%82%E4%BD%95%E6%94%AF%E6%8C%81-aab-%E6%A0%BC%E5%BC%8F%E7%9A%84%E5%8E%9F%E7%94%9F%E5%8C%85",children:"做法"}),"将其转换为 apk 格式后再操作。"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"然后运行如下命令"}),"\n",(0,i.jsx)(e.pre,{"data-language":"bash","data-theme":"default",children:(0,i.jsx)(e.code,{"data-language":"bash","data-theme":"default",children:(0,i.jsxs)(e.span,{className:"line",children:[(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"$"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"pushy"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"uploadApk"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"android/app/build/outputs/apk/release/app-release.apk"})]})})}),"\n",(0,i.jsxs)(e.p,{children:["即可上传 apk 以供后续版本比对之用。此 apk 的",(0,i.jsx)(e.code,{children:"versionName"}),"字段(位于",(0,i.jsx)(e.code,{children:"android/app/build.gralde"}),"中)会被记录为原生版本号",(0,i.jsx)(e.code,{children:"packageVersion"}),"。"]}),"\n",(0,i.jsx)(e.p,{children:"随后你可以选择往应用市场发布这个版本，也可以先往设备上直接安装这个 apk 文件以进行测试。"}),"\n",(0,i.jsxs)(e.p,{children:["如果后续需要再次打包（例如修改原生代码或配置。如果只是修改 js 代码则不需要重新打包。），请先",(0,i.jsx)(e.strong,{children:"更改版本号"}),"，并再次",(0,i.jsx)(e.code,{children:"uploadApk"}),"到服务器端记录，否则后续生成的相同版本的原生包会由于",(0,i.jsxs)(e.a,{href:"faq#%E7%83%AD%E6%9B%B4%E6%96%B0%E6%8A%A5%E9%94%99%EF%BC%9A%E7%83%AD%E6%9B%B4%E6%96%B0%E5%B7%B2%E6%9A%82%E5%81%9C%EF%BC%8C%E5%8E%9F%E5%9B%A0%EF%BC%9Abuildtime-mismatch%E3%80%82",children:["编译时间戳不一致而",(0,i.jsx)(e.code,{children:"无法获取热更新"})]}),"。"]}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsx)(e.p,{children:"注意：如果你在上传之前就运行了新的原生版本，由于服务器端没有记录，会暂停其更新数小时。可删除原先安装的 app 再重新安装以清空暂停设置。在上传之后安装的客户端不会受此影响。"}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"发布热更新版本",children:"发布热更新版本"}),"\n",(0,i.jsxs)(e.p,{children:["你可以尝试修改一行代码(譬如将版本一修改为版本二)，然后使用",(0,i.jsx)(e.code,{children:"pushy bundle --platform <ios|android>"}),"命令来生成新的热更新版本。"]}),"\n",(0,i.jsx)(e.pre,{"data-language":"bash","data-theme":"default",children:(0,i.jsxs)(e.code,{"data-language":"bash","data-theme":"default",children:[(0,i.jsxs)(e.span,{className:"line",children:[(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"$"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"pushy"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"bundle"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"--platform"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"android"})]}),"\n",(0,i.jsxs)(e.span,{className:"line",children:[(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"Bundling"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"with"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"React"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"Native"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"version:"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-constant)"},children:"0.22"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:".2"})]}),"\n",(0,i.jsxs)(e.span,{className:"line",children:[(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:"<"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"各种进度输出"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-keyword)"},children:">"})]}),"\n",(0,i.jsxs)(e.span,{className:"line",children:[(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"Bundled"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"saved"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"to:"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"build/output/android.1459850548545.ppk"})]}),"\n",(0,i.jsxs)(e.span,{className:"line",children:[(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"Would"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"you"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"like"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"to"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"publish"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-string)"},children:"it?"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-token-function)"},children:"Y/N"}),(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:")"})]})]})}),"\n",(0,i.jsxs)(e.p,{children:["如果想要立即上传，此时输入 Y。当然，你也可以在将来使用",(0,i.jsx)(e.code,{children:"pushy publish --platform android build/output/android.1459850548545.ppk"}),"来上传刚才打包好的热更新包。"]}),"\n",(0,i.jsx)(e.pre,{"data-language":"text","data-theme":"default",children:(0,i.jsxs)(e.code,{"data-language":"text","data-theme":"default",children:[(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"  Uploading [========================================================] 100% 0.0s"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"Enter version name: <输入热更新版本名字，如1.0.0-rc>"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"Enter description: <输入热更新版本描述>"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:'Enter meta info: {"ok":1}'})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"Ok."})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"Would you like to bind packages to this version?(Y/N)"})})]})}),"\n",(0,i.jsx)(e.p,{children:"此时版本已经提交到 pushy 服务，但用户暂时看不到此更新，你需要先将特定的原生包版本绑定到此热更新版本上。"}),"\n",(0,i.jsxs)(e.p,{children:["此时输入 Y 立即绑定，你也可以在将来使用",(0,i.jsx)(e.code,{children:"pushy update --platform <ios|android>"}),"来对已上传的热更包和原生包进行绑定。除此以外，你还可以在网页端操作，简单的将对应的原生包版本拖到需要的热更新版本下即可。"]}),"\n",(0,i.jsx)(e.pre,{"data-language":"text","data-theme":"default",children:(0,i.jsxs)(e.code,{"data-language":"text","data-theme":"default",children:[(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"┌────────────┬──────────────────────────────────────┐"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"│ Package Id │               Version                │"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"├────────────┼──────────────────────────────────────┤"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"│   46272    │ 2.0(normal)                          │"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"├────────────┼──────────────────────────────────────┤"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"│   45577    │ 1.0(normal)                          │"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"└────────────┴──────────────────────────────────────┘"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"共 2 个包"})}),"\n",(0,i.jsx)(e.span,{className:"line",children:(0,i.jsx)(e.span,{style:{color:"var(--shiki-color-text)"},children:"输入原生包 id: 46272"})})]})}),"\n",(0,i.jsx)(e.p,{children:"版本绑定完毕后，服务器会在几秒内生成差量补丁，客户端就可以获取到更新了。"}),"\n",(0,i.jsxs)(e.p,{children:["后续要继续发布新的热更新，只需反复执行",(0,i.jsx)(e.code,{children:"pushy bundle"}),"命令即可，不需要重新打包。"]}),"\n",(0,i.jsx)(e.p,{children:"恭喜你，至此为止，你已经完成了植入代码热更新的全部工作。"}),"\n",(0,i.jsx)(e.h2,{id:"测试发布与回滚",children:"测试、发布与回滚"}),"\n",(0,i.jsxs)(e.p,{children:["我们强烈建议您先发布一个",(0,i.jsx)(e.strong,{children:"测试包"}),"，再发布一个除了版本号以外均完全相同的",(0,i.jsx)(e.strong,{children:"正式包"}),"。"]}),"\n",(0,i.jsxs)(e.p,{children:["例如，假设我们有一个正式包，版本为",(0,i.jsx)(e.code,{children:"1.6.0"}),"，那么可以修改版本号重新打包一个",(0,i.jsx)(e.code,{children:"1001.6.0"}),"，以一个明显不太正常的版本号来标识它是一个测试版本，同时后几位相同，可以表明它和某个正式版本存在关联（内容/依赖一致）。"]}),"\n",(0,i.jsxs)(e.p,{children:["在每次往发布包发起热更新之前，先对",(0,i.jsx)(e.strong,{children:"测试包"}),(0,i.jsx)(e.code,{children:"1001.6.0"}),"进行更新操作，基本测试通过之后，再在网页后台上将热更包重新绑定到",(0,i.jsx)(e.strong,{children:"正式包"}),(0,i.jsx)(e.code,{children:"1.6.0"}),"上。如果在测试包中发现了重大问题，你就可以先进行修复，更新测试确认通过后再部署到正式线上环境。这样，可以最大程度的避免发生线上事故。"]}),"\n",(0,i.jsx)(e.p,{children:"万一确实发生线上事故需要回滚的话，首先利用版本控制系统回滚代码到正常的状态，然后重新生成热更包并推送即可。"})]})}e.default=(0,r.j)({MDXContent:function(){let s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:e}=Object.assign({},(0,l.a)(),s.components);return e?(0,i.jsx)(e,{...s,children:(0,i.jsx)(c,{...s})}):c(s)},pageOpts:{filePath:"pages/docs/publish.md",route:"/docs/publish",frontMatter:{order:2,title:"发布热更新",type:"快速入门"},title:"发布热更新",headings:o},pageNextRoute:"/docs/publish"})}},function(s){s.O(0,[386,567,807,888,774,179],function(){return s(s.s=46840)}),_N_E=s.O()}]);