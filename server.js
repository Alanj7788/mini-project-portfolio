const express = require('express')

const app = express()
const dbConfig = require("./config/dbConfig")

const portfolioRoute= require("./routes/portfolioRoute");
const userRoute = require('./routes/portfolioRoute'); 
const idRoute = require('./routes/useridRoute'); 
const ideaRoute = require('./routes/userideaRoute'); 
app.use(express.json());

app.use("/api/portfolio",portfolioRoute);
app.use('/api/user', userRoute);
app.use('/api/ids', idRoute);
app.use('/api/idea', ideaRoute);

app.use(express.static('users'));

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});