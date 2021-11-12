import React, {useCallback, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {apiGetChat, apiSendChat, apiUser} from '../services/firebase';

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const userId = apiUser()?.uid;
  const userName = apiUser()?.displayName;

  // Send Chat
  const onSend = useCallback(async (messages = []) => {
    await apiSendChat(messages, userId)
      .then(res =>
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        ),
      )
      .catch(err => Alert.alert('Alert', err?.message));
  }, []);

  // Get Chat
  const onGetChat = async () => {
    await apiGetChat(userId).then(snapshot => {
      if (snapshot.exists()) {
        const dataMessages = snapshot.val();
        setMessages(dataMessages);
      }
    });
  };

  useEffect(() => {
    onGetChat();
  }, []);

  return userId && userName ? (
    <GiftedChat
      messages={messages || []}
      onSend={messages => onSend(messages)}
      user={{
        _id: userId,
        name: userName,
      }}
    />
  ) : null;
}
