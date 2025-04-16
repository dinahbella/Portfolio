export const generateReferralCode = (name = "") => {
  const namePart = name.toLowerCase().replace(/\s/g, "").slice(0, 10);
  const randomPart = Math.random().toString(36).substring(2, 10); // 8 characters
  const suffix = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0"); // 3-digit number
  return `${namePart}-${randomPart}${suffix}`;
};
