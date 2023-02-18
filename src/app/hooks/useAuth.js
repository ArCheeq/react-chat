import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

import { nanoid } from '@reduxjs/toolkit';

const useAuth = () => {

    const dispatch = useDispatch();
    
    const uploadUser = async (email, password, setError) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
        dispatch(setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid
        }));
        })
        .catch(() => setError(true));
    }

    const updateUserProfile = async (file, displayName, setFileError) => {
        const auth = getAuth();
        const storage = getStorage();
        const storageRef = ref(storage, `profileImages/${file.name + nanoid()}`);

        await uploadBytes(storageRef, file)
        .then(snapshot => getDownloadURL(snapshot.ref))
        .then(downloadURL => {
            updateProfile(auth.currentUser, {
                displayName, 
                photoURL: downloadURL
            })
        })
        .catch(() => setFileError(true));
    }

    const loginUser = async (email, password, setError) => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                email: user.email,
                token: user.accessToken,
                id: user.uid
                }));
            })
            .catch(() => {
                console.log("err");
                setError(true)
            })
    }

    return {uploadUser, updateUserProfile, loginUser}
}

export default useAuth;