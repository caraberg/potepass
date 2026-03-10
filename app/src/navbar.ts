export function createNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `
    <div class="logo">
      <a href="index.html"><img src="images/logo.png" width="167" height="75"/></a>
    </div>
    <div class="nav-buttons">
      <a class="dogsitter-button" href="hundepassere.html">Finn hundepasser</a>
      <a class="login-button" href="logg-inn.html">Logg inn</a>
      <a class="register-button" href="lag-en-konto.html">Registrer deg</a>
    </div>
  `;
  document.body.prepend(nav);
}
