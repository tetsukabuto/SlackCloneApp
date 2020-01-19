<template>
  <div class="input-container">
    <!-- v-onはイベント(HTMLに対して起きる変化)を監視する機能。例えばボタンが押されたとかHTMLが表示されたとか -->
    <!-- フォーム欄をクリックしたときにmethodsで定義したloginを呼び出しポップアップのアラートを出す -->
    <!-- <textarea v-on:click="login"></textarea> -->

    <!-- v-onは@と省略できる -->
    <!-- <textarea @click="login"></textarea> -->

    <!-- v-modelはHTMLの値が変わるとJavaScriptのデータの値が変わる仕組みのディレクティブ(双方向データバインディング) -->
    <!-- v-on:keydown.enterはエンターが押されたらaddMessageを実行 -->
    <textarea v-model="text" v-on:keydown.enter="addMessage"></textarea>

    <!-- ボタン押下でv-model="text"で取得した値をconsol.logで表示 -->
    <!-- <button v-on:click="checkTextValue">値を確認!</button> -->
  </div>
</template>
<script>
import { db } from "~/plugins/firebase";

export default {
  data() {
    return {
      // v-model="text"で取得した値の初期値
      //text: "テスト"

      text: null
    };
  },
  //methodsはmethods内に独自のfunctionを定義してそれを呼び出す
  methods: {
    //フォーム欄をクリックしたときポップアップのアラートを呼び出すメソッド
    // login() {
    //   window.alert("ログインしろよ");
    // }
    //ボタン押下でv-model="text"で取得した値をconsol.logで表示する関数
    // checkTextValue() {
    //   console.log(this.text);
    // }
    addMessage() {
      //日本語の入力時、変換の際、押されるenterキーの keyCode が 229 なので、その時はreturnしてメッセージを保存しないようにする
      // if (event.keyCode === 229) {
      //   return;
      // }

      //keyCode が 229という数字は可読性がよくないので、わかりやすくするためメソッドにkeyDownedForJPConversionを追加してそこで日本語変換の際のenterキーが押されたか判別する
      if (this.keyDownedForJPConversion(event)) {
        return;
      }
      const channelId = this.$route.params.id;
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .add({
          text: this.text,

          //データ作成時に作成した日時を入力しておき、それを順に並び替えるためcreatedAtを作成
          //createdAtは作成日時を保存
          //new Date() で現在の日時を取得してgetTime()で数字のみでその日時の値を取得できるよう変換
          createdAt: new Date().getTime()
        })
        .then(() => {
          //メッセージ送信後にテキストエリアを空にしたいのでnullをtextに代入
          this.text = null;
          //alert("メッセージの保存に成功しました");
        });
    },
    //日本語変換のためにenterキーが押されたが判別するメソッド
    keyDownedForJPConversion(event) {
      //日本語変換のためにenterキーのキーコードは229なのでcodeForConversionに代入
      //キーコードを代入することによって意味をわかりやすいものにする
      //※229みたいなコードを書いた本人しかわからない番号はマジックナンバーと言って好ましくないので変数もしくは定数にしておく
      const codeForConversion = 229;
      return event.keyCode === codeForConversion;
    }
    //第一引数のeventは実行されたイベントの内容を取得する引数
    // addMessage(event) {
    //キーコード取得用のデバッガー
    //   debugger;
    // }
  }
};
</script>
<style scoped>
.input-container {
  padding: 10px;
  height: 100%;
}

textarea {
  width: 100%;
  height: 100%;
}
</style>
