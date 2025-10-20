const express = require('express');
const mqtt = require('mqtt');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 開閉状態
let lockStatus = "unknown";

// HiveMQのMQTTブローカーに接続
const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("lock/status");
});

client.on("message", (topic, message) => {
  lockStatus = message.toString();
  console.log("Lock status updated to:", lockStatus);
});

// 現在の状態を取得
app.get("/status", (req, res) => {
  res.json({ status: lockStatus });
});

ap





//ローカル
// const express = require('express');
// const mqtt = require('mqtt');
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// // 開閉状態を保存
// let lockStatus = "unknown";

// // MQTTブローカーに接続
// const client = mqtt.connect("mqtt://broker.hivemq.com");

// client.on("connect", () => {
//   console.log("Connected to MQTT broker");
//   client.subscribe("lock/status");
// });

// client.on("message", (topic, message) => {
//   lockStatus = message.toString();
//   console.log("Lock status updated to:", lockStatus);
// });

// // 現在の状態を取得
// app.get("/status", (req, res) => {
//   res.json({ status: lockStatus });
// });

// // 起動
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


//原案
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json()); // JSON受信対応

// // 開閉状態を保存（仮のメモリ保存）
// let lockStatus = "unknown";

// // GET：現在の状態を取得
// app.get('/status', (req, res) => {
//     res.json({ status: lockStatus });
// });

// // POST：状態を更新（Picoが送信）
// app.post('/update', (req, res) => {
//     const { status } = req.body;
//     if (status) {
//         lockStatus = status;
//         console.log(`Lock status updated to: ${status}`); // ← 修正①
//         res.json({ message: 'Status updated', status });
//     } else {
//         res.status(400).json({ error: 'Missing status' });
//     }
// });

// // 起動
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`); // ← 修正②
// });
