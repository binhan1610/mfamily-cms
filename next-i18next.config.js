const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    reloadOnPrerender: process.env.NODE_ENV === 'development',
    localePath: path.resolve('./public/locales'),
    fallbackLng: ['en'],
    localeDetection: false,
  },
};

// const path = require('path');

// module.exports = {
//   i18n: {
//     defaultLocale: 'vi',
//     locales: ['vi', 'en'],
//     // localeDetection: ,
//   },
//   reloadOnPrerender: process.env.NODE_ENV === 'development',
//   localePath: path.resolve('./public/locales'),
//   fallbackLng: ['vi'],
// };
