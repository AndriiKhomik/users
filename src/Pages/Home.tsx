import UsersTable from "../components/UsersTable";
import { useAppSelector } from "../hooks/redux";
import { useGetUsersQuery } from "../store/dummyJson/dummyJsonApi";
import Spinner from "../components/Spinner";
import SearchInput from "../components/SearchInput";

const Home = () => {
  const { settings } = useAppSelector((state) => state.settings);
  const { data, isError, isLoading } = useGetUsersQuery(
    {
      search: settings.search,
      limit: settings.itemsPerPage,
      skip: settings.skip,
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 30000 }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="h-[70vh] flex items-center justify-center flex-col">
        <div className="h-[54px] w-[54px] flex items-center justify-center rounded-full bg-red-300 text-3xl border border-black mb-4">
          !
        </div>
        <div className="text-3xl font-bold">Opps, something went wrong</div>
      </div>
    );
  }

  return (
    <section className="w-[1024px] mx-auto">
      <SearchInput />
      <UsersTable data={data} />
    </section>
  );
};

export default Home;
