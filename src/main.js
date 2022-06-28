import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

import App from "./App.vue";
import router from "./router";

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
