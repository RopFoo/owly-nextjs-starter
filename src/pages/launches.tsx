import client from '../apollo/apolloClient';
import { Launch, LaunchesPastQuery } from '../generated/types';
import LAUNCHES from '../graphql/queries/launches.graphql';

interface LaunchesProps {
  launchesPastQuery: Launch[];
}

const Launches: React.FC<LaunchesProps> = ({ launchesPastQuery }) => {
  console.log(launchesPastQuery);
  return (
    <div>
      <h1>SpaceX Launches</h1>
      {launchesPastQuery?.map((launch: Launch) => {
        return (
          <div>
            <h1>{launch.mission_name}</h1>
            <p>{launch.rocket.rocket_name}</p>
          </div>
        );
      })}
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({ query: LAUNCHES });
  const launchesPastQuery: LaunchesPastQuery = data.launchesPast;

  return { props: { launchesPastQuery } };
}

export default Launches;
