import HeaderLayout from '../../components/header/headerLayout';
import IngredientCard from '../../components/ingredients/ingredientCard';
import useFetch from '../../hooks/useFetch';
import TypeUtils from '../../utils/TypeUtils';

function IngredientsPage() {
  const title = <h1>Ingredients</h1>;
  const subtitles = [
    'Explore Our Pantry: Discover Fresh Ingredients for Every Recipe',
    'Your Recipe Essentials: A Collection of Fresh Ingredients',
    'Find Your Flavor: Browse Our Ingredient Selection',
    'From Pantry to Plate: Ingredients for Every Dish',
    'Curated Ingredients: The Building Blocks of Delicious Meals',
    'Savor the Best: Handpicked Ingredients for Your Cooking',
    'Explore the Basics: Essential Ingredients for Every Recipe',
    'Ingredient Inspiration: Discover What Makes Every Dish Special',
    'Fresh Finds: Browse Our Selection of Key Ingredients',
    'Uncover the Essentials: Ingredients for Perfect Dishes',
    'The Heart of Every Recipe: A Guide to Our Ingredients'
  ];
  const subtitle = TypeUtils.getRandomFromArray(subtitles);
  const backgroundImages = [
    'https://static.wixstatic.com/media/f7bd72_16c77c03fadb4548b34e22ba88dc2f15~mv2.png',
    'https://static.wixstatic.com/media/f7bd72_d044ac3f246140f096b961dc5b28451d~mv2.png',
    'https://static.wixstatic.com/media/f7bd72_3fabf6d864194382816f609285e1f0a0~mv2.png',
    'https://static.wixstatic.com/media/f7bd72_12bac72ea0994787bbb499f62bef7357~mv2.png',
    'https://static.wixstatic.com/media/f7bd72_92edfb0e592f4c47bda4fce878905788~mv2.png',
    'https://static.wixstatic.com/media/f7bd72_28d3bcaa2001487181d194973504b424~mv2.png'
  ];
  const backgroundImage = TypeUtils.getRandomFromArray(backgroundImages);
  const { data, loading, error } = useFetch('/ingredients');

  const content = () => {
    if (loading) {
      return <div className='text-center'>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error}</div>;
    }
    if (!data) {
      return <div className='text-center'>No data available</div>;
    }

    return (
      <div className='row justify-content-center mt-4'>
        {data.ingredients.map((ingredient: any) => {
          const ingredientImage = data.ingredientImages.find(
            (image: any) => image.ingredientId === ingredient.id
          );
          return (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              ingredientImage={ingredientImage}
            ></IngredientCard>
          );
        })}
      </div>
    );
  };
  return (
    <div className='container-fluid'>
      <HeaderLayout
        title={title}
        subTitle={subtitle}
        backgroundImage={backgroundImage}
      ></HeaderLayout>
      {content()}
    </div>
  );
}

export default IngredientsPage;
