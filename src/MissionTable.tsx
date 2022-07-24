import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from 'urql';
import { PERNAMENT, CHECKED, ATTRIBUTES, PERNAMENT_ATTRIB_INDEX } from './Constants';
import { useState } from 'react';

const query_start = `
{
  launchesPast(limit: 10) {
    mission_name
    details
    links {
      video_link
    }
`;

const query_end = `
  }}
`;

const query_custom_content = `
  launch_success
  launch_date_local
  launch_site {
    site_name_long
  }
  rocket {
    rocket_name
    rocket_type
  }
`;

const query = query_start + query_custom_content + query_end;

interface Mission {
  mission_name: string;
  details: string;
  links: {
    video_link: string
  };
  launch_success?: boolean;
  launch_date_local?: string;
  launch_site?: {
    site_name_long: string,
  };
  rocket?: {
    rocket_name: string,
    rocket_type: string,
  };
}

function MissionTable() {

  const pernament_attributes: string[] = [
    'mission_name'
  ];
  
  const current_attributes: string[] = [
    'launch_success', 
    'launch_date_local', 
    'launch_site_name', 
    'rocket_name', 
    'rocket_type'
  ];

  const [ result ] = useQuery({ query });
  const { data, fetching, error } = result;
  
  const [checkedState, setCheckedState] = useState(() => {
    const arr = new Array(ATTRIBUTES.length).fill(1);
    arr[PERNAMENT_ATTRIB_INDEX] = PERNAMENT;
    return arr;
  });

  if (fetching) return <div>Loading ... </div>;
  if (error) return <div>Error {error.message}</div>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {ATTRIBUTES.map((attribute: string, index: number) => (
                checkedState[index] === PERNAMENT || checkedState[index] === CHECKED ?
                  <TableCell key={attribute}>{attribute}</TableCell> :
                  <></>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.launchesPast.map((mission: Mission) => (
            <TableRow key={mission.mission_name}>
              <TableCell>{mission.mission_name}</TableCell>
              {mission.launch_success !== undefined ? 
                mission.launch_success !== null ? 
                  <TableCell>{mission.launch_success.toString()}</TableCell> : 
                  <TableCell>{"not stated"}</TableCell> : 
                <></>
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