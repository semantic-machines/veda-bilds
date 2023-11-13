import requests from './test050-requests.js';

export default ({test, assert, Backend, Helpers, Constants, Util}) => {
  test.skip('#050 File upload, webdav editing (LibreOffice)', async () => {
    const {ticket} = await Helpers.get_user1_ticket();

    const test_file_uri = Util.guid();
    const test_file_individual_uri = 'test-file:' + Util.guid();

    const test_file_individual = {
      '@': test_file_individual_uri,
      'rdf:type': Util.newUri('v-s:File'),
      'v-s:creator': Util.newUri('td:ValeriyBushenev-Programmer1'),
      'rdfs:label': Util.newStr('test.docx'),
      'v-s:fileName': Util.newStr('test.docx'),
      'v-s:filePath': Util.newStr('/1970/01/01'),
      'v-s:fileSize': Util.newInt(3),
      'v-s:fileUri': Util.newUri(test_file_uri),
    };

    const path = '/1970/01/01';
    const uri = test_file_uri;
    const content = '000';
    await uploadFile(ticket, path, uri, content);

    const res = await Backend.put_individual(ticket, test_file_individual);
    assert(await Backend.wait_module(Constants.m_acl, res.op_id));
    assert(await Backend.wait_module(Constants.m_scripts, res.op_id));

    const base = `${location.origin}/webdav/${ticket}/${test_file_individual_uri}`;

    await requests.reduce(async (p, {request, response}) => {
      await p;
      const result = await fetch(`${base}${request.path}`, request);
      try {
        try {
          assert(result.status.toString() === response.status.toString());
        } catch (e) {
          throw Error(`Response status does not match ethalon: ${result.status} (fetched) !== ${response.status} (ethalon)`);
        }
        for (const [key, value] of Object.entries(response.headers ?? {})) {
          try {
            assert(result.headers.has(key));
          } catch (e) {
            throw Error(`Ethalon header is absent in fetched response: '${key}'`);
          }
          if (value) {
            try {
              assert(result.headers.get(key) === value);
            } catch (e) {
              throw Error(`Ethalon header value differs from fetched response: (${key}: ${value}) !== (${key}: ${result.headers.get(key)})`);
            }
          }
        }
      } catch (error) {
        console.error(error);
        console.info('Ethalon request:', request);
        console.info('Ethalon response:', response);
        console.info('Fetched response headers:', Object.fromEntries([...result.headers]));
        throw error;
      }
    }, Promise.resolve());
  });
};

async function uploadFile (ticket, path, uri, content) {
  try {
    const boundary = '----WebKitFormBoundaryi6f7ZW0xH8ivVwZr';
    let formData = `--${boundary}\r\nContent-Disposition: form-data; name="path"\r\n\r\n${path}\r\n`;
    formData += `--${boundary}\r\nContent-Disposition: form-data; name="uri"\r\n\r\n${uri}\r\n`;
    formData += `--${boundary}\r\nContent-Disposition: form-data; name="content"\r\n\r\ndata:text/plain;base64,${Buffer.from(content).toString('base64')}\r\n`;
    formData += `--${boundary}--\r\n`;

    const response = await fetch(`${location.origin}/files`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Cookie': `ticket=${ticket}`,
      },
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
}
