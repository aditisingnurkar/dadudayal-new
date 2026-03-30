import { useState } from "react";

const B = {
  darkBrown:  "#4A2010",
  copper:     "#C87941",
  gold:       "#E8A050",
  orange:     "#C85A1A",
  navy:       "#1A2035",
  navyLight:  "#232B42",
  navyHover:  "#2D3754",
  white:      "#FFFFFF",
  pageBg:     "#F4F6F9",
  cardBg:     "#FFFFFF",
  border:     "#E2E8F0",
  textMain:   "#1A202C",
  textSub:    "#718096",
  textLight:  "#A0AEC0",
  green:      "#2E7D32",
  greenBg:    "#E8F5E9",
  greenMid:   "#4CAF50",
  blue:       "#1565C0",
  blueBg:     "#E3F2FD",
  blueMid:    "#2196F3",
  red:        "#C62828",
  redBg:      "#FFEBEE",
  redMid:     "#F44336",
  amber:      "#E65100",
  amberBg:    "#FFF3E0",
  amberMid:   "#FF9800",
  teal:       "#00695C",
  tealBg:     "#E0F2F1",
  tealMid:    "#009688",
};

// ── Fake data ──
const STAT_CARDS = [
  { label: "Today Sales",      value: "₹1,85,000", icon: "💰", color: B.green,  bg: B.greenBg,  trend: "+12%" },
  { label: "Total Projects",   value: "18",         icon: "📋", color: B.blue,   bg: B.blueBg,   trend: "+3"   },
  { label: "Running Projects", value: "8",          icon: "⚙️", color: B.amber,  bg: B.amberBg,  trend: "Active"},
  { label: "Pending Payment",  value: "₹7,65,000", icon: "⏳", color: B.red,    bg: B.redBg,    trend: "3 dues"},
  { label: "Monthly Expenses", value: "₹11,20,000",icon: "📊", color: B.teal,   bg: B.tealBg,   trend: "-5%"  },
];

const PROJECTS = [
  { name: "Pravin Mishra",   location: "Living Room, Neelor, Hatrail", progress: 32,  status: "Progress",  avatar: "PM" },
  { name: "Rekha Sharma",    location: "Living Room, Neelor, Readul",  progress: 89,  status: "Next Task", avatar: "RS" },
  { name: "Aman Bhatnagar",  location: "Living Room, Neelor, Mumbai",  progress: 100, status: "Progress",  avatar: "AB" },
  { name: "Suresh Gupta",    location: "Bedroom, Sector 22, Delhi",    progress: 55,  status: "Progress",  avatar: "SG" },
];

const EMPLOYEES = [
  { name: "Suresh Sharma", time: "09:05 – 33:35", po: "01:39 PM", status: "Passing", statusType: "pass" },
  { name: "Vijay Singh",   time: "05:07 – 33:35", po: "02:33 PM", status: "Passing", statusType: "pass" },
  { name: "Ankit Patel",   time: "09:10 – 33:35", po: "01:55 PM", status: "Late",    statusType: "late" },
  { name: "Meena Joshi",   time: "08:55 – 33:35", po: "02:10 PM", status: "Passing", statusType: "pass" },
];

const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",      icon: "▦"  },
  { id: "projects",   label: "Projects",       icon: "📋" },
  { id: "quotations", label: "Quotations",     icon: "📄" },
  { id: "purchase",   label: "Purchase Orders",icon: "🛒" },
  { id: "reports",    label: "Reports",        icon: "📊" },
  { id: "employees",  label: "Employees",      icon: "👷" },
  { id: "vendors",    label: "Vendors",        icon: "🏢" },
  { id: "stock",      label: "Material Stock", icon: "📦" },
];

// ── Simple bar chart using divs ──
const CHART_DATA = [
  { month: "Apr", val: 60 }, { month: "May", val: 85 },
  { month: "Jun", val: 45 }, { month: "Jul", val: 90 },
  { month: "Aug", val: 70 }, { month: "Sep", val: 55 },
  { month: "Oct", val: 80 }, { month: "Nov", val: 95 },
];

function ProgressBar({ value, color }) {
  return (
    <div style={{ background: B.border, borderRadius: "99px", height: "7px", flex: 1, overflow: "hidden" }}>
      <div style={{
        width: `${Math.min(value, 100)}%`, height: "100%", borderRadius: "99px",
        background: value >= 100 ? B.green : value >= 70 ? B.copper : B.blueMid,
        transition: "width .4s ease",
      }}/>
    </div>
  );
}

