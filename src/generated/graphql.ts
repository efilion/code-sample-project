import { GraphQLResolveInfo } from 'graphql';
import { Movie as MovieModel } from '.prisma/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = undefined | T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateMovieInput = {
  description: Scalars['String'];
  duration: Scalars['Int'];
  id?: InputMaybe<Scalars['ID']>;
  rating: Scalars['Int'];
  releaseYear: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateMoviePayload = {
  __typename?: 'CreateMoviePayload';
  errors?: Maybe<Array<CreateMovieProblems>>;
  movie?: Maybe<Movie>;
  status: Status;
};

export type CreateMovieProblems = IdentifierAlreadyExistsProblem;

export type DeleteMovieInput = {
  id: Scalars['ID'];
};

export type DeleteMoviePayload = {
  __typename?: 'DeleteMoviePayload';
  movie?: Maybe<Movie>;
};

export type DislikeMovieInput = {
  id: Scalars['ID'];
};

export type DislikeMoviePayload = {
  __typename?: 'DislikeMoviePayload';
  movie?: Maybe<Movie>;
};

export type IdentifierAlreadyExistsProblem = ProblemInterface & {
  __typename?: 'IdentifierAlreadyExistsProblem';
  message: Scalars['String'];
};

export type LikeMovieInput = {
  id: Scalars['ID'];
};

export type LikeMoviePayload = {
  __typename?: 'LikeMoviePayload';
  movie?: Maybe<Movie>;
};

export type Movie = {
  __typename?: 'Movie';
  description: Scalars['String'];
  dislikeCount: Scalars['Int'];
  duration: Scalars['Int'];
  id: Scalars['ID'];
  likeCount: Scalars['Int'];
  rating: Scalars['Int'];
  releaseYear: Scalars['Int'];
  title: Scalars['String'];
};

export type MovieFilter = {
  title?: InputMaybe<StringInput>;
};

export type MovieResultList = {
  __typename?: 'MovieResultList';
  items: Array<Movie>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMovie: CreateMoviePayload;
  deleteMovie: DeleteMoviePayload;
  dislikeMovie: DislikeMoviePayload;
  likeMovie: LikeMoviePayload;
  updateMovie: UpdateMoviePayload;
};


export type MutationCreateMovieArgs = {
  input: CreateMovieInput;
};


export type MutationDeleteMovieArgs = {
  input: DeleteMovieInput;
};


export type MutationDislikeMovieArgs = {
  input: DislikeMovieInput;
};


export type MutationLikeMovieArgs = {
  input: LikeMovieInput;
};


export type MutationUpdateMovieArgs = {
  input: UpdateMovieInput;
};

export type ProblemInterface = {
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findMovies: MovieResultList;
  getMovie?: Maybe<Movie>;
};


export type QueryFindMoviesArgs = {
  filter?: InputMaybe<MovieFilter>;
};


export type QueryGetMovieArgs = {
  id: Scalars['ID'];
};

export enum Status {
  Fail = 'FAIL',
  Success = 'SUCCESS'
}

