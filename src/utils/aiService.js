import axios from "axios";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const API_KEY = import.meta.env.VITE_API_KEY; // Use environment variable for API key

export const generateLessonPlan = async (lessonDetails) => {
  try {
    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate a detailed lesson plan in **JSON format** with the following structure:
                
                {
                  "topic": "Lesson Topic",
                  "gradeLevel": "Grade Level",
                  "subject": "Subject_Name",
                  "mainConcept": "Main Concept",
                  "subtopics": ["Subtopic 1", "Subtopic 2"],
                  "materials": ["Material 1", "Material 2"],
                  "objectives": ["Objective 1", "Objective 2"],
                  "lessonOutline": [
                    {
                      "section": "Introduction",
                      "content": "Explain the topic briefly.",
                      "duration": "5 minutes"
                    },
                    {
                      "section": "Main Lesson",
                      "content": "Go in-depth into the topic with examples.",
                      "duration": "20 minutes"
                    }
                  ]
                }
  
                Now generate a lesson plan for:
                - **Topic:** ${lessonDetails.topic}
                - **Main Concept:** ${lessonDetails.mainConcept}
                - **Grade Level:** ${lessonDetails.gradeLevel}
                - **Subtopics:** ${lessonDetails.subtopics}
                - **Materials:** ${lessonDetails.materials}
                - **Objectives:** ${lessonDetails.objectives}
  
                Make sure the response **ONLY CONTAINS JSON** with no additional text.
                `,
            },
          ],
        },
      ],
    });

    let jsonResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Response:", jsonResponse);

    if (!jsonResponse) {
      throw new Error("Invalid response format");
    }

    // Ensure response is valid JSON
    jsonResponse = jsonResponse.trim(); // Remove extra spaces or line breaks

    if (jsonResponse.startsWith("```json")) {
      jsonResponse = jsonResponse.replace(/```json|```/g, "").trim(); // Remove code block markers
    }

    const lessonPlanObject = JSON.parse(jsonResponse); // Convert JSON response to an object

    console.log("Lesson Plan Object:", lessonPlanObject);
    return lessonPlanObject;
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    return null;
  }
};
