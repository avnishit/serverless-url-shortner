let getHostName = url => {
  let urlParts = url
    .replace('http://', '')
    .replace('https://', '')
    .split(/[/?#]/);
  return urlParts[0];
};

let getDomain = url => {
  var hostName = getHostName(url);
  var domain = hostName;

  if (hostName !== null) {
    var parts = hostName.split('.').reverse();

    if (parts !== null && parts.length > 1) {
      domain = parts[1] + '.' + parts[0];

      if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
        domain = parts[2] + '.' + domain;
      }
    }
  }

  return domain;
};

// Can be extended
let getIpfromHeader = (headers, identity) => {
  let xff = [],
    sIp = [];
  if (headers['X-Forwarded-For'] && headers['X-Forwarded-For'].length > 0) {
    xff = headers['X-Forwarded-For'];
    if (xff.length > 1) xff.pop();
  }
  if (identity && identity.sourceIp && identity.sourceIp.length > 0)
    sIp.push(identity.sourceIp);
  if (xff.length > 0) return xff;
  else return sIp;
};

export default {
  getHostName,
  getDomain,
  getIpfromHeader,
};

/*
let getHostName = (url) => {
 var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
 if (match !== null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
 return match[2];
 }
 else {
     return null;
 }
}
*/
