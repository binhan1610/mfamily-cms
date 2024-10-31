import { useMount } from 'ahooks';
import { useAuth } from '@store/auth/useAuth';
import { useProfile } from '@store/profile/useProfile';

const AppLayout = ({ children }: any) => {
  const { requestGetProfile } = useProfile();
  const { auth } = useAuth();
  useMount(() => {
    requestGetProfile.run(auth?.id);
  });

  if (requestGetProfile.loading) return null;

  return <div>{children}</div>;
};

export default AppLayout;
