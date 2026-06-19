/* Text-to-Motion Research Survey — アプリ・ロジック
   グラフ描画(initCharts) / 性能比較(showMetric, perf table) /
   論文の検索・絞り込み・並べ替え(filterPapers) / データセット描画(renderDatasets) /
   タブ切替(showTab) / 初期化(DOMContentLoaded)。データは data.js に分離。 */

// ===================== CONSTS =====================
const PALETTE = {
  Diffusion:"#4e79a7", Autoregressive:"#59a14f", LLM:"#b07aa1", "Flow Matching":"#76b7b2",
  Masked:"#edc948", Retrieval:"#e15759", Transformer:"#f28e2b", Control:"#637a9f",
  Interaction:"#6a9a7b", Dataset:"#9c755f", Survey:"#8c8c8c",
};
const YEARS = [2016,2022,2023,2024,2025,2026];
const APPROACHES = ["Diffusion","Autoregressive","LLM","Flow Matching","Masked","Retrieval","Transformer","Control","Interaction","Dataset","Survey"];
const TAB10 = ['#4e79a7','#f28e2b','#e15759','#76b7b2','#59a14f','#edc948','#b07aa1','#ff9da7','#9c755f','#637a9f'];

const GRID = '#ebe8e1';
const TICK = '#76736c';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 11.5;
Chart.defaults.color = TICK;
Chart.defaults.plugins.tooltip.backgroundColor = '#1c1b19';
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 6;
Chart.defaults.plugins.tooltip.titleFont = { weight: '600', size: 12 };
Chart.defaults.plugins.tooltip.displayColors = false;

const xAxis = (e={}) => ({ grid:{color:GRID,drawTicks:false}, border:{display:false}, ticks:{color:TICK}, ...e });
const yAxis = (e={}) => ({ grid:{color:GRID,drawTicks:false}, border:{display:false}, ticks:{color:TICK}, ...e });

// value label plugin for horizontal bars
const valLabels = {
  id:'valLabels',
  afterDatasetsDraw(chart, _a, opts) {
    if(!opts || !opts.on) return;
    const {ctx} = chart;
    const ds = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);
    ctx.save();
    ctx.font = "500 11px 'IBM Plex Mono', monospace";
    ctx.fillStyle = '#56544f';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    meta.data.forEach((bar,i)=>{
      const v = ds.data[i];
      const txt = opts.fmt ? opts.fmt(v) : String(v);
      ctx.fillText(txt, bar.x + 7, bar.y);
    });
    ctx.restore();
  }
};
Chart.register(valLabels);

let charts = {};

