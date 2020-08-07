---
order: 2
title: 发布热更新
type: 快速入门
---

现在你的应用已经具备了检测更新的功能，下面我们来尝试发布并更新它。

## 发布原生起始版本

### iOS

首先参考[文档-在设备上运行](https://reactnative.cn/docs/running-on-device)，
确定你正在使用离线包。然后点击菜单。

按照正常的发布流程打包`.ipa`文件：

1. Xcode中运行设备选真机或Generic iOS Device
2. 菜单中选择Product - Archive
3. Archive完成后选择`Export`生成.ipa文件，此时建议取消bitcode选项以减少ipa大小
4. 然后运行如下命令上传到pushy服务器以供后续版本比对之用

```bash
$ pushy uploadIpa <your-package.ipa>
```

此ipa的`CFBundleShortVersionString`字段(位于`ios/项目名/Info.plist`中)会被记录为原生版本号`packageVersion`。

随后你可以选择往AppStore上传这个版本（注意是刚刚已经archive完成的包重新选择Upload选项，且此时应该勾选bitcode选项），也可以先通过Test flight等方法进行测试。

如果后续需要再次打包（例如修改原生代码或配置），请先更改版本号，并再次uploadIpa到服务器端记录，否则后续生成的原生包无法获取热更新。

### Android

首先参考[文档-打包APK](https://reactnative.cn/docs/signed-apk-android)设置签名，
然后在android文件夹下运行`./gradlew assembleRelease`或`./gradlew aR`，你就可以在`android/app/build/outputs/apk/release/app-release.apk`中找到你的应用包。

然后运行如下命令

```bash
$ pushy uploadApk android/app/build/outputs/apk/release/app-release.apk
```

即可上传apk以供后续版本比对之用。此apk的`versionName`字段(位于`android/build.gralde`中)会被记录为原生版本号`packageVersion`。

随后你可以选择往应用市场发布这个版本，也可以先往设备上直接安装这个apk文件以进行测试。

如果后续需要再次打包（例如修改原生代码或配置），请先更改版本号，并再次uploadApk到服务器端记录，否则后续生成的原生包无法获取热更新。

## 发布热更新版本

你可以尝试修改一行代码(譬如将版本一修改为版本二)，然后生成新的热更新版本。

```bash
$ pushy bundle --platform <ios|android>
Bundling with React Native version:  0.22.2
<各种进度输出>
Bundled saved to: build/output/android.1459850548545.ppk
Would you like to publish it?(Y/N) 
```

如果想要立即发布，此时输入Y。当然，你也可以在将来使用`pushy publish --platform <ios|android> <ppkFile>`来发布版本。

```
  Uploading [========================================================] 100% 0.0s
Enter version name: <输入热更新版本名字，如1.0.0-rc>
Enter description: <输入热更新版本描述>
Enter meta info: {"ok":1}
Ok.
Would you like to bind packages to this version?(Y/N)
```

此时版本已经提交到pushy服务，但用户暂时看不到此更新，你需要先将特定的原生包版本绑定到此热更新版本上。

此时输入Y立即绑定，你也可以在将来使用`pushy update --platform <ios|android>`来使得对应原生包版本的用户更新。
除此以外，你还可以在网页端操作，简单的将对应的原生包版本拖到此热更新版本下即可。

```
Offset 0
1) FvXnROJ1 1.0.1 (no package)
2) FiWYm9lB 1.0 [1.0]
Enter versionId or page Up/page Down/Begin(U/D/B) <输入序号,U/D翻页,B回到开始，序号就是上面列表中)前面的数字>

1) 1.0(normal) - 3 FiWYm9lB (未命名)

Total 1 packages.
Enter packageId: <输入原生包版本序号，序号就是上面列表中)前面的数字>
```

版本绑定完毕后，客户端就应当可以检查到更新并进行更新了。

后续要继续发布新的热更新，只需反复执行`pushy bundle`命令即可。

恭喜你，至此为止，你已经完成了植入代码热更新的全部工作。
