export function renderFooter(): string {
  return `
    <footer>
      <div class="wrapper_footer">
        <div class="logo">
          <a href="" class="footer_logo_link"><img src="/logo.png" alt="logo" /></a>
        </div>

        <nav>
          <ul>
            <li><a href="#" id="min_profil">Min profil</a></li>
            <li><a href="#" id="finn_hundepasser">Finn hundepasser</a></li>
            <li><a href="#" id="mine_bookinger">Mine Bookinger</a></li>
          </ul>
        </nav>

        <div class="icons">
          <a href="https://www.youtube.com/"><img src="/youtube.svg" alt="you" /></a>
          <a href="https://www.linkedin.com/"><img src="/linkedin.svg" alt="link" /></a>
          <a href="https://x.com/"><img src="/twitter.svg" alt="twit" /></a>
          <a href="https://www.instagram.com/"><img src="/instagram.svg" alt="inst" /></a>
          <a href="https://www.facebook.com/"><img src="/facebook.svg" alt="face" /></a>
        </div>
      </div>

      <div class="divider_footer"></div>

      <div class="company"><a href="https://gokstadakademiet.no/">Gokstad @ 2026. All rights reserved.</div>
    </a></footer>
  `;
}