function initCharts() {
  const models = PAPERS.filter(p=>p.approach!=='Dataset'&&p.approach!=='Survey');

  // Timeline (stacked vertical)
  charts.timeline = new Chart(document.getElementById('chart-timeline'), {
    type:'bar',
    data:{ labels:YEARS, datasets:[
      {label:'モデル手法', data:YEARS.map(y=>models.filter(p=>p.year===y).length), backgroundColor:'#4e79a7', borderRadius:3, maxBarThickness:48},
      {label:'データセット', data:YEARS.map(y=>PAPERS.filter(p=>p.year===y&&p.approach==='Dataset').length), backgroundColor:'#9c755f', borderRadius:3, maxBarThickness:48},
      {label:'サーベイ', data:YEARS.map(y=>PAPERS.filter(p=>p.year===y&&p.approach==='Survey').length), backgroundColor:'#bab0ac', borderRadius:3, maxBarThickness:48},
    ]},
    options:{ responsive:true, maintainAspectRatio:false,
      scales:{ x:xAxis({stacked:true, grid:{display:false}}), y:yAxis({stacked:true, ticks:{color:TICK,stepSize:5}}) },
      plugins:{ legend:{position:'top', align:'end', labels:{usePointStyle:true, pointStyle:'rectRounded', boxWidth:9, padding:16}} } }
  });

  // Approach (horizontal sorted with labels)
  const ac={}; PAPERS.forEach(p=>{ac[p.approach]=(ac[p.approach]||0)+1;});
  const aSort=APPROACHES.filter(a=>ac[a]).sort((x,y)=>ac[y]-ac[x]);
  charts.approach = new Chart(document.getElementById('chart-approach'), {
    type:'bar',
    data:{ labels:aSort, datasets:[{ data:aSort.map(a=>ac[a]), backgroundColor:aSort.map(a=>PALETTE[a]), borderRadius:3, maxBarThickness:20 }]},
    options:{ indexAxis:'y', responsive:true, maintainAspectRatio:false, layout:{padding:{right:24}},
      scales:{ x:xAxis({ticks:{display:false}, grid:{display:false}, border:{display:false}}), y:yAxis({grid:{display:false}, ticks:{color:'#45433f',font:{size:11}}}) },
      plugins:{ legend:{display:false}, valLabels:{on:true} } }
  });

  // Venue (horizontal sorted with labels)
  const vc={}; PAPERS.forEach(p=>{const v=p.venue.split(' ')[0]; vc[v]=(vc[v]||0)+1;});
  const vSort=Object.entries(vc).sort((a,b)=>b[1]-a[1]).slice(0,10);
  charts.venue = new Chart(document.getElementById('chart-venue'), {
    type:'bar',
    data:{ labels:vSort.map(v=>v[0]), datasets:[{ data:vSort.map(v=>v[1]), backgroundColor:vSort.map((_,i)=>TAB10[i%TAB10.length]), borderRadius:3, maxBarThickness:18 }]},
    options:{ indexAxis:'y', responsive:true, maintainAspectRatio:false, layout:{padding:{right:24}},
      scales:{ x:xAxis({ticks:{display:false}, grid:{display:false}}), y:yAxis({grid:{display:false}, ticks:{color:'#45433f'}}) },
      plugins:{ legend:{display:false}, valLabels:{on:true} } }
  });

  // Stacked trend
  charts.stacked = new Chart(document.getElementById('chart-stacked'), {
    type:'bar',
    data:{ labels:YEARS, datasets:APPROACHES.map(a=>({ label:a, data:YEARS.map(y=>PAPERS.filter(p=>p.year===y&&p.approach===a).length), backgroundColor:PALETTE[a], borderRadius:2, maxBarThickness:66 }))},
    options:{ responsive:true, maintainAspectRatio:false,
      scales:{ x:xAxis({stacked:true, grid:{display:false}}), y:yAxis({stacked:true, ticks:{color:TICK,stepSize:5}}) },
      plugins:{ legend:{position:'bottom', labels:{usePointStyle:true, pointStyle:'rectRounded', boxWidth:9, padding:11, font:{size:10.5}}} } }
  });

  // Dataset seqs / text (horizontal log)
  const dsBar = (id, key, fmt) => new Chart(document.getElementById(id), {
    type:'bar',
    data:{ labels:DATASETS.map(d=>d.name), datasets:[{ data:DATASETS.map(d=>d[key]), backgroundColor:DATASETS.map(d=>d.color), borderRadius:3, maxBarThickness:18 }]},
    options:{ indexAxis:'y', responsive:true, maintainAspectRatio:false,
      scales:{ x:xAxis({type:'logarithmic', ticks:{color:TICK, callback:v=>{const s=v.toString(); return /^[1-9]0*$/.test(s)?(v>=1000?v/1000+'k':v):''; }}}), y:yAxis({grid:{display:false}, ticks:{color:'#45433f', font:{size:10}}}) },
      plugins:{ legend:{display:false}, tooltip:{callbacks:{label:c=>fmt(c.parsed.x)}} } }
  });
  charts.dsSeqs = dsBar('chart-ds-seqs','seqs', v=>v.toLocaleString()+' シーケンス');
  charts.dsText = dsBar('chart-ds-text','texts', v=>v.toLocaleString()+' テキスト');

  // Dataset timeline
  charts.dsTimeline = new Chart(document.getElementById('chart-ds-timeline'), {
    type:'line',
    data:{ labels:['2016','2019','2021','2022','2023','2024','2025'], datasets:[
      {label:'シーケンス数', data:[3911,11265,13220,14616,81100,1200000,1000000], borderColor:'#4e79a7', backgroundColor:'rgba(78,121,167,0.08)', fill:true, tension:0.35, pointRadius:4, pointBackgroundColor:'#4e79a7', borderWidth:2},
      {label:'テキスト数', data:[6278,null,91000,44970,81100,1200000,1000000], borderColor:'#e15759', backgroundColor:'rgba(225,87,89,0.05)', fill:true, tension:0.35, pointRadius:4, pointBackgroundColor:'#e15759', borderWidth:2, spanGaps:true},
    ]},
    options:{ responsive:true, maintainAspectRatio:false,
      scales:{ x:xAxis({grid:{display:false}}), y:yAxis({type:'logarithmic', ticks:{color:TICK, callback:v=>{const s=v.toString(); return /^[1-9]0*$/.test(s)?(v>=1000?v/1000+'k':v):''; }}}) },
      plugins:{ legend:{position:'top', align:'end', labels:{usePointStyle:true, pointStyle:'rectRounded', boxWidth:9, padding:14}} } }
  });
}

