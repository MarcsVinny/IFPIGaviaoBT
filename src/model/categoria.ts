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
