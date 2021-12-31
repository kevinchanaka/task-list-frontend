import {TaskAPI} from '../api';
import Row from 'react-bootstrap/Row';
import {Link} from 'react-router-dom';
import useDataLoader from '../hooks/useDataLoader';
import LoadingSpinner from './LoadingSpinner';
import TaskCard from './TaskCard';

function TaskList(props) {
  const {data, error, loaded} = useDataLoader(TaskAPI.getTasks);
  const tasks = data.tasks;

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Task List</h3>
      <LoadingSpinner loaded={loaded} error={error}>
        {tasks && tasks.length > 0 ?
          <Row xs={1} md={2} className="g-4">
            {tasks.map((data) => {
              return (
                <TaskCard key={data.id} task={data} />
              );
            })}
          </Row> :
          <div>
            No tasks have been added,
            click <Link to="/add-task">here</Link> to add a new task
          </div>
        }
      </LoadingSpinner>
    </div>
  );
}

export default TaskList;