// ===================== PERFORMANCE =====================
let activeMetric='fid', metricChart=null;
const METRICS = {
  fid:{key:'fid',label:'FID',color:'#4e79a7',lower:true, fmt:v=>v.toFixed(3), cap:'生成モーションの分布と実データの距離。低いほどリアル（昇順）'},
  rp3:{key:'rp3',label:'R-Precision Top-3',color:'#59a14f',lower:false, fmt:v=>v.toFixed(3), cap:'テキストから正しいモーションを上位3件で検索できる精度。高いほど良い（降順）'},
  mmdist:{key:'mmdist',label:'MM-Dist',color:'#b07aa1',lower:true, fmt:v=>v.toFixed(3), cap:'テキスト特徴とモーション特徴の距離。低いほど整合（昇順）'},
  div:{key:'div',label:'Diversity',color:'#f28e2b',lower:null, fmt:v=>v.toFixed(3), cap:'生成の多様性。Ground Truth (9.50) に近いほど良い'},
};

function showMetric(metric, el) {
  activeMetric=metric;
  document.querySelectorAll('#metric-seg button').forEach(b=>b.classList.remove('active'));
  (el || document.querySelector(`#metric-seg button[data-metric="${metric}"]`))?.classList.add('active');
  const cfg=METRICS[metric];
  document.getElementById('metric-caption').textContent=cfg.cap;
  if(metricChart) metricChart.destroy();

  let rows=PERF_DATA.filter(d=>!d.isReal).slice();
  if(cfg.lower===true) rows.sort((a,b)=>a[cfg.key]-b[cfg.key]);
  else if(cfg.lower===false) rows.sort((a,b)=>b[cfg.key]-a[cfg.key]);
  else rows.sort((a,b)=>Math.abs(a[cfg.key]-9.503)-Math.abs(b[cfg.key]-9.503));
  const best=rows[0][cfg.key];
  const gt=PERF_DATA.find(d=>d.isReal);

  metricChart=new Chart(document.getElementById('chart-metric'), {
    type:'bar',
    data:{ labels:rows.map(d=>`${d.model}  ’${String(d.year).slice(2)}`), datasets:[{
      data:rows.map(d=>d[cfg.key]),
      backgroundColor:rows.map(d=>d[cfg.key]===best?'#2f7336':cfg.color),
      borderRadius:3, maxBarThickness:22 }]},
    options:{ indexAxis:'y', responsive:true, maintainAspectRatio:false, layout:{padding:{right:46}},
      scales:{
        x:xAxis({ beginAtZero: metric!=='div', grid:{color:GRID} }),
        y:yAxis({ grid:{display:false}, ticks:{color:'#45433f', font:{family:"'Inter'", size:11}} })
      },
      plugins:{ legend:{display:false},
        valLabels:{on:true, fmt:cfg.fmt},
        tooltip:{callbacks:{title:i=>rows[i[0].dataIndex].model, label:c=>cfg.label+': '+cfg.fmt(c.parsed.x)}},
        annotation:false } }
  });
}

