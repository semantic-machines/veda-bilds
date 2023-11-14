export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="9" about="v-s:RequestDelegation" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th width="1%">#</th>
        <th class="orderby" data-orderby="v-s:hasDelegationPurpose"><span about="v-s:hasDelegationPurpose" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:delegator"><span about="v-s:delegator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:delegate"><span about="v-s:delegate" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:delegatedPosition"><span about="v-s:delegatedPosition" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:dateFrom"><span about="v-s:dateFrom" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:dateTo"><span about="v-s:dateTo" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:creator"><span about="v-s:creator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td class="serial-number"></td>
        <td rel="v-s:hasDelegationPurpose" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:delegator" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:delegate" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:delegatedPosition" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:dateFrom"></td>
        <td property="v-s:dateTo"></td>
        <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:created"></td>
      </tr>
    </tbody>
  </table>
`;
