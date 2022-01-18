import { createStore } from "vuex";
import { getProductById, getProducts, Product } from "@/api/product";
import { AppState } from "@/store/state";
import { Comment, getComments, postComment } from "@/api/comments";
import { User } from "@/api/user";

export default createStore<AppState>({
  state: {
    traktorList: [],
    productId: null,
    product: null,
    commentList: [],
    isLoggedIn: false,
    loginModalOpenState: false,
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
    setLoggedIn(state, payload: boolean) {
      state.isLoggedIn = payload;
    },
    setLoginModalOpenState(state, payload: boolean) {
      state.loginModalOpenState = payload;
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
      };
      postComment(comment).then(() => {
        context.dispatch("getCommentList");
      });
    },
    checkLogin(context, user: User) {
      if (user.userName == "admin" && user.password == "admin") {
        context.commit("setLoggedIn", true);
        context.commit("setLoginModalOpenState", false);
      }
    },
  },
  modules: {},
  getters: {
    traktorList: (state) => state.traktorList ?? [],
    selectedProductId: (state) => state.productId,
    product: (state) => state.product,
    commentList: (state) => state.commentList ?? [],
  },
});