let perfSortKey='fid', perfSortDir=1;
function sortPerf(key){
  if(perfSortKey===key) perfSortDir*=-1;
  else { perfSortKey=key; perfSortDir = (key==='rp1'||key==='rp2'||key==='rp3'||key==='mmmod') ? -1 : 1; }
  renderPerfTable();
}
function renderPerfTable() {
  const body=document.getElementById('perf-tbody');
  const real=PERF_DATA.filter(d=>d.isReal);
  let rows=PERF_DATA.filter(d=>!d.isReal).slice();
  const fids=rows.map(d=>d.fid).sort((a,b)=>a-b);
  const rp3s=rows.map(d=>d.rp3).sort((a,b)=>b-a);
  rows.sort((a,b)=>{
    let av=a[perfSortKey], bv=b[perfSortKey];
    if(perfSortKey==='model') return perfSortDir*av.localeCompare(bv);
    return perfSortDir*(av-bv);
  });
  const fmt=v=>typeof v==='number'?v.toFixed(3):v;
  const line=d=>{
    if(d.isReal) return `<tr class="real-row"><td>${d.model}</td><td>—</td><td>${fmt(d.fid)}</td><td>${fmt(d.rp1)}</td><td>${fmt(d.rp2)}</td><td>${fmt(d.rp3)}</td><td>${fmt(d.mmdist)}</td><td>${fmt(d.div)}</td><td>—</td></tr>`;
    const fC=d.fid===fids[0]?'best':d.fid===fids[1]?'second':'';
    const rC=d.rp3===rp3s[0]?'best':d.rp3===rp3s[1]?'second':'';
    return `<tr><td>${d.model}</td><td>${d.year}</td><td class="${fC}">${fmt(d.fid)}</td><td>${fmt(d.rp1)}</td><td>${fmt(d.rp2)}</td><td class="${rC}">${fmt(d.rp3)}</td><td>${fmt(d.mmdist)}</td><td>${fmt(d.div)}</td><td>${d.mmmod==null?'—':fmt(d.mmmod)}</td></tr>`;
  };
  body.innerHTML=real.map(line).join('')+rows.map(line).join('');
}

function initPerfTrends() {
  const m=PERF_DATA.filter(d=>!d.isReal).sort((a,b)=>a.year-b.year || b.fid-a.fid);
  const labels=m.map(d=>d.model);
  charts.fidTrend=new Chart(document.getElementById('chart-fid-trend'), {
    type:'line',
    data:{ labels, datasets:[
      {label:'FID', data:m.map(d=>d.fid), borderColor:'#4e79a7', backgroundColor:'rgba(78,121,167,0.08)', fill:true, tension:0.25, pointRadius:3, pointBackgroundColor:'#4e79a7', borderWidth:2},
      {label:'Ground Truth', data:m.map(()=>0.002), borderColor:'#9c9a94', borderDash:[4,4], fill:false, pointRadius:0, borderWidth:1.5},
    ]},
    options:{ responsive:true, maintainAspectRatio:false,
      scales:{ x:xAxis({grid:{display:false}, ticks:{color:TICK,maxRotation:60,minRotation:45,font:{size:9}}}), y:yAxis() },
      plugins:{ legend:{position:'top', align:'end', labels:{usePointStyle:true, pointStyle:'rectRounded', boxWidth:9, padding:12}} } }
  });
  charts.rpTrend=new Chart(document.getElementById('chart-rp-trend'), {
    type:'line',
    data:{ labels, datasets:[
      {label:'R-Precision Top-3', data:m.map(d=>d.rp3), borderColor:'#59a14f', backgroundColor:'rgba(89,161,79,0.08)', fill:true, tension:0.25, pointRadius:3, pointBackgroundColor:'#59a14f', borderWidth:2},
      {label:'Ground Truth', data:m.map(()=>0.797), borderColor:'#9c9a94', borderDash:[4,4], fill:false, pointRadius:0, borderWidth:1.5},
    ]},
    options:{ responsive:true, maintainAspectRatio:false,
      scales:{ x:xAxis({grid:{display:false}, ticks:{color:TICK,maxRotation:60,minRotation:45,font:{size:9}}}), y:yAxis({min:0.55,max:0.85}) },
      plugins:{ legend:{position:'top', align:'end', labels:{usePointStyle:true, pointStyle:'rectRounded', boxWidth:9, padding:12}} } }
  });
}

// ===================== PAPERS =====================
let sortKey='year', sortDir=-1, filtered=[...PAPERS];

