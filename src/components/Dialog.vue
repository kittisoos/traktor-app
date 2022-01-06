<template>
  <div class="dialogWrapper">
    <div class="dialog">
      <button @click="() => this.$emit('closeDialog')">Close</button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["closeDialog"],
  name: "Dialog",
  components: {}
});
</script>

<style scoped>
.dialogWrapper {
  background: #ff00007a;
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
