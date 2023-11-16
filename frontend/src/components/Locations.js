import {
    Button,
    InputGroup,
    Toaster,
    Position,
  } from "@blueprintjs/core";
  import axios from "axios";
  import { useEffect, useState } from "react";
  
  const AppToaster = Toaster.create({
    position: Position.TOP,
  });
  
  function Locations() {
    const [locations, setLocations] = useState([]);

    const [long_name, setName] = useState("");
    const [rating, setRating] = useState();
    const [spent, setSpent] = useState();
    const [location, setLocation] = useState("");

    const [label, setLabel] = useState();
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [space, setSpace] = useState();

    const [id4, setId] = useState();
    const [tag4, setTag] = useState();
    const [destination, setDestination] = useState();
  
    useEffect(() => {
      axios.get("http://localhost:3000/locations").then((response) => {
        const { data } = response;
        setLocations(data.result);
      });
    }, []);

    const addLocationLabel = () => {
      axios.put("http://localhost:3000/locations/1", { long_name, rating, spent, location }).then((response) => {
        setName();
        setRating();
        setSpent();
        setLocation();
      });
      window.location.reload();
      AppToaster.show({
        message: "Location label added successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    const addLocation = () => {
      axios.put("http://localhost:3000/locations/2", { label, x, y, space }).then((response) => {
        setLabel();
        setX();
        setY();
        setSpace();
      });
      window.location.reload();
      AppToaster.show({
        message: "Location added successfully",
        intent: "success",
        timeout: 3000,
      });
    }

    const flyDrone = () => {
      axios.put("http://localhost:3000/locations/3", { id4, tag4, destination }).then((response) => {
        setId();
        setTag();
        setDestination();
      });
      window.location.reload();
      AppToaster.show({
        message: "Drone flone succesfully",
        intent: "success",
        timeout: 3000,
      });
    }
  
    return (
      <div className="Locations">
        <table className="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Label</th>
              <th>X Coordinate</th>
              <th>Y Coordinate</th>
              <th>Number of Restaurants</th>
              <th>Number of Delivery Services</th>
              <th>Number of Drones</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => {
              const { label, x_coord, y_coord, num_restaurants, num_delivery_services, num_locations } = location;
              return (
                <tr key={index}>
                  <td>{label}</td>
                  <td>{x_coord}</td>
                  <td>{y_coord}</td>
                  <td>{num_restaurants}</td>
                  <td>{num_delivery_services}</td>
                  <td>{num_locations}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {<tr>
              <td>
                <InputGroup
                  placeholder="Add name here..."
                  value={long_name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add rating here..."
                  value={rating}
                  onChange={(e) => {
                    setRating(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add spent here..."
                  value={spent}
                  onChange={(e) => {
                    setSpent(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add location here..."
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={addLocationLabel}>
                  Add Location Label
                </Button>
              </td>
            </tr>}

            {<tr>
              <td>
                <InputGroup
                  placeholder="Add label here..."
                  value={label}
                  onChange={(e) => {
                    setLabel(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add x-coordinate here..."
                  value={x}
                  onChange={(e) => {
                    setX(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add y-coordinate here..."
                  value={y}
                  onChange={(e) => {
                    setY(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add space here..."
                  value={space}
                  onChange={(e) => {
                    setSpace(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={addLocation}>
                  Add Location
                </Button>
              </td>
                </tr>}

                {<tr>
              <td>
                <InputGroup
                  placeholder="Add ID here..."
                  value={id4}
                  onChange={(e) => {
                    setId(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add tag here..."
                  value={tag4}
                  onChange={(e) => {
                    setTag(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Add destination here..."
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={flyDrone}>
                  Fly Drone
                </Button>
              </td>
                </tr>}

          </tfoot>
        </table>
      </div>
    );
  }
  
  export default Locations;