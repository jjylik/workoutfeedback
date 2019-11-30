import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.initializeApp({ projectId: "treenipalaute" }).firestore();

export const ratingsCollection = db.collection("ratings");
