'use client'

import { useState, useCallback } from 'react'
import TerminalWindow from './TerminalWindow'
import DigitalClock from './DigitalClock'
import MusicPlayer from './MusicPlayer'
import VideoWindow from './VideoWindow'
import StartupVideoWindow from './StartupVideoWindow'
import GreedVideoWindow from './GreedVideoWindow'
import MagicPlacesVideoWindow from './MagicPlacesVideoWindow'
import SoWhatChaWantWindow from './SoWhatChaWantWindow'
import { projects, Project } from '../data/projects'

interface WindowState {
  id: string
  project?: Project
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  zIndex: number
  type: 'project' | 'clock' | 'music' | 'video' | 'sowhatchawant' | 'enter' | 'startup-video' | 'greed-video' | 'magic-places-video'
}

interface WindowManagerProps {
  openWindows: WindowState[]
  onCloseWindow: (windowId: string) => void
  onMinimizeWindow: (windowId: string) => void
  onMaximizeWindow: (windowId: string) => void
  onDragStart: (windowId: string, e: React.MouseEvent) => void
}

const WindowManager: React.FC<WindowManagerProps> = ({
  openWindows,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onDragStart
}) => {
  return (
    <>
      {openWindows.map((window) => {
        if (window.type === 'clock') {
          return (
            <DigitalClock
              key={window.id}
              onClose={() => onCloseWindow(window.id)}
              onMinimize={() => onMinimizeWindow(window.id)}
              onMaximize={() => onMaximizeWindow(window.id)}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
              position={window.position}
              onDragStart={(e) => onDragStart(window.id, e)}
            />
          )
        }
        
        if (window.type === 'music') {
          return (
            <MusicPlayer
              key={window.id}
              onClose={() => onCloseWindow(window.id)}
              onMinimize={() => onMinimizeWindow(window.id)}
              onMaximize={() => onMaximizeWindow(window.id)}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
              position={window.position}
              onDragStart={(e) => onDragStart(window.id, e)}
            />
          )
        }
        
        if (window.type === 'video') {
          return (
            <VideoWindow
              key={window.id}
              onClose={() => onCloseWindow(window.id)}
              onMinimize={() => onMinimizeWindow(window.id)}
              onMaximize={() => onMaximizeWindow(window.id)}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
              position={window.position}
              onDragStart={(e) => onDragStart(window.id, e)}
            />
          )
        }
        
        if (window.type === 'sowhatchawant') {
          return (
            <SoWhatChaWantWindow
              key={window.id}
              onClose={() => onCloseWindow(window.id)}
              onMinimize={() => onMinimizeWindow(window.id)}
              onMaximize={() => onMaximizeWindow(window.id)}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
              position={window.position}
              onMouseDown={(e) => onDragStart(window.id, e)}
              onMouseUp={() => {}}
            />
          )
        }
        
        if (window.type === 'enter') {
          return (
            <VideoWindow
              key={window.id}
              onClose={() => onCloseWindow(window.id)}
              onMinimize={() => onMinimizeWindow(window.id)}
              onMaximize={() => onMaximizeWindow(window.id)}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
              position={window.position}
              onDragStart={(e) => onDragStart(window.id, e)}
            />
          )
        }
        
        if (window.type === 'startup-video') {
          return (
            <StartupVideoWindow
              key={window.id}
              onClose={() => onCloseWindow(window.id)}
              onMinimize={() => onMinimizeWindow(window.id)}
              onMaximize={() => onMaximizeWindow(window.id)}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
              position={window.position}
              onDragStart={(e) => onDragStart(window.id, e)}
            />
          )
        }
        
        if (window.type === 'greed-video') {
          return (
            <GreedVideoWindow
              key={window.id}
              onClose={() => onCloseWindow(window.id)}
              onMinimize={() => onMinimizeWindow(window.id)}
              onMaximize={() => onMaximizeWindow(window.id)}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
              position={window.position}
              onDragStart={(e) => onDragStart(window.id, e)}
            />
          )
        }
        
        if (window.type === 'magic-places-video') {
          return (
            <MagicPlacesVideoWindow
              key={window.id}
              onClose={() => onCloseWindow(window.id)}
              onMinimize={() => onMinimizeWindow(window.id)}
              onMaximize={() => onMaximizeWindow(window.id)}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
              position={window.position}
              onDragStart={(e) => onDragStart(window.id, e)}
            />
          )
        }
        
        return (
          <TerminalWindow
            key={window.id}
            project={window.project!}
            onClose={() => onCloseWindow(window.id)}
            onMinimize={() => onMinimizeWindow(window.id)}
            onMaximize={() => onMaximizeWindow(window.id)}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
            zIndex={window.zIndex}
            position={window.position}
            onDragStart={(e) => onDragStart(window.id, e)}
          />
        )
      })}
    </>
  )
}

