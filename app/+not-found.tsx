import { Stack } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from './globalStyle';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Erro</Text>
        <Text style={styles.subtitle}>
          Essa página não encontrada
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/(home)')}>
          <Text style={styles.buttonText}>Voltar pra Home</Text>
        </TouchableOpacity>      
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 8,
    color: '#1F2937',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 24,
    maxWidth: 300,
  },
  button: {
    backgroundColor: colors.laranja,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    marginTop: 25
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
