const { ApolloServer, gql } = require('apollo-server');

// Toda request é POST
// Toda request bate no mesmo endpoint

// Query -> Obter informacoes ( get )
// Mutation -> Manipular dados ( post, put, patch, delete )
// Scalar types -> String, Int, Float, Boolean, ID

const users = [
    { _id: 1, name: "Emerson Souza", active: true, email: "mensinho@gmail.com" },
    { _id: 2, name: "Tulion Calil", active: true, email: "tulin@gmail.com" },
    { _id: 3, name: "Marcos Borges", active: false, email: "marquin@gmail.com" },
    { _id: 4, name: "Wilson Junior", active: true, email: "wilson@gmail.com" }
]

const typeDefs = gql`
    type User {
        _id: ID!
        active: Boolean!
        name: String!
        email: String!
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
    }

    type Query {
        hello: String
        users: [User!]!
        getUserByEmail(email: String!): User!
    }

    type Mutation {
        createUser(name: String!, email: String!): User!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World',
        users: () => users,
        getUserByEmail: (_, args) => {
            return users.find(user => user.email === args.email);
        }
    },

    Mutation: {
        createUser(_, args) {
            const user = { _id: 5, name: args.name, email: args.email, active: true };

            users.push(user);
            return user;
        }
    }
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`🔥 Server listen at ${url}`));
