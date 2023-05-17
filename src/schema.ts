import {
    stringArg,
    makeSchema,
    nonNull,
    objectType,
    inputObjectType,
} from 'nexus'

//импорт резолвов
import {
    createPhoneResolver,
    readPhonesResolver,
    updatePhoneResolver,
    deletePhoneResolver
} from "./resolvers";


//тип основной сущности
const Phone = objectType({
    name: 'Phone',
    description:'Записи телефонного справочника',
    definition(t) {
        t.nonNull.string('id')
        t.nonNull.string('number')
        t.nonNull.string('name')
    },
});

//Тип ввода
const inputPhone = inputObjectType({
    name: 'inputPhone',
    description:'Тип ввода',
    definition(t) {
        t.nonNull.field('id',{type:'String',description:'id записи'})
        t.nonNull.string('number')
        t.nonNull.string('name')
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
            type: nonNull('Phone'),
            args: {
                id: nonNull(stringArg())
            },
            resolve:deletePhoneResolver            
        }),
        
        t.field('createPhone', {
            type: 'Phone',
            args: {
                input: nonNull(inputPhone)
            },
            resolve:createPhoneResolver            
        }),
        t.field('updatePhone', {
            type: 'Phone',
            args: {
                input: nonNull(inputPhone)
            },
            resolve:updatePhoneResolver            
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