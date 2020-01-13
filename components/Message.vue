<template>
  <div class="chat-container">
    <div class="thumbnail-container">
      <!-- HTML タグの属性(attributes)でdataの値を扱うにはv-bindを使う必要あり。src以外だとclass、id、style、hrefなど -->
      <!-- v-bindはセミコロンで書き方を省略できる。例えば今回の場合でいうと:srcのように -->
      <img v-bind:src="message.user.thumbnail" />
    </div>
    <div class="message-container">
      <!-- dataメソッドのmessageの値をmustache構文で表示 -->
      <!-- <div class="user-name">{{ message.user.name }}</div> -->
      <!-- computedで定義された値をHTMLで表示させるには定義したメソッド名をmustache構文内に記述する この場合は{{ diplayName }}-->
      <div class="user-name">{{ diplayName }}</div>
      <div class="message">{{ message.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  //特定の値を保持するためdataメソッドを定義
  data() {
    //returnで返されたオブジェクトの値をコンポーネントで自由自在に使うことができる
    return {
      message: {
        text: "今日も良い天気ですね",
        user: {
          thumbnail:
            "https://pbs.twimg.com/profile_images/1131882065337602049/0JRUGd3S_400x400.jpg",
          name: "note"
        }
      }
    };
  },
  computed: {
    //diplayNameはdataのmessage.user.nameの値を取得して@をつけてreturnする
    diplayName() {
      //thisを使うことによってdataの値を取得している
      //return "@" + this.message.user.name;
      //以下のように書くこともできる
      return `@${this.message.user.name}`;
    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  padding: 8px;
}

.thumbnail-container {
  margin-right: 16px;
}

.thumbnail-container img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.user-name {
  font-weight: bold;
}
</style>
