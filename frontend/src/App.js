import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { PipelineActions } from './PipelineActions';
import { ResultsModal } from './ResultsModal';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineActions />
      <PipelineUI />
      <ResultsModal />
    </div>
  );
}

export default App;
