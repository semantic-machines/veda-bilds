import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('.CodeMirror', template).each(function (idx) {
    $(this).height(40);
  });
  $('#executordefinition', template).on('click', function () {
    $('.executordefinition', template).show();
    $('.codelet', template).hide();
    $('.appointment', template).hide();
  });
  $('#codelet', template).on('click', function () {
    $('.executordefinition', template).hide();
    $('.codelet', template).show();
    $('.appointment', template).hide();
  });
  $('#appointment', template).on('click', function () {
    $('.executordefinition', template).hide();
    $('.codelet', template).hide();
    $('.appointment', template).show();
  });
  if (individual.hasValue('rdf:type')) {
    if (individual['rdf:type'][0].id == 'v-wf:ExecutorDefinition') $('#executordefinition', template).trigger('click');
    if (individual['rdf:type'][0].id == 'v-s:Codelet') $('#codelet', template).trigger('click');
    if (individual['rdf:type'][0].id == 'v-s:Appointment') $('#appointment', template).trigger('click');
  } else {
    $('#codelet', template).trigger('click');
  }
};

export const html = `
<div>
  <div class="row">
    <div class="col-md-4">
      <input id="executordefinition" name="dzen" type="radio" value="executordefinition"> <span about="v-wf:ExecutorDefinition" property="rdfs:label"></span>
    </div>
    <div class="col-md-4">
      <input id="codelet" name="dzen" type="radio" value="codelet"> <span about="v-s:Codelet" property="rdfs:label"></span>
    </div>
    <div class="col-md-4">
      <input id="appointment" name="dzen" type="radio" value="appointment"> <span about="v-s:Appointment" property="rdfs:label"></span>
    </div>
  </div>
  <div class="row executordefinition">
    <div class="col-md-3">
      <span about="v-wf:executorExpression" property="rdfs:label"> :
    </div>
    <div class="col-md-9">
      <veda-control data-type="source" mode="javascript" property="v-wf:executorExpression" style="width:95%"></veda-control>
    </div>
  </div>
  <div class="row codelet">
    <div class="col-md-3">
      <span about="v-s:script" property="rdfs:label"> :
    </div>
    <div class="col-md-9">
      <veda-control data-type="source" mode="javascript" property="v-s:script" style="width:95%"></veda-control>
    </div>
  </div>
  <div class="row appointment">
    <div class="col-md-3">
      <span about="v-s:Appointment" property="rdfs:label"> :
    </div>
    <div class="col-md-9">
        <!--veda-control rel="@" data-type="link" class="fulltext dropdown"></veda-control-->
    </div>
  </div>
</div>
`;
