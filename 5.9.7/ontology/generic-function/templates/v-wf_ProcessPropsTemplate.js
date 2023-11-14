import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (typeof individual !== 'undefined') {
    $('#processTemplateProperties > tbody > tr > td > span[about]').each(function () {
      if (!individual.hasValue($(this).attr('about'))) {
        $(this).parent().parent().appendTo($('#workItemTemplateProperties'));
      }
    });
  }
};

export const html = `
  <div>
    <table id="processTemplateProperties" class="table table-condensed table-hover properties-editor">
      <thead>
        <tr>
          <td style="width:25%"><span about="v-wf:NetElement" property="rdfs:label"></span></td>
          <td>
            <strong
              ><span about="@" property="@"></span> <a href="#/@"><i class="glyphicon glyphicon-share-alt"></i></a
            ></strong>
          </td>
        </tr>
      </thead>
      <tr onclick="javascript: $('.VClocVariable').show(); javascript: $('.viewVClocVariable').hide();">
        <td><span about="v-wf:localVariable" property="rdfs:label"></span></td>
        <td>
          <veda-control
            about="@"
            rel="v-wf:localVariable"
            data-type="link"
            class="VClocVariable fulltext dropdown create properties-editor"
            style="display:none;"></veda-control>
          <div class="VClocVariable" rel="v-wf:localVariable" data-template="v-wf:VariableTemplate" style="display:none;"></div>
          <div about="@" class="viewVClocVariable" rel="v-wf:localVariable" data-template="v-wf:VariableTemplate"></div>
        </td>
      </tr>
      <tr onclick="javascript: $('.VCinVariable').show(); javascript: $('.viewVCinVariable').hide();">
        <td><span about="v-wf:inVars" property="rdfs:label"></span></td>
        <td>
          <veda-control
            about="@"
            rel="v-wf:inVars"
            data-type="link"
            class="VCinVariable fulltext dropdown create properties-editor"
            style="display:none;"></veda-control>
          <div class="VCinVariable" rel="v-wf:inVars" data-template="v-wf:VariableTemplate" style="display:none;"></div>
          <div about="@" class="viewVCinVariable" rel="v-wf:inVars" data-template="v-wf:VariableTemplate"></div>
        </td>
      </tr>
      <tr onclick="javascript: $('.VCoutVariable').show(); javascript: $('.viewVCoutVariable').hide();">
        <td><span about="v-wf:outVars" property="rdfs:label"></span></td>
        <td>
          <veda-control
            about="@"
            rel="v-wf:outVars"
            data-type="link"
            class="VCoutVariable fulltext dropdown create properties-editor"
            style="display:none;"></veda-control>
          <div class="VCoutVariable" rel="v-wf:outVars" data-template="v-wf:VariableTemplate" style="display:none;"></div>
          <div about="@" class="viewVCoutVariable" rel="v-wf:outVars" data-template="v-wf:VariableTemplate"></div>
        </td>
      </tr>
      <tr onclick="javascript: $('.VClocalVariable').show(); javascript: $('.viewVClocalVariable').hide();">
        <td><span about="v-wf:localVars" property="rdfs:label"></span></td>
        <td>
          <veda-control
            about="@"
            rel="v-wf:localVars"
            data-type="link"
            class="VClocalVariable fulltext dropdown create properties-editor"
            style="display:none;"></veda-control>
          <div class="VClocalVariable" rel="v-wf:localVars" data-template="v-wf:VariableTemplate" style="display:none;"></div>
          <div about="@" class="viewVClocalVariable" rel="v-wf:localVars" data-template="v-wf:VariableTemplate"></div>
        </td>
      </tr>
      <tr id="traceJournal">
        <td>
          <em><h5 about="v-wf:traceJournal" property="rdfs:label"></h5></em>
        </td>
        <td><span rel="v-wf:traceJournal" data-template="v-ui:LabelLinkTemplate"></span></td>
      </tr>
    </table>
  </div>
`;
