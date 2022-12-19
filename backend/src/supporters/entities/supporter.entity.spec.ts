import { SupporterEntity } from './supporter.entity';

describe('Supporter Entity test', () => {
  it('should create a new user', () => {
    const supporter = new SupporterEntity('str', 'bro', 'string');
    expect(supporter).toBeTruthy();
    expect(supporter.name).toBe('str');
    expect(supporter.username).toBe('bro');
    expect(supporter.password).toBe('string');
  });
  it('should create an empty user', () => {
    const supporter = new SupporterEntity();
    expect(supporter).toBeTruthy();
    expect(supporter.name).toBe('');
    expect(supporter.username).toBe('');
    expect(supporter.password).toBe('');
  });
});
