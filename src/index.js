import http from 'http'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { resolvers } from './graphql/Resolvers.js'
import { typeDefs } from './graphql/TypeDefs.js'

dotenv.config()
const port = process.env.PORT || 8000
const app = express()
app.use(cors(), bodyParser.json())

const httpServer = http.createServer(app)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true
})
await server.start()

app.use('/graphql', expressMiddleware(server))

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI).then(async () => {
  await new Promise((resolve) => httpServer.listen({ port }, resolve))
  if (process.env.NODE_ENV === 'development') {
    console.log(`\nserver listening at http://localhost:${port}/grapqhl`)
  }
})
