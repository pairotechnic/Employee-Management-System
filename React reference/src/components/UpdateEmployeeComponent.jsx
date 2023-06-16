import React, { Component } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import ListEmployeeComponent from "./ListEmployeeComponent";
import { withParams } from "./withParams";

class UpdateEmployeeComponent extends Component {
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
    this.updateEmployee = this.updateEmployee.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
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

  updateEmployee = (event) => {
    event.preventDefault();
    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
    };
    console.log("employee => " + JSON.stringify(employee));

    // console.log("employee state : " + JSON.stringify(this.state));

    EmployeeService.updateEmployee(employee, this.state.id).then((response) => {
      //   this.props.history.push(`/update-employee/${id}`);
      //   this.props.navigate(`/update-employee/${id}`);

      //   this.props.history.push("/employees");
      this.props.navigate("/employees");
    });
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

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Add Employee</h3>
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
                    onClick={this.updateEmployee}
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

// export default UpdateEmployeeComponent;
export default withParams(UpdateEmployeeComponent);
