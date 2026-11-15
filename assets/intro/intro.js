/*! Falcon 98 first-visit intro — live animated brand film (no video file).
 *  Mounted by the inline loader in index.html on #f98-intro (data-layout="h" | "v").
 *  Runs once, then removes itself and reveals the site. */
(function(){
'use strict';
const host=document.getElementById('f98-intro');
if(!host||host.shadowRoot)return;
const V=host.getAttribute('data-layout')==='v';
const W=V?1080:1920,H=V?1920:1080,DUR=32;
const root=host.attachShadow({mode:'open'});
// backing-store density for the two canvases (background + globe): device pixels, capped for speed
function stageScale(){const vw=innerWidth,vh=innerHeight,c=Math.max(vw/W,vh/H),f=Math.min(vw/W,vh/H);
  const r=(V?(vh/vw)/(16/9):(vw/vh)/(16/9));return (r>0.8&&r<1.3)?c:f}   // fill the screen when its shape is close; otherwise fit
const K=Math.max(0.6,Math.min(2,stageScale()*(window.devicePixelRatio||1)));
const LOGO_LOCAL={'falcon-forge.png':1,'jobs-and-interns.png':1,'opendlp-lk.png':1,'rolefit-cv-studio.png':1,'subtitle-forge.png':1,'instax-studio-pro.png':1,'meetacross.png':1,'falconstream-pro.png':1,'falcon-tracker.png':1};
const logo=f=>LOGO_LOCAL[f]?'/assets/intro/logos/'+f.replace('.png','.webp'):'/assets/projects/'+f;

root.innerHTML=`<style>
:host{--navy:#0b1437;--brand:#1e3a8a;--b2:#2f5bd3;--b3:#6b9bfa;--red:#c43030;--red2:#ef4444;--ink:#eaf0ff}
*{box-sizing:border-box;margin:0;padding:0}
:host{all:initial;position:fixed;inset:0;z-index:2147483000;display:block;background:#050a1f;contain:strict;opacity:1;transition:opacity .6s ease}
:host(.out){opacity:0;pointer-events:none}
#vp{position:absolute;inset:0;overflow:hidden;background:#050a1f}
#stage{position:absolute;left:50%;top:50%;width:1920px;height:1080px;transform-origin:50% 50%;font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;line-height:normal}
#stage.v{width:1080px;height:1920px}
#stage{overflow:hidden}
canvas{position:absolute;left:0;top:0;width:100%;height:100%}
img{border:0;max-width:none}
.scene{position:absolute;inset:0;opacity:0;visibility:hidden}
.hl{background:linear-gradient(90deg,#6b9bfa,#a5c4ff 45%,#ffffff);-webkit-background-clip:text;background-clip:text;color:transparent}
.red{color:var(--red2)}
.kicker{font-family:'JetBrains Mono',monospace;font-size:26px;letter-spacing:.35em;text-transform:uppercase;color:var(--b3)}
/* S1 */
#s1 .shield{position:absolute;left:50%;top:44%;width:330px;transform:translate(-50%,-50%)}
#s1 .shield img,#s7 .shield img{width:100%;display:block;position:relative}
.shield::before{content:'';position:absolute;left:-30%;right:-30%;top:-18%;bottom:-38%;background:radial-gradient(closest-side,rgba(47,91,211,.6),rgba(47,91,211,.22) 55%,rgba(47,91,211,0));transform:translateY(8%)}
#s1 .word{position:absolute;left:0;right:0;top:69%;text-align:center;font-weight:800;font-size:132px;letter-spacing:.06em;white-space:nowrap}
#s1 .word span{display:inline-block}
#s1 .sub{position:absolute;left:0;right:0;top:84%;text-align:center}
/* S2 */
#s2 .left{position:absolute;left:150px;top:300px;width:820px}
#s2 .big{font-weight:800;font-size:124px;line-height:1.02;letter-spacing:-.02em}
#s2 .big div{overflow:hidden}
#s2 .big span{display:inline-block}
#s2 .tag{margin-top:40px;font-size:34px;color:#b8c6ee;font-weight:500}
#s2 .code{position:absolute;right:110px;top:220px;width:830px;height:640px;border-radius:26px;background:rgba(8,15,44,.86);border:1px solid rgba(107,155,250,.28);box-shadow:0 60px 140px -40px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.04) inset}
#s2 .bar{height:62px;display:flex;align-items:center;gap:12px;padding:0 26px;border-bottom:1px solid rgba(107,155,250,.18);font-family:'JetBrains Mono';font-size:20px;color:#8ea3d9}
#s2 .dot{width:15px;height:15px;border-radius:50%}
#s2 pre{padding:30px 34px;font-family:'JetBrains Mono',monospace;font-size:24px;line-height:1.7;color:#dbe5ff;white-space:pre}
.k{color:#ff7a90}.s{color:#9be59b}.f{color:#7fb2ff}.c{color:#6c7fb0}.n{color:#ffc46b}
.cursor{display:inline-block;width:14px;height:30px;background:#6b9bfa;vertical-align:-5px}
/* S3 */
#s3 .head{position:absolute;left:0;right:0;top:96px;text-align:center}
#s3 .title{font-weight:800;font-size:84px;margin-top:14px;letter-spacing:-.01em}
#s3 .grid{position:absolute;left:150px;right:150px;top:345px;display:grid;grid-template-columns:repeat(3,1fr);gap:34px}
#s3 .card{height:300px;border-radius:30px;padding:40px 42px;background:linear-gradient(160deg,rgba(47,91,211,.32),rgba(11,20,55,.75));border:1px solid rgba(107,155,250,.3);position:relative;overflow:hidden}
#s3 .card .ic{width:84px;height:84px;border-radius:22px;display:grid;place-items:center;background:linear-gradient(140deg,#2f5bd3,#1e3a8a);box-shadow:0 18px 40px -12px rgba(47,91,211,.9)}
#s3 .card.r .ic{background:linear-gradient(140deg,#ef4444,#8f1d1d);box-shadow:0 18px 40px -12px rgba(196,48,48,.9)}
#s3 .card h3{font-size:42px;font-weight:800;margin-top:30px;line-height:1.1}
#s3 .card p{font-size:26px;color:#b4c3ec;margin-top:12px;font-weight:500}
#s3 .card .shine{position:absolute;top:0;bottom:0;width:180px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);transform:skewX(-20deg)}
/* S4 */
#s4 .count{position:absolute;left:0;right:0;top:70px;text-align:center}
#s4 .num{font-weight:800;font-size:220px;line-height:1;letter-spacing:-.04em}
#s4 .lbl{font-size:48px;font-weight:700;margin-top:6px}
#s4 .rows{position:absolute;left:0;right:0;top:505px}
#s4 .row{display:flex;gap:24px;white-space:nowrap;margin-bottom:26px;width:max-content;position:relative}
#s4 .chip{display:inline-flex;align-items:center;gap:20px;height:150px;padding:0 44px 0 18px;border-radius:999px;background:rgba(12,22,62,.85);border:1px solid rgba(107,155,250,.3);font-size:40px;font-weight:700;flex:none}
#s4 .chip .lg{width:116px;height:116px;border-radius:50%;background:#fff;display:grid;place-items:center;overflow:hidden;flex:none;font-weight:800;font-size:30px;color:#1e3a8a}
#s4 .chip .lg img{width:100%;height:100%}
#s4 .chip .lg.pad{padding:7px}
#s4 .chip .lg.ic{box-shadow:inset 0 0 0 2px rgba(255,255,255,.25)}
#s4 .chip.cl{border-color:rgba(239,68,68,.45)}
/* S5 */
#s5 .wrap{position:absolute;left:190px;top:200px}
#s5 .line{display:flex;align-items:center;gap:40px;height:165px}
#s5 .bar{width:16px;height:110px;border-radius:8px;background:var(--red2)}
#s5 .t{font-weight:800;font-size:108px;letter-spacing:-.02em;white-space:nowrap}
#s5 .t small{font-size:56px;color:#b4c3ec;font-weight:600;margin-left:22px}
/* S6 */
#s6 .txt{position:absolute;left:150px;top:300px;width:900px}
#s6 .from{font-size:46px;font-weight:600;color:#b4c3ec}
#s6 .big{font-weight:800;font-size:132px;line-height:1.02;letter-spacing:-.025em;margin-top:18px}
#s6 .tech{position:absolute;left:0;right:0;bottom:70px;height:80px;overflow:hidden}
#s6 .tech .in{display:flex;gap:70px;white-space:nowrap;font-family:'JetBrains Mono';font-size:36px;color:#8ea3d9;font-weight:600}
/* S7 */
#s7 .shield{position:absolute;left:250px;top:50%;width:400px;transform:translateY(-50%)}

#s7 .right{position:absolute;left:800px;top:250px;width:1000px}
#s7 .big{font-weight:800;font-size:116px;line-height:1.02;letter-spacing:-.025em}
#s7 .pills{margin-top:56px;display:flex;flex-direction:column;gap:22px}
#s7 .pill{display:inline-flex;align-self:flex-start;align-items:center;gap:22px;font-size:42px;font-weight:700;padding:20px 40px;border-radius:999px;background:rgba(12,22,62,.85);border:1px solid rgba(107,155,250,.35)}
#s7 .pill.main{background:linear-gradient(90deg,#c43030,#ef4444);border-color:transparent;box-shadow:0 26px 60px -18px rgba(239,68,68,.8)}
#s7 .pill i{font-style:normal;font-family:'JetBrains Mono';font-size:30px;color:#9fb5ee}
#s7 .pill.main i{color:#ffe1e1}
/* transitions + fx */
#wipe{position:absolute;inset:-200px;pointer-events:none}
#wipe div{position:absolute;top:0;bottom:0;width:900px;transform:skewX(-18deg)}
#flash{position:absolute;inset:0;background:#fff;opacity:0}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 55%,rgba(0,0,8,.65));pointer-events:none}
#bars{position:absolute;inset:0;pointer-events:none}


#stage.v .kicker{font-size:24px;letter-spacing:.3em}
#stage.v #s1 .shield{top:36%;width:440px}
#stage.v #s1 .word{top:56%;font-size:124px}
#stage.v #s1 .sub{top:65%;left:110px;right:110px;line-height:1.9;font-size:28px}
#stage.v #s2 .left{left:110px;right:110px;top:230px;width:auto}
#stage.v #s2 .big{font-size:128px}
#stage.v #s2 .tag{font-size:36px;margin-top:34px}
#stage.v #s2 .code{left:110px;right:110px;top:900px;width:auto;height:720px}
#stage.v #s2 pre{font-size:24.5px;padding:32px 26px;line-height:1.75}
#stage.v #s3 .head{top:230px;left:110px;right:110px}
#stage.v #s3 .title{font-size:92px;line-height:1.05}
#stage.v #s3 .grid{left:110px;right:110px;top:600px;grid-template-columns:repeat(2,1fr);gap:28px}
#stage.v #s3 .card{height:370px;padding:36px 32px}
#stage.v #s3 .card h3{font-size:40px;margin-top:28px}
#stage.v #s3 .card p{font-size:26px}
#stage.v #s4 .count{top:250px;left:110px;right:110px}
#stage.v #s4 .num{font-size:270px}
#stage.v #s4 .lbl{font-size:46px;line-height:1.2}
#stage.v #s4 .rows{top:780px}
#stage.v #s4 .chip{height:138px;font-size:40px}
#stage.v #s4 .chip .lg{width:106px;height:106px}
#stage.v #s4 .row{margin-bottom:24px}
#stage.v #s5 .wrap{left:110px;right:110px;top:470px}
#stage.v #s5 .line{height:235px;gap:34px}
#stage.v #s5 .bar{width:16px;height:160px}
#stage.v #s5 .t{font-size:76px;line-height:1.1;white-space:normal}
#stage.v #s5 .t small{display:block;margin:10px 0 0;font-size:42px}
#stage.v #s6 .txt{left:110px;right:110px;top:1180px;width:auto}
#stage.v #s6 .from{font-size:44px}
#stage.v #s6 .big{font-size:124px}
#stage.v #s6 .tech{bottom:170px}
#stage.v #s6 .tech .in{font-size:34px}
#stage.v #s7 .shield{left:50%;top:500px;width:420px;transform:translate(-50%,-50%)}
#stage.v #s7 .right{left:110px;right:110px;top:830px;width:auto;text-align:center}
#stage.v #s7 .big{font-size:122px}
#stage.v #s7 .pills{align-items:center;margin-top:64px;gap:26px}
#stage.v #s7 .pill{align-self:center;font-size:46px;padding:24px 44px}
#stage.v #vig{background:radial-gradient(ellipse at 50% 45%,transparent 50%,rgba(0,0,8,.7))}
#stage.v #wipe div{width:1200px}

.ui{position:absolute;display:inline-flex;align-items:center;gap:.5em;padding:.75em 1.2em;border-radius:999px;border:1px solid rgba(255,255,255,.28);background:rgba(5,10,31,.72);color:#fff;font:600 15px/1 'Plus Jakarta Sans',system-ui,sans-serif;cursor:pointer;transition:background .2s,border-color .2s;z-index:5;-webkit-tap-highlight-color:transparent}
.ui:hover,.ui:focus-visible{background:rgba(47,91,211,.8);border-color:#6b9bfa;outline:none}
.skip{top:max(16px,env(safe-area-inset-top));right:16px}
.sound{bottom:max(22px,env(safe-area-inset-bottom));left:16px}
.sound[aria-pressed=true]{background:rgba(196,48,48,.85);border-color:transparent}
.pbar{position:absolute;left:0;bottom:0;height:4px;width:100%;background:rgba(255,255,255,.12);z-index:5}
.pbar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#2f5bd3,#ef4444)}
@media (max-width:600px){.ui{font-size:14px}}
</style>
<div id="vp"><div id="stage" class="${V?'v':''}"><div id="shake" style="position:absolute;inset:0"><canvas id="bg"></canvas>

<div class="scene" id="s1">
  <div class="shield"><img src="/assets/intro/shield.webp" alt="" decoding="sync"></div>
  <div class="word" id="s1word"></div>
  <div class="sub kicker">Software Solutions${V?"<br>":" · "}Colombo, Sri Lanka</div>
</div>

<div class="scene" id="s2">
  <div class="left">
    <div class="kicker">From idea to launch</div>
    <div class="big" style="margin-top:26px"><div><span id="w1">Your idea.</span></div><div><span id="w2" class="hl">Production.</span></div></div>
    <div class="tag" id="s2tag">Web · Mobile · Cloud · AI · Security</div>
  </div>
  <div class="code"><div class="bar"><span class="dot" style="background:#ef4444"></span><span class="dot" style="background:#f5b942"></span><span class="dot" style="background:#22c55e"></span><span style="margin-left:14px">falcon98 / launch.ts</span></div><pre id="code"></pre></div>
</div>

<div class="scene" id="s3">
  <div class="head"><div class="kicker">What we build</div><div class="title">Software,${V?"<br>":" "}<span class="hl">end to end.</span></div></div>
  <div class="grid" id="cards"></div>
</div>

<div class="scene" id="s4">
  <div class="count"><div class="num"><span id="num" class="hl">0</span><span class="red">+</span></div><div class="lbl">live products &amp; client sites shipped</div></div>
  <div class="rows" id="rows"></div>
</div>

<div class="scene" id="s5"><div class="wrap" id="lines"></div></div>

<div class="scene" id="s6">
  <canvas id="globe"></canvas>
  <div class="txt"><div class="from" id="s6a">Built in Colombo, Sri Lanka.</div><div class="big" id="s6b">Shipping to <span class="hl">the world.</span></div></div>
  <div class="tech"><div class="in" id="tech"></div></div>
</div>

<div class="scene" id="s7">
  <div class="shield"><img src="/assets/intro/shield.webp" alt="" decoding="sync"></div>
  <div class="right">
    <div class="kicker" id="s7k">Falcon 98 · Software Solutions</div>
    <div class="big" id="s7b" style="margin-top:22px">Let's build<br><span class="hl">what's next.</span></div>
    <div class="pills">
      <div class="pill main" id="p1"><i>WEB</i>falcon98.com</div>
      <div class="pill" id="p2"><i>MAIL</i>info@falcon98.com</div>
      <div class="pill" id="p3"><i>WHATSAPP</i>+94 78 446 4128</div>
    </div>
  </div>
</div>

<div id="wipe"><div id="wa" style="background:linear-gradient(90deg,#1e3a8a,#2f5bd3)"></div><div id="wb" style="background:linear-gradient(90deg,#c43030,#ef4444)"></div></div>
<div id="vig"></div>
<div id="flash"></div><div id="dim" style="position:absolute;inset:0;background:#000;opacity:0;pointer-events:none"></div>
</div></div></div>
<button type="button" class="ui skip" aria-label="Skip intro and go to the website">Skip intro &rsaquo;</button>
<button type="button" class="ui sound" aria-pressed="false">&#128264; Tap for sound</button>
<div class="pbar" aria-hidden="true"><i></i></div>`;
const shake=root.getElementById('shake'), stage=root.getElementById('stage');



const EV={"kick":[0.25,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.375,5.0,5.25,6.0,6.875,7.0,8.0,8.375,9.0,9.25,10.0,10.875,11.0,11.25,12.0,12.375,13.0,14.0,14.875,15.0,15.25,16.0,16.375,17.0,17.25,18.0,18.875,19.0,20.0,20.375,20.5,21.0,21.25,21.5,22.0,22.5,22.875,23.0,23.5,24.0,24.375,25.0,25.25,26.0,26.875,27.0,28.0,28.75,29.25,29.5,30.0],"snare":[3.0,3.125,3.2325,3.3249,3.4045,3.4728,3.5316,3.5822,3.6257,3.6631,3.6953,3.7253,3.7553,3.7853,3.8153,3.8453,3.8753,3.9053,3.9353,3.9653,4.5,5.5,5.875,6.5,7.0,7.125,7.25,7.375,7.5,7.625,7.75,7.8125,7.875,7.9375,8.5,9.5,9.875,10.5,11.5,11.875,12.5,13.0,13.125,13.25,13.375,13.5,13.625,13.75,13.8125,13.875,13.9375,14.5,15.5,15.875,16.5,17.5,17.875,18.5,19.0,19.125,19.25,19.375,19.5,19.625,19.75,19.8125,19.875,19.9375,20.5,21.5,21.875,22.5,23.0,23.125,23.25,23.375,23.5,23.625,23.75,23.8125,23.875,23.9375,24.5,25.5,25.875,26.5,27.0,27.125,27.25,27.375,27.5,27.625,27.75,27.8125,27.875,27.9375,29.0,29.5,29.5625,29.625,29.6875],"crash":[0.25,4.0,8.0,14.0,20.0,24.0,28.0,30.0],"impact":[0.25,4.0,28.0,30.0]};
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const P=(t,a,b)=>clamp((t-a)/(b-a));
const oE=x=>x>=1?1:1-Math.pow(2,-10*x);               // outExpo
const oB=x=>{const c=1.70158,c3=c+1;return 1+c3*Math.pow(x-1,3)+c*Math.pow(x-1,2)}; // outBack
const iC=x=>x*x*x; const ioC=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const $=id=>root.getElementById(id);
function hitEnv(list,t,k=9,max=1){let v=0;for(const e of list){if(e<=t)v=Math.max(v,Math.exp(-(t-e)*k));}return Math.min(max,v)}
// seeded random
let seed=98;const rnd=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};

// ---------- static DOM ----------
$('s1word').innerHTML=[...'FALCON 98'].map(c=>`<span>${c===' '?'&nbsp;':c}</span>`).join('');
const letters=[...$('s1word').children];
const CODE=[
 ['c','// Your idea → production, the Falcon 98 way'],
 ['k','import '],['','{ design, build, ship } '],['k','from '],['s',"'@falcon98/core'"],['',';\n\n'],
 ['k','const '],['','project = '],['k','await '],['f','design'],['','({\n'],
 ['','  client: '],['s',"'Your Business'"],['',',\n'],
 ['','  platforms: ['],['s',"'web'"],['',', '],['s',"'android'"],['',', '],['s',"'ios'"],['','],\n'],
 ['','  cloud: '],['s',"'aws'"],['',', ai: '],['n','true'],['',',\n'],
 ['','});\n\n'],
 ['k','await '],['f','build'],['','(project, { secure: '],['n','true'],['',', seo: '],['n','true'],['',' });\n'],
 ['k','await '],['f','ship'],['','(project); '],['c','// ● live'],
];
CODE[0][1]+='\n';
const CODE_LEN=CODE.reduce((a,c)=>a+c[1].length,0);
function codeHTML(n){let out='',left=n;for(const[c,s]of CODE){if(left<=0)break;const p=s.slice(0,left);left-=s.length;const esc=p.replace(/&/g,'&amp;').replace(/</g,'&lt;');out+=c?`<span class="${c}">${esc}</span>`:esc}return out}
const ICON={
 code:'<path d="M30 22 14 42l16 20M54 22l16 20-16 20M47 16 37 68" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
 web:'<circle cx="42" cy="42" r="26" stroke="#fff" stroke-width="6" fill="none"/><path d="M16 42h52M42 16c-12 14-12 38 0 52M42 16c12 14 12 38 0 52" stroke="#fff" stroke-width="5" fill="none"/>',
 mob:'<rect x="26" y="12" width="32" height="60" rx="8" stroke="#fff" stroke-width="6" fill="none"/><circle cx="42" cy="61" r="4" fill="#fff"/>',
 cloud:'<path d="M26 62h34a14 14 0 0 0 0-28 20 20 0 0 0-38 6 11 11 0 0 0 4 22z" stroke="#fff" stroke-width="6" fill="none" stroke-linejoin="round"/>',
 ai:'<path d="M42 12l7 19 19 7-19 7-7 19-7-19-19-7 19-7z" fill="#fff"/><circle cx="66" cy="64" r="6" fill="#fff"/>',
 sec:'<path d="M42 12l26 10v18c0 17-11 28-26 33-15-5-26-16-26-33V22z" stroke="#fff" stroke-width="6" fill="none" stroke-linejoin="round"/><path d="M31 42l8 8 15-16" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
};
const SERV=[['code','Custom Software','ERP, CRM, SaaS & APIs'],['web','Web Development','Fast, SEO-ready sites & apps'],['mob','Mobile Apps','Android & iOS, native or Flutter'],
 ['cloud','Cloud & DevOps','AWS · Azure · Google Cloud'],['ai','AI & Data','GenAI, BI & predictive models'],['sec','Cybersecurity','Security-first, from day one']];
$('cards').innerHTML=SERV.map((s,i)=>`<div class="card${i%2?' r':''}"><div class="ic"><svg width="84" height="84" viewBox="0 0 84 84">${ICON[s[0]]}</svg></div><h3>${s[1]}</h3><p>${s[2]}</p><div class="shine"></div></div>`).join('');
const cards=[...$('cards').children];
const ICO={"tower-broadcast": ["0 0 576 512", "<path d=\"M80.3 44C69.8 69.9 64 98.2 64 128s5.8 58.1 16.3 84c6.6 16.4-1.3 35-17.7 41.7s-35-1.3-41.7-17.7C7.4 202.6 0 166.1 0 128S7.4 53.4 20.9 20C27.6 3.6 46.2-4.3 62.6 2.3S86.9 27.6 80.3 44zM555.1 20C568.6 53.4 576 89.9 576 128s-7.4 74.6-20.9 108c-6.6 16.4-25.3 24.3-41.7 17.7S489.1 228.4 495.7 212c10.5-25.9 16.3-54.2 16.3-84s-5.8-58.1-16.3-84C489.1 27.6 497 9 513.4 2.3s35 1.3 41.7 17.7zM352 128c0 23.7-12.9 44.4-32 55.4V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V183.4c-19.1-11.1-32-31.7-32-55.4c0-35.3 28.7-64 64-64s64 28.7 64 64zM170.6 76.8C163.8 92.4 160 109.7 160 128s3.8 35.6 10.6 51.2c7.1 16.2-.3 35.1-16.5 42.1s-35.1-.3-42.1-16.5c-10.3-23.6-16-49.6-16-76.8s5.7-53.2 16-76.8c7.1-16.2 25.9-23.6 42.1-16.5s23.6 25.9 16.5 42.1zM464 51.2c10.3 23.6 16 49.6 16 76.8s-5.7 53.2-16 76.8c-7.1 16.2-25.9 23.6-42.1 16.5s-23.6-25.9-16.5-42.1c6.8-15.6 10.6-32.9 10.6-51.2s-3.8-35.6-10.6-51.2c-7.1-16.2 .3-35.1 16.5-42.1s35.1 .3 42.1 16.5z\"/>"], "file-prescription": ["0 0 384 512", "<path d=\"M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM104 196h72c33.1 0 60 26.9 60 60c0 25.5-15.9 47.2-38.3 55.9l43 40.3 33.8-31c8.1-7.5 20.8-6.9 28.3 1.2s6.9 20.8-1.2 28.3L270 379.7l31.7 29.7c8.1 7.6 8.5 20.2 .9 28.3s-20.2 8.5-28.3 .9l-33.9-31.8-34.9 32c-8.1 7.5-20.8 6.9-28.3-1.2s-6.9-20.8 1.2-28.3l32.6-29.9-64.8-60.8c-.9-.8-1.6-1.7-2.3-2.6H124v44c0 11-9 20-20 20s-20-9-20-20V296 216c0-11 9-20 20-20zm72 80c11 0 20-9 20-20s-9-20-20-20H124v40h52z\"/>"], "user-shield": ["0 0 640 512", "<path d=\"M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c1.8 0 3.5-.2 5.3-.5c-76.3-55.1-99.8-141-103.1-200.2c-16.1-4.8-33.1-7.3-50.7-7.3H178.3zm308.8-78.3l-120 48C358 277.4 352 286.2 352 296c0 63.3 25.9 168.8 134.8 214.2c5.9 2.5 12.6 2.5 18.5 0C614.1 464.8 640 359.3 640 296c0-9.8-6-18.6-15.1-22.3l-120-48c-5.7-2.3-12.1-2.3-17.8 0zM591.4 312c-3.9 50.7-27.2 116.7-95.4 149.7V273.8L591.4 312z\"/>"], "terminal": ["0 0 576 512", "<path d=\"M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32s14.3-32 32-32z\"/>"]};
// [name, logo file or icon key, client?, fit, c1, c2]
const ROWS=V?[
 [['Falcon Forge','falcon-forge.png'],['Drive to MEGA','drive-to-mega.webp'],['Ferry','ferry.webp'],['Rekiya','rekiya.webp'],['LankaTwin','lankatwin.webp']],
 [['Jobs and Interns','jobs-and-interns.png'],['RECON-98','@tower-broadcast',0,0,'#10b981','#022c22'],['MedReader-SL','@file-prescription',0,0,'#14b8a6','#134e4a'],['OpenDLP-LK','opendlp-lk.png'],['RoleFit CV Studio','rolefit-cv-studio.png']],
 [['Subtitle Forge','subtitle-forge.png'],['Instax Studio Pro','instax-studio-pro.png'],['Raffle Draw App','raffle-draw.svg',0,'contain'],['MeetAcross','meetacross.png'],['FalconStream Pro','falconstream-pro.png']],
 [['GeoTracker Pro','geotracker.webp'],['Blue Team Cyber Dashboard','@user-shield',0,0,'#3b82f6','#0b1437'],['Falcon Tracker','falcon-tracker.png'],['Falcon Terminal','@terminal',0,0,'#64748b','#0f172a']],
 [['Dev Ceylon','dev-ceylon.webp',1,'contain'],['MSS Travels & Tours','mss-travels.webp',1,'contain'],['SIHINA 2026','sihina.webp',1,'contain'],['Avish Taxi','avish-taxi.svg',1,'cover']]]:[
 [['Falcon Forge','falcon-forge.png'],['Drive to MEGA','drive-to-mega.webp'],['Ferry','ferry.webp'],['Rekiya','rekiya.webp'],['LankaTwin','lankatwin.webp'],['Jobs and Interns','jobs-and-interns.png'],['RECON-98','@tower-broadcast',0,0,'#10b981','#022c22'],['MedReader-SL','@file-prescription',0,0,'#14b8a6','#134e4a']],
 [['OpenDLP-LK','opendlp-lk.png'],['RoleFit CV Studio','rolefit-cv-studio.png'],['Subtitle Forge','subtitle-forge.png'],['Instax Studio Pro','instax-studio-pro.png'],['Raffle Draw App','raffle-draw.svg',0,'contain'],['MeetAcross','meetacross.png'],['FalconStream Pro','falconstream-pro.png'],['GeoTracker Pro','geotracker.webp']],
 [['Blue Team Cyber Dashboard','@user-shield',0,0,'#3b82f6','#0b1437'],['Falcon Tracker','falcon-tracker.png'],['Falcon Terminal','@terminal',0,0,'#64748b','#0f172a'],['Dev Ceylon','dev-ceylon.webp',1,'contain'],['MSS Travels & Tours','mss-travels.webp',1,'contain'],['SIHINA 2026','sihina.webp',1,'contain'],['Avish Taxi','avish-taxi.svg',1,'cover']]];
$('rows').innerHTML=ROWS.map((_,i)=>`<div class="row" id="r${i+1}"></div>`).join('');
const chip=p=>{let lg;
  if(p[1][0]==='@'){const[vb,d]=ICO[p[1].slice(1)];lg=`<div class="lg ic" style="background:linear-gradient(145deg,${p[4]},${p[5]})"><svg viewBox="${vb}" width="58" height="58" fill="#fff">${d}</svg></div>`}
  else lg=`<div class="lg${p[3]==='contain'?' pad':''}"><img src="${logo(p[1])}" alt="" decoding="async" style="object-fit:${p[3]||'cover'}"></div>`;
  return `<div class="chip${p[2]?' cl':''}">${lg}${p[0].replace('&','&amp;')}</div>`};
ROWS.forEach((r,i)=>$('r'+(i+1)).innerHTML=r.map(chip).join(''));
const ROWW=ROWS.map((_,i)=>$('r'+(i+1)).scrollWidth);
const LINES=[['Free consultation',''],['Transparent pricing','LKR / USD'],['Security-first','built in'],['Fast & SEO-ready','by default']];
$('lines').innerHTML=LINES.map(l=>`<div class="line"><div class="bar"></div><div class="t">${l[0]}${l[1]?`<small>${l[1]}</small>`:''}</div></div>`).join('');
const lines=[...$('lines').children];
const TECH='React · Node.js · Python · AWS · Azure · Google Cloud · Docker · Android · iOS · Vue.js · Java · TypeScript · Flutter · Kubernetes ·';
$('tech').textContent=(TECH+' ').repeat(3);

// ---------- background canvas ----------
const bgc=$('bg'),glc=$('globe');const KB=Math.min(1,K);bgc.width=Math.round(W*KB);bgc.height=Math.round(H*KB);const KG=Math.min(K,1.25);glc.width=Math.round(W*KG);glc.height=Math.round(H*KG);
const bg=bgc.getContext('2d',{alpha:false});
const STARS=[...Array(140)].map(()=>({x:rnd()*W,y:rnd()*H,z:.2+rnd()*.8,r:rnd()}));
function drawBG(t,kick){
  bg.setTransform(KB,0,0,KB,0,0);
  const g=bg.createLinearGradient(0,0,W,H);g.addColorStop(0,'#050a1f');g.addColorStop(.55,'#0b1437');g.addColorStop(1,'#13265e');
  bg.fillStyle=g;bg.fillRect(0,0,W,H);
  // drifting glows
  const orb=(x,y,r,c)=>{const gr=bg.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,c);gr.addColorStop(1,'rgba(0,0,0,0)');bg.fillStyle=gr;bg.fillRect(x-r,y-r,2*r,2*r)};
  orb(W*.22+Math.sin(t*.4)*160,H*.3+Math.cos(t*.3)*90,700+kick*90,`rgba(47,91,211,${.38+kick*.12})`);
  orb(W*.82+Math.cos(t*.35)*140,H*.75+Math.sin(t*.45)*80,620+kick*80,`rgba(196,48,48,${.22+kick*.1})`);
  // perspective grid floor
  bg.save();bg.globalAlpha=.22+kick*.15;bg.strokeStyle='#6b9bfa';bg.lineWidth=1.2;
  const hy=H*.62, sp=(t*90)%80;
  for(let i=0;i<(V?22:16);i++){const z=(i*80+sp)/1280;const y=hy+Math.pow(z,2.2)*(H-hy)*1.0;bg.globalAlpha=Math.pow(z,1.6)*.32*(1+kick*.6);bg.beginPath();bg.moveTo(0,y);bg.lineTo(W,y);bg.stroke()}
  const vg=bg.createLinearGradient(0,hy,0,H);vg.addColorStop(0,'rgba(107,155,250,0)');vg.addColorStop(1,`rgba(107,155,250,${.22+kick*.12})`);
  bg.globalAlpha=1;bg.strokeStyle=vg;
  for(let i=-14;i<=14;i++){bg.beginPath();bg.moveTo(W/2+i*40,hy);bg.lineTo(W/2+i*260,H+40);bg.stroke()}
  bg.restore();
  // stars streaming
  for(const s of STARS){const x=(s.x-t*60*s.z+W*10)%W, y=s.y*0.62;bg.fillStyle=`rgba(190,210,255,${.15+s.z*.5})`;bg.fillRect(x,y,1.5+s.z*1.8,1.5+s.z*1.8)}
}

