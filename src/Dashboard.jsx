import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar, { BottomNav } from "./Sidebar";

const B = {
  darkBrown: "#4A2010", copper: "#C87941", gold: "#E8A050", orange: "#C85A1A",
  navy: "#1A2035", navyHover: "#2D3754", white: "#FFFFFF", pageBg: "#F4F6F9",
  border: "#E2E8F0", textMain: "#1A202C", textSub: "#718096", textLight: "#A0AEC0",
  green: "#2E7D32", greenBg: "#E8F5E9", greenMid: "#4CAF50",
  blue: "#1565C0", blueBg: "#E3F2FD", blueMid: "#2196F3",
  red: "#C62828", redBg: "#FFEBEE", redMid: "#F44336",
  amber: "#E65100", amberBg: "#FFF3E0", amberMid: "#FF9800",
  teal: "#00695C", tealBg: "#E0F2F1", tealMid: "#009688",
};

const STAT_CARDS = [
  { label:"Today Sales",      value:"₹1,85,000",  icon:"💰", color:B.green, bg:B.greenBg, trend:"+12%" },
  { label:"Total Projects",   value:"18",          icon:"📋", color:B.blue,  bg:B.blueBg,  trend:"+3"   },
  { label:"Running Projects", value:"8",           icon:"⚙️", color:B.amber, bg:B.amberBg, trend:"Active"},
  { label:"Pending Payment",  value:"₹7,65,000",  icon:"⏳", color:B.red,   bg:B.redBg,   trend:"3 dues"},
  { label:"Monthly Expenses", value:"₹11,20,000", icon:"📊", color:B.teal,  bg:B.tealBg,  trend:"-5%"  },
];

const PROJECTS = [
  { name:"Pravin Mishra",  location:"Living Room, Neelor, Hatrail", progress:32,  status:"Progress",  avatar:"PM" },
  { name:"Rekha Sharma",   location:"Living Room, Neelor, Readul",  progress:89,  status:"Next Task", avatar:"RS" },
  { name:"Aman Bhatnagar", location:"Living Room, Neelor, Mumbai",  progress:100, status:"Progress",  avatar:"AB" },
  { name:"Suresh Gupta",   location:"Bedroom, Sector 22, Delhi",    progress:55,  status:"Progress",  avatar:"SG" },
];

const EMPLOYEES = [
  { name:"Suresh Sharma", time:"09:05 – 18:35", po:"01:39 PM", status:"Passing", statusType:"pass" },
  { name:"Vijay Singh",   time:"09:07 – 18:35", po:"02:33 PM", status:"Passing", statusType:"pass" },
  { name:"Ankit Patel",   time:"10:10 – 18:35", po:"01:55 PM", status:"Late",    statusType:"late" },
  { name:"Meena Joshi",   time:"08:55 – 18:35", po:"02:10 PM", status:"Passing", statusType:"pass" },
];

const CHART_DATA = [
  { month:"Apr", val:60 }, { month:"May", val:85 }, { month:"Jun", val:45 },
  { month:"Jul", val:90 }, { month:"Aug", val:70 }, { month:"Sep", val:55 },
  { month:"Oct", val:80 }, { month:"Nov", val:95 },
];

function ProgressBar({ value }) {
  return (
    <div style={{ background:B.border, borderRadius:"99px", height:"7px", flex:1, overflow:"hidden" }}>
      <div style={{ width:`${Math.min(value,100)}%`, height:"100%", borderRadius:"99px", background:value>=100?B.green:value>=70?B.copper:B.blueMid, transition:"width .4s" }}/>
    </div>
  );
}

