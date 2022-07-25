import { 
  useEffect, 
  useState 
} from 'react';
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';
import {
  MISSION_METADATA
} from '../Definitions/Constants';
import { 
  Mission,
  MissionMetadata
} from '../Definitions/MissionInterface';
import DetailDialog from '../Components/DetailDialog';


function MissionTable({
  missionData,
  missionMetadata
}: {
  missionData: Mission[],
  missionMetadata: MissionMetadata
}) {

  const { t } = useTranslation();

  const [ data, setData ] = useState<Mission[]>([]);
  const [ metadata, setMetadata ] = useState(MISSION_METADATA);
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const [ dialogData, setDialogData ] = useState<Mission>({});

  useEffect(() => {
    setData(missionData);
  }, [missionData]);

  useEffect(() => {
    setMetadata(missionMetadata);
  }, [missionMetadata]);

  const handleSelectMission = (missionRow: Mission) => {
    setIsOpenDialog(true);
    setDialogData(missionRow);
  };

  const onDetailClose = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      {isOpenDialog && 
        <DetailDialog isOpen={isOpenDialog} missionData={dialogData} onClose={onDetailClose} />
      }
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              
              {Object.keys(metadata).map((key: string) => (
                
                (metadata[key as keyof MissionMetadata].showable && 
                  metadata[key as keyof MissionMetadata].isShown &&
                  
                  <TableCell key={key}>
                    {t("mission_info." + key)}
                  </TableCell>
                )

              ))}

            </TableRow>
          </TableHead>
          <TableBody>
            
            {data.map((mission: Mission) => (
              
              <TableRow 
                key={mission["mission_name" as keyof Mission]?.toString()}
                onClick={() => handleSelectMission(mission)}>
                
                {Object.keys(metadata).map((key: string) => (
                  
                  (metadata[key as keyof MissionMetadata].showable && 
                    metadata[key as keyof MissionMetadata].isShown &&
                    
                    <TableCell key={mission["mission_name" as keyof Mission]?.toString() + key}>
                      {_.get(mission, key)?.toString()}
                    </TableCell>
                  )

                ))}

              </TableRow>

            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MissionTable;