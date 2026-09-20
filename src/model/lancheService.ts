// ============================================================================
// CAMADA MODEL — SERVICE / DATA SOURCE (MVVM Simplificado)
// Responsável por encapsular o acesso aos dados (mock de banco local).
// Simula latência de I/O assíncrono para que o estado de loading funcione.
// As ViewModels consomem este serviço; as Views NUNCA o importam diretamente.
// ============================================================================

import { Categoria, Lanche } from "./lanche";

const DELAY_MS = 600; // Simula 600ms de latência de consulta local (SQLite/API real)

// ---------------------------------------------------------------------------
// DADOS ESTÁTICOS (antes em src/data/mockDatabase.ts)
// ---------------------------------------------------------------------------

const BANCO_CATEGORIAS: Categoria[] = [
  {
    id: "comidas",
    nome: "Comidas",
    corBorda: "#501673",
    corSeta: "#501673",
    imagem: require("../../assets/images/menu/categoria-comidas.png"),
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    corBorda: "#1b873f",
    corSeta: "#1b873f",
    imagem: require("../../assets/images/menu/categoria-bebidas.png"),
  },
];

const BANCO_PRODUTOS: Lanche[] = [
  {
    id: "pastel-de-carne",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Pastel de Carne",
    preco: 6.0,
    descricao:
      "Pastel frito na hora bem crocante e sequinho, com recheio farto de carne moída selecionada, temperada com cheiro verde e azeitonas.",
    proteinas: "14g",
    carboidratos: "32g",
    gorduras: "18g",
    imagem: require("../../assets/images/menu/pastel-de-carne.png"),
    imagemGrande: require("../../assets/images/menu/pastel-de-carne.png"),
  },
  {
    id: "coxinha-de-frango",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Coxinha de Frango",
    preco: 7.0,
    descricao:
      "Clássica coxinha de frango com massa macia de batata, empanada crocante dourada por fora e recheio de peito de frango desfiado com requeijão.",
    proteinas: "18g",
    carboidratos: "38g",
    gorduras: "15g",
    imagem: require("../../assets/images/menu/coxinha-de-frango.png"),
    imagemGrande: require("../../assets/images/menu/coxinha-de-frango.png"),
  },
  {
    id: "cuscuz-com-ovo",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Cuscuz com Ovo",
    preco: 8.0,
    descricao:
      "Tradicional cuscuz nordestino de milho flocado feito no vapor, servido quentinho com ovo frito na manteiga da terra e uma pitada de sal.",
    proteinas: "12g",
    carboidratos: "40g",
    gorduras: "9g",
    imagem: require("../../assets/images/menu/cuscuz-com-ovo.png"),
    imagemGrande: require("../../assets/images/menu/cuscuz-com-ovo.png"),
  },
  {
    id: "arrumadinho-completo",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Arrumadinho Completo",
    preco: 14.0,
    descricao:
      "Carne de sol desfiada, arroz branco soltinho e creme de galinha caseiro.",
    proteinas: "22g",
    carboidratos: "45g",
    gorduras: "12g",
    imagem: require("../../assets/images/menu/arrumadinho-completo.png"),
    imagemGrande: require("../../assets/images/menu/arrumadinho-completo-large.png"),
  },
  {
    id: "suco-de-laranja",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Suco de Laranja",
    preco: 7.0,
    descricao:
      "Suco 100% natural de laranjas frescas espremidas na hora, sem conservantes, servido com gelo bem refrescante.",
    proteinas: "2g",
    carboidratos: "26g",
    gorduras: "0g",
    imagem: require("../../assets/images/menu/suco-de-laranja.png"),
    imagemGrande: require("../../assets/images/menu/suco-de-laranja.png"),
  },
  {
    id: "refrigerante-lata",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Refrigerante Lata",
    preco: 5.0,
    descricao:
      "Refrigerante geladíssimo em lata 350ml. Escolha entre Coca-Cola tradicional, Coca-Cola Zero ou Guaraná Antarctica.",
    proteinas: "0g",
    carboidratos: "37g",
    gorduras: "0g",
    imagem: require("../../assets/images/menu/refrigerante.png"),
    imagemGrande: require("../../assets/images/menu/refrigerante.png"),
  },
  {
    id: "cafe-expresso",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Café Expresso",
    preco: 4.0,
    descricao:
      "Café expresso curto encorpado e aromático, feito com grãos especiais moídos na hora, com crema espessa e sabor marcante.",
    proteinas: "0g",
    carboidratos: "1g",
    gorduras: "0g",
    imagem: require("../../assets/images/menu/cafe-expresso.png"),
    imagemGrande: require("../../assets/images/menu/cafe-expresso.png"),
  },
  {
    id: "suco-acerola",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Suco de Acerola",
    preco: 6.5,
    descricao:
      "Suco de acerola com polpa pura, fonte concentrada de vitamina C e antioxidantes, servido com pedras de gelo.",
    proteinas: "1g",
    carboidratos: "15g",
    gorduras: "0g",
    imagem: require("../../assets/images/menu/suco-acerola.png"),
    imagemGrande: require("../../assets/images/menu/suco-acerola.png"),
  },
];

// ---------------------------------------------------------------------------
// SERVIÇO — encapsula o acesso aos dados com simulação de I/O assíncrono
// ---------------------------------------------------------------------------

export class LancheService {
  /**
   * Retorna todas as categorias disponíveis no cardápio.
   */
  async buscarCategorias(): Promise<Categoria[]> {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    return [...BANCO_CATEGORIAS];
  }

  /**
   * Retorna todos os lanches pertencentes a uma categoria específica.
   */
  async buscarPorCategoria(categoriaId: string): Promise<Lanche[]> {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    return BANCO_PRODUTOS.filter((p) => p.categoriaId === categoriaId);
  }

  /**
   * Retorna um lanche pelo seu ID único, ou undefined se não encontrado.
   */
  async buscarPorId(id: string): Promise<Lanche | undefined> {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    return BANCO_PRODUTOS.find((p) => p.id === id);
  }
}
