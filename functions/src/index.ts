import * as functions from 'firebase-functions';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const generatePdf = functions
  .runWith({
    memory: "1GB"
  })
  .https
  .onRequest(
    async (request, response) => {
      functions.logger.info(request, {structuredData: true});

      const variables = request.body;

      const templatePath = path.resolve(__dirname, '..', 'template', 'template.hbs');

      const templateFile = await fs.promises.readFile(templatePath, {
        encoding: 'utf-8',
      });

      const parseTemplate = handlebars.compile(templateFile);

      const parsedHTML = parseTemplate(variables);


      const browser = await puppeteer.launch({
        headless: true, args:['--no-sandbox', '--disable-setui-sandbox']
      });

      const page = await browser.newPage();

      await page.setContent(parsedHTML);

      await page.emulateMediaType('screen');

      const pdfBuffer = await page.pdf({ format: 'A4' });

      response.type('application/pdf');

      response.end(Buffer.from(pdfBuffer));
});
