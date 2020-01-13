<template>
  <div class="chats-container">
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
    <message />
  </div>
</template>

<script>
import Message from "~/components/Message.vue";
export default {
  components: {
    Message
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
