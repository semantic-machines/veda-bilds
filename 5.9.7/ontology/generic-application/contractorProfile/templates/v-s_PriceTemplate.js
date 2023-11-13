import $ from 'jquery';
import veda from '/js/common/veda.js';
import Backend from '/js/common/backend.js';
import IndividualModel from '/js/common/individual_model.js';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  individual.on('propertyModified', handler);
  template.one('remove', function () {
    individual.off('propertyModified', handler);
  });

  function handler (property_uri) {
    if ((property_uri === 'v-s:sum' || property_uri === 'v-s:hasCurrency') && individual.hasValue('v-s:sum') && individual.hasValue('v-s:hasCurrency')) {
      Backend.query({
        ticket: veda.ticket,
        query:
          "'rdf:type'==='v-s:CurrencyExchangeRate' && 'v-s:hasCurrencySource'=='" +
          individual['v-s:hasCurrency'][0].id +
          "' && 'v-s:hasCurrencyTarget'=='d:currency_rub' && 'v-s:hasCurrencyExchangeRatePurpose'=='v-s:CER_Purpose_current'",
        sort: "'v-s:date' asc",
        top: 1,
        async: true,
      })
        .then(function (queryResult) {
          const CER_uri = queryResult.result[0];
          if (CER_uri) {
            return new IndividualModel(CER_uri).load();
          } else {
            return Promise.resolve();
          }
        })
        .then(function (CER) {
          if (CER) {
            const rate = CER['v-s:rate'][0];
            individual['v-s:sumRuble'] = [individual['v-s:sum'][0] * rate];
            individual['v-s:date'] = [new Date()];
          } else {
            individual['v-s:sumRuble'] = [];
            individual['v-s:date'] = [];
          }
        });
    }
  }
};

export const html = `
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="row">
        <div class="col-md-3">
          <em about="v-s:sum" property="rdfs:label" class="margin-sm"></em>
          <span property="v-s:sum" class="view -edit search"></span>
          <veda-control data-type="decimal" property="v-s:sum" class="-view edit search"></veda-control>
        </div>
        <div class="col-md-3">
          <em about="v-s:hasCurrency" property="rdfs:label" class="margin-sm"></em>
          <span rel="v-s:hasCurrency" class="view -edit search" data-template="v-ui:LabelTemplate"></span>
          <veda-control data-type="link" rel="v-s:hasCurrency" class="-view edit search fulltext dropdown"></veda-control>
        </div>
        <div class="col-md-3 view edit -search">
          <em about="v-s:sumRuble" property="rdfs:label" class="margin-sm"></em>
          <span about="@" property="v-s:sumRuble" class="view edit -search"></span>
        </div>
        <div class="col-md-3 view edit -search">
          <em about="v-s:date" property="rdfs:label" class="margin-sm"></em>
          <span about="@" property="v-s:date" class="view edit -search"></span>
        </div>
      </div>
    </div>
  </div>
`;
