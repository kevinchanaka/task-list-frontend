import Card from 'react-bootstrap/Card';
import {CreateLabelReq} from '../api/label';
import LabelBox from './LabelBox';

interface LabelIconProps {
  label: CreateLabelReq
}


function LabelIcon(props: LabelIconProps): JSX.Element {
  const {name, colour} = props.label;
  return (
    <Card style={{width: 'fit-content'}}>
      <div>
        <span className="m-1 ml-2">{name}</span>
        <LabelBox colour={colour} />
      </div>
    </Card>
  );
}

export default LabelIcon;
