import { Grid } from "semantic-ui-react";
import CowCard from "./cowCard";

interface HerdProps {
  herds: Array<any>;
}

export default function HerdList(props: HerdProps) {
  return (
    <Grid stackable columns={3}>
      {props.herds.map((herd) => {
        return (
          <Grid.Column>
            <CowCard
              id={herd.id}
              feed_time={herd.feed_time}
              waste={herd.waste}
            ></CowCard>
          </Grid.Column>
        );
      })}
    </Grid>
  );
}
