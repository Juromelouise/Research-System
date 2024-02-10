const app = require('./app')
const cloudinary = require('cloudinary')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

connectDatabase();
console.log(process.env.CLOUDINARY_API_SECRET)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT, () => {console.log(`server is started on port:${process.env.PORT} in ${process.env.NODE_ENV} mode ${process.env.CLOUDINARY_API_KEY}`)})