import { useEffect, useState } from "react";
import styles from "./ListEmployeeComponent.module.css";
import axios from "axios";
import { MdSystemUpdateAlt } from "react-icons/md";
import { Link} from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BiMessageAdd } from "react-icons/bi";
import { CiUnread } from "react-icons/ci";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8086/api/employees")
      .then((response) => setEmployees(response.data))

      .catch((error) => console.error(error));
  }, []);

  const removeEmployee = (id) => {
    const confirm = window.confirm("Would you like to delete..?");
    if (confirm) {
      axios.delete(`http://localhost:8086/api/employees/${id}`).then((res) => {
        console.log(res.data);
        // Update the UI after deletion
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      });
    }
  };

  return (
    <div className="d-flex flex-column  align-items-center bg-light vh-100">
      <h2 className={styles.employee}>List of Employees</h2>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end mb-3">
          <Link to="create-employee" className="btn btn-success">
            <BiMessageAdd />
          </Link>
        </div>
        <table className="table table-striped text-center table-bordered">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Employee City</th>
              <th>Employee Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.city}</td>
                <td>{employee.email}</td>
                <td>
                  <Link
                    to={`/read/ ${employee.id}`}
                    className={`btn btn-sm btn-info me-2 ${styles.spacing}`}
                  >
                    <CiUnread />
                  </Link>
                  <Link
                    to={`/edit-employee/ ${employee.id}`}
                    className={`btn btn-sm btn-primary me-2 ${styles.spacing}`}
                  >
                    <MdSystemUpdateAlt />
                  </Link>
                  <button className={`btn btn-sm btn-danger ${styles.spacing}`} onClick={() => removeEmployee(employee.id)}>
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
