import React from 'react';
import MissionTable from './MissionTable';
import SelectColumnsButton from './SelectColumnsButton';

function App() {
  return (
    <div style={{ padding: '20px 20%', margin: 'auto' }}>
      <SelectColumnsButton checkedAttributes={[2, 1, 1, 0, 1, 1]} />
      <MissionTable />
    </div>
  );
}

export default App;
