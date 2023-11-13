export default ({test, assert, Backend, Helpers, Constants, Util}) => {
  test(
`#013 User1 stores 3 individuals (one of the individuals contains an invalid field [author]).
       User1 finds 2 individuals, and user2 should not find anything.`,
  async () => {
    const ticket_user1 = await Helpers.get_user1_ticket();
    const ticket_user2 = await Helpers.get_user2_ticket();

    const test_data_uid = 'test12_' + Util.guid();
    const test_data = 'testdata ' + test_data_uid;

    const new_test_doc1_uri_1 = 'test12:' + Util.guid();
    const new_test_doc1 = {
      '@': new_test_doc1_uri_1,
      'rdf:type': Util.newUri('rdfs:Resource'),
      'v-s:author': Util.newUri('td:ValeriyBushenev-Programmer1'),
      'v-s:created': Util.newDate(new Date()),
      'v-s:test_field': Util.newStr(test_data, 'NONE'),
      'v-s:test_fieldA': Util.newUri('BBB' + test_data_uid),
      'v-s:test_fieldB': Util.newUri('CCC' + test_data_uid),
    };

    // document content author != user1
    const new_test_doc1_uri_2 = 'test12:' + Util.guid();
    const new_test_doc2 = {
      '@': new_test_doc1_uri_2,
      'rdf:type': Util.newUri('rdfs:Resource'),
      'v-s:author': Util.newUri('td:AndreyBychin-Analyst2'),
      'v-s:created': Util.newDate(new Date()),
      'v-s:test_field': Util.newUri(test_data),
    };

    const new_test_doc1_uri_3 = 'test12:' + Util.guid();
    const new_test_doc3 = {
      '@': new_test_doc1_uri_3,
      'rdf:type': Util.newUri('rdfs:Resource'),
      'v-s:author': Util.newUri('td:ValeriyBushenev-Programmer1'),
      'v-s:created': Util.newDate(new Date()),
      'v-s:test_field': Util.newUri(test_data),
      'v-s:test_fieldA': Util.newUri('BBB' + test_data_uid),
    };

    const new_test_doc1_uri_4 = 'test12:' + Util.guid();
    const new_test_doc4 = {
      '@': new_test_doc1_uri_4,
      'rdf:type': Util.newUri('rdfs:Resource'),
      'v-s:author': Util.newUri('td:ValeriyBushenev-Programmer1'),
      'v-s:created': Util.newDate(new Date()),
      'v-s:test_field': Util.newUri('AAA' + test_data_uid),
      'v-s:test_fieldA': Util.newUri('BBB' + test_data_uid),
      'v-s:test_fieldB': Util.newUri('CCC' + test_data_uid),
    };

    await Backend.put_individual(ticket_user1.ticket, new_test_doc1);
    await Backend.put_individual(ticket_user1.ticket, new_test_doc2);
    await Backend.put_individual(ticket_user1.ticket, new_test_doc3);
    const res = await Backend.put_individual(ticket_user1.ticket, new_test_doc4);

    assert(await Backend.wait_module(Constants.m_acl, res.op_id));
    assert(await Backend.wait_module(Constants.m_fulltext_indexer, res.op_id));
    assert(await Backend.wait_module(Constants.m_scripts, res.op_id));

    let data = await Backend.query(ticket_user1.ticket, test_data_uid);
    assert(data.result.length === 2);

    data = await Backend.query(ticket_user2.ticket, test_data_uid);
    assert(data.result.length === 1);

    data = await Backend.query(ticket_user1.ticket, "'v-s:test_field' === '" + test_data_uid + "'");
    assert(data.result.length === 2);

    data = await Backend.query(ticket_user1.ticket, "'v-s:test_field' === '" + test_data_uid + "' || 'v-s:test_field' === 'AAA" + test_data_uid + "'");
    assert(data.result.length === 3);

    data = await Backend.query(ticket_user1.ticket, "'v-s:test_fieldB' === 'CCC" + test_data_uid + "' && 'v-s:test_fieldA' === 'BBB" + test_data_uid + "'");
    assert(data.result.length === 2);

    await Backend.remove_individual(ticket_user1.ticket, new_test_doc1['@']);
    await assert.rejects(Backend.get_individual(ticket_user1.ticket, new_test_doc1['@']));

    await Backend.remove_individual(ticket_user2.ticket, new_test_doc2['@']);
    await assert.rejects(Backend.get_individual(ticket_user2.ticket, new_test_doc2['@']));

    await Backend.remove_individual(ticket_user1.ticket, new_test_doc3['@']);
    await assert.rejects(Backend.get_individual(ticket_user1.ticket, new_test_doc3['@']));

    await Backend.remove_individual(ticket_user1.ticket, new_test_doc4['@']);
    await assert.rejects(Backend.get_individual(ticket_user1.ticket, new_test_doc4['@']));
  });
};
