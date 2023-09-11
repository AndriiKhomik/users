import UsersTable from "../components/UsersTable";
import { useAppSelector } from "../hooks/redux";
import { useGetUsersQuery } from "../store/dummyJson/dummyJsonApi";

const Home = () => {
  const { settings } = useAppSelector((state) => state.settings);
  const { data } = useGetUsersQuery(
    {
      search: "",
      limit: settings.itemsPerPage,
      skip: settings.skip,
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 30000 }
  );

  return (
    <section className="w-[1024px] mx-auto">
      <UsersTable data={data} />
    </section>
  );
};

export default Home;
