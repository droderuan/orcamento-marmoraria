import React from 'react';
import { WebView as Container, WebViewProps } from 'react-native-webview';

// import { Container } from './styles';

const WebView: React.FC<WebViewProps> = ({ ...props }) => {
  return <Container {...props} />;
};

export default WebView;
