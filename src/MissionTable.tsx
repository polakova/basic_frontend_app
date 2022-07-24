import { useEffect, useState } from 'react';
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
  PERNAMENT, 
  CHECKED, 
  ATTRIBUTES
} from './Constants';
import Mission from './MissionInterface';


function MissionTable({
  missionData,
  checkedAttributes
}: {
  missionData: Mission[],
  checkedAttributes: number[]
}) {

  const [data, setData] = useState<Mission[]>([]);
  const [checkedState, setCheckedState] = useState(new Array(ATTRIBUTES.length).fill(0));

  useEffect(() => {
      setCheckedState(checkedAttributes);
  }, [checkedAttributes]);

  useEffect(() => {
    setData(missionData);
  }, [missionData]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {ATTRIBUTES.map((attribute: string, index: number) => (
                (checkedState[index] === PERNAMENT || checkedState[index] === CHECKED) &&
                  <TableCell key={attribute}>{attribute}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((mission: Mission) => (
            <TableRow key={mission.mission_name}>
              <TableCell>{mission.mission_name}</TableCell>
              {mission.launch_success !== undefined && 
                mission.launch_success !== null ? 
                  <TableCell>{mission.launch_success.toString()}</TableCell> : 
                  <TableCell>{"not stated"}</TableCell>
              }
              {mission.launch_date_local && 
                <TableCell>{mission.launch_date_local}</TableCell>
              }
              {mission.launch_site &&
                <TableCell>{mission.launch_site.site_name_long}</TableCell>
              }
              {mission.rocket &&
                mission.rocket.rocket_name &&
                  <TableCell>{mission.rocket.rocket_name}</TableCell>
              }
              {mission.rocket &&
                mission.rocket.rocket_type &&
                  <TableCell>{mission.rocket.rocket_type}</TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MissionTable;