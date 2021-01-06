import React, { useCallback, useState } from 'react';
import Share from 'react-native-share';
import functions from '@react-native-firebase/functions';
import RNFS from 'react-native-fs';
import Reactotron from 'reactotron-react-native';

import { useNavigation } from '@react-navigation/core';
import { useBudget } from '@hooks/budget';

import { storagePermission } from '@services/HandlePermissions';

import BudgetOptionsView from './BudgetOptionsView';

const BudgetOptionsController: React.FC = () => {
  const { deleteBudget, budget } = useBudget();
  const { navigate } = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const deleteAndGoBack = useCallback(() => {
    deleteBudget();
    navigate('MainPage');
  }, [deleteBudget, navigate]);

  const generatePdfAndShare = useCallback(async () => {
    const checkPermissions = await storagePermission();

    if (checkPermissions) {
      try {
        setIsLoading(true);

        // const generatePdf = functions().httpsCallable('generatePdf');

        // const response = await generatePdf({
        //   company: {
        //     name: 'Quiosque',
        //     address: 'Av. Americas',
        //     state: 'RJ',
        //     city: 'centro',
        //     phone: '21 99930-5656',
        //   },
        //   budget,
        // });

        // const pdfBuffer = Buffer.from(response.data);

        // const pdfBase = pdfBuffer.toString('base64');

        const { promise } = RNFS.downloadFile({
          fromUrl:
            'https://us-central1-app-orcamento-marmoraria.cloudfunctions.net/generatePdf',
          toFile: `${RNFS.ExternalDirectoryPath}/teste.pdf`,
          headers: { body: { company: { name: 'ruan' } } },
        });

        promise.then(value => {
          const shareOptions = {
            title: 'Orçamento',
            message: 'Orçamento sobre peças de marmores e granitos.',
            type: 'application/pdf',
            url: `file://${RNFS.ExternalDirectoryPath}/teste.pdf`,
            social: Share.Social.WHATSAPP,
          };

          Share.shareSingle(shareOptions);
        });

        // await RNFS.writeFile(
        //   `${RNFS.ExternalDirectoryPath}/${budget.id}.pdf`,
        //   pdfBase,
        //   'base64',
        // );
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [budget]);

  return (
    <BudgetOptionsView
      budget={budget}
      loading={isLoading}
      deleteAndGoBack={deleteAndGoBack}
      generatePdfAndShare={generatePdfAndShare}
    />
  );
};

export default BudgetOptionsController;
