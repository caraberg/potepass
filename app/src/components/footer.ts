export function renderFooter(): string {
  return `
    <footer>
      <div class="wrapper_footer">
        <div class="logo">
          <a href="" class="logo_link"><img src="/logo.png" alt="logo" /></a>
        </div>
        <nav>
          <ul>
            <li><a href="#" id="min_profil">Min profil</a></li>
            <li><a href="#" id="finn_hundepasser">Finn hundepasser</a></li>
            <li><a href="#" id="mine_bookinger">Mine Bookinger</a></li>
          </ul>
        </nav>

        <div class="icons">
          <img src="/youtube.svg" alt="you" />
          <img src="/linkedin.svg" alt="link" />
          <img src="/twitter.svg" alt="twit" />
          <img src="/instagram.svg" alt="inst" />
           <img src="/facebook.svg" alt="face" />
        </div>
      </div>

      <div class="divider_footer"></div>

      <div class="company">Gokstad @ 2026. All rights reserved.</div>
    </footer>
  `;
}