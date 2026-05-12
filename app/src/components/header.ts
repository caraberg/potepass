export function renderHeader(): string {
  return `
  <header>
    <div class="wrapper_header">
      <div class="logo">
        <a href="/forside" class="logo_link"><img src="/logo.png" alt="logo" /></a>
      </div>

      <nav class="nav">
        <button class="burger" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul>
          <li><a href="/profile" id="profile">Min profil</a></li>
          <li><a href="/petsitters" id="petsitters">Finn hundepasser</a></li>
          <li><a href="/bookings" id="bookings">Mine Bookinger</a></li>
        </ul>
      </nav>
    </div>
  </header>
  `;
}