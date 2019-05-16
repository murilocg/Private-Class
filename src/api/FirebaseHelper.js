import admin from 'firebase';

const firebaseApp = admin.initializeApp({
  apiKey: 'AIzaSyDxb_xWfGI1IyBgSSn-i5ND6CTahJOlHi0',
  projectId: 'private-class-9c935',
  databaseURL: "https://private-class-9c935.firebaseio.com",
  storageBucket: 'gs://private-class-9c935.appspot.com/'
});

class FirebaseHelper {

  constructor() {
    this.database = firebaseApp.firestore();
    this.storage = firebaseApp.storage();
    this.auth = firebaseApp.auth();
  }

  async login(email, password) {
      return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut();
  }

  processFireStoreCollection(snapshot) {
    let data = [];
    snapshot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  }
}

export default new FirebaseHelper();
