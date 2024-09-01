import {FC} from "react";

type HeaderProps = {
  title: string;
}

const PageHeader: FC<HeaderProps> = ({ title }) => {
  return <h1 className="text-2xl font-bold mb-6">{ title }</h1>
}

export default PageHeader;