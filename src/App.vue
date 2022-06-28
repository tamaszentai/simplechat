<template>
  <div class="wrapper">
    <!-- 'Login window' -->
    <div class="username-input" v-if="!isUserNameAdded">
      <h1>Simple chat</h1>
      <h6>Please type in your username to enter the chat</h6>
      <br /><br />
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" v-model="userNameInput" @keyup.enter="addUserName">
        <label for="floatingInput">Username</label>
        <br /><br />
        <button type="submit" class="btn btn-primary" @click="addUserName">Submit</button>
      </div>
    </div>

    <!-- 'Chat window' -->
    <div class="chat-window" v-if="isUserNameAdded">
      <h1>Hello {{ user.userName }},</h1>
      <h6>welcome to simple chat!</h6>
      <Chat :messages="messages" :currentUserId="user.id" ref="chat" />
      <div class="message-input-control">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="messageInput" @keyup.enter="addMessage">
          <label for="floatingInput">Type your message here then hit enter</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import Chat from './components/Chat.vue';
import { db } from './main.js'
import { doc, onSnapshot, collection, getDocs, addDoc, query, where } from "firebase/firestore";
import 'firebase/firestore';
export default {
  components: {
    Chat
  },
  data() {
    return {
      userNameInput: '',
      user: null,
      isUserNameAdded: false,
      messageInput: '',
      messages: [
        {
          userName: "TestUser",
          id: "39aa74a0-5bc6-4c60-aae3-81aad9c45e63",
          timestamp: new Date(),
          message: "dasdad",
        }
      ]
    }
  },
  // watch: {
  //   messages(newMessages, oldMessages) {
  //     console.log('hello')
  //   }
  // },
  methods: {
    addUserName() {
      if (this.userNameInput !== '') {
        const user = {
          userName: this.userNameInput,
          id: uuid()
        }
        this.user = user;
        this.isUserNameAdded = true;
        this.userNameInput = '';
        console.log(this.user)
      }
    },
    async addMessage() {
      if (this.messageInput !== '') {
        const message = {
          userName: this.user.userName,
          id: this.user.id,
          timestamp: new Date(),
          message: this.messageInput,
          listener: "listener"
        }
        this.messageInput = ''

        try {
          const docRef = await addDoc(collection(db, "messages"), message);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    },
    unsub() {
      const q = query(collection(db, "messages"), where("listener", "==", "listener"));
      onSnapshot(q, (querySnapshot) => {
        const newMessages = [];
        querySnapshot.forEach((doc) => {
          newMessages.push(doc.data());
        });
        newMessages.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
        this.messages = [...newMessages]
      });
    },
  },
  mounted() {
    this.unsub()
  }

}
</script>

<style scoped>
html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.wrapper {
  text-align: center;
  width: 100%;
  height: 100%;
}



.message-input-control {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 0;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .username-input {
  margin: 10% auto;
  height: 400px;
  width: 96%;
  border: 1px solid black;
  padding: 2rem;
  background-color: white;
}

.chat-window {
  position: relative;
  margin: 10% auto;
  min-height: 600px;
  width: 96%;
  border: 1px solid black;
  padding: 2rem 0;
  background-color: white;
}
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .username-input {
  margin: 10% auto;
  height: 400px;
  width: 600px;
  border: 1px solid black;
  padding: 2rem;
  background-color: white;
}

.chat-window {
  position: relative;
  margin: 10% auto;
  min-height: 800px;
  width: 600px;
  border: 1px solid black;
  padding: 2rem 0;
  background-color: white;
}
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {

}
</style>