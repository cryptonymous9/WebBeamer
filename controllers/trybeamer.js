var express = require('express'),
    router = express.Router()



var bodyParser = require('body-parser')
const fs = require('fs');
//to use classic encoding

router.use(bodyParser.urlencoded({
    extended: false
}))

var cors = require('cors');
router.use(cors({
    optionSuccessStatus: 200
})); // some legacy browsers choke on 204


// Pandoc Woking-------------------------------------------------------------
var pandoc = require('node-pandoc'),
    args = '-t beamer -o node_out.pdf';
let callback = function (err, result) {
    if (err) console.error('Oh Nos: ', err);
    return console.log(result), result;
};


var path = require('path');
// Default Local File ---------------------------------------------------
router.get("/try", function (req, res) {
    console.log("true")
    let src = 'node_mark.md'
    pandoc(src, args, callback);

    res.sendFile(path.resolve('views/genpdf.html'))
})

module.exports = router;
