import { initialiseTestDB } from '~/database/__test__/Setup';
import getUrl from '~/api/functions/getUrl';
import getHash from '~/api/functions/getHash';
import getStatByHash from '~/api/functions/getStatByHash';
import getStatByUrl from '~/api/functions/getStatByUrl';

describe('End To End Test', () => {
  beforeAll(() => {
    return initialiseTestDB(__filename);
  });

  let insertItem = url => {
    const item = { url: url };
    return Promise.resolve()
      .then(() => getHash(item))
      .then(Item => {
        expect(Item.hash).toBe('0000001');
        return getUrl(Item.hash);
      })
      .then(Item => {
        expect(Item).toEqual(expect.objectContaining(item));
      });
  };

  test('Insert Item 1', () => insertItem('https://www.dathuis.nl'))
    .then(() =>
      test('Insert Item 2', () => insertItem('https://www.dathuis.nl/agents')),
    )
    .then(() => test('Insert Item 3', () => insertItem('papaparse')));

  /*
  .then(() => {
   test('Fectch items', () => {
    const item1 = { hash: '0000001' };
    const item2 = { hash: '0000002' };
    const item3 = { hash: '0000003' };
    return Promise.resolve()
      .then(() => getUrl(item1.hash))
      .then(Item => {
        expect(Item).toEqual(expect.objectContaining(item1));
        return getUrl(item2);
      })
      .then(Item => {
        expect(Item).toEqual(expect.objectContaining(item2));
        return getUrl(item2);
      })
      .then(Item => {
        expect(Item).toEqual(expect.objectContaining(item3));
      });
  });
/*
  test('Stats', () => {
    const item1 = { hash: '0000001' };
    const item1u = { url: 'https://www.dathuis.nl' };
    const item2 = { hash: '0000002' };
    const item2u = { url: 'https://www.dathuis.nl/agents' };
    const item3 = { hash: '0000003' };
    const item3u = { url: 'https://papaparse.com' };
    return Promise.resolve()
      .then(() => getUrl(item1.hash))
      .then(Item => {
        expect(Item).toEqual(expect.objectContaining(item1u));
        return getUrl(item2.hash);
      })
      .then(Item => {
        expect(Item).toEqual(expect.objectContaining(item2u));
        return getUrl(item2.hash);
      })
      .then(Item => {
        expect(Item).toEqual(expect.objectContaining(item3u));
      });
  });

});
*/
});
