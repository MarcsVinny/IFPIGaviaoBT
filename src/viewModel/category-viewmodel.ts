import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ProdutoDataSource } from "@/model/produto-datasource";
import { Produto } from "@/model/produto";

// Instância criada no nível do módulo fora do hook
const produtoDataSource = new ProdutoDataSource();

export type CategoryState = {
  carregando: boolean;
  error: string | null;
  produtos: Produto[];
  nomeCategoria: string;
};

export type CategoryActions = {
  /** Retorna para a tela inicial */
  voltarParaInicio: () => void;
  /** Navega para a tela de detalhes de um item específico */
  navegarParaDetalhes: (produtoId: string) => void;
};

export function useCategoryViewModel(): [CategoryState, CategoryActions] {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();
  const categoriaId = Array.isArray(id) ? id[0] : id ?? "";

  const nomeCategoria =
    categoriaId === "bebidas"
      ? "Bebidas"
      : categoriaId === "comidas"
        ? "Comidas"
        : "Cardápio";

  const [carregando, setCarregando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    if (!categoriaId) {
      setCarregando(false);
      setError("Identificador de categoria inválido ou ausente.");
      return;
    }

    async function carregarProdutos() {
      try {
        setCarregando(true);
        setError(null);
        const resultado = await produtoDataSource.getProdutosPorCategoria(categoriaId);
        setProdutos(resultado);
      } catch (err) {
        console.error("useCategoryViewModel: erro ao carregar produtos", err);
        setError("Não foi possível carregar os produtos do cardápio.");
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, [categoriaId]);

  const actions: CategoryActions = {
    voltarParaInicio: () => {
      router.back();
    },
    navegarParaDetalhes: (produtoId: string) => {
      router.push(`/item/${produtoId}` as any);
    },
  };

  const state: CategoryState = { carregando, error, produtos, nomeCategoria };

  return [state, actions];
}
