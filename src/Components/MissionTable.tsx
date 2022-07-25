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

  useEffect(() => {
    setData(missionData);
  }, [missionData]);

  useEffect(() => {
    setMetadata(missionMetadata);
  }, [missionMetadata]);

  return (
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
          
          {data.map((row: Mission) => (
            
            <TableRow key={row["mission_name" as keyof Mission]?.toString()}>
              
              {Object.keys(metadata).map((key: string) => (
                
                (metadata[key as keyof MissionMetadata].showable && 
                  metadata[key as keyof MissionMetadata].isShown &&
                  
                  <TableCell key={row["mission_name" as keyof Mission]?.toString() + key}>
                    {_.get(row, key)?.toString()}
                  </TableCell>
                )

              ))}

            </TableRow>

          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MissionTable;