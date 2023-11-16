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
  
  function Pilots() {
    const [pilots, setPilots] = useState([]);
    const [username, setUsername] = useState("");
    // const [tag, setTag] = useState(8);
    // const [barcode, setBarcode] = useState("hs_5E7L23M");
    // const [packages, setPackages] = useState(2);
    // const [price, setPrice] = useState(15);
    const [usernameP, setUsernameP] = useState();
    const [id, setId] = useState();
    const [tag, setTag] = useState();

    const [id1, setId1] = useState();
    const [tag1, setTag1] = useState();
    const [leaderTag, setLeaderTag] = useState();

    const [id2, setId2] = useState();
    const [swarmTag, setTag2] = useState();

    const [id3, setId3] = useState();
    const [tag3, setTag3] = useState();
    const [moreFuel, setFuel] = useState();

    const [usernameB, setUsernameB] = useState();
    const [IDB, setIDB] = useState(); // License ID
    const [expB, setExpB] = useState(); // Experience (in days)

    const [idD, setidD] = useState();
    const [tagD, setTagD] = useState();
    const [fuelD, setFuelD] = useState();
    const [capacityD, setCapacityD] = useState();
    const [salesD, setSalesD] = useState();
    const [flown_byD, setFlownByD] = useState();

    //for removeDrone
    const [id4, setID4] = useState();
    const [tag4, setTag4] = useState();


    useEffect(() => {
      axios.get("http://localhost:3000/pilots").then((response) => {
        const { data } = response;
        setPilots(data.result);
      });
    }, []);
  
    const removePilot = () => {
      axios.delete(`http://localhost:3000/pilots/${username}`).then((response) => {
        window.location.reload();
        if (!response.data.error) {
          AppToaster.show({
          message: "Pilot deleted successfully",
          intent: "success",
          timeout: 3000,
        });
        } else {
          AppToaster.show({
            message: "Pilot could not be removed",
            color: "red",
            timeout: 3000,
          });
        }
      });
    };

    const takeoverDrone = () => {
      axios.put("http://localhost:3000/pilots/1", { usernameP, id, tag }).then((response) => {
        setUsernameP()
        setId();
        setTag();
      });
      window.location.reload();
      AppToaster.show({
        message: "Fund portal added successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    const joinSwarm = () => {
      axios.put("http://localhost:3000/pilots/2", { id1, tag1, leaderTag }).then((response) => {
        setId1()
        setTag1();
        setLeaderTag();
      });
      window.location.reload();
      AppToaster.show({
        message: "Joined swarm successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    const leaveSwarm = () => {
      axios.put("http://localhost:3000/pilots/3", { id2, swarmTag }).then((response) => {
        setId2()
        setTag2();
      });
      window.location.reload();
      AppToaster.show({
        message: "Left swarm successfully",
        intent: "success",
        timeout: 3000,
      });
    }
  
    const refuelDrone = () => {
      axios.put("http://localhost:3000/pilots/4", { id3, tag3, moreFuel }).then((response) => {
        setId3()
        setTag3();
        setFuel();
      });
      window.location.reload();
      AppToaster.show({
        message: "Refueled drone successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    const addPilot = () => {
      axios.put("http://localhost:3000/pilots/8", { usernameB, IDB, expB }).then((response) => {
        setUsernameB()
        setIDB();
        setExpB();
      });
      window.location.reload();
      AppToaster.show({
        message: "Pilot added successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    const addDrone = () => {
      axios.put("http://localhost:3000/pilots/9", { idD, tagD, fuelD, capacityD, salesD, flown_byD }).then((response) => {
        setidD();
        setTagD();
        setFuelD();
        setCapacityD();
        setSalesD();
        setFlownByD();
      });
      window.location.reload();
      AppToaster.show({
        message: "Drone added successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    const removeDrone = () => {
      axios.put("http://localhost:3000/pilots/7", { id4, tag4 }).then((response) => {
        setID4();
        setTag4();
      });
      window.location.reload();
    }

    return (
      <div className="Pilots">
        <table className="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Username</th>
              <th>LicenseID</th>
              <th>Experience</th>
              <th>Number of Drones</th>
              <th>Number of Locations</th>
            </tr>
          </thead>
          <tbody>
            {pilots.map((pilot, index) => {
              const { username, licenseID, experience, num_drones, num_locations } = pilot;
              return (
                <tr key={index}>
                  <td>{username}</td>
                  <td>{licenseID}</td>
                  <td>{experience}</td>
                  <td>{num_drones}</td>
                  <td>{num_locations}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <InputGroup
                  placeholder="Add username here..."
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />

              </td>
              <td>
                <Button intent="success" onClick={removePilot}>
                  Remove Pilot
                </Button>
              </td>
            </tr>

            {<tr>
              <td>
                <InputGroup
                  placeholder="Username here..."
                  value={usernameP}
                  onChange={(e) => {
                    setUsernameP(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Id here..."
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Tag here..."
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={takeoverDrone}>
                  Takeover Drone
                </Button>
              </td>
            </tr>}

            {<tr>
              <td>
                <InputGroup
                  placeholder="ID here..."
                  value={id1}
                  onChange={(e) => {
                    setId1(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Tag here..."
                  value={tag1}
                  onChange={(e) => {
                    setTag1(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Leader Tag here..."
                  value={leaderTag}
                  onChange={(e) => {
                    setLeaderTag(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={joinSwarm}>
                  Join Swarm
                </Button>
              </td>
            </tr>}

            {<tr>
              <td>
                <InputGroup
                  placeholder="ID here..."
                  value={id2}
                  onChange={(e) => {
                    setId2(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Swarm Tag here..."
                  value={swarmTag}
                  onChange={(e) => {
                    setTag2(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={leaveSwarm}>
                  Leave Swarm
                </Button>
              </td>
            </tr>}

            {<tr>
              <td>
                <InputGroup
                  placeholder="ID here..."
                  value={id3}
                  onChange={(e) => {
                    setId3(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Tag here..."
                  value={tag3}
                  onChange={(e) => {
                    setTag3(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Amount of fuel here..."
                  value={moreFuel}
                  onChange={(e) => {
                    setFuel(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={refuelDrone}>
                  Refuel Drone
                </Button>
              </td>
            </tr>}

            {<tr>
              <td>
                <InputGroup
                  placeholder="Username here..."
                  value={usernameB}
                  onChange={(e) => {
                    setUsernameB(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="License Id here..."
                  value={IDB}
                  onChange={(e) => {
                    setIDB(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Experience here..."
                  value={expB}
                  onChange={(e) => {
                    setExpB(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={addPilot}>
                  Add Pilot
                </Button>
              </td>
            </tr>}

            {<tr>
              <td>
                <InputGroup
                  placeholder="Id here..."
                  value={idD}
                  onChange={(e) => {
                    setidD(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Tag here..."
                  value={tagD}
                  onChange={(e) => {
                    setTagD(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Fuel here..."
                  value={fuelD}
                  onChange={(e) => {
                    setFuelD(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Capacity here..."
                  value={capacityD}
                  onChange={(e) => {
                    setCapacityD(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Sales here..."
                  value={salesD}
                  onChange={(e) => {
                    setSalesD(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Pilot here..."
                  value={flown_byD}
                  onChange={(e) => {
                    setFlownByD(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={addDrone}>
                  Add Drone
                </Button>
              </td>
            </tr>}
            {<tr>
              <td>
                <InputGroup
                  placeholder="Id here..."
                  value={id4}
                  onChange={(e) => {
                    setID4(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Tag here..."
                  value={tag4}
                  onChange={(e) => {
                    setTag4(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={removeDrone}>
                  Remove Drone
                </Button>
              </td>
            </tr>}


          </tfoot>
        </table>
      </div>
    );
  }
  
  export default Pilots;