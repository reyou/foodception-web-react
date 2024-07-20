export default function Meals() {
  const cards = Array.from({ length: 10 }, (_, index) => (
    <div className='col-md-3 mb-4' key={index}>
      <div className='card'>
        <img
          src='https://via.placeholder.com/75'
          className='card-img-top'
          alt='...'
        />
        <div className='card-body'>
          <h5 className='card-title'>Card title {index + 1}</h5>
          <p className='card-text'>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href='https://via.placeholder.com/150' className='btn btn-primary'>
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  ));

  return (
    <div className='container-fluid'>
      <h1 className='text-center'>Meals</h1>
      <div className='row'>{cards}</div>
    </div>
  );
}
