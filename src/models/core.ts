import pgCore from '../config/database';
import { RequestOptionsInterface } from '../interface/request_interface';
import { todayFormat } from '../utils/date';

const format = todayFormat('YYYYMMDDhmmss');
export const coreUpdate = async (options: RequestOptionsInterface) => {
  /* eslint-disable no-restricted-syntax */
  const loop = (rows: any) => {
    options.payload.deleted_at = new Date().toISOString();
    // eslint-disable-next-line guard-for-in
    for (const prop in options?.column.shift()) {
      options.payload[options?.column[prop]] = `archived-${format}-${
        rows[options?.column[prop]]
      }`;
    }

    return options;
  };

  if (options?.typeMethod === 'soft-delete') {
    const [rows] = await pgCore(options?.table)
      .where(options?.where)
      .select(options?.column);
    options.payload.deleted_at = new Date().toISOString();
    if (rows) {
      loop(rows);
    }
  }
  const [result] = await pgCore(options?.table)
    .where(options?.where)
    .update(options?.payload)
    .returning(options?.column);

  return result;
};

export const checkSameValueinDb = async (options: RequestOptionsInterface) => {
  const [rows] = await pgCore(options?.table)
    .where(options?.where)
    .select(options?.column);
  if (rows) {
    throw new Error(options.message);
  }
};

export const checkSameValueinDbUpdate = async (
  options: RequestOptionsInterface
) => {
  const [rows] = await pgCore(options?.table)
    .where(options?.where)
    .select(options?.column);
  const id = rows?.[options?.column];
  if (options?.type === 'uuid') {
    if (id !== options?.name) {
      throw new Error(options.message);
    }
  } else if (+id !== Number(options?.name)) {
    throw new Error(options.message);
  }
};
