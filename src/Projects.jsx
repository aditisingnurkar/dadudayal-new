import { useState } from "react";
import Sidebar, { BottomNav } from "./Sidebar";

const B = {
  darkBrown:"#4A2010", copper:"#C87941", gold:"#E8A050", orange:"#C85A1A",
  navy:"#1A2035", navyHover:"#2D3754", white:"#FFFFFF", pageBg:"#F4F6F9",
  border:"#E2E8F0", textMain:"#1A202C", textSub:"#718096", textLight:"#A0AEC0",
  green:"#2E7D32", greenBg:"#E8F5E9", greenMid:"#4CAF50",
  blue:"#1565C0", blueBg:"#E3F2FD", red:"#C62828", redBg:"#FFEBEE",
  amber:"#E65100", amberBg:"#FFF3E0", amberMid:"#FF9800",
};

const STATUS = {
  "In Progress": { color:B.blue,  bg:B.blueBg,  dot:"#2196F3" },
  "Completed":   { color:B.green, bg:B.greenBg, dot:B.greenMid },
  "Pending":     { color:B.amber, bg:B.amberBg, dot:B.amberMid },
};

const INITIAL_PROJECTS = [
  { id:1, client:"Mr. Sharma",    title:"Mr. Sharma Home",  location:"Sector 12, Delhi",       type:"Residential", budget:"₹4,50,000",  spent:"₹2,10,000",  progress:65,  status:"In Progress", startDate:"2024-01-15", endDate:"2024-06-30", manager:"Suresh Sharma",  notes:"Living room + 2 bedrooms renovation" },
  { id:2, client:"Hotel Sunview", title:"Hotel Interior",   location:"MG Road, Bangalore",     type:"Commercial",  budget:"₹18,00,000", spent:"₹18,00,000", progress:100, status:"Completed",   startDate:"2023-09-01", endDate:"2024-02-28", manager:"Vijay Singh",    notes:"Full hotel lobby and 30 rooms" },
  { id:3, client:"Mr. Verma",     title:"Office Project",   location:"Connaught Place, Delhi", type:"Commercial",  budget:"₹8,00,000",  spent:"₹0",         progress:0,   status:"Pending",     startDate:"2024-04-01", endDate:"2024-09-30", manager:"Ankit Patel",    notes:"Open office layout redesign" },
  { id:4, client:"Mrs. Gupta",    title:"Gupta Residence",  location:"Powai, Mumbai",          type:"Residential", budget:"₹6,20,000",  spent:"₹5,40,000",  progress:89,  status:"In Progress", startDate:"2024-02-10", endDate:"2024-07-15", manager:"Meena Joshi",    notes:"Full home interior + kitchen" },
  { id:5, client:"Sunrise Mall",  title:"Mall Food Court",  location:"Noida Sector 18",        type:"Commercial",  budget:"₹22,00,000", spent:"₹9,50,000",  progress:40,  status:"In Progress", startDate:"2024-03-01", endDate:"2024-11-30", manager:"Suresh Sharma",  notes:"Food court renovation and seating" },
  { id:6, client:"Mr. Mishra",    title:"Mishra Bungalow",  location:"Civil Lines, Jaipur",    type:"Residential", budget:"₹12,00,000", spent:"₹12,00,000", progress:100, status:"Completed",   startDate:"2023-06-01", endDate:"2023-12-31", manager:"Vijay Singh",    notes:"Bungalow full renovation" },
];

function Avatar({ initials, size=36 }) {
  const colors = ["#C87941","#1565C0","#2E7D32","#C62828","#00695C","#7B1FA2"];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:colors[initials.charCodeAt(0)%colors.length], color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.35, fontWeight:"700", flexShrink:0, fontFamily:"inherit" }}>
      {initials}
    </div>
  );
}

function StatusPill({ status }) {
  const s = STATUS[status] || STATUS["Pending"];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", padding:"4px 10px", borderRadius:"99px", background:s.bg, color:s.color, fontSize:"11px", fontWeight:"700", whiteSpace:"nowrap" }}>
      <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:s.dot, display:"inline-block" }}/>
      {status}
    </span>
  );
}

function ProgressBar({ value }) {
  const color = value>=100?B.greenMid:value>=60?B.copper:value>0?"#2196F3":B.border;
  return (
    <div style={{ background:B.border, borderRadius:"99px", height:"6px", width:"100%", overflow:"hidden" }}>
      <div style={{ width:`${Math.min(value,100)}%`, height:"100%", background:color, borderRadius:"99px", transition:"width .4s" }}/>
    </div>
  );
}

function AddProjectModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ client:"", title:"", location:"", type:"Residential", budget:"", startDate:"", endDate:"", manager:"", notes:"", status:"Pending" });
  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.client || !form.title || !form.location) return;
    onAdd({ ...form, id:Date.now(), progress:0, spent:"₹0" });
    onClose();
  }
  const inp = (extra={}) => ({ width:"100%", padding:"10px 12px", border:`1.5px solid ${B.border}`, borderRadius:"8px", fontSize:"13px", fontFamily:"inherit", background:B.white, color:B.textMain, outline:"none", boxSizing:"border-box", ...extra });
  const lbl = { fontSize:"11px", fontWeight:"700", color:B.textSub, letterSpacing:".05em", textTransform:"uppercase", display:"block", marginBottom:"5px" };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>
      <div style={{ background:B.white, borderRadius:"18px", width:"100%", maxWidth:"520px", maxHeight:"90vh", overflow:"auto", boxShadow:"0 8px 40px rgba(0,0,0,.2)" }}>
        <div style={{ padding:"20px 24px 16px", borderBottom:`1px solid ${B.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, background:B.white }}>
          <div>
            <div style={{ fontSize:"17px", fontWeight:"700", color:B.textMain }}>Add New Project</div>
            <div style={{ fontSize:"12px", color:B.textSub, marginTop:"2px" }}>Fill in the project details below</div>
          </div>
          <button onClick={onClose} style={{ background:B.pageBg, border:`1px solid ${B.border}`, borderRadius:"8px", width:"32px", height:"32px", cursor:"pointer", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding:"20px 24px 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
            <div style={{ gridColumn:"1/-1" }}><label style={lbl}>Project Title *</label><input style={inp()} placeholder="e.g. Sharma Home Renovation" value={form.title} onChange={e=>set("title",e.target.value)} required/></div>
            <div><label style={lbl}>Client Name *</label><input style={inp()} placeholder="Mr. / Mrs. ..." value={form.client} onChange={e=>set("client",e.target.value)} required/></div>
            <div><label style={lbl}>Project Type</label><select style={inp()} value={form.type} onChange={e=>set("type",e.target.value)}><option>Residential</option><option>Commercial</option></select></div>
            <div style={{ gridColumn:"1/-1" }}><label style={lbl}>Location *</label><input style={inp()} placeholder="Area, City" value={form.location} onChange={e=>set("location",e.target.value)} required/></div>
            <div><label style={lbl}>Total Budget</label><input style={inp()} placeholder="₹0" value={form.budget} onChange={e=>set("budget",e.target.value)}/></div>
            <div><label style={lbl}>Project Manager</label><input style={inp()} placeholder="Staff name" value={form.manager} onChange={e=>set("manager",e.target.value)}/></div>
            <div><label style={lbl}>Start Date</label><input type="date" style={inp()} value={form.startDate} onChange={e=>set("startDate",e.target.value)}/></div>
            <div><label style={lbl}>End Date</label><input type="date" style={inp()} value={form.endDate} onChange={e=>set("endDate",e.target.value)}/></div>
            <div><label style={lbl}>Status</label><select style={inp()} value={form.status} onChange={e=>set("status",e.target.value)}><option>Pending</option><option>In Progress</option><option>Completed</option></select></div>
            <div style={{ gridColumn:"1/-1" }}><label style={lbl}>Notes</label><textarea style={{ ...inp(), height:"72px", resize:"vertical" }} placeholder="Any additional details..." value={form.notes} onChange={e=>set("notes",e.target.value)}/></div>
          </div>
          <div style={{ display:"flex", gap:"10px", marginTop:"20px" }}>
            <button type="button" onClick={onClose} style={{ flex:1, padding:"12px", border:`1.5px solid ${B.border}`, borderRadius:"10px", background:B.white, color:B.textMain, fontFamily:"inherit", fontSize:"14px", fontWeight:"600", cursor:"pointer" }}>Cancel</button>
            <button type="submit" style={{ flex:2, padding:"12px", border:"none", borderRadius:"10px", background:B.copper, color:"#fff", fontFamily:"inherit", fontSize:"14px", fontWeight:"700", cursor:"pointer" }}>+ Add Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onClose }) {
  const spent  = parseFloat((project.spent||"0").replace(/[^0-9.]/g,""))||0;
  const budget = parseFloat((project.budget||"0").replace(/[^0-9.]/g,""))||1;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>
      <div style={{ background:B.white, borderRadius:"18px", width:"100%", maxWidth:"520px", maxHeight:"90vh", overflow:"auto", boxShadow:"0 8px 40px rgba(0,0,0,.2)" }}>
        <div style={{ background:B.navy, borderRadius:"18px 18px 0 0", padding:"20px 24px" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div>
              <div style={{ color:B.copper, fontSize:"11px", fontWeight:"700", letterSpacing:".08em", marginBottom:"4px" }}>{project.type?.toUpperCase()}</div>
              <div style={{ color:B.white, fontSize:"18px", fontWeight:"700" }}>{project.title}</div>
              <div style={{ color:"#94A3B8", fontSize:"13px", marginTop:"3px" }}>📍 {project.location}</div>
            </div>
            <button onClick={onClose} style={{ background:"rgba(255,255,255,.1)", border:"none", borderRadius:"8px", width:"32px", height:"32px", cursor:"pointer", fontSize:"16px", color:B.white, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
          <div style={{ marginTop:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
              <span style={{ color:"#94A3B8", fontSize:"12px" }}>Progress</span>
              <span style={{ color:B.white, fontSize:"12px", fontWeight:"700" }}>{project.progress}%</span>
            </div>
            <div style={{ background:"rgba(255,255,255,.15)", borderRadius:"99px", height:"8px", overflow:"hidden" }}>
              <div style={{ width:`${project.progress}%`, height:"100%", background:B.copper, borderRadius:"99px" }}/>
            </div>
          </div>
        </div>
        <div style={{ padding:"20px 24px 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"20px" }}>
            {[["Client",project.client],["Budget",project.budget],["Spent",project.spent],["Start",project.startDate||"—"],["End",project.endDate||"—"],["Manager",project.manager||"—"]].map(([label,val]) => (
              <div key={label} style={{ background:B.pageBg, borderRadius:"10px", padding:"12px 14px" }}>
                <div style={{ fontSize:"10px", color:B.textSub, fontWeight:"700", textTransform:"uppercase", letterSpacing:".05em", marginBottom:"5px" }}>{label}</div>
                <div style={{ fontSize:"14px", fontWeight:"600", color:B.textMain }}>{val}</div>
              </div>
            ))}
            <div style={{ background:B.pageBg, borderRadius:"10px", padding:"12px 14px" }}>
              <div style={{ fontSize:"10px", color:B.textSub, fontWeight:"700", textTransform:"uppercase", letterSpacing:".05em", marginBottom:"5px" }}>Status</div>
              <StatusPill status={project.status}/>
            </div>
            <div style={{ background:B.pageBg, borderRadius:"10px", padding:"12px 14px" }}>
              <div style={{ fontSize:"10px", color:B.textSub, fontWeight:"700", textTransform:"uppercase", letterSpacing:".05em", marginBottom:"5px" }}>Budget Used</div>
              <div style={{ fontSize:"14px", fontWeight:"600", color:spent/budget>0.9?B.red:B.green }}>{budget>0?Math.round((spent/budget)*100):0}%</div>
            </div>
          </div>
          {project.notes && (
            <div style={{ background:B.pageBg, borderRadius:"10px", padding:"14px", marginBottom:"20px" }}>
              <div style={{ fontSize:"11px", color:B.textSub, fontWeight:"700", textTransform:"uppercase", letterSpacing:".05em", marginBottom:"6px" }}>Notes</div>
              <div style={{ fontSize:"13px", color:B.textMain, lineHeight:"1.6" }}>{project.notes}</div>
            </div>
          )}
          <div style={{ display:"flex", gap:"10px" }}>
            <button onClick={onClose} style={{ flex:1, padding:"12px", border:`1.5px solid ${B.border}`, borderRadius:"10px", background:B.white, color:B.textMain, fontFamily:"inherit", fontSize:"14px", fontWeight:"600", cursor:"pointer" }}>Close</button>
            <button style={{ flex:2, padding:"12px", border:"none", borderRadius:"10px", background:B.copper, color:"#fff", fontFamily:"inherit", fontSize:"14px", fontWeight:"700", cursor:"pointer" }}>Edit Project</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects]       = useState(INITIAL_PROJECTS);
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAdd, setShowAdd]         = useState(false);
  const [detail, setDetail]           = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = projects.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.title.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    const matchStatus = filterStatus==="All" || p.status===filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    All: projects.length,
    "In Progress": projects.filter(p=>p.status==="In Progress").length,
    Completed:     projects.filter(p=>p.status==="Completed").length,
    Pending:       projects.filter(p=>p.status==="Pending").length,
  };

  function getInitials(client) {
    return client.replace(/Mr\.|Mrs\.|Ms\./,"").trim().split(" ").map(w=>w[0]).join("").slice(0,2);
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Plus Jakarta Sans','Segoe UI',sans-serif; background:${B.pageBg}; }
        .dr { display:flex; min-height:100vh; }
        .mc { flex:1; display:flex; flex-direction:column; min-height:100vh; margin-left:0; }
        @media(min-width:900px){ .mc{ margin-left:240px; } .hbg{ display:none!important; } .bn-wrap{ display:none!important; } }
        .tb { background:${B.white}; border-bottom:1px solid ${B.border}; padding:0 20px; height:60px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; }
        .page { padding:20px; }
        @media(min-width:900px){ .page{ padding:24px 28px; } }
        .ftabs { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:16px; }
        .ftab { padding:7px 14px; border-radius:99px; font-size:12px; font-weight:600; cursor:pointer; border:1.5px solid ${B.border}; background:${B.white}; color:${B.textSub}; font-family:inherit; transition:all .15s; }
        .ftab.on { border-color:${B.copper}; background:${B.copper}; color:#fff; }
        .proj-cards { display:grid; grid-template-columns:1fr; gap:12px; }
        @media(min-width:540px){ .proj-cards{ grid-template-columns:1fr 1fr; } }
        .proj-card { background:${B.white}; border-radius:14px; padding:16px; box-shadow:0 1px 6px rgba(0,0,0,.06); border:1px solid ${B.border}; cursor:pointer; transition:box-shadow .15s; }
        .proj-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.1); }
        .proj-table-wrap { display:none; background:${B.white}; border-radius:14px; box-shadow:0 1px 6px rgba(0,0,0,.06); border:1px solid ${B.border}; overflow:hidden; }
        @media(min-width:900px){ .proj-cards{ display:none; } .proj-table-wrap{ display:block; } }
        .pt { width:100%; border-collapse:collapse; font-size:13px; }
        .pt th { text-align:left; padding:12px 16px; color:${B.textSub}; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; border-bottom:2px solid ${B.border}; background:${B.pageBg}; }
        .pt td { padding:14px 16px; border-bottom:1px solid ${B.border}; color:${B.textMain}; vertical-align:middle; }
        .pt tr:last-child td { border-bottom:none; }
        .pt tbody tr:hover td { background:#FAFAF8; cursor:pointer; }
      `}</style>

      {showAdd && <AddProjectModal onClose={() => setShowAdd(false)} onAdd={p => setProjects(prev=>[p,...prev])}/>}
      {detail   && <ProjectDetail project={detail} onClose={() => setDetail(null)}/>}

      <div className="dr">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

        <div className="mc">
          <div className="tb">
            <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
              <button className="hbg" onClick={() => setSidebarOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"20px", color:B.textMain, padding:"6px" }}>☰</button>
              <div>
                <div style={{ fontSize:"16px", fontWeight:"700", color:B.textMain }}>Projects</div>
                <div style={{ fontSize:"11px", color:B.textSub }}>{projects.length} total projects</div>
              </div>
            </div>
            <button onClick={() => setShowAdd(true)} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"9px 16px", background:B.copper, color:"#fff", border:"none", borderRadius:"10px", fontFamily:"inherit", fontSize:"13px", fontWeight:"700", cursor:"pointer", whiteSpace:"nowrap" }}>
              <span style={{ fontSize:"16px", lineHeight:1 }}>+</span> Add Project
            </button>
          </div>

          <div style={{ flex:1, overflowY:"auto" }}>
            <div className="page">

              {/* Summary */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginBottom:"18px" }}>
                {[["In Progress",counts["In Progress"],B.blue,B.blueBg],["Completed",counts["Completed"],B.green,B.greenBg],["Pending",counts["Pending"],B.amber,B.amberBg]].map(([label,count,color,bg]) => (
                  <div key={label} style={{ background:B.white, borderRadius:"12px", padding:"14px 16px", border:`1px solid ${B.border}`, boxShadow:"0 1px 4px rgba(0,0,0,.05)" }}>
                    <div style={{ fontSize:"22px", fontWeight:"700", color }}>{count}</div>
                    <div style={{ fontSize:"11px", color:B.textSub, fontWeight:"600", marginTop:"2px" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Search */}
              <div style={{ position:"relative", marginBottom:"14px" }}>
                <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", color:B.textLight, fontSize:"14px" }}>🔍</span>
                <input placeholder="Search projects, clients, locations..." value={search} onChange={e=>setSearch(e.target.value)} style={{ width:"100%", padding:"10px 12px 10px 36px", border:`1.5px solid ${B.border}`, borderRadius:"10px", fontSize:"13px", fontFamily:"inherit", background:B.white, color:B.textMain, outline:"none" }}/>
              </div>

              {/* Filter tabs */}
              <div className="ftabs">
                {["All","In Progress","Completed","Pending"].map(s => (
                  <button key={s} className={`ftab${filterStatus===s?" on":""}`} onClick={() => setFilterStatus(s)}>
                    {s} ({counts[s] ?? 0})
                  </button>
                ))}
              </div>

              {/* Mobile cards */}
              <div className="proj-cards">
                {filtered.length===0
                  ? <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"48px 0", color:B.textSub }}>No projects found.</div>
                  : filtered.map(p => (
                    <div key={p.id} className="proj-card" onClick={() => setDetail(p)}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"10px" }}>
                        <Avatar initials={getInitials(p.client)} size={38}/>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:"14px", fontWeight:"700", color:B.textMain }}>{p.title}</div>
                          <div style={{ fontSize:"11px", color:B.textSub, marginTop:"1px" }}>📍 {p.location}</div>
                        </div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"8px" }}>
                        <StatusPill status={p.status}/>
                        <span style={{ fontSize:"11px", color:B.textSub, background:B.pageBg, padding:"3px 8px", borderRadius:"6px", fontWeight:"600" }}>{p.type}</span>
                      </div>
                      <div style={{ marginBottom:"8px" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                          <span style={{ fontSize:"11px", color:B.textSub }}>Progress</span>
                          <span style={{ fontSize:"11px", fontWeight:"700", color:B.textMain }}>{p.progress}%</span>
                        </div>
                        <ProgressBar value={p.progress}/>
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:"12px" }}>
                        <span style={{ color:B.textSub }}>Budget: <strong style={{ color:B.textMain }}>{p.budget}</strong></span>
                        <span style={{ color:B.copper, fontWeight:"600" }}>View →</span>
                      </div>
                    </div>
                  ))
                }
              </div>

              {/* Laptop table */}
              <div className="proj-table-wrap">
                <table className="pt">
                  <thead>
                    <tr><th>Project</th><th>Client</th><th>Type</th><th>Budget</th><th>Progress</th><th>Status</th><th>Manager</th></tr>
                  </thead>
                  <tbody>
                    {filtered.length===0
                      ? <tr><td colSpan={7} style={{ textAlign:"center", padding:"48px", color:B.textSub }}>No projects found.</td></tr>
                      : filtered.map(p => (
                        <tr key={p.id} onClick={() => setDetail(p)}>
                          <td>
                            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                              <Avatar initials={getInitials(p.client)} size={34}/>
                              <div>
                                <div style={{ fontWeight:"700", fontSize:"13px" }}>{p.title}</div>
                                <div style={{ fontSize:"11px", color:B.textSub, marginTop:"1px" }}>📍 {p.location}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ fontWeight:"600", fontSize:"13px" }}>{p.client}</td>
                          <td><span style={{ fontSize:"11px", background:B.pageBg, padding:"3px 8px", borderRadius:"6px", fontWeight:"600", color:B.textSub }}>{p.type}</span></td>
                          <td>
                            <div style={{ fontWeight:"700", fontSize:"13px" }}>{p.budget}</div>
                            <div style={{ fontSize:"11px", color:B.textSub }}>Spent: {p.spent}</div>
                          </td>
                          <td style={{ minWidth:"130px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                              <ProgressBar value={p.progress}/>
                              <span style={{ fontSize:"12px", fontWeight:"700", whiteSpace:"nowrap" }}>{p.progress}%</span>
                            </div>
                          </td>
                          <td><StatusPill status={p.status}/></td>
                          <td style={{ fontSize:"13px", color:B.textSub }}>{p.manager||"—"}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          <div className="bn-wrap"><BottomNav/></div>
        </div>
      </div>
    </>
  );
}