// ---------- globe ----------
const gl=glc.getContext('2d');let globeDirty=true;
const GP=[];{const n=900;for(let i=0;i<n;i++){const y=1-2*(i+.5)/n,r=Math.sqrt(1-y*y),th=i*2.399963;GP.push([Math.cos(th)*r,y,Math.sin(th)*r])}}
const ll=(lat,lon)=>{const a=lat*Math.PI/180,b=lon*Math.PI/180;return[Math.cos(a)*Math.sin(b),Math.sin(a),Math.cos(a)*Math.cos(b)]};
const CMB=ll(6.9,79.86);
const DEST=[ll(25.2,55.3),ll(1.35,103.8),ll(51.5,-0.12),ll(-33.9,151.2),ll(35.7,139.7),ll(28.6,77.2)];
function rot(p,a){const c=Math.cos(a),s=Math.sin(a);return[p[0]*c+p[2]*s,p[1],-p[0]*s+p[2]*c]}
function tilt(p,a){const c=Math.cos(a),s=Math.sin(a);return[p[0],p[1]*c-p[2]*s,p[1]*s+p[2]*c]}
function drawGlobe(t,lt,vis){
  if(vis<=0&&!globeDirty)return; gl.setTransform(KG,0,0,KG,0,0);gl.clearRect(0,0,W,H);globeDirty=vis>0; if(vis<=0)return;
  const cx=V?540:1420,cy=V?660:500,R=(V?400:380)*(.85+.15*oE(P(lt,0,.8)));
  const a=-79.86*Math.PI/180-lt*.12;  // start with Colombo facing
  const pr=p=>{let q=tilt(rot(p,a),-.18);return[cx+q[0]*R,cy-q[1]*R,q[2]]};
  gl.save();gl.globalAlpha=vis;
  const halo=gl.createRadialGradient(cx,cy,R*.6,cx,cy,R*1.35);halo.addColorStop(0,'rgba(47,91,211,.35)');halo.addColorStop(1,'rgba(47,91,211,0)');gl.fillStyle=halo;gl.fillRect(cx-R*1.5,cy-R*1.5,R*3,R*3);
  const body=gl.createRadialGradient(cx-R*.35,cy-R*.4,R*.1,cx,cy,R);body.addColorStop(0,'rgba(47,91,211,.55)');body.addColorStop(1,'rgba(8,16,48,.92)');gl.fillStyle=body;gl.beginPath();gl.arc(cx,cy,R,0,7);gl.fill();gl.strokeStyle='rgba(107,155,250,.55)';gl.lineWidth=2;gl.stroke();
  for(const p of GP){const[x,y,z]=pr(p);if(z<0)continue;gl.fillStyle=`rgba(165,196,255,${.25+z*.75})`;const s=1.6+z*2.2;gl.fillRect(x-s/2,y-s/2,s,s)}
  const c=pr(CMB);
  // arcs
  DEST.forEach((d,i)=>{const st=.5+i*.32,pp=oE(P(lt,st,st+1.1));if(pp<=0)return;
    const steps=40;gl.beginPath();let first=true;
    for(let k=0;k<=steps*pp;k++){const u=k/steps;let m=[CMB[0]*(1-u)+d[0]*u,CMB[1]*(1-u)+d[1]*u,CMB[2]*(1-u)+d[2]*u];const L=Math.hypot(...m);const h=1+.22*Math.sin(Math.PI*u);m=m.map(v=>v/L*h);const[x,y,z]=pr(m);if(z<-.05){first=true;continue}if(first){gl.moveTo(x,y);first=false}else gl.lineTo(x,y)}
    gl.strokeStyle=i%2?'rgba(239,68,68,.9)':'rgba(165,196,255,.95)';gl.lineWidth=3.5;gl.stroke();
    if(pp>=1){const[x,y,z]=pr(d);if(z>-.2){gl.fillStyle='#fff';gl.beginPath();gl.arc(x,y,6,0,7);gl.fill()}}
  });
  if(c[2]>0){const pu=(lt*1.6)%1;gl.strokeStyle=`rgba(239,68,68,${1-pu})`;gl.lineWidth=4;gl.beginPath();gl.arc(c[0],c[1],10+pu*46,0,7);gl.stroke();
    gl.fillStyle='#ef4444';gl.beginPath();gl.arc(c[0],c[1],11,0,7);gl.fill();
    gl.font="700 30px 'Plus Jakarta Sans'";gl.fillStyle='#fff';gl.fillText('Colombo',c[0]+22,c[1]+10)}
  gl.restore();
}

