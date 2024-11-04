//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const dotenv = require("dotenv").config();
const { userRouter } = require('./routes/user');
const { adminRouter } = require('./routes/admin');
const cors = require('cors');
const { mongoose } = require('./db');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/admin', adminRouter);

const port = process.env.PORT;



async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

main();
