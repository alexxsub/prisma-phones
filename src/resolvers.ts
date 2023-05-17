import { FieldResolver } from "nexus";
import { IContext} from './context'
//CRUD операции
//Create
export const createPhoneResolver: FieldResolver<"Mutation", "createPhone"> = async (_, { inputPhone }, context: IContext) => {
 
    const res = context.prisma.phone.create(
        {
            data: {
                number: inputPhone.number,
                name: inputPhone.name
        },
  }
    )
    return res
}; 
//Read
export const readPhonesResolver: FieldResolver<"Query", "readPhones"> = async (_, __, context: IContext) => {
 
    const res = await context.prisma.phone.findMany()
    return res
};
//Update
export const updatePhoneResolver: FieldResolver<"Mutation", "updatePhone"> = async (_, { inputPhone }, context: IContext) => {
 
    const res = context.prisma.phone.update(
        {
             where: {
                id: inputPhone.id
        },
            data: {
                number: inputPhone.number,
                name: inputPhone.name
        },
  }
    )
    return res
}; 

//Delete
export const deletePhoneResolver: FieldResolver<"Mutation", "deletePhone"> = async (_, { id }, context: IContext) => {
 
    const res = context.prisma.phone.delete({
        where: { id: Number(id) },
    })
    return res
};            

