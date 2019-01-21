const constants = {
  primaryColor: '#FD9D00',
  title: 'F1EX Admin',
  favicon: '/f1ex/favicon.png',
};

module.exports = {
  title: constants.title,
  navTheme: 'dark', // theme for nav menu
  primaryColor: constants.primaryColor, // primary color of ant design
  textColorSecondary: '#EEEEEE',
  backgroundColor: '#282828',
  textColor: '#FFFFFF',
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar
  inputColor: '#CCCCCC',
  favicon: constants.favicon,
};
