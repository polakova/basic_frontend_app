import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import MissionTable from './MissionTable';
import SelectColumnsDialog from './SelectColumnsDialog';
import { QUERY_START, QUERY_END, MISSION_QUERY, ATTRIBUTES, PERNAMENT_ATTRIB_INDEX, PERNAMENT, CHECKED } from './Constants';
import { Button } from '@mui/material';


function App() {

  const [query, setQuery] = useState(QUERY_START(10) + Object.values(MISSION_QUERY).join(`\n`) + QUERY_END);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [ result ] = useQuery({ query });
  const { data, fetching, error } = result;
  
  const [checkedState, setCheckedState] = useState(() => {
    const arr = new Array(ATTRIBUTES.length).fill(CHECKED);
    arr[PERNAMENT_ATTRIB_INDEX] = PERNAMENT;
    return arr;
  });

  useEffect(() => {
    var newQuery = ``;
    
    checkedState.forEach((isChecked: number, index: number) => {
      if (isChecked === CHECKED) {
        newQuery += MISSION_QUERY[ATTRIBUTES[index] as keyof typeof MISSION_QUERY] + ` `
      }
    });
    
    setQuery(QUERY_START(10) + newQuery + QUERY_END);
  }, [checkedState]);

  if (fetching) return <div>Loading ... </div>;
  if (error) return <div>Error {error.message}</div>;

  const onOpen = () => {
    setIsOpenDialog(true);
  };

  const onSubmit = (updatedCheckedState: number[]) => {
    setCheckedState(updatedCheckedState);
    setIsOpenDialog(false);
  };

  const onClose = () => {
    setIsOpenDialog(false);
  }

  return (
    <div style={{ padding: '20px 20%', margin: 'auto' }}>
      <Button onClick={onOpen}>{"t(Select columns)"}</Button>
      {isOpenDialog &&
        <SelectColumnsDialog isOpen={isOpenDialog} checkedAttributes={checkedState} onSubmit={onSubmit} onClose={onClose} />
      }
      <MissionTable missionData={data.launchesPast} checkedAttributes={checkedState} />
    </div>
  );
}

export default App;
