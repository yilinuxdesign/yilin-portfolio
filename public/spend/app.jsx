// Spend Summary — app shell + router
const { useState, useCallback } = React;

const DEFAULT_STATE = {
  mode: "period",          // period | dateRange | statement
  period: "Current month",
  dateRange: null,
  statement: null,
  categories: [],          // selected category names
  cardmember: "All",
  activeCat: null,
};

function PhoneShell({ children }) {
  return (
    <div style={{ width: 372, flexShrink: 0 }}>
      <div style={{ borderRadius: 46, padding: 11, background: "#0c0c0d" }}>
        <div style={{ position: "relative", borderRadius: 36, overflow: "hidden", background: "#fff", height: 760, display: "flex", flexDirection: "column", fontFamily: SS.FONT, color: SS.INK }}>
          <div style={{ position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)", width: 108, height: 26, borderRadius: 14, background: "#0c0c0d", zIndex: 60 }} />
          {children}
          <div style={{ position: "absolute", bottom: 7, left: "50%", transform: "translateX(-50%)", width: 128, height: 5, borderRadius: 3, background: "#0c0c0d", zIndex: 60 }} />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [route, setRoute] = useState("landing");
  const [stack, setStack] = useState([]);
  const [sheet, setSheet] = useState(null);
  const [state, setState] = useState(DEFAULT_STATE);

  const go = useCallback((r) => { setStack((s) => [...s, route]); setRoute(r); }, [route]);
  const back = useCallback(() => { setStack((s) => { if (!s.length) { setRoute("landing"); return s; } const n = [...s]; setRoute(n.pop()); return n; }); }, []);
  const set = useCallback((patch) => setState((s) => ({ ...s, ...patch })), []);
  const reset = useCallback(() => setState(DEFAULT_STATE), []);
  const openSheet = useCallback((s) => setSheet(s), []);
  const closeSheet = useCallback(() => setSheet(null), []);
  const openCategory = useCallback((cat) => { setState((s) => ({ ...s, activeCat: cat })); setStack((st) => [...st, route]); setRoute("category"); }, [route]);

  const ctx = { state, set, reset, go, back, openSheet, closeSheet, openCategory, setRoute, go2: setRoute };

  const SCREENS = {
    home: () => <HomeStub ctx={ctx} />,
    landing: window.Landing,
    filter: window.FilterScreen,
    filtered: window.FilteredResults,
    category: window.CategoryDetail,
    txn: window.TransactionDetail,
    error: window.ErrorState,
  };
  const Screen = SCREENS[route] || window.Landing;

  const SHEETS = {
    card: window.CardSheet,
    category: window.CategorySheet,
    statement: window.StatementSheet,
    cardmember: window.CardmemberSheet,
    date: window.DateSheet,
    sort: window.SortSheet,
  };
  const SheetComp = sheet ? SHEETS[sheet] : null;

  const EMBED = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("embed");

  React.useEffect(() => {
    if (EMBED) {
      document.documentElement.style.background = "transparent";
      document.body.style.background = "transparent";
    }
  }, [EMBED]);

  return (
    <div style={{ minHeight: "100vh", background: EMBED ? "transparent" : "#cfd3d8", display: "flex", flexDirection: "column", alignItems: "center", padding: EMBED ? "0 0 18px" : "44px 20px 80px", boxSizing: "border-box" }}>
      {!EMBED && (
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#5a626b", fontFamily: SS.FONT }}>Citi Mobile · Spend Summary</div>
        <div style={{ fontSize: 13, color: "#7b828b", marginTop: 6, fontFamily: SS.FONT }}>Interactive prototype — tap through the filter & drill-down flow</div>
      </div>
      )}
      <PhoneShell>
        <window.StatusBar />
        <Screen ctx={ctx} />
        {SheetComp && <SheetComp ctx={ctx} />}
      </PhoneShell>
      <div style={{ display: "flex", gap: 10, marginTop: EMBED ? 20 : 26, flexWrap: "wrap", justifyContent: "center" }}>
        {[["Landing","landing"],["Filter","filter"],["Results","filtered"],["Category","category"],["Transaction","txn"],["Error state","error"]].map(([l, r]) => (
          <button key={r} onClick={() => { setStack([]); setRoute(r); setSheet(null); }} style={{ padding: "7px 14px", borderRadius: 16, border: "1px solid #aab0b8", background: route === r ? "#0d5fa6" : "#fff", color: route === r ? "#fff" : "#3a4049", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: SS.FONT }}>{l}</button>
        ))}
      </div>
    </div>
  );
}

function HomeStub({ ctx }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24, background: "#f4f5f7" }}>
      <p style={{ fontSize: 14, color: SS.GRAY, textAlign: "center", margin: 0 }}>Account home</p>
      <button onClick={() => ctx.go2("landing")} style={{ background: SS.FILL, color: "#fff", border: "none", borderRadius: 6, padding: "12px 22px", fontSize: 14, fontWeight: 700, fontFamily: SS.FONT, cursor: "pointer" }}>Open Spend Summary</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
