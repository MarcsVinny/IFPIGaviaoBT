// ============================================================================
// COMPONENTES VISUAIS COMPARTILHADOS (MVVM Simplificado)
// Componentes puros de apresentação reutilizados pelas telas.
// ============================================================================

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// ---------------------------------------------------------------------------
// Componente Carregamento
// ---------------------------------------------------------------------------

export type CarregamentoProps = {
  mensagem?: string;
};

export function Carregamento({ mensagem = "Carregando..." }: CarregamentoProps) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#501673" />
      <Text style={styles.loadingTexto}>{mensagem}</Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Componente CabecalhoRetorno
// ---------------------------------------------------------------------------

export type CabecalhoRetornoProps = {
  titulo: string;
  textoVoltar?: string;
  onVoltar: () => void;
};

export function CabecalhoRetorno({
  titulo,
  textoVoltar = "Voltar",
  onVoltar,
}: CabecalhoRetornoProps) {
  return (
    <View style={styles.cabecalhoContainer}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.cabecalhoLinha}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.botaoVoltar}
            onPress={onVoltar}
          >
            <Ionicons name="chevron-back" size={24} color="#ffffff" />
            <Text style={styles.textoVoltar}>{textoVoltar}</Text>
          </TouchableOpacity>

          <Text style={styles.tituloHeader}>{titulo}</Text>

          <View style={styles.espacadorHeader} />
        </View>
      </SafeAreaView>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Componente MensagemErro
// ---------------------------------------------------------------------------

export type MensagemErroProps = {
  mensagem: string;
  onTentarNovamente?: () => void;
};

export function MensagemErro({ mensagem, onTentarNovamente }: MensagemErroProps) {
  return (
    <View style={styles.erroContainer}>
      <Ionicons name="alert-circle-outline" size={40} color="#dc3545" />
      <Text style={styles.erroTexto}>{mensagem}</Text>
      {onTentarNovamente && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnTentarNovamente}
          onPress={onTentarNovamente}
        >
          <Text style={styles.textoBtnTentarNovamente}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingTexto: {
    marginTop: 12,
    fontSize: 15,
    color: "#6c757d",
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
  erroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  erroTexto: {
    marginTop: 10,
    fontSize: 16,
    color: "#dc3545",
    textAlign: "center",
    lineHeight: 22,
  },
  btnTentarNovamente: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#501673",
  },
  textoBtnTentarNovamente: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
