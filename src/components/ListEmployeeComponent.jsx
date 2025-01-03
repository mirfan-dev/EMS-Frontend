import { useEffect, useState } from "react";
import styles from "./ListEmployeeComponent.module.css";
import axios from "axios";
import { MdSystemUpdateAlt } from "react-icons/md";
import { useNavigate} from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([]);
  const[isError, setIsError]=useState("");

 

  const navigator=useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8086/api/employees')
      .then((response) =>setEmployees(response.data))
        
        .catch((error) =>setIsError(error.message));
  }, []);

  function updateEmployee(id){
    navigator(`/edit-employee/${id}`);
  }
  function removeEmployee(id) {
    axios
        .delete(`http://localhost:8086/api/employees/${id}`)
        .then((res) => {
          console.log(res.data);
          // Update the UI after deletion
          setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id)
          );
        })
        .catch((error) => {
            console.error( error);
        });
}

  return (
    <div className="container">
    <h2 className={styles.employee}>
      List of Employee</h2>
      {isError !== "" && <h2 style={{ color: "red" }}>{isError}</h2>}
      <table className="table table-striped text-center table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Employee city</th>
            <th>Employee Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <th>{employee.id}</th>
              <td>{employee.name}</td>
              <td>{employee.city}</td>
              <td>{employee.email}</td>
              <td className={`btn btn-info ${styles.spacing}`} onClick={() =>updateEmployee(employee.id)}><MdSystemUpdateAlt /></td>
              <td className={`btn btn-danger ${styles.spacing}`} onClick={() =>removeEmployee(employee.id)}><AiFillDelete /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
