/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Tests for SFATable Uuid
 */

/* @flow */

import Domain from '../index';

describe('Domain Validation', () => {
  it('hostName', () => {
    expect(Domain.getHostName('http://WWW.first.com/folder/page.html')).toBe(
      'WWW.first.com',
    );
  });

  it('domain', () => {
    expect(
      Domain.getDomain('http://sub.first-STUFF.com/folder/page.html?q=1'),
    ).toBe('first-STUFF.com');
  });
});

/*
http://WWW.first.com/folder/page.html
first.com
http://mail.google.com/folder/page.html
mail.google.com
https://mail.google.com/folder/page.html
mail.google.com
http://www2.somewhere.com/folder/page.html?q=1
somewhere.com
https://www.another.eu/folder/page.html?q=1
another.eu
*/

/*
http://sub.first-STUFF.com/folder/page.html?q=1
first-STUFF.com
http://www.amazon.com/gp/registry/wishlist/3B513E3J694ZL/?tag=123
amazon.com
http://sub.this-domain.co.uk/folder
this-domain.co.uk
http://mail.google.com/folder/page.html
google.com
https://mail.google.com/folder/page.html
google.com
http://www2.somewhere.com/folder/page.html?q=1
somewhere.com
https://www.another.eu/folder/page.htmlq=1
another.eu
https://my.sub.domain.get.com:567/folder/page.html?q=1
get.com
*/