// ---------- scene timing ----------
const S=[['s1',0,4],['s2',4,8],['s3',8,14],['s4',14,20],['s5',20,24],['s6',24,28],['s7',28,32.01]];
const CUTS=[4,8,14,20,24,28];
function vis(t,a,b){return clamp(Math.min((t-a)/.12+1,(b-t)/.12+0.0001))}

function render(t){
  const kick=hitEnv(EV.kick,t,10), imp=hitEnv(EV.impact,t,5), snare=hitEnv(EV.snare,t,14);
  drawBG(t,kick);
  // camera shake on impacts
  const sh=imp*14; shake.style.transform=`translate(${Math.sin(t*90)*sh}px,${Math.cos(t*77)*sh}px)`;
  for(const[id,a,b]of S){const el=$(id);const on=t>=a-0.001&&t<b;el.style.opacity=on?1:0;el.style.visibility=on?'visible':'hidden'}

  // S1 — logo slam
  if(t<4.2){const lt=t;
    const sp=P(lt,.25,.75), s=sp<=0?0:(1.9-.9*oB(sp));
    const shield=root.querySelector('#s1 .shield');
    shield.style.opacity=sp>0?1:0;
    shield.style.transform=`translate(-50%,-50%) scale(${s*(1+kick*.035)}) rotate(${(1-oE(sp))*-8}deg)`;
    {const bl=(1-oE(sp))*14;shield.style.filter=bl>0.3?`blur(${bl}px)`:'none'}
    letters.forEach((l,i)=>{const p=oE(P(lt,1.0+i*.07,1.5+i*.07));l.style.opacity=p;l.style.transform=`translateY(${(1-p)*80}px) scale(${.6+.4*p})`;l.style.color=i>=7?'#ef4444':'#fff'});
    const sb=oE(P(lt,2.0,2.6));const sub=root.querySelector('#s1 .sub');sub.style.opacity=sb;sub.style.letterSpacing=`${.35+(1-sb)*.4}em`;
    const out=iC(P(lt,3.6,4.0));$('s1').style.transform=`scale(${1+out*.5})`;
  }
  // S2 — idea → production + code
  if(t>=4&&t<8.2){const lt=t-4;
    const a=oE(P(lt,.0,.45)),b=oE(P(lt,.5,.95));
    $('w1').style.transform=`translateY(${(1-a)*140}px)`;$('w2').style.transform=`translateY(${(1-b)*140}px)`;
    const tg=oE(P(lt,1.0,1.5));$('s2tag').style.opacity=tg;$('s2tag').style.transform=`translateX(${(1-tg)*-60}px)`;
    const cw=root.querySelector('#s2 .code'),cp=oE(P(lt,.15,.8));
    cw.style.opacity=cp;cw.style.transform=V?`translateY(${(1-cp)*260}px) perspective(1600px) rotateX(${12-cp*12}deg)`:`translateX(${(1-cp)*220}px) perspective(1600px) rotateY(${-14+cp*6}deg)`;
    const n=Math.floor(CODE_LEN*ioC(P(lt,.5,3.2)));
    $('code').innerHTML=codeHTML(n)+((Math.floor(lt*3)%2===0||n<CODE_LEN)?'<span class="cursor"></span>':'');
    const out=iC(P(lt,3.65,4.0));$('s2').style.transform=V?`translateY(${-out*300}px)`:`translateX(${-out*300}px)`;$('s2').style.opacity=t<8?1-out:0;
  }
  // S3 — service cards pop on beats
  if(t>=8&&t<14.2){const lt=t-8;
    const hd=oE(P(lt,0,.5));root.querySelector('#s3 .head').style.transform=`translateY(${(1-hd)*-80}px)`;root.querySelector('#s3 .head').style.opacity=hd;
    cards.forEach((c,i)=>{const st=.5+i*.5,p=P(lt,st,st+.45),e=oB(p);
      c.style.opacity=clamp(p*3);c.style.transform=`translateY(${(1-e)*120}px) scale(${.7+.3*e})`;
      const sh=c.querySelector('.shine');sh.style.left=`${-300+P(lt,st+.15,st+.75)*900}px`;
      const glow=hitEnv(EV.kick.filter(k=>k>=8+st+.6),t,8)*.6;c.style.boxShadow=`0 0 ${40*glow}px rgba(107,155,250,${glow})`});
    const out=iC(P(lt,5.65,6.0));$('s3').style.transform=`scale(${1-out*.12})`;$('s3').style.opacity=t<14?1-out:0;
  }
  // S4 — counter + product marquee
  if(t>=14&&t<20.2){const lt=t-14;
    const c=root.querySelector('#s4 .count'),cp=oE(P(lt,0,.5));c.style.opacity=cp;c.style.transform=`scale(${.8+.2*cp+kick*.02})`;
    $('num').textContent=Math.round(23*ioC(P(lt,.1,1.6)));
    const rp=oE(P(lt,.6,1.2));
    const mv=ioC(clamp((lt-1.0)/4.75));  // every chip crosses the screen once
    ROWS.forEach((_,j)=>{const i=j+1,m=V?110:80,span=Math.max(0,ROWW[j]-W+2*m), x=j%2?(-span+m)+span*mv:m-span*mv;$('r'+i).style.transform=`translateX(${x}px)`});
    root.querySelector('#s4 .rows').style.opacity=rp;root.querySelector('#s4 .rows').style.transform=`translateY(${(1-rp)*120}px)`;
    const out=iC(P(lt,5.65,6.0));$('s4').style.opacity=t<20?1-out:0;
  }
  // S5 — statements on every beat
  if(t>=20&&t<24.2){const lt=t-20;
    lines.forEach((l,i)=>{const st=i*.98+.02,p=P(lt,st,st+.3),e=oE(p);
      l.style.opacity=p<=0?0:(lt>st+.98&&i<3?.38:1);
      l.style.transform=`translateX(${(1-e)*-240}px) scale(${1+(1-e)*.25})`;
      l.querySelector('.bar').style.transform=`scaleY(${oB(P(lt,st,st+.35))})`;});
    const out=iC(P(lt,3.7,4.0));$('s5').style.opacity=t<24?1-out:0;
  }
  // S6 — globe
  if(t>=24&&t<28.2){const lt=t-24;
    drawGlobe(t,lt,oE(P(lt,0,.6)));
    const a=oE(P(lt,.1,.5)),b=oE(P(lt,.5,1.0));$('s6a').style.opacity=a;$('s6a').style.transform=`translateY(${(1-a)*40}px)`;
    $('s6b').style.opacity=b;$('s6b').style.transform=`translateY(${(1-b)*80}px)`;
    $('tech').style.transform=`translateX(${-lt*220}px)`;
    const out=iC(P(lt,3.7,4.0));$('s6').style.opacity=t<28?1-out:0;
  } else drawGlobe(0,0,0);
  // S7 — CTA
  if(t>=28){const lt=t-28;
    const sp=P(lt,0,.55);const sh=root.querySelector('#s7 .shield');
    sh.style.transform=`${V?'translate(-50%,-50%)':'translateY(-50%)'} scale(${(1.6-.6*oB(sp))*(1+kick*.03)})`;sh.style.opacity=clamp(sp*4);{const bl=(1-oE(sp))*10;sh.style.filter=bl>0.3?`blur(${bl}px)`:'none'}
    const k=oE(P(lt,.25,.7)),b=oE(P(lt,.4,.95));$('s7k').style.opacity=k;$('s7b').style.opacity=b;$('s7b').style.transform=`translateY(${(1-b)*70}px)`;
    ['p1','p2','p3'].forEach((id,i)=>{const p=oB(P(lt,1.0+i*.25,1.45+i*.25));$(id).style.opacity=clamp(P(lt,1.0+i*.25,1.25+i*.25));$(id).style.transform=V?`translateY(${(1-p)*80}px)`:`translateX(${(1-p)*-120}px)`});
    $('p1').style.transform+=` scale(${1+hitEnv(EV.impact.filter(x=>x>=30),t,6)*.06})`;
    const end=P(lt,3.55,4.0);$('dim').style.opacity=end*.85;
  } else $('dim').style.opacity=0;

  // wipes on cuts
  let wa=-2000,wb=-2000;
  for(const c of CUTS){const p=P(t,c-.22,c+.28);if(p>0&&p<1){const e=ioC(p);wa=-1100+e*3300;wb=-1500+e*3300}}
  $('wa').style.left=wa+'px';$('wb').style.left=wb+'px';
  // flash
  $('flash').style.opacity=Math.max(imp*.55*(t<1?1.2:1),hitEnv(EV.crash,t,12)*.18);
}



