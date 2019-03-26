import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import ResponseSender from './../core/rest/middleware/ResponseSender';
import ErrorHandlers from './../core/rest/middleware/ErrorHandlers';
import routes from './routes';

const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(morgan('short'));

app.use('/api', routes);

app.use(ResponseSender.firstTry);
app.use(ErrorHandlers.handleNoEndpointError);
app.use(ErrorHandlers.handleApplicationError);
app.use(ResponseSender.finalTry);

export default app;
