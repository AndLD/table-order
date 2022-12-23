import { Collection } from './types'

export const startTimestamp = Date.now()

export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

export const environment = process.env.NODE_ENV || 'development'

export const rootUser = {
    username: 'root',
    password: process.env.ROOT_USER_PASSWORD
}

export const errors = {
    BAD_HTTP_METHOD: { msg: 'Unexpected http request method', code: 405 },
    BAD_FILTERS: { msg: 'Invalid filters in query params', code: 400 },
    USER_HAS_NO_RIGHTS: {
        msg: 'User does not have enough permissions to use the document',
        code: 403
    },
    DOC_NOT_FOUND: { msg: 'The document does not exist', code: 404 },
    JWT_INVALID: { msg: 'JWT invalid', code: 401 },
    CREDENTIALS_INVALID: { msg: 'Електронна пошта або пароль невірні', code: 401 },
    EMAIL_NOT_MATCHES_PATTERN: { msg: 'Email невірний', code: 400 },
    NAME_NOT_MATCHES_PATTERN: { msg: "Ім'я невірне", code: 400 },
    PASSWORD_NOT_MATCHES_PATTERN: { msg: 'Пароль невірний', code: 400 },
    EMAIL_ALREADY_EXISTS: { msg: 'Email вже існує', code: 400 },
    AUTHORIZATION_HEADER_EMPTY: { msg: 'Authorization header is empty', code: 401 },
    ENTITY_ALREADY_EXISTS: { msg: 'Entity already exists', code: 400 },
    ENTITY_USED: { msg: "Об'єкт використовується", code: 400 },
    FORBIDDEN: { msg: 'Не дозволяється', code: 403 },
    BAD_REQUEST: { msg: 'Bad request', code: 400 },
    INTERNAL_SERVER_ERROR: { msg: 'Internal server error', code: 500 },
    WRONG_ACTION: { msg: 'Неправильна дія', code: 403 },
    NOTIFICATIONS_SERVICE_DISABLED: { msg: 'Послуга сповіщень відключена', code: 503 },
    ARRAY_CONTAINS_NOT_UNIQUE: { msg: 'Array contains not unique', code: 400 }
}

export const entities = {
    TABLES: 'tables' as Collection,
    ORDERS: 'orders' as Collection
}

export const validationConstants = {
    regexp: {
        notEmptyString: /\S+/,
        uuidOrNull: /null|[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/,
        uuid: /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/,
        url: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    }
}
