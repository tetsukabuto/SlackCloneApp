<template>
  <div class="app-layout">
    <div class="sidebar">
      <p>チャンネル一覧</p>
      <!-- arrayなどの値をくり抱えし表示する場合はv-forディレクティブをつかう。 -->
      <!-- v-forディレクティブを使用する際は 不具合防止のためにv-bind:key=""も一緒に設定する。 -->
      <p v-for="channel in channels" v-bind:key="channel.id">
        <!-- channel.nameとした理由はfirestoreのdocumentのフィールドをnameに -->
        <!-- {{ channel.name }} -->

        <!-- リンクを生成するにはnuxt-linkを使う toをわたしてあげるとchannelへのリンクが生成される リンク先はchannel.idを取得して判別-->
        <nuxt-link :to="`/channels/${channel.id}`">
          {{
          channel.name
          }}
        </nuxt-link>
      </p>
      <p v-if="isAuthenticated" class="logout" v-on:click="logout">ログアウト</p>
    </div>
    <div class="main-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
// plugins/firebase.js で定義した db を読み込む
// import { db } from "~/plugins/firebase";
import { db, firebase } from "~/plugins/firebase";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      channels: []
    };
  },
  computed: {
    //ログアウトしているかしていないか判断する
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    ...mapActions(["setUser"]),
    logout() {
      //firebaseでログアウトするにはfirebase.auth().signOut()を使用
      firebase
        .auth()
        .signOut()
        .then(() => {
          //ログアウトが成功したときにはsetUserで判断してuserをnullにする※ログアウトする際nullにしないとログアウトリンクとユーザー情報がtextarea横のアイコン画像が残ってしまうため
          this.setUser(null);
          window.alert("ログアウトに成功!");
        })
        .catch(e => {
          window.alert("ログアウトに失敗しました");
          console.log(e);
        });
    }
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
          //this.channels.push(doc.data());

          //pushする段階でドキュメントのidつまり、channelのidを取得
          //...doc.data()はスプレッド構文でオブジェクトを展開している
          //スプレッド構文とは配列やオブジェクトを展開する構文
          //以下スプレッド構文の例
          //var channel = {name: 'random'}
          //...channelがスプレッド構文
          //console.log({id: 1, ...channel})
          //cosole.logでの表示結果は以下のようにchannelのオブジェクトが展開されkeyとvalue出力される
          //=> {id: 1, name: "random"}
          this.channels.push({ id: doc.id, ...doc.data() });
        });
      });
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
  color: #ddd;
  width: 300px;
  background: #4a4141;
  height: 100vh;
  padding: 20px;
}

.sidebar p > a {
  color: #ddd;
  padding-top: 4px;
}

.main-content {
  width: 100%;
  background: #f1f1f1;
  height: 100vh;
}
.logout {
  position: absolute;
  bottom: 10px;
  cursor: pointer;
}
</style>
