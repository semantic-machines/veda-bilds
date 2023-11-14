export const html = `
  <table class="table table-bordered table-condensed">
    <thead class="result-header">
      <tr>
        <th width="1%"><input type="checkbox" class="toggle-select-all" /></th>
        <th width="1%">#</th>
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th width="1%"><span about="rdf:type" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="rdfs:label"><span about="rdfs:label" property="rdfs:label"></span></th>
        <th width="15%" class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
        <th width="10%"><span about="v-s:creator" property="rdfs:label"></span></th>
        <th width="10%"><span about="v-s:attachment" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><input type="checkbox" class="toggle-select" /></td>
        <td class="serial-number"></td>
        <td about="@"><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td about="@" rel="rdf:type" data-template="v-ui:LabelTemplate"></td>
        <td about="@" property="rdfs:label"></td>
        <td about="@" property="v-s:created"></td>
        <td about="@" rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td about="@" rel="v-s:attachment" data-template="v-ui:FileMinTemplate"></td>
      </tr>
    </tbody>
  </table>
`;
