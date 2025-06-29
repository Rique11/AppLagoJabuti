// app/(drawer)/RegrasDoLagoScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const rulesData = [
  'É proibido jogar lixo no lago ou em suas margens. Utilize as lixeiras disponíveis.',
  'Não é permitida a caça de animais ou a remoção de plantas da fauna e flora local.',
  'O uso de churrasqueiras e fogueiras é restrito a áreas designadas e deve-se ter atenção à segurança.',
  'Animais de estimação devem estar sempre na coleira e seus dejetos devem ser recolhidos.',
  'A velocidade máxima para embarcações motorizadas é de 10 km/h.',
  'É obrigatório o uso de colete salva-vidas em embarcações e para a prática de esportes aquáticos.',
  'Não é permitido acampar sem autorização prévia da administração do lago.',
  'Respeite o silêncio e evite perturbar a fauna local, especialmente durante a noite.',
  'Crianças devem estar sempre acompanhadas por um responsável.',
  'É proibido o consumo de bebidas alcoólicas em excesso e substâncias ilícitas.'
];

export default function RegrasDoLagoScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Regras de Uso do Lago Jaboti</Text>

      {rulesData.map((rule, index) => (
        <View key={index} style={styles.ruleItem}>
          <Ionicons name="checkmark-circle" size={20} color="#28a745" style={styles.ruleIcon} />
          <Text style={styles.ruleText}>{rule}</Text>
        </View>
      ))}

      <Text style={styles.footerText}>
        Ao utilizar as dependências do Lago Jaboti, você concorda em cumprir todas as regras e regulamentos estabelecidos para garantir a segurança e a preservação do ambiente.
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
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ruleIcon: {
    marginRight: 10,
    marginTop: 2, // Align icon with text start
  },
  ruleText: {
    fontSize: 15,
    color: '#333',
    flexShrink: 1, // Allows text to wrap
  },
  footerText: {
    fontSize: 13,
    color: '#666',
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});