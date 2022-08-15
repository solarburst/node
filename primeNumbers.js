import colors from "colors";

const getPrimes = (num) => {
  const sieve = [];
  const primes = [];
  for (let i = 2; i <= num; ++i) {
    if (!sieve[i]) {
      // i has not been marked -- it is prime
      primes.push(i);
      for (let j = i << 1; j <= num; j += i) {
        sieve[j] = true;
      }
    }
  }
  return primes;
};

const breakUp = (array) => {
  for (let i = 0; i < array.length; i += 3) {
    const tmp = array.slice(i, i + 3);
    console.log(colors.green(`${tmp[0]}`));
    console.log(colors.yellow(`${tmp[1]}`));
    console.log(colors.red(`${tmp[2]}`));
  }
};

console.log(breakUp(getPrimes(14)));
