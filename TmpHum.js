module.exports = function(red) { //node-redのnodeとして外部から参照可能なようにexportsする
  function TmpHum(config) {  //nodeの関数
    red.nodes.createNode(this,config); //node作成時のconfigigration設定
    var node = this; //thisの退避

    try {
      node.on('input', function(msg) {  //nodeにデータが流れてきた時の処理の定義
           let Options = new Object();
           Options.OriginalID = config.OriginalID;

           const date = new Date();

           const tmp_data_min = 0;
           const tmp_data_max = 1023;
           const tmp_min  = 0;
           const tmp_max  = 60;
           var   tmp      = Math.random() * (tmp_max - tmp_min + 1.00) + tmp_min;
           var   tmp_data = Math.floor(tmp/(tmp_max-tmp_min) *
                             (tmp_data_max-tmp_data_min));

           const hum_data_min = 0;
           const hum_data_max = 255;
           const hum_min = 0;
           const hum_max = 100;
           var hum       = Math.random() * (hum_max - hum_min + 1.00) + hum_min;
           var hum_data  = Math.floor(hum/(hum_max-hum_min) *
                                (hum_data_max-hum_data_min));

           var Data4 = ('00' + hum_data.toString(16)).slice( -2 ) +
                       ('0000' + tmp_data.toString(16)).slice( -4 ) + "08"

           msg.payload = {
               "Time":date.toString(),
               "OriginalID":Options.OriginalID,
               "EEP":"4BS",
               "Data1":"00",
               "Data4":Data4,
               "SubTelNum":[1],
               "dBm":[53]
           };
        node.send(msg); //データを次のノードに渡す
      });
    } catch(e) { //エラー処理（ざっくり）
      node.error(e) //エラーをnodeに伝える
    }
  }
  red.nodes.registerType("TmpHum",TmpHum); //TmpHumという名前で定義した関数を登録
};