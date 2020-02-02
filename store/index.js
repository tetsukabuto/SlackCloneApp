import Vuex from "vuex";

//Vuex の厳格な思想には則らないという意味でexport const strict はfalse
export const strict = false;

//stateはvuexでデータを管理している場所。Vueでいうところのdata
export const state = () => ({
  user: null
});

//gettersはVueでいうところのcomputed
export const getters = {
  isAuthenticated(state) {
    //!!state.userはJavaScriptでよくある表現。state.userがあればtrue、なければfalseを返す
    return !!state.user;
  }
};

//mutationsはStateを変更するもの。今回の場合だとログインしたユーザー情報をStateに反映させる時に使用
export const mutations = {
  //setUserというメソッドを定義。mutationsのメソッドの引数はstateとなる。2つめ以降の引数はメソッドを使う時に渡す
  setUser(state, user) {
    state.user = user;
  }
};

//Actionは処理の公開や複雑な処理を行う(publicなメソッド)
export const actions = {
  //actionの第一引数はcontext、第二引数は自分で渡す値
  setUser(context, user) {
    //context.commitを実行することでMutaionを通じてStateを変更
    //commitの第一引数にはmutasionのメソッド名を文字列で渡している
    context.commit("setUser", user);
  }
};
