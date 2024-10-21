import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../firebase/firebase';
export async function verifyExistUserName(name: string) {
    if (!name) {
        return {
            error: true,
            message: 'Ingresa un nombre'
        }
    }
    try {
        const users = [];
        const dbRef = collection(db, 'users');
        const q = query(dbRef, where('name', '==', name));
        const infoQ = await getDocs(q);
        infoQ.forEach(doc => {
            users.push(doc.data());
        })
        if (users.length > 0) {
            return {
                exist: true,
                message: 'El nombre que estas intentando usar ya existe'
            }
        }
        return {
            exist: false,
        }
    } catch (error) {
        console.log('name: ', error);
        return {
            error: true,
            message: 'Ocurrio un error, intentalo mas tarde'
        }
    }
}