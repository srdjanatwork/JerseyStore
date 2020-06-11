export const getInitialsHelper = (string) => {
  let initials = string && string.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
}
