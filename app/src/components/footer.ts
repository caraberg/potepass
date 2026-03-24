export function renderFooter(): string {
  return `
    <footer>
      <div class="wrapper_footer">
        <div class="logo">
          <a href="#" id="home" class="footer_logo_link">
            <img src="/logo.png" alt="logo" />
          </a>
        </div>

        <nav>
          <ul>
            <li><a href="#" id="profile">Min profil</a></li>
            <li><a href="#" id="petsitters">Finn hundepasser</a></li>
            <li><a href="#" id="bookings">Mine bookinger</a></li>
          </ul>
        </nav>

        <div class="icons">
          <a href="https://www.youtube.com/"><img src="/youtube.svg" alt="YouTube" /></a>
          <a href="https://www.linkedin.com/"><img src="/linkedin.svg" alt="LinkedIn" /></a>
          <a href="https://x.com/"><img src="/twitter.svg" alt="Twitter" /></a>
          <a href="https://www.instagram.com/"><img src="/instagram.svg" alt="Instagram" /></a>
          <a href="https://www.facebook.com/"><img src="/facebook.svg" alt="Facebook" /></a>
        </div>
      </div>

      <div class="divider_footer"></div>

      <div class="company">
        <a href="https://gokstadakademiet.no/">Gokstad @ 2026. All rights reserved.</a>
      </div>
    </footer>
  `;
}