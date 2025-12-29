
//eslint-disable-next-line @typescript-eslint/no-require-imports
const products = require("./dataBase.json");

module.exports = {
  
  async up(db, client) {
   await db.collection("products").insertMany(products)
  },

 
  async down(db, client) {
    
  }
};
