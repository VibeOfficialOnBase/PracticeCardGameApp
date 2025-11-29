import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Simple desktop + mobile responsive nav bar.
 * Will be expanded with active state, icons, and collapsed mobile menu in later commits.
 */

export default function NavBar(){
  const loc = useLocation();
  const active = (p) => loc.pathname === p ? "gradient-text" : "text-muted";

  return (
    <header style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px'}} className="glass-card">
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <Link to="/" style={{textDecoration:'none'}}><div className="gradient-text" style={{fontWeight:800, fontSize:20}}>Good Vibes</div></Link>
        <nav style={{display:'flex', gap:12}}>
          <Link to="/pull" className={active('/pull')}>Pull Card</Link>
          {/* Placeholder links - TODO: replace with real pages as they are implemented */}
          <span className="text-muted">Wins (coming soon)</span>
          <span className="text-muted">Giveaway (coming soon)</span>
          <Link to="/games" className={active('/games')}>Games</Link>
          <span className="text-muted">Social (coming soon)</span>
          <Link to="/profile" className={active('/profile')}>Profile</Link>
          <Link to="/calendar" className={active('/calendar')}>Calendar</Link>
          <span className="text-muted">About (coming soon)</span>
        </nav>
      </div>
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <button className="btn ghost">Connect</button>
      </div>
    </header>
  );
}