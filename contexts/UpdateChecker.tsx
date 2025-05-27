// src/components/UpdateChecker.tsx

import React, { useState, useEffect, ReactNode } from 'react';
import { Modal, View, Text, Button, Linking, Platform, StyleSheet, AppState, AppStateStatus } from 'react-native';
import VersionCheck from 'react-native-version-check';
// import Constants from 'expo-constants'; // Alternativa para pegar versão atual
import { compareVersions } from 'compare-versions'; // Usar biblioteca robusta

// --- Configuração --- 
// Idealmente, buscar de uma API / Configuração Remota
const MINIMUM_REQUIRED_VERSION: string = '1.3.0'; 
// IDs necessários para getStoreUrl (substitua pelos seus valores reais)
const IOS_APP_ID: string = '6743707545'; // Ex: '123456789'
const ANDROID_PACKAGE_NAME: string = 'com.primetime_cd.primetime'; // Seu package name
// ---------------------

interface UpdateCheckerProps {
  children: ReactNode;
}

const UpdateChecker: React.FC<UpdateCheckerProps> = ({ children }) => {
  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(false);
  const [storeUrl, setStoreUrl] = useState<string>('');

  const checkVersion = async (): Promise<void> => {
    try {
      // Obtém a versão mais recente da loja
      // Nota: getLatestVersion pode lançar erro se a loja não for encontrada ou houver problema de rede
      const latestVersion: string = await VersionCheck.getLatestVersion({
        provider: Platform.OS === 'ios' ? 'appStore' : 'playStore',
        // ignoreErrors: true, // Descomente se preferir não bloquear em caso de erro de rede/loja
      });

      // Obtém a versão atual instalada
      const currentVersion: string = VersionCheck.getCurrentVersion();
      // Alternativa: const currentVersion = Constants.nativeAppVersion || '0.0.0'; // Precisa de fallback

      console.log(`[UpdateCheck] Versão Atual: ${currentVersion}`);
      console.log(`[UpdateCheck] Versão Mais Recente na Loja: ${latestVersion}`);
      console.log(`[UpdateCheck] Versão Mínima Requerida: ${MINIMUM_REQUIRED_VERSION}`);

      // Compara a versão atual com a mínima requerida
      const needsMinVersionUpdate = compareVersions(currentVersion, MINIMUM_REQUIRED_VERSION) < 0;

      if (needsMinVersionUpdate) {
        console.log('[UpdateCheck] Atualização Obrigatória Detectada (versão mínima)!');
        // Tenta obter a URL da loja específica da plataforma
        const urlResult = await VersionCheck.getStoreUrl({
          appID: IOS_APP_ID, // Necessário para iOS
          packageName: ANDROID_PACKAGE_NAME, // Necessário para Android
        });

        if (urlResult) {
          console.log(`[UpdateCheck] URL da Loja: ${urlResult}`);
          setStoreUrl(urlResult);
          setIsUpdateNeeded(true); // Mostra o Modal
        } else {
          console.warn('[UpdateCheck] Não foi possível obter a URL da loja automaticamente.');
          // Fallback: Tentar URL genérica ou mostrar mensagem diferente?
          // Poderia tentar construir a URL manualmente se tiver os links no app.config.js
        }
      } else {
        console.log('[UpdateCheck] Nenhuma atualização obrigatória necessária.');
        setIsUpdateNeeded(false); // Garante que o modal não seja exibido
      }
    } catch (error) {
      console.error('[UpdateCheck] Erro ao verificar versão:', error);
      // Decidir como tratar o erro: Logar? Ignorar e deixar o app abrir? Mostrar erro não bloqueante?
      setIsUpdateNeeded(false); // Não bloquear o usuário em caso de erro
    }
  };

  useEffect(() => {
    // Verifica imediatamente ao montar o componente
    checkVersion();

    // Opcional: Re-verificar quando o app volta do background
    // Isso pode ser útil se o usuário minimizou o app, atualizou, e voltou.
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log('[UpdateCheck] App tornou-se ativo, verificando versão novamente.');
        checkVersion();
      }
    });

    // Limpa o listener ao desmontar
    return () => {
      subscription.remove();
    };
  }, []);

  const handleUpdatePress = (): void => {
    if (storeUrl) {
      Linking.openURL(storeUrl).catch(err => {
        console.error('[UpdateCheck] Erro ao abrir URL da loja:', err);
        // Mostrar um alerta para o usuário informando o erro?
      });
    }
  };

  // Renderiza o Modal bloqueante se a atualização for necessária
  if (isUpdateNeeded) {
    return (
      <Modal
        visible={true}
        transparent={false}
        animationType="slide"
        onRequestClose={() => {
          // Não permitir fechar o modal no Android pressionando "voltar"
          console.log('[UpdateCheck] Tentativa de fechar modal de atualização obrigatória.');
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Atualização Obrigatória</Text>
          <Text style={styles.message}>
            Uma nova versão do aplicativo está disponível e é necessária para continuar.
            Por favor, atualize para a versão mais recente na loja.
          </Text>
          <Button title="Atualizar Agora" onPress={handleUpdatePress} />
        </View>
      </Modal>
    );
  }

  // Se não precisar de atualização, renderiza o conteúdo normal do app
  return <>{children}</>; // Usa Fragment para encapsular children
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default UpdateChecker;

