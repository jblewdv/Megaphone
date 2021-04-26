import { useFirestore } from 'react-redux-firebase';

export function userHasIntegrations(uid) {
    const firestore = useFirestore();

    firestore.collection('users').doc(uid).get().then(user => {
        if (user.exists) {;
            if (user.data().integrations === "none") {
                return false
            } else {
                return true
            }
        } else {
          console.log('No such user!');
          return false
        }
      })
      .catch(error => {
        console.log('Error getting user:', error);
        return false
      });

}