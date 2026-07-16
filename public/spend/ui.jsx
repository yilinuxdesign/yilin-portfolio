// Spend Summary — shared UI atoms, icons, chrome
const SS = {
  FILL: "#0d5fa6",      // filled buttons / selected chips
  LINK: "#1071b8",      // text links
  INK: "#2d2d2d",
  GRAY: "#6b7280",
  FAINT: "#9aa3ad",
  LINE: "#e4e7eb",
  BG: "#f1f2f4",
  FONT: '"Interstate", "Helvetica Neue", Arial, system-ui, sans-serif',
};

// ── Icons ──
const IconChevL = ({ s = 22, c = SS.LINK }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const IconChevR = ({ s = 20, c = SS.FAINT }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const IconChevDown = ({ s = 16, c = SS.LINK }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 9l7 7 7-7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const IconClose = ({ s = 20, c = SS.GRAY }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke={c} strokeWidth="1.8" strokeLinecap="round" /></svg>
);
const IconInfo = ({ s = 40, c = "#8a9099" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10.2" stroke={c} strokeWidth="1.4" /><path d="M12 11v6" stroke={c} strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="7.6" r="1.1" fill={c} /></svg>
);
const IconWarn = ({ s = 40, c = "#8a9099" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 3 2.5 20h19L12 3Z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" /><path d="M12 10v5" stroke={c} strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="17.4" r="1" fill={c} /></svg>
);

// ── iOS status bar ──
function StatusBar({ bg = "transparent", fg = "#000" }) {
  return (
    <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px 0 26px", flexShrink: 0, background: bg }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: fg, letterSpacing: 0.3 }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">{[0,1,2,3].map(i=>(<rect key={i} x={i*4.5} y={9-(i+1)*2} width="3" height={(i+1)*2+1} rx="0.6" fill={fg} />))}</svg>
        <svg width="16" height="11" viewBox="0 0 16 12" fill="none"><path d="M8 11.2 1 4.5a10 10 0 0 1 14 0L8 11.2Z" fill={fg} /></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={fg} opacity="0.4" /><rect x="2" y="2" width="17" height="8" rx="1.5" fill={fg} /><rect x="23" y="4" width="1.6" height="4" rx="0.8" fill={fg} opacity="0.4" /></svg>
      </div>
    </div>
  );
}

// ── Nav bar ──
function NavBar({ title, onBack, right, onRight, rightColor }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "4px 12px 10px", flexShrink: 0, gap: 4 }}>
      <button onClick={onBack} style={{ width: 40, height: 32, border: "none", background: "none", padding: 0, display: "flex", alignItems: "center", cursor: "pointer" }} aria-label="Back">
        <IconChevL />
      </button>
      <span style={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: 700, color: SS.INK }}>{title}</span>
      <div style={{ width: 64, display: "flex", justifyContent: "flex-end" }}>
        {right && (
          <button onClick={onRight} style={{ border: "none", background: "none", padding: "4px 2px", fontSize: 15, color: rightColor || SS.LINK, cursor: "pointer", fontFamily: SS.FONT, fontWeight: 400 }}>{right}</button>
        )}
      </div>
    </div>
  );
}

// ── Time-period chip ──
function Chip({ label, active, onClick, block }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 14px", borderRadius: 18, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
      fontFamily: SS.FONT, whiteSpace: "nowrap", flex: block ? 1 : "none", scrollSnapAlign: "start",
      border: `1px solid ${SS.FILL}`,
      background: active ? SS.FILL : "#fff", color: active ? "#fff" : SS.FILL,
    }}>{label}</button>
  );
}

// ── Category row ──
function CategoryRow({ cat, onClick, tile }) {
  const credit = String(cat.amount).startsWith("-");
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left",
      cursor: "pointer", fontFamily: SS.FONT,
      ...(tile ? {
        background: "#fff", border: `1px solid ${SS.LINE}`, borderRadius: 10,
        padding: "13px 12px 13px 14px", marginBottom: 10,
      } : {
        background: "none", border: "none", borderBottom: `1px solid ${SS.LINE}`,
        padding: "14px 4px 14px 0",
      }),
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: SS.INK }}>{cat.name}</span>
          <span style={{ fontSize: 12, color: SS.GRAY, whiteSpace: "nowrap" }}>{cat.txns} transaction{cat.txns === 1 ? "" : "s"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 2 }}>
          <span style={{ fontSize: 12.5, color: SS.GRAY }}>{cat.pct}%</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: credit ? "#1f8a4c" : SS.INK, whiteSpace: "nowrap" }}>{cat.amount}</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: "#eef0f3", marginTop: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.min(100, cat.pct)}%`, background: cat.color, borderRadius: 2 }} />
        </div>
      </div>
      <IconChevR c={SS.LINK} />
    </button>
  );
}

// ── Horizontally scrollable row (drag + wheel, scrollbar hidden) ──
function HScroll({ children, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    let down = false, moved = false, startX = 0, startL = 0, snapTimer = 0;
    // smooth-snap to the nearest chip's left edge
    const snapToNearest = () => {
      const pad = 16;
      const target = el.scrollLeft + pad;
      let best = null, bestD = Infinity;
      for (const ch of el.children) {
        const d = Math.abs(ch.offsetLeft - target);
        if (d < bestD) { bestD = d; best = ch; }
      }
      if (best) { el.style.scrollBehavior = "smooth"; el.scrollTo({ left: best.offsetLeft - pad }); }
    };
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
        el.style.scrollBehavior = "auto"; el.scrollLeft += e.deltaY; e.preventDefault();
        clearTimeout(snapTimer); snapTimer = setTimeout(snapToNearest, 120);
      }
    };
    const onDown = (e) => { down = true; moved = false; startX = e.clientX; startL = el.scrollLeft; el.style.scrollSnapType = "none"; el.style.scrollBehavior = "auto"; };
    const onMove = (e) => { if (!down) return; const dx = e.clientX - startX; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = startL - dx; };
    const onUp = () => { if (!down) return; down = false; el.style.scrollSnapType = "x proximity"; snapToNearest(); };
    const onClick = (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      clearTimeout(snapTimer);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);
  return (
    <div ref={ref} className="noscroll" style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto", WebkitOverflowScrolling: "touch", cursor: "grab", scrollSnapType: "x proximity", scrollBehavior: "auto", scrollPaddingLeft: 16, ...style }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  SS, IconChevL, IconChevR, IconChevDown, IconClose, IconInfo, IconWarn,
  StatusBar, NavBar, Chip, CategoryRow, HScroll,
});
