import type { NextPage } from 'next';
import Head from 'next/head';
import { ProfileScreen } from '../components/screens/profile/ProfileScreen';

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta
          name="description"
          content="Profile page"
        />
      </Head>

      <ProfileScreen />
    </>
  );
};

export default ProfilePage;
