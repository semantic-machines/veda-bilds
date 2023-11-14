export const html = `
  <table class="table table-condensed table-striped">
    <thead class="result-header">
      <tr>
        <th width="1%">#</th>
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="v-s:lastName"><span about="v-s:lastName" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:firstName"><span about="v-s:firstName" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:middleName"><span about="v-s:middleName" property="rdfs:label"></span></th>
        <th><span about="v-s:occupation" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td class="serial-number"></td>
        <td about="@" data-template="v-ui:IconModalTemplate"></td>
        <td about="@" property="v-s:lastName"></td>
        <td about="@" property="v-s:firstName"></td>
        <td about="@" property="v-s:middleName"></td>
        <td about="@" rel="v-s:defaultAppointment"><span rel="v-s:occupation" data-template="v-ui:LabelTemplate"></span></td>
      </tr>
    </tbody>
  </table>
`;
