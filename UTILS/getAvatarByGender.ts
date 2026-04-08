export const getAvatarByGender = (gender?: string) => {
  if (gender === "male") return "/iconUser.png";
  if (gender === "female") return "/iconUser.png";

  return "/iconUser.png";
};