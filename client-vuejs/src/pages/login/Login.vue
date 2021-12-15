<template>
  <section class="login-page">
    <div class="wrapper fadeInDown">
      <div id="formContent">

        <!-- Login Form -->
        <form @submit.prevent="handleLoginSubmit">
          <input type="text" class="fadeIn second" v-model="email" placeholder="Email">
          <input type="password" class="fadeIn third" v-model="password" placeholder="Password">
          <input type="submit" class="fadeIn fourth" value="Log In">
        </form>

        <!-- Register -->
        <div id="formFooter">
          Vous n'aver pas de compte? <a class="underlineHover" href="#">Register</a>
        </div>

      </div>
    </div>
  </section>
</template>

<script lang="ts">
import './style.scss';
import { defineComponent, inject, provide, Ref, ref } from 'vue';
import authApi from '@/api/auth';
import { useRouter } from 'vue-router';
import User from '@/models/user';

export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref<string>("");
    const password = ref<string>("");
    const router  =  useRouter();
    const currentUser = inject<Ref<User>>('user');

    async function handleLoginSubmit(): Promise<void> {
      try {
        const data = await authApi.signIn({email: email.value, password: password.value});
        const user = new User(data);
        localStorage.setItem('loggedUser', JSON.stringify(user));
        if (currentUser) currentUser.value = user;
        router.push('/');
      } catch (err) {
        // err
        console.error(err)
      }
    }
    
    return {
      handleLoginSubmit,
      email,
      password
    }
  }
});
</script>
