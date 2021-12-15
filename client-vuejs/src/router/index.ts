import { createWebHistory, createRouter } from "vue-router";
import Login from "@/pages/login/Login.vue";
import Chat from "@/pages/messenger/Messenger.vue";

const routes = [
  {
    path: "/",
    name: "chat",
    beforeEnter : guardMyroute,
    component: Chat,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function guardMyroute(to: any, from: any, next: any)
{
  if(localStorage.getItem('loggedUser')) {
    next();
  } else {
    next('/login');
  }
}

export default router;