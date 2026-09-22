/**
 * Utilitários visuais compartilhados (MVVM Simplificado)
 */

/**
 * Formata um valor numérico como moeda brasileira (R$ 0,00).
 */
export function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}
