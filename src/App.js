import DGrid  from './components/DGrid';
import Graph  from './components/Graph';
import {useState} from 'react';

const App = () => {
  const [control, setControl] = useState({});

  return (
    <div>
      <Graph currentControl={control} />
      <DGrid currentControl={control} handleClick={setControl}/>
    </div>

  )
}

export default App