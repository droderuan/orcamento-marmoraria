import RNHTMLtoPDF, { Pdf } from 'react-native-html-to-pdf';
import Budget from '@dtos/Budget';
import GenerateHtmlForBudget from '@utils/GenerateHtmlForBudget';
import { format } from 'date-fns';

export async function generateBudgetPdf(budget: Budget): Promise<Pdf> {
  const html = GenerateHtmlForBudget(budget);
  const fileName = `orcamento-${budget.client.name}-${format(
    new Date(budget.created_at),
    'dd-MM-yyyy',
  )}`;
  const pdf = await RNHTMLtoPDF.convert({
    html,
    fileName,
    directory: 'Documents',
  });
  return pdf;
}
