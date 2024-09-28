import FoodceptionHeader from '../../components/header/header';
import HeaderLayout from '../../components/header/headerLayout';
import RandomPicks from './components/random_picks';
import TopCategories from './components/top_categories';

export default function Recipes() {
  const imageUrl =
    'https://static.wixstatic.com/media/f7bd72_e03b3faaf463460a87f0662628574d46~mv2.jpg';
  const title = <FoodceptionHeader>Recipes</FoodceptionHeader>;
  const subTitle = 'Discover Delicious Recipes from Around the World';

  return (
    <div>
      <HeaderLayout
        backgroundImage={imageUrl}
        title={title}
        subTitle={subTitle}
      ></HeaderLayout>

      <div className='container-fluid'>
        <RandomPicks />
        <TopCategories />
      </div>
    </div>
  );
}
