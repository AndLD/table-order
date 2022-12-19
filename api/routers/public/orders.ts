import { Router } from 'express'
import { controller } from '../../controllers/controller'

export default Router().post('/', controller)
