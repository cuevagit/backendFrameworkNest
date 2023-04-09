import { MongoClient } from 'mongodb';
import {MONGOCONECTION} from '../../config/config.js'
import {MONGODB} from '../../config/config.js'


const CNX_STR = MONGOCONECTION
const DB_NAME = MONGODB

const mongoClient = new MongoClient(CNX_STR);
mongoClient.connect();

export const mongoDatabase = mongoClient.db(DB_NAME)

