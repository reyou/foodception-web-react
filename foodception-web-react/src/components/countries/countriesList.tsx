import React, { useState } from 'react';
import Select from 'react-select';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Country from '../../models/country';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import FoodceptionCardHrefImage from '../cardHrefImage';
import FoodceptionHrefButton from '../links/hrefButton';

interface CountriesListProps {
  countries: Country[];
}

interface OptionType {
  value: string;
  label: string;
}

const CountriesList: React.FC<CountriesListProps> = ({ countries }) => {
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
    <Container fluid>
      <Row className='justify-content-center mb-4'>
        <Col xs={12} md={6} lg={4} xl={3}>
          <Select
            options={options}
            onChange={handleChange}
            placeholder='Select a country...'
            isClearable
          />
        </Col>
      </Row>

      <Row className='justify-content-center'>
        {filteredCountries.map((country) => {
          const imageUrl = country.countryCuisineImages[0].imageUrl;
          const url = `/countries/${FrontEndUtils.slugify(
            country.countryName
          )}/${country.id}`;

          return (
            <Col key={country.id} xs={12} md={6} lg={4} xl={3} className='mb-4'>
              <Card className='h-100'>
                <FoodceptionCardHrefImage
                  url={url}
                  src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
                  alt={`${country.countryName} cuisine`}
                />
                <Card.Body>
                  <Card.Title>
                    <Image
                      src={country.flagImage}
                      alt={`${country.countryName} flag`}
                      style={{ width: '30px', marginRight: '10px' }}
                      rounded
                    />
                    {country.countryName}
                  </Card.Title>
                  <Card.Subtitle className='mb-2 text-muted mb-2'>
                    {country.cuisineTitle}
                  </Card.Subtitle>
                  <Card.Text>{country.cuisineDescription}</Card.Text>
                  <FoodceptionHrefButton url={url}>
                    View Recipes &gt;
                  </FoodceptionHrefButton>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CountriesList;
