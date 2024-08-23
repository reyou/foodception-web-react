import React from 'react';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import FoodceptionCardHrefImage from '../cardHrefImage';
import FoodceptionHrefButton from '../hrefButton';

interface CountriesListProps {
  countries: any[];
}

const CountriesList: React.FC<CountriesListProps> = ({ countries }) => {
  return (
    <div className='row justify-content-center'>
      {countries.map((country) => {
        const url = `/countries/${FrontEndUtils.slugify(country.countryName)}/${
          country.id
        }`;
        return (
          <div
            className='col-12 col-md-6 col-lg-4 col-xl-3 mb-4 mb-4'
            key={country.id}
          >
            <div className='card'>
              <FoodceptionCardHrefImage
                url={url}
                src={FrontEndUtils.getResizedImagePath(
                  country.mediaGallery[0],
                  400,
                  400
                )}
                alt={`${country.countryName} cuisine`}
              ></FoodceptionCardHrefImage>
              <div className='card-body'>
                <h4 className='card-title'>
                  <img
                    src={country.flagImage}
                    alt={`${country.countryName} flag`}
                    style={{ width: '30px', marginRight: '10px' }}
                  />
                  {country.countryName}
                </h4>
                <h5 className='card-subtitle mb-2 text-muted'>
                  {country.cuisineTitle}
                </h5>
                <p className='card-text'>{country.cuisineDescription}</p>
                <p>
                  <FoodceptionHrefButton url={url}>
                    View Recipes &gt;
                  </FoodceptionHrefButton>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountriesList;
