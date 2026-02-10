import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
const projects = [
  {
    title: "LLM openrouter",
    description:
      "LLM Council is a local ChatGPT-style app that queries multiple LLMs via OpenRouter, has them critique/rank each other, and uses a “Chair” model to synthesize a single best final answer.",
    image: `${import.meta.env.BASE_URL}projects/project1.png`,
    tags: ["Multi-LLM orchestration", "Prompt engineering", "Full-stack web development"],
    link: "https://github.com/abhyush/LLM_openrouter",
  },
  {
    title: "Automatic Number Plate Recognition",
    description:
      "This project is a real-time Automatic Number Plate Recognition (ANPR) system designed to detect and track vehicle license plates. It uses YOLO for object detection, AWS Kinesis for video streaming, and AWS services like S3, DynamoDB, and Lambda for data storage, processing, and visualization.",
    image: `${import.meta.env.BASE_URL}projects/pipeline.jpg`,
    tags: ["AWS", "ETL", "YOLO", "OCR"],
    link: "https://github.com/abhyush/real-time-license-plate-recognition/tree/main",
    github: "#",
  },
  {
    title: "Gemini LLM Application with Streamlit",
    description:
      "This project demonstrates the use of Google's Gemini Pro language model for an interactive Q&A application. Built with Streamlit, the app allows users to ask questions, receive responses, and maintain a chat history. The Gemini Pro model processes user queries and provides intelligent, conversational responses.",
    image: `${import.meta.env.BASE_URL}projects/Gemini_.png`,
    tags: ["React", "OpenAI", "Python", "FastAPI"],
    link: "https://huggingface.co/abhyush",
    github: "#",
  },
  {
    title: "British Airways Reviews Dashboard: Sentiment Analysis & Insights",
    description:
      "Built an interactive Tableau dashboard for British Airways reviews to track service ratings, monthly trends, country-wise performance, and aircraft comparisons with filters for seat type, traveler type, aircraft, and date range (2016–2023).",
    image: `${import.meta.env.BASE_URL}projects/Dashboard.png`,
    tags: ["Next.js", "Socket.io", "MongoDB", "Redis"],
    link: "https://github.com/abhyush/British-Airways-Reviews-Dashboard-Sentiment-Analysis-Insights",
    github: "#",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}
              make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of my recent work,
            innovative tools that solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 
                bg-gradient-to-t from-card via-card/50
                 to-transparent opacity-60"
                />
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                  <a
                    href={project.github}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    className="w-5 h-5 
                  text-muted-foreground group-hover:text-primary
                   group-hover:translate-x-1 
                   group-hover:-translate-y-1 transition-all"
                  />
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <a
            href="https://github.com/abhyush"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimatedBorderButton>
              View All Projects
              <ArrowUpRight className="w-5 h-5" />
            </AnimatedBorderButton>
          </a>
        </div>
      </div>
    </section>
  );
};
