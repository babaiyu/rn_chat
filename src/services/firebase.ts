import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

interface ISign {
  email: string;
  password: string;
}

const auth = getAuth();

// Signin
export const apiSignin = async ({email, password}: ISign) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
};

// Signup
export const apiSignup = async ({email, password}: ISign) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res;
};

// Get User
export const apiUser = () => {
  let user = auth.currentUser;

  return user;
};
