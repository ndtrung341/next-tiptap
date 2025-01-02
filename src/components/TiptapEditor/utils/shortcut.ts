export const getShortcutKey = (key: string) => {
  const isMacOS = /macintosh|mac os x/gi.test(navigator.userAgent);

  if (key === "Mod") {
    return isMacOS ? "⌘" : "Ctrl";
  }

  if (key === "Shift") {
    return isMacOS ? "⇧" : key;
  }

  if (key === "Alt") {
    return isMacOS ? "⌥" : key;
  }

  return key;
};
