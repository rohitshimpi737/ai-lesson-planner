// import jsPDF from "jspdf";
// import "jspdf-autotable";

// export const generatePDF = (lessonDetails) => {
//   const doc = new jsPDF();

//   // Title
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(18);
//   doc.text("Lesson Plan", 105, 15, { align: "center" });

//   // Lesson Details Section
//   doc.setFontSize(12);
//   doc.setFont("helvetica", "normal");
//   let yPos = 30;

//   doc.text(`Topic: ${lessonDetails.topic}`, 10, yPos);
//   yPos += 8;
//   doc.text(`Subject: ${lessonDetails.subject}`, 10, yPos);
//   yPos += 8;
//   doc.text(`Grade Level: ${lessonDetails.gradeLevel}`, 10, yPos);
//   yPos += 8;
//   doc.text(`Main Concept: ${lessonDetails.mainConcept}`, 10, yPos);
//   yPos += 8;
//   doc.text(`Date: ${lessonDetails.date}`, 10, yPos);
//   yPos += 12;

//   // Function to handle both array and string formats
//   const formatList = (title, data, startY) => {
//     doc.text(title, 10, startY);
//     (Array.isArray(data) ? data : data.split("\n")).forEach((item, index) => {
//       doc.text(`- ${item}`, 15, startY + (index + 1) * 6);
//     });
//     return (
//       startY +
//       (Array.isArray(data) ? data.length : data.split("\n").length) * 6 +
//       6
//     );
//   };

//   yPos = formatList("Subtopics:", lessonDetails.subtopics, yPos);
//   yPos = formatList("Materials Needed:", lessonDetails.materials, yPos);
//   yPos = formatList("Learning Objectives:", lessonDetails.objectives, yPos);

//   // Lesson Outline (Using AutoTable for Better Formatting)
//   if (lessonDetails.lessonOutline.length > 0) {
//     doc.text("Lesson Outline:", 10, yPos);
//     yPos += 6;

//     const tableData = lessonDetails.lessonOutline.map((section) => [
//       section.section,
//       section.content,
//       section.duration,
//     ]);

//     doc.autoTable({
//       startY: yPos,
//       head: [["Section", "Content", "Duration"]],
//       body: tableData,
//       theme: "grid",
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [100, 100, 255] },
//       columnStyles: {
//         0: { cellWidth: 40 },
//         1: { cellWidth: 100 },
//         2: { cellWidth: 30 },
//       },
//     });
//   }

//   // Save PDF
//   doc.save("Lesson_Plan.pdf");
// };

// import jsPDF from "jspdf";
// import "jspdf-autotable";

// export const generatePDF = (lessonDetails) => {
//   const doc = new jsPDF();

//   // Colors and styles
//   const STYLES = {
//     PURPLE: [94, 92, 230],
//     TABLE_GREY: [241, 241, 246],
//     MARGIN_LEFT: 10,
//     MARGIN_RIGHT: 10,
//     PAGE_WIDTH: doc.internal.pageSize.width,
//     HEADER_HEIGHT: 10
//   };

//   const contentWidth = STYLES.PAGE_WIDTH - STYLES.MARGIN_LEFT - STYLES.MARGIN_RIGHT;
//   let yPos = 20;

//   // Title
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text(`Topic: ${lessonDetails.topic || ""}`, STYLES.MARGIN_LEFT, yPos);
//   yPos += 15;

//   // Summary Section
//   doc.setFillColor(...STYLES.PURPLE);
//   doc.rect(STYLES.MARGIN_LEFT, yPos, contentWidth, STYLES.HEADER_HEIGHT, 'F');
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(12);
//   doc.text("Summary", STYLES.MARGIN_LEFT + 2, yPos + 7);
//   yPos += STYLES.HEADER_HEIGHT + 5;

//   // Summary Table with actual data
//   const summaryFields = [
//     { label: "Date", value: lessonDetails.date || "" },
//     { label: "Subject", value: lessonDetails.subject || "" },
//     { label: "Year Group or Grade Level", value: lessonDetails.gradeLevel || "" },
//     { label: "Main Topic or Unit", value: lessonDetails.mainConcept || "" },
//     {
//       label: "Subtopics or Key Concepts",
//       value: Array.isArray(lessonDetails.subtopics)
//         ? lessonDetails.subtopics.join(", ")
//         : lessonDetails.subtopics || ""
//     }
//   ];

//   doc.setTextColor(0, 0, 0);
//   doc.setFontSize(10);

//   summaryFields.forEach((field, index) => {
//     const rowY = yPos + (index * 12);

