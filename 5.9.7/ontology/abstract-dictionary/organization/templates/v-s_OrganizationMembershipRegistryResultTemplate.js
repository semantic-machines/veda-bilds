export const html = `
<table class="table table-condensed table-bordered">
  <thead>
    <tr class="active">
      <th width="1%">#</th>
      <th width="1%"><span class="glyphicon glyphicon-search"></th>
      <th about="rdfs:label" property="rdfs:label"></th>
      <!--<th about="v-s:hasAppointment" property="rdfs:label"></th>
      <th about="mnd-s:hasEmployeeProfile" property="rdfs:label"></th>-->
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td class="serial-number"></td>
      <td about="@" data-template="v-ui:IconModalTemplate"></td>
      <td about="@" property="rdfs:label" class="view edit -search"></td>
      <!--<td about="@" rel="v-s:hasAppointment" data-template="v-ui:LabelTemplate" class="view edit -search"></td>
      <td about="@" rel="mnd-s:hasEmployeeProfile" class="view edit -search" data-template="v-ui:ClassNameLabelLinkTemplate"></td>-->
    </tr>
  </tbody>
</table>
`;
