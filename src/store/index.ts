import { createStore } from "vuex";
import { getProductById, getProducts, Product } from "@/api/product";
import { AppState } from "@/store/state";
import {getComments, postComment} from "@/api/comments";
import { Comment } from "@/api/comments";

export default createStore<AppState>({
  state: {
    traktorList: [],
    productId: null,
    product: null,
    commentList: [],
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
    },
    setCommentList(state, payload: Comment[]) {
      state.commentList = payload;
    },
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
    getCommentList(context) {
      if (!context.state.productId) {
        return;
      }
      getComments(context.state.productId).then((payload) => {
        context.commit("setCommentList", payload);
      });
    },
    addNewComment(context, newComment: string) {
      if (!context.state.productId) {
        return;
      }
      const comment = {
        text: newComment,
        productId: context.state.productId,
      }
      postComment(comment).then(() => {
        context.dispatch("getCommentList");
      });
    }
  },
  modules: {},
  getters: {
    traktorList: (state) => state.traktorList ?? [],
    selectedProductId: (state) => state.productId,
    product: (state) => state.product,
    commentList: (state) => state.commentList ?? [],
  },
});
