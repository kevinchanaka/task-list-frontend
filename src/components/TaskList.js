import {TaskAPI} from '../api';
import Table from 'react-bootstrap/Table';
import {useHistory} from 'react-router-dom';
import useDataLoader from '../hooks/useDataLoader';
import LoadingSpinner from './LoadingSpinner';

function TaskList(props) {
  const {data, error, loaded} = useDataLoader(TaskAPI.getTasks);
  const history = useHistory();
  const tasks = data.tasks;

  function handleClick(taskId) {
    history.push(`/tasks/${taskId}`);
  }

  return (
    <div className="ml-5 mr-5">
      <br />
      <h3>Task List</h3>
      <LoadingSpinner loaded={loaded} error={error}>
        {tasks && tasks.length > 0 ?
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((data) => {
                return (<tr key={data.id} onClick={() => handleClick(data.id)}>
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                </tr>);
              })}
            </tbody>
          </Table> :
          <p>No tasks have been added,
            click <a href='/add-task'>here</a> to add a new task</p>
        }
      </LoadingSpinner>
    </div>
  );
}

export default TaskList;
