export const html = `
  <table class="table">
    <thead class="result-header">
      <tr>
        <th width="1%"><input type="checkbox" class="toggle-select-all" /></th>
        <th width="1%">#</th>
        <th width="85%" class="orderby" data-orderby="v-s:title"><span about="v-s:title" property="rdfs:label"></span></th>
        <th width="13%" class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td width="1%"><input type="checkbox" class="toggle-select" /></td>
        <td class="serial-number"></td>
        <td>
          <div about="@" property="v-s:title"></div>
          <small about="@" property="v-s:description"></small>
          <a href="#/@"><small about="v-s:More" property="rdfs:label"></small></a>
        </td>
        <td about="@" property="v-s:created"></td>
      </tr>
    </tbody>
  </table>
`;
