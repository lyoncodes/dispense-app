import express from 'express';
import path from 'path';
import url from 'url';
import { convert, convert_to_txt } from './fileConverter.js';

const app = express();

// configure to use html as view
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/dispense'));
app.use(express.json())
//

// convert contacts.txt from plain txt to JSON
// assign res to contacts variable
let contacts;

convert("contacts.txt")
.then(res => {
  contacts = res;
})
.catch(err => console.error(err));
//

// routes
app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/index.html'));
})
app.get('/data', (req, res) => {
  res.send(contacts);
})
app.post('/create', (req, res) => {
  convert_to_txt(JSON.stringify(req.body), "contacts.txt");
})
//

app.listen(3000);