function Avatar({ initials, size=36 }) {
  const colors = ["#C87941","#1565C0","#2E7D32","#C62828","#00695C","#7B1FA2"];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:colors[initials.charCodeAt(0)%colors.length], color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.35, fontWeight:"700", flexShrink:0, fontFamily:"inherit" }}>
      {initials}
    </div>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
        .stat-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-bottom:20px; }
        @media(min-width:640px){ .stat-grid{ grid-template-columns:repeat(3,1fr); } }
        @media(min-width:1100px){ .stat-grid{ grid-template-columns:repeat(5,1fr); } }
        .stat-card { background:${B.white}; border-radius:14px; padding:16px; box-shadow:0 1px 6px rgba(0,0,0,.06); border:1px solid ${B.border}; }
        .two-col { display:grid; grid-template-columns:1fr; gap:16px; margin-bottom:16px; }
        @media(min-width:900px){ .two-col{ grid-template-columns:1fr 1fr; } }
        .sc { background:${B.white}; border-radius:14px; padding:18px; box-shadow:0 1px 6px rgba(0,0,0,.06); border:1px solid ${B.border}; }
        .pr { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid ${B.border}; }
        .pr:last-child { border-bottom:none; }
        .att { width:100%; border-collapse:collapse; font-size:13px; }
        .att th { text-align:left; padding:8px 10px; color:${B.textSub}; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:.04em; border-bottom:2px solid ${B.border}; }
        .att td { padding:10px; border-bottom:1px solid ${B.border}; color:${B.textMain}; vertical-align:middle; }
        .att tr:last-child td { border-bottom:none; }
        .chart-bars { display:flex; align-items:flex-end; gap:8px; height:120px; }
        .cb-wrap { flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; height:100%; justify-content:flex-end; }
        .pill { padding:3px 10px; border-radius:99px; font-size:11px; font-weight:600; display:inline-block; }
        .pill-pass { background:${B.greenBg}; color:${B.green}; }
        .pill-late { background:${B.redBg}; color:${B.red}; }
      `}</style>

      <div className="dr">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

        <div className="mc">
          {/* Topbar */}
          <div className="tb">
            <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
              <button className="hbg" onClick={() => setSidebarOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"20px", color:B.textMain, padding:"6px" }}>☰</button>
              <div>
                <div style={{ fontSize:"16px", fontWeight:"700", color:B.textMain }}>Dashboard</div>
                <div style={{ fontSize:"11px", color:B.textSub }}>Today: {new Date().toDateString()}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"50%", border:`1px solid ${B.border}`, background:B.pageBg, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:"16px", position:"relative" }}>
                🔔<span style={{ position:"absolute", top:"-3px", right:"-3px", width:"16px", height:"16px", background:B.red, color:"#fff", borderRadius:"50%", fontSize:"9px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700" }}>3</span>
              </div>
              <Avatar initials="AD" size={34}/>
            </div>
          </div>

          <div style={{ flex:1, overflowY:"auto" }}>
            <div className="page">

              {/* Stat cards */}
              <div className="stat-grid">
                {STAT_CARDS.map((card,i) => (
                  <div key={i} className="stat-card">
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"10px" }}>
                      <div style={{ width:"38px", height:"38px", borderRadius:"10px", background:card.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px" }}>{card.icon}</div>
                      <span style={{ fontSize:"11px", fontWeight:"600", color:card.color, background:card.bg, padding:"2px 8px", borderRadius:"99px" }}>{card.trend}</span>
                    </div>
                    <div style={{ fontSize:"18px", fontWeight:"700", color:B.textMain, marginBottom:"3px" }}>{card.value}</div>
                    <div style={{ fontSize:"12px", color:B.textSub, fontWeight:"500" }}>{card.label}</div>
                  </div>
                ))}
              </div>

              {/* Two col */}
              <div className="two-col">

                {/* Ongoing Projects — clicking "View All" goes to /projects */}
                <div className="sc">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                    <span style={{ fontSize:"15px", fontWeight:"700", color:B.textMain }}>Ongoing Projects</span>
                    <button onClick={() => navigate("/projects")} style={{ fontSize:"12px", color:B.copper, fontWeight:"600", cursor:"pointer", background:"none", border:"none", fontFamily:"inherit" }}>View All →</button>
                  </div>
                  {PROJECTS.map((p,i) => (
                    <div key={i} className="pr">
                      <Avatar initials={p.avatar} size={38}/>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:"13px", fontWeight:"600", color:B.textMain, marginBottom:"2px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                        <div style={{ fontSize:"11px", color:B.textSub, marginBottom:"6px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.location}</div>
                        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                          <ProgressBar value={p.progress}/>
                          <span style={{ fontSize:"12px", fontWeight:"700", color:p.progress>=100?B.green:B.textMain, whiteSpace:"nowrap" }}>{p.progress}%</span>
                        </div>
                      </div>
                      <span style={{ fontSize:"10px", color:B.copper, fontWeight:"600", background:B.amberBg, padding:"3px 8px", borderRadius:"99px", whiteSpace:"nowrap", flexShrink:0 }}>{p.status}</span>
                    </div>
                  ))}
                </div>

                {/* Activity Chart */}
                <div className="sc">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                    <span style={{ fontSize:"15px", fontWeight:"700", color:B.textMain }}>Activity Overview</span>
                    <button style={{ fontSize:"12px", color:B.copper, fontWeight:"600", cursor:"pointer", background:"none", border:"none", fontFamily:"inherit" }}>View All →</button>
                  </div>
                  <div style={{ display:"flex", gap:"0", alignItems:"flex-end" }}>
                    <div style={{ display:"flex", flexDirection:"column", justifyContent:"space-between", height:"120px", paddingBottom:"20px", marginRight:"8px" }}>
                      {["700k","500k","300k","100k","0"].map(l => <span key={l} style={{ fontSize:"10px", color:B.textLight }}>{l}</span>)}
                    </div>
                    <div style={{ flex:1 }}>
                      <div className="chart-bars">
                        {CHART_DATA.map((d,i) => (
                          <div key={i} className="cb-wrap">
                            <div style={{ width:"100%", borderRadius:"6px 6px 0 0", height:`${d.val}%`, background:i===CHART_DATA.length-1?B.copper:i%3===0?B.blueMid:i%3===1?B.amberMid:B.tealMid, opacity:0.85, minWidth:"20px" }}/>
                          </div>
                        ))}
                      </div>
                      <div style={{ display:"flex", gap:"8px", marginTop:"6px" }}>
                        {CHART_DATA.map((d,i) => <div key={i} style={{ flex:1, textAlign:"center", fontSize:"10px", color:B.textSub }}>{d.month}</div>)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:"16px", marginTop:"14px", flexWrap:"wrap" }}>
                    {[["Income",B.blueMid],["Expense",B.amberMid],["Profit",B.tealMid]].map(([label,color]) => (
                      <div key={label} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                        <div style={{ width:"10px", height:"10px", borderRadius:"2px", background:color }}/>
                        <span style={{ fontSize:"11px", color:B.textSub, fontWeight:"500" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Employee Attendance */}
              <div className="sc">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                  <span style={{ fontSize:"15px", fontWeight:"700", color:B.textMain }}>Employee Attendance</span>
                  <button style={{ fontSize:"12px", color:B.copper, fontWeight:"600", cursor:"pointer", background:"none", border:"none", fontFamily:"inherit" }}>View All →</button>
                </div>
                <div style={{ overflowX:"auto" }}>
                  <table className="att">
                    <thead>
                      <tr><th>Employee</th><th>Time</th><th>PO Time</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {EMPLOYEES.map((e,i) => (
                        <tr key={i}>
                          <td><div style={{ display:"flex", alignItems:"center", gap:"8px" }}><Avatar initials={e.name.split(" ").map(w=>w[0]).join("")} size={30}/><span style={{ fontWeight:"600", fontSize:"13px" }}>{e.name}</span></div></td>
                          <td style={{ color:B.textSub, fontSize:"13px" }}>{e.time}</td>
                          <td style={{ fontSize:"13px" }}>{e.po}</td>
                          <td><span className={`pill pill-${e.statusType}`}>{e.status}</span></td>
                          <td><button style={{ background:B.pageBg, border:`1px solid ${B.border}`, borderRadius:"6px", padding:"4px 10px", fontSize:"12px", cursor:"pointer", color:B.textMain, fontFamily:"inherit" }}>View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          <div className="bn-wrap"><BottomNav/></div>
        </div>
      </div>
    </>
  );
}