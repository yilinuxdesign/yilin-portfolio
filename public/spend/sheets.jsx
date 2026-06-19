// Spend Summary — bottom sheets / modals
const Radio = ({ on }) => (
  <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${on ? SS.FILL : "#b8c0c9"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    {on && <span style={{ width: 9, height: 9, borderRadius: "50%", background: SS.FILL }} />}
  </span>
);

function Sheet({ title, onClose, children, footer }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", justifyContent: "flex-end", fontFamily: SS.FONT }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
      <div style={{ position: "relative", background: "#fff", borderRadius: "14px 14px 0 0", maxHeight: "88%", display: "flex", flexDirection: "column", boxShadow: "0 -8px 30px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 10px" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: SS.INK }}>{title}</span>
          <button onClick={onClose} style={{ border: "none", background: "none", padding: 2, cursor: "pointer", display: "flex" }}><window.IconClose /></button>
        </div>
        <div style={{ overflowY: "auto", padding: "0 18px", minHeight: 0 }}>{children}</div>
        <div style={{ padding: "14px 18px 22px", flexShrink: 0 }}>{footer}</div>
      </div>
    </div>
  );
}

const OKBtn = ({ onClick, label = "OK" }) => (
  <button onClick={onClick} style={{ width: "100%", background: SS.FILL, color: "#fff", border: "none", borderRadius: 6, padding: "13px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: SS.FONT }}>{label}</button>
);
const CancelBtn = ({ onClick }) => (
  <div style={{ textAlign: "center", marginTop: 12 }}>
    <button onClick={onClick} style={{ border: "none", background: "none", color: SS.LINK, fontSize: 14, fontWeight: 700, cursor: "pointer", textDecoration: "underline", fontFamily: SS.FONT }}>Cancel</button>
  </div>
);

function RadioList({ options, value, onChange }) {
  return (
    <div>
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", padding: "12px 0", border: "none", background: "none", borderBottom: `1px solid ${SS.LINE}`, borderBottomStyle: "solid", cursor: "pointer", fontFamily: SS.FONT }}>
          <Radio on={value === o} />
          <span style={{ fontSize: 13.5, color: SS.INK }}>{o}</span>
        </button>
      ))}
    </div>
  );
}

// ── Card selector ──
function CardSheet({ ctx }) {
  const [sel, setSel] = React.useState(window.SPEND.cards[1].label);
  return (
    <Sheet title="Select card" onClose={ctx.closeSheet} footer={<><OKBtn label="Apply" onClick={ctx.closeSheet} /><CancelBtn onClick={ctx.closeSheet} /></>}>
      <RadioList options={window.SPEND.cards.map((c) => c.label)} value={sel} onChange={setSel} />
    </Sheet>
  );
}

// ── Spend category multi-select ──
function CategorySheet({ ctx }) {
  const [sel, setSel] = React.useState(ctx.state.categories);
  const chips = window.SPEND.catChips;
  const toggle = (c) => {
    if (c === "All") { setSel([]); return; }
    setSel((s) => s.includes(c) ? s.filter((x) => x !== c) : [...s, c]);
  };
  const apply = () => { ctx.set({ categories: sel }); ctx.closeSheet(); };
  return (
    <Sheet title="Select spend category" onClose={ctx.closeSheet} footer={<><OKBtn onClick={apply} /><CancelBtn onClick={ctx.closeSheet} /></>}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingBottom: 8 }}>
        {chips.map((c) => {
          const active = c === "All" ? sel.length === 0 : sel.includes(c);
          return (
            <button key={c} onClick={() => toggle(c)} style={{ padding: "6px 12px", borderRadius: 16, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: SS.FONT, border: `1px solid ${SS.FILL}`, background: active ? SS.FILL : "#fff", color: active ? "#fff" : SS.FILL }}>{c}</button>
          );
        })}
      </div>
    </Sheet>
  );
}

// ── Statement selector ──
function StatementSheet({ ctx }) {
  const [sel, setSel] = React.useState(ctx.state.statement || window.SPEND.statements[0]);
  const apply = () => { ctx.set({ mode: "statement", statement: sel }); ctx.closeSheet(); };
  return (
    <Sheet title="Select a statement date" onClose={ctx.closeSheet} footer={<><OKBtn onClick={apply} /><CancelBtn onClick={ctx.closeSheet} /></>}>
      <RadioList options={window.SPEND.statements} value={sel} onChange={setSel} />
    </Sheet>
  );
}

