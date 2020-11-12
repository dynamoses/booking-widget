const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

const DIST_DIR = path.join(__dirname, "dist");
var VIEWS_PATH = './src/views';

app.use(express.static(DIST_DIR));
app.set('view engine', 'ejs');
app.set('views', VIEWS_PATH);

app.get('/', function(req, res) {
    res.render('index');
})

app.listen(PORT);