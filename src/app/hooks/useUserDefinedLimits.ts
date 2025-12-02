import { useState, useEffect, useMemo } from 'react';
import { SettingsModelUi } from '@/app/types/uiTypes';

export default function useUserDefinedLimits(): [SettingsModelUi, (x: SettingsModelUi) => void] {
  const limits = useMemo(() => {
    return {
      lowerLimit: {
        min: 0,
        max: 3,
      },
      upperLimit: {
        min: 3,
        max: 12,
      },
    };
  }, []);

  const defaultLimits: SettingsModelUi = useMemo(() => {
    return {
      lowerLimit: 0.5,
      upperLimit: 4.0,
    };
  }, []);

  const [userLimitsInternal, setUserLimitsState] = useState(defaultLimits);

  const setUserLimits = (settings: SettingsModelUi): void => {
    localStorage.removeItem('flightrandomizer-limits-settings-ui');
    localStorage.setItem('flightrandomizer-limits-settings-ui', JSON.stringify(settings));

    setUserLimitsState(settings);
  };

  useEffect(() => {
    const getSettings = (): SettingsModelUi => {
      const json = localStorage.getItem('flightrandomizer-limits-settings-ui');

      if (!json) {
        return {
          lowerLimit: 0.5,
          upperLimit: 4.0,
        };
      }

      const item: SettingsModelUi = JSON.parse(json);

      if (item.lowerLimit < limits.lowerLimit.min || limits.lowerLimit.max < item.lowerLimit) {
        item.lowerLimit = defaultLimits.lowerLimit;
      }

      if (item.upperLimit < limits.upperLimit.min || limits.upperLimit.max < item.upperLimit) {
        item.upperLimit = defaultLimits.upperLimit;
      }

      return item;
    };

    setUserLimitsState(getSettings());
  }, [defaultLimits, limits]);

  return [userLimitsInternal, setUserLimits];
}
