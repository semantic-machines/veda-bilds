export const html = `
  <div class="container">
    <div class="sheet">
      <h3 about="@" property="rdfs:label"></h3>
      <em about="v-fc:ChooseBlank" property="rdfs:label"></em>
      <veda-control data-type="link" rel="v-fc:targetBlank" class="fulltext dropdown"></veda-control>
    </div>
    <div rel="v-fc:targetBlank" data-template="v-fc:BlankTemplate"></div>
  </div>
`;
