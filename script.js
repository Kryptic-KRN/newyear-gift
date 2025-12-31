// Simple confetti and surprise click handler
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let W, H;
function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
addEventListener("resize", resize); resize();

function random(min,max){return Math.random()*(max-min)+min}
let pieces = [];
function makeConfetti(x,y){
  for(let i=0;i<40;i++){
    pieces.push({x,y,vx:random(-6,6),vy:random(-12,-4),size:random(6,12),color:`hsl(${random(300,20)},80%,70%)`,life:0,ttl:random(60,120)})
  }
}

function tick(){
  ctx.clearRect(0,0,W,H);
  for(let i=pieces.length-1;i>=0;i--){
    const p = pieces[i];
    p.x += p.vx; p.y += p.vy; p.vy += 0.45; p.life++;
    ctx.fillStyle = p.color; ctx.beginPath(); ctx.ellipse(p.x,p.y,p.size,p.size*0.6,0,0,Math.PI*2); ctx.fill();
    if(p.life>p.ttl || p.y>H+50) pieces.splice(i,1);
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// Surprise button
const btn = document.getElementById("surpriseBtn");
btn.addEventListener("click", ()=>{
  // open the tulip petals and reveal the hidden Bihari line
  const tulip = document.querySelector(".tulip-big");
  if(tulip) tulip.classList.add('open');
  const bih = document.querySelector('.bihari');
  if(bih) bih.classList.add('visible');
  makeConfetti(innerWidth/2, innerHeight/2 - 60);
  btn.textContent = "Hope you like it ❤️";
  btn.disabled = true;
});

// gentle floating of the tulip is handled with CSS animation (see styles.css)