function renderPapers() {
  const tbody=document.getElementById('paper-tbody');
  document.getElementById('paper-count').innerHTML=`<b>${filtered.length}</b> / ${PAPERS.length} 件を表示`;
  if(!filtered.length){ tbody.innerHTML=`<tr><td colspan="6" style="text-align:center;padding:44px;color:var(--muted);">該当する論文がありません</td></tr>`; return; }
  tbody.innerHTML=filtered.map(p=>{
    const ap='ap-'+p.approach.replace(/\s/g,'');
    return `<tr>
      <td><span class="badge badge-year">${p.year}</span></td>
      <td>
        <div class="paper-title">${p.arxiv?`<a href="${p.arxiv}" target="_blank" rel="noopener noreferrer">${p.title}</a>`:p.title}</div>
        <div class="paper-meta">
          <span class="model-chip">${p.model}</span>
          ${p.arxiv?`<a href="${p.arxiv}" target="_blank" rel="noopener noreferrer" class="link-chip">arXiv</a>`:''}
          ${p.project?`<a href="${p.project}" target="_blank" rel="noopener noreferrer" class="link-chip">Project</a>`:''}
        </div>
      </td>
      <td><span class="badge badge-venue">${p.venue}</span></td>
      <td><span class="ap ${ap}">${p.approach}</span></td>
      <td>${p.datasets.map(d=>`<span class="badge badge-ds">${d}</span>`).join(' ')||'<span style="color:var(--muted);">—</span>'}</td>
      <td class="contrib">${p.contrib}</td>
    </tr>`;
  }).join('');
}
function filterPapers() {
  const q=document.getElementById('search-input').value.toLowerCase();
  const yr=document.getElementById('filter-year').value;
  const app=document.getElementById('filter-approach').value;
  const venue=document.getElementById('filter-venue').value;
  filtered=PAPERS.filter(p=>{
    if(q && !p.title.toLowerCase().includes(q) && !p.model.toLowerCase().includes(q) && !p.contrib.toLowerCase().includes(q)) return false;
    if(yr && String(p.year)!==yr) return false;
    if(app && p.approach!==app) return false;
    if(venue && !p.venue.includes(venue)) return false;
    return true;
  }).sort((a,b)=>sortDir*(a[sortKey]<b[sortKey]?-1:a[sortKey]>b[sortKey]?1:0));
  renderPapers();
}
function sortTable(key){ if(sortKey===key) sortDir*=-1; else {sortKey=key; sortDir=-1;} filterPapers(); }

// ===================== DATASETS =====================
function renderDatasets() {
  document.getElementById('dataset-cards').innerHTML=DATASETS.map(d=>`
    <div class="ds-card">
      <div class="ds-head" style="--c:${d.color};">
        <h4>${d.name}</h4>
        <div class="ds-year">${d.year} ・ ${d.venue}</div>
      </div>
      <div class="ds-body">
        <div class="ds-stat"><span class="key">シーケンス数</span><span class="val mono">${d.seqs.toLocaleString()}</span></div>
        <div class="ds-stat"><span class="key">収録時間</span><span class="val mono">${d.duration}</span></div>
        <div class="ds-stat"><span class="key">フレーム数</span><span class="val mono">${d.frames}</span></div>
        <div class="ds-stat"><span class="key">FPS</span><span class="val mono">${d.fps}</span></div>
        <div class="ds-stat"><span class="key">テキスト数</span><span class="val mono">${d.texts.toLocaleString()}</span></div>
        <div class="ds-stat"><span class="key">平均テキスト長</span><span class="val">${d.avgLen}</span></div>
        <div class="ds-stat"><span class="key">身体範囲</span><span class="val">${d.body}</span></div>
        <div class="ds-stat"><span class="key">アノテーション</span><span class="val">${d.annotation}</span></div>
        <div class="ds-stat"><span class="key">アクセス</span><span class="val">${d.access}</span></div>
        <hr class="ds-divider">
        <div class="ds-stat"><span class="key">表現形式</span><span class="val ds-repr">${d.repr}</span></div>
        <hr class="ds-divider">
        <div class="ds-feature">${d.feature}</div>
      </div>
    </div>`).join('');
}

// ===================== TABS =====================
function showTab(name, el) {
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  if(el) el.classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('stat-papers').textContent=PAPERS.length;
  document.getElementById('stat-datasets').textContent=DATASETS.length;
  document.getElementById('stat-models').textContent=PERF_DATA.filter(d=>!d.isReal).length;
  document.getElementById('papers-total').textContent=PAPERS.length+' papers';
  document.getElementById('ds-total').textContent=DATASETS.length+' datasets';
  initCharts();
  filterPapers();
  renderDatasets();
  renderPerfTable();
  showMetric('fid');
  initPerfTrends();
});
