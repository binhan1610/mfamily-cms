import dynamic from 'next/dynamic';
const SignIn = dynamic(() => import('@layout/Auth/Signin'), { ssr: false });

const SignInPage = () => {
  return (
    <>
      <SignIn />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default SignInPage;
