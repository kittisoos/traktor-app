<template>
  <div
    class="grid-container"
    style="display: flex; flex-direction: row; margin: auto"
  >
    <div class="product grid-item">
      <h3>
        {{ this.$store.getters.product.name }}
      </h3>
      <p>
        {{ this.$store.getters.product.price }}HUF qt:{{
          this.$store.getters.product.quantity
        }}
      </p>
      <img
        src="../assets/tractor.jpeg"
        alt="Traktor"
        style="width: 100%; height: 100%"
      />
      <p>
        {{ this.$store.getters.product.description }}
      </p>
    </div>
    <div class="comments grid-item">
      <div
        v-for="comment in this.$store.getters.commentList"
        v-bind:key="comment.id"
        class="comment"
      >
        {{ comment.text }}
      </div>
      <input type="text" v-model="newComment.text" />
      <button @click="sendComment" :disabled="!this.$store.state.isLoggedIn">
        Send
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Actions } from "@/store/actions.enum";

export default defineComponent({
  name: "Product",
  components: {},
  created() {
    this.$store.dispatch(Actions.getProduct);
    this.$store.dispatch(Actions.getCommentList);
  },
  data() {
    return {
      newComment: {
        text: "",
      },
    };
  },
  methods: {
    sendComment() {
      if (!this.newComment.text) {
        return;
      }
      this.$store.dispatch(Actions.addNewComment, this.newComment.text);

      this.newComment.text = "";
    },
  },
  computed: {},
});
</script>

<style lang="sass" scoped>
.product, .comments
  display: flex
  flex-direction: column
  width: 50%
  box-shadow: 1px 1px 8px #c9c9c9
  border-radius: 10px
  text-align: left
  padding: 20px
  margin: 20px
.grid-container
  display: inline-grid
.comment
  padding: 5px
</style>
