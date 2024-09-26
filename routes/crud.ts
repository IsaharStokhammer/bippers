import express, { Router } from 'express';
import {create} from '../controllers/beepersController.js' 


const router: Router = express.Router();

router.route('/').post(create);
router.route('/').get(create);
router.route('/:id').get(create);
router.route('/:id/status').put(create);
router.route('/:id').delete(create);
router.route('/status/:status').get(create);

export default router;