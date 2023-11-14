import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if ($(template).parent().attr('data-embedded')) {
    $('.actions', template).remove();
  }
};

export const html = `
  <div class="container sheet">
    <h2>
      <span about="@" rel="rdf:type" data-template="v-ui:LabelTemplate"></span>
    </h2>
    <div class="row">
      <div class="col-md-5 text-right">
        <strong about="rdfs:label" property="rdfs:label" class="text-muted"></strong>
      </div>
      <div class="col-md-7">
        <div property="rdfs:label" class="view search -create"></div>
        <veda-control property="rdfs:label" data-type="multilingualString" class="-view edit create"></veda-control>
      </div>
    </div>
    <hr style="margin: 10px 0px" />
    <div class="row">
      <div class="col-md-5 text-right name">
        <strong class="text-muted" about="v-wf:segregateObject" property="rdfs:label"></strong>
      </div>
      <div class="col-md-7">
        <span class="view search -create" property="v-wf:segregateObject"></span>
        <veda-control property="v-wf:segregateObject" class="-view edit create"></veda-control>
      </div>
    </div>
    <hr style="margin: 10px 0px" />
    <div class="row">
      <div class="col-md-5 text-right name">
        <strong class="text-muted" about="v-wf:segregateElement" property="rdfs:label"></strong>
      </div>
      <div class="col-md-7">
        <span class="view search -create" property="v-wf:segregateElement"></span>
        <veda-control property="v-wf:segregateElement" class="-view edit create"></veda-control>
      </div>
    </div>
    <hr style="margin: 10px 0px" />
    <div class="row">
      <div class="col-md-5 text-right name">
        <strong class="text-muted" about="v-wf:conversion" property="rdfs:label"></strong>
      </div>
      <div class="col-md-7">
        <span class="view search -create" property="v-wf:conversion"></span>
        <veda-control property="v-wf:conversion" class="-view edit create"></veda-control>
      </div>
    </div>
    <hr style="margin: 10px 0px" />
    <div class="row">
      <div class="col-md-5 text-right name">
        <strong class="text-muted" about="v-wf:grouping" property="rdfs:label"></strong>
      </div>
      <div class="col-md-7">
        <span class="view search -create" property="v-wf:grouping"></span>
        <veda-control property="v-wf:grouping" class="-view edit create"></veda-control>
      </div>
    </div>
    <hr style="margin: 10px 0px" />
    <div class="row">
      <div class="col-md-5 text-right name">
        <strong class="text-muted" about="v-wf:aggregate" property="rdfs:label"></strong>
      </div>
      <div class="col-md-7">
        <span class="view search -create" property="v-wf:aggregate"></span>
        <veda-control property="v-wf:aggregate" class="-view edit create"></veda-control>
      </div>
    </div>
    <hr style="margin: 10px 0px" />
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete"></span>
    </div>
  </div>
`;
