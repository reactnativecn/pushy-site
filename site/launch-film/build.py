# Builds the launch film page from src.html.
#
#   python3 build.py        site pages: ../pages/public/launch (Pushy, zh) and the Cresc
#                           page (en) into $CRESC_SITE/pages/public/launch, falling back
#                           to dist/cresc when that checkout is not next to this one
#   SKIP_SITE=1 python3 build.py
#                           only the local render pages index.html / index-en.html
#                           (fonts from node_modules) used by stills.mjs / render.mjs
import os
import re
import shutil
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)

src = open('src.html', encoding='utf-8').read()
pushy_logo = open('pushy-logo.svg', encoding='utf-8').read()

NODE_FONTS = '\n'.join(
    '<link rel="stylesheet" href="node_modules/@fontsource/%s.css">' % f
    for f in ['inter/400', 'inter/500', 'inter/600', 'inter/700', 'inter/800',
              'noto-sans-sc/400', 'noto-sans-sc/500', 'noto-sans-sc/700', 'noto-sans-sc/900',
              'jetbrains-mono/400', 'jetbrains-mono/700'])

cresc_mark = open('cresc-logo.svg', encoding='utf-8').read()
cresc_mark = cresc_mark.replace('<svg width="108" height="108"', '<svg style="width:%dpx;height:%dpx;flex:none"')


