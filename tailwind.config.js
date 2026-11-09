export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08090B',      // main background
        panel: '#101216',    // secondary background
        card: '#15181D',     // card background
        ti: '#C8CDD4',       // titanium silver
        tihi: '#E8EAED',     // metallic highlight
        mute: '#858B95',     // muted silver
        amber: { DEFAULT: '#FF9D00', hi: '#FFB52E', deep: '#C87500' }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
