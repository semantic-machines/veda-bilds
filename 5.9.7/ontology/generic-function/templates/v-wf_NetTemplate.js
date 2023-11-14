import $ from 'jquery';
import veda from '/js/common/veda.js';
import jsWorkflow from 'jsworkflow';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  const wrapper = $('.workflow-canvas-wrapper', template);
  const height = $('#copyright').offset().top - wrapper.offset().top - 25 + 'px';
  const fullWidth = $('#full-width', template);
  const icon = $('span', fullWidth);
  const propsCol = $('#props-col', template);
  const schema = $('#schema', template);
  wrapper.css('height', height);
  propsCol.css('height', height);
  fullWidth.click(function () {
    propsCol.toggle();
    icon.toggleClass('glyphicon-resize-full glyphicon-resize-small');
    schema.toggleClass('col-md-8 col-md-12');
  });
  jsWorkflow.ready(function () {
    // Create a new workflow instance as workflow
    const workflow = new jsWorkflow.Instance();

    // Initialize workflow with workflow container id
    const net = workflow.init('workflow-canvas', veda, individual, template, container);

    veda.net = net;

    template.one('remove', function () {
      delete veda.net;
    });
  });
};

export const html = `
  <div class="workflow-wrapper container-fluid sheet">
    <style>
      #main {
        margin-bottom: 0px;
      }
    </style>
    <div class="row">
      <div id="schema" class="col-md-8" style="border-right: 1px solid #ddd;">
        <div class="workflow-canvas-wrapper">
          <div class="row" id="workflow-toolbar">
            <div class="col-md-4">
              <h4 id="workflow-net-name" style="margin-left:10px"></h4>
            </div>
            <div class="col-md-8">
              <div class="btn-toolbar pull-right">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-default create-state create-task">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="btn btn-sm btn-default create-state create-condition">
                    <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="btn btn-sm btn-default edit-state">
                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="btn btn-sm btn-default copy-net-element">
                    <span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="btn btn-sm btn-default delete-state">
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                  </button>
                </div>
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-default zoom-in">
                    <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="btn btn-sm btn-default zoom-default">
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="btn btn-sm btn-default zoom-out">
                    <span class="glyphicon glyphicon-zoom-out" aria-hidden="true"></span>
                  </button>
                </div>
                <div class="btn-group">
                  <button id="workflow-save-button" type="button" class="btn btn-sm btn-default">
                    <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
                  </button>
                  <button id="workflow-export-ttl" type="button" class="btn btn-sm btn-default">
                    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                  </button>
                </div>
                <div class="btn-group">
                  <button id="full-width" class="btn btn-sm btn-default">
                    <span class=" glyphicon glyphicon-resize-full" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="workflow-canvas"></div>
        </div>
      </div>
      <div id="props-col" class="col-md-4">
        <h4>Элемент: <span id="props-head" property="rdfs:label"></span></h4>
        <hr class="no-margin" />
        <br />
        <div id="props"></div>
      </div>
    </div>
    <div id="workflow-context-menu" class="dropdown clearfix">
      <ul class="workflow-context-menu-list" role="menu" aria-labelledby="dropdownMenu" style="display:block;position:static;margin-bottom:5px;"></ul>
    </div>
  </div>
`;
