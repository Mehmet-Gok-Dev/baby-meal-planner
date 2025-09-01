// types/global.d.ts

declare global {
    interface Window {
      gtag?: (
        event: 'config' | 'event',
        trackingId: string,
        config: { page_path?: string }
      ) => void;
    }
  }
  
  export {}; 