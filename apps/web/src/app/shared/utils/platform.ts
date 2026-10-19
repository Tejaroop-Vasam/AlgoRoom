export function isMac(): boolean {
  if (typeof navigator === 'undefined') return false;
  const platform = navigator.platform || (navigator as any).userAgentData?.platform || navigator.userAgent || '';
  return /Mac|iPhone|iPod|iPad/i.test(platform);
}

export function getPlatformModifierKey(): 'cmd' | 'Ctrl' {
  return isMac() ? 'cmd' : 'Ctrl';
}

export function isPrimaryModifierPressed(event: KeyboardEvent): boolean {
  if (isMac()) {
    return event.metaKey && !event.ctrlKey;
  }
  return event.ctrlKey && !event.metaKey;
}
