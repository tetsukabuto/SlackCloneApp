<template>
  <div class="container">
    <button v-on:click="login">ログイン</button>
  </div>
</template>

<script>
import { firebase } from "~/plugins/firebase";
export default {
  methods: {
    login() {
      window.alert("ログインするよ");

      //Providerを定義する:firebaseにはいろいろなログイン方法があるのでどのログイン方法を使うのか指定する(今回はGooleアカウントを使用)
      const provider = new firebase.auth.GoogleAuthProvider();
      //firebase.auth()のsinginメソッドを実行:Providerを引数にしてsinginメソッドを実行
      firebase
        .auth()
        .signInWithPopup(provider)
        //thenでログインに成功した時の処理を書いている
        .then(result => {
          //ユーザー情報を取得して
          const user = result.user;
          //console.logで出力
          console.log(user);
        })
        //catchで失敗した時の処理を書く
        .catch(error => {
          window.alert(error);
        });
    }
  }
};
</script>
