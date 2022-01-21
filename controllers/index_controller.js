
const DB = require('./db_controller');
const moment = require('moment');

//Function To Render Home Page
module.exports.homePage = async (req, res, next) => {
  var settings = await DB.getSiteSettings();
  var kss = await DB.goalStats("Kids To School");
  var kssp = await DB.goalStats("Kids To Sports");
  var kas = await DB.goalStats("Kids To Arts");
  var ktx = await DB.goalStats("Kids To Tech");
  var events = await DB.getEvents();
  events.forEach(event => {
    const d = new Date(event.time);
    const nextHour = moment(d).add(2, 'hours');
    event.date = moment(d).format('DD.MM.YYYY');
    var beg = moment(d).format('HH:MM A');
    var end = nextHour.format('HH:MM A');
    event.time = beg + " - " + end;
    console.log(event.time);

  });
  var context = { setts: settings[0], kss: kss[0], kssp: kssp[0], kas: kas[0], ktx: ktx[0], events: events }
  res.render('home/index', context);
};