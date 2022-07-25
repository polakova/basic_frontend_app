export interface Mission {
    mission_name: string;
    details: string;
    links: {
      video_link: string
    };
    launch_success: boolean;
    launch_date_local: string;
    launch_site?: {
      site_name_long: string,
    };
    rocket: {
      rocket_name: string,
      rocket_type: string,
    };
}

export interface MissionMetadata {
  "mission_name": {
    "disabled": boolean,
    "showable": boolean,
    "isShown": boolean,
  };
  "details": {
    "disabled": boolean,
    "showable": boolean,
    "isShown": boolean,
  };
  "links.video_link": {
    "disabled": boolean,
    "showable": boolean,
    "isShown": boolean,
  };
  "launch_success": {
    "disabled": boolean,
    "showable": boolean,
    "isShown": boolean,
  };
  "launch_date_local": {
    "disabled": boolean,
    "showable": boolean,
    "isShown": boolean,
  };
  "launch_site.site_name_long": {
    "disabled": boolean,
    "showable": boolean,
    "isShown": boolean,
  };
  "rocket.rocket_name": {
    "disabled": boolean,
    "showable": boolean,
    "isShown": boolean,
  };
  "rocket.rocket_type": {
    "disabled": boolean,
    "showable": boolean,
    "isShown": boolean,
  };
}