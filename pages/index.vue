<template>
  <div class="container"></div>
</template>

<script>
import { firebase } from "~/plugins/firebase";
export default {
  mounted() {
    //vuexの情報を扱うためには基本的にthis.$storeを使う
    // stateはvuexでデータを管理している場所。Vueでいうところのdata
    //   console.log(this.$store.state.user);

    console.log(this.$store.getters.isAuthenticated);
  },
  methods: {}
};
</script>
