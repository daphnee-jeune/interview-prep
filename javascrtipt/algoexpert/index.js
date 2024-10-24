const questions_api_endpoint = "https://www.algoexpert.io/api/fe/questions";
const submissions_api_endpoint = "https://www.algoexpert.io/api/fe/submissions";

// https://www.youtube.com/watch?v=ai1zmNO5Z3E&t=1205s => 20mns

// Fetch the questions from the API
const fetchQuestions = async () => {
  const response = await fetch(questions_api_endpoint);
  const questions = await response.json();
  return questions;
};

// Transform the data shape to be grouped by category
const getQuestionsByCategory = (questions) => {
  const questionsByCategory = {};
  // loop through each question
  questions.forEach((question) => {
    // check if the category property is present on each element of the obj
    if (questionsByCategory.hasOwnProperty(question.category)) {
      // if so, then make the category the key and push the value to the array
      questionsByCategory[question.category].push(question);
    } else {
      // if not, create a new array with the question in it
      questionsByCategory[question.category] = [question];
    }
  });
  return questionsByCategory;
};

// Append questions to the dom
const createCategory = (category, questions) => {
  const categoryDiv = document.createElement("div"); // create category div
  categoryDiv.classList.add("category"); // add class onto category div
  const h2 = document.createElement("h2"); // create category title div
  h2.textContent = category; // dynamically embed category title in div
  categoryDiv.append(h2); // append category title to category div
  questions.forEach((question) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question"); // add class onto question div
    const h3 = document.createElement("h3"); // create question node
    h3.textContent = question.name; // dynamically embed question title in div
    questionDiv.append(h3); // append question title to question div
    categoryDiv.append(questionDiv); // append question div to category div
  });
  return categoryDiv;
};

// fetch questions and get the questionsByCatogory object to properly display them in the UI by the category
const fetchAndAppendQuestions = async () => {
  const questions = await fetchQuestions();
  const questionsByCategory = getQuestionsByCategory(questions);

  const wrapper = document.getElementById("wrapper"); // grab (pre existing) wrapper div

  // for each category propety found in the object, create a category and append it to the page
  // iterate through the quesions by category object where the key is the category and vals are the questions
  for (const [category, questions] of Object.entries(questionsByCategory)) {
    const categoryDiv = createCategory(category, questions); // create category obj for each category
    wrapper.appendChild(categoryDiv); // append category to main wrapper
  }
};

fetchAndAppendQuestions(); // call fn to display questions by category on the UI
