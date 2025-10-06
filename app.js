// ==== Global state ====
let moveTimer = null;
let posX = 10, posY = 10;
let vx = 4,  vy = 3;

// ==== DOM (script is deferred) ====
const btnStart = document.getElementById('btnStart');
const btnStop  = document.getElementById('btnStop');
const meme     = document.getElementById('meme');
const stage    = document.getElementById('stage');
const msg      = document.getElementById('msg');

// ---- FAILSAFE STYLES (so it works even if CSS doesn't) ----
stage.style.position   = 'relative';
stage.style.height     = stage.style.height || '360px';
stage.style.overflow   = 'hidden';
stage.style.border     = '2px dashed #cbd5e1';
stage.style.borderRadius = '12px';
stage.style.background = stage.style.background || '#fff';

meme.style.position = 'absolute';
meme.style.width    = meme.style.width || '260px';
meme.style.left     = posX + 'px';
meme.style.top      = posY + 'px';
meme.style.userSelect = 'none';

// ==== Helpers ====
function setStartEnabled(en){ btnStart.disabled = !en; }
function setStopEnabled(en){  btnStop.disabled  = !en; }

// ==== Movement ====
function startMoving(){
  if (moveTimer !== null) return;
  moveTimer = setInterval(()=>{
    posX += vx; posY += vy;

    const maxX = stage.clientWidth  - meme.clientWidth;
    const maxY = stage.clientHeight - meme.clientHeight;

    if (posX <= 0){ posX = 0; vx =  Math.abs(vx); }
    else if (posX >= maxX){ posX = maxX; vx = -Math.abs(vx); }

    if (posY <= 0){ posY = 0; vy =  Math.abs(vy); }
    else if (posY >= maxY){ posY = maxY; vy = -Math.abs(vy); }

    meme.style.left = posX + 'px';
    meme.style.top  = posY + 'px';
  }, 16); // ~60fps
}
function stopMoving(){
  if (moveTimer !== null){ clearInterval(moveTimer); moveTimer = null; }
}

// ==== Click handlers (wired via onClick in HTML) ====
function onStartClick(){
  setStartEnabled(false); setStopEnabled(true);
  startMoving();
  if (msg) msg.innerHTML = '<span class="ok">Moving… click Stop to halt.</span>';
}
function onStopClick(){
  stopMoving();
  setStartEnabled(true); setStopEnabled(false);
  if (msg) msg.innerHTML = '<span class="warn">Stopped. Click Start to move again.</span>';
}

// ==== Form submit (innerHTML, no alerts) ====
function onFormSubmit(){
  const raw = document.getElementById('palText').value;
  if (!raw || raw.trim().length < 2){
    msg.innerHTML = '<span class="err">Please enter at least 2 characters.</span>';
    return false;
  }
  const s = raw.toLowerCase().replace(/[^a-z0-9]/g,'');
  const r = s.split('').reverse().join('');
  msg.innerHTML = (s && s === r)
    ? `"${raw}" is a palindrome ✅`
    : `"${raw}" is not a palindrome.`;
  return false;
}

// ==== Initial UI ====
setStartEnabled(true); setStopEnabled(false);

