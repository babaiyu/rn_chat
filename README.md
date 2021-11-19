# rn_chat
Create Chat App using React Native. I just develop this project only for Android, because i don't have Macbook for development IOS 😭😭😭

## Library that i use:
1. [React Navigation](https://reactnavigation.org/) for navigation
2. [Firebase](https://firebase.google.com/) for Authentication & Realtime database
3. [Nativebase and others](https://nativebase.io/) for UI
4. [@flyerhq/react-native-chat-ui](https://www.npmjs.com/package/@flyerhq/react-native-chat-ui) for UI Chat

## How to run
Recommend using two tabs for running the project, one for `yarn start` and one for `yarn android`
```
git clone https://github.com/babaiyu/rn_chat.git
cd rn_chat
yarn install
```
Before run the project. Make sure you already have a firebase project with Web App and then create file `.env` that based on firebase configuration. After that you can follow this code:
```
API_KEY=
AUTH_DOMAIN=
DATABASE_URL=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
MEASUREMENT_ID=
```

Finally you can:
```
yarn start
```

```
yarn android
```
