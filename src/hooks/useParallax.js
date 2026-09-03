import { useEffect, useRef } from "react"

// Smoothly follows the pointer and writes per-layer CSS custom properties
// (--px-*, --py-*) onto the given element every frame, so different
// background layers can drift at different depths purely via CSS.
// Pure imperative DOM writes (no React state) — this runs at pointer/rAF
// frequency and would otherwise re-render the whole tree needlessly.
const LAYERS = {
  mesh: { x: -18, y: -12 },
  sweep: { x: -10, y: -6 },
  embers: { x: 24, y: 16 },
}

export function useParallax() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0
    let raf = null

    const onPointerMove = (e) => {
      targetX = e.clientX / window.innerWidth - 0.5
      targetY = e.clientY / window.innerHeight - 0.5
    }

    const tick = () => {
      curX += (targetX - curX) * 0.07
      curY += (targetY - curY) * 0.07

      for (const [name, mult] of Object.entries(LAYERS)) {
        root.style.setProperty(`--px-${name}`, (curX * mult.x).toFixed(2))
        root.style.setProperty(`--py-${name}`, (curY * mult.y).toFixed(2))
      }

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return rootRef
}
