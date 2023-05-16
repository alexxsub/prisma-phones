import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './schema'
import { Context, createContext } from './context'

const start = async () => {
  const server = new ApolloServer<Context>({ schema }),
        port = Number(process.env.PORT || 9002),
        host = process.env.PORT || 'localhost',
        { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: {host,port }
  })

    console.log(`🚀 Server ready at: ${url}`);

}

start()