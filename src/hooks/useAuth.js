import { useState, useEffect} from 'react';
import { getAuth } from 'firebase/auth';

const useAuth = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {

        // fetch userId from firebase auth
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            console.log("User ID:", user.uid); // Log userId to confirm it's correct
            setUserId(user.uid);
        }
        else {
            console.log('User is not logged in');
        }

    }, []);

    return userId;
};

export default useAuth;