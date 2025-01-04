import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ReadEmployee = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8086/api/employees/${id}`)
      .then((res) => setData(res.data))
      .then((error) => console.error(error));
  }, []);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="text-center fw-bold">Profile</h1>
        <div className="mb-2 ">
          <strong>Id :  {data.id}</strong>
        </div>
        <div className="mb-2 ">
          <strong>Name :  {data.name}</strong>
        </div>
        <div className="mb-2 ">
          <strong>City :  {data.city}</strong>
        </div>
        <div className="mb-2 ">
          <strong>Email :  {data.email}</strong>
        </div>
        <Link to={`/edit-employee/ ${id}`} className="btn btn-success">
            Edit
          </Link>
          <Link to="/" className="btn btn-primary ms-3">Back</Link>
      </div>
    </div>
  );
};

export default ReadEmployee;
