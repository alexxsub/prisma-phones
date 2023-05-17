import { FieldResolver } from "nexus";
import { IContext} from './context'
//CRUD операции
//Create
export const createPhoneResolver: FieldResolver<"Mutation", "createPhone"> = async (_, { input }, context: IContext) => {
    const {number,name} =input
    const res = context.prisma.phone.create(
        {
            data: { number,name}
        }
    )
    return res
}; 
//Read
export const readPhonesResolver: FieldResolver<"Query", "readPhones"> = async (_, __, context: IContext) => {
 
    return await context.prisma.phone.findMany()
};
//Update
export const updatePhoneResolver: FieldResolver<"Mutation", "updatePhone"> = async (_, { input }, context: IContext) => {
    const {id,number,name} = input
    const res = context.prisma.phone.update(
        {
            where: {id},
            data: {number,name}
        }
    )
    return res
}; 

//Delete
export const deletePhoneResolver: FieldResolver<"Mutation", "deletePhone"> = async (_, { id }, context: IContext) => {
 
    const res = context.prisma.phone.delete({
        where: { id },
    })
    return res
};            

