import firebase from "firebase/app"; //firebase全般の機能を利用するために必要
import "firebase/auth"; //ログイン機能を使うために読み込み
import "firebase/firestore"; //データベースを使うために読み込み

//firebaseの準備ができている場合のみに設定する
if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyBduaUB1_DgsOCUW-p8GscU0OnHHT66iVU",
    authDomain: "slack-clone-app-b3dad.firebaseapp.com",
    databaseURL: "https://slack-clone-app-b3dad.firebaseio.com",
    projectId: "slack-clone-app-b3dad",
    storageBucket: "slack-clone-app-b3dad.appspot.com",
    messagingSenderId: "124852119412"
  };
  firebase.initializeApp(config); //configによってfirebaseの設定を行う
}

const db = firebase.firestore(); //データベースを定義
export { firebase, db }; //別ファイルからでもfirebaseとdbを利用できるようexportしておく
