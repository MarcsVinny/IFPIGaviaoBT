import { Categoria } from "./categoria";
import { Produto } from "./produto";
import { CategoriaDataSource } from "./categoria-datasource";
import { ProdutoDataSource } from "./produto-datasource";

const categoriaDataSource = new CategoriaDataSource();
const produtoDataSource = new ProdutoDataSource();

/**
 * @deprecated LancheService será removido após a migração das ViewModels para os DataSources.
 */
export class LancheService {
  async buscarCategorias(): Promise<Categoria[]> {
    return await categoriaDataSource.getCategorias();
  }

  async buscarPorCategoria(categoriaId: string): Promise<Produto[]> {
    return await produtoDataSource.getProdutosPorCategoria(categoriaId);
  }

  async buscarPorId(id: string): Promise<Produto | undefined> {
    return await produtoDataSource.getProdutoPorId(id);
  }
}
