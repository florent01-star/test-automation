export const parseAmount = (text: string): number => parseFloat(text.replace(/[^\d.]/g, ''));

export const fmt = (n: number): number => Math.round(n * 100) / 100;
