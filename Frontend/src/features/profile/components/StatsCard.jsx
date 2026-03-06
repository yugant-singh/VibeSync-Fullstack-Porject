import React from "react";
import "../style/statscard.scss"

const stats = [
  { emoji: "🎯", label: "Total Scans", value: 45 },
  { emoji: "😊", label: "Happy", value: 20 },
  { emoji: "😢", label: "Sad", value: 15 },
  { emoji: "😲", label: "Surprised", value: 10 },
];

const StatsCard = () => {
  return (
    <div className="stats-card">
      <h3 className="stats-card__title">Your Mood Stats</h3>
      <div className="stats-card__grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stats-card__item">
            <span className="stats-card__emoji">{stat.emoji}</span>
            <span className="stats-card__value">{stat.value}</span>
            <span className="stats-card__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
