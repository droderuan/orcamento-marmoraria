import React from 'react';
import WebView from '@components/WebView';
import * as htmlToImage from 'html-to-image';

import generateHTML from '@utils/GenerateHtmlForBudget';

import { useBudget } from '@hooks/budget';
import { Alert } from 'react-native';

const PDFWebView: React.FC = () => {
  const { budget } = useBudget();

  return <WebView source={{ html: generateHTML(budget) }} />;
};

export default PDFWebView;
