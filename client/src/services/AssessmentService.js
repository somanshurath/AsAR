import allQuestions from '../data/allQuestions';

/**
 * Service to handle assessment questions
 */
class AssessmentService {
  /**
   * Get a set of random questions for a specific track
   * 
   * @param {string} track - The learning track ('data_science', 'cloud_devops', or 'full_stack')
   * @param {number} count - Number of questions to return (default: 20)
   * @return {Array} Array of random questions
   */
  static getRandomQuestions(track, count = 20) {
    // Get questions for the selected track
    const trackQuestions = allQuestions[track] || [];
    
    // Filter out incomplete questions (those missing fields we need)
    const validQuestions = trackQuestions.filter(question => 
      question.questionID && 
      question.type && 
      question.question && 
      question.options && 
      question.options.length > 0
    );
    
    // If not enough questions, return all valid ones
    if (validQuestions.length <= count) {
      return validQuestions;
    }
    
    // Randomly select questions
    const shuffled = [...validQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Get incorrect questions with their module IDs
   * 
   * @param {Object} userAnswers - Object with questionID as keys and user's answers as values
   * @param {Array} questions - Array of questions that were answered
   * @return {Array} Array of module IDs from incorrectly answered questions
   */
  static getIncorrectModuleIds(userAnswers, questions) {
    return questions
      .filter(question => 
        // Only consider questions that have an expected answer
        question.value !== undefined &&
        // And the user provided an answer
        userAnswers[question.questionID] !== undefined &&
        // And the answer was incorrect
        userAnswers[question.questionID] !== question.value
      )
      .map(question => question.moduleId);
  }
}

export default AssessmentService;
