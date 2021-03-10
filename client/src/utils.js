const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    rv[x[key]] = true || [];
    return rv;
  }, {});

const products = [];

const categories = Object.keys(groupBy(products, "category"));

console.log(categories); /* empty */
