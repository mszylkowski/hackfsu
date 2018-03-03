// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDl4OWi3LUXx2SbKRYR3oKXg7e5u7MNvWI',
    authDomain: 'crowdnotes-6db7e.firebaseapp.com',
    databaseURL: 'https://crowdnotes-6db7e.firebaseio.com',
    projectId: 'crowdnotes-6db7e',
    storageBucket: 'crowdnotes-6db7e.appspot.com',
    messagingSenderId: '477111451099'
  }
};
