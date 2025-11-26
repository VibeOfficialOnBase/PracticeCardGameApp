# Contributing to PRACTICE

Thank you for your interest in contributing to PRACTICE! This guide will help you get started with development, understand our code standards, and successfully contribute to the project.

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Next.js

### Setting Up Development Environment

1. **Clone the repository:**
```bash
git clone https://github.com/your-org/practice-app.git
cd practice-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your development keys.

4. **Run development server:**
```bash
npm run dev
```
App will be available at `http://localhost:3000`

5. **Run SpacetimeDB locally (optional):**
```bash
cd spacetime-server
spacetime start
spacetime publish
```

---

## Code Style Guidelines

### TypeScript

**Strict Typing:**
```typescript
// ✅ GOOD - Explicit types
function calculateStreak(username: string): number {
  // ...
}

// ❌ BAD - Inferred or any types
function calculateStreak(username) {
  // ...
}
```

**No Implicit Any:**
```typescript
// ✅ GOOD - Proper typing
const getValue = <T extends Record<string, unknown>>(obj: T, key: keyof T) => obj[key];

// ❌ BAD - Implicit any
const getValue = (obj: any, key: string) => obj[key];
```

**Type Imports:**
```typescript
// ✅ GOOD
import type { Address } from 'viem';
import { type User } from '@/types';

// ❌ BAD
import { Address } from 'viem';
```

### React Components

**Functional Components with TypeScript:**
```typescript
// ✅ GOOD
interface CardDisplayProps {
  card: Card;
  onShare: () => void;
  username: string;
}

export function CardDisplay({ card, onShare, username }: CardDisplayProps) {
  // ...
}

// ❌ BAD
export function CardDisplay(props: any) {
  // ...
}
```

**Use Client Directive:**
```typescript
// ✅ GOOD - 'use client' at the very top
'use client';

import { useState } from 'react';
```

**Memoization:**
```typescript
// ✅ GOOD - Memoize expensive calculations
const streak = useMemo(() => calculateStreak(username), [username]);

// ❌ BAD - Recalculates every render
const streak = calculateStreak(username);
```

### Styling

**Tailwind CSS:**
```typescript
// ✅ GOOD - Use Tailwind classes
<div className="flex items-center gap-4 p-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">

// ❌ BAD - Inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

**Responsive Design:**
```typescript
// ✅ GOOD - Mobile-first with breakpoints
<div className="text-sm sm:text-base md:text-lg lg:text-xl">

// ❌ BAD - Desktop-only sizing
<div className="text-xl">
```

---

## File Organization

### Component Structure
```
components/
├── ui/                    # Base UI components
├── [Feature]Display.tsx   # Feature display components
├── [Feature]Modal.tsx     # Modal components
└── [Feature]Widget.tsx    # Widget components
```

### Naming Conventions
- **Components**: PascalCase (`CardDisplay.tsx`)
- **Utilities**: camelCase (`pullTracking.ts`)
- **Hooks**: camelCase with 'use' prefix (`usePullStatus.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_STREAK_BONUS`)

---

## Testing Guidelines

### Unit Tests
```typescript
// Example: streakHelpers.test.ts
import { calculateStreak } from '@/utils/streakHelpers';

describe('calculateStreak', () => {
  it('should calculate streak correctly', () => {
    const streak = calculateStreak('testuser');
    expect(streak).toBeGreaterThanOrEqual(0);
  });

  it('should return 0 for user with no pulls', () => {
    const streak = calculateStreak('newuser');
    expect(streak).toBe(0);
  });
});
```

### Integration Tests
Test critical user flows:
- User registration
- Card pulling
- Achievement unlocking
- Wallet connection

### Running Tests
```bash
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

---

## Git Workflow

### Branch Naming
- **Features**: `feature/description` (e.g., `feature/streak-recovery`)
- **Bug Fixes**: `fix/description` (e.g., `fix/token-balance-error`)
- **Documentation**: `docs/description` (e.g., `docs/api-reference`)

### Commit Messages
Follow conventional commits:

