<template>
  <div class="home">
    <Dialog v-show="dialogOpen" @closeDialog="hideDialog">valami</Dialog>
    <button @click="showDialog">dialog</button>
    <table>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in dbDataList" :key="product.id" @click="() => routeToProduct(product.id)">
          <td>{{product.id}}</td>
          <td>{{product.name}}</td>
          <td>{{product.price}}</td>
          <td>{{product.quantity}}</td>
          <td>{{product.description}}</td>
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
      return this.$store.getters.list;
    },
  },
});
</script>
