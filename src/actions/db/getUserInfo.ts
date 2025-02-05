import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { User } from "../../interfaces/user";

export async function getUserInfoByNick(nick: string) {
    try {
        const dbRef = collection(db, 'users');
        const q = query(dbRef, where('nick', '==', nick), limit(1));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return {
                find: false,
                message: `El usuario con el nick:${nick} no existe.`
            }
        }
        const userInfo = querySnapshot.docs[0].data();
        return {
            find: true,
            userInfo
        }
    } catch (error) {
        console.log(error)
        return {
            find: false,
            message: 'Ocurrio un error, intentalo mas tarde.'
        }
    }
}
export async function getUserInfoById(uid: string) {
    try {
        const dbRef = collection(db, 'users');
        const q = query(dbRef, where('uid', '==', uid), limit(1));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return {
                find: false,
                message: `El usuario no existe.`
            }
        }
        const userInfo = querySnapshot.docs[0].data() as User;
        return {
            find: true,
            userInfo
        }
    } catch  {
        return {
            find: false,
            message: 'Ocurrio un error, intentalo mas tarde.'
        }
    }
}