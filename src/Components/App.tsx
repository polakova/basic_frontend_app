import { 
  useEffect, 
  useState 
} from 'react';
import { useQuery } from 'urql';
import { useTranslation } from "react-i18next";
import { Waypoint } from 'react-waypoint';
import { 
  Button,
  Box
 } from '@mui/material';
import MissionTable from '../Components/MissionTable';
import SelectColumnsDialog from '../Components/SelectColumnsDialog';
import { 
  MissionMetadata, 
  Mission 
} from '../Definitions/MissionInterface';
import { 
  MISSION_METADATA, 
  QUERY
} from '../Definitions/Constants';


function App() {

  const { t, i18n } = useTranslation();
  
  const [ page, setPage ] = useState(0);
  const [ query, setQuery ] = useState(QUERY(page));
  const [ metadata, setMetadata ] = useState(MISSION_METADATA);
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const [ missionData, setMissionData ] = useState<Mission[]>([]);
  var [ result ] = useQuery({ query });
  const { data, fetching, error } = result;
  
  useEffect(()=> {
    setPage(page + 1);
  }, []);

  useEffect(() => {
    if (!fetching) {
      setMissionData([...missionData, ...data.launchesPast]);
    }
  }, [data, fetching]);

  const getData = () => {
    setQuery(QUERY(page));
    setPage(page + 1);
  };

  const loadMoreData = () => {
    if (page > 0) {
      getData();
    }
  };

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
    <Box component="div" style={{ padding: '40px 10%', margin: 'auto' }}>
      <Button onClick={() => changeLanguage('sk')}>SK</Button>
      <Button onClick={() => changeLanguage('en')}>EN</Button>
      <Button onClick={onOpen}>{t('select_columns.button')}</Button>
      {isOpenDialog &&
        <SelectColumnsDialog isOpen={isOpenDialog} missionMetadata={metadata} onSubmit={onSubmit} onClose={onClose} />
      }
      <MissionTable missionData={missionData} missionMetadata={metadata} />
      <Waypoint onEnter={loadMoreData}></Waypoint>
    </Box>
  );
}

export default App;
