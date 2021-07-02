var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
const DB = require('./controllers/db_controller');
const moment = require('moment');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var adminRouter = require('./routes/admin');
// var sponsorRouter   = require('./routes/sponsor');
var envoyRouter = require('./routes/envoy');
var users = [];

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/admin', adminRouter);
// app.use('/sponsor', sponsorRouter);
app.use('/envoy', envoyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  res.io = io;
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


io.on("connection", function (socket) {
  console.log("User connected", socket.id);

  // attach incoming listener for new user
  socket.on("user_connected", function (username) {
    // save in array
    users[username] = socket.id;
    console.log(users);
    io.emit("user_connected", username);
  });

  // listen from client
  socket.on("send_task", async (data) => {
    // send event to receiver
    var socketId = users[data.receiver];
    var cat, msg = ""

    if (data.sender == data.receiver) {
      var datas = { "action": "pass" };
      cat = "task_c";
      msg = "You have " + (data.count + 1).toString() + " Created Task(s)";
    } else {
      var datas = { "action": "reload" };
      cat = "task_a";
      msg = "You have " + (data.count + 1).toString() + " Assigned Task(s)";
    }

    io.to(socketId).emit("new_task", datas);

    //save to database
    let rt = "";
    let d_created = moment().format('YYYY-MM-DD  HH:mm:ss.000');
    if (data.ID && data.ID != "") {
      let updatey = await DB.updateNotification(data.subject, data.desc, data.due, data.ID)
      rt = "Task Updated Succesfully";
      cat = "task_u";
    } else {
      let insert = await DB.createNewNotification(data.sender, data.receiver, data.subject, data.desc, data.category, d_created, "", data.due);
      rt = "Task Created Succesfully";
    }


    let exist = await DB.notyExist(data.receiver, cat);
    if (exist.length > 0) {
      if (cat == "task_u") {
        msg = "You have " + (exist[0].count + 1).toString() + " Updated Task(s)";
      }
      let update = await DB.updateNoty(data.receiver, msg, data.count + 1, cat);
    } else {
      if (cat == "task_u") {
        msg = "You have 1 Updated Task(s)";
      }
      let insert_2 = await DB.addNoty(data.receiver, msg, cat, data.count + 1);
    }

    var socketId_r = users[data.sender];
    io.to(socketId_r).emit("new_task_succeded", { "success": rt });
    // console.log(rt)
  });

  // listen from client for message
  socket.on("send_message", async function (data) {
    // send event to receiver
    var socketId = users[data.receiver];
    var newy = { "sender": data.sender, "receiver": data.receiver, "msg": data.msg, "sender_name": data.send_name, "receiver_name": data.rec_name };

    let d_created = moment().format('YYYY-MM-DD  HH:mm:ss.000');
    let exist = [];
    if (data.id && data.id != "") {
      exist = await DB.getChat(data.id);
      var chat = JSON.parse(exist[0].message);
      // console.log(chat);
      // console.log(newy);
      // chat.push(newy);
      var chat = JSON.stringify(chat);
      let update = await DB.updateChat(chat, exist[0].id);

    } else {
      var chat = [];
      chat.push(newy);
      var chat = JSON.stringify(chat);
      let insert = await DB.createNewNotification(data.sender, data.receiver, "New Chat", chat, "chat", d_created, "", "");

    }

    let testin = await DB.notyExist(data.receiver, "chat");
    if (testin.length > 0) {
      let gst = "You have " + (testin[0].count + 1).toString() + " Unread Messages " + data.send_name;
      let update_2 = await DB.updateNoty(data.receiver, gst, (testin[0].count + 1).toString(), "chat");
    } else {
      let insert_2 = await DB.addNoty(data.receiver, "You Have 1 unread message from " + data.send_name, "chat", 1);
    }

    io.to(socketId).emit("new_message", data);
    console.log(socketId);
  });


});




module.exports = { app: app, server: server };