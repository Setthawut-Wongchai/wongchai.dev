import { getReleases } from '@/actions/releases';
import { HomeClient } from '@/components/HomeClient';

export default async function HomePage() {
  const latestReleases = await getReleases();
  const latestBuild = latestReleases[0];

  return <HomeClient latestBuild={latestBuild} />;
}
