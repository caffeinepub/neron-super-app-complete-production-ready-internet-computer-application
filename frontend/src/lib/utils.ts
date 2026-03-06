import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a principal ID into a standard ICP address format
 * ICP addresses are the textual representation of the principal
 * @param principal - The principal string to format
 * @returns Formatted ICP address
 */
export function formatIcpAddress(principal: string): string {
  // Principal IDs are already in the correct format for ICP addresses
  // They follow the pattern: xxxxx-xxxxx-xxxxx-xxxxx-xxx
  return principal;
}

/**
 * Truncates an ICP address for display purposes
 * @param address - The full ICP address
 * @param startChars - Number of characters to show at start (default: 8)
 * @param endChars - Number of characters to show at end (default: 6)
 * @returns Truncated address with ellipsis
 */
export function truncateAddress(address: string, startChars: number = 8, endChars: number = 6): string {
  if (address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Validates if a string is a valid ICP address (Principal ID format)
 * @param address - The address to validate
 * @returns True if valid ICP address format
 */
export function isValidIcpAddress(address: string): boolean {
  // Principal IDs consist of groups of alphanumeric characters separated by hyphens
  // They end with a checksum group (typically 3 characters)
  const principalRegex = /^[a-z0-9]{5}(-[a-z0-9]{5})*-[a-z0-9]{3}$/;
  return principalRegex.test(address);
}
