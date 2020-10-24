import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '218459406026-simi46fp02hlnnjfrqj2okn9b5appj3a.apps.googleusercontent.com',
});

export async function onGoogleButtonPress(): Promise<
  FirebaseAuthTypes.UserCredential
> {
  const { idToken } = await GoogleSignin.signIn();
  const googleCrendetial = auth.GoogleAuthProvider.credential(idToken);

  return auth().signInWithCredential(googleCrendetial);
}
