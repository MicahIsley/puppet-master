var axios = require("axios");

var helpers = {
	getSaved: function() {
		return axios.get("/wish/wishList")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
	},
	deleteSaved: function(user, name, category, note) {
    return axios.delete("/wish/deleteWish", {
      params: {
        "user": user,
        "name": name,
        "category": category,
        "note": note
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  }
};

module.exports = helpers;