```bash
feat: add streak recovery system
fix: resolve token balance loading error
docs: update API documentation
refactor: extract streak calculation to helper
test: add tests for achievement system
chore: update dependencies
```

### Pull Request Process

1. **Create feature branch:**
```bash
git checkout -b feature/your-feature
```

2. **Make changes and commit:**
```bash
git add .
git commit -m "feat: add your feature"
```

3. **Push to GitHub:**
```bash
git push origin feature/your-feature
```

4. **Create Pull Request:**
- Clear title describing the change
- Description of what was changed and why
- Screenshots (if UI changes)
- Link to related issues

5. **Code Review:**
- Address reviewer feedback
- Make requested changes
- Push updates to same branch

6. **Merge:**
- Squash and merge (preferred)
- Delete branch after merge

---

## Code Review Guidelines

### As a Reviewer
- ✅ Check for TypeScript errors
- ✅ Verify code follows style guide
- ✅ Test functionality locally
- ✅ Look for performance issues
- ✅ Check for security vulnerabilities
- ✅ Ensure tests are included
- ✅ Verify documentation is updated

### As an Author
- ✅ Self-review before requesting review
- ✅ Include tests for new features
- ✅ Update documentation
- ✅ Respond promptly to feedback
- ✅ Ask questions if unclear

---

## Performance Best Practices

### Component Optimization
```typescript
// ✅ GOOD - Memoized component
export const CardDisplay = React.memo(({ card }: Props) => {
  return <div>{card.title}</div>;
});

// ✅ GOOD - Memoized callbacks
const handlePull = useCallback(() => {
  pullCard(username);
}, [username]);
```

### Bundle Size
- Keep components small (< 500 lines)
- Use dynamic imports for large components
- Avoid large dependencies

### Images
- Always use Next.js `<Image>` component
- Provide width and height
- Use appropriate formats (WebP when possible)

---

## Documentation Standards

### JSDoc Comments
```typescript
/**
 * Calculates the user's current streak based on pull history
 * 
 * @param username - The user's username
 * @returns Current streak count in days
 * 
 * @example
 * ```typescript
 * const streak = calculateStreak('johndoe');
 * console.log(`Streak: ${streak} days`);
 * ```
 */
export function calculateStreak(username: string): number {
  // ...
}
```

### Component Documentation
```typescript
/**
 * Displays a card with affirmation, mission, and inspiration
 * 
 * Features:
 * - Animated card reveal
 * - Share functionality
 * - Journal integration
 * - Streak display
 */
export function CardDisplay({ card, username }: Props) {
  // ...
}
```

---

## Common Pitfalls to Avoid

### 1. Not Using Safe Storage
```typescript
// ❌ BAD
const data = JSON.parse(localStorage.getItem('key'));

// ✅ GOOD
const data = safeLocalStorage.getItem<DataType>('key', defaultValue);
```

### 2. Missing Error Handling
```typescript
// ❌ BAD
const balance = await checkVibeTokenBalance(address);

// ✅ GOOD
try {
  const balance = await withRetry(() => checkVibeTokenBalance(address));
} catch (error) {
  handleError(error, 'Balance Check');
}
```

### 3. Prop Drilling
```typescript
// ❌ BAD - Passing props through many levels
<Parent>
  <Child1 username={username}>
    <Child2 username={username}>
      <Child3 username={username} />

// ✅ GOOD - Use context or composition
const UsernameContext = createContext<string>('');
```

---

## Feature Development Checklist

Before submitting a PR:

- [ ] Code follows style guidelines
- [ ] TypeScript strict mode passes
- [ ] No console errors or warnings
- [ ] Responsive design implemented
- [ ] Accessibility checked (ARIA, keyboard nav)
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Performance tested (no unnecessary re-renders)
- [ ] Security reviewed (no exposed secrets)
- [ ] Backwards compatibility maintained

---

## Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [SpacetimeDB Docs](https://spacetimedb.com/docs)

### Community
- GitHub Discussions for questions
- Discord server (coming soon)
- Weekly office hours (TBD)

---

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Invited to contributor-only events

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to PRACTICE! 🙏
