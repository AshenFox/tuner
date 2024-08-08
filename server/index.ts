import express, { Application, Request, Response } from 'express';
import path from 'path';

const app: Application = express();

// Init Middleware
const options = { extended: false };

app.use(express.urlencoded(options));
app.use(express.json());

// Set static folder
app.use(express.static('build'));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
