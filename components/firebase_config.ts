import fb from "firebase/app"
export let firebaseConfig = {
  apiKey: "AIzaSyCNHmC3G_0MwzM5GpKhT6TeX9VMz0hkA10",
  authDomain: "cpsc335-cow-project.firebaseapp.com",
  projectId: "cpsc335-cow-project",
  storageBucket: "cpsc335-cow-project.appspot.com",
  messagingSenderId: "950553625348",
  appId: "1:950553625348:web:bda596d7e6ea70e0e50651",
  measurementId: "G-49X51ED2SF"
};
export const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app()