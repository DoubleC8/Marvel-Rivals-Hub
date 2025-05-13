export interface PlayerInfo {
    uid: number;
    name: string;
    updates: {
      info_update_time: string;
      last_history_update: string;
      last_inserted_match: string;
      last_update_request: string;
    };
    player: {
      uid: number;
      level: string;
      name: string;
      icon: {
        player_icon_id: string;
        player_icon: string;
      };
      rank: {
        rank: string;
        image: string;
        color: string;
      };
      team: {
        club_team_id: string;
        club_team_mini_name: string;
        club_team_type: string;
      };
      info: {
        completed_achievements: string;
        login_os: string;
        rank_game_season: any; // can be refined if structure is known
      };
    };
    isPrivate: boolean;
    overall_stats: {
      total_matches: number;
      total_wins: number;
      unranked: Stats;
      ranked: Stats;
    };
    match_history: Match[];
    rank_history: any[];
    hero_matchups: any[];
    team_mates: Teammate[];
    heroes_ranked: any[];
    heroes_unranked: Hero[];
    maps: MapStats[];
  }
  
  interface Stats {
    total_matches: number;
    total_wins: number;
    total_assists: number;
    total_deaths: number;
    total_kills: number;
    total_time_played: string;
    total_time_played_raw: number;
    total_mvp: number;
    total_svp: number;
  }
  
  interface Match {
    match_uid: string;
    map_id: number;
    map_thumbnail: string;
    duration: number;
    season: number;
    winner_side: number;
    mvp_uid: number;
    svp_uid: number;
    match_time_stamp: number;
    play_mode_id: number;
    game_mode_id: number;
    score_info: any;
    player_performance: any;
  }
  
  interface Teammate {
    player_info: any;
    matches: number;
    wins: number;
    win_rate: string;
  }
  
  interface Hero {
    hero_id: number;
    hero_name: string;
    hero_thumbnail: string;
    matches: number;
    wins: number;
    mvp: number;
    svp: number;
    kills: number;
    deaths: number;
    assists: number;
    play_time: number;
    damage: number;
    heal: number;
    damage_taken: number;
    main_attack: any;
  }
  
  interface MapStats {
    map_id: number;
    map_thumbnail: string;
    matches: number;
    wins: number;
    kills: number;
    deaths: number;
    assists: number;
    play_time: number;
  }
  