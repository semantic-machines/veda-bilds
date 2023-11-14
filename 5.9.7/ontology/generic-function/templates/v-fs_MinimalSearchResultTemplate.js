export const html = `
  <table class="table table-condensed table-striped">
    <thead class="result-header">
      <tr>
        <th width="1%">#</th>
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th>@</th>
        <th class="orderby" data-orderby="rdfs:label"><span about="rdfs:label" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td class="serial-number"></td>
        <td about="@" data-template="v-ui:IconModalTemplate"></td>
        <td property="@"></td>
        <td about="@" property="rdfs:label"></td>
      </tr>
    </tbody>
  </table>
`;
