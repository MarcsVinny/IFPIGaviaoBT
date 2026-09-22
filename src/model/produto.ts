import { ImageSourcePropType } from "react-native";

/**
 * Representa um produto do cardápio (lanche, bebida, etc.).
 */
export interface Produto {
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
