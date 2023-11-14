export const html = `
  <div class="container sheet">
    <div about="@" data-embedded="true" data-template="v-ui:CommonOntologyTemplate"></div>
    <div class="row">
      <div class="col-md-4 col-xs-5 text-right name">
        <strong about="v-ui:forClass" property="rdfs:label" class="text-muted"></strong>
      </div>
      <div class="col-md-8 col-xs-7 value">
        <div rel="v-ui:forClass" data-template="v-ui:ClassNameLabelLinkTemplate"></div>
        <veda-control rel="v-ui:forClass" data-type="link" class="-view edit search fulltext dropdown"></veda-control>
      </div>
    </div>
    <hr class="margin-md" />
    <div class="row">
      <div class="col-md-4 col-xs-5 text-right name">
        <strong about="v-ui:forProperty" property="rdfs:label" class="text-muted"></strong>
      </div>
      <div class="col-md-8 col-xs-7 value">
        <div rel="v-ui:forProperty" data-template="v-ui:ClassNameLabelLinkTemplate"></div>
        <veda-control rel="v-ui:forProperty" data-type="link" class="-view edit search fulltext dropdown" style="display: none;"></veda-control>
      </div>
    </div>
    <hr class="margin-md" />
    <div class="row">
      <div class="col-md-4 col-xs-5 text-right name">
        <strong about="v-ui:tooltip" property="rdfs:label" class="text-muted"></strong>
      </div>
      <div class="col-md-8 col-xs-7 value">
        <div property="v-ui:tooltip" class="view -edit -search"></div>
        <veda-control property="v-ui:tooltip" data-type="multilingualText" class="-view edit search"></veda-control>
      </div>
    </div>
    <hr class="margin-md" />
    <div class="row">
      <div class="col-md-4 col-xs-5 text-right name">
        <strong about="v-ui:placeholder" property="rdfs:label" class="text-muted"></strong>
      </div>
      <div class="col-md-8 col-xs-7 value">
        <div property="v-ui:placeholder" class="view -edit -search"></div>
        <veda-control property="v-ui:placeholder" data-type="multilingualText" class="-view edit search"></veda-control>
      </div>
    </div>
    <hr class="margin-md" />
    <div class="row">
      <div class="col-md-4 col-xs-5 text-right name">
        <strong about="v-ui:alternativeName" property="rdfs:label" class="text-muted"></strong>
      </div>
      <div class="col-md-8 col-xs-7 value">
        <div property="v-ui:alternativeName" class="view -edit -search"></div>
        <veda-control property="v-ui:alternativeName" data-type="multilingualText" class="-view edit search"></veda-control>
      </div>
    </div>
    <hr class="margin-md" />
    <div class="row">
      <div class="col-md-4 col-xs-5 text-right name">
        <strong about="v-ui:optionValue" property="rdfs:label" class="text-muted"></strong>
      </div>
      <div class="col-md-8 col-xs-7 value">
        <div property="v-ui:optionValue"></div>
        <veda-control property="v-ui:optionValue" data-type="generic" class="-view edit search"></veda-control>
      </div>
    </div>
    <hr class="margin-md" />
    <div class="row">
      <div class="col-md-4 col-xs-5 text-right name">
        <strong about="v-ui:defaultValue" property="rdfs:label" class="text-muted"></strong>
      </div>
      <div class="col-md-8 col-xs-7 value">
        <div property="v-ui:defaultValue"></div>
        <veda-control property="v-ui:defaultValue" data-type="generic" class="-view edit search"></veda-control>
      </div>
    </div>
    <hr class="margin-md" />
    <div class="row">
      <div class="col-md-4 col-xs-5 text-right name">
        <strong about="v-ui:minCardinality" property="rdfs:label" class="text-muted">Минимальная кардинальность</strong>
      </div>
      <div class="col-md-8 col-xs-7 value">
        <div property="v-ui:minCardinality" class="view -edit -search"></div>
        <veda-control property="v-ui:minCardinality" data-type="integer" class="-view edit search"></veda-control>
      </div>
    </div>
    <hr class="margin-md" />
    <div class="row">
      <div class="col-md-4 col-xs-5 text-right name">
        <strong about="v-ui:maxCardinality" property="rdfs:label" class="text-muted">Максимальная кардинальность</strong>
      </div>
      <div class="col-md-8 col-xs-7 value">
        <div property="v-ui:maxCardinality" class="view -edit -search"></div>
        <veda-control property="v-ui:maxCardinality" data-type="integer" class="-view edit search"></veda-control>
      </div>
    </div>
    <br />
    <br />
    <div class="actions">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete destroy"></span>
    </div>
  </div>
`;
