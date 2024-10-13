import { Alert, Container } from 'react-bootstrap';

interface ErrorPanelProps {
  errorMessage: string;
}

const ErrorPanel = ({ errorMessage }: ErrorPanelProps) => {
  return (
    <Container className='mt-4'>
      <Alert variant='danger'>
        <Alert.Heading>Error</Alert.Heading>
        <p>{errorMessage}</p>
      </Alert>
    </Container>
  );
};

export default ErrorPanel;
