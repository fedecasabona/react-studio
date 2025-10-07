import { useState, useRef } from 'react'

interface SoWhatChaWantWindowProps {
  position: { x: number; y: number }
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onMouseDown: (e: React.MouseEvent) => void
  onMouseUp: (e: React.MouseEvent) => void
}

export default function SoWhatChaWantWindow({
  position,
  zIndex,
  isMinimized,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onMouseDown,
  onMouseUp
}: SoWhatChaWantWindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === resizeRef.current) {
      setIsResizing(true)
    } else {
      setIsDragging(true)
    }
    onMouseDown(e)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false)
    setIsResizing(false)
    onMouseUp(e)
  }

  if (isMinimized) {
    return (
      <div
        ref={windowRef}
        className="fixed bg-black border border-gray-500 shadow-2xl cursor-pointer"
        style={{
          left: position.x,
          top: position.y,
          width: '200px',
          height: '30px',
          zIndex: zIndex,
          borderWidth: '0.5px',
          overflow: 'hidden'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="terminal-header flex items-center justify-between px-3 py-1 h-full">
          <div className="flex items-center space-x-2">
            <span className="text-white font-roboto font-normal uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>So What Cha Want?</span>
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
      ref={windowRef}
      className={`fixed bg-black border border-gray-500 shadow-2xl ${isMaximized ? 'w-full h-full top-0 left-0' : ''}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : '640px',
        height: isMaximized ? '100vh' : '400px',
        zIndex: zIndex,
        minWidth: '400px',
        minHeight: '300px',
        borderWidth: '0.5px',
        overflow: 'hidden'
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Terminal Header */}
      <div 
        className="terminal-header flex items-center justify-between px-4 py-2 border-b border-gray-500 bg-black cursor-move" 
        style={{ borderWidth: '0.5px' }}
        onMouseDown={handleMouseDown}
      >
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
        <span className="text-white font-roboto font-normal uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>So What Cha Want?</span>
      </div>

      {/* Video Content */}
      <div className="w-full bg-black flex items-center justify-center" style={{ height: 'calc(100% - 40px)' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube-nocookie.com/embed/ru3gH27Fn6E?si=wWJYZjXG9N4JexTi&controls=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Resize Handle */}
      <div
        ref={resizeRef}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: 'linear-gradient(-45deg, transparent 0%, transparent 30%, #666 30%, #666 40%, transparent 40%, transparent 70%, #666 70%, #666 80%, transparent 80%)'
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}
