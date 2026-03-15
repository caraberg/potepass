export function renderHeader(): string {
  return `
  <header>
    <div class="wrapper_header">
      <div class="logo">
        <a href="#" class="logo_link"><img src="/logo.png" alt="logo" /></a>
      </div>

      <nav>
        <ul>
          <li><a href="#" id="profile">Min profil</a></li>
          <li><a href="#" id="petsitters">Finn hundepasser</a></li>
          <li><a href="#" id="bookings">Mine Bookinger</a></li>
          <li><a class="logg_ut" href="#" id="logout">Logg ut</a></li>
        </ul>
      </nav>
    </div>
  </header>
  `;
}