/*CMPS3141-HCI - AS1-24S1
Collaborators: Christian Hope
Date: 8/22/2024
 */
import { createApp } from "https://mavue.mavo.io/mavue.js";

let app = createApp({
  data: {
    assessments: {
      project: null,
      program: null,
      finalExam: null,
    },
    homeworks: [],
    tests: [],
    calculatedGrade: null,
    showCalculatedGrade: false,
  },

  computed: {
    homeworkAverage() {
      let done = 0;
      let sum = 0;

      for (let hw of this.homeworks) {
        if (hw.grade >= 0) {
          sum += hw.grade;
          done++;
        }
      }

      return done === 0 ? 0 : sum / done;
    },
    testAverage() {
      let sum = 0;
      let numTests = 0;

      for (let testGrade of this.tests) {
        if (!isNaN(testGrade) && testGrade >= 0) {
          sum += testGrade;
          numTests++;
        }
      }

      return numTests === 0 ? 0 : sum / numTests;
    },
  },

  methods: {
    addHomework() {
      if (this.homeworks.length < 5) {
        this.homeworks.push({ grade: null });
      }
    },
    
    removeHomework() {
      if (this.homeworks.length > 0) {
        this.homeworks.pop();
      }
    },

    addTest() {
      if (this.tests.length < 2) {
        this.tests.push(null);
      }
    },

    removeTest() {
      if (this.tests.length > 0) {
        this.tests.pop();
      }
    },

    calculateGrade() {
      let p = this.assessments;
      this.calculatedGrade =
        0.05 * p.program +
        0.25 * p.project +
        0.25 * p.finalExam +
        0.25 * this.homeworkAverage +
        0.20 * this.testAverage;

      this.showCalculatedGrade = true;
    },
  },
}, "#grade_calc");
  