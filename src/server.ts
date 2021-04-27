import express, { Response, Request, ErrorRequestHandler, NextFunction } from 'express';
import { router } from './router';

const app = express();

app.use(express.json());
app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // res.status(error.status || 500);
  res.json({ error: error.message});
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not Found');
  // error.status = 404;
  next(error);
})

app.listen(3333);