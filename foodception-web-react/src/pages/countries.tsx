import { useEffect, useState } from 'react';
import CountriesList from '../components/countries/countriesList';
import FoodceptionHeader from '../components/header';
import HttpProvider from '../providers/HttpProvider';

export default function Countries() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HttpProvider.get(
          'https://api.foodception.com/countries'
        );
        setData(result);
      } catch (error) {
        setError('Failed to fetch data');
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const render = () => {
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!data) {
      return <div className='text-center'>Loading...</div>;
    }
    return (
      <div>
        <FoodceptionHeader>Countries</FoodceptionHeader>
        <CountriesList countries={data}></CountriesList>
      </div>
    );
  };

  return render();
}
