import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './schema'
import { IContext, createContext } from './context'

const start = async () => {
  const server = new ApolloServer<IContext>({ schema }),
        port = Number(process.env.PORT || 9002),
        host = process.env.HOST || 'localhost',
        { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: {host,port }
  })

    console.log(`🚀 Server ready at: ${url}`);

}

start()
//sudo netstat -ntlp