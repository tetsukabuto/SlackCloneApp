<template>
  <div class="container">
    <div class="chats-layout">
      <!--子コンポーネントであるmessagesにdata内のmessages: []を受け渡すには任意のアトリビュート(今回はmessage)を設定 -->
      <messages :messages="messages" />
    </div>
    <div class="input-layout">
      <chat-form />
    </div>
  </div>
</template>

<script>
// importで使用したいコンポーネントを読み込み
import Messages from "~/components/Messages.vue";
import ChatForm from "~/components/ChatForm.vue";
import { db } from "~/plugins/firebase";
export default {
  components: {
    //読み込んだコンポーネントをこのvueファイルで使えるよう設定
    Messages,
    ChatForm
  },
  data() {
    return { messages: [] };
  },
  mounted() {
    //nuxtではthis.$routeを指定することでurlに関する情報を取得できる
    //ここではチャンネルID(documentのid)をルーティングから取得してchannelIdに代入
    //this.$route.paramsにパラメータの情報が保持されている
    //_id.vueと指定いる場合はthis.$routes.params.id でパラメーターを取得できる
    const channelId = this.$route.params.id;

    //channelsというコレクションに保存されているdocumentにあるmessagesのコレクションを指定して保存
    // db.collection("channels")
    //   .doc(channelId)
    //   .collection("messages")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       this.messages.push({ id: doc.id, ...doc.data() });
    //     });
    //   });

    db.collection("channels")
      .doc(channelId)
      //.collection("messages")に対して↓onSnapshotが実行される
      .collection("messages")
      //orderByはfirestoreのメソッドで複数のドキュメントを並び替える。引数にメッセージ送信時に送られてくるcreatedAtで作成日時を呼び出し作成順に並び替える
      .orderBy("createdAt")
      //onSnapshotメソッドを使用して、ドキュメントをリッスン(監視)する
      .onSnapshot(snapshot => {
        //message collectionにに変更があったら以下の処理を実行
        //collectionに変化があった時にsnapshotがコールバック関数にわたされる
        //snapshotはデータベースのコピーのようなものでデータベースに変更があった場合にもsnapshot.docChangesで取得しそれをforEachでいろいろ実行する
        snapshot.docChanges().forEach(change => {
          //change.doc で doc が取得できる
          const doc = change.doc;
          //firestoreの変更がタイプがadded(更新)されたときにメッセージを追加
          //データ更新された時以外でもcollectionに保存されているdoc読み込む際もaddedイベントが実行され過去のメッセージも確認できる
          if (change.type === "added") {
            this.messages.push({ id: doc.id, ...doc.data() });
          }
        });
      });
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}

.chats-layout {
  overflow: scroll;
  height: 90%;
}

.input-layout {
  height: 10%;
}
</style>
