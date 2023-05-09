/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { LIMIT, PAGE, METHOD } = require('./constant');
const { reqParam, reqBody } = require('./custom');

exports.dynamicFilter = (req, column = []) => {
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

exports.paging = (req, defaultOrder = []) => {
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

exports.dynamicFilterJoin = (req, column = []) => {
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

exports.dynamicOrder = (filter = {}) => {
  let order;
  if (typeof filter.direction === 'string' && typeof filter.order === 'string') {
    order = [
      { column: filter.direction, order: filter.order }
    ];
  } else {
    const dir = filter.direction;
    const or = filter.order;
    const content = [];
    for (const a in dir) {
      content.push({ column: dir[a], order: or[a] });
    }
    order = content;
  }

  return order;
};

exports.requestOptions = (options, query) => {
  if (options?.order) {
    query.orderBy(options.order);
  }
  if (options?.filter?.limit) {
    query.limit(options.filter.limit);
  }
  if (options?.filter?.page && options?.filter?.limit) {
    query.offset((options.filter.page - 1) * options.filter.limit);
  }
  return query;
};

exports.isSoftDeleted = (where, builder, isSingle) => {
  builder.where(where);
  if (isSingle) builder.andWhere('deleted_at', null);
  return builder;
};

exports.optionsPayload = (req, type_method, column) => {
  const where = reqParam(req);
  const payload = reqBody(req);
  where.deleted_at = null;
  const options = {
    where,
    type_method,
    column,
    payload
  };

  return options;
};

exports.updateType = (req) => {
  let type = '';
  if (req?.method === METHOD.DEL) {
    type = 'soft-delete';
  } else {
    type = 'update';
  }

  return type;
};
