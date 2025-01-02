export const cssVar = (name: string, value: any) => {
  document.documentElement.style.setProperty(name, value);
};
