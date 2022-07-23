import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from 'urql';

const query = `
{
  launchesPast(limit: 10) {
    mission_name
    launch_success
    launch_date_local
    launch_site {
      site_name_long
    }
    links {
      video_link
    }
    rocket {
      rocket_name
      rocket_type
    }
    details
  }
}
`;

interface Mission {
  mission_name: string;
  launch_success: boolean;
  launch_date_local: string;
  launch_site: {
    site_name_long: string,
  };
  links: {
    video_link: string
  };
  rocket: {
    rocket_name: string,
    rocket_type: string,
  };
  details: string;
}

function MissionTable() {

  // const header = ["Mission name", "Launch success", "Launch date", ""]

  const [ result ] = useQuery({ query });

  const { data, fetching, error } = result;

  if (fetching) return <div>Loading ... </div>;
  if (error) return <div>Error {error.message}</div>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mission name</TableCell>
            <TableCell>Launch success</TableCell>
            <TableCell>Launch date</TableCell>
            <TableCell>Launch site name</TableCell>
            <TableCell>Link to video</TableCell>
            <TableCell>Rocket name</TableCell>
            <TableCell>Rocket type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.launchesPast.map((mission: Mission) => (
            <TableRow
              key={mission.mission_name}
            >
              <TableCell>{mission.mission_name}</TableCell>
              <TableCell>
                {mission.launch_success ? mission.launch_success.toString() : "not stated"}
              </TableCell>
              <TableCell>{mission.launch_date_local}</TableCell>
              <TableCell>{mission.launch_site.site_name_long}</TableCell>
              <TableCell>{mission.links.video_link}</TableCell>
              <TableCell>{mission.rocket.rocket_name}</TableCell>
              <TableCell>{mission.rocket.rocket_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MissionTable;