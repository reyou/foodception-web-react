import React, { useState } from 'react';
import Select from 'react-select';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import FoodceptionCardHrefImage from '../cardHrefImage';
import FoodceptionHrefButton from '../hrefButton';

interface CountryCuisineImage {
  countryId: string;
  imageUrl: string;
}

interface CountriesListProps {
  countries: Country[];
  countryCuisineImages: CountryCuisineImage[];
}

interface Country {
  id: string;
  countryName: string;
  flagImage: string;
  cuisineTitle: string;
  cuisineDescription: string;
}

interface OptionType {
  value: string;
  label: string;
}

const CountriesList: React.FC<CountriesListProps> = ({
  countries,
  countryCuisineImages
}) => {
  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  );

  const options = countries.map((country) => ({
    value: country.id,
    label: country.countryName
  }));
  const handleChange = (selectedOption: OptionType | null) => {
    setSelectedCountry(selectedOption);
  };
  const filteredCountries = selectedCountry
    ? countries.filter((country) => country.id === selectedCountry.value)
    : countries;

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-4'>
          <Select
            options={options}
            onChange={handleChange}
            placeholder='Select a country...'
            isClearable
          />
        </div>
      </div>
      <div className='row justify-content-center'>
        {filteredCountries.map((country) => {
          const imageUrl = countryCuisineImages.find(
            (image) => image.countryId === country.id
          )!.imageUrl;
          const url = `/countries/${FrontEndUtils.slugify(
            country.countryName
          )}/${country.id}`;
          return (
            <div
              className='col-12 col-md-6 col-lg-4 col-xl-3 mb-4'
              key={country.id}
            >
              <div className='card'>
                <FoodceptionCardHrefImage
                  url={url}
                  src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
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
    </div>
  );
};

export default CountriesList;
