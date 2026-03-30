import { useNavigate, useLocation } from "react-router-dom";

const B = {
  copper: "#C87941",
  gold:   "#E8A050",
  navy:   "#1A2035",
  navyHover: "#2D3754",
  white:  "#FFFFFF",
  textSub: "#718096",
};

const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",       icon: "▦",  path: "/dashboard"  },
  { id: "projects",   label: "Projects",        icon: "📋", path: "/projects"   },
  { id: "quotations", label: "Quotations",      icon: "📄", path: "/quotations" },
  { id: "purchase",   label: "Purchase Orders", icon: "🛒", path: "/purchase"   },
  { id: "reports",    label: "Reports",         icon: "📊", path: "/reports"    },
  { id: "employees",  label: "Employees",       icon: "👷", path: "/employees"  },
  { id: "vendors",    label: "Vendors",         icon: "🏢", path: "/vendors"    },
  { id: "stock",      label: "Material Stock",  icon: "📦", path: "/stock"      },
];

const BOTTOM_NAV = [
  { id: "dashboard",  label: "Home",     icon: "▦",  path: "/dashboard"  },
  { id: "projects",   label: "Projects", icon: "📋", path: "/projects"   },
  { id: "quotations", label: "Quotes",   icon: "📄", path: "/quotations" },
  { id: "employees",  label: "Staff",    icon: "👷", path: "/employees"  },
  { id: "reports",    label: "More",     icon: "☰",  path: "/reports"    },
];

function Avatar({ initials, size = 36 }) {
  const colors = ["#C87941","#1565C0","#2E7D32","#C62828","#00695C","#7B1FA2"];
  const bg = colors[initials.charCodeAt(0) % colors.length];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:bg, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.35, fontWeight:"700", flexShrink:0, fontFamily:"inherit" }}>
      {initials}
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const active    = NAV_ITEMS.find(n => location.pathname.startsWith(n.path))?.id || "dashboard";

  function go(path) {
    navigate(path);
    onClose();
  }

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", zIndex:99, display:"block" }}
        />
      )}

      {/* Sidebar panel */}
      <div style={{
        width:"240px", background:B.navy, display:"flex", flexDirection:"column",
        position:"fixed", top:0, left:0, height:"100vh", zIndex:100,
        overflowY:"auto",
        transform: isOpen ? "translateX(0)" : undefined,
      }}>
        {/* Logo */}
        <div style={{ padding:"20px 20px 16px", borderBottom:"1px solid rgba(255,255,255,.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", cursor:"pointer" }} onClick={() => go("/dashboard")}>
            <svg width="36" height="36" viewBox="0 0 70 70" fill="none">
              <path d="M10 8 L10 62 L32 62 C54 62 64 50 64 35 C64 20 54 8 32 8 Z" fill={B.copper}/>
              <path d="M20 18 L20 52 L31 52 C44 52 52 45 52 35 C52 25 44 18 31 18 Z" fill={B.navy}/>
              <path d="M18 48 C24 38 38 26 60 14 C50 24 40 33 34 42 C29 48 22 53 18 55 Z" fill={B.gold} opacity="0.9"/>
            </svg>
            <div>
              <div style={{ color:B.white, fontSize:"14px", fontWeight:"800", letterSpacing:"1px", fontFamily:"'Playfair Display',serif" }}>DADUDAYAL</div>
              <div style={{ color:B.copper, fontSize:"9px", letterSpacing:"2px" }}>INTERIOR DESIGNER</div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ padding:"12px 0", flex:1 }}>
          {NAV_ITEMS.map(item => (
            <div
              key={item.id}
              onClick={() => go(item.path)}
              style={{
                display:"flex", alignItems:"center", gap:"12px",
                padding:"11px 20px", cursor:"pointer", transition:"background .15s",
                color: active === item.id ? B.white : "#94A3B8",
                fontSize:"13.5px", fontWeight:"500",
                background: active === item.id ? B.copper : "transparent",
                WebkitTapHighlightColor:"transparent",
              }}
              onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.background = B.navyHover; }}
              onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize:"16px", width:"20px", textAlign:"center" }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* User */}
        <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,.08)", display:"flex", alignItems:"center", gap:"10px" }}>
          <Avatar initials="AD" size={34}/>
          <div>
            <div style={{ color:B.white, fontSize:"13px", fontWeight:"600" }}>Admin</div>
            <div style={{ color:"#64748B", fontSize:"11px" }}>admin@dadudayal.com</div>
          </div>
        </div>
      </div>

      {/* Bottom nav (mobile) — rendered outside sidebar panel */}
    </>
  );
}

// ── Bottom nav exported separately so each screen can use it ──
export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const active   = BOTTOM_NAV.find(n => location.pathname.startsWith(n.path))?.id || "dashboard";

  return (
    <div style={{ display:"flex", background:B.white, borderTop:"1px solid #E2E8F0", position:"sticky", bottom:0, zIndex:50 }}>
      {BOTTOM_NAV.map(item => (
        <button
          key={item.id}
          onClick={() => navigate(item.path)}
          style={{
            flex:1, display:"flex", flexDirection:"column", alignItems:"center",
            padding:"8px 4px", fontSize:"10px", fontWeight:"500", cursor:"pointer",
            gap:"3px", border:"none", background:"none", fontFamily:"inherit",
            color: active === item.id ? B.copper : "#718096",
            WebkitTapHighlightColor:"transparent",
          }}
        >
          <span style={{ fontSize:"18px" }}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}