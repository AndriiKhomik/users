import UsersTable from "../components/UsersTable";
import { useGetUsersQuery } from "../store/dummyJson/dummyJsonApi";

const Home = () => {
  const { data } = useGetUsersQuery({ search: "", limit: 10, page: 1 });

  return (
    <section className="w-[1024px] mx-auto">
      <UsersTable data={data} />
    </section>
  );
};

export default Home;
