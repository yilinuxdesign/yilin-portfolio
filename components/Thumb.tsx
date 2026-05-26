interface ThumbProps {
  color: string
  label: string
  meta?: string
  badge?: string
  style?: React.CSSProperties
}

export default function Thumb({ color, label, meta, badge, style }: ThumbProps) {
  return (
    <div
      className="thumb"
      style={{ background: color, '--thumb-fg': 'white', ...style } as React.CSSProperties}
    >
      <div className="thumb-stripes" />
      {meta && <div className="thumb-meta">{meta}</div>}
      <div className="thumb-label">{label}</div>
      {badge && <div className="thumb-badge">{badge}</div>}
    </div>
  )
}
