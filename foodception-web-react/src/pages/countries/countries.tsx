import CountriesList from '../../components/countries/countriesList';
import ErrorPanel from '../../components/error_message';
import FoodceptionHeader from '../../components/header/header';
import useFetch from '../../hooks/useFetch';
import useShowHeader from '../../hooks/useShowHeader';

export default function Countries() {
  const showHeader = useShowHeader(true);
  const { data, loading, error } = useFetch('/countries');

  if (loading) {
    return <div className='text-center'>Loading...</div>;
  }

  if (error) {
    return <ErrorPanel errorMessage={error}></ErrorPanel>;
  }

  if (!data) {
    return <div className='text-center'>No data available</div>;
  }

  return (
    <div>
      {showHeader && <FoodceptionHeader>Countries</FoodceptionHeader>}
      <CountriesList countries={data.countries} />
    </div>
  );
}
