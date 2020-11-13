import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import pdf from 'html-pdf';

import Budget from '../dtos/Budget';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

initializeApp({ projectId: 'app-orcamento-marmoraria' });

interface RequestBody {
  budget: Budget;
}

export const templateTestSouthAmerica = functions
  .region('southamerica-east1')
  .https.onRequest(async (request, response) => {
    const { budget } = <RequestBody>request.body;

    const templatePath = path.resolve(
      __dirname,
      '..',
      'templates',
      'template.hbs',
    );
    const templateFile = await fs.promises.readFile(templatePath, {
      encoding: 'utf-8',
    });

    const template = handlebars.compile(templateFile);
    const parseTemplate = template(budget);

    pdf
      .create(parseTemplate, {
        type: 'pdf',
        format: 'A4',
        orientation: 'portrait',
      })
      .toBuffer((err, buffer) => {
        if (err) return response.status(500).json(err);

        return response.end(buffer);
      });
  });
