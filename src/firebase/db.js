import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase
  .initializeApp({ projectId: process.env.VUE_APP_FIREBASE_PROJECT })
  .firestore();

const ratingsCollection = db.collection("ratings");
const workoutsCollection = db.collection("workouts");

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

export const fetchCurrentWorkout = async () => {
  const HOUR = 1000 * 60 * 60;
  const sixHoursAgo = Date.now() - 6 * HOUR;
  const workout = await workoutsCollection
    .where("time", "<", new Date())
    .where("time", ">", new Date(sixHoursAgo))
    .orderBy("time")
    .limit(1)
    .get();
  return workout.docs[0];
};
