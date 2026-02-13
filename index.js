const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db')

dotenv.config();

connectDB()

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors());
app.use(express.json());

app.use(require("./routes/auth.routes"));
app.use(require("./routes/user.routes"));
app.use(require("./routes/category.routes"))
app.use(require('./routes/transaction.routes'));

app.get("/", (req, res) => {
    res.send("Fintrack Server is Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});