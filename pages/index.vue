<template>
  <div class="container">
    <div class="chats-layout">
      <Messages />
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
export default {
  components: {
    //読み込んだコンポーネントをこのvueファイルで使えるよう設定
    Messages,
    ChatForm
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
