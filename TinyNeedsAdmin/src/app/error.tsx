'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/errors/get-error-message';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-svh flex-col items-center justify-center gap-4 text-center'>
      <h2 className='text-xl font-semibold'>Something went wrong</h2>
      <p className='max-w-md text-sm text-muted-foreground'>
        {getErrorMessage(error, 'An unexpected error occurred.')}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
