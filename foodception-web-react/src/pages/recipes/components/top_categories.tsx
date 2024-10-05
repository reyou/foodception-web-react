import TopRecipes from './top_recipes';

const TopCategories = () => {
  const mapCategoryData = (data: any) =>
    data.recipeCategories.map((category: any) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      recipes: category.recipeCategoryAssignments.map((q: any) => q.recipe)
    }));

  return (
    <TopRecipes
      title='Top Categories'
      subtitle='Find your favorite dishes from these top-rated recipe categories.'
      fetchUrl='/recipe-categories/top'
      seeAllUrl='/recipe-categories'
      mapData={mapCategoryData}
      itemSlugPrefix='recipe-categories'
      itemType='Categories'
    />
  );
};

export default TopCategories;
