import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const LogSettingSafezone = dynamic(
  () => import('@layout/GroupLeader/CheckLog/logSettingSafezone'),
  {
    ssr: false,
  },
);

const LoglogSettingSafezone = () => {
  return (
    <MainLayout>
      <LogSettingSafezone />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default LoglogSettingSafezone;
