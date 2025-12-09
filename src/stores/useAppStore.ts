import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface WebSocketMessage {
  requestId?: string;
  status?: string;
  agent?: string;
  result?: {
    result: string;
  };
  geminiSynthesis?: {
    text: string;
    model: string;
    individualResults?: Record<string, string>;
  };
  selectedAgents?: string[];
  totalTime?: number;
}

interface AppState {
  query: string;
  isFocused: boolean;
  hasSearched: boolean;
  
  isConnected: boolean;
  isLoading: boolean;
  messages: WebSocketMessage[];
  error: string | null;
  
  visibleMessages: WebSocketMessage[];
  currentMessageIndex: number;
  isComplete: boolean;
  showFinalResult: boolean;
  
  setQuery: (query: string) => void;
  setIsFocused: (focused: boolean) => void;
  
  setConnected: (connected: boolean) => void;
  setLoading: (loading: boolean) => void;
  addMessage: (message: WebSocketMessage) => void;
  clearMessages: () => void;
  setError: (error: string | null) => void;
  
  setIsComplete: (complete: boolean) => void;
  setShowFinalResult: (show: boolean) => void;
  
  submitSearch: (query: string) => void;
  processMessages: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      query: '',
      isFocused: false,
      hasSearched: false,
      isConnected: false,
      isLoading: false,
      messages: [],
      error: null,
      visibleMessages: [],
      currentMessageIndex: 0,
      isComplete: false,
      showFinalResult: false,

      setQuery: (query) => set({ query }),
      setIsFocused: (isFocused) => set({ isFocused }),
      
      setConnected: (isConnected) => set({ isConnected }),
      setLoading: (isLoading) => set({ isLoading }),
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      clearMessages: () => {
        const { query, isFocused, hasSearched } = get();
        set({ 
          messages: [], 
          visibleMessages: [], 
          currentMessageIndex: 0, 
          isComplete: false, 
          showFinalResult: false,
          query,
          isFocused,
          hasSearched,
        });
      },
      setError: (error) => set({ error }),
      
      setIsComplete: (isComplete) => set({ isComplete }),
      setShowFinalResult: (showFinalResult) => set({ showFinalResult }),
      
      submitSearch: (query) => {
        const { isConnected, clearMessages } = get();
        if (query.trim() && isConnected) {
          set({ 
            hasSearched: true, 
            query: query.trim() 
          });
          clearMessages();
        }
      },
      
      processMessages: () => {
        const { messages, currentMessageIndex, isLoading, visibleMessages } = get();
        
        if (!messages.length) {
          set({ visibleMessages: [], currentMessageIndex: 0, isComplete: false, showFinalResult: false });
          return;
        }
        
        if (currentMessageIndex < messages.length) {
          const msg = messages[currentMessageIndex];
          
          if (msg.status !== 'connected') {
            let newMessages = [...visibleMessages, msg];
            
            if (msg.status === 'completed' && msg.agent) {
              newMessages = newMessages.filter(m => !(m.status === 'started' && m.agent === msg.agent));
            }
            
            if (msg.status === 'gemini_complete') {
              set({ visibleMessages: [], currentMessageIndex: currentMessageIndex + 1, showFinalResult: true, isComplete: true });
              return;
            }
            
            set({ visibleMessages: newMessages, currentMessageIndex: currentMessageIndex + 1 });
          } else {
            set({ currentMessageIndex: currentMessageIndex + 1 });
          }
        } else if (currentMessageIndex === messages.length && !isLoading) {
          const finalResult = messages.find(m => m.geminiSynthesis);
          set({ isComplete: true });
          if (finalResult) {
            setTimeout(() => set({ visibleMessages: [], showFinalResult: true }), 2000);
          }
        }
      },
    }),
    { name: 'wand-ai-store' }
  )
)