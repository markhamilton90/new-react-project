import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAHrwiCoTEEiIFZln8lumFGFWvpXNukwvU",
    authDomain: "playlist-5ad60.firebaseapp.com",
    databaseURL: "https://playlist-5ad60-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
