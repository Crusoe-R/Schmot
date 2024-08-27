
const updateDB = async () => {
  fetch("https://api.arsha.io/v2/eu/market")
    .then((res) => {
      if (!res.ok) {
        console.log("No Success");
      }
      return res.json();
    })
    .then((data) => {
      console.log("fetching market data");
      const promises = data.map((item) => {
        if (item.id === 715016) {
          console.log("kriegsmesser found");
        }
        return db.set(item.id, {
          price: item.basePrice,
          name: item.name,
          stock: item.currentStock,
        });
      });

      Promise.all(promises)
        .then(() => {
          console.log("Successfully updated database with market data");
          db.get(715016).then((value) => {
            console.log(value);
          });
          // Retrieve and log a specific item from the database
          db.get(1041)
            .then((item) => {
              console.log("Retrieved item from the database:");
              console.log(item);
            })
            .catch((error) => {
              console.error(
                "Error retrieving specific item from the database:",
                error,
              );
            });
        })
        .catch((error) => {
          console.error("Error updating database with market data:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export default updateDB;