def cresc_logo(mark, text):
    return ('<div style="display:flex;align-items:center;justify-content:center;gap:%dpx">' % (mark // 5)
            + (cresc_mark % (mark, mark))
            + '<span style="font-size:%dpx;font-weight:700;letter-spacing:-0.045em;color:#fbf3e6">Cresc</span></div>' % text)


EN = [
    # document
    ('<html lang="zh-CN">', '<html lang="en">'),
    ('<title>Pushy Launch</title>', '<title>Cresc Launch</title>'),
    # S1
    ('你刚修好一个线上 bug。', 'You fixed a production bug.'),
    ('然后，等了三天审核。', 'Then waited three days for review.'),
    ('App Store 审核中 · 已等待 ', 'App Store review · waiting '),
    # S2
    ('如果发布，</div>', 'What if shipping</div>'),
    ('只需要<span class="grad">一条命令</span>？', 'took <span class="grad">one command</span>?'),
    # S3
    ('React Native 热更新，重新定义。', 'Over-the-air updates for React Native, reimagined.'),
    # S4
    ('01 — 一条命令发布', '01 — Ship in one command'),
    ('<div class="app-h">确认订单</div>', '<div class="app-h">Checkout</div>'),
    ('无线降噪耳机 Pro', 'Wireless Headphones Pro'),
    ('午夜黑 · ×1', 'Midnight · ×1'),
    ('<span>商品金额</span><span>¥1,299.00</span>', '<span>Subtotal</span><span>$199.00</span>'),
    ('<span>运费</span><span>免运费</span>', '<span>Shipping</span><span>Free</span>'),
    ('<span>合计</span><b id="s4price" style="color:#e5484d">¥NaN</b>', '<span>Total</span><b id="s4price" style="color:#e5484d">$NaN</b>'),
    ('⚠ 价格计算异常，暂时无法下单', '⚠ Price calculation failed. Checkout is down.'),
    ('>提交订单<', '>Place Order<'),
    ('正在更新 · 3.4 KB', 'Updating · 3.4 KB'),
    ('改完代码，几秒钟触达每一台设备。<small>无需等待审核 · 无需用户重新下载</small>',
     'Fix the code. Reach every device in seconds.<small>No review queue · No re-download</small>'),
    ("type: 'pushy bundle --platform ios'", "type: 'cresc bundle --platform ios'"),
    ('<span style="color:#3ddc97">✓</span> 已更新到 v1.4.2 · 立即生效', '<span style="color:#3ddc97">✓</span> Updated to v1.4.2 · live now'),
    ('`正在更新 · ${', '`Updating · ${'),
    ("'¥1,299.00' : '¥NaN'", "'$199.00' : '$NaN'"),
    # S5
    ('02 — 增量更新', '02 — Delta updates'),
    ('改一行代码，用户需要下载', 'Change one line. Users download'),
    ('改一行代码，用户只需下载', 'Change one line. Users only download'),
    ('全量 OTA（gzip）', 'Full OTA (gzip)'),
    ('通用 bsdiff', 'Generic bsdiff'),
    ('比全量小 559×', '559× smaller'),
    ('实测 · RN 0.86 release 包 · Hermes 字节码 ~4.4 MB · 单行文案修改',
     'Measured · RN 0.86 release build · Hermes bytecode ~4.4 MB · one-line text change'),
    # S6
    ('03 — 为 Hermes 而生', '03 — Built for Hermes'),
    ('改一行，只动<span class="grad">真正变化的字节</span>。', 'Ship <span class="grad">only the bytes that changed</span>.'),
    ('通用二进制 diff', 'Generic binary diff'),
    ('字符串表重排 · 偏移量整体位移', 'String tables reshuffle · offsets shift'),
    ('delta 模式编译 · HBC 感知可逆变换', 'Delta-mode compile · HBC-aware transform'),
    ('已上架的应用，<span style="color:#fff;font-weight:600">重新构建一次</span>即可受益。',
     'Apps already in the store benefit after <span style="color:#fff;font-weight:600">one rebuild</span>.'),
    # S7
    ('04 — 发布，心中有数', '04 — Release with confidence'),
    ('Pushy 控制台 · 我的应用 · iOS', 'Cresc Console · My App · iOS'),
    ('v1.4.3 · 灰度发布', 'v1.4.3 · Staged rollout'),
    ('>版本状态<', '>Release status<'),
    ('<span id="s7chipt">健康</span>', '<span id="s7chipt">Healthy</span>'),
    ('<span>启动崩溃率</span><span style="font-family:var(--mono)">实时</span>',
     '<span>Launch crash rate</span><span style="font-family:var(--mono)">Live</span>'),
    ('⚠ 检测到启动崩溃 → 设备端自动回滚到 v1.4.2', '⚠ Launch crashes detected → devices roll back to v1.4.2'),
    ('灰度放量 · 健康度监控 · 崩溃自动回滚', 'Staged rollouts · Release health · Automatic crash rollback'),
    ("'异常 · 崩溃率飙升' : (t >= 38.95 ? '已回滚 · 恢复健康' : '健康')",
     "'Anomaly · crash spike' : (t >= 38.95 ? 'Rolled back · healthy' : 'Healthy')"),
    # S8
    ('05 — 原生冷启动自愈', '05 — Native cold-start recovery'),
    ('<div style="font-size:26px">应用启动即崩溃</div>', '<div style="font-size:26px">Crashes on launch</div>'),
    ('<div class="app-h">首页</div>', '<div class="app-h">Home</div>'),
    ('秋季新品 · 限时 8 折', 'Fall sale · 20% off'),
    ('NATIVE · 后台线程<br><span id="s8dl">下载修复版 0%</span>', 'NATIVE · BACKGROUND THREAD<br><span id="s8dl">Downloading fix 0%</span>'),
    ('✓ 已自动恢复到修复版本', '✓ Recovered to the fixed version'),
    ('style="font-size:72px">就算 JS 完全跑不起来——', 'style="font-size:72px;white-space:normal">Even if JS can\'t start at all—'),
    ('style="font-size:72px;margin-top:20px"><span class="grad">下次启动，自动恢复。</span>',
     'style="font-size:72px;margin-top:20px;white-space:normal"><span class="grad">it heals on next launch.</span>'),
    ('原生层不依赖 JS bundle，独立检查并下载修复版。<br>无需用户重装，无需重新上架。',
     'The native layer fetches the fix without the JS bundle.<br>No reinstall. No store resubmission.'),
    ("'下载修复版 '", "'Downloading fix '"),
    # S9
    ('06 — MCP · AI 原生', '06 — MCP · AI-native'),
    ('用<span class="grad">自然语言</span>排查每一次更新。', 'Debug every release in <span class="grad">plain English</span>.'),
    ('Claude · pushy MCP 已连接', 'Claude · cresc MCP connected'),
    ('为什么这位用户的设备没收到 v1.4.2？', "Why didn't this user's device get v1.4.2?"),
    ('⚙ pushy · 查询设备更新记录', '⚙ cresc · device update history'),
    ('接入 Claude、IDE 或自建 Agent · 全程只读 · 按应用授权', 'Works with Claude, IDEs, or your own agents · Read-only · Per-app access'),
    ("const AI_TEXT = '这台设备的原生版本是 1.3.0，而 v1.4.2 只绑定了 1.4.0。\\n把 v1.4.2 同时绑定到 1.3.0，这批用户下次启动即可收到。';",
     "const AI_TEXT = 'This device runs native version 1.3.0, but v1.4.2 is only bound to 1.4.0.\\nBind v1.4.2 to 1.3.0 too, and these users get it on their next launch.';"),
    # S10
    ("'新架构', 'Hermes'", "'New Arch', 'Hermes'"),
    ('<span>新架构</span>', '<span>New Architecture</span>'),
    ('全平台覆盖，第一时间跟进 React Native 最新版本。', 'Every platform. Day-one support for the latest React Native.'),
    # S11
    ('发布，就该这么快。', 'Ship at the speed of thought.'),
    ('<span>pushy.reactnative.cn</span><span style="width:2px;height:36px;background:#3a4050"></span><span><span style="color:var(--dim);font-weight:400">Global · </span>cresc.dev</span>',
     '<span style="font-size:44px">cresc.dev</span>'),
    # Cresc logo
    ('<div id="logoS3" class="el" style="width:500px">%%LOGO%%</div>', '<div id="logoS3" class="el">' + cresc_logo(190, 170) + '</div>'),
    ('<div id="logoS11" class="el" style="width:420px">%%LOGO%%</div>', '<div id="logoS11" class="el">' + cresc_logo(150, 134) + '</div>'),
    # layout: English lines are wider than the Chinese ones
    ('.xl{font-size:132px;', '.xl{font-size:120px;'),
    ('<div id="s6t" class="h1 split" style="font-size:84px">', '<div id="s6t" class="h1 split" style="font-size:80px">'),
    ('<div style="width:900px">', '<div style="width:980px">'),
    ('.brow .lb{color:#aab2c3;text-align:right}', '.brow .lb{color:#aab2c3;text-align:right;white-space:nowrap}'),
]

# Cresc palette: copper / gold instead of Pushy blue (semantic green / red stay)
PALETTE = [
    ('--brand:#4483ed; --brand2:#7aa8ff; --cyan:#5ee7ff;', '--brand:#d98c3f; --brand2:#f0c38a; --cyan:#ffd28a;'),
    ('#4483ed', '#d98c3f'),
    ('rgba(68,131,237', 'rgba(217,140,63'),
    ('rgba(122,168,255', 'rgba(240,195,138'),
    ('#9cc3ff', '#fbe3b8'), ('#7b5cff', '#c0643a'), ('#7aa8ff', '#f0c38a'),
    ('#5ee7ff', '#ffd28a'),
    ('#2c5fd0 0%,rgba(44,95,208,0)', '#8a4a1c 0%,rgba(138,74,28,0)'),
    ('#5a2fd0 0%,rgba(90,47,208,0)', '#6b2a3a 0%,rgba(107,42,58,0)'),
    ('#dfe7ff,#b9c9f5', '#fbeedd,#efd2ad'),
]

en = src
for a, b in EN + PALETTE:
    if a not in en and (a, b) in EN:
        raise SystemExit('missing: ' + a[:80])
    en = en.replace(a, b)
left = re.findall(r'[一-鿿]+', en.split('<script>')[0]) + re.findall(r"'[^'\n]*[一-鿿][^'\n]*'", en.split('<script>')[1].split('// warm fonts')[0])
if left:
    raise SystemExit('untranslated: %r' % left)

zh = src.replace('%%LOGO%%', pushy_logo)

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
FAMILIES = {
    'zh': [('Inter', 'wght@400..800'), ('Noto Sans SC', 'wght@400..900'), ('JetBrains Mono', 'wght@400..700')],
    'en': [('Inter', 'wght@400..800'), ('JetBrains Mono', 'wght@400..700')],
}


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def subset_fonts(html, lang, outdir):
    """Self-hosts variable-font subsets holding exactly the glyphs this page can show."""
    text = ''.join(sorted(set(html) | set(map(chr, range(32, 127))) - set('\n\r\t')))
    os.makedirs(os.path.join(outdir, 'fonts'), exist_ok=True)
    faces = []
    for family, axis in FAMILIES[lang]:
        q = urllib.parse.urlencode({'family': family + ':' + axis, 'text': text, 'display': 'block'})
        cssrc = fetch('https://fonts.googleapis.com/css2?' + q).decode()
        for i, block in enumerate(re.findall(r'@font-face\s*{[^}]*}', cssrc)):
            url = re.search(r'url\(([^)]+)\)', block).group(1)
            name = '%s-%d.woff2' % (family.lower().replace(' ', '-'), i)
            with open(os.path.join(outdir, 'fonts', name), 'wb') as f:
                f.write(fetch(url))
            faces.append(re.sub(r'url\([^)]+\)', 'url(fonts/%s)' % name, block))
    return '<style>\n' + '\n'.join(faces) + '\n</style>'


def site_page(html, lang, outdir):
    shutil.rmtree(outdir, ignore_errors=True)
    os.makedirs(outdir)
    page = html.replace('%%FONTS%%', subset_fonts(html, lang, outdir))
    open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8').write(page)
    shutil.copy('music.js', outdir)
    print('wrote', os.path.relpath(outdir))


open('index.html', 'w', encoding='utf-8').write(zh.replace('%%FONTS%%', NODE_FONTS))
open('index-en.html', 'w', encoding='utf-8').write(en.replace('%%FONTS%%', NODE_FONTS))
if os.environ.get('SKIP_SITE') != '1':
    site_page(zh, 'zh', os.path.join('..', 'pages', 'public', 'launch'))
    cresc_site = os.environ.get('CRESC_SITE', os.path.join('..', '..', '..', 'cresc-site', 'site'))
    cresc_out = os.path.join(cresc_site, 'pages', 'public', 'launch') if os.path.isdir(cresc_site) else os.path.join('dist', 'cresc')
    site_page(en, 'en', cresc_out)
