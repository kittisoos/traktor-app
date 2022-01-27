import { createStore } from "vuex";
import { getProductById, getProducts, Product } from "@/api/product";
import { AppState } from "@/store/state";
import { Comment, getComments, postComment } from "@/api/comments";
import { User } from "@/api/user";
import { Actions } from "@/store/actions.enum";
import { Mutations } from "@/store/mutations.enum";

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
    [Mutations.setTraktorList](state, payload: Product[]) {
      state.traktorList = payload;
    },
    [Mutations.setProductId](state, payload: number) {
      state.productId = payload;
    },
    [Mutations.setProduct](state, payload: Product) {
      state.product = payload;
    },
    [Mutations.setCommentList](state, payload: Comment[]) {
      state.commentList = payload;
    },
    [Mutations.setLoggedIn](state, payload: boolean) {
      state.isLoggedIn = payload;
    },
    [Mutations.setLoginModalOpenState](state, payload: boolean) {
      state.loginModalOpenState = payload;
    },
  },
  actions: {
    [Actions.getTraktorList](context) {
      getProducts().then((payload) => {
        context.commit(Mutations.setTraktorList, payload);
      });
    },
    [Actions.getProduct](context) {
      if (!context.state.productId) {
        return;
      }
      getProductById(context.state.productId).then((payload) => {
        context.commit(Mutations.setProduct, payload);
      });
    },
    [Actions.getCommentList](context) {
      if (!context.state.productId) {
        return;
      }
      getComments(context.state.productId).then((payload) => {
        context.commit(Mutations.setCommentList, payload);
      });
    },
    [Actions.addNewComment](context, newComment: string) {
      if (!context.state.productId) {
        return;
      }
      const comment = {
        text: newComment,
        productId: context.state.productId,
      };
      postComment(comment).then(() => {
        context.dispatch(Actions.getCommentList);
      });
    },
    [Actions.checkLogin](context, user: User) {
      if (user.userName == "admin" && user.password == "admin") {
        context.commit(Mutations.setLoggedIn, true);
        context.commit(Mutations.setLoginModalOpenState, false);
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

// const ALMA = 12;
//
// function gyumik () {
//   console.log("gyumik");
// }
//
// let obj = {
//   gyumi: ALMA,
//   gyumikek: function () {
//     console.log("gyumik");
//   },
//   gyumikek2() {
//     console.log("gyumik");
//   },
//   ["gyumikek3"]: 12,
//   ["gyumikek4"]() {
//     console.log("gyumik");
//   },
// };
