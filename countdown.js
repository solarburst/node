let end = new Date("Aug 9, 2022 00:43:00").getTime();

const countdown = setInterval(() => {
  let now = new Date().getTime();
  let distance = end - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (days < 0) {
    clearInterval(countdown);
    console.error("Error");
  }

  if (distance > 0) {
    console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
  }

  if (distance === 0 || seconds === 0) {
    clearInterval(countdown);
    console.log("Timeout");
  }
}, 1000);
