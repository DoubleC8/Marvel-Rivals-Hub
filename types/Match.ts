export interface Match {
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
  score_info: any | null; // Replace `any` with a better type if possible
  player_performance: {
    player_uid: number;
    hero_id: number;
    hero_name: string;
    hero_type: string;
    kills: number;
    deaths: number;
    assists: number;
    is_win: {
      score: number;
      is_win: boolean;
    };
    disconnected: boolean;
    camp: number;
    level: number | null;
    new_level: number | null;
    score_change: number | null;
    new_score: number | null; // ← Fix here
  };
}