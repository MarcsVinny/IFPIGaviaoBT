import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams, Href } from "expo-router";
import { CategoriaDataSource } from "@/model/categoria-datasource";
import { ProdutoDataSource } from "@/model/produto-datasource";
import { Produto } from "@/model/produto";

// Instâncias criadas no nível do módulo fora do hook
const categoriaDataSource = new CategoriaDataSource();
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

  const [nomeCategoria, setNomeCategoria] = useState<string>("Cardápio");
  const [carregando, setCarregando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    if (!categoriaId) {
      setCarregando(false);
      setError("Identificador de categoria inválido ou ausente.");
      return;
    }

    async function carregarDados() {
      try {
        setCarregando(true);
        setError(null);

        // Executa as consultas em paralelo respeitando o atraso único de 600ms
        const [categoria, resultadoProdutos] = await Promise.all([
          categoriaDataSource.getCategoriaPorId(categoriaId),
          produtoDataSource.getProdutosPorCategoria(categoriaId),
        ]);

        if (!categoria) {
          setError("Categoria não encontrada no cardápio.");
          setProdutos([]);
          setNomeCategoria("Cardápio");
        } else {
          setNomeCategoria(categoria.nome);
          setProdutos(resultadoProdutos);
        }
      } catch (err) {
        console.error("useCategoryViewModel: erro ao carregar dados", err);
        setError("Não foi possível carregar os produtos do cardápio.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [categoriaId]);

  const actions: CategoryActions = {
    voltarParaInicio: () => {
      router.back();
    },
    navegarParaDetalhes: (produtoId: string) => {
      router.push(`/item/${produtoId}` as Href);
    },
  };

  const state: CategoryState = { carregando, error, produtos, nomeCategoria };

  return [state, actions];
}
