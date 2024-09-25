import CountryCuisineImage from './country_cuisine_image';

export default interface Country {
  id: string;
  countryName: string;
  flagImage: string;
  cuisineTitle: string;
  cuisineDescription: string;

  countryCuisineImages: CountryCuisineImage[];
}
