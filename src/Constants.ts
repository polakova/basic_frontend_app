export const PERNAMENT = 2;
export const CHECKED = 1;
export const NOTCHECKED = 0;

export const MISSION_QUERY = {
    "launch_success": `launch_success`,
    "launch_date": `launch_date_local`,
    "launch_site_name": `launch_site { site_name_long }`,
    "rocket_name": `rocket { rocket_name }`,
    "rocket_type": `rocket { rocket_type }`
}

export const ATTRIBUTES = ["mission_name", "launch_success", "launch_date", "launch_site_name", "rocket_name", "rocket_type"]; // nahardcodit a z mission query vyhodit mission name
export const PERNAMENT_ATTRIB_INDEX = 0;

export const QUERY_START = (limit: number) => (
`
{
  launchesPast(limit: ` + limit.toString() + `) {
    mission_name
    details
    links {
      video_link
    }
`
)

export const QUERY_END = 
`
}}
`;

// const query_custom_content = `
//   launch_success
//   launch_date_local
//   launch_site {
//     site_name_long
//   }
//   rocket {
//     rocket_name
//     rocket_type
//   }
// `;