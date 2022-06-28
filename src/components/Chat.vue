<template>
    <div class="chat" id="">
        <ul>
            <li v-for="(message, index) in messages" :key="index">
                <div :class="message.id === currentUserId ? 'message-bubble-own' : 'message-bubble'">
                    <div class="username">{{ message.userName }}:</div>
                    <div class="message">{{ message.message }}</div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    props: ['messages', 'currentUserId'],
    methods: {
    },
      watch: {
    messages(newMessages, oldMessages) {
      console.log('hello')
    }
  },

}
</script>

<style scoped>
.chat {
    margin: 0 auto;
    width: 98%;
    height: 600px;
    border: 2px solid gray;
    overflow: auto;
}

ul {
    padding: 0;
}

li {
    list-style: none;
}

.message-bubble {
    text-align: left;
    background-color: wheat;
    margin: 1rem;
    width: 80%;
    border-radius: 10px;
    padding: 5px;
    height: auto;
    overflow-wrap: anywhere;
}

.username {
    font-size: .8rem;
    color: brown;
    font-weight: 800;
}

.message-bubble-own {
    text-align: left;
    background-color: lightblue;
    margin: 1rem;
    margin-left: 18%;
    width: 80%;
    border-radius: 10px;
    padding: 5px;
    height: auto;
    overflow-wrap: anywhere;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .chat {
    margin: 0 auto;
    width: 98%;
    height: 400px;
    border: 2px solid gray;
    overflow: auto;
}
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
</style>