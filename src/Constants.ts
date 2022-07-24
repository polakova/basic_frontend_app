export const PERNAMENT = 2;
export const CHECKED = 1;
export const NOTCHECKED = 0;

export const MISSION_QUERY = {
    "mission_name": "mission_name",
    "launch_success": "launch_success",
    "launch_date": "launch_date_local",
    "launch_site_name": "launch_site { site_name_long }",
    "rocket_name": "rocket { rocket_name }",
    "rocket_type": "rocket { rocket_type }"
}

export const ATTRIBUTES = Object.keys(MISSION_QUERY);
export const PERNAMENT_ATTRIB_INDEX = 0;