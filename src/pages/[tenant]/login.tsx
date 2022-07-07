import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { Tenant } from "../../@types/Tenant";
import { useApi } from "../../libs/useApi";
import { useAppContext } from "../../contexts/AppContext";
import { Header } from "../../components/Header";

const Login = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  return (
    <div className="bg-white pt-[50px]">
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>

      <Header
        color={data.tenant.mainColor}
        backButton={`/${data.tenant.slug}`}
      />
    </div>
  );
};

export default Login;

interface Props {
  tenant: Tenant;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi();

  //GET Tenant
  const tenant = await api.getTenant(tenantSlug as string);
  if (!tenant) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { tenant },
  };
};
