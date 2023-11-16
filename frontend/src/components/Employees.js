import {
    Button,
    EditableText,
    InputGroup,
    Toaster,
    Position,
  } from "@blueprintjs/core";
  import axios from "axios";
  import { useEffect, useState } from "react";
  
  const AppToaster = Toaster.create({
    position: Position.TOP,
  });
  
  function Employees() {
    const [employees, setEmployees] = useState([]);
    // const [id, setID] = useState("hf");
    // const [tag, setTag] = useState(8);
    // const [barcode, setBarcode] = useState("hs_5E7L23M");
    // const [packages, setPackages] = useState(2);
    // const [price, setPrice] = useState(15);
    const [username, setUsername] = useState("");
    const [id, setId] = useState();

    const [usernameF, setUsernameF] = useState("");
    const [idF, setIdF] = useState();

    const [usernameA, setUsernameA] = useState("");
    const [first_nameA, setFirstNameA] = useState("");
    const [last_nameA, setLastNameA] = useState("");
    const [addressA, setAddressA] = useState("");
    const [birthdateA, setBirthdateA] = useState("");
    const [GTIDA, setGTIDA] = useState("");
    const [hiredA, setHiredA] = useState("");
    const [experienceA, setExperienceA] = useState();

    useEffect(() => {
      axios.get("http://localhost:3000/employees").then((response) => {
        const { data } = response;
        setEmployees(data.result);
      });
    }, []);

    const hireEmployee = () => {
      axios.put("http://localhost:3000/employees/1", { username, id }).then((response) => {
        setUsername();
        setId();
      });
      window.location.reload();
      AppToaster.show({
        message: "Student added successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    const removeStudent = () => {
      axios.put("http://localhost:3000/employees/2", { usernameF, idF }).then((response) => {
        setUsernameF();
        setIdF();
      });
      window.location.reload();
      AppToaster.show({
        message: "Restaurant added successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    const addEmployee = () => {
      axios.put("http://localhost:3000/employees/7", { usernameA, first_nameA, last_nameA, addressA, birthdateA, GTIDA, hiredA, experienceA }).then((response) => {
        setUsernameA();
        setFirstNameA();
        setLastNameA();
        setAddressA();
        setBirthdateA();
        setGTIDA();
        setHiredA();
        setExperienceA();
      });
      window.location.reload();
      AppToaster.show({
        message: "Employee added successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    return (
      <div className="Employees">
        <table className="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Username</th>
              <th>GTID</th>
              <th>Joined</th>
              <th>Employee Experience</th>
              <th>LicenseID</th>
              <th>Piloting Experience</th>
              <th>Manager Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => {
              const { username, GTID, hired, employee_experience, licenseID, piloting_experience, manager_status  } = employee;
              return (
                <tr key={index}>
                  <td>{username}</td>
                  <td>{GTID}</td>
                  <td>{hired.substring(0, 10)}</td>
                  <td>{employee_experience}</td>
                  <td>{licenseID}</td>
                  <td>{piloting_experience}</td>
                  <td>{manager_status}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
          {<tr>
              <td>
                <InputGroup
                  placeholder="Add username here..."
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add id here..."
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={hireEmployee}>
                  Hire Employee
                </Button>
              </td>
            </tr>}

            {<tr>
              <td>
                <InputGroup
                  placeholder="Add username here..."
                  value={usernameF}
                  onChange={(e) => {
                    setUsernameF(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add id here..."
                  value={idF}
                  onChange={(e) => {
                    setIdF(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={removeStudent}>
                  Remove Student
                </Button>
              </td>
            </tr>}

            {<tr>
              <td>
                <InputGroup
                  placeholder="Username"
                  value={usernameA}
                  onChange={(e) => {
                    setUsernameA(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="First Name"
                  value={first_nameA}
                  onChange={(e) => {
                    setFirstNameA(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Last Name"
                  value={last_nameA}
                  onChange={(e) => {
                    setLastNameA(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Address"
                  value={addressA}
                  onChange={(e) => {
                    setAddressA(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Birthdate"
                  value={birthdateA}
                  onChange={(e) => {
                    setBirthdateA(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="GTID"
                  value={GTIDA}
                  onChange={(e) => {
                    setGTIDA(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Join Date"
                  value={hiredA}
                  onChange={(e) => {
                    setHiredA(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Semesters"
                  value={experienceA}
                  onChange={(e) => {
                    setExperienceA(e.target.value)
                  }}
                />
                
              </td>
              <td>
                <Button intent="success" onClick={addEmployee}>
                  Add Student
                </Button>
              </td>
            </tr>}

          </tfoot>
        </table>
      </div>
    );
  }
  
  export default Employees;