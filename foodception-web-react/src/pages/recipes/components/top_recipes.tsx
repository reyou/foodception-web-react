import ErrorPanel from '../../../components/error_message';
import FoodceptionHrefLink from '../../../components/links/href_link';
import LoadingPanel from '../../../components/loading_panel';
import RecipeList from '../../../components/recipeList';
import useFetch from '../../../hooks/useFetch';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

type TopRecipesProps = {
  title: string;
  subtitle: string;
  fetchUrl: string;
  seeAllUrl: string;
  mapData: (
    data: any
  ) => { id: string; name: string; description: string; recipes: any[] }[];
  itemSlugPrefix: string;
  itemType: string;
};

const TopRecipes: React.FC<TopRecipesProps> = ({
  title,
  subtitle,
  fetchUrl,
  seeAllUrl,
  mapData,
  itemSlugPrefix,
  itemType
}) => {
  const { data, loading, error } = useFetch(fetchUrl);

  return (
    <div>
      <h2 className='text-center mt-4'>{title}</h2>
      <h4 className='text-center mb-2'>{subtitle}</h4>
      <div className='text-center mb-4'>
        <FoodceptionHrefLink url={seeAllUrl}>
          See all {itemType}
        </FoodceptionHrefLink>
      </div>
      <LoadingPanel visible={loading} />
      {error && (
        <div className='text-center'>
          <ErrorPanel errorMessage={error} />
        </div>
      )}
      {data &&
        mapData(data).map((item: any) => (
          <div key={item.id}>
            <div className='text-center'>
              <h3 className='foodceptionSubCategoryTitle'>
                <FoodceptionHrefLink
                  url={`${itemSlugPrefix}/${FrontEndUtils.slugify(item.name)}/${
                    item.id
                  }`}
                >
                  {FrontEndUtils.capitalizeText(item.name)}
                </FoodceptionHrefLink>
              </h3>
              <p className='mb-4'>{item.description}</p>
            </div>
            <RecipeList recipes={item.recipes} />
          </div>
        ))}
    </div>
  );
};

export default TopRecipes;
