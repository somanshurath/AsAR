// Import question data from JavaScript files
import dataScience from './questions/data_science_questions';
import cloudDevops from './questions/cloud_devops_questions';
import fullStack from './questions/full_stack_questions';

const allQuestions = {
  "data_science": dataScience.assessment_questions || [],
  "cloud_devops": cloudDevops.assessment_questions || [],
  "full_stack": fullStack.assessment_questions || []
};

export default allQuestions;
