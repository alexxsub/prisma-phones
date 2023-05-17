import {
    intArg,
  stringArg,
  makeSchema,
  nonNull,
  objectType,
  inputObjectType,
} from 'nexus'
//интерфейс контекста
import { IContext } from './context'
//описание резолвов
import {readPhonesResolver,deletePhoneResolver,createPhoneResolver,updatePhoneResolver} from "./resolvers";


//тип основной сущности
const Phone = objectType({
    name: 'Phone',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('number')
        t.string('name')
    },
});


//Тип ввода
const inputPhone = inputObjectType({
    name: 'inputPhone',
    definition(t) {
        t.int('id')
        t.string('number')
        t.string('name')
    },
});

//запрос на выборку
const Query = objectType({
    name: 'Query',
    definition(t) {
        t.list.field('readPhones', {
            type: 'Phone',
            resolve:readPhonesResolver
        })
    }
});

//запрос на удаление
const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.field('deletePhone', {
            type: 'Phone',
            args: {
                id: nonNull(stringArg())
            },
            resolve:deletePhoneResolver            
        }),
        
        t.field('createPhone', {
            type: 'Phone',
            args: {
                inputPhone: nonNull(stringArg())
            },
            resolve:createPhoneResolver            
        })    
    }
});





export const schema = makeSchema({
    types: [
        Query,
        Mutation,
        Phone,
        inputPhone,
    ],
    outputs: {
        schema: __dirname + '/generated/schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'IContext',
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