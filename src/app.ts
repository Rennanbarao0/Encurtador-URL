import { MongoConnection } from './database/MongoConnection';
import { URLController } from './controller/URLController';
import express, {Request, Response} from 'express';

const api = express()
api.use(express.json())

const database = new MongoConnection()
database.connect()

const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

api.listen(5000, () => {console.log('Server run in port 5000')}) 