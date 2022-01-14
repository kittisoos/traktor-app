<template>
  <div class="home">
    <Dialog v-show="dialogOpen" @closeDialog="hideDialog">valami</Dialog>
    <button @click="showDialog">dialog</button>
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">In stock</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in dbDataList"
          :key="product.id"
          @click="() => routeToProduct(product.id)"
        >
          <td>{{product.name}}</td>
          <td>{{product.price}}</td>
          <td>{{product.quantity > 0 ? 'yes' : 'no'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dialog from "@/components/Dialog.vue";

export default defineComponent({
  name: "Home",
  components: { Dialog },
  created() {
    this.$store.dispatch("getTraktorList");
  },
  data() {
    return {
      dialogOpen: false,
    };
  },
  methods: {
    showDialog() {
      this.dialogOpen = true;
    },
    hideDialog() {
      this.dialogOpen = false;
    },
    routeToProduct(productId: number) {
      this.$store.commit("setProductId", productId);
      this.$router.push("/product");
    },
  },
  computed: {
    dbDataList() {
      // return this.$store.state.traktorList;
      return this.$store.getters.traktorList;
    },
  },
});
</script>

<style lang="sass" scoped>
table
  margin: 30px auto auto
  width: 60%
  box-shadow: 1px 1px 8px #c9c9c9
  border-radius: 10px
table td, table th
  text-align: left
  padding: 20px
  border-bottom: 1px solid #dadada
</style>
