export const html = `
  <table class="table">
    <thead class="result-header">
      <tr>
        <th width="1%">#</th>
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th><span about="v-s:title" property="rdfs:label"></span></th>
        <th><span about="v-s:description" property="rdfs:label"></span></th>
        <th width="13%" class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td class="serial-number"></td>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td><div about="@" property="v-s:title"></div></td>
        <td><div about="@" property="v-s:description"></div></td>
        <td about="@" property="v-s:created"></td>
      </tr>
    </tbody>
  </table>
`;
