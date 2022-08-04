const express = require('express')
const dotenv = require('dotenv')
const morgan  = require('morgan')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')



// attach the config file with dotenv
dotenv.config({ path: './config/config.env' })

// Passport config (passing poassport as a parameter)
require('./config/passport')(passport)

connectDB()
const app = express()

// middlewares
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
// sessions (from express-session)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))
// initialize passport
app.use(passport.initialize())
// already installed with the dependencies
app.use(passport.session())

// log any request to the console 
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


app.listen(PORT, console.log(`server listening in ${process.env.NODE_ENV} mode on port ${PORT}`))