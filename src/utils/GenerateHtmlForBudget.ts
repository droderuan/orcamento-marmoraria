import Budget from '@dtos/Budget';
import RNFS from 'react-native-fs';

export default async function GenerateHtmlForBudget(
  budget: Budget,
): Promise<string> {
  const templateFilePath = '../templates/budget_pdf_template.hbs';

  const templateFile = await RNFS.readFile(templateFilePath, {
    encoding: 'utf-8',
  });

  const parseTemplate = Handlebars.compile(templateFile);

  const variables = budget;

  return parseTemplate(variables);
}
