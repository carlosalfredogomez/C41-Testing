import winston from 'winston'

const levelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

const logger = winston.createLogger({
    levels: levelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: levelOptions.colors }),
                winston.format.simple()
            )
        }),

        new winston.transports.File({
            filename: './src/utils/alerts.log',
            level: 'warning',
            format: winston.format.simple()
        })

    ]
})

const dateOptions = {
    year: '2-digit',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit'
}

const lang = 'es-ES'
const date = new Date()
const formattedDate = new Intl.DateTimeFormat(lang, dateOptions).format(date);

export const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`)
    req.logger.warning(`${req.method} en ${req.url} - ${new Date().toLocaleDateString}`)
    req.logger.fatal(`${req.method} en ${req.url} - ${new Date().toLocaleString}`)
    req.logger.error(`${req.method} en ${req.url} - ${formattedDate}`)
    next()
}