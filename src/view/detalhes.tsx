// ============================================================================
// CAMADA VIEW — Tela de Detalhes do Lanche (MVVM Simplificado)
// Componente 100% focado em renderização visual.
// Consome estado e ações exclusivamente via useDetalhesViewModel().
// NÃO importa serviços, NÃO chama router, NÃO faz lógica de negócio.
// ============================================================================

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDetalhesViewModel } from "@/viewModel/detalhes-viewmodel";
import { formatarPreco } from "@/view/util";

export default function DetalhesView() {
  const [state, actions] = useDetalhesViewModel();

  return (
    <View style={styles.tela}>
      {/* CABEÇALHO ROXO COM BOTÃO < VOLTAR */}
      <View style={styles.cabecalhoContainer}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.cabecalhoLinha}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.botaoVoltar}
              onPress={actions.voltarParaCardapio}
            >
              <Ionicons name="chevron-back" size={24} color="#ffffff" />
              <Text style={styles.textoVoltar}>Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.tituloHeader}>Detalhes do Lanche</Text>

            <View style={styles.espacadorHeader} />
          </View>
        </SafeAreaView>
      </View>

      {/* CONTEÚDO PRINCIPAL COM ROLAGEM */}
      {state.carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#501673" />
          <Text style={styles.loadingTexto}>Carregando detalhes do item...</Text>
        </View>
      ) : state.produto ? (
        <ScrollView
          contentContainerStyle={styles.conteudoScroll}
          showsVerticalScrollIndicator={false}
        >
          {/* FOTO GRANDE DO PRODUTO */}
          <View style={styles.cardFoto}>
            <Image
              source={state.produto.imagemGrande || state.produto.imagem}
              style={styles.fotoGrande}
              resizeMode="cover"
            />
            {/* Etiqueta Sobreposta no Canto Inferior da Foto */}
            <View style={styles.overlayFoto}>
              <Text style={styles.overlayTexto}>{state.produto.nome}</Text>
            </View>
          </View>

          {/* ÁREA DE DETALHES E INFORMAÇÕES */}
          <View style={styles.infoSecao}>
            {/* Título do Produto e Badge de Preço */}
            <View style={styles.tituloPrecoLinha}>
              <Text style={styles.nomeProduto}>{state.produto.nome}</Text>
              <View style={styles.badgePreco}>
                <Text style={styles.textoBadgePreco}>
                  {formatarPreco(state.produto.preco)}
                </Text>
              </View>
            </View>

            {/* Tag da Categoria */}
            <View style={styles.categoriaTag}>
              <Text style={styles.textoCategoriaTag}>
                {state.produto.categoriaNome || "Lanche"}
              </Text>
            </View>

            {/* Descrição do Produto */}
            <Text style={styles.descricaoTexto}>{state.produto.descricao}</Text>

            {/* Informações Nutricionais */}
            <View style={styles.nutricaoLinha}>
              <Text style={styles.nutricaoItem}>
                Proteínas:{" "}
                <Text style={styles.nutricaoValor}>
                  {state.produto.proteinas}
                </Text>
              </Text>
              <Text style={styles.nutricaoItem}>
                Carboidratos:{" "}
                <Text style={styles.nutricaoValor}>
                  {state.produto.carboidratos}
                </Text>
              </Text>
              <Text style={styles.nutricaoItem}>
                Gorduras:{" "}
                <Text style={styles.nutricaoValor}>
                  {state.produto.gorduras}
                </Text>
              </Text>
            </View>

            {/* Controle de Quantidade */}
            <View style={styles.quantidadeLinha}>
              <Text style={styles.quantidadeLabel}>Quantidades:</Text>

              <View style={styles.seletorContainer}>
                {/* Botão Menos (Roxo) */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.btnMenos}
                  onPress={actions.decrementarQuantidade}
                >
                  <Ionicons name="remove" size={20} color="#ffffff" />
                </TouchableOpacity>

                {/* Número da Quantidade */}
                <Text style={styles.numeroQuantidade}>{state.quantidade}</Text>

                {/* Botão Mais (Verde) */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.btnMais}
                  onPress={actions.incrementarQuantidade}
                >
                  <Ionicons name="add" size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Botão Voltar ao Cardápio */}
            <TouchableOpacity
              activeOpacity={0.88}
              style={styles.btnVoltarCardapio}
              onPress={actions.voltarParaCardapio}
            >
              <Text style={styles.textoBtnVoltar}>Voltar ao Cardápio</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>Item não encontrado.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  conteudoScroll: {
    paddingBottom: 40,
  },
  cardFoto: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#eaeaea",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
  },
  fotoGrande: {
    width: "100%",
    height: 240,
  },
  overlayFoto: {
    position: "absolute",
    bottom: 10,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  overlayTexto: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "500",
  },
  infoSecao: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  tituloPrecoLinha: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  nomeProduto: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    lineHeight: 30,
  },
  badgePreco: {
    backgroundColor: "#248232",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBadgePreco: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoriaTag: {
    alignSelf: "flex-end",
    marginTop: 6,
    backgroundColor: "#f1f3f5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e2e6ea",
  },
  textoCategoriaTag: {
    fontSize: 12,
    color: "#495057",
    fontWeight: "600",
  },
  descricaoTexto: {
    marginTop: 16,
    fontSize: 16,
    color: "#343a40",
    lineHeight: 24,
  },
  nutricaoLinha: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 22,
    gap: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  nutricaoItem: {
    fontSize: 14,
    color: "#6c757d",
  },
  nutricaoValor: {
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  quantidadeLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 26,
  },
  quantidadeLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  seletorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnMenos: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: "#501673",
    alignItems: "center",
    justifyContent: "center",
  },
  numeroQuantidade: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginHorizontal: 16,
    minWidth: 18,
    textAlign: "center",
  },
  btnMais: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: "#248232",
    alignItems: "center",
    justifyContent: "center",
  },
  btnVoltarCardapio: {
    backgroundColor: "#501673",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBtnVoltar: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  loadingTexto: {
    marginTop: 12,
    fontSize: 15,
    color: "#6c757d",
  },
  erroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  erroTexto: {
    fontSize: 16,
    color: "#dc3545",
  },
});
