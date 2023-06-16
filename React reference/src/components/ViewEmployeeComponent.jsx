import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import { withParams } from "./withParams";

class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    let { id } = props.params;
    this.state = {
      //   id: this.props.match.params.id,
      id: id,
      employee: {},
    };
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((response) => {
      this.setState({
        employee: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <br />
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Employee Details</h3>
          <div className="card-body">
            <div className="row">
              <label>Employee First Name : </label>
              <div>{this.state.employee.firstName}</div>
            </div>
            <div className="row">
              <label>Employee Last Name : </label>
              <div>{this.state.employee.lastName}</div>
            </div>
            <div className="row">
              <label>Employee Email Id : </label>
              <div>{this.state.employee.emailId}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(ViewEmployeeComponent);
