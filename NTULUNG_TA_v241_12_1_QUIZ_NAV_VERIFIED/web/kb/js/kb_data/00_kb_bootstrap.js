/* v157 modular KB bootstrap: all content sources are registered into one Main Knowledge Base. */
(function(w){
  'use strict';
  w.VQ_KB_DATA = {
    courseOrder: ["basic", "ventilation", "alveolar_gas", "perfusion", "normal_vq", "low_vq", "high_vq", "shunt", "diffusion", "oxygen_content", "integrated_disease"],
    courses: Object.create(null),
    fineGrainedItems: [],
    pptQuestions: [],
    knowledgeRecords: [],
    knowledgeByType: Object.create(null),
    mainKnowledgeCount: 0
  };
})(window);
