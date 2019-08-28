import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './nodeInterface';
import { UserDb } from '../types';

// TODO auto generated types
export const UserType = new GraphQLObjectType<UserDb>({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User', user => user._id),
    _id: {
      type: GraphQLNonNull(GraphQLString),
      resolve: user => user._id,
      description: "The user's mongodb id",
    },
    username: {
      type: GraphQLNonNull(GraphQLString),
      resolve: user => user.username,
      description: "The user's public description",
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name,
      description: "The user's public name",
    },
    description: {
      type: GraphQLString,
      resolve: user => user.description,
      description: "The user's public description",
    },
    imageUrl: {
      type: GraphQLNonNull(GraphQLString),
      args: {
        size: {
          type: GraphQLInt,
        },
      },
      resolve: (user, args) => {
        let { size } = args;
        // Size default to 64
        if (!size) {
          size = 64;
        }
        const { username } = user;

        const imageUrl = user.imageUrl ? encodeURI(user.imageUrl) : null;

        // Resolve to a default ui avatar if not set by user
        if (!imageUrl) {
          return `https://ui-avatars.com/api/?color=ffffff&background=000000&size=${size}&name=${username}`;
        }
        // Profile images are displayed as squares so we set the same width and height
        return `https://images.weserv.nl/?url=${imageUrl}&h=${size}&w=${size}&t=fit`;
      },
      description: 'A url pointing to the user image',
    },
  }),
  interfaces: () => [nodeInterface],
});
