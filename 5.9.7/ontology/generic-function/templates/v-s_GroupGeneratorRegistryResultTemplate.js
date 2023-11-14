export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="11" about="v-s:GroupGenerator" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><input type="checkbox" class="toggle-select-all" /></th>
        <th width="1%">#</th>
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="v-s:authClass"><span about="v-s:authClass" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:authProperty"><span about="v-s:authProperty" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:authFunction"><span about="v-s:authFunction" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:authValue"><span about="v-s:authValue" property="rdfs:label"></span></th>
        <th><span about="v-s:Rights" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:creator"><span about="v-s:creator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><input type="checkbox" class="toggle-select" /></td>
        <td class="serial-number"></td>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td about="@" rel="v-s:authClass" data-template="v-ui:LabelTemplate"></td>
        <td about="@" rel="v-s:authProperty" data-template="v-ui:LabelTemplate"></td>
        <td about="@" property="v-s:authFunction"></td>
        <td about="@" property="v-s:authValue"></td>
        <td about="@" data-template="v-s:RightsTemplate_inline"></td>
        <td about="@" rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td about="@" property="v-s:created"></td>
      </tr>
    </tbody>
  </table>
`;
