import TabComponent  from './components/TabComponent';
import Graph  from './components/Graph';
import {useState} from 'react';

const App = () => {
  const [entity, setEntity] = useState({});

  return (
    <div>
      <Graph graphEntity={entity} setGraphEntity={setEntity} />
      <TabComponent tabEntity={entity} setTabEntity={setEntity} />
    </div>

  )
}

export default App