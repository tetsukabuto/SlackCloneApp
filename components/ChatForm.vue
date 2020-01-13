<template>
  <div class="input-container">
    <!-- v-onはイベント(HTMLに対して起きる変化)を監視する機能。例えばボタンが押されたとかHTMLが表示されたとか -->
    <!-- フォーム欄をクリックしたときにmethodsで定義したloginを呼び出しポップアップのアラートを出す -->
    <!-- <textarea v-on:click="login"></textarea> -->

    <!-- v-onは@と省略できる -->
    <textarea @click="login"></textarea>
  </div>
</template>
<script>
export default {
  //methodsはmethods内に独自のfunctionを定義してそれを呼び出す
  methods: {
    //フォーム欄をクリックしたときポップアップのアラートを呼び出すメソッド
    login() {
      window.alert("ログインしろよ");
    }
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
