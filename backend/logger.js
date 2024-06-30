import {createLogger, format, transports} from 'winston';

const {combine, timestamp, printf} = format;
import {createRequire} from 'module';

const require = createRequire(import.meta.url);

export async function createLoggerWithChalk() {
    const chalk = await import('chalk');

    const emojiFormat = printf((info) => {
        let emoji;
        switch (info.level) {
            case 'info':
                emoji = '✅';
                break;
            case 'warn':
                emoji = '⚠️';
                break;
            case 'error':
                emoji = '❌';
                break;
            case 'debug':
                emoji = '🐛';
                break;
            default:
                emoji = '🔍';
        }

        let colorizer;
        switch (info.level) {
            case 'info':
                colorizer = chalk.default.hex('#41b6de'); // light blue
                break;
            case 'warn':
                colorizer = chalk.default.hex('#FFD700'); // gold
                break;
            case 'error':
                colorizer = chalk.default.hex('#FF6347'); // light coral
                break;
            case 'debug':
                colorizer = chalk.default.hex('#98FB98'); // pale green
                break;
            default:
                colorizer = chalk.default.hex('#D3D3D3'); // light gray
        }

        return colorizer(`${info.timestamp} [${info.level.toUpperCase()}] ${emoji}: ${info.message}`);
    });

    const logger = createLogger({
        level: 'info',
        format: combine(timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), emojiFormat),
        transports: [new transports.Console(), new transports.File({
            filename: 'app.log', format: combine(timestamp(), emojiFormat),
        }),],
    });

    return logger;
}

export default createLoggerWithChalk;
