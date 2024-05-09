import crypto from "crypto";

export const gravatarUrl = (userid: string) => {
  const hash = crypto.createHash('md5').update(userid.trim()).digest('hex');
  return `https://www.gravatar.com/avatar/${hash}?d=retro`;
};
