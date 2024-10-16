import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import CountriesList from '../../components/countries/countriesList';
import ErrorPanel from '../../components/error_message';
import FoodceptionHeader from '../../components/header/header';
import LoadingPanel from '../../components/loading_panel';
import useFetch from '../../hooks/useFetch';
import useShowHeader from '../../hooks/useShowHeader';

export default function Countries() {
  const showHeader = useShowHeader(true);
  const { data, loading, error } = useFetch('/countries');

  if (loading) {
    return <LoadingPanel visible={loading}></LoadingPanel>;
  }

  if (error) {
    return <ErrorPanel errorMessage={error}></ErrorPanel>;
  }

  if (!data) {
    return (
      <Container className='text-center mt-5'>
        <p>No data available</p>
      </Container>
    );
  }

  return (
    <Container fluid>
      {showHeader && <FoodceptionHeader>Countries</FoodceptionHeader>}
      <CountriesList countries={data.countries} />
    </Container>
  );
}
