<template>
  <div class="home">
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
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity > 0 ? "yes" : "no" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Actions } from "@/store/actions.enum";
import { Mutations } from "@/store/mutations.enum";

export default defineComponent({
  name: "Home",
  components: {},
  created() {
    this.$store.dispatch(Actions.getTraktorList);
  },
  methods: {
    routeToProduct(productId: number) {
      this.$store.commit(Mutations.setProductId, productId);
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