if(/[?&]introdebug\b/.test(location.search))window.__f98intro={render,drawBG,drawGlobe};
// ---------- runtime ----------
function layout(){const s=stageScale();stage.style.transform=`translate(-50%,-50%) scale(${s})`}
layout();addEventListener('resize',layout);

const bar=root.querySelector('.pbar i'), snd=root.querySelector('.sound');
const audio=new Audio();audio.preload='auto';audio.src='/assets/intro/drums.m4a';
let t0=0,elapsed=0,running=false,done=false,raf=0,soundOn=false;
const now=()=>performance.now();
let lastSeek=0;
function clock(){
  const t=(now()-t0)/1000;                       // the animation always owns time; it never jumps backwards
  if(soundOn&&!audio.paused&&audio.readyState>=2){
    const d=audio.currentTime-t;
    if(Math.abs(d)<0.25){if(d>0)t0-=d*1000*0.5;return Math.max(t,audio.currentTime)}   // lock to the beat, only ever easing forward
    if(now()-lastSeek>500){lastSeek=now();try{audio.currentTime=t}catch(e){}}             // drifted or seek failed: pull the audio to the picture
  }
  return t;
}
function frame(){if(!running)return;const t=Math.min(DUR,clock());elapsed=t;
  render(t);bar.style.width=(t/DUR*100)+'%';
  if(t>=DUR){close();return}
  raf=requestAnimationFrame(frame)}
