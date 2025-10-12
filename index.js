const express = require('express');
const app = express();
const PORT = process.env.PORT ||3000;

app.use(express.json()); //JSON受信対応

//開閉状態を保存（仮のメモリ保存）
let lockStatus = "unknown";

//GET：現在の状態を取得
app.get('/status', (req, res) => {
    res.json({ status: lockStatus });
});

//POST：状態を更（Picoが送信）
app.post('/update', (req, res) => {
    const { status } = req.body;
    if(status){
        lockStatus = status;
        console.log('Lock status update to: $(status)');
    }else{
        res.status(400).json({ error: 'Missing status' });
    }
});

//起動
app.listen(PORT, () => {
    console.log('Server running on port &{PORT}');
});