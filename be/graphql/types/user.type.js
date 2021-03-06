'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}, _, {DateScalar}) => { const {jwt} = require('../../../utils');
    const UserType = new GraphQLObjectType({
        name: 'user',
        description: '...',

        fields: () => ({
            name: {
                type: GraphQLString,
            },
            id: {
                type: GraphQLInt,
            },
            created_at: {
                type: DateScalar,
            },
            updated_at: {
                type: DateScalar,
            },
            token: {
                type: GraphQLString,
                resolve: ({id,name,updated_at}) => jwt.encode({data: {id: id, name: name, updated_at: updated_at}})
            }
        })
    });

    const authInputType = new GraphQLInputObjectType({
        name: 'authInput',
        fields: () => ({
            name: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
        })
    });

    return {
        query: UserType,
        authInput: authInputType,
    };
}
