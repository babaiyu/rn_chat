import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {getDatabase, ref, child, get, set} from 'firebase/database';

interface ISign {
  email: string;
  password: string;
}

interface ISignup extends ISign {
  name: string;
}

const auth = getAuth();
const db = getDatabase();

// Signin
export const apiSignin = async ({email, password}: ISign) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
};

// Signup
export const apiSignup = async ({email, password, name}: ISignup) => {
  const myPromise = new Promise(async (resolve, reject) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async res => {
        await apiUpdateProfile({name})
          .then(() => resolve(true))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });

  return myPromise;
};

// Update Profile after Signup
export const apiUpdateProfile = async ({name}: {name: string}) => {
  const res = await updateProfile(auth.currentUser, {
    displayName: name,
  });
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
};

// Send Chat
export const apiSendChat = async (message: any, userId: any) => {
  return await set(ref(db, 'chats/' + userId), message);
};
