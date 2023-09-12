const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");

const app = express();
dotenv.config();


app.get('/', (req, res) => {
    res.send("API is  Running succefully");
});

app.get('/api/chat', (req,res) =>{
    res.send(chats);
});

app.get('/api/chat/:id', (req,res) => {
//console.log(req.params.id);
const singlechat = chats.find((c)=> c._id === req.params.id);
res.send(singlechat);
})
const PORT = process.env.PORT || 5000 // Substitua pelo número da porta que você deseja usar


app.listen(PORT, () => {
   console.log(`Server running on PORT ${PORT}`);
});
