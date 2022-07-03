import type { NextPage } from "next";
import Tenant from "./[tenant]";

const Home: NextPage = () => {
  return (
    <div>
      <Tenant />
    </div>
  );
};

export default Home;
