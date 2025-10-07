'use client'

import { useState, useRef, useEffect } from 'react'

interface GreedVideoWindowProps {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  onDragStart: (e: React.MouseEvent) => void
}

const GreedVideoWindow: React.FC<GreedVideoWindowProps> = ({
  onClose,
  onMinimize,
  onMaximize,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  onDragStart
}) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('terminal-header')) {
      setIsDragging(true)
      onDragStart(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
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
            <span className="text-white font-roboto font-normal uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>greed</span>
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
        width: isMaximized ? '100vw' : '576px', // Same size as ENTER window
        height: isMaximized ? '100vh' : '360px', // Same size as ENTER window
        zIndex: zIndex,
        minWidth: '432px', // Same min size as ENTER window
        minHeight: '288px', // Same min size as ENTER window
        borderWidth: '0.5px',
        overflow: 'hidden'
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Terminal Header */}
      <div className="terminal-header flex items-center justify-between px-4 py-2 border-b border-gray-500 bg-black" style={{ borderWidth: '0.5px', minHeight: '40px' }}>
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
        <span className="text-white font-roboto font-normal uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>greed</span>
      </div>

      {/* Video Content */}
      <div className="flex items-center justify-center bg-black p-4" style={{ height: 'calc(100% - 40px)' }}>
        <div className="w-full h-full flex items-center justify-center">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/f81u7pWApog?si=Nc4pzCzFZHlEyyJu&t=23" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="rounded"
          />
        </div>
      </div>
    </div>
  )
}

export default GreedVideoWindow
