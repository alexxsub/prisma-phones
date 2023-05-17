import {
  stringArg,
  makeSchema,
  nonNull,
  objectType,
  inputObjectType,
} from 'nexus'
import { Context } from './context'
//тип основной сущности
const Phone = objectType({
    name: 'Phone',
    definition(t) {
        t.nonNull.string('id')
        t.nonNull.string('number')
        t.string('name')
    },
});


//Тип ввода
const inputPhone = inputObjectType({
    name: 'inputPhone',
    definition(t) {
        t.string('id')
        t.string('number')
        t.string('name')
    },
});


const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('readPhones', {
            type: 'Phone',
            resolve (_, __, context: Context) {
                return context.prisma.phone.findMany()
            }
        })
    }
});

 
const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
  
        t.field('deletePhone', {
            type: 'Phone',
            args: {
                id: nonNull(stringArg()),
            },
            resolve(_, args, context: Context) {
                return context.prisma.phone.delete({
                    where: { id: Number(args.id) },
                })
            },
        })
    },
});




export const schema = makeSchema({
    types: [
        Query,
        Mutation,
        Phone,
        inputPhone,
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