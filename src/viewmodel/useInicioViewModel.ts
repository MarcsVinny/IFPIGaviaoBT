// ============================================================================
// CAMADA VIEWMODEL — Tela Inicial (MVVM Simplificado)
// Custom Hook que gerencia o estado e as ações da tela de categorias.
// Retorna uma TUPLA [InicioState, InicioActions] consumida pela InicioView.
// ============================================================================

import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { LancheService } from "@/model/lancheService";
import { Categoria } from "@/model/lanche";

// Instanciado no nível do módulo para evitar recriação a cada render
const lancheService = new LancheService();

// ---------------------------------------------------------------------------
// Tipos exportados — documentam o contrato do ViewModel
// ---------------------------------------------------------------------------

export type InicioState = {
  loading: boolean;
  error: string | null;
  categorias: Categoria[];
};

export type InicioActions = {
  /** Navega para o cardápio da categoria selecionada */
  navegarParaCategoria: (categoriaId: string) => void;
};

// ---------------------------------------------------------------------------
// Hook ViewModel
// ---------------------------------------------------------------------------

export function useInicioViewModel(): [InicioState, InicioActions] {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        setLoading(true);
        setError(null);
        const resultado = await lancheService.buscarCategorias();
        setCategorias(resultado);
      } catch (err) {
        console.error("useInicioViewModel: erro ao carregar categorias", err);
        setError("Não foi possível carregar as categorias.");
      } finally {
        setLoading(false);
      }
    }

    carregarCategorias();
  }, []);

  // Toda navegação reside na ViewModel — a View nunca chama router diretamente
  const actions: InicioActions = {
    navegarParaCategoria: (categoriaId: string) => {
      router.push(`/category/${categoriaId}` as any);
    },
  };

  const state: InicioState = { loading, error, categorias };

  return [state, actions];
}
