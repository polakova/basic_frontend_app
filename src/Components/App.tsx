import { useState } from 'react';
import { useQuery } from 'urql';
import { useTranslation } from "react-i18next";
import { 
  Button,
  Box
 } from '@mui/material';
import MissionTable from '../Components/MissionTable';
import SelectColumnsDialog from '../Components/SelectColumnsDialog';
import { MissionMetadata } from '../Definitions/MissionInterface';
import { 
  MISSION_METADATA, 
  QUERY 
} from '../Definitions/Constants';


function App() {

  const { t, i18n } = useTranslation();
  
  const query = QUERY(10);
  const [ result ] = useQuery({ query });
  const { data, fetching, error } = result;
  
  const [ metadata, setMetadata ] = useState(MISSION_METADATA);
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);

  if (fetching) return <div>Loading ... </div>;
  if (error) return <div>Error {error.message}</div>;

  const onOpen = () => {
    setIsOpenDialog(true);
  };

  const onSubmit = (updatedMetadata: MissionMetadata) => {
    setMetadata(updatedMetadata);
    setIsOpenDialog(false);
  };

  const onClose = () => {
    setIsOpenDialog(false);
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

  return (
    <Box component="div" style={{ padding: '40px 20%', margin: 'auto' }}>
      <Button onClick={() => changeLanguage('sk')}>SK</Button>
      <Button onClick={() => changeLanguage('en')}>EN</Button>
      <Button onClick={onOpen}>{t('select_columns.button')}</Button>
      {isOpenDialog &&
        <SelectColumnsDialog isOpen={isOpenDialog} missionMetadata={metadata} onSubmit={onSubmit} onClose={onClose} />
      }
      <MissionTable missionData={data.launchesPast} missionMetadata={metadata} />
    </Box>
  );
}

export default App;
