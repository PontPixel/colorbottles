// ColorBottles rules + breadth-first solver. Loaded by the game (rules) and by index.html?solve (par check).
window.CB=(function(){
const KEYS=['W','C','M','Y','K'], EPS=1e-6, MATCH=95;
const vol=b=>KEYS.reduce((s,k)=>s+(b[k]||0),0);
const clone=b=>Object.fromEntries(KEYS.filter(k=>b[k]>EPS).map(k=>[k,b[k]]));
const parts=b=>KEYS.filter(k=>(b[k]||0)>EPS);
const color=b=>vol(b)>EPS?CF.mix(b):null;
// Pour as much of a as fits into b; a is one mixed color, so what moves keeps a's ratio.
function pour(a,b,cap){
  const va=vol(a),amt=Math.min(va,cap-vol(b)); if(amt<EPS||va<EPS) return null;
  const na={},nb=clone(b),f=amt/va;
  for(const k of parts(a)){const m=a[k]*f; nb[k]=(nb[k]||0)+m; if(a[k]-m>EPS) na[k]=a[k]-m;}
  return {a:na,b:nb,amt};
}
const isFull=(b,cap)=>vol(b)>cap-EPS;
const matchOf=(b,recipe)=>vol(b)>EPS?CF.matchPct(CF.mix(b),CF.mix(recipe)):0;
const fits=(b,recipe,cap)=>isFull(b,cap)&&matchOf(b,recipe)>=MATCH;

// Moves: ['pour',i,j] ['drain',i] ['extract',i,k] ['deliver',i,t]. level.extract = Extracts available. Returns the fewest moves, deliveries excluded.
function solve(level,cap,maxStates){
  maxStates=maxStates||400000;
  const T=level.targets.length, key=s=>s.b.map(b=>KEYS.map(k=>(b[k]||0).toFixed(3)).join(',')).sort().join('|')+'#'+s.done+'#'+s.ex;
  const start={b:level.bottles.map(clone),done:0,ex:level.extract||0,path:[]};
  // Prune states that can't finish: not enough usable paint of some kind left for the open targets.
  // Without Extract, a bottle holding a paint no open target uses is waste (only Drain can clear it).
  const need=level.targets.map(tg=>{const v=vol(tg.recipe);return Object.fromEntries(KEYS.map(k=>[k,(tg.recipe[k]||0)/v*cap]));});
  const sets=level.targets.map(tg=>parts(tg.recipe));
  function dead(s){
    const open=level.targets.map((x,ti)=>ti).filter(ti=>!(s.done>>ti&1)); if(!open.length) return false;
    const have={}; let total=0;
    for(const b of s.b){const ps=parts(b); if(!ps.length) continue;
      if(!s.ex&&!open.some(ti=>ps.every(k=>sets[ti].includes(k)))) continue;
      for(const k of ps){have[k]=(have[k]||0)+b[k];} total+=vol(b);}
    if(total<open.length*cap-EPS) return true;
    return KEYS.some(k=>(have[k]||0)<open.reduce((a,ti)=>a+need[ti][k],0)*0.8-EPS);
  }
  if(dead(start)) return {moves:-1,states:0};
  const seen=new Set([key(start)]); let q=[start],n=0;
  while(q.length){
    const nq=[];
    for(const s of q){
      if(s.done===(1<<T)-1){const moves=s.path.filter(m=>m[0]!=='deliver').length; return {moves,path:s.path,states:n};}
      const next=[];
      s.b.forEach((b,i)=>{
        if(vol(b)<EPS) return;
        level.targets.forEach((t,ti)=>{ if(!(s.done>>ti&1)&&fits(b,t.recipe,cap)){const nb=s.b.slice();nb[i]={};next.push({b:nb,done:s.done|1<<ti,ex:s.ex,path:s.path.concat([['deliver',i,ti]])});}});
        s.b.forEach((c,j)=>{ if(i===j||vol(c)<EPS) return; /* pouring into an empty bottle only moves it */ const r=pour(b,c,cap); if(!r) return;
          const nb=s.b.slice();nb[i]=r.a;nb[j]=r.b;next.push({b:nb,done:s.done,ex:s.ex,path:s.path.concat([['pour',i,j]])});});
        {const nb=s.b.slice();nb[i]={};next.push({b:nb,done:s.done,ex:s.ex,path:s.path.concat([['drain',i]])});}
        const e=s.b.findIndex(c=>vol(c)<EPS);
        // Extract: the paint goes into an empty bottle, or is poured away when there is none.
        if(s.ex>0&&parts(b).length>1) for(const k of parts(b)){const nb=s.b.slice(),a=clone(b);delete a[k];nb[i]=a;if(e>=0)nb[e]={[k]:b[k]};next.push({b:nb,done:s.done,ex:s.ex-1,path:s.path.concat([['extract',i,k]])});}
      });
      for(const x of next){if(dead(x)) continue; const k=key(x); if(seen.has(k)) continue; seen.add(k); n++; nq.push(x); if(n>maxStates) return {moves:-1,states:n,capped:true};}
    }
    q=nq;
  }
  return {moves:-1,states:n};
}
// Can the level still be finished? true / false, or null when the search budget ran out (treat as "maybe").
// Cheap in the common dead end: wasted paint is caught by the up-front check before any search.
function canFinish(level,cap,budget){
  const r=solve(level,cap,budget||40000);
  return r.moves>=0?true:r.capped?null:false;
}
return {KEYS,EPS,MATCH,vol,clone,parts,color,pour,isFull,matchOf,fits,solve,canFinish};
})();
