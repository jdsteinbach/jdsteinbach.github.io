'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-env serviceworker */

var cacheName = 'files';

addEventListener('fetch', function (fetchEvent) {
  var request = fetchEvent.request;
  if (request.method !== 'GET') {
    return;
  }
  fetchEvent.respondWith(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var fetchPromise, responseFromCache;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fetchPromise = fetch(request);

            fetchEvent.waitUntil(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var responseFromFetch, responseCopy, myCache;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return fetchPromise;

                    case 2:
                      responseFromFetch = _context.sent;
                      responseCopy = responseFromFetch.clone();
                      _context.next = 6;
                      return caches.open(cacheName);

                    case 6:
                      myCache = _context.sent;
                      return _context.abrupt('return', myCache.put(request, responseCopy));

                    case 8:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }))());

            if (!request.headers.get('Accept').includes('text/html')) {
              _context2.next = 12;
              break;
            }

            _context2.prev = 3;
            return _context2.abrupt('return', fetchPromise);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](3);
            return _context2.abrupt('return', caches.match(request));

          case 10:
            _context2.next = 16;
            break;

          case 12:
            _context2.next = 14;
            return caches.match(request);

          case 14:
            responseFromCache = _context2.sent;
            return _context2.abrupt('return', responseFromCache || fetchPromise);

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[3, 7]]);
  }))());
});