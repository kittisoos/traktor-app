import { createStore } from "vuex";
import { getProductById, getProducts, Product } from "@/api/product";
import { AppState } from "@/store/state";

export default createStore<AppState>({
  state: {
    traktorList: [],
    productId: null,
    product: null,
  },
  mutations: {
    setTraktorList(state, payload: Product[]) {
      state.traktorList = payload;
    },
    setProductId(state, payload: number) {
      state.productId = payload;
    },
    setProduct(state, payload: Product) {
      state.product = payload;
    }
  },
  actions: {
    getTraktorList(context) {
      getProducts().then((payload) => {
        context.commit("setTraktorList", payload);
      });
    },
    getProduct(context) {
      if (!context.state.productId) {
        return;
      }
      getProductById(context.state.productId).then((payload) => {
        context.commit("setProduct", payload);
      });
    },
  },
  modules: {},
  getters: {
    list: (state) => state.traktorList ?? [],
    selectedProductId: (state) => state.productId,
    product: (state) => state.product,
  },
});
