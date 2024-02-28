const express = require('express')

const app = express()
const dbConfig = require("./config/dbConfig")

const portfolioRoute= require("./routes/portfolioRoute");
const userRoute = require('./routes/portfolioRoute'); 
app.use(express.json());

app.use("/api/portfolio",portfolioRoute);
app.use('/api/user', userRoute);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});