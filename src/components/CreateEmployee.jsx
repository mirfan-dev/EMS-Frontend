import {  useRef } from "react";
import styles from "./CreateEmployee.module.css";
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";

const CreateEmployee = () => {
  
  const navigator=useNavigate();
  const{id}=useParams();


 const employeeNameElement=useRef();
 const employeeEmailElement=useRef();
 const employeeCityElement=useRef();


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: employeeNameElement.current.value,
      email: employeeEmailElement.current.value,
      city: employeeCityElement.current.value,
    };

    employeeNameElement.current.value="";
    employeeEmailElement.current.value="";
    employeeCityElement.current.value="";


    const request = id
    ? axios.put(`http://localhost:8086/api/employees/${id}`, formData)
    : axios.post("http://localhost:8086/api/employees/save", formData);

  request
      .then((res) => {
        console.log(res.data)
        navigator("/");
      });  
      
  };

  function pageTitle(){
    if(id){
      return <h2 className="text-center">Update Employee</h2>
    }else{
      return <h2 className="text-center">Add Employee</h2>
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        {pageTitle()}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              className="form-control"
              ref={employeeNameElement}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="city">City</label>
            <input
              type="text"
              placeholder="Enter your city name"
              name="city"
              className="form-control"
              ref={employeeCityElement}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="form-control"
              ref={employeeEmailElement}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/" className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
