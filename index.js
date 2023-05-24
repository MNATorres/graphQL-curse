import { ApolloServer, gql } from "apollo-server";

const persons = [
    {
        name:"Matias Torres",
        phone:"1126328057",
        street:"Calle frontend",
        city:"CABA",
        id:"111111"
    },
    {
        name:"Nombre Dos",
        phone:"38884440430",
        street:"Calle Backend",
        city:"Cordoba",
        id:"222222"
    },
    {
        name:"Nombre Tres",
        phone:"3888555055",
        street:"Calle micro",
        city:"Canada",
        id:"333333"
    },
]

const typeDefinitions = gql`
type Address {
    street: String!
    city: String!
}

type Person {
    name: String!
    phone: String
    street: String!
    address: Address!
    id: ID!
}

type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
}
`
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
    
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

//iniciamos el servidor
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})
