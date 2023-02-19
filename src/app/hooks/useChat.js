import { db } from "../../firebase/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';

const useChat = () => {
    const searchUser = async (username) => {

        const q = query(
          collection(db, "users"), 
          where("displayName", "==", username));
    
        try {
            const querySnapshot = await getDocs(q);
            const usersList = [];
            querySnapshot.forEach((doc) => {
                usersList.push(doc.data());
            });
            return usersList;
        } catch (err) {
          return Error("No users found");
        }
    }

    return {searchUser}
}

export default useChat;