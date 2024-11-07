// SelectChildScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useChild } from '../contexts/ChildContext';

export default function SelectChildScreen() {
  const childContext = useChild();

  if (!childContext) return null;
  const { setChildId } = childContext;

  const handleSelectChild = (id: string) => {
    setChildId(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione uma Criança</Text>
      {/* Exemplo de botões para selecionar uma criança */}
      <Button title="Selecionar Criança 1" onPress={() => handleSelectChild('1')} />
      <Button title="Selecionar Criança 2" onPress={() => handleSelectChild('2')} />
      <Button title="Selecionar Criança 3" onPress={() => handleSelectChild('3')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
