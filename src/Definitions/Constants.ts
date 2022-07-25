export const QUERY = (limit: number) => (
  `
  {
    launchesPast(limit: ` + limit.toString() + `) {
      mission_name
      details
      links {
        video_link
      }
      launch_success
      launch_date_local
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
  `
  )

export const MISSION_METADATA = {
  "mission_name": {
    "disabled": true,
    "showable": true,
    "isShown": true,
  },
  "details": {
    "disabled": true,
    "showable": false,
    "isShown": false,
  },
  "links.video_link": {
    "disabled": true,
    "showable": false,
    "isShown": false,
  },
  "launch_success": {
    "disabled": false,
    "showable": true,
    "isShown": true,
  },
  "launch_date_local": {
    "disabled": false,
    "showable": true,
    "isShown": true,
  },
  "launch_site.site_name_long": {
    "disabled": false,
    "showable": true,
    "isShown": true,
  },
  "rocket.rocket_name": {
    "disabled": false,
    "showable": true,
    "isShown": true,
  },
  "rocket.rocket_type": {
    "disabled": false,
    "showable": true,
    "isShown": true,
  },
};