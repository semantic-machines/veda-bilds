import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (individual.hasValue('v-s:hasRoot')) {
    $('.self-roots', template).remove();
  } else {
    $('.roots', template).remove();
  }
  if (individual.hasValue('rdf:type', 'v-s:LinksTree') && individual.hasValue('rdfs:label')) {
    $('.tree-label', template).remove();
  } else {
    $('.self-label', template).remove();
  }
};

export const html = `
  <div class="container sheet">
    <h2 class="self-label" about="@" property="rdfs:label"></h2>
    <h2 class="tree-label" about="v-s:LinksTree" property="rdfs:comment"></h2>
    <hr />
    <div class="roots" about="@" rel="v-s:hasRoot" data-template="v-s:LinksTreeTemplate"></div>
    <div class="self-root" about="@" data-template="v-s:LinksTreeTemplate"></div>
  </div>
`;
