async function sendTopMovies() {
  const customer = await getCostumer(1);
  console.log("Customer:", customer);
  if (customer.isGold) {
    const movies = await getTopMovies();
    console.log("Top movies:", movies);
    await sendEmail(customer.email, movies);
    console.log("Email sent...");
  }
}

async function getCostumer(id) {
  setTimeout(() => {
    return { id, name: "Fulano", isGold: "true", email: "fulano@gmail.com" };
  }, 4000);
}

async function getTopMovies() {
  setTimeout(() => {
    return ["movie1", "movie2"];
  }, 2000);
}

async function sendEmail(email, body) {
  setTimeout(() => {
    console.log("Sending email");
  }, 2500);
}

sendTopMovies(1);
