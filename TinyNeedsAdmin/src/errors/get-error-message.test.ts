import { describe, expect, it } from 'vitest';
import { getErrorMessage } from './get-error-message';
import { AppError } from './app-error';

describe('getErrorMessage', () => {
  it('extracts the message from an Error', () => {
    expect(getErrorMessage(new AppError('boom'))).toBe('boom');
  });

  it('returns string errors as-is', () => {
    expect(getErrorMessage('boom')).toBe('boom');
  });

  it('falls back for unknown error shapes', () => {
    expect(getErrorMessage({ weird: true })).toBe('Something went wrong');
  });
});
