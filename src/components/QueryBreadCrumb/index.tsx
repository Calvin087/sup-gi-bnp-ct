import Link from "next/link";
import { useQueryBreadCrumb } from "./hooks/useQueryBreadCrumb";

const QueryBreadCrumb = () => {
  const { query } = useQueryBreadCrumb();

  return (
    <Link
      className="text-[#405010] text-lg underline"
      href={`/?search=${query.search}&type=${query.type}&generation=${query.generation}`}
    >
      {"<-"} Back To All Pokemon
    </Link>
  );
};

export default QueryBreadCrumb;
