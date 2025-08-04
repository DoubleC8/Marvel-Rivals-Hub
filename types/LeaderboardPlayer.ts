export interface LeaderboardPlayer {
  player_uid: number;
  matches: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
  mvps: number;
  svps: number;
  play_time: string;
  total_hero_damage: string;
  total_damage_taken: string;
  total_hero_heal: string;
  info: {
    icon: {
      player_icon_id: string;
      player_icon: string;
    }
    name: string;
    login_os: string;
    rank_season: {
      rank_game_id: number;
      level: number;
      rank_score: string;
      max_level: number;
      max_rank_score: string;
      update_time: number;
      win_count: number;
      protect_score: number;
      diff_score: string;
    };
  };
}