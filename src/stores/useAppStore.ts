import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AppState {
  currentRequest: string
  isProcessing: boolean
  setCurrentRequest: (request: string) => void
  setProcessing: (processing: boolean) => void
  reset: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      currentRequest: '',
      isProcessing: false,
      setCurrentRequest: (request) => set({ currentRequest: request }),
      setProcessing: (processing) => set({ isProcessing: processing }),
      reset: () => set({ currentRequest: '', isProcessing: false }),
    }),
    { name: 'wand-ai-store' }
  )
)