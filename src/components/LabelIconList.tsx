import LabelIcon from './LabelIcon';

interface LabelIconListProps {
  labels: Label[]
}

interface Label {
  id: string,
  name: string,
  colour: string
}


function LabelIconList(props: LabelIconListProps): JSX.Element {
  if (props.labels.length == 0) {
    return (<div>No labels attached</div>);
  }
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px 10px'}}>
      {props.labels.map((label) => {
        return <LabelIcon key={label.id} label={label} />;
      })}
    </div>
  );
}

export default LabelIconList;
