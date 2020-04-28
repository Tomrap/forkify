import app from 'firebase/app';
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyC16y9IexkOIpwtZw5Ekusdyx9kN5rRm1c",
    authDomain: "reactburger-a2c6f.firebaseapp.com",
    databaseURL: "https://reactburger-a2c6f.firebaseio.com",
    projectId: "reactburger-a2c6f",
    storageBucket: "reactburger-a2c6f.appspot.com",
    messagingSenderId: "464444636815",
    appId: "1:464444636815:web:b1377bbfa1dcce45e4bafa"
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.db = app.firestore();
    }

    saveToDatabase = (burger, successHandler, errorHandler) => {
        this.db.collection("burgers").add({
            burger
        }).then(successHandler)
        .catch(errorHandler);
    }

    getAllBurgers = async () => {
      let querySnapshot = await this.db.collection("burgers").get();
      let burgerList = [];
      querySnapshot.forEach((doc) => {
        burgerList.push(doc.data());
    });
      return burgerList;
    }

    listenToDatabase = (handler) => {
      this.db.collection("burgers").onSnapshot((querySnapshot) => {
        let burgerList = [];
        querySnapshot.forEach((doc) => {
            burgerList.push(doc.data());
        });
        handler(burgerList);
      });
    }

    //only changes
    listenToDatabaseChanges = (handler) => {
      this.db.collection("burgers").onSnapshot(snapshot => handler(snapshot))
    }

  }
  export default Firebase;