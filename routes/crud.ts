import express, { Router } from 'express';
import {create, getAllBeepers, getBeeperByID, promoteBeeperStatus, deleteById} from '../controllers/beepersController.js' 


const router: Router = express.Router();

router.route('/').post(create);
router.route('/').get(getAllBeepers);
router.route('/:id').get(getBeeperByID);
router.route('/:id/status').put(promoteBeeperStatus);
router.route('/:id').delete(deleteById);
router.route('/status/:status').get(create);

export default router;