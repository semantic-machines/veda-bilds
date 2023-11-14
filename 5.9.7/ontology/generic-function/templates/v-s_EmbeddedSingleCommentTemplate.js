import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('.action', template).click(function (e) {
    e.preventDefault();
    template[0].dispatchEvent(new Event(this.id));
  });

  template.on('validate', function () {
    const result = {};
    if (!(individual.hasValue('rdfs:label') || individual.hasValue('v-s:attachment') || individual.hasValue('v-s:linkedObject'))) {
      result['rdfs:label'] = {
        state: false,
        cause: ['v-ui:minCardinality'],
      };
      result['v-s:attachment'] = {
        state: false,
        cause: ['v-ui:minCardinality'],
      };
      result['v-s:linkedObject'] = {
        state: false,
        cause: ['v-ui:minCardinality'],
      };
    }
    template[0].dispatchEvent(new CustomEvent('validated', {detail: result}));
  });
};

export const html = `
  <div class="panel panel-default" style="margin-top: 20px">
    <div class="panel-body">
      <em about="rdfs:comment" property="rdfs:label"></em>
      <div property="rdfs:label" class="view -edit -search"></div>
      <veda-control data-type="text" rows="3" property="rdfs:label" class="-view edit -search"></veda-control>
      <em about="v-s:attachment" property="rdfs:label"></em>
      <div rel="v-s:attachment" data-template="v-ui:FileTemplate" data-embedded="true"></div>
      <veda-control data-type="file" rel="v-s:attachment" class="-view edit -search"></veda-control>
      <em about="v-s:linkedObject" property="rdfs:label"></em>
      <div rel="v-s:linkedObject" data-template="v-ui:ClassNameLabelLinkTemplate"></div>
      <veda-control data-type="link" rel="v-s:linkedObject" class="-view edit -search fulltext"></veda-control>
    </div>
  </div>
`;
