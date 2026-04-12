import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react"

export const useUserRole = () => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();

        const unSubscribe = onAuthStateChanged(auth, async(user) => {
            if (user) {
                try {
                    const userDoc = await getDoc( doc(db, 'users', user.uid));
                    if(userDoc.exists()) {
                        setUserRole(userDoc.data().role || 'user');
                    } else {
                        setUserRole('user');
                    }
                } catch(error) {
                    setUserRole('user');
                }
            } else {
                setUserRole(null);
            }
            setLoading(false);
        })

        return () => unSubscribe();
    }, [])

    return {userRole, loading}
}

export const isAdmin = (role) => role === 'admin';