import Embers from "./Embers"
import { useParallax } from "../hooks/useParallax"
import "./GradientBackground.css"

// Procedural mesh-gradient background: crisp at any resolution (no raster
// upscaling blur), with several layers of real motion — an SVG turbulence
// filter that liquid-warps the color mesh, a slow diagonal light sweep,
// drifting embers, flickering grain, and cursor-reactive parallax that
// shifts each layer at a different depth.
export default function GradientBackground() {
  const parallaxRef = useParallax()

  return (
    <div className="bg" ref={parallaxRef} aria-hidden="true">
      <svg className="bg__filter-defs" width="0" height="0">
        <defs>
          <filter id="liquid-wave" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.015"
              numOctaves="2"
              seed="7"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                dur="34s"
                values="0.008 0.015;0.014 0.008;0.009 0.017;0.008 0.015"
                calcMode="spline"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
                keyTimes="0;0.33;0.66;1"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="16"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="bg__mesh">
        <div className="bg__blob bg__blob--cream" />
        <div className="bg__blob bg__blob--red-l" />
        <div className="bg__blob bg__blob--red-r" />
        <div className="bg__blob bg__blob--ember" />
        <div className="bg__blob bg__blob--indigo" />
      </div>

      <div className="bg__sweep" />
      <div className="bg__sweep bg__sweep--two" />
      <div className="bg__vignette" />

      <Embers />
      <div className="bg__grain" />
    </div>
  )
}
