<template>
  <div class="product">
    {{ this.$store.getters.product }}
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
  computed: {},
});
</script>
