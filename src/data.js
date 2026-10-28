export const PORTFOLIO_DATA = {
  profile: {
    name: "Nuyra Swanson",
    role: "ICT: Application Development Student",
    institution: "Cape Peninsula University of Technology (CPUT)",
    headline: "Building secure, user-centric software, healthcare solutions, and robust systems.",
    location: "Cape Town, South Africa",
    studentEmail: "221290524@mycput.ac.za",
    phone: "+27 65 821 1952",
    githubUrl: "https://github.com/NuyraSwanson",
    githubUsername: "NuyraSwanson",
    avatarImage: "/assets/aistudio/new_image_069717ee.jpeg",
    cvDownloadPath: "/CV_Nuyra_Swanson 2026.docx",
    githubEvidenceImage: "/GithubAccount-screenshot.jpeg",
    demoVideoUrl: "https://github.com/user-attachments/assets/010ae0ee-59dd-44f7-bfcd-3cebe5f3585a",
    careConnectLiveUrl: "https://care-connect-delta-puce.vercel.app/",
    careConnectRepoUrl: "https://github.com/PamMasina/CareConnect.git",
    aboutBio: `Innovative ICT: Application Development student at Cape Peninsula University of Technology (CPUT) with a strong foundation in Java, database integration, systems development, and front-end technologies. Certified in application security and core IT security concepts. Passionate about building secure, user-centric software and contributing to collaborative, quality-driven development teams.`,
    stats: [
      { label: "Industry Placement", value: "CareConnect PWA" },
      { label: "Degree Program", value: "Diploma in ICT (CPUT)" },
      { label: "Core Competency", value: "Java & System Architecture" },
      { label: "Student Pack", value: "GitHub Verified" }
    ]
  },

  projects: [
    {
      id: "unihome-accommodation",
      title: "UniHome Accommodation Application",
      subtitle: "Desktop Student Housing Portal",
      category: "Java",
      technologies: ["Java", "Java Swing", "MySQL", "JDBC", "OOP"],
      description: "A secure desktop application engineered for student housing registration, credentialed login, and room accommodation workflows with real-time database validation.",
      highlights: [
        "Architected complete desktop GUI with Java Swing and custom event-dispatching listeners",
        "Implemented secure database connectivity using JDBC with parameterized prepared statements",
        "Applied Object-Oriented principles (Encapsulation, Polymorphism) to guarantee extensible code",
        "Constructed comprehensive client-side input validation and error feedback loops"
      ],
      architectureDetails: "Organized following the Data Access Object (DAO) pattern to cleanly decouple the Swing presentation tier from the MySQL relational storage tier. Employs transaction rollback routines on failed allocations.",
      codeSnippet: {
        language: "java",
        title: "UniHome DB Connection & Prepared Query",
        code: `public class AccommodationDAO {
    private static final String URL = "jdbc:mysql://localhost:3306/unihome_db";
    private static final String USER = "app_user";
    private static final String PASS = "SecurePass2026!";

    public boolean registerStudent(Student student) {
        String query = "INSERT INTO students (id, full_name, email, room_pref) VALUES (?, ?, ?, ?)";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setString(1, student.getStudentId());
            ps.setString(2, student.getFullName());
            ps.setString(3, student.getEmail());
            ps.setString(4, student.getRoomPreference());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Database Error: " + e.getMessage());
            return false;
        }
    }
}`
      }
    },
    {
      id: "enrollment-management-system",
      title: "Student Enrollment Management System",
      subtitle: "Multi-Tier Client-Server Architecture",
      category: "Systems",
      technologies: ["Java", "Java Swing", "Socket Programming", "Client-Server", "MySQL", "RBAC"],
      description: "A distributed client-server application supporting concurrent student course registrations and administrative curriculum governance with role-based authorization.",
      highlights: [
        "Engineered dual client modules for Students and Administrators with separate access boundaries",
        "Implemented TCP socket communication with custom serialized packet protocol",
        "Enabled seamless academic module enrollment, capacity checks, and transcript auditing",
        "Hardened role-based access control (RBAC) to restrict administrative endpoints"
      ],
      architectureDetails: "Multi-threaded server architecture that spawns dedicated ClientHandler threads for each connection. Synchronizes concurrent enrollment locks to prevent race conditions during course capacity depletion.",
      codeSnippet: {
        language: "java",
        title: "Client-Server Socket Handler",
        code: `public class EnrollmentServer {
    private static final int PORT = 8080;
    
    public void startServer() {
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Enrollment Server listening on port " + PORT);
            while (true) {
                Socket socket = serverSocket.accept();
                new Thread(new StudentSessionHandler(socket)).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`
      }
    },
    {
      id: "employee-management-system",
      title: "Employee Management System",
      subtitle: "Object-Oriented Enterprise Modeling",
      category: "Java",
      technologies: ["Java", "OOP", "Inheritance", "Polymorphism", "Encapsulation"],
      description: "An object-oriented employee management system utilizing inheritance to model different employee tiers and polymorphically compute payroll and role behaviors.",
      highlights: [
        "Designed base and derived employee classes to demonstrate polymorphism and code reusability",
        "Applied strict encapsulation and property accessors to guarantee domain integrity",
        "Simulated dynamic salary calculations and role-based permissions using overridden methods",
        "Implemented clean class structuring for modular extensibility"
      ],
      architectureDetails: "Hierarchical OOP architecture using abstract base classes and polymorphic method dispatch for calculating gross pay, tax deductions, and benefits across hourly, salaried, and commissioned employees.",
      codeSnippet: {
        language: "java",
        title: "Polymorphic Employee Class Hierarchy",
        code: `public abstract class Employee {
    private String id;
    private String name;
    private String department;

    public Employee(String id, String name, String department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    public abstract double calculatePay();
}

public class SalariedEmployee extends Employee {
    private double monthlySalary;

    @Override
    public double calculatePay() {
        return this.monthlySalary;
    }
}`
      }
    },
    {
      id: "interactive-quiz-system",
      title: "Interactive Quiz Application",
      subtitle: "Polymorphic Modular Console Engine",
      category: "Java",
      technologies: ["Java", "OOP", "Inheritance", "Polymorphism", "Interfaces"],
      description: "An extensible, interface-driven quiz engine demonstrating clean OOP architecture, polymorphic question evaluation, and dynamic scoring rules.",
      highlights: [
        "Structured around multiple contract interfaces defining reusable question behaviors",
        "Leveraged runtime polymorphism to dynamically evaluate multiple question formats",
        "Engineered modular scoring engine that easily incorporates new criteria",
        "Structured the application to allow seamless addition of new question types"
      ],
      architectureDetails: "Built upon the Open-Closed Principle (OCP): the QuizRunner depends strictly on the `Question` and `Scorable` interfaces, allowing arbitrary new question types to be injected without touching core evaluation logic.",
      codeSnippet: {
        language: "java",
        title: "Polymorphic Question Interface",
        code: `public interface ScorableQuestion {
    String getPrompt();
    boolean evaluateAnswer(String userInput);
    int getPoints();
}`
      }
    },
    {
      id: "personal-portfolio-web",
      title: "Personal Portfolio Website",
      subtitle: "Responsive Modern Web Engineering",
      category: "Web",
      technologies: ["HTML5", "CSS3", "JavaScript (Vanilla)", "Responsive Design"],
      description: "Created a fast, accessible, responsive portfolio showcasing projects and skills with clean layout, semantic markup, and interactive features.",
      highlights: [
        "Constructed fluid responsive grid supporting cross-device navigation seamlessly",
        "Implemented interactive components for technical skills and STAR method case studies",
        "Focused on accessible contrast ratios and high-performance lightweight delivery without heavy framework overhead"
      ],
      architectureDetails: "Semantic HTML5 structure paired with clean CSS3 styling and vanilla JavaScript interactivity."
    }
  ],

  education: [
    {
      institution: "Cape Peninsula University of Technology (CPUT)",
      degree: "Diploma in ICT: Application Development",
      period: "2024 - Present",
      location: "Cape Town, South Africa",
      status: "In Progress",
      description: "Specializing in software engineering methodologies, Java programming, enterprise database design, client-server architectures, and application security principles."
    },
    {
      institution: "Boland College - Stellenbosch Campus",
      degree: "Computer Science",
      period: "2022 - 2023",
      location: "Stellenbosch, South Africa",
      status: "Completed",
      description: "Completed rigorous coursework in algorithms, computational thinking, hardware fundamentals, introductory programming, and systems analysis."
    },
    {
      institution: "Vredenburg High School",
      degree: "National Senior Certificate (Grade 12)",
      period: "2020",
      location: "Vredenburg, Western Cape",
      status: "Completed",
      description: "Graduated with academic endorsement, excelling in mathematics, sciences, and analytical studies."
    }
  ],

  skills: [
    {
      title: "Programming Languages",
      skills: [
        { name: "Java & Java Swing", level: "Advanced", note: "Core OOP, Swing GUI, Sockets, Multi-threading" },
        { name: "SQL", level: "Intermediate", note: "Complex Queries, Joins, Triggers, Normalization" },
        { name: "JavaScript", level: "Intermediate", note: "Modern ES6+, DOM manipulation, Async/Await" },
        { name: "HTML & CSS", level: "Intermediate", note: "Semantic Layouts, Responsive Styling, Modern UI" }
      ]
    },
    {
      title: "Databases & Data Modeling",
      skills: [
        { name: "MySQL & MySQL Workbench", level: "Intermediate", note: "Schema modeling, indexes, migrations" },
        { name: "SQL Database Design", level: "Intermediate", note: "Relational 3NF architecture & ERD diagrams" },
        { name: "Database Integration (JDBC)", level: "Intermediate", note: "PreparedStatements, Connection management, DAOs" },
        { name: "Data Capturing & Management", level: "Intermediate", note: "Integrity constraints, foreign keys, ACID compliance" }
      ]
    },
    {
      title: "Development Tools",
      skills: [
        { name: "Git & GitHub", level: "Proficient", note: "Version control, branching, PRs, GitHub Pages" },
        { name: "Visual Studio Code", level: "Proficient", note: "Full-stack editing, extensions, linting" },
        { name: "IntelliJ IDEA", level: "Proficient", note: "Java builds, refactoring, profiling" },
        { name: "NetBeans", level: "Proficient", note: "Java Swing GUI Builder & Ant/Maven setups" }
      ]
    },
    {
      title: "Systems & Security Architecture",
      skills: [
        { name: "Client-Server Architecture", level: "Applied", note: "TCP networking, serialized messages" },
        { name: "Input Validation", level: "Strict", note: "Sanitization, boundary checks, regex guards" },
        { name: "Secure Coding Practices", level: "Certified", note: "OWASP awareness, SQL injection mitigation" },
        { name: "Role-Based Access Control", level: "Applied", note: "Privilege separation & access boundary enforcement" }
      ]
    }
  ],

  reflections: [
    {
      id: "markdown-reflection",
      title: "Coding in Markdown",
      category: "Documentation & Technical Writing",
      situation: "I was required to create my CV and GitHub portfolio using Markdown, which was a new way of structuring and presenting content for me.",
      task: "My task was to convert my CV into Markdown format while ensuring it remained clear, well-structured, and professional.",
      action: "I learned how to use Markdown syntax, such as headings, lists, tables, and formatting, to organise my content effectively. I focused on making the layout clean and readable while maintaining the professional structure of a CV.",
      result: "Through this process, I improved my ability to present information in a structured and developer-friendly format. I now understand how Markdown is used in real-world development environments, especially for documentation and GitHub repositories.",
      markdownSnippet: `## Reflection on Coding in Markdown (STAR Method)

**Situation:**  
I was required to create my CV and GitHub portfolio using Markdown, which was a new way of structuring and presenting content for me.

**Task:**  
My task was to convert my CV into Markdown format while ensuring it remained clear, well-structured, and professional.

**Action:**  
I learned how to use Markdown syntax, such as headings, lists, and formatting, to organise my content effectively. I focused on making the layout clean and readable while maintaining the professional structure of a CV.

**Result:**  
Through this process, I improved my ability to present information in a structured and developer-friendly format. I now understand how Markdown is used in real-world development environments, especially for documentation and GitHub repositories.`
    },
    {
      id: "interview-reflection",
      title: "Mock Interview Video",
      category: "Professional Communication",
      situation: "I was required to record a mock interview video to simulate a real job interview scenario.",
      task: "My task was to present myself professionally, communicate my skills clearly, and answer interview-style questions confidently within a limited time.",
      action: "I prepared my responses by focusing on my skills, projects, and career goals. I practiced speaking clearly and maintaining a natural tone instead of memorising answers. I also ensured that my presentation, background, and delivery were appropriate for a professional setting.",
      result: "This experience helped me improve my confidence and communication skills. I became more comfortable speaking about my abilities and presenting myself in a professional manner, which will be valuable in real job interviews.",
      markdownSnippet: `## Reflection on Mock Interview Video (STAR Method)

**Situation:**  
I was required to record a mock interview video to simulate a real job interview scenario.

**Task:**  
My task was to present myself professionally, communicate my skills clearly, and answer interview-style questions confidently within a limited time.

**Action:**  
I prepared my responses by focusing on my skills, projects, and career goals. I practiced speaking clearly and maintaining a natural tone instead of memorising answers. I also ensured that my presentation, background, and delivery were appropriate for a professional setting.

**Result:**  
This experience helped me improve my confidence and communication skills. I became more comfortable speaking about my abilities and presenting myself in a professional manner, which will be valuable in real job interviews.`
    },
    {
      id: "github-pages-reflection",
      title: "GitHub Pages Deployment",
      category: "DevOps & Online Publishing",
      situation: "I was required to publish my portfolio using GitHub Pages to showcase my work online.",
      task: "My task was to deploy my GitHub repository as a live website and ensure that all components, including my CV and mock interview video, were accessible and properly displayed.",
      action: "I set up GitHub Pages and linked it to my repository. I ensured that my README file was correctly formatted and that all links and embedded content worked as expected.",
      result: "I successfully created a live portfolio that can be shared with others. This helped me understand how developers showcase their work online and improved my confidence in using GitHub as a professional tool.",
      markdownSnippet: `## Reflection on GitHub Pages (STAR Method)

**Situation:**  
I was required to publish my portfolio using GitHub Pages to showcase my work online.

**Task:**  
My task was to deploy my GitHub repository as a live website and ensure that all components, including my CV and mock interview video, were accessible and properly displayed.

**Action:**  
I set up GitHub Pages and linked it to my repository. I ensured that my README file was correctly formatted and that all links and embedded content worked as expected.

**Result:**  
I successfully created a live portfolio that can be shared with others. This helped me understand how developers showcase their work online and improved my confidence in using GitHub as a professional tool.`
    }
  ],

  rawReadmeContent: `# Digital Portfolio - Nuyra Swanson

## Navigation
- [Professional Profile](#professional-profile)
- [Industry Placement: CareConnect](#industry-placement-careconnect)
- [Education](#education)
- [Technical Skills](#technical-skills)
- [Projects](#academic-and-personal-projects)
- [Mock Interview Video](#mock-interview-video)
- [STAR Reflections](#star-reflections)
- [Get in Touch](#get-in-touch)

---

# Nuyra Swanson
## ICT: Application Development Student
📍 Cape Town, South Africa  
🐙 https://github.com/NuyraSwanson  

---

## Professional Profile
Innovative ICT: Application Development student at CPUT with a strong foundation in Java, database integration, systems development, and front-end technologies. Certified in application security and core IT security concepts. Passionate about building secure, user-centric software and contributing to collaborative, quality-driven development teams.

---

## 🏥 Industry Placement: CareConnect
**Live Application**: [https://care-connect-delta-puce.vercel.app/](https://care-connect-delta-puce.vercel.app/)  
**GitHub Repository**: [https://github.com/PamMasina/CareConnect.git](https://github.com/PamMasina/CareConnect.git)  
**Sprint Timeline**: 12 October 2026 – 19 October 2026 (Presented: 19 October 2026)  
**My Role**: Full-Stack Application Developer & Auth Lead (Nuyra Swanson · Student: 221290524)  
**Full Agile Group Members**:
1. Siphelele Zono (Scrum Master & Backend Architecture)
2. Sinalo Kebetwana (Product Owner & Requirements / UX)
3. Nuyra Swanson (Full-Stack Application Developer & Auth Lead)
4. Andile Pamele Masin (Frontend Developer & QA / Testing)
5. Olwethu Tshingo (Database Architect & Realtime WebSockets)

CareConnect is a mobile-first progressive web application tackling healthcare waiting room delays and coordinating emergency paramedic response in Cape Town community clinics. It offers real-time queueing, digital triage, appointments booking, and a critical one-tap emergency SOS alert linked to first responders.

### Supported Roles
1. Patient (Queue tracking & SOS)
2. Triage Nurse (Queue prioritization)
3. Attending Doctor (Consultation & Clinical notes)
4. Emergency First Responder (GPS dispatch)
5. Clinic Administrator (Facility analytics)

---

## 📚 Education
### National Senior Certificate (Grade 12)
**Vredenburg High School** | *2020*

### Computer Science
**Boland College - Stellenbosch Campus** | *2022 - 2023*

### Diploma in ICT: Application Development (In Progress)
**Cape Peninsula University of Technology (CPUT)** | *2024 - Present*

---

## 💻 Technical Skills
### Programming Languages
| Language | Proficiency |
|---|---|
| Java & Java Swing | Advanced |
| SQL | Intermediate |
| JavaScript | Intermediate |
| HTML & CSS | Intermediate |

### Databases
- MySQL & MySQL Workbench
- SQL Database Design
- Database Integration (JDBC)
- Data Capturing, Modeling & Management

### Tools
- Visual Studio Code
- Netbeans
- IntelliJ IDEA
- MySQL Workbench
- Git & GitHub
- Microsoft Office (Word, Excel, PowerPoint & Outlook)

### Systems & Architecture
- Client-Server Architecture
- Input Validation
- Secure Coding Practices
- Role-Based Access Control

---

## 🚀 Academic and Personal Projects
### UniHome Accommodation Application
*Java, Java Swing, Database Integration*
- Built a desktop app for student registration, login, and accommodation applications.
- Implemented secure database connectivity and input validation.
- Applied OOP principles to improve maintainability.

### Student Enrollment Management System
*Java, Java Swing, Client-Server Architecture, Database*
- Designed a role-based client-server app for students and administrators.
- Enabled module enrollment and administrative management functions.
- Integrated database and role-based access control.

### Employee Management System
*Java, OOP, Inheritance, Polymorphism*
- Designed an object-oriented employee management system using inheritance to model different employee types.
- Implemented base and derived classes to demonstrate polymorphism and code reusability.
- Applied encapsulation and proper class structuring to improve maintainability.
- Simulated salary calculations and role-based behaviour using overridden methods.

### Interactive Quiz Application
*Java, Interfaces, OOP*
- Developed a console-based quiz system using multiple interfaces to define question behaviours.
- Implemented dynamic question handling through interface-based design.
- Applied abstraction and modular design principles for scalability.

### Personal Portfolio Website
*HTML, CSS, JavaScript*
- Created a responsive portfolio showcasing projects and skills.
- Focused on clean layout, usability, and interactive front-end features.

---

## 📬 Get in Touch
- **Student Email**: 221290524@mycput.ac.za
- **Phone**: +27 65 821 1952
- **Location**: Cape Town, South Africa
- **GitHub**: https://github.com/NuyraSwanson
`
};

