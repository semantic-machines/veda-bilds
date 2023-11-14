export const html = `
  <div>
    <div class="row">
      <div class="col-md-4">
        <strong class="text-muted">Выделение подмножества обьектов</strong>
      </div>
      <div class="col-md-8">
        <div property="v-wf:segregateObject"></div>
        <veda-control property="v-wf:segregateObject" class="view edit search -create"></veda-control>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <strong class="text-muted">Выделение подмножества элементов</strong>
      </div>
      <div class="col-md-8">
        <div property="v-wf:segregateElement"></div>
        <veda-control property="v-wf:segregateElement" class="view edit search -create"></veda-control>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <strong class="text-muted">Преобразование элемента</strong>
      </div>
      <div class="col-md-8">
        <div property="v-wf:conversion"></div>
        <veda-control property="v-wf:conversion" class="view edit search -create"></veda-control>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <strong class="text-muted">Группировка объектов</strong>
      </div>
      <div class="col-md-8">
        <div property="v-wf:grouping"></div>
        <veda-control property="v-wf:grouping" class="view edit search -create"></veda-control>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <strong class="text-muted">Размещение элемента в обьекте</strong>
      </div>
      <div class="col-md-8">
        <div property="v-wf:aggregate"></div>
        <veda-control property="v-wf:aggregate" class="view edit search -create"></veda-control>
      </div>
    </div>
  </div>
`;
