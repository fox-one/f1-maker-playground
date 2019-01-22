const f1ex = 'f1ex.svg';

const constants = {
  // dev
  hosts: 'https://f1ex.fox.one/api',
  passportHost: 'https://dev-cloud.fox.one',
  storage: {
    authority: 'f1ex-admin-authority',
    session: 'f1ex-admin-token',
  },
  appName: 'F1EX Admin',
  logo: f1ex,
  primaryColor: '#FD9D00',
  shortName: 'F1EX',
};

if (APP_TYPE === 'f1ex') {
  constants.hosts = 'https://api.f1ex.io/api';
}

module.exports = constants;
