import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./navigation/NavBar";
import WalletModal from "./wallet/WalletModal";
import WelcomeScreen from "./WelcomeScreen";
import PullCards from "../pages/PullCards"; // existing page (keeps backward compatibility)
import Profile from "../pages/Profile";
import Calendar from "../pages/Calendar";
import Games from "../pages/Games";

/**
 * AppShell - root app container (new UI entry).
 * This component will be expanded with providers (Supabase, Wallet contexts) in later commits.
 */
export default function AppShell(){
  return (
    <Router>
      <div className="safe-top" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        <NavBar />
        <main style={{flex:1, padding: '20px 16px'}}>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/pull" element={<PullCards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/games" element={<Games />} />
          </Routes>
        </main>
        <WalletModal />
      </div>
    </Router>
  );
}