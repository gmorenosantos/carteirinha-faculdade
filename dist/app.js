const screens=[...document.querySelectorAll('.screen')];
const show=id=>{screens.forEach(s=>s.classList.toggle('active',s.id===id));scrollTo({top:0,behavior:'instant'});};
const items=[['pagamentos','Pagamentos'],['meus-dados','Meus Dados'],['carteira-estudantil','Carteira Estudantil','card'],['posicao-financeira','Posição Financeira'],['atestado-matricula','Atestado de Matrícula'],['extrato','Extrato Conta Corrente'],['historico-escolar','Histórico Escolar'],['notas-faltas','Notas e Faltas'],['medias-exames','Médias e Exames'],['integralizacao','Integralização Curricular'],['ava','AVA'],['disciplinas-online','Disciplinas Online'],['trabalhos-academicos','Trabalhos Acadêmicos'],['▤','Atividades Complementares'],['▣','Minha Biblioteca']];
const grid=document.querySelector('#menu-grid');
items.forEach(([icon,label,target],index)=>{const b=document.createElement('button');b.className='menu-item';const artwork=index<13?`<img src="icons/${icon}.jpeg" alt="" width="40" height="40" draggable="false">`:icon;b.innerHTML=`<span class="menu-icon" aria-hidden="true">${artwork}</span><span>${label}</span>`;b.onclick=()=>target?show(target):toast('Área disponível apenas na demonstração visual');grid.append(b)});
document.querySelector('#login-form').addEventListener('submit',e=>{e.preventDefault();show('home')});
document.querySelector('#show-password').onclick=()=>{const p=document.querySelector('#password');p.type=p.type==='password'?'text':'password'};
document.querySelector('#back-home').onclick=()=>show('home');
const modal=document.querySelector('#logout-modal');document.querySelector('#logout-open').onclick=()=>{modal.hidden=false;document.querySelector('#logout-cancel').focus()};document.querySelector('#logout-cancel').onclick=()=>modal.hidden=true;document.querySelector('.backdrop').onclick=()=>modal.hidden=true;document.querySelector('#logout-confirm').onclick=()=>{modal.hidden=true;show('login')};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){modal.hidden=true;closeQrModal();closeLandscape()}});
function toast(message){const t=document.querySelector('#toast');t.textContent=message;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2200)}
function drawDemoQR(){
  // Dense illustrative pattern; contains no student or access credential.
  const c=document.querySelector('#qr');c.width=c.height=294;
  const x=c.getContext('2d'),n=49,s=6;
  x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);
  let seed=12345;const rnd=()=>((seed=(seed*9301+49297)%233280)/233280);
  for(let y=0;y<n;y++)for(let z=0;z<n;z++){
    const reserved=(z<8&&y<8)||(z>40&&y<8)||(z<8&&y>40);
    if(!reserved&&rnd()>.51){x.fillStyle='#050505';x.fillRect(z*s,y*s,s,s);}
  }
  const finder=(a,b)=>{x.fillStyle='#050505';x.fillRect(a*s,b*s,7*s,7*s);x.fillStyle='#fff';x.fillRect((a+1)*s,(b+1)*s,5*s,5*s);x.fillStyle='#050505';x.fillRect((a+2)*s,(b+2)*s,3*s,3*s);};
  finder(0,0);finder(42,0);finder(0,42);
}
drawDemoQR();const generatedAt='Gerado em '+new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(new Date());document.querySelector('#generated').textContent=generatedAt;

const qrModal=document.querySelector('#qr-modal');
const landscapeModal=document.querySelector('#landscape-modal');
const copyQr=target=>{const source=document.querySelector('#qr'),ctx=target.getContext('2d');ctx.clearRect(0,0,target.width,target.height);ctx.imageSmoothingEnabled=false;ctx.drawImage(source,0,0,target.width,target.height)};
const closeQrModal=()=>{qrModal.hidden=true;document.body.style.overflow=''};
const closeLandscape=()=>{landscapeModal.hidden=true;document.body.style.overflow=''};
document.querySelector('#qr-open').onclick=()=>{copyQr(document.querySelector('#qr-popup'));document.querySelector('.popup-generated').textContent=generatedAt;qrModal.hidden=false;document.body.style.overflow='hidden';document.querySelector('#qr-close').focus()};
document.querySelector('#qr-close').onclick=closeQrModal;
document.querySelector('[data-close="qr"]').onclick=closeQrModal;
document.querySelector('#landscape-open').onclick=()=>{const slot=document.querySelector('#landscape-card-slot');slot.replaceChildren(document.querySelector('.student-card').cloneNode(true));copyQr(document.querySelector('#qr-landscape'));landscapeModal.hidden=false;document.body.style.overflow='hidden';document.querySelector('#landscape-close').focus()};
document.querySelector('#landscape-close').onclick=closeLandscape;

function fitLandscape(){
  const viewport=window.visualViewport;
  const width=viewport?viewport.width:window.innerWidth;
  const height=viewport?viewport.height:window.innerHeight;
  const rotated=height>width;
  const longSide=rotated?height:width;
  const shortSide=rotated?width:height;
  const scale=Math.max(.1,Math.min((longSide-96)/900,(shortSide-32)/400,1.6));
  const stage=document.querySelector('.landscape-stage');
  stage.style.setProperty('--card-rotation',rotated?'90deg':'0deg');
  stage.style.setProperty('--card-scale',String(scale));
  stage.style.left=((viewport?.offsetLeft||0)+width/2)+'px';
  stage.style.top=((viewport?.offsetTop||0)+height/2)+'px';
}
const openLandscape=document.querySelector('#landscape-open').onclick;
document.querySelector('#landscape-open').onclick=()=>{openLandscape();fitLandscape();};
window.addEventListener('resize',fitLandscape);
window.visualViewport?.addEventListener('resize',fitLandscape);
window.visualViewport?.addEventListener('scroll',fitLandscape);
fitLandscape();
