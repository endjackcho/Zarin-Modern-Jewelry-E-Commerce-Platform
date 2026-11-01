"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const fa=n=>(+n).toLocaleString("fa-IR"),pg=document.body.dataset.page;
const fd=s=>String(s).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);
const en=s=>s.replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d));
const ls={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const ic=n=>`<svg class="i" aria-hidden="true"><use href="static/img/icons.svg#${n}"/></svg>`;
const byId=id=>P.find(p=>p.id==id),img=(id,a="",x="")=>`<img src="static/img/products/${id}.webp" alt="${a}" width="640" height="640" decoding="async" ${x}>`;
const cart=()=>ls.get("zc",{}),user=()=>ls.get("zu",null);
let tt;const toast=m=>{$(".ts")?.remove();const e=document.createElement("div");e.className="ts";e.textContent=m;document.body.append(e);clearTimeout(tt);tt=setTimeout(()=>e.remove(),3200)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"});
const rv=()=>$$(".reveal:not(.in)").forEach(e=>io.observe(e));
const card=(p,i=0)=>`<a class="card reveal" style="--d:${i%4*70}ms" href="product.html?id=${p.id}"><div class="ph">${img(p.id,p.n,'loading="lazy"')}</div><div class="cb2"><h3>${p.n}</h3><span class="pr">${fa(p.p)} <small>تومان</small></span></div></a>`;
const grid=(el,list)=>{el.innerHTML=list.length?list.map(card).join(""):'<p class="em">محصولی با این فیلتر پیدا نشد.</p>';rv()};
const upd=()=>{const n=Object.values(cart()).reduce((a,b)=>a+b,0);$("#cc").textContent=n?fa(n):""};
const add=(id,q=1)=>{const c=cart();c[id]=(c[id]||0)+q;ls.set("zc",c);upd()};

/* ---------- Shell ---------- */
const links=[["index","خانه"],["products","محصولات"],["about","درباره ما"],["contact","ارتباط با ما"]];
const u0=user();
$("#hdr").innerHTML=`<i class="prog"></i><div class="wrap bar"><a class="logo" href="index.html">${ic("gem")}<b>زرین</b></a>
<button class="ib mb" id="mt" aria-label="منو">${ic("menu")}</button>
<nav id="nv">${links.map(([k,t])=>`<a href="${k}.html"${pg==k?' class="on"':""}>${t}</a>`).join("")}</nav>
<div class="acts"><button class="ib" id="st" aria-label="جستجو">${ic("search")}</button>
<a class="ib" href="${u0?"profile":"login"}.html" aria-label="حساب">${ic("user")}</a>
<a class="ib" href="cart.html" aria-label="سبد خرید">${ic("cart")}<span id="cc"></span></a>
${u0?"":'<a class="btn btn-g sm" href="signup.html">ساخت حساب</a>'}</div></div>
<div class="sr" id="sr" hidden><div class="srb"><div class="sri">${ic("search")}<input id="si" placeholder="جستجوی محصول…" autocomplete="off"><button class="ib" id="sx" aria-label="بستن">${ic("close")}</button></div><div id="sl"></div></div></div>`;
$("#ftr").innerHTML=`<div class="wrap"><div class="fg"><div><a class="logo" href="index.html">${ic("gem")}<b>زرین</b></a><p style="margin-top:.8rem">فروشگاه بدلیجات طلا و نقره‌ی مدرن؛ طراحی ظریف، قیمت منصفانه و بسته‌بندی هدیه برای همه‌ی لحظه‌های قشنگ زندگی.</p></div>
<div><h4>دسترسی سریع</h4><ul>${links.map(([k,t])=>`<li><a href="${k}.html">${t}</a></li>`).join("")}<li><a href="login.html">ورود به حساب</a></li></ul></div>
<div><h4>تماس با ما</h4><ul><li><a href="tel:02191001234">${ic("phone")}<span dir="ltr">۰۲۱-۹۱۰۰۱۲۳۴</span></a></li><li><a href="https://t.me/zarin_jewelry" rel="noopener">${ic("telegram")}@zarin_jewelry</a></li><li><a href="contact.html">${ic("pin")}تهران، خیابان ولیعصر، پلاک ۱۲۰</a></li></ul></div></div>
<p class="cp">© ۱۴۰۵ فروشگاه زرین — تمامی حقوق محفوظ است.</p></div>`;
upd();
const nv=$("#nv");$("#mt").onclick=()=>nv.classList.toggle("open");
const sr=$("#sr"),si=$("#si"),sl=$("#sl");
$("#st").onclick=()=>{sr.hidden=false;si.focus()};$("#sx").onclick=()=>sr.hidden=true;
sr.onclick=e=>{if(e.target==sr)sr.hidden=true};addEventListener("keydown",e=>{if(e.key=="Escape")sr.hidden=true});
si.oninput=()=>{const q=si.value.trim();sl.innerHTML=q?P.filter(p=>p.n.includes(q)||CATS[p.c].includes(q)).slice(0,6).map(p=>`<a href="product.html?id=${p.id}">${img(p.id,"",'loading="lazy"')}<div>${p.n}<small>${fa(p.p)} تومان</small></div></a>`).join("")||'<p class="em">چیزی پیدا نشد</p>':""};
const hv=$(".hv");if(hv){let t=0;addEventListener("scroll",()=>{t||requestAnimationFrame(()=>{hv.style.setProperty("--y",scrollY);t=0});t=1},{passive:true})}

/* ---------- Pages ---------- */
const R={
home(){grid($("#feat"),[...P].sort((a,b)=>b.s-a.s).slice(0,4))},
products(){
 const st={c:new URLSearchParams(location.search).get("c")||"all",pop:0},g=$("#pg"),mn=$("#mn"),mx=$("#mx"),ct=$("#ct");
 const chips=$("#chips");chips.innerHTML=[["all","همه"],...Object.entries(CATS)].map(([k,t])=>`<button class="ch" data-c="${k}">${t}</button>`).join("")+'<button class="ch" data-pop="1">★ محبوب‌ترین</button>';
 const run=()=>{const a=+en(mn.value)||0,b=+en(mx.value)||Infinity;
  let l=P.filter(p=>(st.c=="all"||p.c==st.c)&&p.p>=a&&p.p<=b);if(st.pop)l.sort((x,y)=>y.s-x.s);
  $$(".ch",chips).forEach(e=>e.classList.toggle("on",e.dataset.pop?!!st.pop:e.dataset.c==st.c));ct.textContent=fa(l.length)+" محصول";grid(g,l)};
 chips.onclick=e=>{const b=e.target.closest(".ch");if(!b)return;b.dataset.pop?st.pop^=1:st.c=b.dataset.c;run()};
 let t;[mn,mx].forEach(i=>i.oninput=()=>{clearTimeout(t);t=setTimeout(run,250)});run()},
product(){
 const p=byId(new URLSearchParams(location.search).get("id")),m=$("#pd");
 if(!p){m.innerHTML='<p class="em">محصول پیدا نشد. <a href="products.html" style="color:var(--g1)">بازگشت به محصولات</a></p>';return}
 document.title=p.n+" | زرین";
 const full=Math.round(p.r);
 m.innerHTML=`<div class="big reveal">${img(p.id,p.n,'fetchpriority="high"')}</div><div class="reveal" style="--d:120ms"><p class="bc"><a href="products.html">محصولات</a> / <a href="products.html?c=${p.c}">${CATS[p.c]}</a></p><h1>${p.n}</h1>
 <div class="stars">${ic("star").repeat(full)}<span>${fa(p.r)} از ۵</span></div><div class="price">${fa(p.p)} <small>تومان</small></div><p class="d">${p.d}</p>
 <div class="sp"><div><small>جنس</small>${p.m}</div><div><small>وزن</small>${p.w}</div><div><small>دسته‌بندی</small>${CATS[p.c]}</div><div><small>گارانتی</small>۶ ماه رنگ ثابت</div></div>
 <button class="btn btn-g" id="ad">${ic("cart")}افزودن به سبد خرید</button></div>`;
 $("#ad").onclick=()=>{add(p.id);toast("به سبد خرید اضافه شد ✓")};
 grid($("#rel"),P.filter(x=>x.c==p.c&&x.id!=p.id).slice(0,4));rv()},
cart(){
 const box=$("#cl"),sm=$("#sm"),draw=()=>{const c=cart(),ids=Object.keys(c);let tot=0;
  if(!ids.length){box.innerHTML='<p class="em">سبد خرید شما خالی است.<br><a class="btn btn-g" style="margin-top:1rem" href="products.html">دیدن محصولات</a></p>';sm.hidden=true;return}
  sm.hidden=false;box.innerHTML=ids.map(id=>{const p=byId(id),q=c[id];tot+=p.p*q;return`<div class="ci">${img(id,p.n,'loading="lazy"')}<div><a href="product.html?id=${id}"><b>${p.n}</b></a><div class="pr">${fa(p.p)} <small>تومان</small></div></div>
  <div style="display:flex;gap:.6rem;align-items:center"><div class="qt"><button data-a="+" data-i="${id}" aria-label="افزایش">${ic("plus")}</button><span>${fa(q)}</span><button data-a="-" data-i="${id}" aria-label="کاهش">${ic("minus")}</button></div><button class="ib rm" data-a="x" data-i="${id}" aria-label="حذف">${ic("trash")}</button></div></div>`}).join("");
  const sh=tot>=3e6?0:60000;$("#s1").textContent=fa(tot)+" تومان";$("#s2").textContent=sh?fa(sh)+" تومان":"رایگان";$("#s3").textContent=fa(tot+sh)+" تومان";window._t=tot+sh};
 box.onclick=e=>{const b=e.target.closest("[data-a]");if(!b)return;const c=cart(),i=b.dataset.i,a=b.dataset.a;
  if(a=="+")c[i]++;else if(a=="-")c[i]>1?c[i]--:delete c[i];else delete c[i];ls.set("zc",c);upd();draw()};
 $("#co").onclick=()=>{if(!user()){location.href="login.html?next=cart.html";return}
  const c=cart(),o=ls.get("zo",[]);o.unshift({id:Math.floor(1e4+Math.random()*9e4),dt:new Date().toLocaleDateString("fa-IR"),it:Object.entries(c),tot:window._t,st:"در حال پردازش"});
  ls.set("zo",o);ls.set("zc",{});upd();location.href="profile.html#orders"};draw()},
signup(){
 $("#f").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),ph=en(f.get("ph").trim()),er=$("#er");
  if(!f.get("fn").trim()||!f.get("ln").trim())return er.textContent="نام و نام خانوادگی را وارد کنید.";
  if(!/^09\d{9}$/.test(ph))return er.textContent="شماره تماس معتبر نیست (مثال: 09123456789).";
  const em=f.get("em").trim();if(em&&!/^\S+@\S+\.\S+$/.test(em))return er.textContent="ایمیل معتبر نیست.";
  ls.set("zp",{mode:"s",u:{fn:f.get("fn").trim(),ln:f.get("ln").trim(),em,ph}});sessionStorage.removeItem("zk");location.href="verify.html"}},
login(){
 $("#f").onsubmit=e=>{e.preventDefault();const ph=en(new FormData(e.target).get("ph").trim());
  if(!/^09\d{9}$/.test(ph))return $("#er").textContent="شماره تماس معتبر نیست (مثال: 09123456789).";
  ls.set("zp",{mode:"l",u:{ph},next:new URLSearchParams(location.search).get("next")});sessionStorage.removeItem("zk");location.href="verify.html"}},
verify(){
 const p=ls.get("zp",null);if(!p){location.href="login.html";return}
 $("#ph").textContent=fd(p.u.ph.replace(/(\d{4})\d{3}(\d{4})/,"$1•••$2"));
 const ins=$$("#otp input"),er=$("#er"),rs=$("#rs");let k=sessionStorage.getItem("zk"),left=0,iv;
 const send=()=>{k=String(Math.floor(1e4+Math.random()*9e4));sessionStorage.setItem("zk",k);toast("کد آزمایشی شما: "+fd(k));left=60;rs.disabled=true;clearInterval(iv);
  iv=setInterval(()=>{rs.textContent=--left>0?`ارسال مجدد تا ${fa(left)} ثانیه دیگر`:"ارسال مجدد کد";if(left<=0){clearInterval(iv);rs.disabled=false}},1e3);rs.textContent=`ارسال مجدد تا ${fa(60)} ثانیه دیگر`};
 const done=()=>{const v=en(ins.map(i=>i.value).join(""));if(v.length<5)return;
  if(v!==k){er.textContent="کد وارد شده اشتباه است.";ins.forEach(i=>i.value="");ins[0].focus();return}
  const old=user();ls.set("zu",p.mode=="s"?p.u:(old&&old.ph==p.u.ph?old:p.u));localStorage.removeItem("zp");sessionStorage.removeItem("zk");location.href=p.next||"profile.html"};
 ins.forEach((el,i)=>{el.oninput=()=>{el.value=en(el.value).replace(/\D/g,"").slice(-1);er.textContent="";if(el.value&&ins[i+1])ins[i+1].focus();done()};
  el.onkeydown=e=>{if(e.key=="Backspace"&&!el.value&&ins[i-1])ins[i-1].focus()};
  el.onpaste=e=>{const v=en(e.clipboardData.getData("text")).replace(/\D/g,"").slice(0,5);if(!v)return;e.preventDefault();[...v].forEach((c,j)=>ins[j].value=c);done()}});
 rs.onclick=send;$("#f").onsubmit=e=>{e.preventDefault();done()};k?(rs.disabled=true,rs.textContent="ارسال مجدد کد",rs.disabled=false):send();ins[0].focus()},
profile(){
 const u=user();if(!u){location.href="login.html?next=profile.html";return}
 const av=$("#av"),draw=()=>{const x=user();av.innerHTML=x.av?`<img src="${x.av}" alt="" width="110" height="110">`:(x.fn||"ک")[0];$("#un").textContent=(x.fn?x.fn+" "+x.ln:"کاربر زرین");$("#up").textContent=fd(x.ph)};draw();
 $("#fn").value=u.fn||"";$("#ln").value=u.ln||"";$("#em").value=u.em||"";$("#ph").value=u.ph;
 $("#pf").onsubmit=e=>{e.preventDefault();ls.set("zu",{...user(),fn:$("#fn").value.trim(),ln:$("#ln").value.trim(),em:$("#em").value.trim()});draw();toast("اطلاعات ذخیره شد ✓")};
 $("#up2").onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{const c=document.createElement("canvas");c.width=c.height=200;const s=Math.min(im.width,im.height);c.getContext("2d").drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,200,200);ls.set("zu",{...user(),av:c.toDataURL("image/webp",.8)});draw();URL.revokeObjectURL(im.src)};im.src=URL.createObjectURL(f)};
 const o=ls.get("zo",[]);$("#ol").innerHTML=o.length?o.map(x=>`<div class="od"><div style="display:flex;justify-content:space-between;flex-wrap:wrap"><span>سفارش <b>#${fa(x.id)}</b> — ${x.dt}</span><span>${x.st}</span></div><div class="th">${x.it.map(([id])=>img(id,"",'loading="lazy"').replace('width="640" height="640"','width="46" height="46"')).join("")}</div><p style="margin-top:.5rem">مبلغ کل: <b>${fa(x.tot)} تومان</b></p></div>`).join(""):'<p class="em">هنوز سفارشی ثبت نکرده‌اید.</p>';
 const c=Object.entries(cart());$("#cl2").innerHTML=c.length?c.map(([id,q])=>`<div class="od" style="display:flex;gap:1rem;align-items:center">${img(id,"",'loading="lazy"').replace('width="640" height="640"','width="46" height="46"')}<span style="flex:1">${byId(id).n}</span><span>${fa(q)} عدد</span></div>`).join("")+'<a class="btn btn-g" href="cart.html">تکمیل خرید</a>':'<p class="em">سبد خرید خالی است.</p>';
 $("#lo").onclick=()=>{localStorage.removeItem("zu");location.href="index.html"};
 const tabs=()=>{const h=location.hash.slice(1)||"info";$$("[data-t]").forEach(e=>e.hidden=e.dataset.t!=h);$$(".tabs a").forEach(a=>a.classList.toggle("on",a.hash=="#"+h||(h=="info"&&a.hash=="#info")))};addEventListener("hashchange",tabs);tabs()},
contact(){$("#f").onsubmit=e=>{e.preventDefault();e.target.reset();toast("پیام شما ارسال شد؛ به‌زودی پاسخ می‌دهیم ✓")}}
};
R[pg]?.();rv();
