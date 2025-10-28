import { NeighborhoodRepository } from '../../domain/repositories/neighborhood.repository';
import { NeighborhoodByPoint } from '../../types/neighborhood';

export class NeighborhoodService {
  constructor(private neighborhoodRepository: NeighborhoodRepository) {}

  async findByCoordinates(
    longitude: number,
    latitude: number
  ): Promise<NeighborhoodByPoint | null> {
    if (!longitude || !latitude) {
      throw new Error('Invalid params, missing longitude or latitude');
    }

    return this.neighborhoodRepository.findByCoordinates(longitude, latitude);
  }
}
