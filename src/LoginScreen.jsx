import { useState } from "react";
import supabase from "./supabaseClient";

const B = {
  darkBrown:   "#4A2010",
  copper:      "#C87941",
  gold:        "#E8A050",
  orange:      "#C85A1A",
  orangeLight: "#FDF0E8",
  navy:        "#1A2035",
  white:       "#FFFFFF",
  pageBg:      "#F4F6F9",
  border:      "#E2E8F0",
  textMain:    "#1A202C",
  textSub:     "#718096",
  green:       "#2E7D32",
  greenLight:  "#E8F5E9",
  red:         "#C62828",
  redLight:    "#FFEBEE",
};

function DadudayalLogo() {
  return (
    <svg width="260" height="70" viewBox="0 0 260 70" fill="none">
      <path d="M8 8 L8 62 L28 62 C48 62 58 50 58 35 C58 20 48 8 28 8 Z" fill="#4A2010"/>
      <path d="M16 16 L16 54 L27 54 C40 54 48 46 48 35 C48 24 40 16 27 16 Z" fill="#FFFFFF"/>
      <path d="M14 48 C20 38 32 28 52 18 C44 26 36 34 30 42 C26 47 20 52 14 54 Z" fill="#E8A050" opacity="0.95"/>
      <path d="M16 52 C22 42 34 31 54 20 C46 29 37 37 31 45 C27 50 21 54 16 56 Z" fill="#C87941" opacity="0.7"/>
      <path d="M28 8 C40 8 52 16 56 28 C50 18 40 12 28 12 Z" fill="#E8A050" opacity="0.5"/>
      <text x="72" y="45" fontFamily="'Playfair Display', serif" fontWeight="900" fontSize="30" letterSpacing="0.5" fill="#4A2010">DADUDAYAL</text>
      <line x1="72" y1="57" x2="88" y2="57" stroke="#4A2010" strokeWidth="1"/>
      <text x="92" y="61" fontFamily="'Playfair Display', serif" fontWeight="500" fontSize="10" letterSpacing="3" fill="#4A2010">INTERIOR DESIGNER</text>
      <line x1="244" y1="57" x2="260" y2="57" stroke="#4A2010" strokeWidth="1"/>
    </svg>
  );
}

const ROLES = [
  {
    id: "admin", label: "Admin", sub: "Full access",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  },
  {
    id: "staff", label: "Staff", sub: "Team member",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
  {
    id: "vendor", label: "Vendor", sub: "Contractor",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  },
];

function FocusInput({ type="text", placeholder, value, onChange, required, extraStyle={} }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type} placeholder={placeholder} value={value}
      onChange={onChange} required={required}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width:"100%", padding:"12px 14px",
        border:`1.5px solid ${focused ? B.copper : B.border}`,
        borderRadius:"10px", fontSize:"14px", fontFamily:"inherit",
        background:B.white, color:B.textMain, outline:"none",
        boxSizing:"border-box", transition:"border-color .15s",
        WebkitAppearance:"none", ...extraStyle,
      }}
    />
  );
}

const EyeIcon = ({ open }) => open
  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

