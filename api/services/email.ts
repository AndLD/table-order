import nodemailer from 'nodemailer'
import { getLogger } from '../utils/logger'

const logger = getLogger('services/email')

let transporter: nodemailer.Transporter<any> | undefined

const EMAIL_SMTP_USER = process.env.EMAIL_SMTP_USER
const EMAIL_SMTP_PASS = process.env.EMAIL_SMTP_PASS

async function init() {
    if (!EMAIL_SMTP_USER || !EMAIL_SMTP_PASS) {
        logger.error('Email Service initialization failed: EMAIL_SMTP_USER or EMAIL_SMTP_PASS not found')
        return
    }

    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_SMTP_USER,
            pass: EMAIL_SMTP_PASS
        }
    })

    logger.info('Email Services successfully initialized.')
}

async function sendOrderConfirmation(email: string, orderId: string) {
    if (!transporter) {
        return
    }

    const html = `Ваше замовлення ${orderId} підтверджено. Дякуємо, що обираєте нас!`

    await _sendMail({ email, subject: 'Підтвердження Замовлення', html })
}

async function _sendMail({ email, subject, html }: { email: string; subject: string; html: string }) {
    if (!transporter) {
        return
    }

    await transporter.sendMail({
        from: 'Law Quest <lawquestplatform@gmail.com>',
        to: email,
        subject,
        html
    })
}

export const emailService = {
    init,
    sendOrderConfirmation
}
