// app/(drawer)/HorarioFuncionamentoScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HorarioFuncionamentoScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Horário de Funcionamento do Lago Jaboti</Text>

      <View style={styles.section}>
        <Ionicons name="time-outline" size={24} color="#1a237e" style={styles.icon} />
        <View>
          <Text style={styles.sectionTitle}>Horário Geral de Abertura:</Text>
          <Text style={styles.text}>Todos os dias: 06:00 às 22:00</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Ionicons name="calendar-outline" size={24} color="#1a237e" style={styles.icon} />
        <View>
          <Text style={styles.sectionTitle}>Atividades Específicas:</Text>
          <Text style={styles.text}>- **Para eventos:** Consulte a administração para horários e disponibilidade.</Text>
          <Text style={styles.text}>- **Aluguel de Equipamentos:** Verifique os horários dos quiosques no local.</Text>
          <Text style={styles.text}>- **Quadras Esportivas:** Agendamento conforme disponibilidade (verifique a aba de Agendamento).</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Ionicons name="information-circle-outline" size={24} color="#1a237e" style={styles.icon} />
        <View>
          <Text style={styles.sectionTitle}>Observações Importantes:</Text>
          <Text style={styles.text}>- O acesso ao lago fora do horário de funcionamento é restrito.</Text>
          <Text style={styles.text}>- Em caso de eventos especiais ou manutenção, os horários podem ser alterados com aviso prévio.</Text>
          <Text style={styles.text}>- Para informações detalhadas sobre horários de feriados, consulte os avisos no local ou o site oficial.</Text>
        </View>
      </View>

      <Text style={styles.footerText}>
        Agradecemos a sua compreensão e colaboração para manter o Lago Jaboti um local agradável para todos!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a237e',
    textAlign: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    marginRight: 15,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  footerText: {
    fontSize: 13,
    color: '#666',
    marginTop: 30,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});