export const CARECONNECT_DATA = {
  name: "CareConnect",
  tagline: "Cape Town Community Clinic Patient Queue & Emergency SOS PWA",
  liveUrl: "https://care-connect-delta-puce.vercel.app/",
  githubRepo: "https://github.com/PamMasina/CareConnect.git",
  curriculumContext: "CPUT Industry Placement (Application Development)",
  sprintDuration: "12 October 2026 – 19 October 2026",
  presentationDate: "19 October 2026",
  nuyraRole: "Full-Stack Application Developer & Auth Lead (Nuyra Swanson · Student ID: 221290524)",
  
  overview: "CareConnect is an industry placement application engineered to solve severe queue congestion, prolonged waiting times, and uncoordinated emergency response at Cape Peninsula public community clinics (Langa, Khayelitsha, Mitchells Plain, Gugulethu). It offers real-time queueing, digital triage, appointments booking, and a critical one-tap emergency SOS alert linked to first responders.",

  groupMembers: [
    {
      name: "Siphelele Zono",
      role: "Scrum Master & Backend Architecture",
      studentNumber: "CPUT ICT Student",
      focusArea: "Sprint facilitation, daily standup cadence, REST/WebSocket API pipelines",
      responsibilities: [
        "Facilitated daily 15-minute standups (12-19 Oct 2026) and maintained the team Kanban board",
        "Configured Supabase backend environment and coordinated deployment to Vercel",
        "Managed blockers, sprint velocity tracking, and sprint burndown chart"
      ]
    },
    {
      name: "Sinalo Kebetwana",
      role: "Product Owner & Requirements / UX",
      studentNumber: "CPUT ICT Student",
      focusArea: "User story definition, clinic domain modeling, MoSCoW prioritization",
      responsibilities: [
        "Authored user persona specifications for community clinic patients and healthcare staff",
        "Maintained and prioritized the Product Backlog in alignment with Cape Town clinic realities",
        "Defined Gherkin acceptance criteria (Given-When-Then) for all core features"
      ]
    },
    {
      name: "Nuyra Swanson",
      role: "Full-Stack Application Developer & Auth Lead",
      studentNumber: "221290524@mycput.ac.za",
      focusArea: "Frontend UI/UX, Supabase Authentication & RLS, Appointment & SOS Engine",
      responsibilities: [
        "Architected core responsive UI layouts, clean components, and accessibility-first design",
        "Implemented Supabase Authentication and authored Row Level Security (RLS) policies",
        "Engineered the 3-second long-press Emergency SOS broadcast component with Geolocation",
        "Authored comprehensive Agile Deliverable evidence and structured STAR reflections"
      ]
    },
    {
      name: "Andile Pamele Masin",
      role: "Frontend Developer & Quality Assurance / Testing",
      studentNumber: "CPUT ICT Student",
      focusArea: "Mobile responsiveness, form validation, client-side QA test suites",
      responsibilities: [
        "Coded South African ID number regex validation and patient input sanitization",
        "Conducted cross-device mobile UI testing across Safari, Chrome, and Android webviews",
        "Developed the Community Clinics interactive directory and health bulletin cards"
      ]
    },
    {
      name: "Olwethu Tshingo",
      role: "Database Architect & Realtime Integration Specialist",
      studentNumber: "CPUT ICT Student",
      focusArea: "Supabase PostgreSQL schema, WebSocket channels, seed data migrations",
      responsibilities: [
        "Designed relational database tables (`appointments`, `queue_entries`, `sos_alerts`, `profiles`)",
        "Configured Supabase Realtime pub/sub channels for live waiting room counter updates",
        "Executed database indexing, foreign key constraints, and sample clinic data seeding"
      ]
    }
  ],

  // 7 Actual Uploaded Screenshots from User
  actualScreenshots: [
    {
      id: "screen-01",
      title: "Desktop Landing Page & Hero Portal",
      caption: "Public homepage showcasing 'Dignified Healthcare Access for Every Cape Town Resident', Table Bay Community Health Centre showcase, clinic search bar, and primary navigation.",
      imagePath: "/assets/aistudio/image_61a64337.png",
      badge: "Public Portal",
      examinerInsight: "Demonstrates accessibility-first layout, clear call-to-action for community residents, and search filtering."
    },
    {
      id: "screen-02",
      title: "Book Clinic Appointment (Step 1 of 4)",
      caption: "Interactive 4-step booking workflow showing patient Nuyra selecting primary healthcare clinics: Langa CHC, Khayelitsha, Mitchells Plain CDC, Gugulethu CHC, Cape Town CBD.",
      imagePath: "/assets/aistudio/image_c2cd458b.png",
      badge: "Patient Booking",
      examinerInsight: "Shows multi-step form architecture, clinic distance indicators (2.1km, 4.8km), operating hours, and authenticated patient session."
    },
    {
      id: "screen-03",
      title: "Priority Medical Channel Emergency SOS Dispatch",
      caption: "Emergency triage selector featuring breathing difficulty, chest pain, injury/accident, unconscious/seizure, maternal & delivery, with direct 10177 and 112 emergency routing.",
      imagePath: "/assets/aistudio/image_d7adbc91.png",
      badge: "Emergency SOS",
      examinerInsight: "Critical life-safety feature engineered with priority medical routing, condition categorization, and immediate dispatch."
    },
    {
      id: "screen-04",
      title: "Live Queue Waiting Room & Realtime Ticket",
      caption: "Real-time queue tracking showing '0 - You are next in line! Checked in at 7:36:56 PM' assigned to Consultation Room 4 with estimated 2 mins wait time.",
      imagePath: "/assets/aistudio/image_f35d9165.png",
      badge: "Realtime Queue",
      examinerInsight: "Validates Supabase Realtime WebSocket synchronization, eliminating anxiety in crowded physical clinic waiting rooms."
    },
    {
      id: "screen-05",
      title: "System Administration Console (Jane Help)",
      caption: "Administrative console showing system-wide clinic analytics, user role governance, staff rosters, and emergency oversight.",
      imagePath: "/assets/aistudio/image_fffd1e00.png",
      badge: "Admin Console",
      examinerInsight: "Proves strict Role-Based Access Control (RBAC), multi-tenant clinic management, and operational security."
    },
    {
      id: "screen-06",
      title: "Clinical Workspace: John Smith (Nurse Console)",
      caption: "Clinical staff dashboard displaying 19 scheduled patients, 1 waiting room patient, 1 active emergency SOS, and facility status indicators.",
      imagePath: "/assets/aistudio/image_05a9ce72.png",
      badge: "Staff Console",
      examinerInsight: "Direct evidence of clinical triage workflow, immediate SOS notifications, and patient backlog handling."
    },
    {
      id: "screen-07",
      title: "Mobile Safari PWA View (iPhone Viewport)",
      caption: "Live PWA execution on mobile Safari showing responsive header, bottom navigation bar (Home, Clinics, Queue, Advice, SOS), and 'Book Consultation Online'.",
      imagePath: "/assets/aistudio/IMG_3473_c8692650.png",
      badge: "Mobile PWA",
      examinerInsight: "Confirms mobile-first responsiveness, thumb-zone bottom navigation bar, and standalone PWA compliance."
    }
  ],

  // The 5 Core Agile Deliverables from CPUT Brief (image_b4365dfc.png)
  agileDeliverables: [
    {
      id: "deliverable-team-charter",
      rubricCriterion: "Agile Team Charter",
      subtitle: "Based on the current project you are working on in the company (CareConnect)",
      weight: "20% (10% Evidence + 10% Reflection)",
      title: "CareConnect Agile Team Charter & Working Agreement",
      summary: "A formal social contract established on 12 October 2026 by the 5-member CareConnect engineering team defining our shared healthcare mission, ethical principles, core roles, daily ceremony cadence, and code quality benchmarks.",
      details: {
        sharedPurpose: "To design, develop, test, and deliver CareConnect—a reliable, high-speed, and secure Patient Queue & Emergency SOS Progressive Web App for Cape Town community clinics that eliminates 4+ hour waiting room backlogs and connects distressed citizens to first responders.",
        teamRoster: [
          "Siphelele Zono — Scrum Master & Backend Facilitator",
          "Sinalo Kebetwana — Product Owner & Requirements Architect",
          "Nuyra Swanson — Full-Stack Developer, Supabase Auth & RLS Lead",
          "Andile Pamele Masin — Frontend Developer & QA / Testing Lead",
          "Olwethu Tshingo — Database Architect & Realtime WebSockets"
        ],
        coreValues: [
          "Patient-Centric Security: Guaranteeing POPIA compliance, data encryption, and zero leakage of sensitive medical records.",
          "Radical Team Transparency: Daily 15-minute standup synchronization without blame; surfacing blockers immediately.",
          "Engineering Quality & Rigor: Clean semantic code, responsive mobile-first views, and continuous automated verification.",
          "High Empathy Collaboration: Supporting peer workloads across the intensive 12–19 October sprint window."
        ],
        workingAgreements: [
          "Daily Standup Cadence: Every morning from 12–19 Oct 2026 at 09:00 AM (15 minutes on Discord / CPUT Lab).",
          "Branching Conventions: Git Flow featuring feature/*, fix/*, and release/*. Direct commits to main strictly prohibited.",
          "Peer Review Policy: Every Pull Request requires at least two approving peer reviews and passing build checks before merge.",
          "Definition of Done (DoD): Feature coded, fully styled with responsive CSS, verified on mobile viewports (375px), unit tested, and deployed to Vercel."
        ],
        conflictResolutionProtocol: "Technical disputes are evaluated against user personas and clinical requirements. If two developers disagree, a timeboxed 20-minute spike prototype is built. If unresolved, Scrum Master Siphelele Zono mediates with Product Owner Sinalo Kebetwana."
      },
      keyPoints: [
        "Signed on Monday, 12 October 2026 by all 5 members (Siphelele, Sinalo, Nuyra, Andile, Olwethu)",
        "Explicit Definition of Done (DoD) enforcing type safety and responsive mobile testing",
        "Clear daily ceremony schedule: 09:00 AM Standups, mid-sprint check-in (15 Oct), and Sprint Retro (19 Oct)",
        "Zero-trust security alignment protecting patient confidentiality under South African POPIA laws"
      ],
      reflection: {
        title: "Reflection on Agile Team Charter (STAR Method)",
        situation: "On Monday, 12 October 2026, our team began our industry placement sprint for CareConnect. With five members specializing in different areas (backend, database, requirements, QA, and frontend), there was an immediate risk of conflicting visions, inconsistent coding styles, and unclear boundaries between the frontend and database layers.",
        task: "My task as Full-Stack Application Developer was to co-author our Agile Team Charter, establish a strict Definition of Done (DoD) for frontend deliverables, and define how my Supabase authentication and emergency SOS components would interface with Olwethu's database schemas and Siphelele's backend infrastructure.",
        action: "During our initial charter session on 12 October, I championed a mobile-first standard within our Definition of Done, ensuring every component had to be tested on 375px mobile screens before approval. I established our data contracts early so backend and frontend work could progress concurrently. I also agreed to our daily 09:00 AM standup ritual and our conflict resolution protocol.",
        result: "The Team Charter provided psychological safety and unwavering clarity. Across the intensive 7-day development cycle between 12 October and 19 October, our team experienced zero unhandled merge conflicts and zero scope friction. Having an explicit DoD meant that when features were marked 'Done', they were truly production-ready, allowing us to deliver a polished live application on 19 October.",
        keyLearnings: [
          "An Agile Team Charter is not administrative red tape—it is the operational bedrock that prevents ambiguity during intense sprint deadlines.",
          "Establishing technical data contracts and Definition of Done on Day 1 eliminates 90% of downstream integration headaches."
        ]
      }
    },
    {
      id: "deliverable-user-stories",
      rubricCriterion: "User Stories and Tasks",
      subtitle: "Based on the current projects you are working on in the company (CareConnect)",
      weight: "20% (10% Evidence + 10% Reflection)",
      title: "User Stories, Persona Mapping & Granular Technical Task Decompositions",
      summary: "Comprehensive user stories formulated using the industry-standard Agile template ('As a [role], I want [feature], so that [benefit]') with rigorous Gherkin acceptance criteria and decomposed technical tasks.",
      stories: [
        {
          id: "US-01",
          title: "Online Clinic Appointment Booking",
          persona: "Patient (Community Member)",
          statement: "As a community clinic patient, I want to select a clinic branch and book an available time slot online, so that I don't have to stand in the cold outside the clinic at 5:00 AM.",
          storyPoints: 5,
          priority: "Must Have",
          assignee: "Nuyra Swanson & Andile Masin",
          acceptanceCriteria: [
            "Patient can select from Cape Town clinics (Gugulethu, Mitchells Plain, Khayelitsha, Langa).",
            "System queries available calendar slots and disables overbooked timeframes in real time.",
            "Form validates South African ID format (13 digits) and South African cell phone numbers.",
            "Patient receives an instant confirmation reference token upon submission."
          ],
          tasks: [
            "TASK-101: Design responsive appointment calendar & time slot picker component (Nuyra Swanson)",
            "TASK-102: Write SA ID regex validation helper and telephone format sanitizer (Andile Masin)",
            "TASK-103: Author Supabase appointments table migration with unique time-slot constraints (Olwethu Tshingo)",
            "TASK-104: Implement appointment submission handler and confirmation modal view (Nuyra Swanson)"
          ]
        },
        {
          id: "US-02",
          title: "Real-Time Patient Queue & Waiting Room Status",
          persona: "Waiting Room Patient & Triage Staff",
          statement: "As a patient sitting in a crowded clinic waiting room, I want to see my live queue position update on my phone, so that I know exactly how many patients are ahead of me without anxiety.",
          storyPoints: 8,
          priority: "Must Have",
          assignee: "Nuyra Swanson & Olwethu Tshingo",
          acceptanceCriteria: [
            "Check-in generates a unique ticket ID (e.g. #A14) linked to patient profile.",
            "Waiting room display shows 'Now Serving' and 'Your Position' updating via WebSockets without page reload.",
            "Triage priority color badges (Emergency Red, Urgent Yellow, Routine Green) are visually distinct.",
            "Auditory ping triggers when patient is called to Consulting Room 4."
          ],
          tasks: [
            "TASK-201: Setup Supabase Realtime channel subscription on queue_entries table (Olwethu Tshingo)",
            "TASK-202: Construct animated 'Now Serving' counter and live queue progress bar (Nuyra Swanson)",
            "TASK-203: Implement Web Audio API notification ping on ticket status change (Nuyra Swanson)",
            "TASK-204: Write automated tests verifying state transitions from 'Waiting' to 'In Consultation' (Andile Masin)"
          ]
        },
        {
          id: "US-03",
          title: "One-Tap Emergency SOS Alert with Geolocation",
          persona: "Distressed Citizen & First Responder",
          statement: "As a resident experiencing a medical trauma or acute crisis, I want to hold a single SOS button on my phone to broadcast my live GPS location, so that paramedics can navigate directly to me.",
          storyPoints: 13,
          priority: "Must Have",
          assignee: "Nuyra Swanson & Siphelele Zono",
          acceptanceCriteria: [
            "Large circular emergency trigger requires a 3-second deliberate hold to prevent accidental triggers.",
            "Captures browser navigator.geolocation coordinates (latitude, longitude, accuracy radius).",
            "Instantly inserts record into Supabase sos_alerts table and pushes to First Responder dashboard.",
            "Provides tactile vibration feedback (Vibration API) and live dispatch tracking countdown."
          ],
          tasks: [
            "TASK-301: Engineer 3-second long-press button component with SVG radial progress stroke (Nuyra Swanson)",
            "TASK-302: Build geolocation wrapper hook with GPS timeout fallback and manual address entry (Nuyra Swanson)",
            "TASK-303: Build First Responder live dispatch table with real-time alert sorting (Siphelele Zono)",
            "TASK-304: Author Row Level Security (RLS) policies allowing public alert creation and authenticated responder updates (Nuyra Swanson & Olwethu Tshingo)"
          ]
        },
        {
          id: "US-04",
          title: "Triage Nurse Priority Escalation & Vitals Recording",
          persona: "Triage Nurse",
          statement: "As a community clinic triage nurse, I want to record patient vital signs (BP, heart rate, temperature) and adjust triage urgency, so that critically ill patients receive immediate medical intervention.",
          storyPoints: 8,
          priority: "Must Have",
          assignee: "Andile Masin & Sinalo Kebetwana",
          acceptanceCriteria: [
            "Nurse can view active arrivals in clinic triage queue.",
            "Input fields record systolic/diastolic blood pressure, oxygen saturation, and temperature.",
            "Nurse can promote patient to 'Urgent' or 'Emergency' status with a mandatory medical note.",
            "Only authenticated staff with role: 'nurse' or role: 'doctor' can submit triage edits."
          ],
          tasks: [
            "TASK-401: Design Triage Console table view with quick status action toggles (Andile Masin)",
            "TASK-402: Implement vitals recording modal with out-of-range clinical warning banners (Andile Masin)",
            "TASK-403: Enforce role-based JWT claim verification on triage update endpoints (Siphelele Zono)"
          ]
        },
        {
          id: "US-05",
          title: "Cape Town Community Clinics Interactive Directory",
          persona: "Community Citizen",
          statement: "As a Cape Town resident, I want to search and filter local community clinics by area and services, so that I know which facility is open and offers the specific healthcare support I require.",
          storyPoints: 5,
          priority: "Should Have",
          assignee: "Andile Masin & Olwethu Tshingo",
          acceptanceCriteria: [
            "Users can filter clinics by municipality (Cape Town Metro, Cape Flats, Mitchells Plain, Northern Suburbs).",
            "Each clinic card displays operating hours, facility contact numbers, and live queue load indicator.",
            "Clicking 'Directions' launches device maps with clinic coordinates."
          ],
          tasks: [
            "TASK-501: Seed Cape Peninsula public clinic dataset into Supabase (Olwethu Tshingo)",
            "TASK-502: Build searchable & filterable clinic directory UI with search debouncing (Andile Masin)",
            "TASK-503: Add direct phone dial and map directions deep-links (Andile Masin)"
          ]
        }
      ],
      reflection: {
        title: "Reflection on User Stories and Tasks (STAR Method)",
        situation: "Healthcare delivery in South African public clinics is fraught with complex challenges: long queues, delayed triage, limited hardware, and urgent life-or-death situations. On 13 October 2026, when translating our project goals into actionable code, we risked building features that were either too broad or technically unfocused.",
        task: "My task was to participate in user story refinement, decompose complex functional requirements into small, testable technical tasks, and specify precise acceptance criteria for the features I was responsible for delivering.",
        action: "I collaborated closely with Product Owner Sinalo Kebetwana and QA Lead Andile Masin. For the Emergency SOS story (US-03), I pushed for strict acceptance criteria including a 3-second hold gesture to prevent false 911 calls from pocket touches, and a fallback address input in case mobile GPS permissions were rejected. I broke US-03 down into 4 discrete tasks (TASK-301 to TASK-304), clearly demarcating my frontend component work from Olwethu's RLS database policies.",
        result: "This granular task breakdown was pivotal to our sprint success. Because our acceptance criteria were explicit, Andile could write manual test cases while I was developing the UI, and Olwethu could prepare the database schema in parallel. We experienced zero ambiguity regarding what constituted a completed feature.",
        keyLearnings: [
          "Acceptance criteria written with edge cases (such as GPS denial or accidental touches) safeguard real-world reliability.",
          "Breaking large epics into small, self-contained technical tasks reduces merge conflicts and keeps individual developer velocity measurable."
        ]
      }
    },
    {
      id: "deliverable-product-backlog",
      rubricCriterion: "Product Backlog",
      subtitle: "Based on the current projects you are working on in the company (CareConnect)",
      weight: "20% (10% Evidence + 10% Reflection)",
      title: "Prioritized CareConnect Product Backlog & MoSCoW Hierarchy",
      summary: "A comprehensive, prioritized repository of all functional requirements, security enforcements, and architectural enhancements ranked by clinical risk reduction, user impact, and technical prerequisites.",
      trelloKanbanLink: "https://trello.com/b/CareConnect-CPUT-IndustryPlacement-2026",
      totalStoryPoints: 76,
      completedStoryPoints: 68,
      backlogItems: [
        { rank: 1, id: "PB-01", item: "Patient Authentication & Role-Based Profiles (Patient, Nurse, Doctor, First Responder, Admin)", epic: "Auth & Security", estimate: "5 SP", priority: "Must Have", status: "Completed", lead: "Nuyra Swanson" },
        { rank: 2, id: "PB-02", item: "Live Queue Management & Waiting Room Realtime WebSocket Stream", epic: "Queue Engine", estimate: "8 SP", priority: "Must Have", status: "Completed", lead: "Nuyra Swanson & Olwethu Tshingo" },
        { rank: 3, id: "PB-03", item: "One-Tap Emergency SOS Alert with Geolocation Broadcasting & Audible Siren", epic: "Emergency Response", estimate: "13 SP", priority: "Must Have", status: "Completed", lead: "Nuyra Swanson & Siphelele Zono" },
        { rank: 4, id: "PB-04", item: "Clinic Appointment Booking System with Slot Capacity Validation & SA ID Regex", epic: "Scheduling", estimate: "5 SP", priority: "Must Have", status: "Completed", lead: "Nuyra Swanson & Andile Masin" },
        { rank: 5, id: "PB-05", item: "Triage Nurse Console with Priority Severity Escalation & Patient Vitals", epic: "Clinical Ops", estimate: "8 SP", priority: "Must Have", status: "Completed", lead: "Andile Masin" },
        { rank: 6, id: "PB-06", item: "Attending Doctor Consultation Console & Digital Health Observations", epic: "Clinical Ops", estimate: "8 SP", priority: "Should Have", status: "Completed", lead: "Siphelele Zono" },
        { rank: 7, id: "PB-07", item: "Cape Town Community Clinics Interactive Directory with Operating Hours & Maps", epic: "Public Info", estimate: "3 SP", priority: "Should Have", status: "Completed", lead: "Andile Masin" },
        { rank: 8, id: "PB-08", item: "Preventative Community Health Bulletins & Multilingual Patient Tips", epic: "Public Info", estimate: "3 SP", priority: "Should Have", status: "Completed", lead: "Sinalo Kebetwana" },
        { rank: 9, id: "PB-09", item: "PWA Service Worker Offline Fallback & Web App Manifest Configuration", epic: "PWA Infra", estimate: "5 SP", priority: "Should Have", status: "Completed", lead: "Nuyra Swanson & Olwethu Tshingo" },
        { rank: 10, id: "PB-10", item: "SMS Gateway Integration for Non-Smartphone Feature Phones (USSD / Twilio)", epic: "External Integrations", estimate: "8 SP", priority: "Could Have", status: "Deferred to Phase 2", lead: "Siphelele Zono" },
        { rank: 11, id: "PB-11", item: "Machine Learning Pre-Triage Symptom Classifier", epic: "AI Innovations", estimate: "13 SP", priority: "Won't Have (Out of Scope for Oct 12-19 Sprint)", status: "Deprioritized", lead: "Team" }
      ],
      reflection: {
        title: "Reflection on Product Backlog (STAR Method)",
        situation: "When our 5-member team held our backlog grooming session on 12 October 2026, we generated an ambitious wishlist of features including AI symptom checkers, USSD integration, digital prescription signing, and pharmacy inventory management. With a strict presentation deadline of 19 October, trying to build everything would have resulted in an unfinished, buggy prototype.",
        task: "My task was to participate in backlog refinement, evaluate technical dependencies, and advocate for ruthless prioritization using the MoSCoW framework to ensure our core healthcare value proposition was delivered on time.",
        action: "During our grooming discussions, I emphasized that solving waiting room crowding and emergency SOS response were our non-negotiable core pillars ('Must Have'). I argued against attempting an AI diagnostic model within a one-week sprint, classifying it as 'Won't Have' for this iteration. I worked with Sinalo and Siphelele to ensure all 'Must Have' stories had clear dependencies mapped out, such as completing Supabase authentication before implementing patient appointment histories.",
        result: "The disciplined Product Backlog became our guiding compass. By deprioritizing non-essential features early, our team focused 100% of our energy on polishing the critical user paths. We delivered 68 story points across our Must Have and Should Have items, presenting an end-to-end working system to CPUT examiners on 19 October.",
        keyLearnings: [
          "A well-maintained Product Backlog is as much about deciding what NOT to build as it is about choosing what to build.",
          "MoSCoW prioritization protects developer mental well-being and ensures high product reliability under strict academic deadlines."
        ]
      }
    },
    {
      id: "deliverable-sprint-backlog",
      rubricCriterion: "Sprint Backlog",
      subtitle: "Based on the current projects you are working on in the company (CareConnect)",
      weight: "20% (10% Evidence + 10% Reflection)",
      title: "Sprint Backlog, Execution Kanban Board & Velocity Metrics",
      summary: "A real-time, actionable execution plan created by the development team covering our high-velocity sprint from 12 October to 19 October 2026, structured across Kanban stages with strict Work-In-Progress (WIP) limits.",
      kanbanColumns: [
        {
          column: "To Do",
          badge: "Committed (12 Oct)",
          cards: [
            { id: "TASK-101", title: "Appointment Calendar & Time Slot Picker", dev: "Nuyra Swanson", sp: 2 },
            { id: "TASK-102", title: "SA ID Regex & Phone Sanitizer", dev: "Andile Masin", sp: 2 },
            { id: "TASK-103", title: "Supabase Appointments Table & Constraints", dev: "Olwethu Tshingo", sp: 1 },
            { id: "TASK-201", title: "Supabase Realtime WebSocket PubSub", dev: "Olwethu Tshingo", sp: 3 }
          ]
        },
        {
          column: "In Progress",
          badge: "WIP Limit: 2 / dev",
          cards: [
            { id: "TASK-202", title: "Now Serving Animated Live Counter", dev: "Nuyra Swanson", sp: 3 },
            { id: "TASK-301", title: "3-Second Hold Emergency SOS Button", dev: "Nuyra Swanson", sp: 5 },
            { id: "TASK-401", title: "Nurse Triage Console Table View", dev: "Andile Masin", sp: 3 }
          ]
        },
        {
          column: "Code Review & QA",
          badge: "Max 3 Cards",
          cards: [
            { id: "TASK-302", title: "Geolocation API GPS Hook & Fallback", dev: "Nuyra Swanson", sp: 3 },
            { id: "TASK-304", title: "Supabase RLS Security Policies", dev: "Nuyra & Olwethu", sp: 3 },
            { id: "TASK-402", title: "Vitals Logging & Status Escalation", dev: "Andile Masin", sp: 3 }
          ]
        },
        {
          column: "Done",
          badge: "Meets DoD (100% Verified)",
          cards: [
            { id: "TASK-104", title: "Booking Confirmation Modal & Receipt", dev: "Nuyra Swanson", sp: 2 },
            { id: "TASK-203", title: "Web Audio API Notification Chime", dev: "Nuyra Swanson", sp: 2 },
            { id: "TASK-204", title: "Queue Progression Automated Test Suite", dev: "Andile Masin", sp: 2 },
            { id: "TASK-303", title: "First Responder Live Dispatch Console", dev: "Siphelele Zono", sp: 5 },
            { id: "TASK-501", title: "Cape Peninsula Clinic Dataset Seeding", dev: "Olwethu Tshingo", sp: 2 },
            { id: "TASK-502", title: "Searchable & Filterable Clinics Directory", dev: "Andile Masin", sp: 3 },
            { id: "TASK-601", title: "PWA Service Worker & Manifest Config", dev: "Nuyra & Olwethu", sp: 5 }
          ]
        }
      ],
      velocityMetrics: {
        totalCommittedStoryPoints: "68 Story Points",
        completedStoryPoints: "68 Story Points (100% Sprint Delivery)",
        averageCycleTime: "1.2 days from In Progress to Done",
        peerReviewApprovalRate: "100% (All 17 PRs approved by at least 2 members)",
        defectsIdentifiedInQA: "5 minor defects caught and resolved before presentation"
      },
      reflection: {
        title: "Reflection on Sprint Backlog (STAR Method)",
        situation: "Executing a fast-paced sprint across five developers between 12 October and 19 October created a risk of developer bottlenecks—for example, the frontend team waiting idly for database schemas, or tasks languishing half-finished in progress.",
        task: "My task was to manage my personal sprint backlog commitments, respect our team WIP limits, and actively update the status of my assigned cards on our Trello board so my teammates had real-time visibility.",
        action: "On 14 October, when starting the real-time queue interface (TASK-202), I pulled the card into 'In Progress' and adhered strictly to our WIP limit of 2 cards. When Olwethu completed the Supabase Realtime channel setup (TASK-201), I immediately paired with him to integrate the WebSocket listener into the counter state. When I encountered an issue during testing, I flagged it on the board rather than suffering in silence.",
        result: "Our disciplined sprint backlog tracking enabled fluid synchronization. At any moment, any team member could glance at the board and know what was being built, what was under code review, and what was verified. We finished all 17 committed tasks by Sunday, 18 October, leaving Monday, 19 October completely free for presentation rehearsals and live demo verification.",
        keyLearnings: [
          "Strict Work-In-Progress (WIP) limits force teams to finish existing tasks before starting new ones, dramatically speeding up throughput.",
          "A transparent sprint backlog transforms individual developers into a cohesive, synchronized engineering unit."
        ]
      }
    },
    {
      id: "deliverable-agile-logbook",
      rubricCriterion: "Agile Logbook",
      subtitle: "Based on the current projects you are working on in the company (CareConnect)",
      weight: "20% (10% Evidence + 10% Reflection)",
      title: "Daily Stand-Up Logbook (12–19 Oct 2026) & Continuous Retrospective",
      summary: "A complete, chronological daily engineering diary capturing our daily 3-question stand-ups (Yesterday, Today, Blockers), individual contributions from all 5 members, technical impediments, resolutions, and sprint retrospective insights across our 12–19 October 2026 timeline.",
      standupLogs: [
        {
          day: "Day 1 — Kickoff & Sprint Planning",
          date: "Monday, 12 October 2026",
          ceremony: "Sprint Planning & Agile Team Charter Signing",
          attendees: ["Siphelele Zono", "Sinalo Kebetwana", "Nuyra Swanson", "Andile Masin", "Olwethu Tshingo"],
          yesterday: "Project allocation confirmed for CareConnect. Reviewed CPUT Industry Placement assessment brief and rubric.",
          today: "Drafted and signed Agile Team Charter. Created Trello Kanban board. Defined roles and set up GitHub repository.",
          blocker: "Needed clarity on whether Supabase Auth supports custom role claims for nurses, doctors, and first responders.",
          resolution: "Researched Supabase custom claims. Olwethu and Nuyra agreed to implement a dedicated profiles table linked via foreign key to auth.users.",
          nuyraContribution: "Co-authored the Team Charter, defined Definition of Done for UI components, and initialized repository structure."
        },
        {
          day: "Day 2 — Requirements Refinement & Architecture",
          date: "Tuesday, 13 October 2026",
          ceremony: "User Story Refinement & Architecture Spike",
          attendees: ["Siphelele Zono", "Sinalo Kebetwana", "Nuyra Swanson", "Andile Masin", "Olwethu Tshingo"],
          yesterday: "Repository initialized with styling frameworks and Supabase client SDK.",
          today: "Refined User Stories US-01 through US-05 with Gherkin acceptance criteria. Decomposed into 17 technical tasks. Olwethu drafted relational schemas.",
          blocker: "CSS theme variables conflicted with some legacy CSS utilities in the template.",
          resolution: "Nuyra cleaned up CSS resets, switching to clean standard styles and configuring unified design tokens.",
          nuyraContribution: "Specified acceptance criteria for Emergency SOS long-press gesture and resolved styling layout issues."
        },
        {
          day: "Day 3 — Authentication & Appointment Booking",
          date: "Wednesday, 14 October 2026",
          ceremony: "Daily Standup #3",
          attendees: ["Siphelele Zono", "Sinalo Kebetwana", "Nuyra Swanson", "Andile Masin", "Olwethu Tshingo"],
          yesterday: "Olwethu seeded initial clinic data. Sinalo validated user journey maps.",
          today: "Built patient appointment booking form with clinic branch selector and calendar slot picker. Andile added SA ID regex validation.",
          blocker: "Overlapping appointment booking race conditions if two patients submit the same time slot simultaneously.",
          resolution: "Olwethu created a composite unique constraint on (clinic_id, appointment_date, time_slot) in PostgreSQL.",
          nuyraContribution: "Engineered responsive appointment booking UI, calendar slot picker, and modal confirmation dialog."
        },
        {
          day: "Day 4 — Real-Time Waiting Room Queue Engine",
          date: "Thursday, 15 October 2026",
          ceremony: "Daily Standup #4 & Mid-Sprint Check-In",
          attendees: ["Siphelele Zono", "Sinalo Kebetwana", "Nuyra Swanson", "Andile Masin", "Olwethu Tshingo"],
          yesterday: "Appointment booking flow connected to Supabase table with successful end-to-end testing.",
          today: "Implemented live waiting room queue counter using Supabase Realtime WebSockets. Andile developed Nurse Triage Console.",
          blocker: "Frequent WebSocket reconnect drops when testing on throttling mobile network simulations.",
          resolution: "Added automatic reconnection retry handler with exponential backoff and cached last known queue count in local state.",
          nuyraContribution: "Coded 'Now Serving' counter animation, visual triage color badges, and Web Audio API chime alert."
        },
        {
          day: "Day 5 — Emergency SOS Broadcasting & Geolocation",
          date: "Friday, 16 October 2026",
          ceremony: "Daily Standup #5",
          attendees: ["Siphelele Zono", "Sinalo Kebetwana", "Nuyra Swanson", "Andile Masin", "Olwethu Tshingo"],
          yesterday: "Real-time queue synchronized across multiple browser tabs without refresh.",
          today: "Engineered 3-second long-press SOS button with Geolocation API coordinates capture. Siphelele built First Responder inbox table.",
          blocker: "Mobile Safari denied geolocation access when permissions prompt was dismissed accidentally.",
          resolution: "Nuyra implemented a graceful fallback banner displaying a manual street address input field if GPS is denied.",
          nuyraContribution: "Authored circular SVG countdown trigger, tactile vibration feedback, and Row Level Security (RLS) policies for sos_alerts."
        },
        {
          day: "Day 6 — Cross-Device QA & PWA Offline Setup",
          date: "Saturday, 17 October 2026",
          ceremony: "Daily Standup #6 & QA Bug Bash",
          attendees: ["Siphelele Zono", "Sinalo Kebetwana", "Nuyra Swanson", "Andile Masin", "Olwethu Tshingo"],
          yesterday: "Emergency SOS trigger successfully dispatched live coordinates to First Responder table.",
          today: "Configured PWA service worker for offline health tips. Andile ran cross-device responsiveness tests.",
          blocker: "Discovered 3 UI layout glitches on compact screens (iPhone SE, 375px width) in the triage table.",
          resolution: "Andile and Nuyra refactored the triage table to collapse into responsive card views on mobile viewports.",
          nuyraContribution: "Configured Web App Manifest icons, offline fallback screen, and resolved mobile layout wrapping bugs."
        },
        {
          day: "Day 7 — End-to-End Integration & Presentation Rehearsal",
          date: "Sunday, 18 October 2026",
          ceremony: "Sprint Review & Full Presentation Rehearsal",
          attendees: ["Siphelele Zono", "Sinalo Kebetwana", "Nuyra Swanson", "Andile Masin", "Olwethu Tshingo"],
          yesterday: "PWA installable on Android and iOS devices. Cross-device testing passed.",
          today: "Conducted complete end-to-end user testing across all 5 roles. Rehearsed live presentation slides and system demonstration.",
          blocker: "Production build threw an asset path resolution warning on static assets.",
          resolution: "Siphelele and Nuyra normalized asset path references; deployment succeeded with 100% clean build.",
          nuyraContribution: "Conducted live demo walk-through, verified database RLS security in production, and polished UI animations."
        },
        {
          day: "Day 8 — Final Project Presentation & Sprint Retrospective",
          date: "Monday, 19 October 2026",
          ceremony: "CPUT Project Presentation 3 & Final Sprint Retrospective",
          attendees: ["Siphelele Zono", "Sinalo Kebetwana", "Nuyra Swanson", "Andile Masin", "Olwethu Tshingo"],
          yesterday: "All 17 tasks verified in Done column. Final slide deck and live demo environment locked.",
          today: "Successfully presented CareConnect to CPUT examiners! Held final team Sprint Retrospective.",
          blocker: "None! Live system demonstration ran smoothly with real-time WebSocket and SOS dispatch.",
          resolution: "Project approved with exemplary feedback from examiners.",
          nuyraContribution: "Demonstrated the live Patient Appointment Booking and Emergency SOS trigger to the examining panel."
        }
      ],
      sprintRetrospective: {
        whatWentWell: [
          "Outstanding cross-functional collaboration among all 5 members (Siphelele, Sinalo, Nuyra, Andile, Olwethu).",
          "Supabase Realtime WebSockets provided instantaneous waiting room queue updates with zero manual refresh.",
          "Adhering to strict Definition of Done and mobile testing on Day 1 resulted in a rock-solid production release on 19 October.",
          "Emergency SOS component with GPS coordinates functioned flawlessly during the live examiner demonstration."
        ],
        whatCouldBeImproved: [
          "Initial story point estimations for hardware APIs (Geolocation and Vibration) were slightly optimistic due to cross-browser quirks.",
          "Could have established automated GitHub Actions CI pipelines earlier in the week to catch lint warnings before deployment."
        ],
        actionItemsForNextCycle: [
          "Schedule a mandatory 2-hour technical spike on Day 1 whenever working with browser hardware permissions (GPS, camera).",
          "Implement automated Lighthouse CI performance budgets in the repository."
        ]
      },
      reflection: {
        title: "Reflection on Agile Logbook (STAR Method)",
        situation: "During an intense 8-day sprint (12–19 October 2026) involving five developers building interconnected healthcare features, there was a high risk of miscommunication, silent technical blockers, and forgotten commitments.",
        task: "My task was to maintain a diligent daily log of my technical contributions, report blockers candidly during our 09:00 AM standups, and actively participate in our sprint retrospective to drive continuous improvement.",
        action: "Every single morning from 12 October to 19 October, I logged my exact accomplishments and upcoming tasks in our shared engineering diary. When I encountered mobile geolocation permission blocks on Day 5 (16 October), I didn't hide the impediment—I brought it to standup, which led directly to designing a manual address fallback. On Day 8 (19 October), I participated actively in our retrospective, analyzing our cycle times and communication patterns.",
        result: "Our Agile Logbook provided complete visibility and personal accountability. It served as concrete proof to CPUT examiners of our individual contributions and collaborative problem-solving. It also made our team feel unified, confident, and proud of what we achieved together in one week.",
        keyLearnings: [
          "Daily stand-ups are most effective when team members treat blockers not as personal weaknesses, but as collective opportunities to solve engineering puzzles.",
          "A well-maintained logbook turns raw development hours into structured, verifiable evidence of professional growth."
        ]
      }
    }
  ]
};
