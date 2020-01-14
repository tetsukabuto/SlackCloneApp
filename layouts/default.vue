<template>
  <div class="app-layout">
    <div class="sidebar">
      <p>チャンネル一覧</p>
      <!-- arrayなどの値をくり抱えし表示する場合はv-forディレクティブをつかう。 -->
      <!-- v-forディレクティブを使用する際は 不具合防止のためにv-bind:key=""も一緒に設定する。 -->
      <p v-for="channel in channels" v-bind:key="channel.id">
        <!-- channel.nameとした理由はfirestoreのdocumentのフィールドをnameに -->
        {{ channel.name }}
      </p>
    </div>
    <div class="main-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
// plugins/firebase.js で定義した db を読み込む
import { db } from "~/plugins/firebase";

export default {
  data() {
    return {
      channels: []
    };
  },

  //mountedはコンポーネントが描画された時に実行するメソッド

  mounted() {
    //firebaseからデータを取得する場合はchannele idを指定して
    //db.collection(チャンネルID).doc(ドキュメントID)
    // db.collection("channels")
    //   //docidを指定する
    //   .doc("NjrpungefpOjdiiQB6sY")
    //   //指定したchannele id,doc idに対してget()を実行することによってdocという値が返ってくる
    //   .get()
    //   //.thenはget()が成功した時のみ実行される
    //   .then(doc => {
    //     console.log("doc.id: ", doc.id);
    //     console.log("doc.data(): ", doc.data());
    //   });

    //全てのdocを取得するのでcollection idを指定
    db.collection("channels")
      .get()
      .then(querySnapshot => {
        // querySnapshotには複数のドキュメントの情報がある。forEachでdocを一つずつ取得
        querySnapshot.forEach(doc => {
          //取得した一つ一つのdocの処理
          //console.log(doc.id, " => ", doc.data());

          //thisでdataの値を取得して
          this.channels.push(doc.data());
        });
      });
    console.log(this.channels);
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.app-layout {
  display: flex;
}

.sidebar {
  width: 300px;
  background: #4a4141;
  height: 100vh;
  padding: 20px;
}

.sidebar p {
  color: #ddd;
  padding-top: 4px;
}

.main-content {
  width: 100%;
  background: #f1f1f1;
  height: 100vh;
}
</style>
