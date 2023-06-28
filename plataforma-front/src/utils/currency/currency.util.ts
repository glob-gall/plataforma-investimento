

export function formatCurrency(value: number): string {
  const brl = value.toLocaleString('pt-br', {minimumFractionDigits: 2});
  return brl
}
export function toBRL(value: number): string {
  const brl = value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
  return brl
}