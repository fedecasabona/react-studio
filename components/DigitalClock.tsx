'use client'

import { useState, useEffect, useRef } from 'react'

interface DigitalClockProps {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  onDragStart: (e: React.MouseEvent) => void
}

const DigitalClock: React.FC<DigitalClockProps> = ({
  onClose,
  onMinimize,
  onMaximize,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  onDragStart
}) => {
  const [seconds, setSeconds] = useState<number>(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)

  // Calculate seconds since midnight in Paris timezone
  const getSecondsSinceMidnight = (): number => {
    const now = new Date()
    const parisTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }))
    
    const hours = parisTime.getHours()
    const minutes = parisTime.getMinutes()
    const secs = parisTime.getSeconds()
    
    return hours * 3600 + minutes * 60 + secs
  }

  // Update clock every second
  useEffect(() => {
    const updateClock = () => {
      setSeconds(getSecondsSinceMidnight())
    }

    // Initial update
    updateClock()

    // Update every second
    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('terminal-header')) {
      setIsDragging(true)
      onDragStart(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  // Handle resize without moving position
  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsResizing(true)
    
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = windowRef.current?.offsetWidth || 400
    const startHeight = windowRef.current?.offsetHeight || 200
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!windowRef.current) return
      
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      
      const newWidth = Math.max(200, startWidth + deltaX)
      const newHeight = Math.max(150, startHeight + deltaY)
      
      windowRef.current.style.width = `${newWidth}px`
      windowRef.current.style.height = `${newHeight}px`
    }
    
    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseUp)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseUp)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  if (isMinimized) {
    return (
      <div
        className="fixed bg-black border border-gray-500 cursor-pointer hover:bg-gray-900 transition-colors"
        style={{
          left: position.x,
          top: position.y,
          zIndex: zIndex,
          minWidth: '200px',
          height: '32px',
          borderWidth: '0.5px'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="terminal-header flex items-center justify-between px-3 py-1 h-full">
          <div className="flex items-center space-x-2">
            <span className="text-white font-roboto font-normal uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>Paris Time</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="text-gray-400 hover:text-white transition-colors"
            style={{ fontSize: '0.65rem' }}
          >
            −
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`fixed bg-black border border-gray-500 shadow-2xl ${isMaximized ? 'w-full h-full top-0 left-0' : ''}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : '400px',
        height: isMaximized ? '100vh' : '200px',
        zIndex: zIndex,
        minWidth: '300px',
        minHeight: '150px',
        borderWidth: '0.5px',
        overflow: 'hidden'
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Terminal Header */}
      <div className="terminal-header flex items-center justify-between px-4 py-2 border-b border-gray-500 bg-black" style={{ borderWidth: '0.5px' }}>
        <div className="flex items-center space-x-2">
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
            title="Close"
            style={{ fontSize: '0.65rem' }}
          >
            ✕
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onMinimize}
            title="Minimize"
            style={{ fontSize: '0.65rem' }}
          >
            −
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onMaximize}
            title="Maximize"
            style={{ fontSize: '0.65rem' }}
          >
            □
          </button>
        </div>
        <span className="text-white font-roboto font-normal uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>Paris Time</span>
      </div>

      {/* Clock Content */}
      <div className="flex items-center justify-center h-full bg-black">
        <div 
          className="text-white font-doto font-medium text-center"
          style={{ 
            fontSize: 'clamp(60px, 8vw, 120px)',
            fontWeight: 500,
            fontFamily: 'Doto, sans-serif',
            lineHeight: 1,
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {seconds.toString().padStart(5, '0')}
        </div>
      </div>
    </div>
  )
}

export default DigitalClock
