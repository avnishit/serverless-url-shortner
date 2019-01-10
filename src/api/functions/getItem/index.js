/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 *
 */

/* @flow */

export const handler = (_event: any, _context: any, callback: any) => {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hey - from lambda',
    }),
  });
};
