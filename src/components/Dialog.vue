<template>
  <div class="dialogWrapper">
    <div class="dialog">
      <input v-model="userName" />
      <input v-model="password" />
      <button @click="login" :disabled="loginDisabled">LOGIN</button>
      <button @click="hideDialog">CANCEL</button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["closeDialog"],
  name: "Dialog",
  components: {},
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("checkLogin", {
        userName: this.userName,
        password: this.password,
      });
    },
    hideDialog() {
      this.$store.commit("setLoginModalOpenState", false);
    },
  },
  computed: {
    loginDisabled() {
      return this.userName == "" || this.password == "";
    },
  },
});
</script>

<style scoped>
.dialogWrapper {
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog {
  width: 500px;
  height: 300px;
  background: white;
  border: 1px solid;
}
</style>
