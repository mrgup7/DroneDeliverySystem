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

function Packages() {
  const [packages, setpackages] = useState([]);
  const [id, setID] = useState();
  const [tag, setTag] = useState();
  const [barcode, setBarcode] = useState("");
  const [packets, setPackets] = useState();
  const [price, setPrice] = useState();

  const [longName, setLongName] = useState();
  const [id5, setID5] = useState();
  const [tag5, setTag5] = useState();
  const [barcode2, setBarcode2] = useState();
  const [quantity, setQuantity] = useState();

  const [barcodeY, setBarcodeY] = useState();
  const [nameY, setNameY] = useState();
  const [weightY, setWeightY] = useState();

  const [barcode3, setBarcode3] = useState();


  useEffect(() => {
    axios.get("http://localhost:3000/packages").then((response) => {
      const { data } = response;
      setpackages(data.result);
    });
  }, []);

  const deletePackage = () => {
    axios.delete(`http://localhost:3000/packages/${barcode3}`).then((response) => {
      window.location.reload();
      AppToaster.show({
        message: "Package deleted successfully",
        intent: "success",
        timeout: 3000,
      });
    });
  };

  const loadDrone = () => {
      axios.put("http://localhost:3000/packages", { id, tag, barcode, packets, price }).then((response) => {
          setID("");
          setTag();
          setBarcode("");
          setPackets();
          setPrice();
      });
      window.location.reload();
      AppToaster.show({
        message: "Data updated successfully",
        intent: "success",
        timeout: 3000,
      });
  }

  const purchasePackage = () => {
    axios.put("http://localhost:3000/packages2", { longName, id5, tag5, barcode2, quantity }).then((response) => {
        setLongName();    
        setID5();
        setTag5();
        setBarcode2();
        setQuantity();
    });
    window.location.reload();
    AppToaster.show({
      message: "Package Purchased Successfully",
      intent: "success",
      timeout: 3000,
    });
}

const addPackage = () => {
  axios.put("http://localhost:3000/packages/5", { barcodeY, nameY, weightY}).then((response) => {
      setBarcodeY();
      setNameY();
      setWeightY();
  });
  window.location.reload();
  AppToaster.show({
    message: "Package added successfully",
    intent: "success",
    timeout: 3000,
  });
}

  return (
    <div className="packages">
      <table className="bp4-html-table .modifier">
        <thead>
          <tr>
            <th>Package</th>
            <th>Location</th>
            <th>Amount Available</th>
            <th>Low Price</th>
            <th>High Price</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pack, index) => {
            const { package_name, hover, amount_available, low_price, high_price } = pack; 
            return (
              <tr key={index}>
                <td>{package_name}</td>
                <td>{hover}</td>
                <td>{amount_available}</td>
                <td>{low_price}</td>
                <td>{high_price}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
              <td>
                <InputGroup
                  placeholder="Add barcode here..."
                  value={barcode3}
                  onChange={(e) => {
                    setBarcode3(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={deletePackage}>
                  Delete Package
                </Button>
              </td>
            </tr>
          {<tr>
            <td>
              <InputGroup
                placeholder="Add id here..."
                value={id}
                onChange={(e) => {
                  setID(e.target.value)
                }}
              />
              <InputGroup
                placeholder="Add tag here..."
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value)
                }}
              />
              <InputGroup
                placeholder="Add barcode here..."
                value={barcode}
                onChange={(e) => {
                  setBarcode(e.target.value)
                }}
              />
              <InputGroup
                placeholder="Add more packets here..."
                value={packets}
                onChange={(e) => {
                  setPackets(e.target.value)
                }}
              />
              <InputGroup
                placeholder="Add price here..."
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              />
            </td>
            <td>
              <Button intent="success" onClick={loadDrone}>
                Load Drone
              </Button>
            </td>
          </tr>}

          {<tr>
            <td>
              <InputGroup
                placeholder="Add name here..."
                value={longName}
                onChange={(e) => {
                  setLongName(e.target.value)
                }}
              />
              <InputGroup
                placeholder="Add ID here..."
                value={id5}
                onChange={(e) => {
                  setID5(e.target.value)
                }}
              />
              <InputGroup
                placeholder="Add tag here..."
                value={tag5}
                onChange={(e) => {
                  setTag5(e.target.value)
                }}
              />
              <InputGroup
                placeholder="Add barcode here..."
                value={barcode2}
                onChange={(e) => {
                  setBarcode2(e.target.value)
                }}
              />
              <InputGroup
                placeholder="Add quantity here..."
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value)
                }}
              />
            </td>
            <td>
              <Button intent="success" onClick={purchasePackage}>
                Purchase Package
              </Button>
            </td>
          </tr>}

        

          {<tr>
              <td>
                <InputGroup
                  placeholder="Barcode here..."
                  value={barcodeY}
                  onChange={(e) => {
                    setBarcodeY(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Name here..."
                  value={nameY}
                  onChange={(e) => {
                    setNameY(e.target.value)
                  }}
                />
                <InputGroup
                  placeholder="Weight here..."
                  value={weightY}
                  onChange={(e) => {
                    setWeightY(e.target.value)
                  }}
                />
              </td>
              <td>
                <Button intent="success" onClick={addPackage}>
                  Add Package
                </Button>
              </td>
            </tr>}

        </tfoot>
      </table>
    </div>
  );
}

export default Packages;