export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="7" about="v-s:UserScript" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%">#</th>
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="rdfs:label"><span about="rdfs:label" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:creator"><span about="v-s:creator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:lastEditor"><span about="v-s:lastEditor" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:edited"><span about="v-s:edited" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td class="serial-number"></td>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td property="rdfs:label"></td>
        <td rel="v-s:creator"><span property="rdfs:label"></span></td>
        <td property="v-s:created"></td>
        <td rel="v-s:lastEditor"><span property="rdfs:label"></span></td>
        <td property="v-s:edited"></td>
      </tr>
    </tbody>
  </table>
`;
