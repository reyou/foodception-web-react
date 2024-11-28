import { Container } from 'react-bootstrap';
import FoodceptionHeader from '../../components/header/header';
import HeaderLayout from '../../components/header/headerLayout';
import TopDiets from './components/top_diets';
import RandomPicks from './components/random_picks';
import TopCategories from './components/top_categories';
import TopCountries from './components/top_countries';

export default function Recipes() {
  const imageUrl =
    'https://static.wixstatic.com/media/f7bd72_e03b3faaf463460a87f0662628574d46~mv2.jpg';
  const title = <FoodceptionHeader>Discover Recipes</FoodceptionHeader>;
  const subTitle = 'Discover Delicious Recipes from Around the World';

  return (
    <>
      <HeaderLayout
        backgroundImage={imageUrl}
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
