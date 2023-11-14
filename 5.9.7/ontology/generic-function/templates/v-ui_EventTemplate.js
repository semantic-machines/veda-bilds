export const html = `
<div class="container sheet">
  <div about="@" data-embedded="true" data-template="v-ui:CommonOntologyTemplate"></div>
  <div class="row">
    <div class="col-md-4 col-xs-5 text-right name">
      <strong about="v-s:triggerByUid" property="rdfs:label" class="text-muted"></strong>
    </div>
    <div class="col-md-8 col-xs-7 value">
      <div property="v-s:triggerByUid"></div>
      <veda-control property="v-s:triggerByUid" data-type="generic" class="-view edit search"></veda-control>
    </div>
  </div>
  <hr class="margin-md">
  <div class="row">
    <div class="col-md-4 col-xs-5 text-right name">
      <strong about="v-s:triggerByType" property="rdfs:label" class="text-muted"></strong>
    </div>
    <div class="col-md-8 col-xs-7 value">
      <div property="v-s:triggerByType"><span class="value-holder"></div>
      <veda-control property="v-s:triggerByType" data-type="generic" class="-view edit search"></veda-control>
    </div>
  </div>
  <hr class="margin-md">
  <div class="row">
    <div class="col-md-4 col-xs-5 text-right name">
      <strong about="v-s:preventByType" property="rdfs:label" class="text-muted"></strong>
    </div>
    <div class="col-md-8 col-xs-7 value">
      <div property="v-s:preventByType"><span class="value-holder"></div>
      <veda-control property="v-s:preventByType" data-type="generic" class="-view edit search"></veda-control>
    </div>
  </div>
  <hr class="margin-md">
  <div class="row">
    <div class="col-md-4 col-xs-5 text-right name"></div>
    <div class="col-md-8 col-xs-7 value">
      <div class="checkbox">
        <label>
          <veda-control property="v-s:disabled" data-type="boolean"></veda-control>
          <em about="v-s:disabled" property="rdfs:label" class="text-muted"></em>
        </label>
      </div>
    </div>
  </div>
  <hr class="margin-md">
  <div class="row">
    <div class="col-md-4 col-xs-5 text-right name">
      <strong about="v-s:script" property="rdfs:label" class="text-muted"></strong>
    </div>
    <div class="col-md-8 col-xs-7 value">
      <veda-control property="v-s:script" data-type="source"></veda-control>
    </div>
  </div>
  <hr class="margin-md">
  <div class="row">
    <div class="col-md-4 col-xs-5 text-right name">
      <strong about="v-s:dependency" property="rdfs:label" class="text-muted"></strong>
    </div>
    <div class="col-md-8 col-xs-7 value">
      <div property="v-s:dependency"></div>
        <veda-control property="v-s:dependency" data-type="generic" class="-view edit search"></veda-control>
      </div>
  </div>
  <hr class="margin-md">
  <div class="row">
    <div class="col-md-4 col-xs-5 text-right name">
      <strong about="v-s:runAt" property="rdfs:label" class="text-muted"></strong>
    </div>
    <div class="col-md-8 col-xs-7 value">
      <div property="v-s:runAt" class="view -edit -search"></div>
      <veda-control property="v-s:runAt" data-type="multilingualText" class="-view edit search"></veda-control>
    </div>
  </div>
  <br>
  <br>
  <div class="actions">
    <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete destroy"></span>
  </div>
</div>
`;
