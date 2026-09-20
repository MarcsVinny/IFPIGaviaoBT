// ============================================================================
// CAMADA VIEWMODEL — Tela de Detalhes do Lanche (MVVM Simplificado)
// Custom Hook que gerencia o estado e as ações da tela de detalhes do produto.
// Retorna uma TUPLA [DetalhesState, DetalhesActions] consumida pela DetalhesView.
// ============================================================================

import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LancheService } from "@/model/lancheService";
import { Lanche } from "@/model/lanche";

// Instanciado no nível do módulo para evitar recriação a cada render
const lancheService = new LancheService();

// ---------------------------------------------------------------------------
// Tipos exportados — documentam o contrato do ViewModel
// ---------------------------------------------------------------------------

export type DetalhesState = {
  loading: boolean;
  error: string | null;
  produto: Lanche | null;
  /** Quantidade selecionada pelo utilizador — gerenciada aqui por ser lógica de negócio */
  quantidade: number;
};

export type DetalhesActions = {
  /** Navega de volta para a tela do cardápio */
  voltarParaCardapio: () => void;
  /** Incrementa a quantidade em 1 */
  incrementar: () => void;
  /** Decrementa a quantidade em 1 (mínimo: 1) */
  decrementar: () => void;
  /** Formata um valor numérico como moeda brasileira */
  formatarPreco: (valor: number) => string;
};

// ---------------------------------------------------------------------------
// Hook ViewModel
// ---------------------------------------------------------------------------

export function useDetalhesViewModel(): [DetalhesState, DetalhesActions] {
  const router = useRouter();

  // Leitura e validação do parâmetro dinâmico de rota — responsabilidade da ViewModel
  const { id } = useLocalSearchParams<{ id: string }>();
  const produtoId = Array.isArray(id) ? id[0] : id ?? "";

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [produto, setProduto] = useState<Lanche | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);

  useEffect(() => {
    if (!produtoId) return;

    async function carregarDetalhes() {
      try {
        setLoading(true);
        setError(null);
        const resultado = await lancheService.buscarPorId(produtoId);
        setProduto(resultado ?? null);
      } catch (err) {
        console.error("useDetalhesViewModel: erro ao carregar produto", err);
        setError("Não foi possível carregar os detalhes do produto.");
      } finally {
        setLoading(false);
      }
    }

    carregarDetalhes();
  }, [produtoId]);

  // Toda navegação reside na ViewModel — a View nunca chama router diretamente
  const actions: DetalhesActions = {
    voltarParaCardapio: () => {
      router.back();
    },
    incrementar: () => {
      setQuantidade((prev) => prev + 1);
    },
    decrementar: () => {
      setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));
    },
    formatarPreco: (valor: number): string => {
      return `R$ ${valor.toFixed(2).replace(".", ",")}`;
    },
  };

  const state: DetalhesState = { loading, error, produto, quantidade };

  return [state, actions];
}
