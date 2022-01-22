import { useContext, useMemo } from 'react';
import { WarnContext } from '../contexts/WarnContext';

export default function useWarn() {
  const warnContext = useContext(WarnContext);
  const warn = useMemo(() => warnContext, [warnContext]);

  return warn;
}
