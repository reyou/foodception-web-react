interface DebugTextAreaProps {
  data: any;
  debuggerEnabled?: boolean; // Optional parameter to enable debugger
}

const DebugTextArea: React.FC<DebugTextAreaProps> = ({
  data,
  debuggerEnabled
}) => {
  // Pause execution if debuggerEnabled is true
  if (debuggerEnabled) {
    (() => {
      console.log(data);
      debugger; // Execution will pause here
    })();
  }

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