function Avatar({ initials, size = 36 }) {
  const colors = ["#C87941", "#1565C0", "#2E7D32", "#C62828", "#00695C", "#7B1FA2"];
  const idx = initials.charCodeAt(0) % colors.length;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: colors[idx], color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: "700", flexShrink: 0,
      fontFamily: "inherit",
    }}>{initials}</div>
  );
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif; background: ${B.pageBg}; }

        .dash-root { display: flex; min-height: 100vh; }

        /* ── Sidebar ── */
        .sidebar {
          width: 240px; background: ${B.navy}; display: flex; flex-direction: column;
          position: fixed; top: 0; left: 0; height: 100vh; z-index: 100;
          transition: transform .25s ease; overflow-y: auto;
        }
        .sidebar-overlay {
          display: none; position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 99;
        }

        /* Mobile: hide sidebar by default */
        @media(max-width: 899px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .sidebar-overlay.open { display: block; }
          .main-content { margin-left: 0 !important; }
        }
        @media(min-width: 900px) {
          .sidebar { position: fixed; transform: none !important; }
          .main-content { margin-left: 240px; }
          .topbar-hamburger { display: none !important; }
        }

        .sidebar-logo { padding: 20px 20px 16px; border-bottom: 1px solid rgba(255,255,255,.08); }
        .nav-section { padding: 12px 0; flex: 1; }
        .nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 20px; cursor: pointer; transition: background .15s;
          color: #94A3B8; font-size: 13.5px; font-weight: 500;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-item:hover { background: ${B.navyHover}; color: #fff; }
        .nav-item.active { background: ${B.copper}; color: #fff; }
        .nav-icon { font-size: 16px; width: 20px; text-align: center; }

        /* ── Main content ── */
        .main-content { flex: 1; display: flex; flex-direction: column; min-height: 100vh; }

        /* ── Topbar ── */
        .topbar {
          background: ${B.white}; border-bottom: 1px solid ${B.border};
          padding: 0 20px; height: 60px; display: flex; align-items: center;
          justify-content: space-between; position: sticky; top: 0; z-index: 50;
        }
        .topbar-left { display: flex; align-items: center; gap: 14px; }
        .topbar-hamburger {
          background: none; border: none; cursor: pointer; padding: 6px;
          color: ${B.textMain}; font-size: 20px; line-height: 1;
          -webkit-tap-highlight-color: transparent;
        }
        .topbar-right { display: flex; align-items: center; gap: 10px; }
        .icon-btn {
          width: 36px; height: 36px; border-radius: "50%"; border: 1px solid ${B.border};
          background: ${B.pageBg}; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 16px; position: relative;
          -webkit-tap-highlight-color: transparent;
        }
        .badge {
          position: absolute; top: -3px; right: -3px; width: 16px; height: 16px;
          background: ${B.red}; color: #fff; border-radius: 50%;
          font-size: 9px; display: flex; align-items: center; justify-content: center;
          font-weight: 700;
        }

        /* ── Page content ── */
        .page { padding: 20px; }
        @media(min-width: 900px) { .page { padding: 24px 28px; } }

        /* ── Stat cards ── */
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px; margin-bottom: 20px;
        }
        @media(min-width: 640px)  { .stat-grid { grid-template-columns: repeat(3, 1fr); } }
        @media(min-width: 1100px) { .stat-grid { grid-template-columns: repeat(5, 1fr); } }

        .stat-card {
          background: ${B.white}; border-radius: 14px; padding: 16px;
          box-shadow: 0 1px 6px rgba(0,0,0,.06); border: 1px solid ${B.border};
        }

        /* ── Two-col layout ── */
        .two-col { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 16px; }
        @media(min-width: 900px) { .two-col { grid-template-columns: 1fr 1fr; } }

        /* ── Section card ── */
        .section-card {
          background: ${B.white}; border-radius: 14px; padding: 18px;
          box-shadow: 0 1px 6px rgba(0,0,0,.06); border: 1px solid ${B.border};
        }
        .section-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 16px;
        }
        .section-title { font-size: 15px; font-weight: 700; color: ${B.textMain}; }
        .view-all { font-size: 12px; color: ${B.copper}; font-weight: 600; cursor: pointer; background: none; border: none; font-family: inherit; }

        /* ── Project row ── */
        .proj-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid ${B.border}; }
        .proj-row:last-child { border-bottom: none; }

        /* ── Table ── */
        .att-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .att-table th { text-align: left; padding: 8px 10px; color: ${B.textSub}; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; border-bottom: 2px solid ${B.border}; }
        .att-table td { padding: 10px 10px; border-bottom: 1px solid ${B.border}; color: ${B.textMain}; vertical-align: middle; }
        .att-table tr:last-child td { border-bottom: none; }

        /* ── Bar chart ── */
        .chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 120px; padding-top: 10px; }
        .chart-bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; justify-content: flex-end; }
        .chart-bar { width: 100%; border-radius: 6px 6px 0 0; transition: height .4s ease; min-width: 20px; }
        .chart-label { font-size: 10px; color: ${B.textSub}; font-weight: 500; }

        /* ── Status pills ── */
        .pill { padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 600; display: inline-block; }
        .pill-pass { background: ${B.greenBg}; color: ${B.green}; }
        .pill-late { background: ${B.redBg}; color: ${B.red}; }

        /* ── Mobile bottom nav ── */
        .bottom-nav {
          display: flex; background: ${B.white}; border-top: 1px solid ${B.border};
          position: sticky; bottom: 0; z-index: 50;
        }
        .bottom-nav-item {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          padding: 8px 4px; font-size: 10px; color: ${B.textSub}; font-weight: 500;
          cursor: pointer; gap: 3px; -webkit-tap-highlight-color: transparent;
          border: none; background: none; font-family: inherit;
        }
        .bottom-nav-item.active { color: ${B.copper}; }
        .bottom-nav-icon { font-size: 18px; }
        @media(min-width: 900px) { .bottom-nav { display: none; } }

        .scroll-content { flex: 1; overflow-y: auto; }
      `}</style>

      <div className="dash-root">

        {/* ── SIDEBAR OVERLAY (mobile) ── */}
        <div className={`sidebar-overlay${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)}/>

        {/* ── SIDEBAR ── */}
        <div className={`sidebar${sidebarOpen ? " open" : ""}`}>
          {/* Logo */}
          <div className="sidebar-logo">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="36" height="36" viewBox="0 0 70 70" fill="none">
                <path d="M10 8 L10 62 L32 62 C54 62 64 50 64 35 C64 20 54 8 32 8 Z" fill={B.copper}/>
                <path d="M20 18 L20 52 L31 52 C44 52 52 45 52 35 C52 25 44 18 31 18 Z" fill={B.navy}/>
                <path d="M18 48 C24 38 38 26 60 14 C50 24 40 33 34 42 C29 48 22 53 18 55 Z" fill={B.gold} opacity="0.9"/>
              </svg>
              <div>
                <div style={{ color: B.white, fontSize: "14px", fontWeight: "800", letterSpacing: "1px", fontFamily: "'Playfair Display', serif" }}>DADUDAYAL</div>
                <div style={{ color: B.copper, fontSize: "9px", letterSpacing: "2px" }}>INTERIOR DESIGNER</div>
              </div>
            </div>
          </div>

          {/* Nav items */}
          <div className="nav-section">
            {NAV_ITEMS.map(item => (
              <div
                key={item.id}
                className={`nav-item${activeNav === item.id ? " active" : ""}`}
                onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* User at bottom */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: "10px" }}>
            <Avatar initials="AD" size={34}/>
            <div>
              <div style={{ color: B.white, fontSize: "13px", fontWeight: "600" }}>Admin</div>
              <div style={{ color: "#64748B", fontSize: "11px" }}>admin@dadudayal.com</div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="main-content">

          {/* Topbar */}
          <div className="topbar">
            <div className="topbar-left">
              <button className="topbar-hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: B.textMain }}>Dashboard</div>
                <div style={{ fontSize: "11px", color: B.textSub }}>Today: {new Date().toDateString()}</div>
              </div>
            </div>
            <div className="topbar-right">
              <div className="icon-btn" style={{ borderRadius: "50%" }}>
                🔔
                <span className="badge">3</span>
              </div>
              <Avatar initials="AD" size={34}/>
            </div>
          </div>

          {/* Page content */}
          <div className="scroll-content">
            <div className="page">

              {/* ── STAT CARDS ── */}
              <div className="stat-grid">
                {STAT_CARDS.map((card, i) => (
                  <div key={i} className="stat-card">
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
                      <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                        {card.icon}
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: "600", color: card.color, background: card.bg, padding: "2px 8px", borderRadius: "99px" }}>
                        {card.trend}
                      </span>
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: B.textMain, marginBottom: "3px" }}>{card.value}</div>
                    <div style={{ fontSize: "12px", color: B.textSub, fontWeight: "500" }}>{card.label}</div>
                  </div>
                ))}
              </div>

              {/* ── TWO COLUMN: Projects + Chart ── */}
              <div className="two-col">

                {/* Ongoing Projects */}
                <div className="section-card">
                  <div className="section-header">
                    <span className="section-title">Ongoing Projects</span>
                    <button className="view-all">View All →</button>
                  </div>
                  {PROJECTS.map((p, i) => (
                    <div key={i} className="proj-row">
                      <Avatar initials={p.avatar} size={38}/>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: B.textMain, marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                        <div style={{ fontSize: "11px", color: B.textSub, marginBottom: "6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.location}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <ProgressBar value={p.progress}/>
                          <span style={{ fontSize: "12px", fontWeight: "700", color: p.progress >= 100 ? B.green : B.textMain, whiteSpace: "nowrap" }}>{p.progress}%</span>
                        </div>
                      </div>
                      <span style={{ fontSize: "10px", color: B.copper, fontWeight: "600", background: B.amberBg, padding: "3px 8px", borderRadius: "99px", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Activity Chart */}
                <div className="section-card">
                  <div className="section-header">
                    <span className="section-title">Activity Overview</span>
                    <button className="view-all">View All →</button>
                  </div>

                  {/* Y-axis labels */}
                  <div style={{ display: "flex", gap: "0", alignItems: "flex-end" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "120px", paddingBottom: "20px", marginRight: "8px" }}>
                      {["700k","500k","300k","100k","0"].map(l => (
                        <span key={l} style={{ fontSize: "10px", color: B.textLight }}>{l}</span>
                      ))}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="chart-bars">
                        {CHART_DATA.map((d, i) => (
                          <div key={i} className="chart-bar-wrap">
                            <div
                              className="chart-bar"
                              style={{
                                height: `${d.val}%`,
                                background: i === CHART_DATA.length - 1 ? B.copper
                                  : i % 3 === 0 ? B.blueMid
                                  : i % 3 === 1 ? B.amberMid
                                  : B.tealMid,
                                opacity: 0.85,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                        {CHART_DATA.map((d, i) => (
                          <div key={i} style={{ flex: 1, textAlign: "center" }}>
                            <span className="chart-label">{d.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div style={{ display: "flex", gap: "16px", marginTop: "14px", flexWrap: "wrap" }}>
                    {[["Income", B.blueMid], ["Expense", B.amberMid], ["Profit", B.tealMid]].map(([label, color]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: color }}/>
                        <span style={{ fontSize: "11px", color: B.textSub, fontWeight: "500" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── EMPLOYEE ATTENDANCE ── */}
              <div className="section-card">
                <div className="section-header">
                  <span className="section-title">Employee Attendance</span>
                  <button className="view-all">View All →</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table className="att-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Time</th>
                        <th>PO Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EMPLOYEES.map((e, i) => (
                        <tr key={i}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <Avatar initials={e.name.split(" ").map(w=>w[0]).join("")} size={30}/>
                              <span style={{ fontWeight: "600", fontSize: "13px" }}>{e.name}</span>
                            </div>
                          </td>
                          <td style={{ color: B.textSub, fontSize: "13px" }}>{e.time}</td>
                          <td style={{ fontSize: "13px" }}>{e.po}</td>
                          <td>
                            <span className={`pill pill-${e.statusType}`}>{e.status}</span>
                          </td>
                          <td>
                            <button style={{ background: B.pageBg, border: `1px solid ${B.border}`, borderRadius: "6px", padding: "4px 10px", fontSize: "12px", cursor: "pointer", color: B.textMain, fontFamily: "inherit" }}>
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          {/* ── MOBILE BOTTOM NAV ── */}
          <div className="bottom-nav">
            {[
              { id: "dashboard", label: "Home",     icon: "▦"  },
              { id: "projects",  label: "Projects",  icon: "📋" },
              { id: "quotations",label: "Quotes",    icon: "📄" },
              { id: "employees", label: "Staff",     icon: "👷" },
              { id: "reports",   label: "More",      icon: "☰"  },
            ].map(item => (
              <button
                key={item.id}
                className={`bottom-nav-item${activeNav === item.id ? " active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="bottom-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}