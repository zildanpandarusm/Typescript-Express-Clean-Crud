import { NextFunction, Request, Response } from 'express';
import CreateLocationService from '../services/locations/createLocationService';
import ReadOneLocationService from '../services/locations/readOneLocationService';
import DeleteLocationService from '../services/locations/deleteLocationService';
import ReadManyLocationByUserService from '../services/locations/readManyLocationByUserService';

export default class LocationController {
  private createLocationService: CreateLocationService;
  private readOneLocationService: ReadOneLocationService;
  private readManyLocationByUserService: ReadManyLocationByUserService;
  private deleteLocationService: DeleteLocationService;

  constructor(createLocationService: CreateLocationService, readOneLocationService: ReadOneLocationService, readManyLocationByUserService: ReadManyLocationByUserService, deleteLocationService: DeleteLocationService) {
    this.createLocationService = createLocationService;
    this.deleteLocationService = deleteLocationService;
    this.readOneLocationService = readOneLocationService;
    this.readManyLocationByUserService = readManyLocationByUserService;
  }

  public async createLocation(req: any, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const idUser = req.userData._id;

      const result = await this.createLocationService.handle(idUser, data);

      return res.status(200).json({ message: 'Location created successfully', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readOneLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.readOneLocationService.handle(id);

      return res.status(200).json({ message: 'Location', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readManyLocationByUser(req: any, res: Response, next: NextFunction) {
    try {
      const id = req.userData._id;

      const result = await this.readManyLocationByUserService.handle(id);

      return res.status(200).json({ message: 'Locations', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async deleteLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.deleteLocationService.handle(id);

      return res.status(200).json({ message: 'Location deleted successfully!' });
    } catch (e) {
      next(e);
    }
  }
}
