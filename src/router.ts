import { Router } from 'express';

import PhoneController from './controllers/PhoneController';

const router = Router();

router.get('/phone', PhoneController.index);
router.get('/phone/:code', PhoneController.show);
router.post('/phone', PhoneController.create);
router.put('/phone/:code', PhoneController.update);
router.delete('/phone/:code', PhoneController.delete);

export { router };