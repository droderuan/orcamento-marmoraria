import { Alert } from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

async function requestStoragePermission(): Promise<boolean> {
  const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, {
    title: 'Permita o uso do armazenamento',
    message: 'Isto é necessário para que o PDF possa ser gerado',
    buttonPositive: 'ok',
  });
  return result === 'granted';
}

export async function storagePermission(): Promise<void | boolean> {
  const write = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  const read = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

  switch (write || read) {
    case RESULTS.UNAVAILABLE:
      Alert.alert(
        'Serviço indisponível',
        'Parece que o serviço de armazenamento está indisponível no seu dispositivo. Libere mais espaço e tente novamente',
      );
      return false;
    case RESULTS.DENIED:
      return requestStoragePermission();

    case RESULTS.GRANTED:
      return true;
    case RESULTS.BLOCKED:
      Alert.alert(
        'Permita o uso do armazenamento',
        'Acesse as configurações e permita o acesso ao armazenamento pelo dispositivo.\nIsto é necessário para que o PDF possa ser gerado',
        [
          {
            text: 'Mais tarde',
            style: 'default',
          },
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: openSettings,
            style: 'destructive',
          },
        ],
      );
      break;
    default:
      throw new Error('Unhandled permission status');
  }
  return false;
}
