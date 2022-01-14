<template>
  <div class="product">
    <div>
      <h3>
        {{ this.$store.getters.product.name }}
      </h3>
      <p>
        {{ this.$store.getters.product.price }}HUF qt:{{
          this.$store.getters.product.quantity
        }}
      </p>
      <img src="../assets/tractor.jpeg" alt="Traktor" style="width: 100%; height: 100%"/>
      <p>
        {{ this.$store.getters.product.description }}
      </p>
    </div>
  </div>
  <div class="comments">
    <div v-for="comment in this.$store.getters.commentList"
         v-bind:key="comment.id"
    >
      {{ comment }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Product",
  components: {},
  created() {
    this.$store.dispatch("getProduct");
  },
  data() {
    return {};
  },
  methods: {},
  computed: {}
});
</script>

<style lang="sass" scoped>
.product
  display: flex
  flex-direction: column
  width: 30%
  box-shadow: 1px 1px 8px #c9c9c9
  border-radius: 10px
  text-align: left
  padding-left: 20px
</style>
