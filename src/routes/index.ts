import express from 'express';

import v1Routes from './v1';

const apiRouter = express.Router();

apiRouter.use('/v1', v1Routes);

export default apiRouter;