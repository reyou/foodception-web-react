import { useRouteError } from 'react-router-dom';
import FoodceptionHrefButton from './components/links/hrefButton';

interface RouteError {
  status?: number;
  message?: string;
  [key: string]: any;
}

function ErrorPage() {
  const error = useRouteError() as RouteError;

  const isNotFound = error?.status === 404;

  return (
    <div className='container text-center mt-5'>
      <h1 className='display-4'>
        {isNotFound ? '404 Not Found' : 'Oops! Something Went Wrong'}
      </h1>
      <p className='lead'>
        {isNotFound
          ? 'The page you are looking for does not exist.'
          : 'We encountered an unexpected error. Please try again later.'}
      </p>
      <div className='my-4'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-6 col-lg-4 mb-4'>
            <img
              src={
                isNotFound
                  ? 'https://static.wixstatic.com/media/f7bd72_bcbb4947cc9447b698f15354c99d2659~mv2.jpg'
                  : 'https://static.wixstatic.com/media/f7bd72_0026ed51ca404769bbe05ae7cd6b6681~mv2.jpg'
              }
              alt={isNotFound ? '404 Not Found' : 'Error'}
              className='img-fluid'
            />
          </div>
        </div>
      </div>
      <p>If the problem persists, please contact our support team.</p>
      <FoodceptionHrefButton url={'/'}>Go to Homepage</FoodceptionHrefButton>
    </div>
  );
}

export default ErrorPage;
