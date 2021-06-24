export function AddToCypressWindow(name: string, obj: any) {
  const windowNotTyped = window as any;

  if (windowNotTyped.Cypress) {
    windowNotTyped[name] = obj;
  }
}
