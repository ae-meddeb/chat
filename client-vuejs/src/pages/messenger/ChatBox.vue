<template>
  <div class="top-bar">
    <div class="avatar"><p>{{ memberUser?.userName.charAt(0) }}</p></div>
    <div class="name">{{ memberUser?.userName }}</div>
    <!-- 
    <div class="menu">
      <div class="dots"></div>
    </div> -->
  </div>
  <div class="middle">
    <div v-for="message in messages" :key="message._id" class="bubble" :class="{outgoing: message.sender === currentUser.id}">
      {{ message.text }}
    </div>
  </div>
  <div class="bottom-bar">
    <form class="chat" @submit.prevent="addNewMessage()">
      <input v-model="newMessage" type="text" placeholder="Type a message..." />
      <button type="submit"><i class="fas fa-paper-plane"></i></button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref, watch } from "vue";
import User from '@/models/user';
import userApi from "@/api/user";
import messageApi from "@/api/message";
import Message from "@/models/message";
import { io } from "socket.io-client";

export default defineComponent({
  name: "ChatBox",
  props: {
    conversationId: {
      type: String,
      required: true
    },
    memberId: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const memberUser = ref<User>();
    const messages = ref<Message[]>([]);
    const currentUser = inject<Ref<User>>('user');
    const newMessage = ref('');
    const socket = io('ws://localhost:8900');

    socket.emit("addUser", currentUser?.value.id);
    socket.on("getMessage", (data) => {
      if (data && (data.senderId === props.memberId || data.senderId === currentUser?.value.id)) {
        messages.value.push({
          sender: data.senderId,
          text: data.text
        });
      }
    });

    userApi.findOne(props.memberId)
      .then(res => {
        memberUser.value = new User(res);
        console.log("memberUser.value", memberUser.value) 
      });

    async function setMessages(id: string) {
      messages.value = await messageApi.findByConversation(id);
    }

    setMessages(props.conversationId);
    watch(() => props.conversationId, newId => {
      setMessages(newId);
    });

    async function addNewMessage() {
      const message: Message = {
        sender: currentUser?.value.id,
        text: newMessage.value,
        conversationId: props.conversationId,
      };

      socket.emit("sendMessage", {
        senderId: currentUser?.value.id,
        receiverId: props.memberId,
        text: newMessage.value,
      });

      try {
        const addedMessage = await messageApi.addMessage(message);
        messages.value.push(addedMessage);
        newMessage.value = '';
      } catch (err) {
        console.error(err);
      }
    }

    
    
    return {
      memberUser,
      messages,
      currentUser,
      addNewMessage,
      newMessage
    };
  },
});
</script>
