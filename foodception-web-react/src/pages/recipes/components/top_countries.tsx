import TopRecipes from './top_recipes';

const TopCountries = () => {
  const mapCountryData = (data: any) =>
    data.countries.map((country: any) => ({
      id: country.id,
      name: country.countryName,
      description: country.cuisineDescription,
      recipes: country.countryRecipes.map((q: any) => q.recipe)
    }));

  return (
    <TopRecipes
      title='Taste the World: Top Global Cuisines'
      subtitle='Savor the flavors of diverse cultures with our handpicked collection of authentic recipes from across the globe.'
      fetchUrl='/countries/top'
      seeAllUrl='/countries'
      mapData={mapCountryData}
      itemSlugPrefix='countries'
      itemType='Cuisines'
    />
  );
};

export default TopCountries;
