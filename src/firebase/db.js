import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase
  .initializeApp({ projectId: process.env.VUE_APP_FIREBASE_PROJECT })
  .firestore();

export const ratingsCollection = db.collection("ratings");

export const addScore = async score => {
  const result = await ratingsCollection.add({
    score
  });
  return result.id;
};

export const updateScore = (score, ratingId) => {
  ratingsCollection.doc(ratingId).set({
    score
  });
};
