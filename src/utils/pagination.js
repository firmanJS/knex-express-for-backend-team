/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { LIMIT, PAGE } = require('./constant');

const dynamicFilter = (req, column = []) => {
  const push = {};
  const asArray = Object.entries(req.query);
  const filtered = asArray.filter(([key]) => column.includes(key));
  const newObject = Object.fromEntries(filtered);

  for (const prop in newObject) {
    if (prop) {
      push[prop] = newObject[prop];
    }
  }
  return push;
};

const paging = (req, defaultOrder = []) => {
  const direction = req.query.direction || defaultOrder[0];
  const order = req.query.order || defaultOrder[1];
  const page = +req.query.page || PAGE;
  const limit = +req.query.limit || LIMIT;
  const search = req?.query?.search;

  return {
    order,
    direction,
    page,
    limit,
    search,
  };
};

const dynamicFilterJoin = (req, column = []) => {
  const request = Object.entries(req.query);
  const data = {};

  for (const [i, v] of request) {
    const check = column.filter((item) => item.split('.').pop() === i);
    if (check.length) {
      data[check] = v;
    }
  }
  return data;
};

const dynamicOrder = (filter = {}) => {
  let order
  if (typeof filter.direction === 'string' && typeof filter.order === 'string') {
    order = [
      { column: filter.direction, order: filter.order }
    ]
  } else {
    const dir = filter.direction
    const or = filter.order
    const content = []
    for (const a in dir) {
      content.push({ column: dir[a], order: or[a] })
    }
    order = content
  }

  return order
}

module.exports = {
  paging,
  dynamicFilter,
  dynamicFilterJoin,
  dynamicOrder
};
