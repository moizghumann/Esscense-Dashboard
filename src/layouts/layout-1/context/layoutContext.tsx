import { useState, createContext, PropsWithChildren, useCallback, useMemo } from 'react'

// ==============================================================
interface ContextProps {
  sidebarCompact: boolean
  showMobileSideBar: boolean
  handleOpenMobileSidebar: () => void
  handleCloseMobileSidebar: () => void
  handleSidebarCompactToggle: () => void
}
// ==============================================================

export const LayoutContext = createContext({} as ContextProps)

export default function LayoutProvider({ children }: PropsWithChildren) {
  const [sidebarCompact, setSidebarCompact] = useState(false)
  const [showMobileSideBar, setShowMobileSideBar] = useState(false)

  // HANDLE SIDE BAR TOGGLE FOR LARGE DEVICE
  const handleSidebarCompactToggle = useCallback(() => {
    setSidebarCompact((state) => !state)
  }, [])

  // HANDLE SIDE BAR OPEN FOR SMALL DEVICE
  const handleOpenMobileSidebar = useCallback(() => {
    setShowMobileSideBar(true)
  }, [])

  // HANDLE SIDE BAR CLOSE FOR SMALL DEVICE
  const handleCloseMobileSidebar = useCallback(() => {
    setShowMobileSideBar(false)
  }, [])

  const contextValue = useMemo(
    () => ({
      sidebarCompact,
      showMobileSideBar,
      handleOpenMobileSidebar,
      handleCloseMobileSidebar,
      handleSidebarCompactToggle,
    }),
    [
      sidebarCompact,
      showMobileSideBar,
      handleOpenMobileSidebar,
      handleCloseMobileSidebar,
      handleSidebarCompactToggle,
    ]
  )

  return <LayoutContext value={contextValue}>{children}</LayoutContext>
}
