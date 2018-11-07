import Typography from 'typography'

const typography = new Typography({
  title: 'Typography',
  baseFontSize: '18px',
  baseLineHeight: 1.3,
  scaleRatio: 1.5,
  headerFontFamily: ['Lato', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'serif'],
  headerGray: 20,
  bodyGray: 20,
  blockMarginBottom: 1,
  includeNormalize: true,
  // HACK: This is necessary until typography.js natively supports breakpoints
  //       and CSS locks. Alternatively, you could use the same CSS as below in
  //       a stylesheet in conjunction with !important declarations.
  //       https://github.com/KyleAMathews/typography.js/issues/75
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    body: {
      height: '100%',
    },
    html: {
      fontSize: '16px',
      textRendering: 'optimizeLegibility',
    },
    '@media screen and (min-width: 320px) {html{font-size: calc(16px + (22 - 16) * ((100vw - 320px) / (1000 - 320)));}}': {},
    '@media screen and (min-width: 1000px) {html{font-size: 22px}}': {},
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
