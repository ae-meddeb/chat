<template>
  <div class="layout">
    <div class="messenger">
      <div class="left-wrap">
        <div class="profile">
          <div class="avatar">
            <p>{{ currentUser?.userName.charAt(0) }}</p>
          </div>
          <div class="name2">{{ currentUser?.userName }}</div>
          <div class="email">{{ currentUser?.email }}</div>
        </div>
        <ul class="people">
          <ConversationVue
            v-for="conversation in conversations"
            :memberId="getMemberId(conversation)"
            :isCurrent="currentConversation._id === conversation._id"
            :key="conversation._id"
          /> 
        </ul>
      </div>
      <div class="chatbox">
        <ChatBoxVue v-if="currentConversation" :conversationId="currentConversation._id" :memberId="getMemberId(currentConversation)" />
      </div>
    </div>
  </div>
  
</template>

<script lang="ts">
import './style.scss';
import { defineComponent, ref, inject, Ref } from "vue";
import conversationApi from "@/api/conversation";
import User from '@/models/user';
import Conversation from '@/models/conversation';
import ConversationVue from './Conversation.vue';
import ChatBoxVue from './ChatBox.vue';

export default defineComponent({
  name: "Messenger",
  components: {
    ConversationVue,
    ChatBoxVue
  },
  setup() {
    const currentUser = inject<Ref<User>>('user');
    const conversations = ref<Conversation[]>([]);
    const currentConversation = ref<Conversation>();

    currentUser && conversationApi.findByUser(currentUser.value.id)
      .then(res => {
        conversations.value = res;
        currentConversation.value = res[0];
      });

    function getMemberId(conversation: Conversation) {
      return conversation.members.find(memberId => memberId !== currentUser?.value.id);
    }

    return {
      currentUser,
      conversations,
      getMemberId,
      currentConversation
    };
  },
});
</script>
