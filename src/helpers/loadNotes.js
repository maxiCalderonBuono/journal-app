import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

export const loadNotes = async (uid) => {

    try {
  
    const docRef = await getDocs(collection(db, `${uid}/journal/notes`));

    const notes= docRef.docs.map(doc => ({id:doc.id, ...doc.data()}));

    return notes

    } catch(e) {
        toast.error(e)
    }

};
