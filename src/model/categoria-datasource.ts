import { Categoria } from "./categoria";
import {
  simularConsultaCategorias,
  simularConsultaCategoriaPorId,
} from "@/data/mock-database";

export class CategoriaDataSource {
  /**
   * Retorna todas as categorias disponíveis no cardápio.
   */
  async getCategorias(): Promise<Categoria[]> {
    return await simularConsultaCategorias();
  }

  /**
   * Retorna uma categoria pelo seu ID único, ou undefined se inexistente.
   */
  async getCategoriaPorId(id: string): Promise<Categoria | undefined> {
    return await simularConsultaCategoriaPorId(id);
  }
}

