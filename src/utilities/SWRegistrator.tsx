import React, { useEffect } from 'react';
interface OwnProps {}

type Props = OwnProps;

const SWRegistrator: React.FC<Props> = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('./sw.js');

          console.log('Service Worker: Registered');
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, []);

  return <></>;
};

export default SWRegistrator;
