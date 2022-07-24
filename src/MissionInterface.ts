export default interface Mission {
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