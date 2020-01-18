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
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.messages.push({ id: doc.id, ...doc.data() });
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
