import express, { Application } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app: Application = express();

// Init Middleware
const options = { extended: false };

app.use(express.urlencoded(options));
app.use(express.json());

app.use((req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map|.svg|.txt)$/i.test(req.path)) {
    next();
  } else {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.sendFile(path.join(dirname, '../build', 'index.html'));
  }
});

// Set static folder
app.use(express.static('build'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.info(`Server started on port ${PORT}`));
