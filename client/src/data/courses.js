const courses = [
  {
    "course_id": "upgrad_ds_ai_pwc_01",
    "course_name": "Professional Certificate Program in Data Science and AI",
    "provider": "upGrad and PwC Academy",
    "description": "This program is designed for individuals seeking to master Data Analysis, Statistical Modeling, and Machine Learning, covering essential tools and methods from data wrangling with Excel and SQL to Advanced Machine Learning and Neural Networks.",
    "duration_weeks": 24,
    "price": "$1,499",
    "rating": 4.7,
    "students_enrolled": 12500,
    "category": "data_science",
    "level": "Intermediate",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    "eligibility": "Passion for Digital Marketing & a desire to learn, with basic English communication.",
    "tools_covered": [
      "MS-Excel",
      "SQL",
      "MySQL",
      "Python",
      "Jupyter",
      "Numpy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Tableau",
      "Power BI",
      "Scikit-Learn",
      "TensorFlow",
      "Keras"
    ],
    "modules": [
      {
        "module_id": "ds_ai_m1",
        "title": "Foundations of Data Analysis",
        "description": "Learn the basics of data analysis and statistics using MS Excel and SQL",
        "duration_weeks": 4,
        "topics": [
          "Introduction to Data Analysis",
          "Excel for Data Analysis",
          "Basic Statistical Concepts",
          "SQL for Data Extraction",
          "Data Cleaning and Preparation"
        ],
        "projects": [
          "Sales Data Analysis using Excel",
          "Database Query Optimization"
        ]
      },
      {
        "module_id": "ds_ai_m2",
        "title": "Programming with Python",
        "description": "Master Python programming language for data science applications",
        "duration_weeks": 5,
        "topics": [
          "Python Basics",
          "Data Structures in Python",
          "Functions and Modules",
          "Object-Oriented Programming",
          "NumPy and Pandas for Data Manipulation"
        ],
        "projects": [
          "Data Cleaning and Transformation Pipeline",
          "Exploratory Data Analysis with Pandas"
        ]
      },
      {
        "module_id": "ds_ai_m3",
        "title": "Data Visualization",
        "description": "Create compelling visual stories with data using specialized tools",
        "duration_weeks": 3,
        "topics": [
          "Principles of Data Visualization",
          "Matplotlib and Seaborn",
          "Interactive Visualizations",
          "Dashboard Creation with Tableau",
          "Power BI Fundamentals"
        ],
        "projects": [
          "Sales Dashboard Creation",
          "Interactive Data Story"
        ]
      },
      {
        "module_id": "ds_ai_m4",
        "title": "Machine Learning Fundamentals",
        "description": "Understand and apply core machine learning algorithms",
        "duration_weeks": 6,
        "topics": [
          "Introduction to Machine Learning",
          "Supervised Learning Algorithms",
          "Unsupervised Learning Algorithms",
          "Model Evaluation and Validation",
          "Feature Engineering"
        ],
        "projects": [
          "Customer Segmentation Analysis",
          "Predictive Model for Sales Forecasting"
        ]
      },
      {
        "module_id": "ds_ai_m5",
        "title": "Deep Learning and AI",
        "description": "Dive into neural networks and advanced AI concepts",
        "duration_weeks": 6,
        "topics": [
          "Neural Network Fundamentals",
          "TensorFlow and Keras",
          "Convolutional Neural Networks",
          "Recurrent Neural Networks",
          "Natural Language Processing"
        ],
        "projects": [
          "Image Classification System",
          "Sentiment Analysis Tool"
        ]
      }
    ]
  },
  {
    "course_id": "upgrad_fs_iitb_01",
    "course_name": "Full Stack Development Program",
    "provider": "upGrad and IIT Bombay",
    "description": "Learn to build complete web applications from front to back end. Master popular frameworks and become job-ready as a full stack developer.",
    "duration_weeks": 30,
    "price": "$1,899",
    "rating": 4.8,
    "students_enrolled": 15800,
    "category": "full_stack",
    "level": "Intermediate to Advanced",
    "image": "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    "eligibility": "Basic understanding of programming concepts, HTML, and CSS.",
    "tools_covered": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Git",
      "Docker"
    ],
    "modules": [
      {
        "module_id": "fs_m1",
        "title": "Front-End Fundamentals",
        "description": "Master the core technologies of web development: HTML5, CSS3, and JavaScript",
        "duration_weeks": 6,
        "topics": [
          "HTML5 Semantic Elements",
          "CSS3 Layout Techniques",
          "Responsive Web Design",
          "JavaScript Fundamentals",
          "DOM Manipulation",
          "ES6+ Features"
        ],
        "projects": [
          "Portfolio Website",
          "Interactive Landing Page"
        ]
      },
      {
        "module_id": "fs_m2",
        "title": "Advanced Front-End Development with React",
        "description": "Build powerful, interactive UIs with React.js",
        "duration_weeks": 8,
        "topics": [
          "React Fundamentals",
          "Component Architecture",
          "State Management with Redux",
          "React Router",
          "Hooks and Context API",
          "Testing React Applications"
        ],
        "projects": [
          "E-commerce UI",
          "Social Media Dashboard"
        ]
      },
      {
        "module_id": "fs_m3",
        "title": "Back-End Development with Node.js",
        "description": "Create scalable server-side applications with Node.js and Express",
        "duration_weeks": 7,
        "topics": [
          "Node.js Fundamentals",
          "Express.js Framework",
          "RESTful API Design",
          "Authentication and Authorization",
          "Error Handling",
          "Middleware Development"
        ],
        "projects": [
          "RESTful API Service",
          "Authentication System"
        ]
      },
      {
        "module_id": "fs_m4",
        "title": "Database Management",
        "description": "Learn to work with both SQL and NoSQL databases",
        "duration_weeks": 5,
        "topics": [
          "Database Design Principles",
          "MongoDB and Mongoose",
          "PostgreSQL Fundamentals",
          "Data Modeling",
          "Database Performance Optimization",
          "Transaction Management"
        ],
        "projects": [
          "E-commerce Database Design",
          "Data Migration System"
        ]
      },
      {
        "module_id": "fs_m5",
        "title": "Full Stack Integration and Deployment",
        "description": "Bring it all together and deploy applications to the cloud",
        "duration_weeks": 4,
        "topics": [
          "Full Stack Application Architecture",
          "API Integration",
          "Docker Containerization",
          "CI/CD Pipelines",
          "Cloud Deployment (AWS/Heroku)",
          "Performance Optimization"
        ],
        "projects": [
          "Complete Full-Stack Application",
          "Deployment and DevOps Pipeline"
        ]
      }
    ]
  },
  {
    "course_id": "upgrad_devops_01",
    "course_name": "DevOps Engineering Certificate Program",
    "provider": "upGrad and IIIT Bangalore",
    "description": "Master the tools and practices of DevOps to streamline development processes, automate deployments, and improve collaboration between development and operations teams.",
    "duration_weeks": 26,
    "price": "$1,699",
    "rating": 4.6,
    "students_enrolled": 9200,
    "category": "cloud_devops",
    "level": "Intermediate to Advanced",
    "image": "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    "eligibility": "Basic understanding of software development and system administration.",
    "tools_covered": [
      "Linux",
      "Git",
      "Jenkins",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Ansible",
      "AWS",
      "Azure",
      "Prometheus",
      "Grafana"
    ],
    "modules": [
      {
        "module_id": "devops_m1",
        "title": "DevOps Fundamentals and Culture",
        "description": "Understand the core principles, practices, and cultural aspects of DevOps",
        "duration_weeks": 3,
        "topics": [
          "Introduction to DevOps",
          "DevOps Culture and Mindset",
          "SDLC and DevOps Lifecycle",
          "Linux Fundamentals for DevOps",
          "Version Control with Git"
        ],
        "projects": [
          "DevOps Implementation Strategy",
          "Version Control Workflow Setup"
        ]
      },
      {
        "module_id": "devops_m2",
        "title": "Continuous Integration and Continuous Deployment",
        "description": "Implement CI/CD pipelines to automate software delivery",
        "duration_weeks": 6,
        "topics": [
          "CI/CD Fundamentals",
          "Jenkins Pipeline Setup",
          "Build Automation",
          "Test Automation",
          "Deployment Strategies",
          "Pipeline as Code"
        ],
        "projects": [
          "Automated CI/CD Pipeline",
          "Multi-environment Deployment System"
        ]
      },
      {
        "module_id": "devops_m3",
        "title": "Containerization with Docker and Kubernetes",
        "description": "Master containerization technologies for application deployment",
        "duration_weeks": 7,
        "topics": [
          "Docker Fundamentals",
          "Docker Compose",
          "Kubernetes Architecture",
          "Pod Management",
          "Deployments and Services",
          "Container Orchestration"
        ],
        "projects": [
          "Microservices Containerization",
          "Kubernetes Cluster Setup"
        ]
      },
      {
        "module_id": "devops_m4",
        "title": "Infrastructure as Code",
        "description": "Automate infrastructure provisioning with IaC tools",
        "duration_weeks": 5,
        "topics": [
          "Infrastructure as Code Concepts",
          "Terraform Fundamentals",
          "Ansible for Configuration Management",
          "Cloud Infrastructure Automation",
          "Security in IaC",
          "State Management"
        ],
        "projects": [
          "Multi-cloud Infrastructure Setup",
          "Automated Environment Provisioning"
        ]
      },
      {
        "module_id": "devops_m5",
        "title": "Monitoring, Logging, and Observability",
        "description": "Implement comprehensive monitoring and observability solutions",
        "duration_weeks": 5,
        "topics": [
          "Monitoring Concepts",
          "Prometheus for Metrics Collection",
          "Grafana Dashboards",
          "Log Management",
          "Alerting Strategies",
          "Performance Optimization"
        ],
        "projects": [
          "Comprehensive Monitoring Solution",
          "Automated Alerting System"
        ]
      }
    ]
  }
];

export default courses;
