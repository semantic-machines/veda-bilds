import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  const type =
    individual.id === 'v-s:Divider' ?
      'divider' :
      individual.hasValue('v-s:menuItem') ?
        'submenu' :
        individual.hasValue('v-s:objectLink') ?
          'object' :
          individual.hasValue('v-s:staticLink') ?
            'static' :
            undefined;
  switch (type) {
  case 'divider':
    template.empty().addClass('divider');
    break;
  case 'submenu':
    template.addClass('dropdown').find('#static, #object').remove();
    break;
  case 'object':
    template.attr('rel', 'v-s:objectLink').find('#static, #submenu, #submenu-ul').remove();
    break;
  case 'static':
    template.find('#object, #submenu, #submenu-ul').remove();
    template.find('#static').attr('href', individual['v-s:staticLink'][0]);
    break;
  }
};

export const html = `
  <li>
    <a id="static">
      <span property="rdfs:label"></span>
    </a>
    <a id="object" href="#/@">
      <span property="rdfs:label"></span>
    </a>
    <a id="submenu" class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false">
      <span property="rdfs:label"></span> <span class="caret"></span>
    </a>
    <ul id="submenu-ul" class="dropdown-menu" role="menu" rel="v-s:menuItem" data-template="v-s:MenuItemViewTemplate"></ul>
  </li>
`;
