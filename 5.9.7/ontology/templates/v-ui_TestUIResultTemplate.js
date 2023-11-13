export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="15" about="v-ui:TestUIClass" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%">#</th>
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="v-s:creator"><span about="v-s:creator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="rdfs:label"><span about="rdfs:label" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="rdfs:comment"><span about="rdfs:comment" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-ui:testBoolean"><span about="v-ui:testBoolean" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-ui:testString"><span about="v-ui:testString" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-ui:testInteger"><span about="v-ui:testInteger" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-ui:testDecimal"><span about="v-ui:testDecimal" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-ui:testDatetime"><span about="v-ui:testDatetime" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-ui:testLink"><span about="v-ui:testLink" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-ui:template"><span about="v-ui:template" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:script"><span about="v-s:script" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-ui:testFile"><span about="v-ui:testFile" property="rdfs:label"></span></th>
      </tr>
    </thead>

    <tbody class="result-container">
      <tr>
        <td class="serial-number"></td>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:created"></td>
        <td property="rdfs:label"></td>
        <td property="rdfs:comment"></td>
        <td property="v-ui:testBoolean"></td>
        <td property="v-ui:testString"></td>
        <td property="v-ui:testInteger"></td>
        <td property="v-ui:testDecimal"></td>
        <td property="v-ui:testDatetime"></td>
        <td property="v-ui:testLink"></td>
        <td property="v-ui:template"></td>
        <td property="v-s:script"></td>
        <td property="v-ui:testFile"></td>
      </tr>
    </tbody>
  </table>
`;
