interface DebugTextAreaProps {
  data: any;
}

const DebugTextArea: React.FC<DebugTextAreaProps> = ({ data }) => {
  return (
    <textarea
      value={JSON.stringify(data, null, 2)}
      readOnly
      rows={30}
      cols={150}
    />
  );
};

export default DebugTextArea;
