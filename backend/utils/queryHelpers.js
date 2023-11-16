const getConnection = require("./db");

const getAllEmployees = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select * from display_employee_view"
  )
};

const getAllPilots = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select * from display_pilot_view"
  )
};

const getAllLocations = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select * from display_location_view"
  )
};

const getAllPackages = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select * from display_package_view"
  )
};

const getAllServices = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select * from display_service_view"
  )
};

const removeDrone = async(id4, tag4) => {
  const connection = await getConnection();
  return connection.execute('CALL remove_drone(?, ?)', [id4, tag4])
}

const removePilot = async(username) => {
  const connection = await getConnection();
  return connection.execute('CALL remove_pilot_role(?)', [username]) 
}

const addPilot = async(usernameB, IDB, expB) => {
  const connection = await getConnection();
  return connection.execute('CALL add_pilot_role(?, ?, ?)', [usernameB, IDB, expB]) 
}

const addPackage = async(barcodeY, nameY, weightY) => {
  const connection = await getConnection();
  return connection.execute('CALL add_package(?, ?, ?)', [barcodeY, nameY, weightY])
}

const loadDrone = async(id, tag, barcode, packages, price) => {
  const connection = await getConnection();
  return connection.execute('CALL load_drone(?, ?, ?, ?, ?)', [id, tag, barcode, packages, price])
}

const addDrone = async(idD, tagD, fuelD, capacityD, salesD, flown_byD) => {
  const connection = await getConnection();
  return connection.execute('CALL add_drone(?, ?, ?, ?, ?, ?)', [idD, tagD, fuelD, capacityD, salesD, flown_byD])
}

const addRestaurant = async(long_name, rating, spent, location) => {
  const connection = await getConnection();
  return connection.execute('CALL add_restaurant(?, ?, ?, ?)', [long_name, rating, spent, location])
}

const addLocation = async(label, x, y, space) => {
  const connection = await getConnection();
  return connection.execute('CALL add_location(?, ?, ?, ?)', [label, x, y, space])
}

const addService = async(idL, long_nameL, home_baseL, managerL) => {
  const connection = await getConnection();
  return connection.execute('CALL add_service(?, ?, ?, ?)', [idL, long_nameL, home_baseL, managerL])
}

const addEmployee = async(usernameA, first_nameA, last_nameA, addressA, birthdateA, GTIDA, hiredA, experienceA) => {
  const connection = await getConnection();
  return connection.execute('CALL add_employee(?, ?, ?, ?, ?, ?, ?, ?, ?)', [usernameA, first_nameA, last_nameA, addressA, birthdateA, GTIDA, hiredA, experienceA])
}

const hireEmployee = async(username, id) => {
  const connection = await getConnection();
  return connection.execute('CALL hire_employee(?,?)', [username, id])
}

const removeStudent = async(usernameF, idF) => {
  const connection = await getConnection();
  return connection.execute('CALL remove_Student(?,?)', [usernameF, idF])
}

const manageService = async(usernameM, idM) => {
  const connection = await getConnection();
  return connection.execute('CALL manage_service(?,?)', [usernameM, idM])
}

const addWorker = async(usernameW) => {
  const connection = await getConnection();
  return connection.execute('CALL add_worker_role(?)', [usernameW])
}

const takeoverDrone = async(usernameP, id, tag) => {
  const connection = await getConnection();
  return connection.execute('CALL takeover_drone(?,?,?)', [usernameP, id, tag])
}

const joinSwarm = async(id1, tag1, leaderTag) => {
  const connection = await getConnection();
  return connection.execute('CALL join_swarm(?,?,?)', [id1, tag1, leaderTag])
}

const leaveSwarm = async(id2, swarmTag) => {
  const connection = await getConnection();
  return connection.execute('CALL leave_swarm(?,?)', [id2, swarmTag])
}

const refuelDrone = async(id3, tag3, moreFuel) => {
  const connection = await getConnection();
  return connection.execute('CALL refuel_drone(?,?,?)', [id3, tag3, moreFuel])
}

const flyDrone = async(id4, tag4, destination) => {
  const connection = await getConnection();
  return connection.execute('CALL fly_drone(?,?,?)', [id4, tag4, destination])
}

const purchasePackage = async(longName, id5, tag5, barcode2, quantity) => {
  const connection = await getConnection();
  return connection.execute('CALL purchase_package(?,?,?,?,?)', [longName, id5, tag5, barcode2, quantity])
}

const deletePackage = async(barcode3) => {
  const connection = await getConnection();
  return connection.execute('CALL remove_package(?)', [barcode3])
}

module.exports = {
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
};
