import { Container } from 'react-bootstrap';
import TopRecipes from './top_recipes';

const TopDiets = () => {
  const mapDietData = (data: any) =>
    data.diets.map((diet: any) => ({
      id: diet.id,
      name: diet.name,
      description: diet.description,
      recipes: diet.dietRecipes.map((q: any) => q.recipe)
    }));

  return (
    <Container fluid>
      <TopRecipes
        title='Explore Diet-Friendly Recipes'
        subtitle="Discover a variety of delicious recipes tailored to your dietary preferences! Whether you're gluten-free, vegan, or following keto, we’ve got something for everyone."
        fetchUrl='/diets/top'
        seeAllUrl='/diets'
        mapData={mapDietData}
        itemSlugPrefix='diets'
        itemType='Diets'
      />
    </Container>
  );
};

export default TopDiets;
