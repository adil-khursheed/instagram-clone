const conf = {
  nodeEnv: String(import.meta.env.VITE_NODE_ENV),
  serverUrl: String(import.meta.env.VITE_SERVER_URL),
  authBaseUrl: String(import.meta.env.VITE_AUTH_BASE_URL),
};

export default conf;
