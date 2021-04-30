import { Card, Divider, Image } from "semantic-ui-react";

interface CardProps {
  id: number;
  feed_time: string;
  waste: number;
}

export default function CowCard(props: CardProps) {
  return (
    <Card>
      <Card.Content>
        <Image src="https://i.pinimg.com/originals/28/6e/af/286eaf4bfad4c26c0fe0ba91dbb050c7.jpg"></Image>
        <Divider></Divider>
        <Card.Header>{props.id}</Card.Header>
        <Card.Description>
          Last Fed: {props.feed_time}
          <br></br>
          Waste: {props.waste}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
