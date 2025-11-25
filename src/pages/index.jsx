import Layout from "./Layout.jsx";

import Practice from "./Practice";
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
    // Match lowercase part to Page Name Key
    const normalized = urlLastPart.toLowerCase();
    if (normalized === 'mycards') return 'Cards'; // Map to nav name
    if (normalized === 'practice') return 'Pull';

    // Default fallback
    const map = {
        'practice': 'Practice',
        'mycards': 'MyCards',
        'leaderboard': 'Leaderboard',
        'giveaways': 'Giveaways',
        'community': 'Community',
        'profile': 'Profile',
        'games': 'Games',
        'calendar': 'Calendar',
        'chakrablastermax': 'Games',
        'vibeagotchi': 'Games',
        'challengebubbles': 'Games',
        'memorymatch': 'Games'
    };

    return map[normalized] || 'Practice';
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
                {/* Use lowercase paths to match createPageUrl output */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Practice />} />
                    <Route path="/practice" element={<Practice />} />
                    <Route path="/mycards" element={<MyCards />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/giveaways" element={<Giveaways />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/calendar" element={<Calendar />} />

                    {/* Detailed Routes */}
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/premiumpacks" element={<Giveaways />} /> {/* Alias */}

                    {/* Games */}
                    <Route path="/chakrablastermax" element={<ChakraBlasterMax />} />
                    <Route path="/vibeagotchi" element={<VibeAGotchi />} />
                    <Route path="/challengebubbles" element={<ChallengeBubbles />} />
                    <Route path="/memorymatch" element={<MemoryMatch />} />
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
