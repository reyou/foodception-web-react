import { useEffect } from 'react';
import { useLayout } from '../../contexts/layout-context';
import LoadingPanel from '../../components/loading_panel';
import {
  parseResultType,
  ResultType
} from '../../components/search/result_type';
import { useLocation } from 'react-router-dom';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import { useNavigate } from 'react-router-dom';

export default function SearchSelectionPage() {
  const navigate = useNavigate();
  const { setShowBreadcrumb, setShowHorizontalRule } = useLayout();

  const location = useLocation();

  useEffect(() => {
    setShowBreadcrumb(false);
    setShowHorizontalRule(false);

    const params = new URLSearchParams(location.search);
    const resultTypeParam = params.get('resultType');
    // Example: ["", "search", "selection", "slug", "id"]
    const pathParts = location.pathname.split('/');
    const slug = pathParts[3];
    const id = pathParts[4];

    if (!slug || !id || !resultTypeParam) {
      console.error('Invalid URL structure or missing parameters.');
      return;
    }

    try {
      const resultType = parseResultType(parseInt(resultTypeParam, 10));

      // Redirect based on the result type
      switch (resultType) {
        case ResultType.Recipe:
          FrontEndUtils.redirect(`/recipes/${slug}/${id}`, navigate);
          break;
        case ResultType.RecipeVideo:
          FrontEndUtils.redirect(`/videos/${slug}/${id}`, navigate);
          break;
        case ResultType.Ingredient:
          FrontEndUtils.redirect(`/ingredients/${slug}/${id}`, navigate);
          break;
        case ResultType.RecipeCategory:
          FrontEndUtils.redirect(`/categories/${slug}/${id}`, navigate);
          break;
        case ResultType.Diet:
          FrontEndUtils.redirect(`/diets/${slug}/${id}`, navigate);
          break;
        case ResultType.Meal:
          FrontEndUtils.redirect(`/meals/${slug}/${id}`, navigate);
          break;
        case ResultType.Country:
          FrontEndUtils.redirect(`/countries/${slug}/${id}`, navigate);
          break;
        default:
          throw new Error('Unhandled result type.');
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        'Error parsing result type. LogGuid: aee8f4b3-9edb-4007-a2d8-2d9ecfadf338'
      );
    }

    return () => {
      // Restore breadcrumbs and horizontal rule
      setShowBreadcrumb(true);
      setShowHorizontalRule(true);
    };
  }, [setShowBreadcrumb, setShowHorizontalRule, location, navigate]);

  return (
    <div>
      <LoadingPanel></LoadingPanel>
    </div>
  );
}
