<<<<<<< HEAD
import Budget from '@dtos/Budget';
=======
>>>>>>> refactoring
import RNFS from 'react-native-fs';

export default async function GenerateHtmlForBudget(): Promise<string> {
  const templateFilePath = '../templates/budget_pdf_template.hbs';

  const templateFile = await RNFS.readFile(templateFilePath, {
    encoding: 'utf-8',
  });

  return templateFile;
}
