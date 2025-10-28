import { NeighborhoodByPoint } from '../../types/neighborhood';

export interface NeighborhoodRepository {
  findByCoordinates(longitude: number, latitude: number): Promise<NeighborhoodByPoint | null>;
}
