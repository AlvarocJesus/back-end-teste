import { Router } from 'express';

import PhoneController from './controllers/PhoneController';

const router = Router();

router.get('/phone', PhoneController.index);
router.get('/phone/:id', PhoneController.create);
router.post('/phone', PhoneController.create);
router.put('/phone/:id', PhoneController.update);
router.delete('/phone/:id', PhoneController.delete);

export { router };