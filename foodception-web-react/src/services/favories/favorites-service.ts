import HttpProvider from '../../providers/HttpProvider';
import { FavoriteType } from './favorite-type';

export interface FavoriteEntity {
  id: string;
  type: FavoriteType;
}

export class FavoritesService {
  static async getFavoriteRecipes(): Promise<any> {
    const response = await HttpProvider.get(`/favorites/recipes`);
    return response.data;
  }

  static async createFavorite(type: FavoriteType, id: string) {
    await HttpProvider.post(`/favorites`, { type, id });
  }

  static async removeFavorite(type: FavoriteType, id: string) {
    await HttpProvider.delete(`/favorites/${type}/${id}`);
  }
}
