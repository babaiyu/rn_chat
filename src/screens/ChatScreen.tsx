import React, {useCallback, useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {apiGetChat, apiSendChat, apiUser} from '../services/firebase';

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const userId = apiUser()?.uid;

  const onSend = useCallback(async (messages = []) => {
    await apiSendChat(messages, userId)
      .then(res => {
        console.log('Response send messages==>', res);
      })
      .catch(err => {
        console.log('Error message==>', err);
      });
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );
  }, []);

  // Get Chat
  const onGetChat = async () => {
    await apiGetChat(userId).then(snapshot => {
      if (snapshot.exists()) {
        setMessages(snapshot.val());
      }
    });
  };

  useEffect(() => {
    onGetChat();
  }, []);

  return userId ? (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: userId,
      }}
    />
  ) : null;
}
