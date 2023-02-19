import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { removeUser } from '../store/slices/userSlice';

import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase/firebase';

import { nanoid } from '@reduxjs/toolkit';

const useAuth = () => {

    const dispatch = useDispatch();
    
    const uploadUser = async (email, password) => {
        const auth = getAuth();
        
        try {
            return await createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => (user));
        } catch (error) {
            throw new Error(error.code);
        }
    }

    const removeUserProfile = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        await user.delete()
        dispatch(removeUser());
    }

    const updateUserProfile = async (file, displayName, user) => {
        const auth = getAuth();
        const storage = getStorage();
        const storageRef = ref(storage, `profileImages/${file.name + nanoid()}`);

        try {
            return await uploadBytes(storageRef, file)
            .then(snapshot => getDownloadURL(snapshot.ref))
            .then(downloadURL => {
                updateProfile(auth.currentUser, {
                    displayName, 
                    photoURL: downloadURL
                });
                dispatch(setUser({
                    displayName,
                    email: user.email,
                    photoURL: downloadURL,
                    token: user.accessToken,
                    id: user.uid
                }));
                return { downloadURL };
            });
        } catch (error) {
            throw new Error(error.code);
        }

    }

    const loginUser = async (email, password) => {
        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(({user}) => {
                    dispatch(setUser({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        token: user.accessToken,
                        id: user.uid
                    }));
                });
        } catch (error) {
            throw new Error(error.code);
        } 
    }

    const addUserToDatabase = async (user, downloadURL, displayName) => {
        try {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName,
                email: user.email,
                photoURL: downloadURL
              });
        } catch (error) {
            throw new Error(error.code);
        }
    }

    return {uploadUser, updateUserProfile, loginUser, addUserToDatabase, removeUserProfile}
}

export default useAuth;