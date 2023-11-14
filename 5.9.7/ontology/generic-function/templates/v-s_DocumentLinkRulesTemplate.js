export const html = `
  <div class="container sheet">
    <h3 property="v-s:displayName" class="view edit search"></h3>
    <br />
    <div class="row">
      <div class="col-md-3">
        <em about="v-s:classFrom" property="rdfs:label"></em>
        <div rel="v-s:classFrom" data-template="v-ui:LabelLinkTemplate"></div>
        <veda-control rel="v-s:classFrom" data-type="link" class="-view edit search fulltext dropdown"></veda-control>
      </div>
      <div class="col-md-3">
        <em about="v-s:classTo" property="rdfs:label"></em>
        <div rel="v-s:classTo" data-template="v-ui:LabelLinkTemplate"></div>
        <veda-control rel="v-s:classTo" data-type="link" class="-view edit search fulltext dropdown"></veda-control>
      </div>
      <div class="col-md-3">
        <em about="v-s:hasTransformation" property="rdfs:label"></em>
        <div rel="v-s:hasTransformation" data-template="v-ui:LabelLinkTemplate"></div>
        <veda-control rel="v-s:hasTransformation" data-type="link" class="-view edit search fulltext dropdown"></veda-control>
      </div>
      <div class="col-md-3"></div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <em about="v-s:displayName" property="rdfs:label"></em>
        <div property="v-s:displayName" class="view -edit -search"></div>
        <veda-control property="v-s:displayName" data-type="multilingualText" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <veda-control property="v-s:unique" data-type="boolean"></veda-control>
        <em about="v-s:unique" property="rdfs:label"></em>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <veda-control property="v-s:isRoute" data-type="boolean"></veda-control>
        <em about="v-s:isRoute" property="rdfs:label"></em>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <veda-control property="v-s:isClone" data-type="boolean"></veda-control>
        <em about="v-s:isClone" property="rdfs:label"></em>
      </div>
    </div>
    <br /><br />
    <div class="actions">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete"></span>
    </div>
  </div>
`;
