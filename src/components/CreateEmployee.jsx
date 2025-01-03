import {  useRef } from "react";
import styles from "./CreateEmployee.module.css";
import axios from "axios";
import {useNavigate, useParams } from "react-router-dom";

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
    <div className={styles.container}>
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  name="name"
                  className="form-control"
                   ref={employeeNameElement}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">City</label>
                <input
                  type="text"
                  placeholder="Enter your city name"
                  name="city"
                  className="form-control"
                  ref={employeeCityElement}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="form-control"
                  ref={employeeEmailElement}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
