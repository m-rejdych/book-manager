import { Resolver, Mutation, Query } from 'type-graphql';

@Resolver()
class TestResolver {
  @Mutation()
  testMutation(): string {
    return 'Hello mutation';
  }

  @Query()
  testQuery(): string {
    return 'Hello query';
  }
}

export default TestResolver;
