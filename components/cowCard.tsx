import { useRouter } from "next/router";
import { Card, Divider, Image } from "semantic-ui-react";

interface CardProps {
  id: number;
  feed_time: string;
  waste: number;
  onClick?: Function;
}

export default function CowCard(props: CardProps) {
  const router = useRouter();
  const navigateToCows = () => {
    router.push("/herd/" + props.id);
  };
  return (
    <Card>
      <Card.Content>
        <Image src="/cow.jpg"></Image>
        <Divider></Divider>
        <Card.Header>
          <a onClick={navigateToCows}>{props.id}</a>
        </Card.Header>
        <Card.Description>
          Last Fed: {props.feed_time}
          <br></br>
          Waste: {props.waste}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
