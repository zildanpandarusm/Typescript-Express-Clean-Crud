import { Router } from 'express';
import CreateLocationService from '../../services/locations/createLocationService';
import DeleteLocationService from '../../services/locations/deleteLocationService';
import ReadManyLocationByUserService from '../../services/locations/readManyLocationByUserService';
import ReadOneLocationService from '../../services/locations/readOneLocationService';
import LocationController from '../../controllers/locationController';
import { LocationRepository } from '../../repositories/locationRepository';
import { verifyUser } from '../../middleware/authMiddleware';

const router = Router();
const locationRepository = new LocationRepository();
const createLocation = new CreateLocationService(locationRepository);
const deleteLocation = new DeleteLocationService(locationRepository);
const readManyByUserLocation = new ReadManyLocationByUserService(locationRepository);
const readOneLocation = new ReadOneLocationService(locationRepository);
const locationController = new LocationController(createLocation, readOneLocation, readManyByUserLocation, deleteLocation);

router.post('/', verifyUser, (req, res, next) => locationController.createLocation(req, res, next));

router.get('/', verifyUser, (req, res, next) => locationController.readManyLocationByUser(req, res, next));

router.get('/:id', verifyUser, (req, res, next) => locationController.readOneLocation(req, res, next));

router.delete('/:id', verifyUser, (req, res, next) => locationController.deleteLocation(req, res, next));

export default router;
