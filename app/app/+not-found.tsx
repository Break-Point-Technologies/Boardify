import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Feather name="alert-circle" size={48} color="#737373" />
      </View>
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.subtitle}>This page doesn't exist or may have moved.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/')}
        activeOpacity={0.8}
      >
        <Feather name="home" size={18} color="#f5f0e8" />
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(10,10,10,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#525252',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 300,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#f5f0e8',
    fontSize: 16,
    fontWeight: '600',
  },
});
