const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      // Loop through each set in setData
      setData.forEach((set) => {
        // Find the corresponding theme using set's theme_id
        const theme = themeData.find((theme) => theme.id === set.theme_id);
  
        // Create a new set object with an additional 'theme' property
        const newSet = {
          set_num: set.set_num,
          name: set.name,
          year: set.year,
          theme_id: set.theme_id,
          num_parts: set.num_parts,
          img_url: set.img_url,
          theme: theme ? theme.name : "Unknown", // Default to "Unknown" if theme not found
        };
  
        // Push the new set object to the 'sets' array
        sets.push(newSet);
      });
      resolve(); // Resolve with no data once the operation is complete
    } catch (error) {
      reject(error); // Reject with an error message if an error occurs
    }
  });
}

function getAllSets() {
  return new Promise((resolve, reject) => {
    if (sets.length === 0) {
      reject("No sets available"); // Reject with an error message if no sets are available
    } else {
      resolve(sets); // Resolve with the completed 'sets' array
    }
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const foundSet = sets.find((set) => set.set_num === setNum);
    if (foundSet) {
      resolve(foundSet); // Resolve with the found set object
    } else {
      reject(`Unable to find set with set number: ${setNum}`); // Reject with an error message if set is not found
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    const themeLowerCase = theme.toLowerCase();
    const matchingSets = sets.filter((set) =>
      set.theme.toLowerCase().includes(themeLowerCase)
    );
    if (matchingSets.length > 0) {
      resolve(matchingSets); // Resolve with found set objects
    } else {
      reject(`Unable to find sets with theme: ${theme}`); // Reject with an error message if no sets are found
    }
  });
}

// Export the functions as a module
module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
};


















// const setData = require("../data/setData");
// const themeData = require("../data/themeData");

// let sets = [];

// function Initialize() {
//     // Loop through each set in setData
//     setData.forEach((set) => {
//       // Find the corresponding theme using set's theme_id
//       const theme = themeData.find((theme) => theme.id === set.theme_id);
  
//       // Create a new set object with an additional 'theme' property
//       const newSet = {
//         set_num: set.set_num,
//         name: set.name,
//         year: set.year,
//         theme_id: set.theme_id,
//         num_parts: set.num_parts,
//         img_url: set.img_url,
//         theme: theme ? theme.name : "Unknown", // Default to "Unknown" if theme not found
//       };
  
//       // Push the new set object to the 'sets' array
//       sets.push(newSet);
//     });
//   }
  
//   function getAllSets() {
//     return sets;
//   }
  
//   function getSetByNum(setNum) {
//     return sets.find((set) => set.set_num === setNum);
//   }
  
//   function getSetsByTheme(theme) {
//     const themeLowerCase = theme.toLowerCase();
//     return sets.filter((set) => set.theme.toLowerCase().includes(themeLowerCase));
//   }
  