// ── Cardmember selector ──
function CardmemberSheet({ ctx }) {
  const [sel, setSel] = React.useState(ctx.state.cardmember);
  const apply = () => { ctx.set({ cardmember: sel }); ctx.closeSheet(); };
  return (
    <Sheet title="Select a cardmember" onClose={ctx.closeSheet} footer={<><OKBtn onClick={apply} /><CancelBtn onClick={ctx.closeSheet} /></>}>
      <RadioList options={window.SPEND.cardmembers} value={sel} onChange={setSel} />
    </Sheet>
  );
}

// ── Sort sheet ──
function SortSheet({ ctx }) {
  const [sel, setSel] = React.useState(window.SPEND.sorts[0]);
  return (
    <Sheet title="Sort by" onClose={ctx.closeSheet} footer={<><OKBtn label="Apply" onClick={ctx.closeSheet} /><CancelBtn onClick={ctx.closeSheet} /></>}>
      <RadioList options={window.SPEND.sorts} value={sel} onChange={setSel} />
    </Sheet>
  );
}

// ── Date range calendar (December 2025; Dec 1 = Monday) ──
function DateSheet({ ctx }) {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const lead = 1; // Dec 1 2025 is Monday → one blank cell after Sunday col
  const fmt = (d) => `12/${String(d).padStart(2, "0")}/2025`;
  const pick = (d) => {
    if (start == null || (start != null && end != null)) { setStart(d); setEnd(null); }
    else if (d < start) { setStart(d); }
    else { setEnd(d); }
  };
  const inRange = (d) => start != null && end != null && d >= start && d <= end;
  const isEdge = (d) => d === start || d === end;
  const apply = () => {
    if (start == null) return;
    const label = end != null ? `${fmt(start)} - ${fmt(end)}` : fmt(start);
    ctx.set({ mode: "dateRange", dateRange: label }); ctx.closeSheet();
  };
  return (
    <Sheet title="Start date" onClose={ctx.closeSheet} footer={<><OKBtn label="Apply" onClick={apply} /><CancelBtn onClick={ctx.closeSheet} /></>}>
      <div style={{ display: "flex", gap: 40, marginBottom: 14 }}>
        <div><div style={{ fontSize: 11, color: SS.GRAY }}>Start Date</div><div style={{ fontSize: 14, fontWeight: 700, color: SS.INK }}>{start != null ? fmt(start) : "--"}</div></div>
        <div><div style={{ fontSize: 11, color: SS.GRAY }}>End Date</div><div style={{ fontSize: 14, fontWeight: 700, color: SS.INK }}>{end != null ? fmt(end) : "--"}</div></div>
      </div>
      <div style={{ textAlign: "center", fontSize: 12.5, fontWeight: 700, color: SS.INK, marginBottom: 10 }}>Month and Year</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <window.IconChevL s={18} />
        <span style={{ fontSize: 13.5, fontWeight: 700, color: SS.LINK }}>December 2025</span>
        <window.IconChevR s={18} c={SS.LINK} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", textAlign: "center", fontSize: 11, color: SS.GRAY, marginBottom: 4 }}>
        {["S","M","T","W","T","F","S"].map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px 0", paddingBottom: 8 }}>
        {Array.from({ length: lead }).map((_, i) => <div key={"b" + i} />)}
        {days.map((d) => (
          <button key={d} onClick={() => pick(d)} style={{
            height: 34, border: "none", cursor: "pointer", fontFamily: SS.FONT, fontSize: 13,
            background: isEdge(d) ? SS.FILL : inRange(d) ? "#d7e6f4" : "transparent",
            color: isEdge(d) ? "#fff" : SS.INK,
            borderRadius: isEdge(d) ? 6 : 0, fontWeight: isEdge(d) ? 700 : 400,
          }}>{d}</button>
        ))}
      </div>
    </Sheet>
  );
}

Object.assign(window, { CardSheet, CategorySheet, StatementSheet, CardmemberSheet, SortSheet, DateSheet });
