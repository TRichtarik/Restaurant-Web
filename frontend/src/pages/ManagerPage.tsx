import React from "react";
import ManagerOperation from "../components/ManagerOperation";
import PageHeader from "../components/PageHeader";
import useAuth from "../hooks/useAuth";
import { TextComponent } from "../components/TextComponent";

export const ManagerPage: React.FC = () => {
  const { auth, isLoading, isError } = useAuth()

  if (isLoading) return <TextComponent message="Loading ..."/>;
  if (isError) return <TextComponent message="An error occurred"/>;

  return (
    <div>
      <div className="container mx-auto px-4 p-5">
        <PageHeader title={`${auth?.name + " " + auth?.surname} - Manager`} />
        <div className="w-full border-2 border-gray-300 p-6 rounded-lg flex flex-col justify-between">
          <ManagerOperation
            linkUrl={"restaurant"}
            description={"Manage Restaurants"}
          />
        </div>
      </div>
    </div>
  );
};
