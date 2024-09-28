interface LoadingPanelProps {
  visible: boolean;
}

const LoadingPanel = ({ visible }: LoadingPanelProps) => {
  if (visible) {
    return <div className='text-center'>Loading...</div>;
  }
  return <></>;
};

export default LoadingPanel;
