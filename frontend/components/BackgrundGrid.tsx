"use client"

import { useEffect, useRef, useState } from "react"

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const gridSize = 50
    let animationId: number

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get theme colors
      const isDark = document.documentElement.classList.contains("dark")
      const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
      const highlightColor = isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)"

      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw interactive highlights around mouse
      const gridX = Math.floor(mousePos.x / gridSize) * gridSize
      const gridY = Math.floor(mousePos.y / gridSize) * gridSize
      const radius = 10

      for (let x = gridX - radius; x <= gridX + radius; x += gridSize) {
        for (let y = gridY - radius; y <= gridY + radius; y += gridSize) {
          if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
            const distance = Math.sqrt((x - mousePos.x) ** 2 + (y - mousePos.y) ** 2)
            if (distance <= radius) {
              const opacity = (1 - distance / radius) * 0.5
              ctx.fillStyle = highlightColor.replace("0.3", opacity.toString()).replace("0.2", opacity.toString())
              ctx.fillRect(x, y, gridSize, gridSize)
            }
          }
        }
      }

      animationId = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [mousePos])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}

export default InteractiveGrid