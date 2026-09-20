// ============================================================================
// CAMADA MODEL — ENTIDADES (MVVM Simplificado)
// Define os tipos/interfaces que representam os dados do domínio da aplicação.
// As Views e ViewModels dependem destas interfaces, nunca de "any".
// ============================================================================

import { ImageSourcePropType } from "react-native";

/**
 * Representa uma categoria do cardápio (ex: Comidas, Bebidas).
 */
export interface Categoria {
  id: string;
  nome: string;
  corBorda: string;
  corSeta: string;
  imagem: ImageSourcePropType;
}

/**
 * Representa um item do cardápio (lanche, bebida, etc.).
 */
export interface Lanche {
  id: string;
  categoriaId: string;
  categoriaNome: string;
  nome: string;
  preco: number;
  descricao: string;
  proteinas: string;
  carboidratos: string;
  gorduras: string;
  imagem: ImageSourcePropType;
  imagemGrande: ImageSourcePropType;
}
