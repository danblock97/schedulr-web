'use client';

import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isIOS: boolean;
  isMac: boolean;
  isWindows: boolean;
  isMobile: boolean;
  canOpenAppStore: boolean; // Mac can open App Store, Windows cannot
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isIOS: false,
    isMac: false,
    isWindows: false,
    isMobile: false,
    canOpenAppStore: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform.toLowerCase();

    const isIOS = /iphone|ipad|ipod/.test(userAgent) || 
                  (platform === 'macintel' && navigator.maxTouchPoints > 1);
    const isMac = /macintosh|mac os x/.test(userAgent) && !isIOS;
    const isWindows = /windows/.test(userAgent);
    const isMobile = /mobile|android|iphone|ipad/.test(userAgent);

    setDeviceInfo({
      isIOS,
      isMac,
      isWindows,
      isMobile,
      canOpenAppStore: isIOS || isMac, // Both iOS and Mac can open App Store links
    });
  }, []);

  return deviceInfo;
}

