import courses from '../data/courses';

/**
 * Service to generate course recommendations based on assessment results
 */
class RecommendationService {
  /**
   * Generate course recommendations based on user answers and weaknesses
   * 
   * @param {Object} userAnswers - Object with questionID as keys and user's answers as values
   * @param {Array} questions - The full set of questions that were answered
   * @return {Array} Recommended courses sorted by relevance
   */
  static getRecommendations(userAnswers, questions = []) {
    // In a real implementation, this would use a more sophisticated algorithm
    // and likely involve a backend service
    
    // For this MVP, we'll implement a simple scoring system
    const scores = {};
    
    // Initialize scores for all courses
    courses.forEach(course => {
      scores[course.course_id] = 0;
    });
    
    // Track modules where the user had incorrect answers
    const moduleWeaknesses = new Set();
    
    // Identify modules where user had incorrect answers
    if (questions.length > 0) {
      questions.forEach(question => {
        if (
          question.value && 
          question.moduleId && 
          userAnswers[question.questionID] && 
          userAnswers[question.questionID] !== question.value
        ) {
          moduleWeaknesses.add(question.moduleId);
        }
      });
    }
    
    // Score courses based on user answers
    Object.entries(userAnswers).forEach(([questionId, answer]) => {
      // Basic scoring based on question domain
      if (questionId.startsWith('ds_')) {
        // Data Science related question
        scores['upgrad_ds_ai_pwc_01'] += 1;
      } else if (questionId.startsWith('fsd_')) {
        // Full Stack related question
        scores['upgrad_fs_iitb_01'] += 1;
      } else if (questionId.startsWith('cd_')) {
        // Cloud/DevOps related question
        scores['upgrad_devops_01'] += 1;
      }
      
      // Track/interest specific scoring
      if (questionId === 'track_selection') {
        // Give a significant boost based on the user's selected track
        if (answer === 'data_science') {
          scores['upgrad_ds_ai_pwc_01'] += 5;
        } else if (answer === 'full_stack') {
          scores['upgrad_fs_iitb_01'] += 5;
        } else if (answer === 'cloud_devops') {
          scores['upgrad_devops_01'] += 5;
        }
      }
    });
    
    // Boost scores for courses that address the user's weaknesses
    if (moduleWeaknesses.size > 0) {
      courses.forEach(course => {
        // This is a simplified example - in a real app, you would have a mapping
        // between course modules and the skills they teach
        const courseModules = this.getCourseModules(course.course_id);
        
        // Check for overlap between course modules and user weaknesses
        moduleWeaknesses.forEach(weakModule => {
          if (courseModules.includes(weakModule)) {
            // Boost the score for courses that address user's weaknesses
            scores[course.course_id] += 3;
          }
        });
      });
    }
    
    // Sort courses by score
    const sortedCourses = [...courses].sort((a, b) => {
      return scores[b.course_id] - scores[a.course_id];
    });
    
    return sortedCourses;
  }
  
  /**
   * Get modules covered by a specific course (simplified mapping)
   * 
   * @param {string} courseId - The ID of the course
   * @return {Array} Array of module IDs covered by the course
   */
  static getCourseModules(courseId) {
    // This is a simplified mapping - in a real application, this would come from your backend
    const courseModuleMap = {
      'upgrad_ds_ai_pwc_01': ['ds_c1_m1', 'ds_c1_m2', 'ds_c2_m1', 'ds_c2_m2', 'ds_c3_m1'],
      'upgrad_fs_iitb_01': ['fsd_c1_m1', 'fsd_c1_m2', 'fsd_c2_m1', 'fsd_c2_m2', 'fsd_c3_m1'],
      'upgrad_devops_01': ['cd_c1_m1', 'cd_c1_m2', 'cd_c2_m1', 'cd_c2_m2', 'cd_c2_m3']
    };
    
    return courseModuleMap[courseId] || [];
  }
}

export default RecommendationService;
