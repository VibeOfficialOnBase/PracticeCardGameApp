import React from "react";
import { Link } from "react-router-dom";

/**
 * WelcomeScreen - initial onboarding splash and CTA to try Pull Card.
 * Will be extended in subsequent commits to show progress, quick pull, and wallet prompts.
 */

export default function WelcomeScreen(){
  return (
    <section style={{maxWidth:980, margin:'0 auto'}} className="practice-gradient-glow">
      <div style={{display:'flex', gap:20, alignItems:'center', flexWrap:'wrap'}}> 
        <div style={{flex:1, minWidth:280}}>
          <h1 className="gradient-text" style={{fontSize:40, margin:0}}>Good Vibes — Practice & Grow</h1>
          <p className="text-muted" style={{marginTop:8}}>
            Daily practice cards, journaling, mood checks, and a light gamified experience to celebrate growth.
          </p>
          <div style={{marginTop:18}}>
            <Link to="/pull"><button className="btn primary">Pull Today's Practice</button></Link>
            <Link to="/profile"><button className="btn ghost" style={{marginLeft:12}}>My Profile</button></Link>
          </div>
        </div>
        <div style={{width:320, minWidth:240}} className="glass-card glass-card-hover">
          <h4 style={{marginTop:0}}>Daily Pulse</h4>
          <p className="text-muted">Quick mood check, streaks, and recommended practice for today.</p>
          <div style={{marginTop:12}}>
            <div style={{height:8, background:'rgba(255,255,255,0.04)', borderRadius:8}}><div style={{width:'64%', height:8, background:'linear-gradient(90deg,#8b5cf6,#06b6d4)', borderRadius:8}}></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}