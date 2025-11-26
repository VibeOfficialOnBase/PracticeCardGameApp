# PRACTICE Testing Guide

Comprehensive testing documentation for the PRACTICE app.

---

## Testing Strategy

### Testing Pyramid
```
        /\
       /  \
      / E2E \         10% - End-to-End Tests (Critical user flows)
     /______\
    /        \
   /  Integr. \       30% - Integration Tests (Feature interactions)
  /___________\
 /             \
/ Unit Tests    \     60% - Unit Tests (Functions, utilities, hooks)
/_______________\
```

---

## Unit Testing

### What to Test
- Utility functions
- Helper functions
- Calculation logic
- State transformations

### Example: Testing Streak Calculations

```typescript
// streakHelpers.test.ts
import { calculateStreak, getStreakRisk } from '@/utils/streakHelpers';
import { recordPull } from '@/utils/pullTracking';

describe('Streak Calculations', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('calculateStreak', () => {
    it('should return 0 for new user with no pulls', () => {
      const streak = calculateStreak('newuser');
      expect(streak).toBe(0);
    });

    it('should return 1 for single pull', () => {
      recordPull('testuser', 1);
      const streak = calculateStreak('testuser');
      expect(streak).toBe(1);
    });

    it('should calculate consecutive day streak correctly', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Mock pulls for consecutive days
      recordPull('testuser', 1, yesterday.toISOString());
      recordPull('testuser', 2, today.toISOString());
      
      const streak = calculateStreak('testuser');
      expect(streak).toBe(2);
    });

    it('should break streak with missed day', () => {
      const today = new Date();
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      recordPull('testuser', 1, twoDaysAgo.toISOString());
      recordPull('testuser', 2, today.toISOString());
      
      const streak = calculateStreak('testuser');
      expect(streak).toBe(1); // Only today counts
    });
  });

  describe('getStreakRisk', () => {
    it('should return "none" for user who pulled today', () => {
      recordPull('testuser', 1);
      const risk = getStreakRisk('testuser');
      expect(risk).toBe('none');
    });

    it('should return "high" for user who pulled 20+ hours ago', () => {
      const twentyHoursAgo = new Date();
      twentyHoursAgo.setHours(twentyHoursAgo.getHours() - 20);
      
      recordPull('testuser', 1, twentyHoursAgo.toISOString());
      const risk = getStreakRisk('testuser');
      expect(risk).toBe('high');
    });
  });
});
```

### Example: Testing Error Handling

```typescript
// errorHandling.test.ts
import { withRetry, NetworkError, handleError } from '@/utils/errorHandling';

describe('Error Handling', () => {
  describe('withRetry', () => {
    it('should retry failed operations', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('Failed');
        return 'Success';
      };

      const result = await withRetry(fn, 3, 10);
      expect(result).toBe('Success');
      expect(attempts).toBe(3);
    });

    it('should throw after max retries', async () => {
      const fn = async () => {
        throw new Error('Always fails');
      };

      await expect(withRetry(fn, 3, 10)).rejects.toThrow('Always fails');
    });
  });

  describe('handleError', () => {
    it('should return user-friendly message for NetworkError', () => {
      const error = new NetworkError('Connection failed');
      const message = handleError(error);
      expect(message).toBe('Network error. Please check your connection.');
    });

    it('should handle unknown errors gracefully', () => {
      const message = handleError('Unknown error');
      expect(message).toBe('An unexpected error occurred. Please try again.');
    });
  });
});
```

---

## Integration Testing

### What to Test
- Component interactions
- API route handlers
- Database operations
- Authentication flows

### Example: Testing Card Pull Flow

```typescript
// cardPull.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '@/app/page';
import { useSpacetimeDB } from '@/hooks/useSpacetimeDB';

jest.mock('@/hooks/useSpacetimeDB');

describe('Card Pull Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    (useSpacetimeDB as jest.Mock).mockReturnValue({
      connected: true,
      recordPull: jest.fn(),
    });
  });

  it('should complete full card pull flow', async () => {
    render(<Page />);

    // Enter username
    const input = screen.getByPlaceholderText(/username/i);
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText(/start/i));

    // Pull card
    await waitFor(() => {
      expect(screen.getByText(/pull your daily card/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/pull your daily card/i));

    // Verify card displayed
    await waitFor(() => {
      expect(screen.getByTestId('card-display')).toBeInTheDocument();
    });

    // Verify XP awarded
    expect(screen.getByText(/10 XP/i)).toBeInTheDocument();
  });

  it('should prevent pulling twice in one day', async () => {
    // First pull
    render(<Page />);
    // ... (pull card as above)

    // Try pulling again
    const pullButton = screen.getByText(/pull/i);
    expect(pullButton).toBeDisabled();
    expect(screen.getByText(/come back tomorrow/i)).toBeInTheDocument();
  });
});
```

### Example: Testing Achievement System

```typescript
// achievements.integration.test.ts
import { checkAndUnlockAchievements } from '@/utils/achievementsTracking';
import { recordPull } from '@/utils/pullTracking';

describe('Achievement System Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should unlock streak achievement', () => {
    const username = 'testuser';
    
    // Simulate 7 days of pulls
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      recordPull(username, i + 1, date.toISOString());
    }

    const unlocked = checkAndUnlockAchievements(
      username,
      7, // streak
      7, // total pulls
      0, 0, 0, 0, 0, 0, 1, false, 0, 0, 0, 0, 0, false, false, false, false, 0
    );

    expect(unlocked).toContainEqual(
      expect.objectContaining({ achievementId: 'week_warrior' })
    );
  });
});
```