function start(){if(running||done)return;running=true;t0=now()-elapsed*1000;
  if(soundOn){try{audio.currentTime=elapsed}catch(e){}audio.play().catch(()=>{})}
  raf=requestAnimationFrame(frame)}
function pause(){if(!running)return;elapsed=clock();running=false;cancelAnimationFrame(raf);audio.pause()}
function close(){if(done)return;done=true;running=false;cancelAnimationFrame(raf);
  try{audio.pause()}catch(e){}
  if(document.fullscreenElement===host&&document.exitFullscreen)document.exitFullscreen().catch(()=>{});
  host.classList.add('out');document.documentElement.classList.remove('f98-intro');
  removeEventListener('resize',layout);document.removeEventListener('keydown',key);document.removeEventListener('visibilitychange',vis);
  setTimeout(()=>{host.remove()},650);
  const m=document.getElementById('main');if(m){m.setAttribute('tabindex','-1');m.focus({preventScroll:true})}}
function key(e){if(e.key==='Escape')close()}
function vis(){document.hidden?pause():start()}
document.addEventListener('keydown',key);document.addEventListener('visibilitychange',vis);
root.querySelector('.skip').addEventListener('click',close);
snd.addEventListener('click',()=>{
  soundOn=!soundOn;snd.setAttribute('aria-pressed',String(soundOn));
  snd.innerHTML=soundOn?'&#128266; Sound on':'&#128264; Tap for sound';
  if(soundOn){try{audio.currentTime=clock()}catch(e){}audio.play().catch(()=>{});
    if(host.requestFullscreen&&!document.fullscreenElement)host.requestFullscreen().catch(()=>{})}
  else audio.pause()});

// start as soon as fonts + images are ready (never wait more than 1.2 s)
const imgs=[...root.querySelectorAll('img')].map(i=>i.decode?i.decode().catch(()=>{}):Promise.resolve());
const fonts=document.fonts?Promise.all(["800 100px 'Plus Jakarta Sans'","700 40px 'Plus Jakarta Sans'","500 30px 'Plus Jakarta Sans'","400 24px 'JetBrains Mono'","600 24px 'JetBrains Mono'"].map(f=>document.fonts.load(f).catch(()=>{}))):Promise.resolve();
render(0);
Promise.race([Promise.all([fonts,...imgs]),new Promise(r=>setTimeout(r,1200))]).then(()=>{
  // re-measure rows now that fonts are in (row widths drive the logo scroll)
  ROWS.forEach((_,i)=>{ROWW[i]=$('r'+(i+1)).scrollWidth});
  host.setAttribute('data-ready','');if(!document.hidden)start()});
})();
