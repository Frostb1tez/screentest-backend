export default () =>
  ({
    port: parseInt(process.env.PORT, 10) || 8080,
    database: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      name: process.env.POSTGRES_DATABASE,
    },
    nodemailer: {
      host: process.env.SMTP_HOST || 'localhost',
      port: parseInt(process.env.SMTP_PORT, 10) || 1025,
      user: process.env.SMTP_USER || 'smtp-local-user@no-reply.com',
      pass: process.env.SMTP_PASS || 'smtp-password',
    },
  } as const)
