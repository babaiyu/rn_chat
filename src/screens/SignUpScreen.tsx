import React, {useState} from 'react';
import {
  Center,
  Container,
  FormControl,
  Heading,
  Input,
  Stack,
  Button,
} from 'native-base';
import {Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function SignUpScreen({navigation}: Props) {
  const [form, setForm] = useState({email: '', password: ''});

  const _onSignUp = async () => {
    const payload = {
      email: form?.email,
      password: form?.password,
    };

    console.log(payload);
  };

  return (
    <Center flex={1} px="3">
      <Container>
        <Heading color="emerald.500" marginTop="2">
          Signup Your Account
        </Heading>

        <Stack space={4} marginTop="4">
          {/* Email */}
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              placeholder="Masukkan Email"
              keyboardType="email-address"
              autoCapitalize="none"
              isFullWidth
              w={{base: '75%', md: '25%'}}
              onChangeText={txt => setForm({...form, email: txt})}
            />
          </FormControl>

          {/* Password */}
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              placeholder="Masukkan Password"
              secureTextEntry
              autoCapitalize="none"
              w={{base: '75%', md: '25%'}}
              onChangeText={txt => setForm({...form, password: txt})}
            />
          </FormControl>

          <FormControl>
            <Button.Group>
              <Button onPress={_onSignUp}>Sign Up</Button>
            </Button.Group>
          </FormControl>
        </Stack>
      </Container>
    </Center>
  );
}
