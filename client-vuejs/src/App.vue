<template>
  <router-view />
</template>

<script lang="ts">
import './assets/styles/global.scss';
import { defineComponent, provide, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    let user = localStorage.getItem('loggedUser');
    user = user && JSON.parse(user);
    const currentUser = ref(user);
    provide('user', currentUser);
  }
});
</script>

<style lang="scss">

</style>