//     if (index % 2 === 0) {
//       doc.setFillColor(...STYLES.TABLE_GREY);
//       doc.rect(STYLES.MARGIN_LEFT, rowY, contentWidth, 12, 'F');
//     }

//     doc.setFont("helvetica", "bold");
//     doc.text(field.label, STYLES.MARGIN_LEFT + 2, rowY + 8);
//     doc.setFont("helvetica", "normal");
//     doc.text(field.value.toString(), STYLES.MARGIN_LEFT + contentWidth * 0.4, rowY + 8);
//   });

//   yPos += (summaryFields.length * 12) + 15;

//   // Materials Section
//   doc.setFillColor(...STYLES.PURPLE);
//   doc.rect(STYLES.MARGIN_LEFT, yPos, contentWidth, STYLES.HEADER_HEIGHT, 'F');
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(12);
//   doc.text("Materials Needed", STYLES.MARGIN_LEFT + 2, yPos + 7);
//   yPos += STYLES.HEADER_HEIGHT + 5;

//   // Materials list with actual data
//   doc.setTextColor(0, 0, 0);
//   doc.setFontSize(10);

//   const materials = Array.isArray(lessonDetails.materials)
//     ? lessonDetails.materials
//     : [lessonDetails.materials].filter(Boolean);

//   materials.forEach(material => {
//     if (material) {
//       doc.rect(STYLES.MARGIN_LEFT + 2, yPos - 3, 4, 4);
//       doc.text(material.toString(), STYLES.MARGIN_LEFT + 8, yPos);
//       yPos += 8;
//     }
//   });

//   yPos += 10;

//   // Learning Objectives Section
//   doc.setFillColor(...STYLES.PURPLE);
//   doc.rect(STYLES.MARGIN_LEFT, yPos, contentWidth, STYLES.HEADER_HEIGHT, 'F');
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(12);
//   doc.text("Learning Objectives", STYLES.MARGIN_LEFT + 2, yPos + 7);
//   yPos += STYLES.HEADER_HEIGHT + 5;

//   // Learning Objectives with actual data
//   doc.setTextColor(0, 0, 0);
//   doc.setFontSize(10);

//   const objectives = Array.isArray(lessonDetails.objectives)
//     ? lessonDetails.objectives
//     : [lessonDetails.objectives].filter(Boolean);

//   objectives.forEach((objective, index) => {
//     if (objective) {
//       const bulletPoint = `${index + 1}. `;
//       doc.text(bulletPoint + objective.toString(), STYLES.MARGIN_LEFT + 2, yPos);
//       yPos += 8;
//     }
//   });

//   // Lesson Outline Section
//   if (lessonDetails.lessonOutline?.length > 0) {
//     yPos += 15;

//     doc.setFillColor(...STYLES.PURPLE);
//     doc.rect(STYLES.MARGIN_LEFT, yPos, contentWidth, STYLES.HEADER_HEIGHT, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.text("Lesson Outline", STYLES.MARGIN_LEFT + 2, yPos + 7);
//     yPos += STYLES.HEADER_HEIGHT + 5;

//     doc.autoTable({
//       startY: yPos,
//       head: [["Section", "Content", "Duration"]],
//       body: lessonDetails.lessonOutline.map(section => [
//         section.section || "",
//         section.content || "",
//         section.duration || ""
//       ]),
//       theme: "grid",
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: STYLES.PURPLE },
//       columnStyles: {
//         0: { cellWidth: 40 },
//         1: { cellWidth: 100 },
//         2: { cellWidth: 30 }
//       }
//     });
//   }

//   doc.save("Lesson_Plan.pdf");
// };

