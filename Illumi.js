module.exports = function(red) { //node-redのnodeとして外部から参照可能なようにexportsする
  function Illumi(config) {  //nodeの関数
    red.nodes.createNode(this,config); //node作成時のconfigigration設定
    var node = this; //thisの退避

    try {
      node.on('input', function(msg) {  //nodeにデータが流れてきた時の処理の定義
           let Options = new Object();
           Options.OriginalID = config.OriginalID;

           const date = new Date();

           const svc_data_min = 0;
           const svc_data_max = 255;
           const svc_min  = 0;
           const svc_max  = 5.1;
           var svc      = Math.random() * (svc_max - svc_min + 1.00) + svc_min; 
           var svc_data = Math.floor(svc/(svc_max-svc_min) *
                           (svc_data_max-svc_data_min));

           const ill1_data_min = 0;
           const ill1_data_max = 255;
           const ill1_min  = 0;
           const ill1_max  = 510;
           var ill1      = Math.random() * (ill1_max - ill1_min + 1.00) + ill1_min; 
           var ill1_data = Math.floor(ill1 / (ill1_max - ill1_min) *
                           (ill1_data_max - ill1_data_min));

           const ill2_data_min = 0;
           const ill2_data_max = 255;
           const ill2_min  = 0;
           const ill2_max  = 1020;
           var ill2      = Math.random() * (ill2_max - ill2_min + 1.00) + ill2_min; 
           var ill2_data = Math.floor(ill2 / (ill2_max - ill2_min) *
                           (ill2_data_max - ill2_data_min));

           var Data4 = ('00' + svc_data.toString(16)).slice( -2 ) +
                       ('00' + ill1_data.toString(16)).slice( -2 ) +
                       ('00' + ill2_data.toString(16)).slice( -2 ) +
                       "08"

           msg.payload = {
               "Time":date.toString(),
               "OriginalID":Options.OriginalID,
               "EEP":"4BS",
               "Data1":"00",
               "Data4":Data4,
               "SubTelNum":[1],
               "dBm":[45]
           };
        node.send(msg); //データを次のノードに渡す
      });
    } catch(e) { //エラー処理（ざっくり）
      node.error(e) //エラーをnodeに伝える
    }
  }
  red.nodes.registerType("Illumi",Illumi); //Illumiという名前で定義した関数を登録
};