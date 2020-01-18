<template>
  <div class="chats-container">
    <message v-for="message in messages" :key="message.id" :message="message" />
  </div>
</template>

<script>
import Message from "~/components/Message.vue";
export default {
  //親コンポーネント_id.vueからmessages: []の値を受け取るにはprops(※propertiesの略)を使う
  //props: ["messages"]は親コンポーネントのtemplate内のバインドした値(messages)と同じものにする
  props: ["messages"],
  components: {
    Message
  },
  mounted() {
    console.log(this.messages);
  }
};
</script>

<style scoped>
/* scopedはこのvueファイル内のみスタイルを適用される。
他のvueファイルには一切影響されない */
.chats-container {
  padding: 16px;
}
</style>
