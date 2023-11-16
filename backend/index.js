const express = require("express");
const {

  getAllEmployees,
  getAllPilots,
  getAllLocations,
  getAllServices,
  getAllPackages,
  addPackage,
  removeDrone,
  removePilot,
  addDrone,
  addPilot,
  loadDrone,
  addRestaurant,
  addLocation,
  addService,
  addEmployee,
  hireEmployee,
  removeStudent,
  manageService,
  addWorker,
  takeoverDrone,
  joinSwarm,
  leaveSwarm,
  refuelDrone,
  flyDrone,
  purchasePackage,
  deletePackage
} = require("./utils/queryHelpers");
const app = express();
const cors = require("cors");
const { appendFile } = require("fs");
require("dotenv").config()

const genericError = "Sorry, something went wrong!";

app.use(express.json());

const whitelist = ["http://localhost:3001"]; //Change to react port
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/employees", async function (request, response) {
  try {
    const [result] = await getAllEmployees();
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.put("/employees/1", async function (request, response) {
  try {
    const { username, id } = request.body;
    const [result] = await hireEmployee(username, id);
    const [data] = await getAllEmployees(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't hire",
    });
  }
});

app.put("/employees/2", async function (request, response) {
  try {
    const { usernameF, idF } = request.body;
    const [result] = await removeStudent(usernameF, idF);
    const [data] = await getAllEmployees(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't remove ",
    });
  }
});

app.put("/employees/7", async function (request, response) {
  try {
    const { usernameA, first_nameA, last_nameA, addressA, birthdateA, GTIDA, hiredA, experienceA } = request.body;
    const [result] = await addEmployee(usernameA, first_nameA, last_nameA, addressA, birthdateA, GTIDA, hiredA, experienceA);
    const [data] = await getAllEmployees(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't add employee",
    });
  }
});

app.get("/pilots", async function (request, response) {
  try {
    const [result] = await getAllPilots();
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.put("/pilots/1", async function (request, response) {
  try {
    const { usernameP, id, tag } = request.body;
    const [result] = await takeoverDrone(usernameP, id, tag);
      const [data] = await getAllPilots(result.insertId);
      response.send({ success: true, result: data[0] });
  } catch (error) {
      response.status(500).send({
      success: false,
      error: "couldn't take over drone",
    });
  }
});

app.put("/pilots/2", async function (request, response) {
  try {
    const { id1, tag1, leaderTag } = request.body;
    const [result] = await joinSwarm(id1, tag1, leaderTag);
    if (result.affectedRows) {
      const [data] = await getAllPilots(result.insertId);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(500).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't join swarm",
    });
  }
});

app.put("/pilots/3", async function (request, response) {
  try {
    const { id2, swarmTag} = request.body;
    const [result] = await leaveSwarm(id2, swarmTag);
    if (result.affectedRows) {
      const [data] = await getAllPilots(result.insertId);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(500).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't leave swarm",
    });
  }
});

app.put("/pilots/4", async function (request, response) {
  try {
    const { id3, tag3, moreFuel} = request.body;
    const [result] = await refuelDrone(id3, tag3, moreFuel);
    if (result.affectedRows) {
      const [data] = await getAllPilots(result.insertId);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(500).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't refuel drone",
    });
  }
});

app.put("/pilots/8", async function (request, response) {
  try {
    const { usernameB, IDB, expB } = request.body;
    const [result] = await addPilot(usernameB, IDB, expB);
    const [data] = await getAllPilots(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
    success: false,
    error: "couldn't add pilot",
    });
  }
});

app.put("/pilots/9", async function (request, response) {
  try {
    const { idD, tagD, fuelD, capacityD, salesD, flown_byD } = request.body;
    const [result] = await addDrone(idD, tagD, fuelD, capacityD, salesD, flown_byD);
    const [data] = await getAllPilots(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
    success: false,
    error: "couldn't add drone",
    });
  }
});

//removeDrone
app.put("/pilots/7", async function (request, response) {
  try {
    const { id4, tag4 } = request.body;
    const [result] = await removeDrone(id4, tag4);
    const [data] = await getAllPilots(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
    success: false,
    error: "couldn't remove drone",
    });
  }
});

app.delete("/pilots/:username", async function (request, response) {
  try {
    const { username } = request.params;
    const [result] = await removePilot(username);
    response.send({ success: true });
  } catch (error) {
    response.send({ 
      success: true, 
      error: error.message
    });
  }
});


app.get("/services", async function (request, response) {
  try {
    const [result] = await getAllServices();
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.put("/services/1", async function (request, response) {
  try {
    const { usernameM, idM } = request.body;
    const [result] = await manageService(usernameM, idM);
    const [data] = await getAllServices(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't add funding request",
    });
  }
});

app.put("/services/5", async function (request, response) {
  try {
    const { usernameW } = request.body;
    const [result] = await addWorker(usernameW);
    const [data] = await getAllServices(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't add worker",
    });
  }
});

app.put("/services/6", async function (request, response) {
  try {
    const { idL, long_nameL, home_baseL, managerL } = request.body;
    const [result] = await addService(idL, long_nameL, home_baseL, managerL);
    const [data] = await getAllServices(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't add service",
    });
  }
});


app.get("/locations", async function (request, response) {
  try {
    const [result] = await getAllLocations();
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.put("/locations/1", async function (request, response) {
  try {
    const { long_name, rating, spent, location } = request.body;
    const [result] = await addRestaurant(long_name, rating, spent, location);
    const [data] = await getAllLocations(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't insert location label",
    });
  }
});

app.put("/locations/2", async function (request, response) {
  try {
    const { label, x, y, space } = request.body;
    const [result] = await addLocation(label, x, y, space);
    const [data] = await getAllLocations(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't insert location",
    });
  }
});

app.put("/locations/3", async function (request, response) {
  try {
    const { id4, tag4, destination } = request.body;
    const [result] = await flyDrone(id4, tag4, destination);
    const [data] = await getAllLocations(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: "couldn't fly drone",
    });
  }
});

app.get("/packages", async function (request, response) {
  try {
    const [result] = await getAllPackages();
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.put("/packages", async function (request, response) {
  try {
    const { id, tag, barcode, packages, price } = request.body;
    const [result] = await loadDrone(id, tag, barcode, packages, price);
    const [data] = await getAllPackages(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});


app.put("/packages2", async function (request, response) {
  try {
    const { longName, id5, tag5, barcode2, quantity } = request.body;
    const [result] = await purchasePackage(longName, id5, tag5, barcode2, quantity);
    const [data] = await getAllPackages(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});


app.put("/packages/5", async function (request, response) {
  try {
    const { barcodeY, nameY, weightY } = request.body;
    const [result] = await addPackage(barcodeY, nameY, weightY);
    const [data] = await getAllPackages(result.insertId);
    response.send({ success: true, result: data[0] });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.delete("/packages/:barcode3", async function (request, response) {
  try {
    const { barcode3 } = request.params;
    const [result] = await deletePackage(barcode3);
    console.log(barcode3, result)
    response.send({ success: true });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.listen(3000);
