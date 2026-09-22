import { Produto } from "./produto";
import {
  simularConsultaProdutosPorCategoria,
  simularConsultaProdutoPorId,
} from "@/data/mock-database";

export class ProdutoDataSource {
  /**
   * Retorna todos os produtos pertencentes a uma categoria específica.
   */
  async getProdutosPorCategoria(categoriaId: string): Promise<Produto[]> {
    return await simularConsultaProdutosPorCategoria(categoriaId);
  }

  /**
   * Retorna um produto pelo seu ID único, ou undefined se não encontrado.
   */
  async getProdutoPorId(id: string): Promise<Produto | undefined> {
    return await simularConsultaProdutoPorId(id);
  }
}
