// ============================================================================
// CAMADA VIEW — Tela de Cardápio / Listagem por Categoria (MVVM Simplificado)
// Componente 100% focado em renderização visual.
// Consome estado e ações exclusivamente via useCardapioViewModel().
// NÃO importa serviços, NÃO chama router, NÃO faz lógica de negócio.
// ============================================================================

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useCategoryViewModel } from "@/viewModel/category-viewmodel";
import { Produto } from "@/model/produto";
import { formatarPreco } from "@/view/util";

export default function CardapioView() {
  const [state, actions] = useCategoryViewModel();

  return (
    <View style={styles.tela}>
      {/* CABEÇALHO ROXO DA CATEGORIA */}
      <View style={styles.cabecalhoContainer}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.cabecalhoLinha}>
            {/* Botão de Retorno < Início */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.botaoVoltar}
              onPress={actions.voltarParaInicio}
            >
              <Ionicons name="chevron-back" size={24} color="#ffffff" />
              <Text style={styles.textoVoltar}>Início</Text>
            </TouchableOpacity>

            {/* Nome Centralizado da Categoria */}
            <Text style={styles.tituloHeader}>{state.nomeCategoria}</Text>

            {/* Espaçador invisível para balancear o cabeçalho */}
            <View style={styles.espacadorHeader} />
          </View>
        </SafeAreaView>
      </View>

      {/* CONTEÚDO PRINCIPAL: LISTA DE PRODUTOS */}
      {state.carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#501673" />
          <Text style={styles.loadingTexto}>Buscando itens no banco...</Text>
        </View>
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

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  cabecalhoContainer: {
    backgroundColor: "#501673",
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  cabecalhoLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8,
  },
  textoVoltar: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 2,
  },
  tituloHeader: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  espacadorHeader: {
    width: 60,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingTexto: {
    marginTop: 12,
    fontSize: 15,
    color: "#6c757d",
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
