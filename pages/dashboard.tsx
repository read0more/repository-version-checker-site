import React from "react";
import { Me_me } from "../apollo/__generated__/Me";
import AddRepositoryForm from "../components/AddRepositoryForm/AddRepositoryForm";
import Header from "../components/Header/Header";

interface Props {
  logout: () => void;
  user: Me_me;
}

const Dashboard: React.FC<Props> = ({ logout, user }) => {
  return (
    <>
      <Header
        logout={logout}
        username={user.username}
        profileImage={user.profileImage}
      />
      <AddRepositoryForm />
    </>
  );
};

export default Dashboard;