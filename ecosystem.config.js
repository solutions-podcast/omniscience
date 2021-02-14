module.exports = {
  apps: [
    {
      name: 'omniscience',
      script: 'npm start',
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
  deploy: {
    production: {
      user: process.env.SSH_USER,
      host: process.env.SSH_IP_ADDRESS,
      key: process.env.SSH_KEY,
      ref: 'origin/main',
      repo: 'https://github.com/FOSSforlife/omniscience',
      path: '/~/node/omniscience',
      'post-deploy':
        'cp ../.env.omniscience .env && npm i && && pm2 reload ecosystem.config.js --env production && pm2 save',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
