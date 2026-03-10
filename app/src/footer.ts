export function createFooter() {

  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="logo-footer">
      <a href="index.html">
        <img src="/images/logo.png" width="167" height="75"/>
      </a>
    </div>

    <div class="footer-buttons">
      <a href="bruker-profil.html">Min profil</a>
      <a href="bookinger.html">Mine bookinger</a>
      <a href="hundepassere.html">Finn hundepasser</a>
    </div>

    <div class="icons-footer">
      <a href="https://www.youtube.com/"><img src="/images/youtube.png" width="24" height="24"/></a>
      <a href="https://www.facebook.com/"><img src="/images/facebook.png" width="24" height="24"/></a>
      <a href="https://x.com/"><img src="/images/twitter.png" width="24" height="24"/></a>
      <a href="https://www.instagram.com/"><img src="/images/instagram.png" width="24" height="24"/></a>
      <a href="https://www.linkedin.com/"><img src="/images/linkedin.png" width="24" height="24"/></a>
    </div>

    <div class="rights-footer">
      <a href="https://gokstadakademiet.no/">Gokstad © 2026. All rights reserved.</a>
    </div>
  `;

  document.body.appendChild(footer);

}