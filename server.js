 var express = require('express'),
  router = express.Router()

var app = express();


var bodyParser = require('body-parser')
const fs = require('fs');
//to use classic encoding

app.use(bodyParser.urlencoded({
  extended: false
}))

var cors = require('cors');
app.use(cors({
  optionSuccessStatus: 200
})); // some legacy browsers choke on 204



// Pandoc Woking-------------------------------------------------------------
var pandoc = require('node-pandoc'),
  args = '-t beamer -o node_out.pdf',
  args2 = '-o node_out.pdf';
// eslint-disable-next-line no-undef
var callback = function (err, result) {
  if (err) console.error('Oh Nos: ', err);
  return console.log(result), result;
};


app.use('/public', express.static(process.cwd() + '/public'));
app.use('/', express.static(process.cwd() + '/'));


app.use(require('./controllers'))


//POST from HTML --------------------------------------------------------

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/new', function (req, res) {
  // var dir = req.body.dir
  var title = req.body.title
  var author = req.body.author
  var theme = req.body.theme
  var head1 = req.body.head1
  var count = req.body.count
  var src = head1.replace(/\r/g, '\n')

  var data = '---\r\n' + 'title:\r\n' + '- ' + title + '\r\nauthor:\r\n' + '- ' + author + '\r\ntheme:\r\n' + '- ' + theme + '\r\n---\r\n\r\n' + '# ' + src

  // var arrray = ["#", "##", "", "!", "$$"];
  var Select
  var Text_
  for (var i = 1; i < count; i++) {
    Select = "Select" + i
    Text_ = "Text_" + i
    var option = req.body[Select]
    var contenti = req.body[Text_]
    console.log(typeof (option), contenti)
    if (option != undefined) {
      var content = contenti.replace(/\r/g, '\n')
    }

    if (option === '0') {
      data = data + '\r\n# ' + content + '\r\n'
    } else if (option === '1') {
      data = data + '\r\n## ' + content + '\r\n'
    } else if (option === '2') {
      data = data + '\n ' + content + '\r\n'
    } else if (option === '3') {
      data = data + '\n!' + content + '\r\n'
    } else if (option === '4') {
      data = data + '\n$$' + content + '$$' + '\r\n'
    }
  }


  fs.writeFile('node_mark.md', data, function (err) {
    if (err) {
      return console.log(err);
    } +
    console.log("The file was saved!");
  });
  console.log(title, author, theme)

  // console.log("this is the srcc: " + src)

  let filee = 'node_mark.md';
  pandoc(filee, args, callback);
  console.log("success");

  setTimeout(function () {
    console.log('Res handling Delay');
    res.sendFile(__dirname + '/views/genpdf.html');
  }, 1000);
})


// PDF

app.post('/plainpdf', function (req, res) {
  // var dir = req.body.dir
  var title = req.body.title
  var author = req.body.author
  var theme = req.body.theme
  var head1 = req.body.head1
  var count = req.body.count
  var src = head1.replace(/\r/g, '\n')

  var data = '---\r\n' + 'title:\r\n' + '- ' + title + '\r\nauthor:\r\n' + '- ' + author + '\r\ntheme:\r\n' + '- ' + theme + '\r\n---\r\n\r\n' + '# ' + src

  // var arrray = ["#", "##", "", "!", "$$"];
  var Select
  var Text_
  for (var i = 1; i < count; i++) {
    Select = "Select" + i
    Text_ = "Text_" + i
    var option = req.body[Select]
    var contenti = req.body[Text_]
    console.log(typeof (option), contenti)
    if (option != undefined) {
      var content = contenti.replace(/\r/g, '\n')
    }

    if (option === '0') {
      data = data + '\r\n# ' + content + '\r\n'
    } else if (option === '1') {
      data = data + '\r\n## ' + content + '\r\n'
    } else if (option === '2') {
      data = data + '\n ' + content + '\r\n'
    } else if (option === '3') {
      data = data + '\n!' + content + '\r\n'
    } else if (option === '4') {
      data = data + '\n$$' + content + '$$' + '\r\n'
    }
  }


  fs.writeFile('node_mark.md', data, function (err) {
    if (err) {
      return console.log(err);
    } +
    console.log("The file was saved!");
  });
  console.log(title, author, theme)

  // console.log("this is the srcc: " + src)

  let filee = 'node_mark.md';
  pandoc(filee, args2, callback);
  console.log("success");

  setTimeout(function () {
    console.log('Res handling Delay');
    res.sendFile(__dirname + '/views/genpdf.html');
  }, 1000);
})



app.listen(3000, function () {
  console.log('Listening on port 3000...')
})