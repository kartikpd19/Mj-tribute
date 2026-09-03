import { useMemo } from "react"

const EMBER_COUNT = 10
const COLORS = ["#ffb066", "#ff8a4c", "#ff5f36", "#ffd39a"]

function randomEmbers() {
  return Array.from({ length: EMBER_COUNT }, (_, i) => {
    const size = 1.5 + Math.random() * 2
    return {
      id: i,
      left: Math.random() * 100,
      size,
      duration: 16 + Math.random() * 16,
      delay: -Math.random() * 30,
      drift: (Math.random() - 0.5) * 100,
      peakOpacity: 0.12 + Math.random() * 0.18,
      color: COLORS[i % COLORS.length],
    }
  })
}

export default function Embers() {
  const embers = useMemo(randomEmbers, [])

  return (
    <div className="bg__embers" aria-hidden="true">
      {embers.map((ember) => (
        <span
          key={ember.id}
          className="ember"
          style={{
            left: `${ember.left}%`,
            width: ember.size,
            height: ember.size,
            background: ember.color,
            boxShadow: `0 0 ${ember.size * 1.5}px ${ember.color}`,
            animationDuration: `${ember.duration}s`,
            animationDelay: `${ember.delay}s`,
            "--drift": `${ember.drift}px`,
            "--peak-opacity": ember.peakOpacity,
          }}
        />
      ))}
    </div>
  )
}
