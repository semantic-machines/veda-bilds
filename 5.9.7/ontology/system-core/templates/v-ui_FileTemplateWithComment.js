import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  const fn = individual['v-s:fileName'][0];
  const img = 'jpg|jpeg|gif|png|bmp|svg';
  if (typeof fn === 'string' || fn instanceof String) {
    const idx = fn.lastIndexOf('.');
    const ext = fn.substr(idx + 1);
    if (img.indexOf(ext.toLowerCase()) < 0) {
      $('.thumbnail', template).remove();
    }
  }
};

export const html = `
  <div class="horizontal-card">
    <div class="thumbnail" about="@" data-template="v-ui:ModalImageTemplate"></div>
    <div class="description">
      <strong about="rdfs:comment" property="rdfs:label" class="-view edit search"></strong>
      <veda-control data-type="string" property="rdfs:comment" class="-view edit search margin-sm"></veda-control>
      <strong property="rdfs:comment" class="view -edit -search header"></strong>
      <hr class="margin-sm view -edit -search" />
      <div class="file-name" about="@" data-template="v-ui:FileMinTemplate"></div>
      <i class="view -edit -search"> <small rel="v-s:creator" data-template="v-ui:LabelTemplate"></small><small property="v-s:created"></small> </i>
    </div>
  </div>
`;
