import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {getDatabase, ref, child, get, set} from 'firebase/database';

interface ISign {
  email: string;
  password: string;
}

const auth = getAuth();
const db = getDatabase();

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

// Get Chat
export const apiGetChat = async (userId: any) => {
  const dbRef = ref(db);

  return await get(child(dbRef, 'chats/' + userId));
  // .then(snapshot => {
  //   if (snapshot.exists()) {
  //     console.log('Snapshots', snapshot.val());
  //   }
  // })
  // .catch(err => {
  //   console.log('Error DB ==> ', err);
  // });
};

// Send Chat
export const apiSendChat = async (message: any, userId: any) => {
  return await set(ref(db, 'chats/' + userId), message);
};
