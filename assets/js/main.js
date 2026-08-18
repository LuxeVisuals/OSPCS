
document.addEventListener('DOMContentLoaded',()=>{
 const header=document.querySelector('.site-header');
 const toggle=document.querySelector('.nav-toggle');
 const links=document.querySelector('.nav-links');
 if(toggle) toggle.addEventListener('click',()=>links.classList.toggle('open'));
 document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
 const onScroll=()=>header&&header.classList.toggle('scrolled',scrollY>20);
 window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

 document.querySelectorAll('[data-count]').forEach(el=>{
   let done=false; const obs=new IntersectionObserver(es=>es.forEach(e=>{
     if(e.isIntersecting&&!done){done=true; let target=parseInt(el.dataset.count),n=0,step=Math.max(1,Math.ceil(target/50));
       const tick=()=>{n=Math.min(target,n+step);el.textContent=n.toLocaleString()+(el.dataset.suffix||'');if(n<target)requestAnimationFrame(tick)};tick();obs.disconnect();
     }}),{threshold:.8});obs.observe(el);
 });

 document.querySelectorAll('.faq-q').forEach(q=>q.addEventListener('click',()=>q.parentElement.classList.toggle('open')));

 const quoteForm=document.querySelector('#quoteForm');
 if(quoteForm){
   quoteForm.addEventListener('submit',e=>{
     e.preventDefault();
     const data=new FormData(quoteForm);
     const name=data.get('name')||'there';
     const email=data.get('email')||'';
     const subject=encodeURIComponent('OSPCS Quote Request');
     const body=encodeURIComponent(
       `Quote request from ${name}\\n\\nEmail: ${email}\\nPhone: ${data.get('phone')||''}\\nSite: ${data.get('site')||''}\\nPanels: ${data.get('panels')||''}\\nSchedule: ${data.get('schedule')||''}\\nWater point: ${data.get('water')||''}\\nElectrical point: ${data.get('power')||''}\\n\\nMessage:\\n${data.get('message')||''}`
     );
     // Replace the email below with the business inbox before publishing.
     window.location.href=`mailto:info@ospcs.co.za?subject=${subject}&body=${body}`;
     const notice=document.querySelector('.notice'); if(notice){notice.textContent=`Thanks ${name}. Your email draft has been prepared. Send it to complete your request.`;notice.classList.add('show')}
   });
 }
 const contactForm=document.querySelector('#contactForm');
 if(contactForm) contactForm.addEventListener('submit',e=>{
   e.preventDefault();
   const notice=document.querySelector('.notice');
   if(notice){notice.textContent='Message ready — your email app will open so you can send it directly.';notice.classList.add('show')}
   const d=new FormData(contactForm);
   window.location.href=`mailto:info@ospcs.co.za?subject=${encodeURIComponent('Website Contact')}&body=${encodeURIComponent([...d.entries()].map(x=>x[0]+': '+x[1]).join('\\n'))}`;
 });
});
