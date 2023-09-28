SELECT
    p.id AS player_id_column,
    p.first_name || ' ' || p.last_name AS player_name,
    goals_summary.goals_count AS goal_amount,
    big_team_goals_summary.big_team_goals_count AS big_team_goal_amount,
    t.name AS team_name,
    l.name AS league_name
FROM
    players p
INNER JOIN teams t ON p.team_id = t.id
INNER JOIN leagues l ON t.league_id = l.id
INNER JOIN (
    SELECT
        g.player_id,
        COUNT(g.player_id) AS goals_count
    FROM
        goals g
    GROUP BY
        g.player_id
) AS goals_summary ON p.id = goals_summary.player_id
INNER JOIN (
    SELECT
        g.player_id,
        COUNT(g.player_id) AS big_team_goals_count
    FROM
        goals g
    INNER JOIN (
        SELECT
            t.id AS team_id
        FROM
            teams t
        WHERE
            t.last_season_rank <= 4
    ) AS big_teams ON g.against_team_id = big_teams.team_id
    GROUP BY
        g.player_id
) AS big_team_goals_summary ON p.id = big_team_goals_summary.player_id
GROUP BY
    player_id_column
HAVING
    goal_amount >= 20 AND big_team_goal_amount >= 5
ORDER BY
    goal_amount DESC;
