import {useEffect, useState} from 'react';
import {TaskAPI} from '../api';
import Table from 'react-bootstrap/Table';
import {useHistory} from 'react-router-dom';

function TaskList(props) {
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const taskList = await TaskAPI.getTasks();
    setTasks(taskList);
  }, []);

  function handleClick(taskId) {
    history.push(`/tasks/${taskId}`);
  }

  const tableData = tasks.map((data) => {
    return (<tr key={data.id} onClick={() => handleClick(data.id)}>
      <td>{data.name}</td>
      <td>{data.description}</td>
    </tr>);
  });

  return (
    <div className="ml-5 mr-5">
      <br />
      <h3>Task List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </Table>
    </div>
  );
}

export default TaskList;
