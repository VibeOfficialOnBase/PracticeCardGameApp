# PRACTICE Documentation

Welcome to the comprehensive documentation for the PRACTICE app! 📚

---

## Table of Contents

1. [**Architecture**](./ARCHITECTURE.md) - System design and technical architecture
2. [**Features**](./FEATURES.md) - Complete feature documentation
3. [**API Reference**](./API.md) - SpacetimeDB reducers and API routes
4. [**Deployment**](./DEPLOYMENT.md) - Production deployment guide
5. [**Contributing**](./CONTRIBUTING.md) - Development guidelines
6. [**Testing**](./TESTING.md) - Testing strategy and examples

---

## Quick Start

### For Developers
```bash
# Clone repository
git clone https://github.com/your-org/practice-app.git

# Install dependencies
npm install

# Start development server
npm run dev
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed setup instructions.

### For Users
Visit [practice-app.vercel.app](https://practice-app.vercel.app) to start your PRACTICE journey!

---

## Documentation Overview

### [Architecture](./ARCHITECTURE.md)
Learn about the technical foundation of PRACTICE:
- Tech stack (Next.js, SpacetimeDB, Base blockchain)
- Component structure and organization
- State management patterns
- Data flow diagrams
- Performance optimizations
- Security considerations

**Best for:** Understanding the codebase structure, making architectural decisions

---

### [Features](./FEATURES.md)
Comprehensive guide to all features:
- Daily card pulls (365 cards)
- Multi-pack system (PRACTICE, Vibe Check, LECHE)
- Streak system with milestones
- Achievement system (50+ achievements)
- XP & level progression
- Token gating ($VibeOfficial)
- SpacetimeDB real-time features
- Social features (sharing, referrals)
- PWA capabilities
- Mobile-first design

**Best for:** Understanding user features, planning new features, writing user docs

---

### [API Reference](./API.md)
Complete API documentation:
- **SpacetimeDB Reducers**: All server-side functions
  - User management (`create_user`, `update_username`)
  - Card pulls (`record_pull`, `check_daily_limit`)
  - Achievements (`unlock_achievement`)
  - XP system (`award_xp`)
  - Pack management (`claim_pack`)
  - Referrals (`create_referral`, `complete_referral`)
  - Journal system (`save_journal_entry`)
  - Raffle system (`enter_raffle`, `select_winner`)
  
- **API Routes**: Next.js endpoints
  - Authentication (`/api/auth/*`)
  - Notifications (`/api/notifications/*`)
  - Email (`/api/email`)
  - Health check (`/api/health`)
  - Proxy (`/api/proxy`)

- **Client Utilities**: Helper functions
  - Pull tracking
  - Achievement system
  - XP calculations
  - Token gating
  - Streak helpers

**Best for:** Integration work, API usage, understanding data flows

---

### [Deployment](./DEPLOYMENT.md)
Production deployment guide:
- Prerequisites and accounts needed
- Environment variable configuration
- Vercel deployment (recommended)
- SpacetimeDB setup and publishing
- Post-deployment checklist
- Monitoring and analytics setup
- Troubleshooting common issues
- Scaling considerations
- Backup and recovery
- Security best practices

**Best for:** DevOps, production deployment, maintaining live app

---

### [Contributing](./CONTRIBUTING.md)
Developer guidelines:
- Setting up development environment
- Code style guidelines (TypeScript, React, Tailwind)
- File organization and naming conventions
- Testing requirements
- Git workflow and branch naming
- Pull request process
- Code review guidelines
- Performance best practices
- Documentation standards
- Common pitfalls to avoid

**Best for:** Contributing code, following team standards, code reviews

---

### [Testing](./TESTING.md)
Comprehensive testing guide:
- Testing strategy (unit, integration, E2E)
- Unit testing examples (utilities, helpers)
- Integration testing (features, flows)
- E2E testing with Playwright
- Testing hooks and components
- Mocking strategies
- Coverage goals and reporting
- CI/CD integration
- Performance testing
- Accessibility testing

**Best for:** Writing tests, achieving coverage goals, CI/CD setup

---

## Key Concepts

### The PRACTICE Philosophy
**P**atiently **R**epeating **A**ltruistic **C**hallenges **T**o **I**nspire **C**ore **E**xcellence

Daily practice leads to **LECHE** (the 5 core principles):
- **L**ove - Compassion for self & others
- **E**mpathy - Understanding & connection
- **C**ommunity - Building together
- **H**ealing - Growth & restoration
- **E**mpowerment - Strength to create change

### Core Features at a Glance

| Feature | Description | Tech |
|---------|-------------|------|
| **Daily Cards** | 365 affirmation cards | localStorage + SpacetimeDB |
| **Streaks** | Consecutive day tracking | localStorage calculation |
| **Achievements** | 50+ unlockable badges | Client-side logic + DB sync |
| **XP System** | Level up through actions | localStorage + SpacetimeDB |
| **Token Gating** | Exclusive packs for holders | viem + Base RPC |
| **Real-time** | Live community stats | SpacetimeDB WebSocket |
| **PWA** | Install as native app | Service workers |
| **Mobile-First** | Optimized for touch | Tailwind responsive |

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion

### Backend
- **Database**: SpacetimeDB (Real-time)
- **Blockchain**: Base (Ethereum L2)
- **Wallet**: Coinbase OnchainKit
- **Auth**: Email + Wallet

### Infrastructure
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics

---

## Project Structure

```
practice-app/
├── src/
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # React components
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utility functions
│   ├── data/             # Static data (cards, achievements)
│   └── spacetime_module_bindings/ # Generated types
│
├── spacetime-server/     # SpacetimeDB Rust module
│   └── src/
│       └── lib.rs        # Database schema and reducers
│
├── docs/                 # Documentation
│   ├── ARCHITECTURE.md
│   ├── FEATURES.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   └── TESTING.md
│
├── public/               # Static assets
└── [config files]        # TypeScript, Next.js, Tailwind configs
```

---

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
npm run dev
npm test

# Commit and push
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature

# Create pull request
```

### 2. Code Review
- Reviewer checks code quality
- Tests must pass
- Documentation updated
- Performance verified

### 3. Deployment
- Merge to `main`
- Automatic deployment to Vercel
- Verify production build
- Monitor for errors

---

## Common Tasks

### Adding a New Feature
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand structure
2. Follow patterns in [CONTRIBUTING.md](./CONTRIBUTING.md)
3. Write tests (see [TESTING.md](./TESTING.md))
4. Update [FEATURES.md](./FEATURES.md) with documentation
5. Create pull request

### Fixing a Bug
1. Reproduce the issue locally
2. Write a failing test
3. Fix the bug
4. Verify test passes
5. Check for regression
6. Create pull request

### Updating Documentation
1. Identify what needs updating
2. Make changes in relevant docs file
3. Ensure examples are accurate
4. Update table of contents if needed
5. Create pull request

---

## Support & Community

### Getting Help
- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions and share ideas
- **Discord**: Community chat (coming soon)

### Resources
- [Live App](https://practice-app.vercel.app)
- [GitHub Repository](https://github.com/your-org/practice-app)
- [SpacetimeDB Docs](https://spacetimedb.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

---

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Code style guidelines
- Development setup
- Pull request process
- Testing requirements

---

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

## Credits

**Created by**: Eddie Pabon
- [LinkedIn](https://www.linkedin.com/in/eddiepabon)
- [X (Twitter)](https://x.com/havehonorfaith)
- [Zora](https://zora.co/vibeofficial)

**Powered by**: $VibeOfficial on Base
- [DexScreener](https://dexscreener.com/base/0xd562ecf42d492b24b83a1661782f6674e3f5eda3702610379c282b922a54a234)

---

## Version History

### Latest: v2.0.0 (Current)
- ✅ Multi-pack system
- ✅ Token gating
- ✅ Real-time features
- ✅ PWA support
- ✅ Mobile optimization
- ✅ Comprehensive documentation

### Previous Versions
- v1.5.0: Added achievements system
- v1.0.0: Initial release with 365 cards

---

## Roadmap

### Q1 2024
- [ ] Streak recovery system
- [ ] Weekly digest emails
- [ ] Enhanced analytics
- [ ] Social features v2

### Q2 2024
- [ ] React Native mobile apps
- [ ] Advanced notifications
- [ ] Friend system
- [ ] Custom pack creator

### Q3 2024
- [ ] NFT integration
- [ ] Marketplace
- [ ] Cross-chain support
- [ ] API for third-party apps

---

Thank you for being part of the PRACTICE community! 🙏✨
