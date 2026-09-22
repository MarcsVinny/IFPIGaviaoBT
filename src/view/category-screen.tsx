// ============================================================================
// CAMADA VIEW — Tela de Cardápio / Categoria (MVVM Simplificado)
// Componente 100% focado em renderização visual.
// Consome estado e ações exclusivamente via useCategoryViewModel().
// NÃO importa fontes de dados, NÃO chama router diretamente.
// ============================================================================

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCategoryViewModel } from "@/viewModel/category-viewmodel";
import { Produto } from "@/model/produto";
import { formatarPreco } from "./util";
import { CabecalhoRetorno, Carregamento, MensagemErro } from "./components";

export function CategoryScreen() {
  const [state, actions] = useCategoryViewModel();

  return (
    <View style={styles.tela}>
      {/* CABEÇALHO ROXO COM RETORNO */}
      <CabecalhoRetorno
        titulo={state.nomeCategoria}
        textoVoltar="Início"
        onVoltar={actions.voltarParaInicio}
      />

      {/* CONTEÚDO PRINCIPAL: LISTA DE PRODUTOS */}
      {state.carregando ? (
        <Carregamento mensagem="Buscando itens no banco..." />
      ) : state.error ? (
        <MensagemErro mensagem={state.error} />
      ) : (
        <FlatList
          data={state.produtos}
          keyExtractor={(item: Produto) => item.id}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.vazioContainer}>
              <Text style={styles.vazioTexto}>
                Nenhum item encontrado nesta categoria.
              </Text>
            </View>
          }
          renderItem={({ item }: { item: Produto }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.cardItem}
              onPress={() => actions.navegarParaDetalhes(item.id)}
            >
              {/* Miniatura do Produto */}
              <Image
                source={item.imagem}
                style={styles.thumbnail}
                resizeMode="cover"
              />

              {/* Informações Centrais: Nome e Preço */}
              <View style={styles.infoContainer}>
                <Text style={styles.nomeItem}>{item.nome}</Text>
                <Text style={styles.precoItem}>
                  {formatarPreco(item.preco)}
                </Text>
              </View>

              {/* Seta Indicativa à Direita */}
              <Ionicons name="chevron-forward" size={22} color="#b0b5be" />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

export default CategoryScreen;

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  listaConteudo: {
    padding: 16,
    paddingBottom: 32,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  thumbnail: {
    width: 80,
    height: 74,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  nomeItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  precoItem: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
  },
  vazioContainer: {
    paddingTop: 60,
    alignItems: "center",
  },
  vazioTexto: {
    fontSize: 15,
    color: "#8c959f",
  },
});
