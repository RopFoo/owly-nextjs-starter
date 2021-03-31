import client from '../apollo/apolloClient';
import { LaunchesPastQuery } from '../generated/types';
import LAUNCHES from '../graphql/queries/launches.graphql';

interface LaunchesProps {
  launchesPastQuery: LaunchesPastQuery;
}

const Launches: React.FC<LaunchesProps> = ({ launchesPastQuery }) => {
  console.log(launchesPastQuery.launchesPast);
  return (
    <div>
      <h1>SpaceX Launches</h1>
      {launchesPastQuery?.launchesPast.map((launch) => {
        return (
          <div key={launch.id}>
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
  const launchesPastQuery: LaunchesPastQuery = data;

  return { props: { launchesPastQuery } };
}

export default Launches;
