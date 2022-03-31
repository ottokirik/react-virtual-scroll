import './App.css';
import { RowTemplate } from './components/row-template';
import { VirtualScroll } from './components/virtual-scroll';
import { SETTINGS } from './constants/settings';
import { getDataSlice } from './lib/get-data-slice';

function App() {
  return (
    <div className="App">
      <VirtualScroll settings={SETTINGS} template={RowTemplate} get={getDataSlice} />
    </div>
  );
}

export default App;
