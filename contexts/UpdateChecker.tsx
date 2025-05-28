import React, { useState, useEffect, ReactNode } from 'react';
import { View, Image, Text, Linking, Platform, StyleSheet, AppState, AppStateStatus, TouchableOpacity } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { compareVersions } from 'compare-versions';
import { Ionicons } from '@expo/vector-icons';
import { Loading } from '@/components/Loading';
import logoPrime from "../assets/images/logo-prime.png"
import GooglePlayLogo from '../assets/images/google-play.png';

const IOS_APP_ID: string = '6743707545';
const ANDROID_PACKAGE_NAME: string = 'com.primetime_cd.primetime';

interface UpdateCheckerProps {
  children: ReactNode;
}

const UpdateChecker: React.FC<UpdateCheckerProps> = ({ children }) => {
  const [stateLoading, setStateLoading] = useState<boolean>(true);
  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(false);
  const [storeUrl, setStoreUrl] = useState<string>('');

  const checkVersion = async (): Promise<void> => {
    try {
      console.log('[UpdateCheck] Iniciando verificação de versão...');
      const latestVersion = await VersionCheck.getLatestVersion({
        provider: Platform.OS === 'ios' ? 'appStore' : 'playStore',
      });
      console.log(`[UpdateCheck] Última versão disponível: ${latestVersion}`);
      const currentVersion = VersionCheck.getCurrentVersion();

      console.log(`[UpdateCheck] Versão Atual: ${currentVersion}`);
      console.log(`[UpdateCheck] Versão na Loja: ${latestVersion}`);

      const isOutdated = compareVersions(currentVersion, latestVersion) < 0;

      if (isOutdated) {
        console.log('[UpdateCheck] Nova versão disponível!');
        const urlResult = await VersionCheck.getStoreUrl({
          appID: IOS_APP_ID,
          packageName: ANDROID_PACKAGE_NAME,
        });

        if (urlResult) {
          setStoreUrl(urlResult);
          setIsUpdateNeeded(true);
        } else {
          console.warn('[UpdateCheck] URL da loja não pôde ser obtida.');
        }
      } else {
        console.log('[UpdateCheck] App está atualizado.');
        setIsUpdateNeeded(false);
      }
    } catch (error) {
      console.error('[UpdateCheck] Erro ao verificar versão:', error);
      setIsUpdateNeeded(false);
    }
  };

  useEffect(() => {
    checkVersion().finally(() => {
      setStateLoading(false);
      console.log('[UpdateCheck] Verificação de versão concluída.');
    });
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log('[UpdateCheck] App tornou-se ativo, verificando versão novamente.');
        checkVersion();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleUpdatePress = (): void => {
    console.log('[UpdateCheck] Botão de atualização pressionado, abrindo URL da loja...');
    if (storeUrl) {
      Linking.openURL(storeUrl).catch(err => {
        console.error('[UpdateCheck] Erro ao abrir URL da loja:', err);
      });
    }
  };

  if (stateLoading) return <Loading />;

  if (isUpdateNeeded) {
    return (
      <View style={styles.container}>
        <Image
          source={logoPrime}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.title}>Atualização Obrigatória</Text>
        <Text style={styles.subtitle}>
          Uma nova versão do app está disponível e é necessária para continuar usando.
          Clique no botão abaixo para atualizar.
        </Text>

        {Platform.OS === 'ios' ? (
          <TouchableOpacity style={styles.button} onPress={handleUpdatePress}>
            <Ionicons name="logo-apple" size={24} color="white" style={{ marginRight: 12 }} />
            <View>
              <Text style={styles.smallText}>Disponível na</Text>
              <Text style={styles.largeText}>App Store</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleUpdatePress}>
            <Image
              source={GooglePlayLogo}
              resizeMode='contain'
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <View>
              <Text style={styles.smallText}>Disponível no</Text>
              <Text style={styles.largeText}>Google Play</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return <>{children}</>;
};

export default UpdateChecker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 0,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    height: 50,
    minWidth: 150,
  },
  smallText: {
    color: '#fff',
    fontSize: 10,
  },
  largeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});