const app = require("./app")
const connectDB = require("./config/db");


const port = process.env.PORT || 3100


app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port:${port}`)
})