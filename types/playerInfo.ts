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
      banner?: string;
    };
    rank: {
      rank: string;
      score: string;
      unit: string;
      icon: string;
      color: string;
      peak_rank: {
        rank: string;
        score: string;
        unit: string;
        icon: string;
        color: string;
      };
    };
    team: {
      club_team_id: string;
      club_team_mini_name: string;
      club_team_type: string;
    };
    info: {
      completed_achievements: string;
      login_os: string;
      rank_game_season: Record<
        string,
        {
          rank_game_id: number;
          level: number;
          rank_score: number;
          max_level: number;
          max_rank_score: number;
          update_time: number;
          win_count: number;
          protect_score: number;
          diff_score: number;
        }
      >;
    };
  };
  isPrivate: boolean;
  overall_stats: {
    total_matches: number;
    total_wins: {
      wins: number;
      percentile_raw: number;
      percentile: string;
      win_percentage: {
        percentile_raw: number;
        percentile: number;
        placement: string;
      };
    };
    total_play_time: {
      time_played: number;
      playtime: string;
    };
    per_minute: {
      total_damage_per_minute: number;
      total_damage_taken_per_minute: number;
      total_healing_per_minute: number;
    };
    overall_kd: number;
    overall_kda: {
      kda: number;
      percentile_raw: number;
      percentile: string;
    };
    total_mvps: {
      mvps: number;
      mvp_percentage: {
        percentile_raw: number;
        percentile: number;
        placement: string;
      };
    };
    total_svps: {
      svps: number;
      svp_percentage: {
        percentile_raw: number;
        percentile: number;
        placement: string;
      };
    };
    total_kills: {
      kills: number;
      percentile_raw: number;
      percentile: string;
    };
    total_deaths: {
      deaths: number;
    };
    total_assists: {
      assists: number;
    };
    total_damage: {
      damage: string;
      raw: number;
    };
    total_healing: {
      healing: string;
      raw: number;
    };
    total_damage_taken: {
      damage_taken: string;
      raw: number;
    };
    max_kill_streak: {
      damage_taken: number;
    };
    roles_played: Record<
      "duelist" | "strategist" | "vanguard",
      {
        total_time_played: {
          time_played: number;
          playtime: string;
        };
        matches_played: number;
        matches_won: string;
        win_percentage: {
          win_rate: string;
          win_rate_raw: number;
        };
        kills: number;
        deaths: number;
        assists: number;
        kd_ratio: {
          kd: string;
          kd_raw: number;
        };
        kda_ratio: {
          kda: string;
          kda_raw: number;
        };
        total_damage: {
          damage: string;
          raw: number;
        };
        total_damage_taken: {
          damage_taken: string;
          raw: number;
        };
        total_damage_taken_per_minute: string;
        total_healing: {
          healing: string | null;
          raw: number | null;
        };
        total_healing_per_minute: {
          healing: string;
          raw: number;
        };
      }
    >;
    ranked: Stats;
    unranked: Stats;
  };
  match_history: Match[];
  rank_history: {
    match_time_stamp: number;
    level_progression: {
      from: number;
      to: number;
    };
    score_progression: {
      add_score: number;
      total_score: number;
    };
  }[];
  hero_matchups: {
    hero_id: number;
    hero_name: string;
    hero_class: string;
    hero_thumbnail: string;
    matches: number;
    wins: number;
    win_rate: string;
  }[];
  team_mates: {
    player_info: {
      nick_name: string;
      player_icon: string;
      player_uid: number;
    };
    matches: number;
    wins: number;
    win_rate: string;
  }[];
  heroes_ranked: {
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
    main_attack: {
      total: number;
      hits: number;
    };
  }[];
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
  map_thumbnail?: string;
  duration: number;
  season: number;
  winner_side: number;
  mvp_uid: number;
  svp_uid: number;
  match_time_stamp: number;
  play_mode_id: number;
  game_mode_id: number;
  score_info: Record<string, number>;
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
    score_change: number;
    level: number;
    new_level: number;
    new_score: number;
  };
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
  main_attack: {
    total: number;
    hits: number;
  };
}

interface MapStats {
  map_id: number;
  map_thumbnail?: string;
  matches: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
  play_time: number;
}