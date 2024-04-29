import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboards/action';

export function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  if (leaderboards === null) {
    return null;
  }

  return (
    <div id="leaderboards-page">
      <h1>Leaderboards</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="score-column">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboards.map(({ user: { id, name, avatar }, score }) => (
            <tr key={id}>
              <td>
                <div className="table-data-container">
                  <img src={avatar} alt="avatar" />
                  {' '}
                  <p>{name}</p>
                </div>
              </td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
