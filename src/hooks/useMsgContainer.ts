import React, { useCallback, useState } from 'react';

export default function useMsgContainer(ref: React.RefObject<HTMLDivElement>) {
  const [showScrollBtn, setShowScrollButton] = useState(false);

  const scrollToBottom = useCallback(
    (isNewMessage?: boolean) => {
      if (!ref.current) return;
      const { scrollTop, clientHeight, scrollHeight } = ref.current;
      const scroll = scrollHeight - clientHeight;

      if (isNewMessage) {
        scrollTop + 200 > scrollHeight - clientHeight
          ? ref.current.scrollTo(0, scroll)
          : null;
      } else {
        ref.current.scrollTo(0, scroll);
      }
    },
    [ref]
  );

  const handleScroll = useCallback(
    (callback: () => void) => {
      if (!ref.current) return;
      const { scrollTop, clientHeight, scrollHeight } = ref.current;

      setShowScrollButton(!(scrollTop + 100 > scrollHeight - clientHeight));
      callback();
    },
    [ref]
  );

  return {
    showScrollBtn,
    scrollToBottom,
    handleScroll,
  };
}
