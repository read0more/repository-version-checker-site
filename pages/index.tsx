import { gql, useQuery } from "@apollo/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import LoginButton from "../components/LoginButton/LoginButton";
import Dashboard from "./dashboard";
import styles from "./Home.module.css";

const ME = gql`
  query me {
    me {
      id
      githubId
      username
      profileImage
      repositories {
        repository {
          id
          name
          updatedAt
          versions {
            id
            prerelease
            url
            publishedAt
          }
        }
        order
        repositoryUrl
      }
    }
  }
`;

export default function Home({ loginUrl }) {
  const [user, setUser] = useState<User>(null);
  const { loading, error, data } = useQuery(ME);

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    setUser(null);
  }, []);

  useEffect(() => {
    data && setUser(data.me);
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Repository version checker</title>
      </Head>

      <main>
        {user && localStorage.getItem("jwt") ? (
          <Dashboard logout={logout} user={user} />
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
