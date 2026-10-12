import React, { useState, useRef } from "react"
import { Sparkles, ZoomIn } from "lucide-react"

interface InstrumentZoomLoupeProps {
  src: string
  alt: string
  className?: string
  zoomFactor?: number
  lensSize?: number
  showReticle?: boolean
  hallmarkText?: string
}

export default function InstrumentZoomLoupe({
  src,
  alt,
  className = "",
  zoomFactor = 2.4,
  lensSize = 160,
  showReticle = true,
  hallmarkText = "ASH INSTRUMENTS · 0.02mm CALIBRATED",
}: InstrumentZoomLoupeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 })
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()

    // Clamp coordinates inside image boundary
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height))

    setLensPos({ x, y })

    // Calculate background image offset for zoom
    const percentX = (x / rect.width) * 100
    const percentY = (y / rect.height) * 100

    setBgPos({ x: percentX, y: percentY })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const halfLens = lensSize / 2

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden select-none cursor-crosshair ${className}`}
    >
      {/* Base Image */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300"
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      {/* Subtle helper hint badge when not hovered */}
      <div className="pointer-events-none absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-slate-900/90 px-2.5 py-1 text-[10px] font-mono text-amber-200 border border-amber-400/25 shadow-md backdrop-blur-md opacity-85 group-hover:opacity-0 transition-opacity duration-200">
        <ZoomIn className="h-3 w-3 text-amber-400" />
        <span>Hover to Zoom Tip</span>
      </div>

      {/* Hallmark Stamp */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-md bg-[#090d16]/95 px-2.5 py-1 text-[10px] font-mono text-amber-200 border border-amber-400/25 flex items-center gap-1.5 shadow-md backdrop-blur-md">
        <Sparkles className="h-3 w-3 text-amber-400" />
        <span>{hallmarkText}</span>
      </div>

      {/* Floating Loupe Magnifier Lens */}
      {isHovered && (
        <div
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            left: `${lensPos.x - halfLens}px`,
            top: `${lensPos.y - halfLens}px`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomFactor * 100}%`,
            backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
          }}
          className="pointer-events-none absolute z-30 rounded-full border-2 border-amber-400/80 shadow-[0_0_25px_rgba(0,0,0,0.85),0_0_15px_rgba(229,195,120,0.35)] ring-1 ring-white/30 backdrop-blur-none transition-opacity duration-150 animate-in fade-in"
        >
          {/* Precision Optical Microscope Reticle / Crosshair */}
          {showReticle && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Horizontal line */}
              <div className="w-full h-px bg-amber-400/35" />
              {/* Vertical line */}
              <div className="absolute h-full w-px bg-amber-400/35" />
              {/* Center reticle circle */}
              <div className="absolute h-7 w-7 rounded-full border border-amber-400/50" />
              <div className="absolute h-1.5 w-1.5 rounded-full bg-amber-400" />

              {/* Magnification readout pill */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded bg-slate-950/90 px-1.5 py-0.5 text-[8px] font-mono font-bold text-amber-300 border border-amber-400/40 tracking-wider">
                2.5X STEREO
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
