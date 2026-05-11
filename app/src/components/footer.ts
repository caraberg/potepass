export function renderFooter(): string {
  return `
    <footer>
      <div class="wrapper_footer">
        <div class="logo">
          <a href="/forside" id="home" class="footer_logo_link">
            <img src="/logo.png" alt="logo" />
          </a>
        </div>
        <nav>
          <ul>
            <li><a href="/profile" id="footer_profile">Min profil</a></li>
            <li><a href="/petsitters" id="footer_petsitters">Finn hundepasser</a></li>
            <li><a href="/bookings" id="footer_bookings">Mine bookinger</a></li>
          </ul>
        </nav>

        <div class="icons">
          <a href="#"><img src="/youtube.svg" alt="YouTube" /></a>
          <a href="#"><img src="/linkedin.svg" alt="LinkedIn" /></a>
          <a href="#"><img src="/twitter.svg" alt="Twitter" /></a>
          <a href="#"><img src="/instagram.svg" alt="Instagram" /></a>
          <a href="#"><img src="/facebook.svg" alt="Facebook" /></a>
        </div>
      </div>

      <div class="divider_footer"></div>

      <div class="company">
        <a href="#">Gokstad @ 2026. All rights reserved.</a>
      </div>
    </footer>
  `;
}