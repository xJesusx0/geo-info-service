import { Request, Response } from "express";
import { NeighborhoodService } from "../../application/services/neighborhood.service";
import { ErrorResponse } from "../dtos/api.dto";
export class NeighborhoodController {
  constructor(private neighborhoodService: NeighborhoodService) {}

  getByPoint = async (req: Request, res: Response) => {
    const { longitude, latitude } = req.query;
    let numericLongitude: number;
    let numericLatitude: number;
    if (!longitude || !latitude) {
      const response: ErrorResponse = {
        message: "Invalid request params, missing longitude or latitude",
      };
      res.json(response).status(400);
    }

    try {
      numericLongitude = Number(longitude);
      numericLatitude = Number(latitude);
    } catch (error) {
      res.json("Invalid values").status(400);
      return;
    }

    const data = await this.neighborhoodService.findByCoordinates(
      numericLongitude,
      numericLatitude
    );

    if (!data) {
      res.json({
        message: "No se encontro la locacion solicitada",
        context: {
          longitude: longitude,
          latitude: latitude,
        },
      });
    }

    res.json({
      ...data,
      context: {
        longitude: longitude,
        latitude: latitude,
      },
    });
  };
}
