(function () {
  if (!location.hash || location.pathname.startsWith('/admin')) return;
  var hash = location.hash.slice(1);
  if (/^(recovery_token|invite_token|confirmation_token|access_token)=/.test(hash)) {
    location.replace('/admin/' + location.hash);
  }
})();
