export interface LeaderboardPlayer {
  score: number;
  uid: string;
  name: string;
  icon?: {
    player_icon_id: string;
    player_icon: string;
  };
  cur_head_icon_id?: string;
  rank: {
    rank_score: number;
    max_rank_score: number;
    level: number;
    max_level: number;
    season_max_level?: number;
    protect_score: number;
    diff_score: number;
    season_number: number;
    win_count: number;
    battle_count: number;
    win_rate?: string;
    update_time?: number;
    rank?: {
      rank: string;
      image: string;
      color: string;
    };
  };
}

export interface LeaderboardResponse {
  page: number;
  limit: number;
  total_players: number;
  total_pages: number;
  players: LeaderboardPlayer[];
}