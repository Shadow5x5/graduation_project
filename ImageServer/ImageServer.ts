import express from "express";
const app = express();
const PORT = 3500;
app.use(express.static("images"));
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
