module.exports = function() {
  return localStorage.getItem('token') || "";
};
