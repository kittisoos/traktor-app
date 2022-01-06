<template>
  <div class="home">
    <Dialog v-show="dialogOpen" @closeDialog="hideDialog">valami</Dialog>
    <div @click="getDbDataList">gyere</div>
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
        <tr v-for="product in dbDataList" :key="product.id">
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
import { getProducts, Product } from "@/api/product";
import Dialog from "@/components/Dialog.vue";

export default defineComponent({
  name: "Home",
  components: { Dialog },
  data() {
    return {
      dbDataList: [] as Product[],
      dialogOpen: false,
    };
  },
  methods: {
    getDbDataList() {
      getProducts().then((data) => {
        this.dbDataList = data;
      });
    },
    showDialog() {
      this.dialogOpen = true;
    },
    hideDialog() {
      this.dialogOpen = false;
    },
  },
});
</script>
