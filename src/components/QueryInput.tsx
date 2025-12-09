import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Zap } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { useWebSocket } from '../hooks/useWebSocket';
import { ANIMATION_DELAY } from '../lib/animations';
import { theme } from '../lib/theme';
import AgentResponsePanel from './AgentResponsePanel';

const QueryInput = () => {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    query,
    isFocused,
    isConnected,
    isLoading,
    setQuery,
    setIsFocused,
    submitSearch,
  } = useAppStore();

  const { sendMessage } = useWebSocket(
    import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:4000/ws'
  );
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && isConnected) {
      submitSearch(query.trim());
      sendMessage(query.trim());
    }
  }, [query, isConnected, submitSearch, sendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    const height = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = height > 48 ? `${height}px` : '48px';
  }, [setQuery]);

  useEffect(() => {
    if (textareaRef.current && !query.trim()) {
      textareaRef.current.style.height = '48px';
    }
  }, [query]);

  const isSubmitDisabled = !query.trim() || !isConnected || isLoading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: ANIMATION_DELAY.MEDIUM }}
      className="relative w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative bg-slate-900/60 backdrop-blur-2xl border-2 rounded-3xl p-5 transition-all duration-300 ${
            isFocused
              ? 'border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.5)] scale-[1.01]'
              : 'border-blue-500/30 hover:border-blue-500/50 hover:shadow-lg'
          }`}
        >
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10">
            <Search className={`w-6 h-6 transition-all duration-300 ${isFocused ? 'text-blue-400 scale-110' : 'text-gray-400'}`} />
          </div>

          <textarea
            ref={textareaRef}
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t('search.placeholder')}
            className="w-full pl-14 pr-20 bg-transparent text-white text-xl placeholder-gray-500 focus:outline-none focus-visible:outline-none resize-none min-h-[60px] max-h-[200px] leading-relaxed scrollbar-hide font-light"
            rows={1}
            style={{ height: '60px', paddingTop: '16px', paddingBottom: '16px', lineHeight: '1.6', outline: 'none' }}
          />

          <motion.button
            type="submit"
            disabled={isSubmitDisabled}
            whileHover={!isSubmitDisabled ? { scale: 1.1, rotate: 5 } : {}}
            whileTap={!isSubmitDisabled ? { scale: 0.95 } : {}}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-xl transition-all ${
              isSubmitDisabled
                ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                : `bg-gradient-to-r ${theme.colors.gradients.blueToGreen} text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/30`
            }`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Zap className="w-6 h-6" />
            )}
          </motion.button>
        </div>
        
        <div className="mt-8">
          <AgentResponsePanel />
        </div>
      </form>
    </motion.div>
  );
};

export default QueryInput;
