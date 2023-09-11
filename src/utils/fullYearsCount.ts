export const fullYearsCount = (birthDate: string) => {
  const dateArray = birthDate.split("-");
  const year = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]) - 1;
  const day = parseInt(dateArray[2]);
  const givenDate = new Date(year, month, day);

  const currentDate = new Date();

  const timeDifference = +currentDate - +givenDate;

  const millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;

  const fullYearsPassed = Math.floor(timeDifference / millisecondsPerYear);

  return `${fullYearsPassed} years old`;
};
