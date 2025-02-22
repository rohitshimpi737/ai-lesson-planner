import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { Loader2, WandSparkles } from "lucide-react";

const LessonForm = ({
  lessonDetails,
  handleChange,
  handleGenerateLesson,
  loading,
}) => {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="topic"
            className="text-sm font-medium dark:text-foreground"
          >
            Lesson Topic
          </Label>
          <Input
            id="topic"
            name="topic"
            placeholder="Enter lesson topic"
            value={lessonDetails.topic}
            onChange={handleChange}
            className="h-11 focus-visible:ring-2 focus-visible:ring-purple-600 dark:focus-visible:ring-primary dark:bg-muted dark:border-border dark:text-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="gradeLevel"
            className="text-sm font-medium dark:text-foreground"
          >
            Grade Level
          </Label>
          <Input
            id="gradeLevel"
            name="gradeLevel"
            placeholder="Enter grade level"
            value={lessonDetails.gradeLevel}
            onChange={handleChange}
            className="h-11 focus-visible:ring-2 focus-visible:ring-purple-600 dark:focus-visible:ring-primary dark:bg-muted dark:border-border dark:text-foreground"          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="mainConcept"
          className="text-sm font-medium dark:text-foreground"
        >
          Main Concept
        </Label>
        <Input
          id="mainConcept"
          name="mainConcept"
          placeholder="Enter main concept"
          value={lessonDetails.mainConcept}
          onChange={handleChange}
          className="h-11 focus-visible:ring-2 focus-visible:ring-purple-600 dark:focus-visible:ring-primary dark:bg-muted dark:border-border dark:text-foreground"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="subtopics"
            className="text-sm font-medium dark:text-foreground"
          >
            Subtopics{" "}
            <span className="text-muted-foreground dark:text-muted-foreground">
              (comma separated)
            </span>
          </Label>
          <Textarea
            id="subtopics"
            name="subtopics"
            placeholder="Enter subtopics"
            value={lessonDetails.subtopics}
            onChange={handleChange}
            className="min-h-[100px] focus-visible:ring-2 focus-visible:ring-purple-600 dark:focus-visible:ring-primary dark:bg-muted dark:border-border dark:text-foreground"
          />
          <p className="text-sm text-muted-foreground dark:text-muted-foreground text-right">
            {lessonDetails.subtopics.length}/200 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="materials"
            className="text-sm font-medium dark:text-foreground"
          >
            Materials Needed
          </Label>
          <Textarea
            id="materials"
            name="materials"
            placeholder="List required materials"
            value={lessonDetails.materials}
            onChange={handleChange}
            className="min-h-[100px] focus-visible:ring-2 focus-visible:ring-purple-600 dark:focus-visible:ring-primary dark:bg-muted dark:border-border dark:text-foreground"
          />
          <p className="text-sm text-muted-foreground dark:text-muted-foreground text-right">
            {lessonDetails.materials.length}/200 characters
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="objectives"
          className="text-sm font-medium dark:text-foreground"
        >
          Learning Objectives{" "}
          <span className="text-muted-foreground dark:text-muted-foreground">
            (one per line)
          </span>
        </Label>
        <Textarea
          id="objectives"
          name="objectives"
          placeholder="Enter learning objectives"
          value={lessonDetails.objectives}
          onChange={handleChange}
          className="min-h-[150px] focus-visible:ring-2 focus-visible:ring-purple-600 dark:focus-visible:ring-primary dark:bg-muted dark:border-border dark:text-foreground"
        />
        <p className="text-sm text-muted-foreground dark:text-muted-foreground text-right">
          {lessonDetails.objectives.length}/500 characters
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          size="lg"
          onClick={handleGenerateLesson}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-primary dark:to-primary/80 dark:hover:from-primary/90 dark:hover:to-primary h-12 text-lg font-semibold text-white transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin text-white dark:text-foreground" />
              Generating...
            </>
          ) : (
            <>
              <WandSparkles className="mr-2 h-5 w-5 text-white dark:text-foreground" />
              Generate AI Lesson Plan
            </>
          )}
        </Button>

        <Alert className="border-purple-200 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-800">
          <p className="text-sm text-purple-800 dark:text-purple-300">
            Tip: Be specific in your inputs for better AI-generated results!
          </p>
        </Alert>
      </div>
    </div>
  );
};

export default LessonForm;