import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (lessonDetails) => {
  const doc = new jsPDF();

  // Colors and styles
  const STYLES = {
    PURPLE: [94, 92, 230],
    TABLE_GREY: [241, 241, 246],
    MARGIN_LEFT: 10,
    MARGIN_RIGHT: 10,
    PAGE_WIDTH: doc.internal.pageSize.width,
    HEADER_HEIGHT: 10,
    LINE_HEIGHT: 6,
  };

  const contentWidth =
    STYLES.PAGE_WIDTH - STYLES.MARGIN_LEFT - STYLES.MARGIN_RIGHT;
  let yPos = 20;

  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(`Topic: ${lessonDetails.topic || ""}`, STYLES.MARGIN_LEFT, yPos);
  yPos += 15;

  // Summary Section
  doc.setFillColor(...STYLES.PURPLE);
  doc.rect(STYLES.MARGIN_LEFT, yPos, contentWidth, STYLES.HEADER_HEIGHT, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text("Summary", STYLES.MARGIN_LEFT + 2, yPos + 7);
  yPos += STYLES.HEADER_HEIGHT + 5;

  // Process subtopics
  const subtopicsArray = Array.isArray(lessonDetails.subtopics)
    ? lessonDetails.subtopics
    : lessonDetails.subtopics
    ? lessonDetails.subtopics.split(",").map((s) => s.trim())
    : [];

  // Calculate height needed for subtopics
  const subtopicsHeight = Math.max(
    12,
    subtopicsArray.length * STYLES.LINE_HEIGHT
  );

  // Summary Table with modified subtopics handling
  const summaryFields = [
    { label: "Date", value: lessonDetails.date || "", height: 12 },
    { label: "Subject", value: lessonDetails.subject || "", height: 12 },
    {
      label: "Year Group or Grade Level",
      value: lessonDetails.gradeLevel || "",
      height: 12,
    },
    {
      label: "Main Topic or Unit",
      value: lessonDetails.mainConcept || "",
      height: 12,
    },
    {
      label: "Subtopics or Key Concepts",
      value: subtopicsArray,
      height: subtopicsHeight,
    },
  ];

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);

  let currentY = yPos;

  summaryFields.forEach((field, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(...STYLES.TABLE_GREY);
      doc.rect(STYLES.MARGIN_LEFT, currentY, contentWidth, field.height, "F");
    }

    doc.setFont("helvetica", "bold");
    doc.text(field.label, STYLES.MARGIN_LEFT + 2, currentY + 8);
    doc.setFont("helvetica", "normal");

    if (Array.isArray(field.value)) {
      // Handle subtopics array
      field.value.forEach((item, i) => {
        doc.text(
          item.toString(),
          STYLES.MARGIN_LEFT + contentWidth * 0.4,
          currentY + 8 + i * STYLES.LINE_HEIGHT
        );
      });
    } else {
      // Handle single line items
      doc.text(
        field.value.toString(),
        STYLES.MARGIN_LEFT + contentWidth * 0.4,
        currentY + 8
      );
    }

    currentY += field.height;
  });

  yPos = currentY + 15;

  // [Rest of the code remains the same...]
  // Materials Section
  doc.setFillColor(...STYLES.PURPLE);
  doc.rect(STYLES.MARGIN_LEFT, yPos, contentWidth, STYLES.HEADER_HEIGHT, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text("Materials Needed", STYLES.MARGIN_LEFT + 2, yPos + 7);
  yPos += STYLES.HEADER_HEIGHT + 5;

  // Materials list with actual data
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);

  const materials = Array.isArray(lessonDetails.materials)
    ? lessonDetails.materials
    : [lessonDetails.materials].filter(Boolean);

  materials.forEach((material) => {
    if (material) {
      doc.rect(STYLES.MARGIN_LEFT + 2, yPos - 3, 4, 4);
      doc.text(material.toString(), STYLES.MARGIN_LEFT + 8, yPos);
      yPos += 8;
    }
  });

  yPos += 10;

  // Learning Objectives Section
  doc.setFillColor(...STYLES.PURPLE);
  doc.rect(STYLES.MARGIN_LEFT, yPos, contentWidth, STYLES.HEADER_HEIGHT, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text("Learning Objectives", STYLES.MARGIN_LEFT + 2, yPos + 7);
  yPos += STYLES.HEADER_HEIGHT + 5;

  // Learning Objectives with actual data
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);

  const objectives = Array.isArray(lessonDetails.objectives)
    ? lessonDetails.objectives
    : [lessonDetails.objectives].filter(Boolean);

  objectives.forEach((objective, index) => {
    if (objective) {
      const bulletPoint = `${index + 1}. `;
      doc.text(
        bulletPoint + objective.toString(),
        STYLES.MARGIN_LEFT + 2,
        yPos
      );
      yPos += 8;
    }
  });

  // Lesson Outline Section
  if (lessonDetails.lessonOutline?.length > 0) {
    yPos += 15;

    doc.setFillColor(...STYLES.PURPLE);
    doc.rect(STYLES.MARGIN_LEFT, yPos, contentWidth, STYLES.HEADER_HEIGHT, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("Lesson Outline", STYLES.MARGIN_LEFT + 2, yPos + 7);
    yPos += STYLES.HEADER_HEIGHT + 5;

    doc.autoTable({
      startY: yPos,
      head: [["Section", "Content", "Duration"]],
      body: lessonDetails.lessonOutline.map((section) => [
        section.section || "",
        section.content || "",
        section.duration || "",
      ]),
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: STYLES.PURPLE },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 100 },
        2: { cellWidth: 30 },
      },
    });
  }

  doc.save(`${lessonDetails.topic}_Lesson_Plan.pdf`);
};
