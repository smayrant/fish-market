import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAyDwMk_eFv9bsiU-GDhZeMisugadgKf0A",
  authDomain: "catch-of-the-day-7925b.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-7925b.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
