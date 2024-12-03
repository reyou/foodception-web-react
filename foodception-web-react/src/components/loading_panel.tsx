import { Container, Spinner } from 'react-bootstrap';

interface LoadingPanelProps {
  visible?: boolean;
}

const LoadingPanel = ({ visible = true }: LoadingPanelProps) => {
  if (visible) {
    return (
      <Container className='text-center'>
        <Spinner animation='border' role='status' className='my-3' />
        <p>Loading...</p>
      </Container>
    );
  }
  return <></>;
};

export default LoadingPanel;
