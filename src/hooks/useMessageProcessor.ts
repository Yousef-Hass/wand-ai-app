import { useEffect, useRef } from 'react';
import { useAppStore } from '../stores/useAppStore';

export const useMessageProcessor = () => {
  const { messages, processMessages, currentMessageIndex } = useAppStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (messages.length > 0 && currentMessageIndex < messages.length) {
      timerRef.current = setTimeout(() => processMessages(), 800);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [messages.length, currentMessageIndex, processMessages]);
};
