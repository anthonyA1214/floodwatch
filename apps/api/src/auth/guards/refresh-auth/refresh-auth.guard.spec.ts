import { JwtRefreshAuthGuard } from './refresh-auth.guard';

describe('RefreshAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtRefreshAuthGuard()).toBeDefined();
  });
});
