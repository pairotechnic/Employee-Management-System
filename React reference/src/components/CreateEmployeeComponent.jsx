import React, { Component } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import ListEmployeeComponent from "./ListEmployeeComponent";
import { withParams } from "./withParams";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    let { id } = props.params;
    this.state = {
      //   id: this.props.match.params.id,
      id: id,
      firstName: "",
      lastName: "",
      emailId: "",
    };

    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    if (this.state.id == -1) {
      return;
    } else {
      EmployeeService.getEmployeeById(this.state.id).then((response) => {
        let employee = response.data;
        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          emailId: employee.emailId,
        });
        //   this.setState(response.data);
      });
    }
  }

  saveEmployee = (event) => {
    event.preventDefault();
    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
    };

    console.log("employee => " + JSON.stringify(employee));
    // console.log("employee state : " + JSON.stringify(this.state));

    if (this.state.id == -1) {
      EmployeeService.createEmployee(employee).then((response) => {
        //   this.props.history.push("/employees");
        this.props.navigate("/employees");
      });
    } else {
      EmployeeService.updateEmployee(employee, this.state.id).then(
        (response) => {
          //   this.props.history.push("/employees");
          this.props.navigate("/employees");
        }
      );
    }
  };

  cancel() {
    this.props.navigate("/employees");
  }

  changeFirstNameHandler = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  changeLastNameHandler = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  changeEmailHandler = (event) => {
    this.setState({
      emailId: event.target.value,
    });
  };

  getTitle() {
    if (this.state.id == -1) {
      return <h3 className="text-center">Add Employee</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {/* <h3 className="text-center">Add Employee</h3> */}
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>First Name : </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name : </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Id : </label>
                    <input
                      placeholder="Email Address"
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeEmailHandler}
                    />
                  </div>
                  {/* <Link to="/employees"> */}
                  <button
                    className="btn btn-success"
                    onClick={this.saveEmployee}
                  >
                    Save
                  </button>
                  {/* </Link> */}
                  {/* <Link to="/employees"> */}
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={this.cancel}
                  >
                    Cancel
                  </button>
                  {/* </Link> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(CreateEmployeeComponent);
