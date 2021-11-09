import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth();

// Signin
export const apiSignin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
};

// Get User
export const apiUser = () => {
  let user = auth.currentUser;

  return user;
};
