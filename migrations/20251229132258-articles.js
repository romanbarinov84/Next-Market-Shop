//eslint-disable-next-line @typescript-eslint/no-require-imports
const articles = require("./articlesDataBase.json");

module.exports = {
 
  async up(db, client) {
    await db.collection("articles").insertMany(articles)
  },

  
  async down(db, client) {
   
  }
};
