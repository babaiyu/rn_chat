import React, {useEffect, useState} from 'react';
import {Box, Button, Container, HStack, Text, VStack} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {apiGetUsers} from '../services/firebase';
import analytics from '../services/analytics';

type Props = NativeStackScreenProps<any>;

export default function UsersScreen({navigation}: Props) {
  const [list, setList] = useState<any[]>([]);

  // getData
  const _onGetData = async () => {
    await apiGetUsers().then(snapshot => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const objToArr = Object.keys(data).map(key => data[key]);

        setList(objToArr);
      }
    });
  };

  // get chat by users
  const _onChatUser = async (user: any) => {
    await analytics('user_goto_chat', {
      userId: Date.now(),
      description: 'User wanna navigate to chat screen',
    });
    
    navigation.navigate('Chat', {user});
  };

  useEffect(() => {
    _onGetData();
  }, []);

  return (
    <Container flex={1} px="3">
      <Box my="3">
        <VStack space={2}>
          {list.map((item, i) => (
            <Button onPress={() => _onChatUser(item)} key={i}>
              {item?.name}
            </Button>
          ))}
        </VStack>
      </Box>
    </Container>
  );
}
