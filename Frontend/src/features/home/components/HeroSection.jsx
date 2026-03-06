import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import "../style/herosection.scss"
import {useAuth} from '../../auth/hooks/useAuth'

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😢", label: "Sad" },
 
  { emoji: "😲", label: "Surprised" }
  
];

const HeroSection = ({ userName = "User" }) => {
  const {user,loading} = useAuth()
  const {username} = user
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  // Auto cycle through moods
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % moods.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Entry animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`hero ${visible ? "hero--visible" : ""}`}>
      {/* Background glow orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      <div className="hero__content">
        {/* Greeting */}
        <div className="hero__greeting">
          <span className="hero__wave">👋</span>
          <p className="hero__welcome">Welcome back,</p>
          <h2 className="hero__name">{username}</h2>
        </div>

        {/* Headline */}
        <h1 className="hero__headline">
          What's your <span className="hero__highlight">vibe</span> today?
        </h1>

        {/* Mood Emojis */}
        <div className="hero__moods">
          {moods.map((mood, index) => (
            <div
              key={mood.label}
              className={`hero__mood-item ${index === activeIndex ? "hero__mood-item--active" : ""}`}
            >
              <span className="hero__mood-emoji">{mood.emoji}</span>
              <span className="hero__mood-label">{mood.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="hero__cta"
          onClick={() => navigate("/scan")}
        >
          <span className="hero__cta-icon">🎵</span>
          Start Scan
          <span className="hero__cta-arrow">→</span>
        </button>

        {/* Tagline */}
        <p className="hero__tagline">
          Let your face choose the music
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
