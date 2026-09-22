import { Categoria } from "./categoria";
import { simularConsultaCategorias } from "@/data/mock-database";

export class CategoriaDataSource {
  /**
   * Retorna todas as categorias disponíveis no cardápio.
   */
  async getCategorias(): Promise<Categoria[]> {
    return await simularConsultaCategorias();
  }
}
