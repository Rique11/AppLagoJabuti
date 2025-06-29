// app/(drawer)/AvaliacaoLagoScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, Linking } from 'react-native';

// Importe o WebView condicionalmente para evitar o erro na web se não for suportado
let WebViewComponent: any = null;
if (Platform.OS !== 'web') { // Só importa WebView se NÃO for a plataforma web
  WebViewComponent = require('react-native-webview').WebView;
}

export default function AvaliacaoLagoScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const elfsightHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
      <style>
        body { margin: 0; padding: 0; overflow: hidden; } /* Esconde barras de rolagem */
        html, body, #widget-container { height: 100%; width: 100%; } /* Garante que o contêiner ocupe 100% */
      </style>
    </head>
    <body>
      <script src="https://static.elfsight.com/platform/platform.js" async></script>
      <div class="elfsight-app-b56a2e19-44b7-4e90-b352-d3ee0c3e6701" data-elfsight-app-lazy></div>
    </body>
    </html>
  `;

  // URL para a página de avaliações do Google Maps (fallback ou para abrir em navegador)
  const googleMapsReviewsUrl = 'https://www.google.com/maps/place/Lago+Jaboti/@-23.541097,-51.4644385,17z/data=!4m6!3m5!1s0x94eb32d73f91ee85:0xcb4c3e742e472685!8m2!3d-23.541097!4d-51.4644385!16s%2Fg%2F11b6m70n97?hl=pt-BR&entry=ttu'; // Link direto para as avaliações do Lago Jaboti em Apucarana, PR

  // Lógica para abrir o link no navegador externo
  const handleOpenGoogleMaps = () => {
    Linking.openURL(googleMapsReviewsUrl).catch(err =>
      console.error("Não foi possível abrir o link do Google Maps", err)
    );
  };

  if (Platform.OS === 'web') {
    // Para a plataforma web, usamos um iframe HTML nativo
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Avaliações do Lago Jaboti</Text>
        <Text style={styles.subtitle}>Confira as avaliações diretamente do Google:</Text>
        <iframe
          srcDoc={elfsightHtmlContent} // Usamos srcDoc para carregar o HTML da string
          style={styles.iframeWeb} // Estilo para o iframe
          title="Google Reviews Widget"
          frameBorder="0"
          sandbox="allow-scripts allow-same-origin allow-popups" // sandbox para segurança
        />
        <Text style={styles.infoTextWeb}>
          As avaliações são fornecidas pelo widget do Elfsight.
          <Text style={styles.linkText} onPress={handleOpenGoogleMaps}> Ver no Google Maps.</Text>
        </Text>
      </View>
    );
  } else if (WebViewComponent) {
    // Para iOS/Android onde WebViewComponent é importado
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Avaliações do Lago Jaboti</Text>
        <>
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#1a237e" />
              <Text style={styles.loadingText}>Carregando avaliações...</Text>
            </View>
          )}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Não foi possível carregar as avaliações.</Text>
              <Text style={styles.errorText}>Verifique sua conexão ou o código do widget.</Text>
              <Text style={styles.linkText} onPress={handleOpenGoogleMaps}>Abrir no Google Maps</Text>
            </View>
          )}
          <WebViewComponent
            originWhitelist={['*']}
            source={{ html: elfsightHtmlContent }}
            style={styles.webview}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setError(true);
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
          />
        </>
      </View>
    );
  } else {
    // Fallback genérico se WebViewComponent não for definido (para ambientes React Native não web que não suportam WebView)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Avaliações do Lago Jaboti</Text>
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>
            A visualização das avaliações diretamente aqui não é suportada na sua plataforma.
          </Text>
          <Text style={styles.fallbackText}>
            Por favor, clique abaixo para ver as avaliações no Google Maps:
          </Text>
          <Text style={styles.linkText} onPress={handleOpenGoogleMaps}>Abrir no Google Maps</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a237e',
    textAlign: 'center',
    paddingTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  webview: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#f0f0f0',
  },
  iframeWeb: { // Estilo para o iframe na web
    flex: 1,
    width: '100%',
    height: 'auto', // Ajusta a altura automaticamente
    minHeight: 400, // Altura mínima para o widget ser visível
    border: 'none',
    backgroundColor: '#f0f0f0',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1a237e',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 5,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fallbackText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoTextWeb: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  linkText: {
    color: '#1976d2', // Cor de link azul
    textDecorationLine: 'underline',
  },
});