import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie';

Vue.use(Vuex)
const state = {
  userName:Cookies.get("userName"),
  userImg:Cookies.get("userImg"),
  userToken:Cookies.get("Y-Token"),
  userId:Cookies.get("userId"),
  userType:Cookies.get("userType"),
  search:{
    language:'',
    content:'',
  },
  userPhone:null,
}
const store = new Vuex.Store({
  mutations: {
    increment (state,n) {
      // 变更状态
      state.userName=n.userName;
      state.userImg=n.userImg;
      state.userToken=n.userToken;
      state.userType=n.userType;
    },
    tokenFn(state,n){
      state.userToken=n;
    },
    searchFun(state,n){
      state.search.language=n.language;
      state.search.content=n.content;
      console.log("ggggg",state.search.content);

    },
    setPhone(state,n){
      state.userPhone=n;
    },
    setUserId(state,n){
      state.userId=n;
    },

    },
    state
})

export default store
