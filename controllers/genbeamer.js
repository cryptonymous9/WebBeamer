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
    args = '-t beamer -o node_out.pdf';
// eslint-disable-next-line no-undef
var callback = function (err, result) {
    if (err) console.error('Oh Nos: ', err);
    return console.log(result), result;
};



//POST from HTML --------------------------------------------------------


router.post('/new', function (req, res) {
    res.json({
        content: req.body
    })
    var title = req.body.title
    var author = req.body.author
    var theme = req.body.theme
    var src = req.body.content
    src = src.replace(/\\n/g, '\n')

    var data = '---\r\n' + 'title:\r\n' + '- ' + title + '\r\nauthor:\r\n' + '- ' + author + '\r\ntheme:\r\n' + '- ' + theme + '\r\n---\r\n\r\n' + src

    fs.writeFile('node_mark.md', data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    console.log(title, author, theme)

    console.log("this is the srcc: " + src)

    let filee = 'node_mark.md'
    pandoc(filee, args, callback);
    res.json({
        content: req.body
    })
})

module.exports = router;