import { FC } from "react";
import { Link } from "react-router-dom";
import LeftIcon from "../assets/icons/arrow-right-50.svg";

type OperationProps = {
  description: string;
  linkUrl: string;
};

const ManagerOperation: FC<OperationProps> = ({ description, linkUrl }) => {
  return (
    <Link to={linkUrl}>
      <div className="flex justify-between items-center  mb-4 p-4 border-2 border-gray-300 text-gray-900 text-left rounded-xl">
        <h2 className="text-lg font-bold">{description}</h2>
        <img src={LeftIcon} alt="Go to page" className="w-6 h-6" />
      </div>
    </Link>
  );
};

export default ManagerOperation;
