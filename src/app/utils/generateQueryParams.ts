import { SettingsModelUi } from "@/app/types/uiTypes";

const hoursToUnixSeconds = (hoursFromNow: number): number => {
  const date = new Date();
  date.setTime(date.getTime() + hoursFromNow * 60 * 60 * 1000);

  return Math.round(date.getTime() / 1000);
};

export const generateQueryParams = (
  userTimeLimits: SettingsModelUi
): string => {
  const lowerLimit = hoursToUnixSeconds(userTimeLimits.lowerLimit);
  const upperLimit = hoursToUnixSeconds(userTimeLimits.upperLimit);

  return `?from=${lowerLimit}&to=${upperLimit}`;
};
