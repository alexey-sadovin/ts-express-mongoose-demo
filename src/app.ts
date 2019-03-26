import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';

import ServiceFacade from './../core/services';
import ResponseSender from './../core/rest/middleware/ResponseSender';
import ErrorHandlers from './../core/rest/middleware/ErrorHandlers';
import routes from './routes';

const config = dotenv.config();
if (config.error) {
  throw config.error;
}

const app = express();

app.locals.services = new ServiceFacade();
app.locals.services
  .getMongoService()
  .connect()
  .catch((err: Error) => {
    console.error('Something went terribly wrong', err);
  });

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(morgan('short'));

app.use('/api', routes);

app.use(ResponseSender.firstTry);
app.use(ErrorHandlers.handleNoEndpointError);
app.use(ErrorHandlers.handleApplicationError);
app.use(ResponseSender.finalTry);

app.listen(process.env.PORT);

export default app;
