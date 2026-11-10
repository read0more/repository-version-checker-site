/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUserRepository
// ====================================================

export interface CreateUserRepository_createUserRepository_repository_versions {
  __typename: "RepositoryVersion";
  id: string;
  prerelease: boolean;
  url: string;
  publishedAt: any;
}

export interface CreateUserRepository_createUserRepository_repository {
  __typename: "Repository";
  id: string;
  name: string;
  updatedAt: any;
  versions: (CreateUserRepository_createUserRepository_repository_versions | null)[];
}

export interface CreateUserRepository_createUserRepository {
  __typename: "UserRepository";
  id: string;
  repositoryUrl: string;
  repository: CreateUserRepository_createUserRepository_repository;
}

export interface CreateUserRepository {
  createUserRepository: CreateUserRepository_createUserRepository;
}

export interface CreateUserRepositoryVariables {
  createUserRepositoryInput: CreateUserRepositoryInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveUserRepository
// ====================================================

export interface RemoveUserRepository_removeUserRepository {
  __typename: "UserRepository";
  repositoryUrl: string;
}

export interface RemoveUserRepository {
  removeUserRepository: RemoveUserRepository_removeUserRepository;
}

export interface RemoveUserRepositoryVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_repositories_repository_versions {
  __typename: "RepositoryVersion";
  id: string;
  prerelease: boolean;
  url: string;
  publishedAt: any;
}

export interface Me_me_repositories_repository {
  __typename: "Repository";
  id: string;
  name: string;
  updatedAt: any;
  versions: (Me_me_repositories_repository_versions | null)[];
}

export interface Me_me_repositories {
  __typename: "UserRepository";
  id: string;
  repositoryUrl: string;
  repository: Me_me_repositories_repository;
}

export interface Me_me {
  __typename: "User";
  id: string;
  githubId: string;
  username: string;
  profileImage: string | null;
  repositories: (Me_me_repositories | null)[];
}

export interface Me {
  me: Me_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: userRepository
// ====================================================

export interface userRepository_repository_versions {
  __typename: "RepositoryVersion";
  id: string;
  prerelease: boolean;
  url: string;
  publishedAt: any;
}

export interface userRepository_repository {
  __typename: "Repository";
  id: string;
  name: string;
  updatedAt: any;
  versions: (userRepository_repository_versions | null)[];
}

export interface userRepository {
  __typename: "UserRepository";
  id: string;
  repositoryUrl: string;
  repository: userRepository_repository;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateUserRepositoryInput {
  repositoryUrl: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
