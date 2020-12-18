module.exports = function(red) { //node-redのnodeとして外部から参照可能なようにexportsする
  function Door(config) {  //nodeの関数
    red.nodes.createNode(this,config); //node作成時のconfigigration設定
    var node = this; //thisの退避

    try {
      node.on('input', function(msg) {  //nodeにデータが流れてきた時の処理の定義
           let Options = new Object();
           Options.OriginalID = config.OriginalID;

           const date = new Date();

           var array = ["08", "09"];
           var data1 = array[Math.floor(Math.random() * array.length)];

           msg.payload = {
               "Time": date.toString(),
               "OriginalID":Options.OriginalID,
               "EEP": "1BS",
               "Data1":data1,
               "Data4":"00000000",
               "SubTelNum":[1],
               "dBm":[50]                 //RSSI値
           };
        node.send(msg); //データを次のノードに渡す
      });
    } catch(e) { //エラー処理（ざっくり）
      node.error(e) //エラーをnodeに伝える
    }
  }
  red.nodes.registerType("Door",Door); //Doorという名前で定義した関数を登録
};