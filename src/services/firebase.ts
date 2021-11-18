import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  getDatabase,
  query,
  ref,
  get,
  set,
  push,
  onValue,
} from 'firebase/database';

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

// Save User to RealtimeDB
const apiSaveDB = async (user: any) => {
  const chatListRef = ref(db, `users`);
  const newChatRef = push(chatListRef);
  return await set(newChatRef, user);
};

// Signup
export const apiSignup = async ({email, password, name}: ISignup) => {
  const myPromise = new Promise(async (resolve, reject) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async res => {
        await apiUpdateProfile({name})
          .then(() => resolve(true))
          .catch(err => reject(err));

        // Save User to realtimeDB
        const user = {
          email: res.user.email,
          name: res.user.displayName,
          id: res.user.uid,
        };
        await apiSaveDB(user);
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
export const apiGetChat = async (userId: any, friendId: any) => {
  const returnData = ref(db, 'chats/' + userId + '_' + friendId);
  return returnData;
};

// Send Chat
export const apiSendChat = async (
  message: any,
  userId: any,
  friendId?: any,
) => {
  const userRef = ref(db, `chats/${userId}_${friendId}`);
  const newUserRef = push(userRef);

  const friendRef = ref(db, `chats/${friendId}_${userId}`);
  const newFriendRef = push(friendRef);

  const result = [
    set(newUserRef, message),
    userId !== friendId ? set(newFriendRef, message) : null,
  ];

  return await Promise.all(result);
};

// Get All Users
export const apiGetUsers = async () => {
  const returnData = query(ref(db, 'users'));
  return await get(returnData);
};
