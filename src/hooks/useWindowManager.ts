
import { useState, useCallback } from 'react';

export interface WindowState {
  id: string;
  title: string;
  content: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface UseWindowManagerReturn {
  windows: WindowState[];
  openWindow: (id: string, title: string, content: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  bringToFront: (id: string) => void;
  getActiveWindows: () => WindowState[];
}

export const useWindowManager = (): UseWindowManagerReturn => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const openWindow = useCallback((id: string, title: string, content: string) => {
    setWindows(prev => {
      const existingWindow = prev.find(w => w.id === id);
      if (existingWindow) {
        // Window already exists, bring to front and restore if minimized
        const updated = prev.map(w => 
          w.id === id 
            ? { ...w, isMinimized: false, zIndex: nextZIndex }
            : w
        );
        setNextZIndex(prev => prev + 1);
        return updated;
      }

      // Create new window
      const newWindow: WindowState = {
        id,
        title,
        content,
        isMinimized: false,
        isMaximized: false,
        position: { 
          x: 100 + (prev.length * 30), 
          y: 100 + (prev.length * 30) 
        },
        size: { width: 600, height: 400 },
        zIndex: nextZIndex
      };
      
      setNextZIndex(prev => prev + 1);
      return [...prev, newWindow];
    });
  }, [nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { 
        ...w, 
        isMaximized: true,
        position: { x: 0, y: 0 },
        size: { width: window.innerWidth, height: window.innerHeight - 48 }
      } : w
    ));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { 
        ...w, 
        isMinimized: false,
        isMaximized: false,
        position: { x: 100, y: 100 },
        size: { width: 600, height: 400 }
      } : w
    ));
  }, []);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  }, []);

  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, size } : w
    ));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const getActiveWindows = useCallback(() => {
    return windows.filter(w => !w.isMinimized);
  }, [windows]);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updateWindowPosition,
    updateWindowSize,
    bringToFront,
    getActiveWindows
  };
};
