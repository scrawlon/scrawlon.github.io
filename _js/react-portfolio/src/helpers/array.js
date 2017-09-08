function sortAlpha(a,b) {
  let aLower = a && a.toLowerCase();
  let bLower = b && b.toLowerCase();
  if (aLower < bLower) return -1;
  else if (aLower > bLower) return 1;
  return 0;
}

module.exports = {
  sortAlpha: sortAlpha
};
