import { useState, useEffect } from "react";
import { useRouter, Href } from "expo-router";
import { CategoriaDataSource } from "@/model/categoria-datasource";
import { Categoria } from "@/model/categoria";

// Instância criada no nível do módulo fora do hook
const categoriaDataSource = new CategoriaDataSource();

export type HomeState = {
  carregando: boolean;
  error: string | null;
  categorias: Categoria[];
};

export type HomeActions = {
  /** Navega para a tela de produtos da categoria selecionada */
  navegarParaCategoria: (categoriaId: string) => void;
};

export function useHomeViewModel(): [HomeState, HomeActions] {
  const router = useRouter();

  const [carregando, setCarregando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        setCarregando(true);
        setError(null);
        const resultado = await categoriaDataSource.getCategorias();
        setCategorias(resultado);
      } catch (err) {
        console.error("useHomeViewModel: erro ao carregar categorias", err);
        setError("Não foi possível carregar as categorias.");
      } finally {
        setCarregando(false);
      }
    }

    carregarCategorias();
  }, []);

  const actions: HomeActions = {
    navegarParaCategoria: (categoriaId: string) => {
      router.push(`/category/${categoriaId}` as Href);
    },
  };

  const state: HomeState = { carregando, error, categorias };

  return [state, actions];
}
