import $ from 'jquery';
import veda from '/js/common/veda.js';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (
    veda.appointment.id === 'cfg:AdministratorAppointment' &&
    individual.hasValue('v-wf:forWorkItem') &&
    individual['v-wf:forWorkItem'][0].hasValue('v-wf:isCompleted', true)
  ) {
    $('#repeat-workOrder', template).click(function () {
      individual['v-wf:enforceProcessing'] = [true];
      individual.save();
    });
  } else {
    $('#repeat-workOrder', template).remove();
  }
  if (!individual.hasValue('v-wf:decisionFormList')) $('#decisionFormList', template).remove();
  if (!individual.hasValue('v-wf:executor')) $('#executor', template).remove();
  if (!individual.hasValue('v-wf:outVars')) $('#outVars', template).remove();
  if (!individual.hasValue('v-wf:isProcess')) $('#isProcess', template).remove();
  if (!individual.hasValue('v-wf:traceJournal')) $('#traceJournal', template).remove();
};

export const html = `
  <div>
    <strong>
      <button id="repeat-workOrder" type="button" class="btn btn-sm margin-sm-h btn-default">
        <span>repeat</span>
      </button>
      <span about="@" property="@"></span>
      <a href="#/@"><i class="glyphicon glyphicon-share-alt"></i></a>
    </strong>
    <div id="executor">
      <em about="v-wf:executor" property="rdfs:label"></em>
      <ul>
        <li rel="v-wf:executor" data-template="v-ui:ClassNameLabelLinkTemplate"></li>
      </ul>
    </div>
    <div id="decisionFormList">
      <em about="v-wf:decisionFormList" property="rdfs:label"></em>
      <ul>
        <li rel="v-wf:decisionFormList" data-template="v-ui:ClassNameLabelLinkTemplate"></li>
      </ul>
    </div>
    <div id="outVars">
      <em about="v-wf:outVars" property="rdfs:label"></em>
      <ul>
        <li rel="v-wf:outVars" data-template="v-wf:VariableTemplate"></li>
      </ul>
    </div>
    <div id="isProcess">
      <em about="v-wf:isProcess" property="rdfs:label"></em>
      <ul>
        <li rel="v-wf:isProcess" data-template="v-ui:ClassNameLabelLinkTemplate"></li>
      </ul>
    </div>
    <div id="traceJournal">
      <em><h5 about="v-wf:traceJournal" property="rdfs:label"></h5></em>
      <span rel="v-wf:traceJournal" data-template="v-ui:LabelLinkTemplate"></span>
      <hr />
    </div>
    <br />
  </div>
`;
