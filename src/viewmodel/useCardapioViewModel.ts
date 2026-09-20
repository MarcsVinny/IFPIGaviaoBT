// ============================================================================
// CAMADA VIEWMODEL — Tela de Cardápio (MVVM Simplificado)
// Custom Hook que gerencia o estado e as ações da tela de listagem por categoria.
// Retorna uma TUPLA [CardapioState, CardapioActions] consumida pela CardapioView.
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

export type CardapioState = {
  loading: boolean;
  error: string | null;
  produtos: Lanche[];
  /** Nome amigável da categoria, derivado e pronto para exibição na View */
  nomeCategoria: string;
};

export type CardapioActions = {
  /** Navega de volta para a tela inicial */
  voltarParaInicio: () => void;
  /** Navega para a tela de detalhes de um item específico */
  navegarParaDetalhes: (itemId: string) => void;
  /** Formata um valor numérico como moeda brasileira */
  formatarPreco: (valor: number) => string;
};

// ---------------------------------------------------------------------------
// Hook ViewModel
// ---------------------------------------------------------------------------

export function useCardapioViewModel(): [CardapioState, CardapioActions] {
  const router = useRouter();

  // Leitura e validação do parâmetro dinâmico de rota — responsabilidade da ViewModel
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoriaId = Array.isArray(id) ? id[0] : id ?? "";

  // Nome amigável derivado do ID — lógica de apresentação gerenciada aqui
  const nomeCategoria =
    categoriaId === "bebidas"
      ? "Bebidas"
      : categoriaId === "comidas"
        ? "Comidas"
        : "Cardápio";

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<Lanche[]>([]);

  useEffect(() => {
    if (!categoriaId) return;

    async function carregarProdutos() {
      try {
        setLoading(true);
        setError(null);
        const resultado = await lancheService.buscarPorCategoria(categoriaId);
        setProdutos(resultado);
      } catch (err) {
        console.error("useCardapioViewModel: erro ao carregar produtos", err);
        setError("Não foi possível carregar os itens do cardápio.");
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, [categoriaId]);

  // Toda navegação reside na ViewModel — a View nunca chama router diretamente
  const actions: CardapioActions = {
    voltarParaInicio: () => {
      router.back();
    },
    navegarParaDetalhes: (itemId: string) => {
      router.push(`/item/${itemId}` as any);
    },
    formatarPreco: (valor: number): string => {
      return `R$ ${valor.toFixed(2).replace(".", ",")}`;
    },
  };

  const state: CardapioState = { loading, error, produtos, nomeCategoria };

  return [state, actions];
}
