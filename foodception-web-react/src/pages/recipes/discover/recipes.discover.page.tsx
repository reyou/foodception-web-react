import { Container } from 'react-bootstrap';
import FoodceptionHeader from '../../../components/header/header';
import HeaderLayout from '../../../components/header/headerLayout';
import TopDiets from '../components/top_diets';
import RandomPicks from '../components/random_picks';
import TopCategories from '../components/top_categories';
import TopCountries from '../components/top_countries';
import { HEADER_IMAGES } from '../../../constants/imageConstants';

export default function Recipes() {
  const title = <FoodceptionHeader>Discover Recipes</FoodceptionHeader>;
  const subTitle = 'Discover Delicious Recipes from Around the World';

  return (
    <>
      <HeaderLayout
        backgroundImage={HEADER_IMAGES.recipesDiscoverPage}
        title={title}
        subTitle={subTitle}
      />
      <Container fluid className='mt-4'>
        <RandomPicks />
        <TopCategories />
        <TopCountries />
        <TopDiets />
      </Container>
    </>
  );
}
