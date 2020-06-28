import express from 'express';
import auth from '../middlewares/auth';
import { menstvalidate } from '../middlewares/validate';
import { create, getData, update, remove, stats } from '../controllers/menstrualController';

const router = new express.Router();

router.post('/menst', menstvalidate, auth, create);

router.get('/menst', auth, getData);

router.get('/menst/cycle-stats', auth, stats); // Cycle stats

router.patch('/menst', auth, update);

router.delete('/menst', auth, remove);

export default router;