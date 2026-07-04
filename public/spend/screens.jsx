// Spend Summary — screens
const { SS } = window;

function CardThumb() {
  return (
    <div style={{ width: 38, height: 25, borderRadius: 4, background: "linear-gradient(135deg,#5b6b7e,#39414d)", flexShrink: 0, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 4, top: 5, width: 9, height: 6, borderRadius: 1, background: "#d8b25a" }} />
    </div>
  );
}

function Disclaimer() {
  return (
    <p style={{ fontSize: 10.5, lineHeight: 1.5, color: SS.GRAY, margin: "18px 0 0", fontFamily: SS.FONT }}>
      Your Spend Summary includes posted transactions for the spend categories displayed but it does not include pending charges. Spend categories with a credit or zero balance will not appear, but any credit balances are included in the total at the top of your Spend Summary. If you earn rewards by category, you should review the Spend Summary separately from the rewards detail page as the categories and/or amount spent by categories may not match.
    </p>
  );
}

function CardRow({ ctx }) {
  return (
    <div style={{ padding: "2px 16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <CardThumb />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: SS.INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{window.SPEND.card.short}</div>
          <button onClick={() => ctx.openSheet("card")} style={{ border: "none", background: "none", padding: "2px 0 0", color: SS.LINK, fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 2, fontFamily: SS.FONT }}>
            Select another card <window.IconChevR s={14} c={SS.LINK} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Landing ──
function Landing({ ctx }) {
  const S = window.SPEND;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", minHeight: 0 }}>
      <window.NavBar title="Spend Summary" onBack={() => ctx.go("home")} right="Filter" onRight={() => ctx.go("filter")} />
      <CardRow ctx={ctx} />
      <window.HScroll style={{ gap: 8, padding: "0 16px 12px", flexShrink: 0, maxWidth: "100%" }}>
        {S.periods.map((p) => (
          <window.Chip key={p} label={p} active={ctx.state.period === p && ctx.state.mode === "period"} onClick={() => ctx.set({ period: p, mode: "period" })} />
        ))}
      </window.HScroll>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px", minHeight: 0, background: SS.BG }}>
        <div style={{ padding: "16px 4px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 12, color: SS.GRAY }}>Total</span>
            <span style={{ fontSize: 12, color: SS.GRAY }}>{S.total.txns}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 3 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: SS.INK }}>{S.total.pct}</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: SS.INK }}>{S.total.amount}</span>
          </div>
        </div>
        {S.categories.map((c) => (
          <window.CategoryRow key={c.name} cat={c} tile onClick={() => ctx.openCategory(c)} />
        ))}
        <Disclaimer />
      </div>
    </div>
  );
}

// ── Filter ──
function FilterScreen({ ctx }) {
  const S = window.SPEND;
  const st = ctx.state;
  const card = { background: "#fff", borderRadius: 8, padding: "14px 14px 16px", marginBottom: 14 };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", minHeight: 0 }}>
      <window.NavBar title="Filter" onBack={() => ctx.go("landing")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 14px 24px", minHeight: 0, background: SS.BG }}>
        <div style={card}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: SS.INK, marginBottom: 10 }}>Time period</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            {S.periods.map((p) => (
              <window.Chip key={p} label={p} active={st.mode === "period" && st.period === p} onClick={() => ctx.set({ mode: "period", period: p })} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: st.mode === "dateRange" || st.mode === "statement" ? 10 : 0 }}>
            <button onClick={() => ctx.openSheet("date")} style={{ flex: 1, padding: "10px 0", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: SS.FONT, border: `1px solid ${SS.FILL}`, background: st.mode === "dateRange" ? SS.FILL : "#fff", color: st.mode === "dateRange" ? "#fff" : SS.FILL }}>Date Range</button>
            <button onClick={() => ctx.openSheet("statement")} style={{ flex: 1, padding: "10px 0", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: SS.FONT, border: `1px solid ${SS.FILL}`, background: st.mode === "statement" ? SS.FILL : "#fff", color: st.mode === "statement" ? "#fff" : SS.FILL }}>Statement</button>
          </div>
          {st.mode === "dateRange" && st.dateRange && (
            <ValueRow label={st.dateRange} onClear={() => ctx.set({ mode: "period" })} />
          )}
          {st.mode === "statement" && st.statement && (
            <ValueRow label={st.statement} onClear={() => ctx.set({ mode: "period" })} />
          )}
        </div>
        <div style={card}>
          <button onClick={() => ctx.openSheet("category")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", border: "none", background: "none", padding: 0, cursor: "pointer", fontFamily: SS.FONT }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: SS.INK }}>Spend category</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, color: SS.GRAY, fontSize: 13 }}>{st.categories.length ? `${st.categories.length} selected` : "All"} <window.IconChevDown c={SS.GRAY} /></span>
          </button>
          {st.categories.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              {st.categories.map((c) => (
                <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 8px 5px 12px", borderRadius: 16, border: `1px solid ${SS.FILL}`, color: SS.FILL, fontSize: 12, fontWeight: 600 }}>
                  {c} <button onClick={() => ctx.set({ categories: st.categories.filter((x) => x !== c) })} style={{ border: "none", background: "none", padding: 0, cursor: "pointer", display: "flex" }}><window.IconClose s={14} c={SS.FILL} /></button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div style={card}>
          <button onClick={() => ctx.openSheet("cardmember")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", border: "none", background: "none", padding: 0, cursor: "pointer", fontFamily: SS.FONT }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: SS.INK }}>Cardmember</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, color: SS.GRAY, fontSize: 13 }}>{st.cardmember} <window.IconChevDown c={SS.GRAY} /></span>
          </button>
        </div>
        <button onClick={() => ctx.go("filtered")} style={{ width: "100%", background: SS.FILL, color: "#fff", border: "none", borderRadius: 6, padding: "13px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: SS.FONT, marginTop: 4 }}>Apply</button>
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button onClick={() => ctx.reset()} style={{ border: "none", background: "none", color: SS.LINK, fontSize: 14, fontWeight: 700, cursor: "pointer", textDecoration: "underline", fontFamily: SS.FONT }}>Reset</button>
        </div>
      </div>
    </div>
  );
}

function ValueRow({ label, onClear }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0 0", borderTop: `1px solid ${SS.LINE}` }}>
      <span style={{ fontSize: 13, color: SS.INK }}>{label}</span>
      <button onClick={onClear} style={{ border: "none", background: "none", padding: 0, cursor: "pointer", display: "flex" }}><window.IconClose s={18} /></button>
    </div>
  );
}

// ── Filtered results ──
function FilteredResults({ ctx }) {
  const S = window.SPEND;
  const st = ctx.state;
  const activeFilters = [];
  if (st.mode === "period") activeFilters.push(st.period);
  if (st.mode === "dateRange" && st.dateRange) activeFilters.push(st.dateRange);
  if (st.mode === "statement" && st.statement) activeFilters.push(st.statement);
  st.categories.forEach((c) => activeFilters.push(c));

  const cats = st.categories.length ? S.categories.filter((c) => st.categories.includes(c.name)) : S.categories.slice(0, 8);
  if (cats.length === 0) return <EmptyState ctx={ctx} chips={activeFilters} />;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", minHeight: 0 }}>
      <window.NavBar title="Filter Results" onBack={() => ctx.go("filter")} right="Cancel" onRight={() => ctx.go("landing")} />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "0 16px 10px", flexShrink: 0 }}>
        {activeFilters.map((f, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 8px 5px 12px", borderRadius: 16, background: SS.FILL, color: "#fff", fontSize: 12, fontWeight: 600 }}>
            {f} <window.IconClose s={13} c="#fff" />
          </span>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px", minHeight: 0, background: SS.BG }}>
        <div style={{ padding: "10px 0 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 11, color: SS.GRAY }}>Total</span>
            <span style={{ fontSize: 11, color: SS.GRAY }}>{S.total.txns}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 3 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: SS.INK }}>{S.total.pct}</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: SS.INK }}>{S.total.amount}</span>
          </div>
        </div>
        {cats.map((c) => (
          <div key={c.name} style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 10, padding: "0 12px" }}>
            <window.CategoryRow cat={c} onClick={() => ctx.openCategory(c)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Category transaction list ──
function CategoryDetail({ ctx }) {
  const cat = ctx.state.activeCat || window.SPEND.categories[4];
  const data = window.SPEND.merchandise;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", minHeight: 0 }}>
      <window.NavBar title={cat.name} onBack={() => ctx.back()} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "4px 16px 14px", borderBottom: `1px solid ${SS.LINE}` }}>
        <div><div style={{ fontSize: 16, fontWeight: 700, color: SS.INK }}>Total:</div><div style={{ fontSize: 11.5, color: SS.GRAY, marginTop: 2 }}>{cat.txns} transactions</div></div>
        <div style={{ fontSize: 18, fontWeight: 700, color: SS.INK }}>{cat.amount}</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        {data.groups.map((g) => (
          <div key={g.date}>
            <div style={{ padding: "8px 16px", background: "#f4f5f7", fontSize: 12, color: SS.GRAY, fontWeight: 600 }}>{g.date}</div>
            {g.items.map((it, i) => (
              <button key={i} onClick={() => ctx.go("txn")} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", padding: "12px 16px", background: "none", border: "none", borderBottom: `1px solid ${SS.LINE}`, cursor: "pointer", fontFamily: SS.FONT }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#eef0f3", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: SS.GRAY }}>{it.merchant[0]}</div>
                <span style={{ flex: 1, fontSize: 13.5, color: SS.INK, lineHeight: 1.3 }}>{it.merchant}</span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: it.credit ? "#1f8a4c" : SS.INK, whiteSpace: "nowrap" }}>{it.amount}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Transaction detail (enriched) ──
function TransactionDetail({ ctx }) {
  const d = window.SPEND.detail;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#eef0f3", minHeight: 0 }}>
      <div style={{ background: "#3f7cb0", color: "#fff", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "2px 12px 6px" }}>
          <button onClick={() => ctx.back()} style={{ border: "none", background: "none", padding: 4, cursor: "pointer", display: "flex" }}><window.IconChevL c="#fff" /></button>
          <span style={{ flex: 1, textAlign: "center", fontSize: 14, fontWeight: 600, marginRight: 28 }}>{d.cardHeader}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: "8px 18px 16px" }}>
          <span style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>{d.merchant}</span>
          <span style={{ fontSize: 17, fontWeight: 700, whiteSpace: "nowrap" }}>{d.amount}</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0, padding: "0 0 20px" }}>
        <div style={{ background: "#fff", padding: "4px 18px 8px" }}>
          {d.rows.map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "11px 0", borderBottom: `1px solid ${SS.LINE}` }}>
              <span style={{ fontSize: 13, color: SS.GRAY }}>{k}</span>
              <span style={{ fontSize: 13, color: SS.INK, fontWeight: 600, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", marginTop: 10, padding: "14px 18px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: SS.INK, marginBottom: 12 }}>Merchant Details</div>
          <Line>{d.address}</Line>
          <Line>{d.phone}</Line>
          <Line linkText>Website</Line>
          <div style={{ height: 120, borderRadius: 8, margin: "12px 0", background: "linear-gradient(135deg,#cfe0d4,#dde6ee)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
            <div style={{ position: "absolute", left: "46%", top: "44%", width: 14, height: 14, borderRadius: "50% 50% 50% 0", background: "#c0392b", transform: "rotate(-45deg)" }} />
          </div>
          <div style={{ fontSize: 11, color: SS.GRAY }}>Appears on your statement as:</div>
          <div style={{ fontSize: 12.5, color: SS.INK, marginTop: 2 }}>{d.statementAs}</div>
        </div>
        <div style={{ background: "#fff", marginTop: 10, padding: "14px 18px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: SS.INK, marginBottom: 10 }}>Rewards</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: SS.GRAY, marginBottom: 4 }}><span>Category</span><span>Multiplier</span><span>Points</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: SS.INK, fontWeight: 600 }}><span>{d.rewards.category}</span><span>{d.rewards.multiplier}</span><span>{d.rewards.points}</span></div>
        </div>
        <div style={{ padding: "16px 18px 0" }}>
          <button style={{ width: "100%", background: SS.FILL, color: "#fff", border: "none", borderRadius: 6, padding: "13px 0", fontSize: 15, fontWeight: 700, fontFamily: SS.FONT }}>Dispute charge</button>
        </div>
      </div>
    </div>
  );
}
function Line({ children, linkText }) {
  return <div style={{ fontSize: 13, color: linkText ? SS.LINK : SS.INK, fontWeight: linkText ? 700 : 400, marginBottom: 8 }}>{children}</div>;
}

// ── Empty / error states ──
function StatePanel({ ctx, icon, message, title, right }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", minHeight: 0 }}>
      <window.NavBar title={title} onBack={() => ctx.go("landing")} right={right} onRight={() => ctx.go("landing")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px", minHeight: 0 }}>
        <div style={{ background: "#f4f5f7", borderRadius: 6, padding: "44px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "10px 0" }}>
          {icon}
          <p style={{ fontSize: 13.5, color: SS.INK, margin: "16px 0 0", maxWidth: 240, lineHeight: 1.4 }}>{message}</p>
        </div>
        <Disclaimer />
      </div>
    </div>
  );
}
function EmptyState({ ctx }) {
  return <StatePanel ctx={ctx} title="Filter Results" right="Cancel" icon={<window.IconInfo />} message="Looks like there are no transactions that match your filters." />;
}
function ErrorState({ ctx }) {
  return <StatePanel ctx={ctx} title="Spend Summary" icon={<window.IconWarn />} message="We're experiencing a temporary technical issue. Try again later." />;
}

Object.assign(window, { Landing, FilterScreen, FilteredResults, CategoryDetail, TransactionDetail, EmptyState, ErrorState });
