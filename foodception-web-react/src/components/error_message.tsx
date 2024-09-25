interface ErrorPanelProps {
  errorMessage: string;
}

const ErrorPanel = ({ errorMessage }: ErrorPanelProps) => {
  return (
    <div className='container mt-4'>
      <div className='alert alert-danger' role='alert'>
        <h4 className='alert-heading'>Error</h4>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPanel;
