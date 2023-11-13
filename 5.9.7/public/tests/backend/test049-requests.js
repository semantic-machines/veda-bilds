export default [
  {
    'request': {
      'id': 1,
      'method': 'OPTIONS',
      'path': '/',
    },
    'response': {
      'status': '200',
      'headers': {
        'allow': 'GET,HEAD,PUT,OPTIONS,DELETE,PROPFIND,COPY,MOVE',
        'dav': '1,2',
      },
    },
  },
  {
    'request': {
      'id': 2,
      'method': 'HEAD',
      'path': '/test.docx',
    },
    'response': {
      'status': '200',
      'headers': {
        'last-modified': '',
        'etag': '',
        'content-type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document; charset=UTF-8',
        'content-disposition': 'inline; filename*=UTF-8\'\'test.docx',
        'accept-ranges': 'bytes',
        // 'content-length': '',
      },
    },
  },
  {
    'request': {
      'id': 3,
      'method': 'OPTIONS',
      'path': '',
      'headers': {
        'translate': 'f',
      },
    },
    'response': {
      'status': '200',
      'headers': {
        'allow': 'GET,HEAD,PUT,OPTIONS,DELETE,PROPFIND,COPY,MOVE',
        'dav': '1,2',
      },
    },
  },
  {
    'request': {
      'id': 4,
      'method': 'PROPFIND',
      'path': '',
      'headers': {
        'depth': '0',
        'translate': 'f',
      },
    },
    'response': {
      'status': '207',
      'headers': {
        'content-type': 'application/xml; charset=utf-8',
      },
    },
  },
  {
    'request': {
      'id': 5,
      'method': 'PROPFIND',
      'path': '/test.docx',
      'headers': {
        'depth': '0',
        'translate': 'f',
      },
    },
    'response': {
      'status': '207',
      'headers': {
        'content-type': 'application/xml; charset=utf-8',
      },
    },
  },
  {
    'request': {
      'id': 6,
      'method': 'LOCK',
      'path': '/test.docx',
      'headers': {
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'content-type': 'text/xml; charset="utf-8"',
        'translate': 'f',
        'timeout': 'Second-3600',
      },
      'body': '<?xml version="1.0" encoding="utf-8" ?><D:lockinfo xmlns:D="DAV:"><D:lockscope><D:exclusive/></D:lockscope><D:locktype><D:write/></D:locktype><D:owner><D:href>SLPK\\optiflos</D:href></D:owner></D:lockinfo>',
    },
    'response': {
      'status': '200',
      'headers': {
        'content-type': 'application/xml; charset=utf-8',
        'lock-token': '',
      },
    },
  },
  {
    'request': {
      'id': 7,
      'method': 'HEAD',
      'path': '/test.docx',
    },
    'response': {
      'status': '200',
      'headers': {
        'last-modified': '',
        'etag': '',
        'content-type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document; charset=UTF-8',
        'content-disposition': 'inline; filename*=UTF-8\'\'test.docx',
        // 'content-disposition': 'inline; filename="test.docx"',
        'accept-ranges': 'bytes',
        // 'content-length': '',
      },
    },
  },
  {
    'request': {
      'id': 8,
      'method': 'LOCK',
      'path': '/test.docx',
      'headers': {
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'translate': 'f',
        'timeout': 'Second-3600',
      },
    },
    'response': {
      'status': '200',
      'headers': {
        'content-type': 'application/xml; charset=utf-8',
        'lock-token': '',
        // 'content-length': '',
      },
    },
  },
  {
    'request': {
      'id': 9,
      'method': 'HEAD',
      'path': '/test.docx',
    },
    'response': {
      'status': '200',
      'headers': {
        'last-modified': '',
        'etag': '',
        'content-type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document; charset=UTF-8',
        'content-disposition': 'inline; filename*=UTF-8\'\'test.docx',
        // 'content-disposition': 'inline; filename="test.docx"',
        'accept-ranges': 'bytes',
        // 'content-length': '',
      },
    },
  },
  {
    'request': {
      'id': 10,
      'method': 'PUT',
      'path': '/test.docx',
      'body': '111',
    },
    'response': {
      'status': '201',
    },
  },
  {
    'request': {
      'id': 11,
      'method': 'PROPPATCH',
      'path': '/test.docx',
      'headers': {
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'content-type': 'text/xml; charset="utf-8"',
        'translate': 'f',
      },
      'body': '<?xml version="1.0" encoding="utf-8" ?><D:propertyupdate xmlns:D="DAV:" xmlns:Z="urn:schemas-microsoft-com:"><D:set><D:prop><Z:Win32LastAccessTime>Wed, 25 Oct 2023 11:48:33 GMT</Z:Win32LastAccessTime><Z:Win32LastModifiedTime>Wed, 25 Oct 2023 11:48:33 GMT</Z:Win32LastModifiedTime></D:prop></D:set></D:propertyupdate>',
    },
    'response': {
      'status': '207',
      'headers': {
        'content-type': 'application/xml; charset=utf-8',
        // 'content-length': '',
      },
    },
  },
  {
    'request': {
      'id': 12,
      'method': 'HEAD',
      'path': '/test.docx',
    },
    'response': {
      'status': '200',
      'headers': {
        'last-modified': '',
        'etag': '',
        'content-type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document; charset=UTF-8',
        'content-disposition': 'inline; filename*=UTF-8\'\'test.docx',
        // 'content-disposition': 'inline; filename="test.docx"',
        'accept-ranges': 'bytes',
        // 'content-length': '',
      },
    },
  },
  {
    'request': {
      'id': 13,
      'method': 'UNLOCK',
      'path': '/test.docx',
      'headers': {
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'translate': 'f',
      },
    },
    'response': {
      'status': '200',
    },
  },
];
