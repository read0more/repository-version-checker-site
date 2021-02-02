import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./RepositoryItem.module.css";
import Link from "next/link";
import { format } from "date-fns";
import { userRepository as userRepositoryInterface } from "../../apollo/__generated__/userRepository";
import { useMutation } from "@apollo/client";
import { REMOVE_USER_REPOSITORY } from "../../apollo/mutation";
import { ME } from "../../apollo/query";
import { Me } from "../../apollo/__generated__/Me";

interface Props {
  userRepository: userRepositoryInterface;
}

const RepositoryItem: React.FC<Props> = ({ userRepository }) => {
  const [removeUserRepository, { loading }] = useMutation(
    REMOVE_USER_REPOSITORY,
    {
      update(cache, { data }) {
        const removedRepositoryUrl = data?.removeUserRepository.repositoryUrl;
        const existingMe = cache.readQuery<Me>({
          query: ME,
        });

        if (existingMe && removedRepositoryUrl) {
          const id = cache.identify({
            id: userRepository.repository.id,
            __typename: "Repository",
          });
          cache.evict({ id });
        }
      },
    }
  );

  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      loading && event.preventDefault();
    },
    []
  );

  const handleTimesClick = useCallback(() => {
    if (loading) return;

    removeUserRepository({
      variables: {
        repositoryId: +userRepository.repository.id,
      },
    });
  }, []);

  return (
    <li
      className={
        loading ? `${styles.repository} ${styles.loading}` : styles.repository
      }
    >
      <div className={styles["title-box"]}>
        <b className={styles.name}>{userRepository.repository.name}</b>
        <div>
          <Link href={userRepository.repositoryUrl}>
            <a
              target="_blank"
              rel="noopener noreferer"
              onClick={handleLinkClick}
            >
              <FontAwesomeIcon icon={faGithub} className={styles.logo} />
            </a>
          </Link>
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.times}
            onClick={handleTimesClick}
          />
        </div>
      </div>
      <ol className={styles.list}>
        {userRepository.repository.versions.length === 0 && (
          <b className={styles.nodata}>버전 정보가 없습니다.</b>
        )}
        {userRepository.repository.versions.map((version) => (
          <li key={version.id}>
            <div className={styles.item}>
              <span className={styles.version}>
                {version.url.split("/").pop()}
              </span>
              <span className={styles.date}>
                {format(new Date(version.publishedAt), "yyyy-LL-dd")}
              </span>
              <b className={styles.prerelease}>
                {version.prerelease ? "pre-release" : ""}
              </b>
              <div className={styles["logo-box"]}>
                <Link href={version.url}>
                  <a
                    className={styles.logo}
                    target="_blank"
                    rel="noopener noreferer"
                    onClick={handleLinkClick}
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </li>
  );
};

export default RepositoryItem;