---

## End-to-End Testing

### What to Test
- Critical user journeys
- Multi-step processes
- Cross-component interactions
- Real API/database interactions

### Example: Playwright E2E Test

```typescript
// e2e/userJourney.spec.ts
import { test, expect } from '@playwright/test';

test.describe('New User Journey', () => {
  test('should complete onboarding and pull first card', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Complete onboarding
    await page.fill('[placeholder="Enter your username"]', 'e2euser');
    await page.click('text=Start Practicing');

    // Pull first card
    await page.click('text=Pull Your Daily Card');

    // Verify card is displayed
    await expect(page.locator('[data-testid="card-display"]')).toBeVisible();

    // Verify XP awarded
    await expect(page.locator('text=/10 XP/i')).toBeVisible();

    // Verify achievement toast
    await expect(page.locator('text=/Getting Started/i')).toBeVisible();
  });

  test('should connect wallet and access exclusive pack', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Complete onboarding
    await page.fill('[placeholder="Enter your username"]', 'e2euser');
    await page.click('text=Start Practicing');

    // Connect wallet
    await page.click('text=Connect Wallet');
    // ... (handle wallet connection flow)

    // Access pack selector
    await page.click('text=Claim Exclusive Pack');

    // Verify Vibe Check pack is available
    await expect(page.locator('text=/Vibe Check/i')).toBeVisible();
  });
});
```

---

## Testing Hooks

### Example: Testing Custom Hook

```typescript
// useStreak.test.ts
import { renderHook, act } from '@testing-library/react';
import { useStreak } from '@/hooks/useStreak';
import { recordPull } from '@/utils/pullTracking';

describe('useStreak Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return current streak', () => {
    recordPull('testuser', 1);
    
    const { result } = renderHook(() => useStreak('testuser'));
    
    expect(result.current.streak).toBe(1);
    expect(result.current.risk).toBe('none');
  });

  it('should update when pull is recorded', () => {
    const { result } = renderHook(() => useStreak('testuser'));
    
    expect(result.current.streak).toBe(0);
    
    act(() => {
      recordPull('testuser', 1);
    });
    
    expect(result.current.streak).toBe(1);
  });
});
```

---

## Testing Components

### Example: Testing React Component

```typescript
// CardDisplay.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CardDisplay } from '@/components/CardDisplay';

describe('CardDisplay Component', () => {
  const mockCard = {
    id: 1,
    title: 'Test Card',
    affirmation: 'Test Affirmation',
    mission: 'Test Mission',
    inspiration: 'Test Inspiration',
  };

  it('should render card content', () => {
    render(<CardDisplay card={mockCard} username="testuser" />);
    
    expect(screen.getByText('Test Affirmation')).toBeInTheDocument();
    expect(screen.getByText('Test Mission')).toBeInTheDocument();
    expect(screen.getByText('Test Inspiration')).toBeInTheDocument();
  });

  it('should call onShare when share button clicked', () => {
    const onShare = jest.fn();
    render(<CardDisplay card={mockCard} username="testuser" onShare={onShare} />);
    
    fireEvent.click(screen.getByText(/share/i));
    expect(onShare).toHaveBeenCalledTimes(1);
  });
});
```

---

## Mocking

### Mocking SpacetimeDB

```typescript
// __mocks__/useSpacetimeDB.ts
export const useSpacetimeDB = jest.fn(() => ({
  connected: true,
  user: { identity: '0x123', username: 'testuser' },
  recordPull: jest.fn(),
  unlockAchievement: jest.fn(),
  createUser: jest.fn(),
}));
```

### Mocking API Routes

```typescript
// __mocks__/fetch.ts
global.fetch = jest.fn((url, options) => {
  if (url === '/api/proxy') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: 'mocked' }),
    });
  }
  return Promise.reject(new Error('Not mocked'));
}) as jest.Mock;
```

---

## Coverage Goals

Target coverage metrics:
- **Overall**: 80%+
- **Utilities**: 90%+
- **Components**: 75%+
- **Hooks**: 85%+

### Generating Coverage Report

```bash
npm run test:coverage
```

View report at `coverage/lcov-report/index.html`

---

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run test:coverage
      - run: npm run type-check
      - run: npm run lint
```

---

## Performance Testing

### Lighthouse CI

```bash
npm install -g @lhci/cli

# Run Lighthouse
lhci autorun --collect.url=http://localhost:3000
```

### Bundle Size Testing

```bash
npm run build
npm run analyze
```

---

## Accessibility Testing

### Automated Tests

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<CardDisplay card={mockCard} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Best Practices

1. **Write tests first** (TDD when possible)
2. **Test behavior, not implementation**
3. **Keep tests simple and focused**
4. **Use descriptive test names**
5. **Mock external dependencies**
6. **Clean up after tests** (clear localStorage, etc.)
7. **Run tests before committing**
8. **Aim for high coverage** on critical paths

---

## Debugging Tests

### Running Single Test

```bash
npm test -- streakHelpers.test.ts
```

### Watch Mode

```bash
npm test -- --watch
```

### Debugging in VS Code

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand"],
  "console": "integratedTerminal"
}
```

---

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Docs](https://playwright.dev/docs/intro)