export default function LoginScreen() {
  const [mode, setMode]                     = useState("login");
  const [role, setRole]                     = useState("admin");
  const [fullName, setFullName]             = useState("");
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass]             = useState(false);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState("");
  const [success, setSuccess]               = useState("");

  function switchMode(m) {
    setMode(m); setError(""); setSuccess("");
    setEmail(""); setPassword(""); setConfirmPassword(""); setFullName("");
  }

  // ── SIGN UP → creates user in Supabase Auth ──
  async function handleSignUp(e) {
    e.preventDefault();
    setError(""); setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match."); return;
    }

    setLoading(true);
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });
    setLoading(false);

    if (err) { setError(err.message); return; }

    setSuccess("Account created! Check your email to confirm, then log in.");
    setTimeout(() => switchMode("login"), 3500);
  }

  // ── LOG IN → verifies against Supabase Auth ──
  async function handleLogin(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (err) { setError(err.message); return; }

    setSuccess("Login successful! Redirecting...");
    setTimeout(() => { window.location.href = "/dashboard"; }, 1000);
  }

  const labelSt = {
    fontSize:"11px", fontWeight:"700", color:B.textSub,
    letterSpacing:".06em", display:"block", marginBottom:"7px",
    textTransform:"uppercase",
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        .lr { min-height:100vh; display:flex; background:${B.pageBg}; font-family:'Plus Jakarta Sans','Segoe UI',sans-serif; }

        .lp { display:none; width:44%; background:${B.navy}; flex-direction:column; align-items:center; justify-content:center; padding:48px 44px; position:relative; overflow:hidden; }
        .lp::before { content:''; position:absolute; width:360px; height:360px; border-radius:50%; background:${B.copper}; opacity:.07; top:-110px; right:-110px; }
        .lp::after  { content:''; position:absolute; width:250px; height:250px; border-radius:50%; background:${B.copper}; opacity:.05; bottom:-70px; left:-70px; }

        .rp { flex:1; display:flex; align-items:center; justify-content:center; padding:24px 16px; }
        .card { background:${B.white}; border-radius:20px; padding:28px 22px 24px; width:100%; max-width:430px; box-shadow:0 2px 24px rgba(0,0,0,.08); }
        @media(min-width:900px) { .lp{display:flex;} .rp{padding:40px 48px;} .card{padding:36px 34px 30px;} }

        .modetog { display:flex; background:${B.pageBg}; border-radius:12px; padding:4px; gap:4px; margin-bottom:22px; }
        .modebtn { flex:1; padding:10px; border-radius:9px; border:none; background:transparent; font-family:inherit; font-size:14px; font-weight:600; cursor:pointer; color:${B.textSub}; transition:all .18s; -webkit-tap-highlight-color:transparent; }
        .modebtn.on { background:${B.copper}; color:#fff; box-shadow:0 2px 8px rgba(200,121,65,.35); }

        .rb { flex:1; padding:11px 6px; border-radius:10px; border:2px solid ${B.border}; background:${B.pageBg}; cursor:pointer; text-align:center; display:flex; flex-direction:column; align-items:center; gap:5px; transition:all .15s; -webkit-tap-highlight-color:transparent; }
        .rb.on { border-color:${B.copper}; background:${B.orangeLight}; }

        .pbtn { width:100%; padding:14px; background:${B.copper}; color:#fff; border:none; border-radius:12px; font-family:inherit; font-size:15px; font-weight:700; cursor:pointer; letter-spacing:.02em; transition:background .15s; -webkit-tap-highlight-color:transparent; }
        .pbtn:hover:not(:disabled) { background:${B.orange}; }
        .pbtn:disabled { background:#D4B49A; cursor:not-allowed; }

        .feat { display:flex; align-items:center; gap:14px; padding:12px 16px; border-radius:12px; background:rgba(255,255,255,.06); margin-bottom:8px; }
        .switchbtn { background:none; border:none; color:${B.copper}; font-weight:700; font-size:13px; cursor:pointer; font-family:inherit; padding:0; text-decoration:underline; }
      `}</style>

      <div className="lr">

        {/* LEFT PANEL */}
        <div className="lp">
          <div style={{ marginBottom:"36px", textAlign:"center", position:"relative", zIndex:1 }}>
            <div style={{ marginBottom:"14px" }}>
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                <path d="M10 8 L10 62 L32 62 C54 62 64 50 64 35 C64 20 54 8 32 8 Z" fill={B.copper}/>
                <path d="M20 18 L20 52 L31 52 C44 52 52 45 52 35 C52 25 44 18 31 18 Z" fill={B.navy}/>
                <path d="M18 48 C24 38 38 26 60 14 C50 24 40 33 34 42 C29 48 22 53 18 55 Z" fill={B.gold} opacity="0.9"/>
                <path d="M20 52 C26 42 40 30 62 18 C52 28 42 37 36 46 C31 52 24 56 20 58 Z" fill={B.copper} opacity="0.6"/>
              </svg>
            </div>
            <div style={{ color:B.white, fontSize:"28px", fontWeight:"800", letterSpacing:"2px", fontFamily:"'Playfair Display', serif" }}>DADUDAYAL</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", marginTop:"5px" }}>
              <div style={{ height:"1px", width:"20px", background:B.copper }}/>
              <div style={{ color:B.copper, fontSize:"11px", letterSpacing:"3px", fontFamily:"'Playfair Display', serif" }}>INTERIOR DESIGNER</div>
              <div style={{ height:"1px", width:"20px", background:B.copper }}/>
            </div>
          </div>
          <div style={{ position:"relative", zIndex:1, width:"100%" }}>
            {[["📐","Manage projects & sites"],["📄","Quotations & work orders"],["👷","Vendors & staff tracking"],["📦","Material stock & purchase orders"],["📊","Reports & analytics"]].map(([icon, text], i) => (
              <div key={i} className="feat">
                <span style={{ fontSize:"18px" }}>{icon}</span>
                <span style={{ color:"#CBD5E1", fontSize:"14px", fontWeight:"500" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="rp">
          <div className="card">

            <div style={{ display:"flex", justifyContent:"center", marginBottom:"22px" }}>
              <DadudayalLogo />
            </div>

            {/* Login / Sign Up toggle */}
            <div className="modetog">
              <button className={`modebtn${mode==="login"?" on":""}`} onClick={() => switchMode("login")}>Log In</button>
              <button className={`modebtn${mode==="signup"?" on":""}`} onClick={() => switchMode("signup")}>Sign Up</button>
            </div>

            <div style={{ fontWeight:"700", fontSize:"20px", color:B.textMain, marginBottom:"3px" }}>
              {mode==="login" ? "Welcome back" : "Create your account"}
            </div>
            <div style={{ fontSize:"13px", color:B.textSub, marginBottom:"20px" }}>
              {mode==="login" ? "Sign in to continue to your dashboard" : "Fill in the details below to get started"}
            </div>

            {/* Role selector */}
            <div style={{ marginBottom:"18px" }}>
              <label style={labelSt}>I am a</label>
              <div style={{ display:"flex", gap:"8px" }}>
                {ROLES.map(r => (
                  <button key={r.id} className={`rb${role===r.id?" on":""}`} onClick={() => setRole(r.id)}>
                    <span style={{ color: role===r.id ? B.copper : B.textSub }}>{r.icon}</span>
                    <span style={{ fontSize:"13px", fontWeight:"700", color: role===r.id ? B.darkBrown : B.textMain }}>{r.label}</span>
                    <span style={{ fontSize:"10px", color:B.textSub }}>{r.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={mode==="login" ? handleLogin : handleSignUp}>

              {/* Full name — signup only */}
              {mode==="signup" && (
                <div style={{ marginBottom:"13px" }}>
                  <label style={labelSt}>Full name</label>
                  <FocusInput type="text" placeholder="Your full name" value={fullName} onChange={e=>setFullName(e.target.value)} required/>
                </div>
              )}

              {/* Email */}
              <div style={{ marginBottom:"13px" }}>
                <label style={labelSt}>Email address</label>
                <FocusInput type="email" placeholder="yourname@email.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
              </div>

              {/* Password */}
              <div style={{ marginBottom: mode==="signup" ? "13px" : "8px" }}>
                <label style={labelSt}>Password</label>
                <div style={{ position:"relative" }}>
                  <FocusInput type={showPass?"text":"password"} placeholder={mode==="signup" ? "Min. 6 characters" : "Enter your password"} value={password} onChange={e=>setPassword(e.target.value)} required extraStyle={{ paddingRight:"44px" }}/>
                  <button type="button" onClick={()=>setShowPass(!showPass)} style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:B.textSub, padding:"4px", lineHeight:1 }}>
                    <EyeIcon open={showPass}/>
                  </button>
                </div>
              </div>

              {/* Confirm password — signup only */}
              {mode==="signup" && (
                <div style={{ marginBottom:"20px" }}>
                  <label style={labelSt}>Confirm password</label>
                  <FocusInput type="password" placeholder="Re-enter your password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required/>
                </div>
              )}

              {/* Forgot password — login only */}
              {mode==="login" && (
                <div style={{ textAlign:"right", marginBottom:"20px" }}>
                  <a href="#" style={{ fontSize:"12px", color:B.copper, textDecoration:"none", fontWeight:"600" }}>Forgot password?</a>
                </div>
              )}

              {error && (
                <div style={{ background:B.redLight, border:`1px solid #FFCDD2`, borderRadius:"10px", padding:"10px 14px", fontSize:"13px", color:B.red, marginBottom:"14px", display:"flex", alignItems:"center", gap:"8px" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={B.red} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  {error}
                </div>
              )}
              {success && (
                <div style={{ background:B.greenLight, border:`1px solid #A5D6A7`, borderRadius:"10px", padding:"10px 14px", fontSize:"13px", color:B.green, marginBottom:"14px", display:"flex", alignItems:"center", gap:"8px" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={B.green} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
                  {success}
                </div>
              )}

              <button className="pbtn" type="submit" disabled={loading}>
                {loading ? "Please wait…"
                  : mode==="login"
                    ? `Sign in as ${role.charAt(0).toUpperCase()+role.slice(1)}`
                    : "Create Account"}
              </button>
            </form>

            <div style={{ textAlign:"center", marginTop:"18px", fontSize:"13px", color:B.textSub }}>
              {mode==="login"
                ? <>Don't have an account?{" "}<button className="switchbtn" onClick={()=>switchMode("signup")}>Sign up</button></>
                : <>Already have an account?{" "}<button className="switchbtn" onClick={()=>switchMode("login")}>Log in</button></>
              }
            </div>

          </div>
        </div>
      </div>
    </>
  );
}