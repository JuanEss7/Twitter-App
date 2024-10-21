import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
export async function verifyNickInDb(nick: string) {
    console.log({ nick })
    if (!nick) {
        return {
            error: true,
            message: 'Ingresa un nick'
        }
    }
    try {
        const users = [];
        const dbRef = collection(db, 'users');
        const q = query(dbRef, where('nick', '==', nick));
        const infoQuery = await getDocs(q);
        infoQuery.forEach(doc => {
            users.push(doc.data())
        })
        if (users.length > 0) {
            return {
                exist: true,
                message: 'El nick que estas intentando usar ya existe.'
            }
        }
        return {
            exist: false
        }
    } catch (error) {
        console.log('nick: ', error)
        return {
            error: true,
            message: 'Ocurrio un error insperado, intentalo mas tarde'
        }
    }

}