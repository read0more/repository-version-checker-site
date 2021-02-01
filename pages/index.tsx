import { useMutation, useQuery } from "@apollo/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { ME } from "../apollo/query";
import { CREATE_USER_REPOSITORY } from "../apollo/mutation";
import LoginButton from "../components/LoginButton/LoginButton";
import Dashboard from "./dashboard";
import styles from "./Home.module.css";

export default function Home({ loginUrl }) {
  const [user, setUser] = useState<User>(null);
  const { loading, error, data: meData } = useQuery(ME);
  const [createUserRepository, { data: userRepositoryData }] = useMutation(
    CREATE_USER_REPOSITORY,
    {
      update(cache, { data }) {
        const newUserRepositoryFromResponse = data?.createUserRepository;
        const existingMe = cache.readQuery({
          query: ME,
        });

        if (existingMe && newUserRepositoryFromResponse) {
          console.log(existingMe.me.repositories);
          cache.writeQuery({
            query: ME,
            data: {
              me: "",
            },
          });
        }
      },
    }
  );

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    setUser(null);
  }, []);

  const handleSubmit = (repositoryUrl) => {
    createUserRepository({
      variables: {
        createUserRepositoryInput: {
          repositoryUrl,
        },
      },
    });
  };

  useEffect(() => {
    meData && setUser(meData.me);
  }, [meData]);

  useEffect(() => {
    if (userRepositoryData) {
      const newUser = {
        ...user,
      };
      newUser.repositories = [
        ...newUser.repositories,
        userRepositoryData.createUserRepository,
      ];

      setUser(newUser);
    }
  }, [userRepositoryData]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Repository version checker</title>
      </Head>

      <main>
        {user && localStorage.getItem("jwt") ? (
          <Dashboard handleSubmit={handleSubmit} logout={logout} user={user} />
        ) : (
          <LoginButton loginUrl={loginUrl} />
        )}
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      loginUrl: process.env.GITHUB_LOGIN_URL,
    },
  };
};
