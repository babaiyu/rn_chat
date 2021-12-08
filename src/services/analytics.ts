import firebaseAnalytics from '@react-native-firebase/analytics';
import {Platform} from 'react-native';

interface Props {
  userId: any;
  description: string;
}

export default async function analytics(
  name: string,
  {userId, description}: Props,
) {
  try {
    const data = await firebaseAnalytics().logEvent(name, {
      id: userId,
      os: Platform.OS,
      description,
    });

    console.log('Send Data => ', data);
    console.log('Params', {userId, os: Platform.OS, description});

    return data;
  } catch (error) {
    console.error('Error analytics => ', error);
  }
}
