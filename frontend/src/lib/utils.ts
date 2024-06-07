import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFlagUrl(countryValue: string) {
  // const flagBaseUrl = 'https://www.worldometers.info/img/flags/small/';
  const flagUrl = `https://flagsapi.com/${countryValue}/shiny/64.png`;
  // const flagUrl = `${flagBaseUrl}tn_${countryValue?.toLowerCase()}-flag.gif`;

  return flagUrl;
}