export type StringInput = {
  contains?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UpdateMovieInput = {
  description?: InputMaybe<Scalars['String']>;
  dislikeCount?: InputMaybe<Scalars['Int']>;
  duration?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  likeCount?: InputMaybe<Scalars['Int']>;
  rating?: InputMaybe<Scalars['Int']>;
  releaseYear?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateMoviePayload = {
  __typename?: 'UpdateMoviePayload';
  movie?: Maybe<Movie>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateMovieInput: CreateMovieInput;
  CreateMoviePayload: ResolverTypeWrapper<Omit<CreateMoviePayload, 'errors' | 'movie'> & { errors?: Maybe<Array<ResolversTypes['CreateMovieProblems']>>, movie?: Maybe<ResolversTypes['Movie']> }>;
  CreateMovieProblems: ResolversTypes['IdentifierAlreadyExistsProblem'];
  DeleteMovieInput: DeleteMovieInput;
  DeleteMoviePayload: ResolverTypeWrapper<Omit<DeleteMoviePayload, 'movie'> & { movie?: Maybe<ResolversTypes['Movie']> }>;
  DislikeMovieInput: DislikeMovieInput;
  DislikeMoviePayload: ResolverTypeWrapper<Omit<DislikeMoviePayload, 'movie'> & { movie?: Maybe<ResolversTypes['Movie']> }>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IdentifierAlreadyExistsProblem: ResolverTypeWrapper<IdentifierAlreadyExistsProblem>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LikeMovieInput: LikeMovieInput;
  LikeMoviePayload: ResolverTypeWrapper<Omit<LikeMoviePayload, 'movie'> & { movie?: Maybe<ResolversTypes['Movie']> }>;
  Movie: ResolverTypeWrapper<MovieModel>;
  MovieFilter: MovieFilter;
  MovieResultList: ResolverTypeWrapper<Omit<MovieResultList, 'items'> & { items: Array<ResolversTypes['Movie']> }>;
  Mutation: ResolverTypeWrapper<{}>;
  ProblemInterface: ResolversTypes['IdentifierAlreadyExistsProblem'];
  Query: ResolverTypeWrapper<{}>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringInput: StringInput;
  UpdateMovieInput: UpdateMovieInput;
  UpdateMoviePayload: ResolverTypeWrapper<Omit<UpdateMoviePayload, 'movie'> & { movie?: Maybe<ResolversTypes['Movie']> }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateMovieInput: CreateMovieInput;
  CreateMoviePayload: Omit<CreateMoviePayload, 'errors' | 'movie'> & { errors?: Maybe<Array<ResolversParentTypes['CreateMovieProblems']>>, movie?: Maybe<ResolversParentTypes['Movie']> };
  CreateMovieProblems: ResolversParentTypes['IdentifierAlreadyExistsProblem'];
  DeleteMovieInput: DeleteMovieInput;
  DeleteMoviePayload: Omit<DeleteMoviePayload, 'movie'> & { movie?: Maybe<ResolversParentTypes['Movie']> };
  DislikeMovieInput: DislikeMovieInput;
  DislikeMoviePayload: Omit<DislikeMoviePayload, 'movie'> & { movie?: Maybe<ResolversParentTypes['Movie']> };
  ID: Scalars['ID'];
  IdentifierAlreadyExistsProblem: IdentifierAlreadyExistsProblem;
  Int: Scalars['Int'];
  LikeMovieInput: LikeMovieInput;
  LikeMoviePayload: Omit<LikeMoviePayload, 'movie'> & { movie?: Maybe<ResolversParentTypes['Movie']> };
  Movie: MovieModel;
  MovieFilter: MovieFilter;
  MovieResultList: Omit<MovieResultList, 'items'> & { items: Array<ResolversParentTypes['Movie']> };
  Mutation: {};
  ProblemInterface: ResolversParentTypes['IdentifierAlreadyExistsProblem'];
  Query: {};
  String: Scalars['String'];
  StringInput: StringInput;
  UpdateMovieInput: UpdateMovieInput;
  UpdateMoviePayload: Omit<UpdateMoviePayload, 'movie'> & { movie?: Maybe<ResolversParentTypes['Movie']> };
};

export type CreateMoviePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMoviePayload'] = ResolversParentTypes['CreateMoviePayload']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['CreateMovieProblems']>>, ParentType, ContextType>;
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMovieProblemsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMovieProblems'] = ResolversParentTypes['CreateMovieProblems']> = {
  __resolveType: TypeResolveFn<'IdentifierAlreadyExistsProblem', ParentType, ContextType>;
};

export type DeleteMoviePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMoviePayload'] = ResolversParentTypes['DeleteMoviePayload']> = {
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DislikeMoviePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DislikeMoviePayload'] = ResolversParentTypes['DislikeMoviePayload']> = {
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IdentifierAlreadyExistsProblemResolvers<ContextType = any, ParentType extends ResolversParentTypes['IdentifierAlreadyExistsProblem'] = ResolversParentTypes['IdentifierAlreadyExistsProblem']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeMoviePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeMoviePayload'] = ResolversParentTypes['LikeMoviePayload']> = {
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dislikeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  releaseYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieResultListResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieResultList'] = ResolversParentTypes['MovieResultList']> = {
  items?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMovie?: Resolver<ResolversTypes['CreateMoviePayload'], ParentType, ContextType, RequireFields<MutationCreateMovieArgs, 'input'>>;
  deleteMovie?: Resolver<ResolversTypes['DeleteMoviePayload'], ParentType, ContextType, RequireFields<MutationDeleteMovieArgs, 'input'>>;
  dislikeMovie?: Resolver<ResolversTypes['DislikeMoviePayload'], ParentType, ContextType, RequireFields<MutationDislikeMovieArgs, 'input'>>;
  likeMovie?: Resolver<ResolversTypes['LikeMoviePayload'], ParentType, ContextType, RequireFields<MutationLikeMovieArgs, 'input'>>;
  updateMovie?: Resolver<ResolversTypes['UpdateMoviePayload'], ParentType, ContextType, RequireFields<MutationUpdateMovieArgs, 'input'>>;
};

export type ProblemInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProblemInterface'] = ResolversParentTypes['ProblemInterface']> = {
  __resolveType: TypeResolveFn<'IdentifierAlreadyExistsProblem', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findMovies?: Resolver<ResolversTypes['MovieResultList'], ParentType, ContextType, Partial<QueryFindMoviesArgs>>;
  getMovie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryGetMovieArgs, 'id'>>;
};

export type UpdateMoviePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMoviePayload'] = ResolversParentTypes['UpdateMoviePayload']> = {
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CreateMoviePayload?: CreateMoviePayloadResolvers<ContextType>;
  CreateMovieProblems?: CreateMovieProblemsResolvers<ContextType>;
  DeleteMoviePayload?: DeleteMoviePayloadResolvers<ContextType>;
  DislikeMoviePayload?: DislikeMoviePayloadResolvers<ContextType>;
  IdentifierAlreadyExistsProblem?: IdentifierAlreadyExistsProblemResolvers<ContextType>;
  LikeMoviePayload?: LikeMoviePayloadResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  MovieResultList?: MovieResultListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ProblemInterface?: ProblemInterfaceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateMoviePayload?: UpdateMoviePayloadResolvers<ContextType>;
};

