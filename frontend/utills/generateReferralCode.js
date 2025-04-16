export const generateReferralCode = (name = "") => {
  const part = Math.random().toString(36).substring(2, 7);
  return `${name.toLowerCase().replace(/\s/g, "").slice(0, 3)}-${part}`;
};
