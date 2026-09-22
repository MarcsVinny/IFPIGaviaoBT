import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ProdutoDataSource } from "@/model/produto-datasource";
import { Produto } from "@/model/produto";

// Instância criada no nível do módulo fora do hook
const produtoDataSource = new ProdutoDataSource();

export type DetalhesState = {
  carregando: boolean;
  error: string | null;
  produto: Produto | null;
  quantidade: number;
};

export type DetalhesActions = {
  /** Retorna para a tela do cardápio */
  voltarParaCardapio: () => void;
  /** Incrementa a quantidade em 1 unidade */
  incrementarQuantidade: () => void;
  /** Decrementa a quantidade em 1 unidade (mínimo de 1) */
  decrementarQuantidade: () => void;
};

export function useDetalhesViewModel(): [DetalhesState, DetalhesActions] {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();
  const produtoId = Array.isArray(id) ? id[0] : id ?? "";

  const [carregando, setCarregando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);

  useEffect(() => {
    if (!produtoId) {
      setCarregando(false);
      setError("Identificador de produto inválido ou ausente.");
      return;
    }

    async function carregarDetalhes() {
      try {
        setCarregando(true);
        setError(null);
        const resultado = await produtoDataSource.getProdutoPorId(produtoId);
        if (!resultado) {
          setProduto(null);
          setError("Produto não encontrado no cardápio.");
        } else {
          setProduto(resultado);
        }
      } catch (err) {
        console.error("useDetalhesViewModel: erro ao carregar detalhes", err);
        setError("Não foi possível carregar os detalhes do produto.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDetalhes();
  }, [produtoId]);

  const actions: DetalhesActions = {
    voltarParaCardapio: () => {
      router.back();
    },
    incrementarQuantidade: () => {
      setQuantidade((prev) => prev + 1);
    },
    decrementarQuantidade: () => {
      setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));
    },
  };

  const state: DetalhesState = { carregando, error, produto, quantidade };

  return [state, actions];
}
