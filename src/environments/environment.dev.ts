export const environment = {
  production: false,
  api: localStorage.getItem('server') || 'http://localhost:35604/api/v1'
};
export const TokenName = 'MeuEstacionamento_authorizationData';
export const Logged_user_id = 'MeuEstacionamento_logged_user_id';
