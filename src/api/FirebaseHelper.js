import admin from 'firebase-admin';
import { firebaseConfig } from './settings';

const valid = firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId;
const firebaseApp = valid && admin.initializeApp(firebaseConfig);

class FirebaseHelper {
  isValid = valid;

  constructor() {
    this.database = this.isValid && firebaseApp.firestore();
    if (this.database) {
      const settings = { timestampsInSnapshots: true };
      this.database.settings(settings);
    }
  }

  isAuthenticated() {
    firebaseAuth().onAuthStateChanged(user => {
      return user ? true : false;
    });
  }
  
  createNewRef() {
    return firebase
      .database()
      .ref()
      .push().key;
  }
  
  processFireStoreCollection(snapshot) {
    let data = {};
    snapshot.forEach(doc => {
      data = {
        ...data,
        [doc.id]: doc.data(),
      };
    });
    return data;
  }
}

export default new FirebaseHelper();
