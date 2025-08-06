export interface LeaderboardPlayer {
  score: number;
  uid: string;
  name: string;
  icon: {
    player_icon_id: string;
    player_icon: string;
  };
  rank: {
    rank: {
      rank: string;
      image: string;
      color: string;
    };
    win_rate: string;
    max_level: number;
    rank_score: number;
    protect_score: number;
    diff_score: number;
    season_number: number;
    win_count: number;
    level: number;
    max_rank_score: number;
    season_max_level: number;
    battle_count: number;
  };
}

export interface LeaderboardResponse {
  page: number;
  limit: number;
  total_players: number;
  total_pages: number;
  players: LeaderboardPlayer[];
}