export const useWindowManager = () => {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([])
  const [nextZIndex, setNextZIndex] = useState(1000)

  const openWindow = useCallback((windowId: string) => {
    // Handle clock window
    if (windowId === 'clock') {
      // Check if clock window is already open
      const existingWindow = openWindows.find(w => w.id === 'clock')
      if (existingWindow) {
        // Bring to front and unminimize
        setOpenWindows(prev => 
          prev.map(w => 
            w.id === 'clock' 
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          )
        )
        setNextZIndex(prev => prev + 1)
        return
      }

      // Create new clock window (normal size by default)
      const newWindow: WindowState = {
        id: 'clock',
        isMinimized: false,
        isMaximized: false,
        position: {
          x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 400) + 50 : 50,
          y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - 200) + 50 : 50
        },
        zIndex: nextZIndex,
        type: 'clock'
      }

      setOpenWindows(prev => [...prev, newWindow])
      setNextZIndex(prev => prev + 1)
      return
    }

    // Handle music player window
    if (windowId === 'music') {
      // Check if music window is already open
      const existingWindow = openWindows.find(w => w.id === 'music')
      if (existingWindow) {
        // Bring to front and unminimize
        setOpenWindows(prev => 
          prev.map(w => 
            w.id === 'music' 
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          )
        )
        setNextZIndex(prev => prev + 1)
        return
      }

      // Create new music window (minimized by default)
      const newWindow: WindowState = {
        id: 'music',
        isMinimized: true,
        isMaximized: false,
        position: {
          x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 400) + 50 : 50,
          y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - 200) + 50 : 50
        },
        zIndex: nextZIndex,
        type: 'music'
      }

      setOpenWindows(prev => [...prev, newWindow])
      setNextZIndex(prev => prev + 1)
      return
    }

    // Handle video window
    if (windowId === 'video') {
      // Check if video window is already open
      const existingWindow = openWindows.find(w => w.id === 'video')
      if (existingWindow) {
        // Bring to front and unminimize
        setOpenWindows(prev => 
          prev.map(w => 
            w.id === 'video' 
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          )
        )
        setNextZIndex(prev => prev + 1)
        return
      }

      // Create new video window (minimized by default)
      const newWindow: WindowState = {
        id: 'video',
        isMinimized: true,
        isMaximized: false,
        position: {
          x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 480) + 50 : 50,
          y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - 320) + 50 : 50
        },
        zIndex: nextZIndex,
        type: 'video'
      }

      setOpenWindows(prev => [...prev, newWindow])
      setNextZIndex(prev => prev + 1)
      return
    }

    // Handle So What Cha Want window
    if (windowId === 'sowhatchawant') {
      // Check if So What Cha Want window is already open
      const existingWindow = openWindows.find(w => w.id === 'sowhatchawant')
      if (existingWindow) {
        // Bring to front and unminimize
        setOpenWindows(prev => 
          prev.map(w => 
            w.id === 'sowhatchawant' 
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          )
        )
        setNextZIndex(prev => prev + 1)
        return
      }

      // Create new So What Cha Want window
      const newWindow: WindowState = {
        id: 'sowhatchawant',
        isMinimized: false,
        isMaximized: false,
        position: {
          x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 640) + 50 : 50,
          y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - 400) + 50 : 50
        },
        zIndex: nextZIndex,
        type: 'sowhatchawant'
      }

      setOpenWindows(prev => [...prev, newWindow])
      setNextZIndex(prev => prev + 1)
      return
    }

    // Handle Enter video window
    if (windowId === 'enter') {
      // Check if Enter window is already open
      const existingWindow = openWindows.find(w => w.id === 'enter')
      if (existingWindow) {
        // Bring to front and unminimize
        setOpenWindows(prev => 
          prev.map(w => 
            w.id === 'enter' 
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          )
        )
        setNextZIndex(prev => prev + 1)
        return
      }

      // Create new Enter video window
      const newWindow: WindowState = {
        id: 'enter',
        isMinimized: false,
        isMaximized: false,
        position: {
          x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 576) + 50 : 50,
          y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - 360) + 50 : 50
        },
        zIndex: nextZIndex,
        type: 'enter'
      }

      setOpenWindows(prev => [...prev, newWindow])
      setNextZIndex(prev => prev + 1)
      return
    }

    // Handle Startup video window
    if (windowId === 'startup-video') {
      // Check if Startup video window is already open
      const existingWindow = openWindows.find(w => w.id === 'startup-video')
      if (existingWindow) {
        // Bring to front and unminimize
        setOpenWindows(prev => 
          prev.map(w => 
            w.id === 'startup-video' 
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          )
        )
        setNextZIndex(prev => prev + 1)
        return
      }

      // Create new Startup video window
      const newWindow: WindowState = {
        id: 'startup-video',
        isMinimized: false,
        isMaximized: false,
        position: {
          x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 600) + 50 : 50,
          y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - 375) + 50 : 50
        },
        zIndex: nextZIndex,
        type: 'startup-video'
      }

      setOpenWindows(prev => [...prev, newWindow])
      setNextZIndex(prev => prev + 1)
      return
    }

    // Handle Greed video window
    if (windowId === 'greed-video') {
      // Check if Greed video window is already open
      const existingWindow = openWindows.find(w => w.id === 'greed-video')
      if (existingWindow) {
        // Bring to front and unminimize
        setOpenWindows(prev => 
          prev.map(w => 
            w.id === 'greed-video' 
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          )
        )
        setNextZIndex(prev => prev + 1)
        return
      }

      // Create new Greed video window
      const newWindow: WindowState = {
        id: 'greed-video',
        isMinimized: false,
        isMaximized: false,
        position: {
          x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 576) + 50 : 50,
          y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - 360) + 50 : 50
        },
        zIndex: nextZIndex,
        type: 'greed-video'
      }

      setOpenWindows(prev => [...prev, newWindow])
      setNextZIndex(prev => prev + 1)
      return
    }

    // Handle Magic Places video window
    if (windowId === 'magic-places-video') {
      // Check if Magic Places video window is already open
      const existingWindow = openWindows.find(w => w.id === 'magic-places-video')
      if (existingWindow) {
        // Bring to front and unminimize
        setOpenWindows(prev => 
          prev.map(w => 
            w.id === 'magic-places-video' 
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          )
        )
        setNextZIndex(prev => prev + 1)
        return
      }

      // Create new Magic Places video window
      const newWindow: WindowState = {
        id: 'magic-places-video',
        isMinimized: false,
        isMaximized: false,
        position: {
          x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 576) + 50 : 50,
          y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - 360) + 50 : 50
        },
        zIndex: nextZIndex,
        type: 'magic-places-video'
      }

      setOpenWindows(prev => [...prev, newWindow])
      setNextZIndex(prev => prev + 1)
      return
    }

    // Handle project windows
    const project = projects.find(p => p.id === windowId)
    if (!project) return

    // Check if window is already open
    const existingWindow = openWindows.find(w => w.id === windowId)
    if (existingWindow) {
      // Bring to front and unminimize
      setOpenWindows(prev => 
        prev.map(w => 
          w.id === windowId 
            ? { ...w, isMinimized: false, zIndex: nextZIndex }
            : w
        )
      )
      setNextZIndex(prev => prev + 1)
      return
    }

    // Create new project window
    const newWindow: WindowState = {
      id: windowId,
      project,
      isMinimized: false,
      isMaximized: false,
      position: {
        x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 800) + 50 : 50,
        y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - 600) + 50 : 50
      },
      zIndex: nextZIndex,
      type: 'project'
    }

    setOpenWindows(prev => [...prev, newWindow])
    setNextZIndex(prev => prev + 1)
  }, [openWindows, nextZIndex])

  const closeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId))
  }, [])

  const minimizeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev =>
      prev.map(w =>
        w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w
      )
    )
  }, [])

  const maximizeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev =>
      prev.map(w =>
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      )
    )
  }, [])

  const bringToFront = useCallback((windowId: string) => {
    setOpenWindows(prev =>
      prev.map(w =>
        w.id === windowId ? { ...w, zIndex: nextZIndex } : w
      )
    )
    setNextZIndex(prev => prev + 1)
  }, [nextZIndex])

  const handleDragStart = useCallback((windowId: string, e: React.MouseEvent) => {
    bringToFront(windowId)
    
    const startX = e.clientX
    const startY = e.clientY
    const windowState = openWindows.find(w => w.id === windowId)
    if (!windowState) return

    const startPosX = windowState.position.x
    const startPosY = windowState.position.y

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      
      // Check if we're in the browser environment
      if (typeof window === 'undefined') return
      
      setOpenWindows(prev =>
        prev.map(w =>
          w.id === windowId
            ? {
                ...w,
                position: {
                  x: Math.max(0, Math.min(window.innerWidth - 400, startPosX + deltaX)),
                  y: Math.max(0, Math.min(window.innerHeight - 100, startPosY + deltaY))
                }
              }
            : w
        )
      )
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [openWindows, bringToFront])

  return {
    openWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    handleDragStart
  }
}

export default WindowManager
