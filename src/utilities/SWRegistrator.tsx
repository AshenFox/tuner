import { memo, useEffect } from 'react';

const SWRegistrator = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          await navigator.serviceWorker.register('./sw.js'); // returns registration

          console.info('Service Worker: Registered');
        } catch (error) {
          console.info(error);
        }
      });
    }
  }, []);

  return null;
};

export default memo(SWRegistrator);
