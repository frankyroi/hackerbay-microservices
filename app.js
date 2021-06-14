var express = require('express');
var app = express();
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')

const auth = require('./routes/auth.js');
const thumbnail = require('./routes/thumbnail.js')
const patchJson = require('./routes/patchJson.js')

// Create a write stream
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logger.log'), {flags: 'a'})

// view engine setup
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('combined', { stream: accessLogStream }))


app.use('/api/auth', auth);
app.use('/api/thumbnail', thumbnail);
app.use('/api/patchJson', patchJson);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    res.status(404).send({ error: 'Page does not exist' })
    next(err)
  })
  
// error handler
app.use((err, req, res) => {
// set locals, only providing error in development
res.locals.message = err.message
res.locals.error = req.app.get('env') === 'development' ? err : {}

// render the error page
res.status(err.status || 500)
res.render('error')
})

app.listen(3000, function () {
  console.log('hackerbay-microservices listening on port 3000!');
});

module.exports = app