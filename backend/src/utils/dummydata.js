export const dummydata = {
  courseTitle: "Introduction to JavaScript",
  courseDescription:
    "<h2>Learn the Basics of JavaScript</h2><p>JavaScript is a versatile programming language that powers the web. In this course, you will learn the fundamentals of JavaScript, including syntax, data types, and control structures.</p><p>This course is perfect for beginners who want to start their journey in web development. By the end of this course, you will be able to create interactive web pages and understand the core concepts of JavaScript.</p><ul><li>Understand the basics of programming</li><li>Learn how to manipulate the DOM</li><li>Create dynamic web applications</li></ul>",
  coursePrice: 49.99,
  isPublished: true,
  discount: 20,
  courseContent: [
    {
      chapterId: "chapter1",
      chapterOrder: 1,
      chapterTitle: "Getting Started with JavaScript",
      chapterContent: [
        {
          lectureId: "lecture1",
          lectureTitle: "What is JavaScript?",
          lectureDuration: 16,
          lectureUrl: "https://youtu.be/CBWnBi-awSA",
          isPreviewFree: true,
          lectureOrder: 1,
        },
        {
          lectureId: "lecture2",
          lectureTitle: "Setting Up Your Environment",
          lectureDuration: 19,
          lectureUrl: "https://youtu.be/4l87c2aeB4I",
          isPreviewFree: false,
          lectureOrder: 2,
        },
      ],
    },
    {
      chapterId: "chapter2",
      chapterOrder: 2,
      chapterTitle: "Variables and Data Types",
      chapterContent: [
        {
          lectureId: "lecture3",
          lectureTitle: "Understanding Variables",
          lectureDuration: 20,
          lectureUrl: "https://youtu.be/pZQeBJsGoDQ",
          isPreviewFree: true,
          lectureOrder: 1,
        },
        {
          lectureId: "lecture4",
          lectureTitle: "Data Types in JavaScript",
          lectureDuration: 10,
          lectureUrl: "https://youtu.be/ufHT2WEkkC4",
          isPreviewFree: false,
          lectureOrder: 2,
        },
      ],
    },
  ],
  educator: "675ac1512100b91a6d9b8b24",
  enrolledStudents: ["user_2vmHBGBUWYq09kWpcWpzkmnZ8q5"],
  courseRatings: [
    {
      userId: "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
      rating: 5,
      _id: "6773e37360cb0ab974342314",
    },
  ],
  courseThumbnail: "https://img.youtube.com/vi/CBWnBi-awSA/maxresdefault.jpg",
};

///in strip conformation you send only userid on db
