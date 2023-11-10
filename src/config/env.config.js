import 'dotenv/config'

export default {
    server: {
        PORT: parseInt(process.env.PORT),
        STAGE: process.env.STAGE || 'production',
        LOGGER_LEVEL: process.env.LOGGER_LEVEL
    },
    mongo: {
        URL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hiwmxr5.mongodb.net/ecommerce?retryWrites=true&w=majority`
    },
    sessions: {
        SECRET: process.env.SESSION_SECRET,
        JWT_KEY: process.env.JASONWEBTOKEN_KEY
    },
    github: {
        CLIENT_ID: process.env.GIT_HUB_STRATEGY_CLIENT_ID,
        CLIENT_SECRET: process.env.GIT_HUB_STRATEGY_CLIENT_SECRET,
        CALLBACK_URL: process.env.GIT_HUB_STRATEGY_CALLBACK_URL
    },
    admin: {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
    },
    mailing: {
        SERVICE: process.env.MAILING_SERVICE,
        USER: process.env.MAILING_USER,
        PASSWORD: process.env.MAILING_PASSWORD
    },
    twilio: {
        SID: process.env.TWILIO_ACCOUNT_SID,
        AUTH: process.env.TWILIO_AUTH_TOKEN,
        NUMBER: process.env.TWILIO_NUMBER
    }
}
