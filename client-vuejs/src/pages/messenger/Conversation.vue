<template>
  <li v-if="user" class="person" :class="{focus: isCurrent}">
    <span class="title">{{user.userName}}</span>
    <!-- <span class="time">2:50pm</span><br>
    <span class="preview">What are you getting... Oh, oops...</span> -->
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import conversationApi from "@/api/conversation";
import User from '@/models/user';
import Conversation from '@/models/conversation';
import userApi from "@/api/user";

export default defineComponent({
  name: "Conversation",
  props: {
    memberId: {
      type: String,
      required: true
    },
    isCurrent: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const user = ref<User>();

    userApi.findOne(props.memberId)
      .then(res => {
        user.value = new User(res);
      })
    
    return {
      user
    };
  },
});
</script>
