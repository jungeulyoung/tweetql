import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id:"1",
    text:"first one",
    userId: "2"

  },
  {
    id:"2",
    text:"second one",
    userId:"1",
  }
]

let users = [
  {
    id:"1",
    firstName:"nico",
    lastName:"las",
  },
  {
    id:"2",
    firstName:"elon",
    lastName:"mask",
  }
]

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!  
  }

"""
Tweet object represents a resource for a Tweet
"""

  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!) : Tweet
  }
  type Mutation {
    postTweet(text:String!, userId: ID!) : Tweet
    deleteTweets(id:ID!) : Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets(){
      return tweets;
    },
    
    tweet(root, {id}){
      
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers(){
      console.log(" all Users called");
      return users;
    }
  },
  Mutation: {
    postTweet(_, {text, userId}) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweets(_, {id}){
      const tweet = tweets.find((tweet) => tweet.id === id);
      if(!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id)
      return true;
    }
  },
  User: {
    firstName({firstName}){
      return firstName
    },
    
    fullName({firstName, lastName}){
      return `${firstName} ${lastName}`;
    }
  },
  Tweet: {
    author({userId}){
      return users.find(user=> user.id === user.id);
    },
  }

}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`);
});



