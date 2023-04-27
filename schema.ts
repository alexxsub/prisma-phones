import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  inputObjectType,
} from 'nexus'
import { Context } from './context'


const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('getPhones', {
            type: 'Phone',
            resolve: (_parent, _args, context: Context) => {
                return context.prisma.phone.findMany()
            }
        }),
    },
});

 
const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
  
        t.field('deletePhone', {
            type: 'Phone',
            args: {
                id: nonNull(intArg()),
            },
            resolve: (_, args, context: Context) => {
                return context.prisma.phone.delete({
                    where: { id: args.id },
                })
            },
        })
    },
});

const Phone = objectType({
    name: 'Phone',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('number')
        t.string('name')
    },
});



const Input = inputObjectType({
    name: 'Input',
    definition(t) {
        t.int('id')
        t.string('number')
        t.string('name')
    },
});


export const schema = makeSchema({
    types: [
        Query,
        Mutation,
        Phone,
        Input,
    ],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
});