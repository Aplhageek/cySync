/**
 * Falsy value check for any type of value
 */
export const isEmpty = (objectToCheck: unknown) => {
  if (objectToCheck === null || objectToCheck === undefined) return true;
  if (Array.isArray(objectToCheck)) return !objectToCheck.length;
  if (typeof objectToCheck === "string") return !objectToCheck.trim().length;

  if (objectToCheck instanceof Date)
    return objectToCheck.getTime && isNaN(objectToCheck.getTime());

  if (typeof objectToCheck === "object")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.keys(objectToCheck).length === 0;
  if (typeof objectToCheck === "number")
    return !objectToCheck && objectToCheck !== 0;
  return !objectToCheck;
};

export function getRandomAlphaNumericString(length: number) {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export const isValidDate = (value: unknown) => {
  try {
    const isValid = Boolean(
      value && new Date(value as string | Date).getTime()
    );
    return isValid;
  } catch (err) {
    return false;
  }
};
