import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        bookinger: 'bookinger.html',
        hundepassere: 'hundepassere.html',
        register: 'lag-en-konto.html',
        login: 'logg-inn.html'
      }
    }
  }
})
