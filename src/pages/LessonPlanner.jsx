import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateLessonPlan } from "@/utils/aiService";
import { generatePDF } from "../utils/generatePdf";
import { Card } from "@/components/ui/card";
import LessonForm from "@/components/LessonForm";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import { Download, BookOpen, AlertTriangle } from "react-feather";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { DetailItem, DetailSection } from "@/components/ui/detail";
import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LessonPlanner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/");
    }
  }, [navigate]);

  const [lessonDetails, setLessonDetails] = useState({
    topic: "Water Cycle",
    gradeLevel: "4th Grade",
    subject: "", // New field for subject
    mainConcept: "Understanding the Water Cycle Process",
    subtopics: "",
    materials: "",
    objectives: "",
    lessonOutline: [],
    date: new Date().toLocaleDateString(), // Add date field
  });

  const [savedLessons, setSavedLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedLessons = localStorage.getItem("savedLessons");
    if (storedLessons) {
      setSavedLessons(JSON.parse(storedLessons));
    }
  }, []);

  const handleChange = (e) => {
    setLessonDetails({ ...lessonDetails, [e.target.name]: e.target.value });
  };

  const handleGenerateLesson = async () => {
    setLoading(true);

    try {
      const lessonPlanObject = await generateLessonPlan(lessonDetails);

      if (
        !lessonPlanObject ||
        typeof lessonPlanObject !== "object" ||
        !lessonPlanObject.topic
      ) {
        throw new Error("Invalid lesson plan received from AI");
      }

      // Add date field to the generated lesson plan
      lessonPlanObject.date = new Date().toLocaleDateString();

      setLessonDetails(lessonPlanObject);

      const updatedLessons = [lessonPlanObject, ...savedLessons];
      setSavedLessons(updatedLessons);
      localStorage.setItem("savedLessons", JSON.stringify(updatedLessons));
    } catch (error) {
      console.error("Error generating lesson plan:", error);
      alert("Failed to generate a valid lesson plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadSavedLesson = (lesson) => {
    setLessonDetails(lesson);
  };

  const deleteLesson = (index) => {
    const updatedLessons = savedLessons.filter((_, i) => i !== index);
    setSavedLessons(updatedLessons);
    localStorage.setItem("savedLessons", JSON.stringify(updatedLessons));
  };
  return (
    <div className="dark:bg-background min-h-screen">
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-background p-8 transition-colors duration-300">
        <Card className="max-w-4xl mx-auto p-6 shadow-xl rounded-xl border-0 dark:bg-card dark:border-border">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Lesson Planner
              </h1>
              <p className="text-gray-600 dark:text-muted-foreground mt-2">
                Create engaging lesson plans with AI
              </p>
            </div>
          </div>

          <Tabs defaultValue="form" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-accent">
              <TabsTrigger
                value="form"
                className="dark:data-[state=active]:bg-primary dark:text-foreground"
              >
                Create New
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="dark:data-[state=active]:bg-primary dark:text-foreground"
              >
                Saved Plans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <Card className="p-6 bg-gray-50 dark:bg-card border-0 dark:border-border">
                <LessonForm
                  lessonDetails={lessonDetails}
                  handleChange={handleChange}
                  handleGenerateLesson={handleGenerateLesson}
                  loading={loading}
                />
                {lessonDetails.topic && (
                  <div className="mt-8 space-y-6 dark:text-black">
                    <Separator className="my-6 dark:bg-border" />

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold  ">
                        Generated Plan
                      </h3>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="details" className="border-0">
                          <AccordionTrigger className="hover:no-underline dark:hover:bg-accent">
                            <div className="flex items-center gap-2 dark:text-black">
                              <BookOpen className="h-4 w-4 text-purple-600 dark:text-primary" />
                              <span>View Lesson Details</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 p-4 bg-white dark:bg-card rounded-lg dark:border-border dark:text-black">
                              <div className="grid grid-cols-2 gap-4">
                                <DetailItem
                                  label="Topic"
                                  value={lessonDetails.topic}
                                  darkMode
                                />
                                <DetailItem
                                  label="Grade Level"
                                  value={lessonDetails.gradeLevel}
                                  darkMode
                                />
                                <DetailItem
                                  label="Subject"
                                  value={lessonDetails.subject}
                                  darkMode
                                />
                                <DetailItem
                                  label="Date"
                                  value={lessonDetails.date}
                                  darkMode
                                />
                              </div>

                              <DetailSection
                                label="Main Concept"
                                value={lessonDetails.mainConcept}
                                darkMode
                              />
                              <DetailSection
                                label="Subtopics"
                                value={lessonDetails.subtopics}
                                darkMode
                              />
                              <DetailSection
                                label="Materials"
                                value={lessonDetails.materials}
                                darkMode
                              />
                              <DetailSection
                                label="Objectives"
                                value={lessonDetails.objectives}
                                darkMode
                              />

                              <div className="space-y-2">
                                <h4 className="font-medium dark:text-black">
                                  Lesson Outline
                                </h4>
                                <Table className="dark:border-border dark:text-black">
                                  <TableHeader className="dark:bg-muted">
                                    <TableRow className="dark:border-muted">
                                      <TableHead className="dark:text-black">
                                        Section
                                      </TableHead>
                                      <TableHead className="dark:text-black">
                                        Content
                                      </TableHead>
                                      <TableHead className="dark:text-black">
                                        Duration
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {lessonDetails.lessonOutline.map(
                                      (section, index) => (
                                        <TableRow
                                          key={index}
                                          className="dark:border-muted"
                                        >
                                          <TableCell className="font-medium dark:text-black">
                                            {section.section}
                                          </TableCell>
                                          <TableCell className="dark:text-black">
                                            {section.content}
                                          </TableCell>
                                          <TableCell className="dark:text-black">
                                            {section.duration}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    <div className="flex gap-4 justify-end mt-6">
                      <Button
                        variant="outline"
                        className="dark:border-border dark:text-foreground dark:hover:bg-accent"
                        onClick={() => setLessonDetails(initialState)}
                      >
                        Reset
                      </Button>
                      <Button
                        className="bg-purple-600 hover:bg-purple-700 dark:bg-primary dark:hover:bg-primary/90"
                        onClick={() => generatePDF(lessonDetails)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="saved">
              <Card className="p-6 bg-gray-50 dark:bg-card border-0 dark:border-border">
                <h3 className="text-xl font-semibold mb-4 dark:text-black">
                  Saved Lesson Plans
                </h3>
                {savedLessons.length > 0 ? (
                  <div className="space-y-4">
                    {savedLessons.map((lesson, index) => (
                      <Card
                        key={index}
                        className="p-4 hover:bg-gray-100 dark:hover:bg-accent transition-colors dark:bg-muted"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium dark:text-black">
                              {lesson.topic}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-muted-foreground">
                              {lesson.gradeLevel} • {lesson.date}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="dark:bg-primary dark:hover:bg-primary/90"
                              onClick={() => loadSavedLesson(lesson)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="dark:bg-primary dark:hover:bg-primary/90"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteLesson(index);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-gray-500 dark:text-muted-foreground py-12">
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    <p>No saved lesson plans found</p>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default LessonPlanner;
