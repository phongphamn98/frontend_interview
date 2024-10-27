import Pagination from "@/components/pages/pokemon-list/pagination";
import ResultList from "@/components/pages/pokemon-list/result-list";
import Types from "@/components/pages/pokemon-list/types";

export default function page() {
  return (
    <div>
      <Types />
      <ResultList />
      <Pagination />
    </div>
  );
}
