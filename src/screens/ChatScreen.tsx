import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {Chat, MessageType} from '@flyerhq/react-native-chat-ui';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  apiGetChat,
  apiSendChat,
  apiUser,
} from '../services/firebase';
import {onValue} from '@firebase/database';

type Props = NativeStackScreenProps<any>;

export default function ChatScreen({route, navigation}: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [friend, setFriend] = useState<any>();
  const userId = apiUser()?.uid || '';
  const user = {id: userId};

  // Add chat to UI
  const addChat = (message: MessageType.Any) => {
    setMessages([message, ...messages]);
  };

  // Send Chat
  const onSend = async (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: user,
      createdAt: Date.now(),
      id: String(+new Date()),
      text: message.text,
      type: 'text',
    };

    await apiSendChat(textMessage, userId, friend?.id)
      .then(res => {
        addChat(textMessage);
      })
      .catch(err => Alert.alert('Alert', err?.message));
  };

  // Get Chat
  const onGetChat = async () => {
    const resChat = await apiGetChat(userId, route.params?.user?.id);
    onValue(resChat, snapshot => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const objToArr = Object.keys(data).map(key => {
          return data[key];
        });

        const result = objToArr.map(item => {
          const data = Object.keys(item).map(jItem => {
            return item[jItem];
          });
          return data;
        });

        setMessages(result[0].reverse());
      }
    });
  };

  useEffect(() => {
    onGetChat();

    setFriend(route.params?.user);
    navigation.setOptions({
      title: `Chat to => ${route.params?.user?.name}`,
    });

    return () => {
      setMessages([]);
    };
  }, []);

  return (
    <Chat
      messages={messages}
      onSendPress={onSend}
      user={{
        id: userId,
      }}
    />
  );
}
