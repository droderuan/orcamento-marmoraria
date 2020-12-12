import React, { useCallback, useState } from 'react';
import Share from 'react-native-share';
import functions from '@react-native-firebase/functions';
import RNFS from 'react-native-fs';

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

        const generatePdf = functions().httpsCallable('generatePdf');

        const DownloadFileOptions = {
          fromUrl:
            'https://us-central1-app-orcamento-marmoraria.cloudfunctions.net/generatePdf',
          toFile: `${RNFS.ExternalDirectoryPath}/teste.pdf`,
        };

        const { promise } = await RNFS.downloadFile(DownloadFileOptions);

        promise.then(result => {
          console.log(result);
          const shareOptions = {
            title: 'Share via',
            message: 'some message',
            type: 'application/pdf',
            saveToFiles: true,
            url: `file://${RNFS.ExternalDirectoryPath}/teste.pdf`,
            social: Share.Social.EMAIL,
          };

          Share.shareSingle(shareOptions);
        });

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

        // const pdfBuffer = response.data;

        // await RNFS.writeFile(
        //   `${RNFS.ExternalDirectoryPath}/${budget.id}.pdf`,
        //   JSON.stringify(pdfBuffer),
        // );

        // console.log(`${RNFS.ExternalDirectoryPath}/${budget.id}.pdf`);
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
