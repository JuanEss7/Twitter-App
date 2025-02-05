import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export function logOutOfFb() {
    signOut(auth)
}