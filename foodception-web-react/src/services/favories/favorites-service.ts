import HttpProvider from '../../providers/HttpProvider';
import { FavoriteType } from './favorite-type';

export interface FavoriteEntity {
  id: string;
  type: FavoriteType;
}

export class FavoritesService {
  static async getFavorites(): Promise<FavoriteEntity[]> {
    try {
      const response = await HttpProvider.get(`/favorites`);
      console.log('List favorite entities response:', response);
      return response.data;
    } catch (error) {
      console.error('Error listing favorite entities:', error);
      return [];
    }
  }
  static async createFavorite(type: FavoriteType, id: string): Promise<void> {
    try {
      const response = await HttpProvider.post(`/favorites`, { type, id });
      console.log('Favorite entity response:', response);
    } catch (error) {
      console.error('Error favoriting entity:', error);
    }
  }

  static async removeFavorite(type: FavoriteType, id: string): Promise<void> {
    try {
      const response = await HttpProvider.delete(`/favorites/${type}/${id}`);
      console.log('Remove favorite entity response:', response);
    } catch (error) {
      console.error('Error removing favorite entity:', error);
    }
  }
}
