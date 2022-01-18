<template>
  <button @click="loginDialog">LOGIN</button>
  <div id="nav"></div>
  <router-view />
  <Dialog v-if="this.$store.state.loginModalOpenState"></Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dialog from "@/components/Dialog.vue";

export default defineComponent({
  name: "App",
  components: { Dialog },
  methods: {
    loginDialog() {
      this.$store.commit("setLoginModalOpenState", true);
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
