import express from 'express';
import { create, getAllBeepers, getBeeperByID, promoteBeeperStatus, deleteById, getBeepersByStatus } from '../controllers/beepersController.js';
const router = express.Router();
router.route('/').post(create);
router.route('/').get(getAllBeepers);
router.route('/:id').get(getBeeperByID);
router.route('/:id/status').put(promoteBeeperStatus);
router.route('/:id').delete(deleteById);
router.route('/status/:status').get(getBeepersByStatus);
export default router;
