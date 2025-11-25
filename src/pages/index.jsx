import Layout from "./Layout.jsx";

import Practice from "./Practice"; // Replaces Dashboard logic for home
import Community from "./Community";
import Achievements from "./Achievements";
import Profile from "./Profile";
import Leaderboard from "./Leaderboard";
import Calendar from "./Calendar";
import Giveaways from "./Giveaways";
import MyCards from "./MyCards";
import Games from "./Games";

// Games
import ChakraBlasterMax from "./ChakraBlasterMax";
import ChallengeBubbles from "./ChallengeBubbles";
import MemoryMatch from "./MemoryMatch";
import VibeAGotchi from "./VibeAGotchi";

import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "@/components/ProtectedRoute";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Helper to determine current page for Layout highlighting
function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }
    return urlLastPart || 'Practice';
}

function PagesContent() {
    const location = useLocation();
    const normalizedPath = location.pathname.toLowerCase().replace(/\/+$/, '');
    const isAuthPage = ['/login', '/signup'].includes(normalizedPath);
    const currentPage = _getCurrentPage(location.pathname);
    
    if (isAuthPage) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        );
    }

    return (
        <Layout currentPageName={currentPage}>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Practice />} />
                    <Route path="/Practice" element={<Practice />} />
                    <Route path="/MyCards" element={<MyCards />} />
                    <Route path="/Leaderboard" element={<Leaderboard />} />
                    <Route path="/Giveaways" element={<Giveaways />} />
                    <Route path="/Community" element={<Community />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Games" element={<Games />} />
                    <Route path="/Calendar" element={<Calendar />} />

                    {/* Detailed Routes */}
                    <Route path="/Achievements" element={<Achievements />} />
                    <Route path="/PremiumPacks" element={<Giveaways />} /> {/* Alias for now */}

                    {/* Games */}
                    <Route path="/ChakraBlasterMax" element={<ChakraBlasterMax />} />
                    <Route path="/VibeAGotchi" element={<VibeAGotchi />} />
                    <Route path="/ChallengeBubbles" element={<ChallengeBubbles />} />
                    <Route path="/MemoryMatch" element={<MemoryMatch />} />
                </Route>
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}
