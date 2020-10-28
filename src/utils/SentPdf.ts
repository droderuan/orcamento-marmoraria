import FileViewer from 'react-native-file-viewer';

export async function SendPdf(path: string): Promise<void> {
  await FileViewer.open(path)
    .then(() => {
      // sucess
    })
    .catch(error => {
      // error
    });
}
