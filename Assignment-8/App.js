import { useState, useEffect, useRef } from "react";

const neu = {
  bg: "#e0e5ec", s1: "#a3b1c6", s2: "#ffffff",
  accent: "#6c63ff", accentL: "#8b85ff",
  danger: "#ff6b6b", ok: "#43d9ad",
  text: "#2d3748", muted: "#718096",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #e0e5ec; font-family: 'Nunito', sans-serif; color: #2d3748; min-height: 100vh; }

  .app { max-width: 1100px; margin: 0 auto; padding: 2rem; }

  .header { text-align: center; margin-bottom: 2.5rem; }
  .header h1 { font-size: 2.4rem; font-weight: 800; letter-spacing: -1px; margin-bottom: .4rem; }
  .header h1 span { color: #6c63ff; }
  .header p { color: #718096; font-size: .9rem; font-family: 'JetBrains Mono', monospace; }

  .neu-flat    { background: #e0e5ec; border-radius: 16px; box-shadow:  6px  6px 14px #a3b1c6, -6px -6px 14px #ffffff; }
  .neu-pressed { background: #e0e5ec; border-radius: 16px; box-shadow: inset 4px 4px 10px #a3b1c6, inset -4px -4px 10px #ffffff; }

  .neu-btn {
    background: #e0e5ec; border: none; border-radius: 12px;
    padding: .55rem 1.2rem; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: .85rem;
    cursor: pointer; transition: all .15s; color: #2d3748;
    box-shadow: 4px 4px 10px #a3b1c6, -4px -4px 10px #ffffff;
  }
  .neu-btn:active { box-shadow: inset 3px 3px 7px #a3b1c6, inset -3px -3px 7px #ffffff; }
  .neu-btn.accent { background: #6c63ff; color: #fff; box-shadow: 4px 4px 12px rgba(108,99,255,.4), -2px -2px 8px #ffffff; }
  .neu-btn.accent:hover { background: #8b85ff; }
  .neu-btn.danger { color: #ff6b6b; }
  .neu-btn.danger:hover { color: #c0392b; }

  .neu-input {
    background: #e0e5ec; border: none; border-radius: 12px;
    padding: .65rem 1rem; font-family: 'Nunito', sans-serif; font-size: .9rem; color: #2d3748;
    width: 100%; box-shadow: inset 3px 3px 8px #a3b1c6, inset -3px -3px 8px #ffffff;
    outline: none; transition: box-shadow .2s;
  }
  .neu-input:focus { box-shadow: inset 4px 4px 10px #a3b1c6, inset -4px -4px 10px #ffffff, 0 0 0 2px rgba(108,99,255,.27); }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
  @media(max-width:700px){ .grid-2 { grid-template-columns: 1fr; } }
  .card { padding: 1.5rem; }
  .card-title { font-size: .7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #6c63ff; margin-bottom: 1rem; }

  .stats-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; margin-bottom: 1.5rem; }
  .stat-card { padding: 1.2rem 1rem; text-align: center; }
  .stat-value { font-size: 2rem; font-weight: 800; color: #6c63ff; line-height: 1; }
  .stat-label { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #718096; margin-top: .3rem; }

  .pills { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: .8rem; min-height: 1.8rem; }
  .pill {
    background: #e0e5ec; border-radius: 999px; padding: .25rem .75rem;
    font-size: .75rem; font-weight: 700; font-family: 'JetBrains Mono', monospace;
    box-shadow: 2px 2px 6px #a3b1c6, -2px -2px 6px #ffffff;
    display: flex; align-items: center; gap: .4rem;
  }
  .pill.course { color: #6c63ff; }
  .pill.unique { color: #43d9ad; }
  .pill-x { cursor: pointer; color: #718096; font-size: .8rem; line-height:1; }
  .pill-x:hover { color: #ff6b6b; }

  .form-row { display: flex; gap: .7rem; margin-bottom: .8rem; }
  .form-row .neu-input { flex: 1; }

  .combo-wrap { position: relative; flex: 1; }
  .combo-input-row { display: flex; gap: .5rem; margin-bottom: .7rem; }

  .dropdown {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 200;
    background: #e0e5ec; border-radius: 12px;
    box-shadow: 8px 8px 20px #a3b1c6, -4px -4px 12px #ffffff;
    overflow: hidden; max-height: 190px; overflow-y: auto;
  }
  .dropdown::-webkit-scrollbar { width: 4px; }
  .dropdown::-webkit-scrollbar-thumb { background: #a3b1c6; border-radius: 999px; }

  .dd-item {
    padding: .55rem 1rem; font-size: .85rem; font-family: 'JetBrains Mono', monospace;
    font-weight: 600; color: #2d3748; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between; transition: background .1s;
  }
  .dd-item:hover { background: rgba(108,99,255,.08); color: #6c63ff; }
  .dd-item.new-course { color: #43d9ad; border-top: 1px solid rgba(163,177,198,.25); font-style: italic; }
  .dd-item.new-course:hover { background: rgba(67,217,173,.08); }
  .dd-item.disabled { opacity: .4; cursor: not-allowed; pointer-events: none; }
  .dd-badge {
    font-size: .65rem; padding: .1rem .45rem; border-radius: 999px;
    background: #e0e5ec; box-shadow: 1px 1px 4px #a3b1c6, -1px -1px 4px #ffffff; color: #718096;
  }

  .filter-bar { display: flex; gap: .6rem; flex-wrap: wrap; margin-bottom: 1.5rem; align-items: center; }
  .filter-bar .neu-input { max-width: 260px; }
  .filter-label { font-size: .78rem; font-weight: 700; color: #718096; text-transform: uppercase; letter-spacing: 1px; }
  .complexity-badge {
    margin-left: auto; font-family: 'JetBrains Mono', monospace; font-size: .72rem; font-weight: 600;
    color: #43d9ad; background: #e0e5ec; padding: .3rem .8rem; border-radius: 999px;
    box-shadow: 2px 2px 6px #a3b1c6, -2px -2px 6px #ffffff;
  }

  .section-title { font-size: .7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #718096; margin-bottom: 1rem; }
  .student-list { display: flex; flex-direction: column; gap: 1rem; }
  .student-card { padding: 1.2rem 1.4rem; display: flex; align-items: center; gap: 1rem; transition: box-shadow .2s; }
  .student-card:hover { box-shadow: 8px 8px 18px #a3b1c6, -8px -8px 18px #ffffff; }
  .avatar {
    width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0;
    background: #e0e5ec; box-shadow: 3px 3px 8px #a3b1c6, -3px -3px 8px #ffffff;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; font-weight: 800; color: #6c63ff;
  }
  .student-info { flex: 1; min-width: 0; }
  .student-name { font-weight: 800; font-size: 1rem; margin-bottom: .3rem; }
  .student-meta { font-size: .75rem; color: #718096; font-family: 'JetBrains Mono', monospace; margin-bottom: .4rem; }
  .gpa-bar-wrap { width: 100%; height: 6px; border-radius: 999px; background: #e0e5ec; box-shadow: inset 2px 2px 5px #a3b1c6, inset -2px -2px 5px #ffffff; overflow: hidden; }
  .gpa-bar { height: 100%; border-radius: 999px; transition: width .5s ease; }
  .student-right { display: flex; flex-direction: column; align-items: flex-end; gap: .5rem; flex-shrink: 0; }
  .gpa-badge {
    font-family: 'JetBrains Mono', monospace; font-weight: 600; font-size: .8rem;
    padding: .2rem .6rem; border-radius: 8px;
    background: #e0e5ec; box-shadow: 2px 2px 6px #a3b1c6, -2px -2px 6px #ffffff;
  }
  .empty { text-align: center; padding: 3rem 1rem; color: #718096; font-size: .9rem; }
  .empty .icon { font-size: 2.5rem; margin-bottom: .5rem; }

  .sid-row { display: flex; justify-content: space-between; font-size: .82rem; padding: .35rem 0; border-bottom: 1px solid rgba(163,177,198,.18); color: #718096; }
  .sid-row b { color: #2d3748; font-family: 'JetBrains Mono', monospace; }

  .console-box { padding: 1.2rem 1.4rem; font-family: 'JetBrains Mono', monospace; font-size: .78rem; }
  .cl { margin-bottom: .3rem; color: #718096; }
  .ck { color: #43d9ad; }
  .cv { color: #8b85ff; }
  .cc { color: #a0aec0; font-style: italic; }
`;

// ── seed data ─────────────────────────────────────────────────────────────
const SEED = [
  { id: 1, rollNo: "CS2401", name: "Arjun Sharma", courses: new Set(["React","Node.js","Algorithms"]), gpa: 3.9 },
  { id: 2, rollNo: "CS2402", name: "Priya Patel",  courses: new Set(["React","Python","ML Basics"]),   gpa: 3.6 },
  { id: 3, rollNo: "CS2403", name: "Kiran Das",    courses: new Set(["Node.js","Databases","DevOps"]), gpa: 3.4 },
  { id: 4, rollNo: "CS2404", name: "Sneha Reddy",  courses: new Set(["React","Python","DataViz"]),     gpa: 3.8 },
  { id: 5, rollNo: "CS2405", name: "Rahul Menon",  courses: new Set(["Algorithms","ML Basics"]),       gpa: 3.2 },
];
let UID = 6;

// ── helpers ───────────────────────────────────────────────────────────────
const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const gpaColor = g => g >= 3.7 ? neu.ok : g >= 3.3 ? neu.accent : neu.danger;

function logComplexity(n, term) {
  console.group("%c⏱ Complexity — filterByCourse (case-insensitive)", "color:#6c63ff;font-weight:bold");
  console.log(`%c  n=${n} students | query="${term}"`, "color:#43d9ad");
  console.log("%c  students.filter(s => [...s.courses].some(c => c.toLowerCase() === term))", "color:#a0aec0");
  console.log("%c  .filter()  → O(n)", "color:#718096");
  console.log("%c  .some()    → O(m)  m = courses/student (small constant)", "color:#718096");
  console.log("%c  .sort()    → O(n log n)  dominates overall", "color:#718096");
  console.log("%c  Total: O(n log n)", "color:#6c63ff;font-weight:bold");
  console.groupEnd();
}

// ── main component ────────────────────────────────────────────────────────
export default function App() {
  const [students, setStudents] = useState(SEED);
  const [name,     setName]     = useState("");
  const [rollNo,   setRollNo]   = useState("");
  const [gpa,      setGpa]      = useState("");
  const [pending,  setPending]  = useState(new Set());
  const [cInput,   setCInput]   = useState("");
  const [ddOpen,   setDdOpen]   = useState(false);
  const [removeId, setRemoveId] = useState("");
  const [filter,   setFilter]   = useState("");
  const comboRef = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    const h = e => { if (comboRef.current && !comboRef.current.contains(e.target)) setDdOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── derived ──────────────────────────────────────────────────────────
  // Map keyed by rollNo for O(1) lookup
  const studentMap = new Map(students.map(s => [s.rollNo.toLowerCase(), s]));

  const allCourses = students.reduce((acc, s) => {
    [...s.courses].forEach(c => acc.add(c));
    return acc;
  }, new Set());

  const ddSuggestions = [...allCourses].sort()
    .filter(c => c.toLowerCase().includes(cInput.toLowerCase()));

  const isNewCourse = cInput.trim() &&
    ![...allCourses].some(c => c.toLowerCase() === cInput.trim().toLowerCase());

  const norm = filter.trim().toLowerCase();

  // ✅ always spread → filter → sort; never touch state array directly
  const displayed = [...students]
    .filter(s => !norm || [...s.courses].some(c => c.toLowerCase() === norm))
    .sort((a, b) => b.gpa - a.gpa);

  useEffect(() => {
    if (norm) logComplexity(students.length, norm);
  }, [norm, students.length]);

  // ── actions ──────────────────────────────────────────────────────────
  function addStudent() {
    const n = name.trim();
    const r = rollNo.trim();
    const g = parseFloat(gpa);
    if (!n || !r || isNaN(g) || g < 0 || g > 4 || pending.size === 0) return;
    // duplicate roll no check
    if (studentMap.has(r.toLowerCase())) { alert(`Roll No "${r}" already exists!`); return; }
    const student = { id: UID++, rollNo: r, name: n, courses: new Set(pending), gpa: g };
    setStudents(prev => [...prev, student]);
    setName(""); setRollNo(""); setGpa(""); setPending(new Set());
    console.log("%c✅ Student added:", "color:#43d9ad", student);
  }

  function removeStudent() {
    const r = removeId.trim();
    if (!r || !studentMap.has(r.toLowerCase())) { alert(`Roll No "${r}" not found`); return; }
    setStudents(prev => prev.filter(s => s.rollNo.toLowerCase() !== r.toLowerCase()));
    setRemoveId("");
    console.log(`%c🗑 Removed roll no=${r}`, "color:#ff6b6b");
  }

  function addCourse(c) {
    const v = (c !== undefined ? c : cInput).trim();
    if (!v) return;
    if ([...pending].some(p => p.toLowerCase() === v.toLowerCase())) {
      setCInput(""); setDdOpen(false); return;
    }
    setPending(prev => new Set([...prev, v]));
    setCInput(""); setDdOpen(false);
  }

  function removeCourse(c) {
    setPending(prev => { const s = new Set(prev); s.delete(c); return s; });
  }

  // ── render ────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* header */}
        <div className="header">
          <h1>Course <span>Enrollment</span> Dashboard</h1>
          <p>// immutable state · Set uniqueness · Map lookups · O(n log n) sort</p>
        </div>

        {/* stats */}
        <div className="stats-row">
          <div className="stat-card neu-flat">
            <div className="stat-value">{students.length}</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-card neu-flat">
            <div className="stat-value">{allCourses.size}</div>
            <div className="stat-label">Unique Courses</div>
          </div>
          <div className="stat-card neu-flat">
            <div className="stat-value">
              {students.length
                ? (students.reduce((a, s) => a + s.gpa, 0) / students.length).toFixed(2)
                : "—"}
            </div>
            <div className="stat-label">Avg GPA</div>
          </div>
        </div>

        {/* unique courses */}
        <div className="card neu-flat" style={{ marginBottom: "1.5rem" }}>
          <div className="card-title">All Unique Courses (Set → Array)</div>
          <div className="pills">
            {[...allCourses].sort().map(c => (
              <span key={c} className="pill unique">{c}</span>
            ))}
          </div>
        </div>

        {/* add + remove */}
        <div className="grid-2">

          {/* add student */}
          <div className="card neu-flat">
            <div className="card-title">Add Student</div>
            <div className="form-row">
              <input className="neu-input" placeholder="Roll No (e.g. CS2406)"
                value={rollNo} onChange={e => setRollNo(e.target.value)}
                style={{ maxWidth: "140px" }}
                onKeyDown={e => e.key === "Enter" && addStudent()} />
              <input className="neu-input" placeholder="Full name"
                value={name} onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addStudent()} />
              <input className="neu-input" placeholder="GPA" type="number" min="0" max="4" step="0.1"
                value={gpa} onChange={e => setGpa(e.target.value)}
                style={{ maxWidth: "80px" }}
                onKeyDown={e => e.key === "Enter" && addStudent()} />
            </div>

            {/* course combobox */}
            <div className="combo-input-row">
              <div className="combo-wrap" ref={comboRef}>
                <input
                  className="neu-input"
                  placeholder="Search or type course…"
                  value={cInput}
                  onChange={e => { setCInput(e.target.value); setDdOpen(true); }}
                  onFocus={() => setDdOpen(true)}
                  onKeyDown={e => {
                    if (e.key === "Enter") { e.preventDefault(); addCourse(); }
                    if (e.key === "Escape") setDdOpen(false);
                  }}
                />
                {ddOpen && (ddSuggestions.length > 0 || isNewCourse) && (
                  <div className="dropdown">
                    {ddSuggestions.map(c => {
                      const already = [...pending].some(p => p.toLowerCase() === c.toLowerCase());
                      return (
                        <div key={c}
                          className={`dd-item${already ? " disabled" : ""}`}
                          onMouseDown={() => addCourse(c)}>
                          {c}
                          <span className="dd-badge">{already ? "added" : "existing"}</span>
                        </div>
                      );
                    })}
                    {isNewCourse && (
                      <div className="dd-item new-course" onMouseDown={() => addCourse()}>
                        ＋ Create "{cInput.trim()}"
                        <span className="dd-badge">new</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button className="neu-btn" onMouseDown={e => { e.preventDefault(); addCourse(); }}>+</button>
            </div>

            <div className="pills">
              {[...pending].map(c => (
                <span key={c} className="pill course">
                  {c}
                  <span className="pill-x" onClick={() => removeCourse(c)}>✕</span>
                </span>
              ))}
              {pending.size === 0 &&
                <span style={{ fontSize: ".75rem", color: neu.muted }}>No courses added yet</span>}
            </div>

            <button className="neu-btn accent" style={{ width: "100%" }} onClick={addStudent}>
              Enroll Student
            </button>
          </div>

          {/* remove student */}
          <div className="card neu-flat">
            <div className="card-title">Remove Student by Roll No</div>
            <p style={{ fontSize: ".8rem", color: neu.muted, marginBottom: "1rem" }}>
              Uses <span style={{ fontFamily: "JetBrains Mono", color: neu.accent }}>Map.has(rollNo)</span> for O(1) lookup.
            </p>
            {[...students].sort((a, b) => b.gpa - a.gpa).map(s => (
              <div key={s.id} className="sid-row">
                <span><b style={{color: neu.accent}}>{s.rollNo}</b> &nbsp;{s.name}</span>
                <span style={{ fontFamily: "JetBrains Mono", color: neu.accent }}>{s.gpa.toFixed(1)}</span>
              </div>
            ))}
            <div className="form-row" style={{ marginTop: "1rem" }}>
              <input className="neu-input" placeholder="Enter Roll No to remove"
                value={removeId} onChange={e => setRemoveId(e.target.value)}
                onKeyDown={e => e.key === "Enter" && removeStudent()} />
              <button className="neu-btn danger" onClick={removeStudent}>Remove</button>
            </div>
          </div>
        </div>

        {/* filter */}
        <div className="filter-bar">
          <span className="filter-label">Filter by course:</span>
          <input className="neu-input" placeholder="e.g. react  (case-insensitive)"
            value={filter} onChange={e => setFilter(e.target.value)} />
          {filter && <button className="neu-btn" onClick={() => setFilter("")}>Clear</button>}
          <span className="complexity-badge">⏱ O(n log n)</span>
        </div>

        {/* student list */}
        <div className="section-title">
          Students sorted by GPA ↓
          {filter ? ` · filtered by "${filter}" (case-insensitive)` : ""}
          &nbsp;({displayed.length}/{students.length})
        </div>
        <div className="student-list">
          {displayed.length === 0 ? (
            <div className="neu-pressed empty">
              <div className="icon">🎓</div>
              No students match the filter.
            </div>
          ) : displayed.map(s => (
            <div key={s.id} className="student-card neu-flat">
              <div className="avatar">{initials(s.name)}</div>
              <div className="student-info">
                <div className="student-name">{s.name}</div>
                <div className="student-meta">Roll: {s.rollNo} · {s.courses.size} course{s.courses.size !== 1 ? "s" : ""}</div>
                <div className="pills" style={{ marginBottom: ".4rem" }}>
                  {[...s.courses].map(c => (
                    <span key={c} className="pill course" style={{ fontSize: ".7rem", padding: ".15rem .55rem" }}>{c}</span>
                  ))}
                </div>
                <div className="gpa-bar-wrap">
                  <div className="gpa-bar" style={{
                    width: `${(s.gpa / 4) * 100}%`,
                    background: `linear-gradient(90deg,${gpaColor(s.gpa)},${gpaColor(s.gpa)}88)`
                  }} />
                </div>
              </div>
              <div className="student-right">
                <div className="gpa-badge" style={{ color: gpaColor(s.gpa) }}>{s.gpa.toFixed(1)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* complexity panel */}
        <div style={{ marginTop: "2rem" }}>
          <div className="section-title">Time Complexity Analysis</div>
          <div className="console-box neu-pressed">
            <div className="cl"><span className="cc">// filterByCourse — case-insensitive, then sort</span></div>
            <div className="cl"><span className="ck">[...students]</span>  →  <span className="cv">O(n)</span>  <span className="cc">// shallow copy — never mutate state</span></div>
            <div className="cl"><span className="ck">.filter()</span>      →  <span className="cv">O(n·m)</span>  <span className="cc">// m = courses/student ≈ constant</span></div>
            <div className="cl"><span className="ck">.sort()</span>        →  <span className="cv">O(n log n)</span>  <span className="cc">// GPA descending, dominates</span></div>
            <div style={{ height: ".6rem" }} />
            <div className="cl" style={{ borderTop: "1px solid rgba(163,177,198,.3)", paddingTop: ".5rem" }}>
              <span className="ck">Total: O(n log n)</span>  <span className="cc">// n = {students.length} students currently</span>
            </div>
            <div style={{ height: ".5rem" }} />
            <div className="cl"><span className="cc">// Set.has() = O(1) but case-sensitive → .some() needed for case-insensitive</span></div>
            <div className="cl"><span className="cc">// ▶ Open DevTools Console to see live logs when filtering</span></div>
          </div>
        </div>

      </div>
    </>
  );
}
