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
  
  function Services() {
    const [services, setServices] = useState([]);
    // const [id, setID] = useState("hf");
    // const [tag, setTag] = useState(8);
    // const [barcode, setBarcode] = useState("hs_5E7L23M");
    // const [packages, setPackages] = useState(2);
    // const [price, setPrice] = useState(15);
    const [usernameM, setUsernameM] = useState();
    const [idM, setIdM] = useState();

    const [usernameW, setUsernameW] = useState();

    const [idL, setIDL] = useState();
    const [long_nameL, setLongNameL] = useState();
    const [home_baseL, setHomeBaseL] = useState();
    const [managerL, setManagerL] = useState();
  
    useEffect(() => {
      axios.get("http://localhost:3000/services").then((response) => {
        const { data } = response;
        setServices(data.result);
      });
    }, []);

    const manageService = () => {
      axios.put("http://localhost:3000/services/1", { usernameM, idM }).then((response) => {
        setUsernameM();
        setIdM();
      });
      window.location.reload();
      AppToaster.show({
        message: "Restaurant added successfully",
        intent: "success",
        timeout: 3000,
      });
    }
    const addWorker = () => {
      axios.put("http://localhost:3000/services/5", { usernameW }).then((response) => {
        setUsernameW();
      });
      window.location.reload();
      AppToaster.show({
        message: "Worker added successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    const addService = () => {
      axios.put("http://localhost:3000/services/6", { idL, long_nameL, home_baseL, managerL }).then((response) => {
        setIDL();
        setLongNameL();
        setHomeBaseL();
        setManagerL();
      });
      window.location.reload();
      AppToaster.show({
        message: "Service added successfully",
        intent: "success",
        timeout: 3000,
      });
    }
  
    // const removeIngredient = () => {
    //   axios.delete(`http://localhost:3000/packages/${barcode}`).then((response) => {
    //     setpackages((values) => {
    //       console.log(barcode)
    //       return values.filter((item) => item.barcode !== barcode);
    //     }).then((response) => {
    //       setBarcode("");
    //     });
  
    //     AppToaster.show({
    //       message: "Ingredient deleted successfully",
    //       intent: "success",
    //       timeout: 3000,
    //     });
    //   }); 
    // };
  
    // const addDrone = () => {
    //     axios.put("http://localhost:3000/packages", { id, tag, barcode, packages, price }).then((response) => {
    //         setID("hf");
    //         setTag(8);
    //         setBarcode("hs_5E7L23M");
    //         setPackages(2);
    //         setPrice(15);
    //     });
    //     window.location.reload();
    //     AppToaster.show({
    //       message: "Data updated successfully",
    //       intent: "success",
    //       timeout: 3000,
    //     });
    // }
  
    return (
      <div className="Services">
        <table className="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Home Base</th>
              <th>Manager</th>
              <th>Revenue</th>
              <th>Packages Carried</th>
              <th>Cost Carried</th>
              <th>Weight Carried</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => {
              const { id, long_name, home_base, manager, revenue, packages_carried, cost_carried, weight_carried } = service;
              return (
                <tr key={index}>
                  <td>{id}</td>
                  <td>{long_name}</td>
                  <td>{home_base}</td>
                  <td>{manager}</td>
                  <td>{revenue}</td>
                  <td>{packages_carried}</td>
                  <td>{cost_carried}</td>
                  <td>{weight_carried}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            { <tr>
              <td>
                <InputGroup
                  placeholder="Add manager here..."
                  value={usernameM}
                  onChange={(e) => {
                    setUsernameM(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add service id here..."
                  value={idM}
                  onChange={(e) => {
                    setIdM(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={manageService}>
                  Manage Service
                </Button>
              </td>
            </tr> }


            { <tr>
              <td>
                <InputGroup
                  placeholder="Employee username"
                  value={usernameW}
                  onChange={(e) => {
                    setUsernameW(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={addWorker}>
                  Add Worker
                </Button>
              </td>
            </tr> }

            { <tr>
              <td>
                <InputGroup
                  placeholder="ID"
                  value={idL}
                  onChange={(e) => {
                    setIDL(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Long name"
                  value={long_nameL}
                  onChange={(e) => {
                    setLongNameL(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Home Base"
                  value={home_baseL}
                  onChange={(e) => {
                    setHomeBaseL(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Manager"
                  value={managerL}
                  onChange={(e) => {
                    setManagerL(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={addService}>
                  Add Service
                </Button>
              </td>
            </tr> }
          </tfoot>
        </table>
      </div>
    );
  }
  
  export default Services;