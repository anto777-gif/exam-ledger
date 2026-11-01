import { Syllabus } from '@/types';

export const DEMO_SYLLABUSES: Syllabus[] = [
  {
    id: 'demo-se-101',
    userId: 'demo-system',
    subjectName: 'Software Engineering',
    subjectCode: 'CS601',
    department: 'Computer Science and Engineering',
    semester: '6th Semester',
    university: 'Demonstration University Syllabus',
    fileType: 'text',
    rawText: `Unit 1: Software Process Models
- Introduction to Software Engineering and SDLC
- Waterfall, Iterative, and Spiral Models
- Agile Development, Scrum, and Extreme Programming (XP)
- DevOps and Continuous Integration/Continuous Delivery (CI/CD)

Unit 2: Requirements Engineering
- Functional and Non-Functional Requirements
- Requirements Elicitation, Analysis, and Specification (SRS)
- Feasibility Study and Requirements Validation
- Traceability Matrix and Change Management

Unit 3: UML and System Modeling
- Use Case Diagrams and Scenarios
- Class Diagrams, Sequence Diagrams, and Activity Diagrams
- State Machine Diagrams and Component Diagrams
- Architectural Patterns and Component-Based Modeling

Unit 4: Software Architecture and Design
- Architectural Styles: Layered, Client-Server, Microservices
- Object-Oriented Design Principles (SOLID)
- Design Patterns: Creational, Structural, and Behavioral
- User Interface Design Principles and Usability Engineering

Unit 5: Software Testing and Maintenance
- Verification vs Validation
- White Box (Basis Path, Control Flow) and Black Box Testing (Equivalence, BVA)
- Unit, Integration, System, and Acceptance Testing
- Software Metrics, Quality Assurance, and Maintenance Models`,
    status: 'Completed',
    isDemo: true,
    version: '1.0 (Demo)',
    units: [
      {
        id: 'se-u1',
        unitNumber: 1,
        title: 'Software Process Models',
        description: 'Covers lifecycle models, SDLC paradigms, Agile methodologies, and DevOps concepts.',
        topics: [
          {
            id: 'se-t1-1',
            name: 'SDLC and Traditional Process Models',
            subtopics: ['Waterfall Model', 'Iterative Model', 'Spiral Model & Risk Analysis'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 88,
            learningOutcomes: ['Compare sequential vs evolutionary software process models and assess risk-driven methodologies.']
          },
          {
            id: 'se-t1-2',
            name: 'Agile Methodologies and Scrum',
            subtopics: ['Agile Manifesto', 'Scrum Roles, Ceremonies, Artifacts', 'Extreme Programming (XP)', 'Sprint Planning'],
            estimatedHours: 5,
            complexity: 'Medium',
            importanceScore: 94,
            learningOutcomes: ['Understand iterative sprint execution, user stories, and continuous value delivery.']
          },
          {
            id: 'se-t1-3',
            name: 'DevOps & Modern Delivery',
            subtopics: ['Continuous Integration', 'Continuous Delivery', 'Infrastructure as Code basics'],
            estimatedHours: 3,
            complexity: 'Hard',
            importanceScore: 82,
            learningOutcomes: ['Explain CI/CD pipelines and the bridge between development and IT operations.']
          }
        ]
      },
      {
        id: 'se-u2',
        unitNumber: 2,
        title: 'Requirements Engineering',
        description: 'Elicitation, specification (SRS), validation, and functional vs non-functional requirements.',
        topics: [
          {
            id: 'se-t2-1',
            name: 'Requirements Elicitation and Analysis',
            subtopics: ['Stakeholder Interviews', 'Use Cases & User Stories', 'Feasibility Study'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 85,
            learningOutcomes: ['Formulate structured questions and capture software functional bounds.']
          },
          {
            id: 'se-t2-2',
            name: 'Software Requirements Specification (SRS)',
            subtopics: ['IEEE 830 Standard', 'Functional vs Non-Functional Requirements', 'SRS Attributes'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 92,
            learningOutcomes: ['Draft and evaluate unambiguous SRS documents conforming to standard conventions.']
          },
          {
            id: 'se-t2-3',
            name: 'Requirements Validation & Traceability',
            subtopics: ['Requirements Reviews', 'Traceability Matrix', 'Change Control'],
            estimatedHours: 3,
            complexity: 'Easy',
            importanceScore: 78,
            learningOutcomes: ['Track requirement evolution throughout the development cycle.']
          }
        ]
      },
      {
        id: 'se-u3',
        unitNumber: 3,
        title: 'UML and System Modeling',
        description: 'Structural and behavioral modeling diagrams according to standard UML specifications.',
        topics: [
          {
            id: 'se-t3-1',
            name: 'Use Case and Behavioral Modeling',
            subtopics: ['Actors and Use Cases', 'Include and Extend relationships', 'Activity Diagrams'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 89,
            learningOutcomes: ['Create system use cases and detailed activity workflows.']
          },
          {
            id: 'se-t3-2',
            name: 'Structural Class and Object Diagrams',
            subtopics: ['Classes, Attributes, Operations', 'Multiplicity and Associations', 'Aggregation and Composition'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 95,
            learningOutcomes: ['Architect object schemas with tight cohesion and loose coupling.']
          },
          {
            id: 'se-t3-3',
            name: 'Interaction and State Modeling',
            subtopics: ['Sequence Diagrams', 'Collaboration Diagrams', 'State Machine Diagrams'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 84,
            learningOutcomes: ['Model asynchronous messages, temporal event ordering, and object life transitions.']
          }
        ]
      },
      {
        id: 'se-u4',
        unitNumber: 4,
        title: 'Software Architecture and Design',
        description: 'Architectural paradigms, SOLID principles, Gang-of-Four design patterns, and modularity.',
        topics: [
          {
            id: 'se-t4-1',
            name: 'Architectural Styles and Modularity',
            subtopics: ['Client-Server & N-Tier', 'Layered Architecture', 'Microservices vs Monolith'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 86,
            learningOutcomes: ['Analyze tradeoffs across distributed and monolithic architectural topologies.']
          },
          {
            id: 'se-t4-2',
            name: 'SOLID Design Principles',
            subtopics: ['Single Responsibility', 'Open-Closed', 'Liskov Substitution', 'Interface Segregation', 'Dependency Inversion'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 96,
            learningOutcomes: ['Refactor legacy class hierarchies to obey clean-code SOLID constraints.']
          },
          {
            id: 'se-t4-3',
            name: 'Gang of Four Design Patterns',
            subtopics: ['Singleton & Factory (Creational)', 'Adapter & Decorator (Structural)', 'Observer & Strategy (Behavioral)'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 93,
            learningOutcomes: ['Select and implement canonical solutions for recurring design hurdles.']
          }
        ]
      },
      {
        id: 'se-u5',
        unitNumber: 5,
        title: 'Software Testing and Maintenance',
        description: 'Test strategies, white-box and black-box techniques, verification, validation, and maintenance.',
        topics: [
          {
            id: 'se-t5-1',
            name: 'Black Box & White Box Testing Strategies',
            subtopics: ['Equivalence Partitioning', 'Boundary Value Analysis', 'Cyclomatic Complexity & Basis Path'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 95,
            learningOutcomes: ['Synthesize test cases maximizing branch and boundary test coverage.']
          },
          {
            id: 'se-t5-2',
            name: 'Testing Hierarchy & Test Automation',
            subtopics: ['Unit Testing', 'Integration Testing', 'Regression Testing', 'CI Test Runners'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 87,
            learningOutcomes: ['Establish multi-level automated test pyramids for web applications.']
          },
          {
            id: 'se-t5-3',
            name: 'Software Quality Assurance and Maintenance',
            subtopics: ['Corrective, Adaptive, Perfective Maintenance', 'COCOMO Estimations', 'ISO 9126 Quality Metrics'],
            estimatedHours: 3,
            complexity: 'Easy',
            importanceScore: 76,
            learningOutcomes: ['Formulate long-term operational health and maintenance schedules.']
          }
        ]
      }
    ],
    teachingPlan: {
      id: 'tp-demo-se',
      syllabusId: 'demo-se-101',
      totalUnitsCount: 5,
      totalTopicsCount: 15,
      estimatedInstructionalHours: 61,
      estimatedSessionsRequired: 10,
      requestedSessions: 6,
      coveragePercentage: 100,
      workloadWarning: 'Estimated teaching workload requires approximately 10 standard sessions (61 hours total). Covering in 6 requested sessions requires consolidating compatible subtopics and prioritizing essential learning outcomes.',
      topicsRequiringReview: ['DevOps & Modern Delivery (practical pipeline labs may require extra lab hours)'],
      uncoveredOrAmbiguousTopics: [],
      createdAt: '2026-03-01T10:00:00Z',
      sessions: [
        {
          sessionNumber: 1,
          title: 'Foundations of Software Processes & Agile Frameworks',
          unitReferences: ['Unit 1: Software Process Models'],
          topicsCovered: ['SDLC and Traditional Process Models', 'Agile Methodologies and Scrum'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Differentiate Waterfall from Agile cycles', 'Master Scrum roles, sprints, and user story breakdown'],
          teachingApproach: 'Comparative case presentation followed by interactive sprint planning simulation',
          suggestedPracticalActivity: 'Draft sprint backlog and user stories for a student portal',
          quickRevisionQuestions: ['Why does the Waterfall model fail in volatile requirements?', 'What happens during a Scrum sprint retrospective?'],
          expectedLearningOutcome: 'Students can recommend optimal process models for varying client requirements.',
          difficulty: 'Intermediate',
          coverageStatus: 'Condensed'
        },
        {
          sessionNumber: 2,
          title: 'Requirements Engineering & SRS Specifications',
          unitReferences: ['Unit 2: Requirements Engineering'],
          topicsCovered: ['Requirements Elicitation and Analysis', 'Software Requirements Specification (SRS)', 'Requirements Validation'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Formulate unambiguous functional vs non-functional requirements', 'Draft IEEE 830 compliant SRS section'],
          teachingApproach: 'Walkthrough of a sample ambiguity flaw in real-world specifications',
          suggestedPracticalActivity: 'Convert vague customer prompts into testable functional specs',
          quickRevisionQuestions: ['What differentiates functional from non-functional requirements?', 'How does a traceability matrix assist regression testing?'],
          expectedLearningOutcome: 'Students construct clean, verifiable requirement documents.',
          difficulty: 'Intermediate',
          coverageStatus: 'Full'
        },
        {
          sessionNumber: 3,
          title: 'Object-Oriented Modeling with UML Diagrams',
          unitReferences: ['Unit 3: UML and System Modeling'],
          topicsCovered: ['Use Case and Behavioral Modeling', 'Structural Class and Object Diagrams', 'Interaction & Sequence Modeling'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Construct Use Case diagrams with Include/Extend dependencies', 'Generate Sequence diagrams showing async timing'],
          teachingApproach: 'Live diagram modeling on digital whiteboard',
          suggestedPracticalActivity: 'Draw class hierarchy and sequence diagram for an e-commerce checkout',
          quickRevisionQuestions: ['When do you use an include relationship versus an extend relationship in use cases?', 'Explain the difference between synchronous and asynchronous sequence calls.'],
          expectedLearningOutcome: 'Students accurately translate conceptual domain logic into visual UML blueprints.',
          difficulty: 'Advanced',
          coverageStatus: 'Condensed'
        },
        {
          sessionNumber: 4,
          title: 'Architectural Styles & SOLID Design Principles',
          unitReferences: ['Unit 4: Software Architecture and Design'],
          topicsCovered: ['Architectural Styles and Modularity', 'SOLID Design Principles'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Critique Monolith vs Microservices patterns', 'Apply SOLID principles to eliminate fragile code'],
          teachingApproach: 'Code refactoring demonstration from anti-pattern to clean architecture',
          suggestedPracticalActivity: 'Refactor a God-class violating Single Responsibility and Open-Closed principles',
          quickRevisionQuestions: ['Explain the Liskov Substitution Principle with an example.', 'What is the trade-off of microservices over monolithic architectures?'],
          expectedLearningOutcome: 'Students design decoupled, maintainable software architectures.',
          difficulty: 'Advanced',
          coverageStatus: 'Full'
        },
        {
          sessionNumber: 5,
          title: 'Gang of Four Patterns & CI/CD DevOps Delivery',
          unitReferences: ['Unit 1 & Unit 4'],
          topicsCovered: ['Gang of Four Design Patterns', 'DevOps & Modern Delivery'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Apply Factory, Observer, and Strategy patterns in problem scenarios', 'Understand automated build and deployment pipelines'],
          teachingApproach: 'Pattern matching quiz with real software scenarios',
          suggestedPracticalActivity: 'Write a TypeScript implementation of the Observer pattern for event notification',
          quickRevisionQuestions: ['Which pattern lets an algorithm vary independently from clients using it?', 'What constitutes a healthy CI build pipeline?'],
          expectedLearningOutcome: 'Students utilize enterprise design patterns and appreciate automated release systems.',
          difficulty: 'Advanced',
          coverageStatus: 'Condensed'
        },
        {
          sessionNumber: 6,
          title: 'Systematic Testing Techniques & Quality Assurance',
          unitReferences: ['Unit 5: Software Testing and Maintenance'],
          topicsCovered: ['Black Box & White Box Testing Strategies', 'Testing Hierarchy & Test Automation', 'Software Quality Assurance'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Calculate cyclomatic complexity and define basis paths', 'Design boundary value partitions and unit tests'],
          teachingApproach: 'Live problem solving of control flow graphs and test coverage matrices',
          suggestedPracticalActivity: 'Draw a control flow graph for a conditional loop and calculate cyclomatic complexity V(G)',
          quickRevisionQuestions: ['How is cyclomatic complexity calculated from edges and nodes?', 'Differentiate between verification and validation.'],
          expectedLearningOutcome: 'Students can formulate comprehensive verification strategies for production releases.',
          difficulty: 'Advanced',
          coverageStatus: 'Full'
        }
      ]
    },
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z'
  },
  {
    id: 'demo-cn-102',
    userId: 'demo-system',
    subjectName: 'Computer Networks',
    subjectCode: 'CS602',
    department: 'Computer Science and Engineering',
    semester: '6th Semester',
    university: 'Demonstration University Syllabus',
    fileType: 'text',
    rawText: `Unit 1: Network Fundamentals and Models
- Network Topologies, Switching techniques (Packet vs Circuit)
- OSI 7-Layer Reference Model vs TCP/IP Architecture
- Transmission media, Bandwidth, Delay, and Throughput calculations

Unit 2: Data Link Layer
- Framing, Error Detection (Parity, CRC, Checksum) and Correction (Hamming)
- Flow Control (Stop-and-Wait, Go-Back-N, Selective Repeat)
- Multiple Access Protocols (ALOHA, CSMA/CD, CSMA/CA)
- Ethernet standards and MAC addressing

Unit 3: Network Layer and Routing
- IPv4 and IPv6 Addressing, Subnetting, CIDR, and NAT
- Routing Algorithms: Distance Vector (Bellman-Ford) vs Link State (Dijkstra)
- Routing Protocols: RIP, OSPF, BGP
- Congestion Control and Packet scheduling algorithms

Unit 4: Transport Layer
- Connection-Oriented vs Connectionless Services
- User Datagram Protocol (UDP) and Real-Time constraints
- Transmission Control Protocol (TCP) segment structure, 3-Way Handshake
- TCP Congestion Control (Slow Start, Congestion Avoidance, Fast Retransmit)

Unit 5: Application Layer and Network Security
- Domain Name System (DNS), HTTP/HTTPS, FTP, SMTP
- Cryptography fundamentals: Symmetric (AES) vs Asymmetric (RSA)
- Secure Sockets Layer / Transport Layer Security (SSL/TLS)
- Firewalls, Intrusion Detection Systems (IDS), and Network Attacks`,
    status: 'Completed',
    isDemo: true,
    version: '1.0 (Demo)',
    units: [
      {
        id: 'cn-u1',
        unitNumber: 1,
        title: 'Network Fundamentals and Models',
        description: 'Physical architecture, layer abstractions, transmission performance and switching principles.',
        topics: [
          {
            id: 'cn-t1-1',
            name: 'OSI 7-Layer Model vs TCP/IP Suite',
            subtopics: ['Layer encapsulation', 'Functions of all 7 layers', 'Protocol data units (PDU)'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 92,
            learningOutcomes: ['Analyze each layer role and header encapsulation.']
          },
          {
            id: 'cn-t1-2',
            name: 'Switching & Network Performance',
            subtopics: ['Circuit vs Packet Switching', 'Propagation, Transmission, Queuing Delay', 'Bandwidth-Delay Product'],
            estimatedHours: 4,
            complexity: 'Hard',
            importanceScore: 84,
            learningOutcomes: ['Calculate total end-to-end network latency.']
          }
        ]
      },
      {
        id: 'cn-u2',
        unitNumber: 2,
        title: 'Data Link Layer',
        description: 'Framing, error handling, sliding window flow control, and medium access protocols.',
        topics: [
          {
            id: 'cn-t2-1',
            name: 'Error Detection and Correction',
            subtopics: ['Cyclic Redundancy Check (CRC)', 'Checksum calculation', 'Hamming Code error correction'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 95,
            learningOutcomes: ['Compute CRC polynomials and single-bit error correction matrices.']
          },
          {
            id: 'cn-t2-2',
            name: 'Sliding Window Protocols',
            subtopics: ['Stop-and-Wait', 'Go-Back-N (GBN)', 'Selective Repeat (SR)', 'Window Size constraints'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 94,
            learningOutcomes: ['Evaluate transmission efficiency across high-latency links.']
          },
          {
            id: 'cn-t2-3',
            name: 'Medium Access Control (MAC)',
            subtopics: ['Pure & Slotted ALOHA', 'CSMA/CD protocol for Ethernet', 'CSMA/CA for WiFi (802.11)'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 88,
            learningOutcomes: ['Explain collision detection and backoff algorithms.']
          }
        ]
      },
      {
        id: 'cn-u3',
        unitNumber: 3,
        title: 'Network Layer and Routing',
        description: 'IP Addressing, Subnet calculation, CIDR, and distributed routing algorithms.',
        topics: [
          {
            id: 'cn-t3-1',
            name: 'IPv4 / IPv6 Addressing and Subnetting',
            subtopics: ['Classful vs Classless (CIDR)', 'Subnet mask calculations', 'NAT and Private IP ranges'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 96,
            learningOutcomes: ['Design subnet divisions and route aggregation schemes.']
          },
          {
            id: 'cn-t3-2',
            name: 'Routing Algorithms (Dijkstra & Bellman-Ford)',
            subtopics: ['Distance Vector Routing', 'Link State Routing', 'Count to Infinity problem & Split Horizon'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 94,
            learningOutcomes: ['Execute shortest path algorithms across arbitrary network graphs.']
          }
        ]
      },
      {
        id: 'cn-u4',
        unitNumber: 4,
        title: 'Transport Layer',
        description: 'End-to-end communication, UDP lightweight delivery, and TCP congestion control mechanisms.',
        topics: [
          {
            id: 'cn-t4-1',
            name: 'TCP 3-Way Handshake and Connection Termination',
            subtopics: ['SYN, ACK, FIN flags', 'Sequence and Acknowledgment numbers', 'TIME_WAIT state rationale'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 90,
            learningOutcomes: ['Trace TCP connection states and segment exchanges.']
          },
          {
            id: 'cn-t4-2',
            name: 'TCP Congestion Control Algorithms',
            subtopics: ['Slow Start', 'Congestion Avoidance', 'Fast Retransmit & Fast Recovery (AIMD)'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 98,
            learningOutcomes: ['Graph congestion window cwnd dynamics during packet drop events.']
          }
        ]
      },
      {
        id: 'cn-u5',
        unitNumber: 5,
        title: 'Application Layer and Network Security',
        description: 'Core internet services (DNS, HTTP) and cryptographic secure transmission.',
        topics: [
          {
            id: 'cn-t5-1',
            name: 'Internet Application Protocols (DNS, HTTP/HTTPS)',
            subtopics: ['Iterative vs Recursive DNS lookups', 'HTTP 1.1 vs HTTP/2 vs HTTP/3', 'Persistent connections'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 89,
            learningOutcomes: ['Illustrate full web request round-trips from domain query to response.']
          },
          {
            id: 'cn-t5-2',
            name: 'Cryptography and Secure Protocols (TLS/SSL)',
            subtopics: ['Symmetric vs Asymmetric Ciphers (RSA)', 'Digital Certificates & PKI', 'TLS Handshake'],
            estimatedHours: 4,
            complexity: 'Hard',
            importanceScore: 92,
            learningOutcomes: ['Detail public key negotiation and confidentiality guarantees.']
          }
        ]
      }
    ],
    teachingPlan: {
      id: 'tp-demo-cn',
      syllabusId: 'demo-cn-102',
      totalUnitsCount: 5,
      totalTopicsCount: 11,
      estimatedInstructionalHours: 45,
      estimatedSessionsRequired: 8,
      requestedSessions: 6,
      coveragePercentage: 100,
      workloadWarning: 'Estimated requirement is 8 sessions (45 lecture hours). Six sessions consolidates application security and focuses on core routing and sliding window protocols.',
      topicsRequiringReview: [],
      uncoveredOrAmbiguousTopics: [],
      createdAt: '2026-03-01T10:00:00Z',
      sessions: [
        {
          sessionNumber: 1,
          title: 'Layered Architectures & End-to-End Delay Metrics',
          unitReferences: ['Unit 1: Network Fundamentals and Models'],
          topicsCovered: ['OSI 7-Layer Model vs TCP/IP Suite', 'Switching & Network Performance'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Trace data through all 7 OSI layers', 'Calculate transmission vs propagation delays'],
          teachingApproach: 'Packet trace demonstration with Wireshark',
          suggestedPracticalActivity: 'Calculate latency across a 1Gbps trans-oceanic satellite link',
          quickRevisionQuestions: ['Why does packet switching outperform circuit switching for bursty data?', 'What is the function of the presentation layer?'],
          expectedLearningOutcome: 'Students can diagnose protocol layer interactions and bottlenecks.',
          difficulty: 'Intermediate',
          coverageStatus: 'Full'
        },
        {
          sessionNumber: 2,
          title: 'Data Link Error Control: CRC & Hamming Codes',
          unitReferences: ['Unit 2: Data Link Layer'],
          topicsCovered: ['Error Detection and Correction'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Generate CRC remainder polynomials', 'Identify and correct single-bit Hamming errors'],
          teachingApproach: 'Step-by-step mathematical polynomial division on blackboard',
          suggestedPracticalActivity: 'Compute the 4-bit CRC remainder for a given message using generator x^4 + x + 1',
          quickRevisionQuestions: ['How many parity bits are required for a 7-bit ASCII character in Hamming code?', 'Why is CRC preferred over simple checksum in Ethernet?'],
          expectedLearningOutcome: 'Students solve parity and polynomial checksum calculations accurately.',
          difficulty: 'Advanced',
          coverageStatus: 'Full'
        },
        {
          sessionNumber: 3,
          title: 'Flow Control & Multiple Access: Sliding Window & CSMA',
          unitReferences: ['Unit 2: Data Link Layer'],
          topicsCovered: ['Sliding Window Protocols', 'Medium Access Control (MAC)'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Compare Go-Back-N with Selective Repeat efficiency', 'Analyze CSMA/CD collision detection backoff'],
          teachingApproach: 'Interactive visual simulation of sliding windows with lost frames',
          suggestedPracticalActivity: 'Calculate link utilization for Stop-and-Wait vs Sliding Window with window size W=8',
          quickRevisionQuestions: ['What is the maximum sender window size for Go-Back-N with n bits?', 'Why does CSMA/CD fail in wireless networks?'],
          expectedLearningOutcome: 'Students determine appropriate window sizing and channel sharing techniques.',
          difficulty: 'Advanced',
          coverageStatus: 'Full'
        },
        {
          sessionNumber: 4,
          title: 'IPv4/IPv6 Subnetting & Routing Algorithms',
          unitReferences: ['Unit 3: Network Layer and Routing'],
          topicsCovered: ['IPv4 / IPv6 Addressing and Subnetting', 'Routing Algorithms (Dijkstra & Bellman-Ford)'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Decompose a /24 block into variable length subnets (VLSM)', 'Run Dijkstra shortest path and Bellman-Ford updates'],
          teachingApproach: 'Live problem solving of CIDR partitioning and routing table convergence',
          suggestedPracticalActivity: 'Subnet 192.168.10.0/24 to support 4 subnets with 50, 30, 10, and 5 hosts',
          quickRevisionQuestions: ['How does Split Horizon address the count-to-infinity flaw?', 'What are the main advantages of IPv6 over IPv4?'],
          expectedLearningOutcome: 'Students configure scalable IP subnet schemes and calculate shortest routing paths.',
          difficulty: 'Advanced',
          coverageStatus: 'Condensed'
        },
        {
          sessionNumber: 5,
          title: 'Transport Layer Mechanics: TCP Handshake & Congestion Control',
          unitReferences: ['Unit 4: Transport Layer'],
          topicsCovered: ['TCP 3-Way Handshake and Connection Termination', 'TCP Congestion Control Algorithms'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Explain sequence number synchronization', 'Graph Slow Start, Congestion Avoidance, and Fast Recovery'],
          teachingApproach: 'Chronological timeline diagramming of SYN/ACK packet loss',
          suggestedPracticalActivity: 'Plot cwnd growth over 10 transmission rounds with an intentional loss at round 6',
          quickRevisionQuestions: ['What distinguishes 3 duplicate ACKs from a timeout in TCP?', 'Why is UDP preferred for VoIP and online multiplayer gaming?'],
          expectedLearningOutcome: 'Students understand congestion avoidance dynamics and transport protocol design.',
          difficulty: 'Advanced',
          coverageStatus: 'Full'
        },
        {
          sessionNumber: 6,
          title: 'Application Protocols & Network Security (TLS/RSA)',
          unitReferences: ['Unit 5: Application Layer and Network Security'],
          topicsCovered: ['Internet Application Protocols (DNS, HTTP/HTTPS)', 'Cryptography and Secure Protocols (TLS/SSL)'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Map recursive DNS resolutions and HTTPS request handling', 'Execute RSA key generation and explain TLS session creation'],
          teachingApproach: 'Tracing an encrypted HTTPS browser request from query to cipher exchange',
          suggestedPracticalActivity: 'Compute RSA encryption and decryption for small prime pairs p=7, q=11',
          quickRevisionQuestions: ['How does asymmetric cryptography protect symmetric session keys in TLS?', 'What role does a Certificate Authority (CA) play?'],
          expectedLearningOutcome: 'Students comprehend secure end-to-end web communication channels.',
          difficulty: 'Intermediate',
          coverageStatus: 'Condensed'
        }
      ]
    },
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z'
  },
  {
    id: 'demo-ml-103',
    userId: 'demo-system',
    subjectName: 'Machine Learning',
    subjectCode: 'CS603',
    department: 'Artificial Intelligence & Data Science',
    semester: '6th Semester',
    university: 'Demonstration University Syllabus',
    fileType: 'text',
    rawText: `Unit 1: Introduction to Machine Learning
- Types of Learning: Supervised, Unsupervised, Semi-supervised, Reinforcement
- Hypothesis Space, Inductive Bias, No Free Lunch Theorem
- Overfitting vs Underfitting, Bias-Variance Tradeoff

Unit 2: Supervised Learning
- Linear Regression, Ordinary Least Squares, Ridge and Lasso Regularization
- Logistic Regression and Classification boundaries
- Decision Trees: ID3, C4.5, CART, Entropy and Information Gain, Gini Impurity
- Support Vector Machines (SVM), Maximum Margin Hyperplane, Kernel Trick
- K-Nearest Neighbors (KNN) and Naive Bayes Classifiers

Unit 3: Unsupervised Learning
- Clustering: K-Means, Hierarchical (Agglomerative & Divisive), DBSCAN
- Dimensionality Reduction: Principal Component Analysis (PCA), Eigenvalues
- Association Rule Mining: Apriori algorithm

Unit 4: Model Evaluation and Optimization
- Confusion Matrix, Precision, Recall, F1-Score, ROC-AUC Curves
- Cross-Validation: K-Fold, Stratified, Leave-One-Out
- Gradient Descent: Batch, Stochastic (SGD), Mini-batch, Learning Rate schedules
- Ensemble Methods: Bagging, Random Forest, Boosting (AdaBoost, XGBoost)

Unit 5: Neural Networks and Applications
- Perceptron model, Multi-Layer Perceptron (MLP), Activation Functions (Sigmoid, ReLU)
- Backpropagation algorithm and mathematical derivation
- Loss functions, vanishing gradients, introduction to Deep Learning architectures`,
    status: 'Completed',
    isDemo: true,
    version: '1.0 (Demo)',
    units: [
      {
        id: 'ml-u1',
        unitNumber: 1,
        title: 'Introduction to Machine Learning',
        description: 'Foundations of learning theory, bias-variance tradeoff, hypothesis representation.',
        topics: [
          {
            id: 'ml-t1-1',
            name: 'Learning Paradigms & Bias-Variance Tradeoff',
            subtopics: ['Supervised vs Unsupervised', 'Bias-Variance decomposition', 'Overfitting remedies'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 90,
            learningOutcomes: ['Analyze generalization error and diagnose underfitting vs overfitting.']
          }
        ]
      },
      {
        id: 'ml-u2',
        unitNumber: 2,
        title: 'Supervised Learning',
        description: 'Linear models, tree classifiers, margin maximization, kernel methods, and probability classifiers.',
        topics: [
          {
            id: 'ml-t2-1',
            name: 'Linear and Logistic Regression',
            subtopics: ['Cost functions', 'Gradient updates', 'L1 Lasso and L2 Ridge regularization'],
            estimatedHours: 5,
            complexity: 'Medium',
            importanceScore: 92,
            learningOutcomes: ['Formulate objective functions and apply regularization penalties.']
          },
          {
            id: 'ml-t2-2',
            name: 'Decision Trees & Splitting Criteria',
            subtopics: ['Shannon Entropy', 'Information Gain', 'Gini Impurity', 'Pruning mechanisms'],
            estimatedHours: 5,
            complexity: 'Medium',
            importanceScore: 95,
            learningOutcomes: ['Compute information gain across multi-attribute datasets.']
          },
          {
            id: 'ml-t2-3',
            name: 'Support Vector Machines (SVM)',
            subtopics: ['Maximum margin optimization', 'Support vectors', 'Kernel trick (RBF, Polynomial)'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 96,
            learningOutcomes: ['Derive margin formulations and map non-linear data into dual space.']
          }
        ]
      },
      {
        id: 'ml-u3',
        unitNumber: 3,
        title: 'Unsupervised Learning',
        description: 'Clustering algorithms, centroid updates, density grouping, and feature projection via PCA.',
        topics: [
          {
            id: 'ml-t3-1',
            name: 'Clustering Algorithms (K-Means & DBSCAN)',
            subtopics: ['Centroid convergence', 'Elbow method', 'Density-based noise handling in DBSCAN'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 90,
            learningOutcomes: ['Execute K-Means iterations and choose optimal cluster count.']
          },
          {
            id: 'ml-t3-2',
            name: 'Principal Component Analysis (PCA)',
            subtopics: ['Covariance matrix', 'Eigenvectors and eigenvalues', 'Variance retention ratio'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 94,
            learningOutcomes: ['Project high-dimensional datasets into orthogonal principal components.']
          }
        ]
      },
      {
        id: 'ml-u4',
        unitNumber: 4,
        title: 'Model Evaluation and Optimization',
        description: 'Performance metrics, cross-validation, gradient descent variants, and ensemble strategies.',
        topics: [
          {
            id: 'ml-t4-1',
            name: 'Evaluation Metrics & ROC-AUC',
            subtopics: ['Precision, Recall, F1', 'ROC curves and AUC interpretation', 'Confusion matrix'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 93,
            learningOutcomes: ['Evaluate model fitness for imbalanced classification scenarios.']
          },
          {
            id: 'ml-t4-2',
            name: 'Ensemble Learning: Bagging and Boosting',
            subtopics: ['Random Forest feature subsampling', 'AdaBoost weight updates', 'Gradient Boosted Trees'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 97,
            learningOutcomes: ['Combine weak learners into robust ensemble predictive architectures.']
          }
        ]
      },
      {
        id: 'ml-u5',
        unitNumber: 5,
        title: 'Neural Networks and Applications',
        description: 'Perceptrons, backpropagation gradients, activation functions, and deep learning roots.',
        topics: [
          {
            id: 'ml-t5-1',
            name: 'Multi-Layer Perceptron and Backpropagation',
            subtopics: ['Chain rule of calculus', 'Weight gradient descent updates', 'Activation functions'],
            estimatedHours: 6,
            complexity: 'Hard',
            importanceScore: 98,
            learningOutcomes: ['Mathematically derive weight adjustments via backpropagation error propagation.']
          }
        ]
      }
    ],
    teachingPlan: {
      id: 'tp-demo-ml',
      syllabusId: 'demo-ml-103',
      totalUnitsCount: 5,
      totalTopicsCount: 9,
      estimatedInstructionalHours: 48,
      estimatedSessionsRequired: 8,
      requestedSessions: 6,
      coveragePercentage: 100,
      workloadWarning: 'Estimated requirement is 8 sessions due to mathematical derivations in SVM and Backpropagation. 6 sessions packs linear & logistic regression and pairs ensembles with PCA.',
      topicsRequiringReview: [],
      uncoveredOrAmbiguousTopics: [],
      createdAt: '2026-03-01T10:00:00Z',
      sessions: [
        {
          sessionNumber: 1,
          title: 'Foundations & Linear Predictive Models',
          unitReferences: ['Unit 1 & Unit 2'],
          topicsCovered: ['Learning Paradigms & Bias-Variance Tradeoff', 'Linear and Logistic Regression'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Diagnose bias-variance dilemmas', 'Formulate regularized Ridge & Lasso loss functions'],
          teachingApproach: 'Mathematical derivation alongside interactive curve-fitting graphs',
          suggestedPracticalActivity: 'Calculate regression gradient step given small sample dataset',
          quickRevisionQuestions: ['Why does L1 regularization encourage feature sparsity whereas L2 does not?', 'Define the bias-variance tradeoff mathematically.'],
          expectedLearningOutcome: 'Students implement robust regularized linear regressors.',
          difficulty: 'Intermediate',
          coverageStatus: 'Condensed'
        },
        {
          sessionNumber: 2,
          title: 'Decision Tree Induction & Splitting Criteria',
          unitReferences: ['Unit 2: Supervised Learning'],
          topicsCovered: ['Decision Trees & Splitting Criteria'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Compute entropy and information gain', 'Construct ID3/CART decision boundaries'],
          teachingApproach: 'Worked example on standard weather/play tennis dataset',
          suggestedPracticalActivity: 'Compute the root split attribute from a 14-record sample table',
          quickRevisionQuestions: ['What is the maximum entropy for a binary classification problem?', 'How does tree pruning prevent overfitting?'],
          expectedLearningOutcome: 'Students calculate entropy and choose best-split decision nodes.',
          difficulty: 'Intermediate',
          coverageStatus: 'Full'
        },
        {
          sessionNumber: 3,
          title: 'Support Vector Machines & Kernel Transformations',
          unitReferences: ['Unit 2: Supervised Learning'],
          topicsCovered: ['Support Vector Machines (SVM)'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Formulate the maximum margin dual optimization problem', 'Apply Radial Basis Function (RBF) kernel'],
          teachingApproach: 'Geometric projection from 2D non-separable space to 3D hyperplane',
          suggestedPracticalActivity: 'Identify support vectors on a 2D coordinate plot and write the margin equation',
          quickRevisionQuestions: ['Why are only support vectors influential in establishing the hyperplane?', 'What is the role of the slack variable C in soft-margin SVM?'],
          expectedLearningOutcome: 'Students master margin optimization and non-linear kernel mapping.',
          difficulty: 'Advanced',
          coverageStatus: 'Full'
        },
        {
          sessionNumber: 4,
          title: 'Unsupervised Clustering & Dimensionality Reduction (PCA)',
          unitReferences: ['Unit 3: Unsupervised Learning'],
          topicsCovered: ['Clustering Algorithms (K-Means & DBSCAN)', 'Principal Component Analysis (PCA)'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Perform K-Means clustering steps', 'Calculate eigenvectors for PCA projection'],
          teachingApproach: 'Step-by-step centroid updates and 2D-to-1D PCA projection',
          suggestedPracticalActivity: 'Execute one iteration of K-Means clustering with 2 centroids on 6 sample coordinates',
          quickRevisionQuestions: ['Why is K-Means sensitive to initial seed selection?', 'What does each principal component geometrically represent?'],
          expectedLearningOutcome: 'Students apply unsupervised clustering and project high-dimensional matrices.',
          difficulty: 'Advanced',
          coverageStatus: 'Condensed'
        },
        {
          sessionNumber: 5,
          title: 'Model Evaluation Metrics & Ensemble Algorithms',
          unitReferences: ['Unit 4: Model Evaluation and Optimization'],
          topicsCovered: ['Evaluation Metrics & ROC-AUC', 'Ensemble Learning: Bagging and Boosting'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Calculate precision, recall, and AUC', 'Differentiate Random Forest bagging from AdaBoost boosting'],
          teachingApproach: 'Medical diagnosis case study comparing false positives vs false negatives',
          suggestedPracticalActivity: 'Compute Precision, Recall, and F1-score from a 2x2 confusion matrix',
          quickRevisionQuestions: ['When is ROC-AUC preferred over raw classification accuracy?', 'How does AdaBoost adjust weights for misclassified samples?'],
          expectedLearningOutcome: 'Students evaluate statistical model fitness and construct ensemble models.',
          difficulty: 'Intermediate',
          coverageStatus: 'Full'
        },
        {
          sessionNumber: 6,
          title: 'Neural Networks & The Backpropagation Algorithm',
          unitReferences: ['Unit 5: Neural Networks and Applications'],
          topicsCovered: ['Multi-Layer Perceptron and Backpropagation'],
          estimatedDurationMinutes: 60,
          learningObjectives: ['Compute forward pass activations with ReLU/Sigmoid', 'Derive chain rule weight gradient adjustments during backpropagation'],
          teachingApproach: 'Hand-derivation of single hidden layer backpropagation chain rule',
          suggestedPracticalActivity: 'Calculate the weight update for a 2-input, 1-neuron network with Mean Squared Error loss',
          quickRevisionQuestions: ['Why do deep neural networks suffer from the vanishing gradient problem with sigmoid?', 'Explain how the chain rule propagates error backwards.'],
          expectedLearningOutcome: 'Students understand the mathematical mechanics of deep learning optimization.',
          difficulty: 'Advanced',
          coverageStatus: 'Full'
        }
      ]
    },
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z'
  },
  {
    id: 'demo-nlp-104',
    userId: 'demo-system',
    subjectName: 'Natural Language Processing',
    subjectCode: 'CS604',
    department: 'Artificial Intelligence & Data Science',
    semester: '7th Semester',
    university: 'Demonstration University Syllabus',
    fileType: 'text',
    rawText: `Unit 1: Text Preprocessing and Language Models
- Tokenization, Stemming (Porter), Lemmatization, Stop-word removal
- N-gram Language Modeling, Perplexity, Smoothing (Laplace, Good-Turing)

Unit 2: Syntax and Parsing
- Part-of-Speech (POS) Tagging, Hidden Markov Models (HMM), Viterbi algorithm
- Context-Free Grammars (CFG), Cocke-Younger-Kasami (CYK) Parsing, Dependency Parsing

Unit 3: Semantic Analysis
- Lexical Semantics, WordNet, Synsets, Word Sense Disambiguation (Lesk Algorithm)
- Vector Semantics: TF-IDF, Word2Vec (Skip-gram, CBOW), GloVe embeddings

Unit 4: Information Extraction and Dialogue Systems
- Named Entity Recognition (NER), Relation Extraction
- Conversational Agents, Intent Detection, Slot Filling, Dialogue State Tracking

Unit 5: NLP Applications and Transformers
- Machine Translation (BLEU score evaluation), Text Summarization
- Attention Mechanism, Transformer Architecture (Self-Attention, Multi-Head), BERT and GPT overview`,
    status: 'Completed',
    isDemo: true,
    version: '1.0 (Demo)',
    units: [
      {
        id: 'nlp-u1',
        unitNumber: 1,
        title: 'Text Preprocessing and Language Models',
        description: 'Text normalization, statistical n-grams, perplexity calculation and smoothing.',
        topics: [
          {
            id: 'nlp-t1-1',
            name: 'Text Normalization & Tokenization',
            subtopics: ['Byte Pair Encoding (BPE)', 'Lemmatization vs Stemming', 'Stopword filtering'],
            estimatedHours: 4,
            complexity: 'Easy',
            importanceScore: 84,
            learningOutcomes: ['Build text sanitation pipelines.']
          },
          {
            id: 'nlp-t1-2',
            name: 'N-Gram Language Models & Smoothing',
            subtopics: ['Bigram/Trigram probabilities', 'Perplexity evaluation', 'Laplace Add-1 smoothing'],
            estimatedHours: 5,
            complexity: 'Medium',
            importanceScore: 92,
            learningOutcomes: ['Calculate statistical sentence likelihoods.']
          }
        ]
      },
      {
        id: 'nlp-u2',
        unitNumber: 2,
        title: 'Syntax and Parsing',
        description: 'Part of speech tagging, Hidden Markov Models, Viterbi decoding, dependency trees.',
        topics: [
          {
            id: 'nlp-t2-1',
            name: 'Part-of-Speech Tagging and HMM',
            subtopics: ['Emission & Transition probabilities', 'Viterbi dynamic programming algorithm'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 94,
            learningOutcomes: ['Trace most likely POS sequence paths.']
          },
          {
            id: 'nlp-t2-2',
            name: 'Syntactic Parsing & Dependency Grammar',
            subtopics: ['CYK Parsing algorithm', 'Chomsky Normal Form', 'Dependency arcs'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 88,
            learningOutcomes: ['Parse grammatical structure from context-free grammars.']
          }
        ]
      },
      {
        id: 'nlp-u3',
        unitNumber: 3,
        title: 'Semantic Analysis',
        description: 'Word embeddings, distributional semantics, WordNet, and dense vector representations.',
        topics: [
          {
            id: 'nlp-t3-1',
            name: 'Word Embeddings (Word2Vec & GloVe)',
            subtopics: ['Skip-gram with Negative Sampling', 'Continuous Bag of Words (CBOW)', 'Cosine Similarity'],
            estimatedHours: 5,
            complexity: 'Medium',
            importanceScore: 96,
            learningOutcomes: ['Explain semantic vector space geometries and analogical reasoning.']
          }
        ]
      },
      {
        id: 'nlp-u4',
        unitNumber: 4,
        title: 'Information Extraction and Dialogue Systems',
        description: 'Entity recognition, relation extraction, task-oriented conversational bots.',
        topics: [
          {
            id: 'nlp-t4-1',
            name: 'Named Entity Recognition & Information Extraction',
            subtopics: ['BIO Tagging scheme', 'Feature-based NER', 'Relation extraction'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 86,
            learningOutcomes: ['Extract structured entities from unstructured prose.']
          }
        ]
      },
      {
        id: 'nlp-u5',
        unitNumber: 5,
        title: 'NLP Applications and Transformers',
        description: 'Self-attention, Transformer encoders/decoders, BERT, GPT, and BLEU score.',
        topics: [
          {
            id: 'nlp-t5-1',
            name: 'Self-Attention Mechanism & Transformers',
            subtopics: ['Query, Key, Value calculations', 'Multi-Head Attention', 'Positional Encoding'],
            estimatedHours: 6,
            complexity: 'Hard',
            importanceScore: 98,
            learningOutcomes: ['Formulate Scaled Dot-Product Attention equations.']
          }
        ]
      }
    ],
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z'
  },
  {
    id: 'demo-cv-105',
    userId: 'demo-system',
    subjectName: 'Computer Vision',
    subjectCode: 'CS605',
    department: 'Artificial Intelligence & Data Science',
    semester: '7th Semester',
    university: 'Demonstration University Syllabus',
    fileType: 'text',
    rawText: `Unit 1: Image Processing Fundamentals
- Image representation, sampling, quantization, color spaces (RGB, HSV, Grayscale)
- Spatial Filtering: Convolution, Gaussian blur, Sobel, Laplacian, Median filters
- Frequency domain filtering and Fourier Transform

Unit 2: Feature Extraction and Matching
- Edge Detection: Canny Edge Detector (Non-maximum suppression, Hysteresis)
- Corner Detection: Harris Corner Detector
- Invariant Local Features: SIFT (Scale-Invariant Feature Transform), SURF, ORB
- Feature matching and RANSAC algorithm for outlier removal

Unit 3: Motion Estimation
- Optical Flow: Lucas-Kanade and Horn-Schunck methods
- Video tracking, Kalman filter for object tracking

Unit 4: Three-Dimensional Reconstruction
- Camera models: Pinhole camera, intrinsic and extrinsic camera matrices
- Epipolar Geometry: Essential and Fundamental matrices, Stereo Vision disparity mapping

Unit 5: Object Detection and Applications
- Convolutional Neural Networks (CNN) for Image Classification: LeNet, ResNet
- Object Detection Architectures: R-CNN, Fast R-CNN, Faster R-CNN, YOLO (You Only Look Once)
- Semantic and Instance Segmentation: U-Net, Mask R-CNN`,
    status: 'Completed',
    isDemo: true,
    version: '1.0 (Demo)',
    units: [
      {
        id: 'cv-u1',
        unitNumber: 1,
        title: 'Image Processing Fundamentals',
        description: 'Pixel filtering, convolution kernels, spatial and frequency filtering.',
        topics: [
          {
            id: 'cv-t1-1',
            name: 'Spatial Filtering & Convolution',
            subtopics: ['Kernel convolution math', 'Gaussian smoothing', 'Median filtering for salt-and-pepper noise'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 88,
            learningOutcomes: ['Apply convolution matrix kernels to digital images.']
          }
        ]
      },
      {
        id: 'cv-u2',
        unitNumber: 2,
        title: 'Feature Extraction and Matching',
        description: 'Edge detectors, corner detectors, invariant keypoints (SIFT), and RANSAC.',
        topics: [
          {
            id: 'cv-t2-1',
            name: 'Edge and Keypoint Detection (Canny & SIFT)',
            subtopics: ['Canny 5-stage pipeline', 'Difference of Gaussians (DoG)', 'Descriptor orientation assignment'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 96,
            learningOutcomes: ['Explain multi-stage edge refinement and scale-space extrema.']
          }
        ]
      },
      {
        id: 'cv-u3',
        unitNumber: 3,
        title: 'Motion Estimation',
        description: 'Optical flow constraints, Lucas-Kanade differential methods, tracking algorithms.',
        topics: [
          {
            id: 'cv-t3-1',
            name: 'Optical Flow (Lucas-Kanade)',
            subtopics: ['Brightness Constancy Assumption', 'Aperture Problem', 'Least squares motion solve'],
            estimatedHours: 4,
            complexity: 'Hard',
            importanceScore: 90,
            learningOutcomes: ['Formulate optical flow motion vectors.']
          }
        ]
      },
      {
        id: 'cv-u4',
        unitNumber: 4,
        title: 'Three-Dimensional Reconstruction',
        description: 'Pinhole camera models, intrinsic matrices, epipolar lines, stereo disparity.',
        topics: [
          {
            id: 'cv-t4-1',
            name: 'Camera Geometry and Epipolar Lines',
            subtopics: ['Pinhole camera parameters', 'Fundamental matrix F', 'Stereo triangulation and disparity'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 94,
            learningOutcomes: ['Compute 3D depth from stereo baseline disparities.']
          }
        ]
      },
      {
        id: 'cv-u5',
        unitNumber: 5,
        title: 'Object Detection and Applications',
        description: 'CNN backbones, anchor boxes, two-stage vs one-stage detectors (YOLO).',
        topics: [
          {
            id: 'cv-t5-1',
            name: 'Object Detection Architectures (YOLO vs Faster R-CNN)',
            subtopics: ['Region Proposal Networks', 'Single shot grid detection', 'Intersection over Union (IoU) and NMS'],
            estimatedHours: 6,
            complexity: 'Hard',
            importanceScore: 98,
            learningOutcomes: ['Contrast anchor-based region proposals against unified bounding box regressions.']
          }
        ]
      }
    ],
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z'
  },
  {
    id: 'demo-dbms-106',
    userId: 'demo-system',
    subjectName: 'Database Management Systems',
    subjectCode: 'CS606',
    department: 'Computer Science and Engineering',
    semester: '4th Semester',
    university: 'Demonstration University Syllabus',
    fileType: 'text',
    rawText: `Unit 1: Database Architecture and Relational Model
- Three-Schema Architecture, Data Independence, Relational Data Model
- Relational Algebra: Selection, Projection, Cartesian Product, Joins, Division

Unit 2: SQL and Query Optimization
- DDL, DML, Complex Queries, Subqueries, Aggregations, Views, Triggers
- Query processing and cost-based query optimization, Relational algebra equivalence

Unit 3: Normalization and Relational Design
- Functional Dependencies, Armstrong's Axioms, Closure of attributes
- Normal Forms: 1NF, 2NF, 3NF, BCNF, 4NF, Lossless Join & Dependency Preservation

Unit 4: Transaction Processing and Concurrency Control
- ACID Properties, Transaction states, Schedules: Serializability (Conflict & View)
- Concurrency Control: Two-Phase Locking (2PL), Strict 2PL, Timestamp Ordering, Deadlock handling

Unit 5: Storage, Indexing, and Recovery
- File organizations, B-Trees and B+ Trees indexing mechanics
- Crash Recovery: Log-based recovery (WAL), Checkpoints, ARIES algorithm`,
    status: 'Completed',
    isDemo: true,
    version: '1.0 (Demo)',
    units: [
      {
        id: 'dbms-u1',
        unitNumber: 1,
        title: 'Database Architecture and Relational Model',
        description: 'Data independence, relational schemas, and formal relational algebra operations.',
        topics: [
          {
            id: 'dbms-t1-1',
            name: 'Relational Algebra Operations',
            subtopics: ['Select, Project, Rename', 'Cartesian Product, Natural Join, Theta Join', 'Division operator'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 91,
            learningOutcomes: ['Express complex queries via relational algebraic expressions.']
          }
        ]
      },
      {
        id: 'dbms-u2',
        unitNumber: 2,
        title: 'SQL and Query Optimization',
        description: 'Advanced SQL queries, nested subqueries, joins, query parsing and execution trees.',
        topics: [
          {
            id: 'dbms-t2-1',
            name: 'Advanced SQL & Query Execution Plans',
            subtopics: ['Correlated subqueries', 'Window functions', 'Relational algebraic query trees'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 89,
            learningOutcomes: ['Construct efficient SQL scripts and analyze query plans.']
          }
        ]
      },
      {
        id: 'dbms-u3',
        unitNumber: 3,
        title: 'Normalization and Relational Design',
        description: 'Functional dependencies, normalization decompositions up to BCNF.',
        topics: [
          {
            id: 'dbms-t3-1',
            name: 'Functional Dependencies and Normal Forms (1NF to BCNF)',
            subtopics: ['Attribute closures and candidate keys', 'Lossless join decomposition test', 'Dependency preservation'],
            estimatedHours: 6,
            complexity: 'Hard',
            importanceScore: 98,
            learningOutcomes: ['Decompose unnormalized relations into lossless BCNF schemas.']
          }
        ]
      },
      {
        id: 'dbms-u4',
        unitNumber: 4,
        title: 'Transaction Processing and Concurrency Control',
        description: 'ACID guarantees, conflict serializability, 2-phase locking, and deadlock resolution.',
        topics: [
          {
            id: 'dbms-t4-1',
            name: 'Serializability and Two-Phase Locking (2PL)',
            subtopics: ['Conflict serializability precedence graphs', 'Growing and shrinking lock phases', 'Strict 2PL'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 97,
            learningOutcomes: ['Detect non-serializable schedules and evaluate 2PL concurrency protocols.']
          }
        ]
      },
      {
        id: 'dbms-u5',
        unitNumber: 5,
        title: 'Storage, Indexing, and Recovery',
        description: 'B+ Tree search and insertion, write-ahead logging (WAL), checkpoints.',
        topics: [
          {
            id: 'dbms-t5-1',
            name: 'B+ Tree Indexing & WAL Recovery',
            subtopics: ['B+ tree search and node split', 'Write-Ahead Logging protocol', 'ARIES recovery phases'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 94,
            learningOutcomes: ['Trace B+ Tree leaf pointers and system crash recovery routines.']
          }
        ]
      }
    ],
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z'
  },
  {
    id: 'demo-os-107',
    userId: 'demo-system',
    subjectName: 'Operating Systems',
    subjectCode: 'CS607',
    department: 'Computer Science and Engineering',
    semester: '4th Semester',
    university: 'Demonstration University Syllabus',
    fileType: 'text',
    rawText: `Unit 1: Operating System Structures & Process Management
- Dual-mode operation, System calls, Process states, Process Control Block (PCB)
- Context switching, Threads (User vs Kernel level), Multithreading models

Unit 2: CPU Scheduling and Synchronization
- Scheduling: FCFS, SJF, Priority, Round Robin, Multilevel Feedback Queue
- Critical Section Problem: Peterson's Solution, Semaphores, Mutex, Monitors
- Classical Synchronization Problems: Dining Philosophers, Producer-Consumer, Readers-Writers

Unit 3: Deadlocks
- Deadlock characterization (4 necessary conditions), Resource Allocation Graph (RAG)
- Deadlock Prevention, Deadlock Avoidance: Banker's Algorithm
- Deadlock Detection and Recovery techniques

Unit 4: Memory Management
- Logical vs Physical Address Space, Swapping, Contiguous allocation, Paging, Segmentation
- Virtual Memory: Demand Paging, Page Faults, Page Replacement Algorithms (FIFO, LRU, Optimal), Thrashing

Unit 5: Storage and File Systems
- Disk scheduling algorithms: FCFS, SSTF, SCAN, C-SCAN, LOOK
- File system structure, directory implementation, Free-space management, RAID levels`,
    status: 'Completed',
    isDemo: true,
    version: '1.0 (Demo)',
    units: [
      {
        id: 'os-u1',
        unitNumber: 1,
        title: 'Operating System Structures & Process Management',
        description: 'Kernel architectures, system calls, PCB context switching, and multithreading.',
        topics: [
          {
            id: 'os-t1-1',
            name: 'Processes, Threads & System Calls',
            subtopics: ['PCB data fields', 'Context switch overhead', 'User-level vs Kernel threads'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 88,
            learningOutcomes: ['Trace process lifecycle transitions.']
          }
        ]
      },
      {
        id: 'os-u2',
        unitNumber: 2,
        title: 'CPU Scheduling and Synchronization',
        description: 'Preemptive/non-preemptive scheduling, race conditions, semaphores, classic problems.',
        topics: [
          {
            id: 'os-t2-1',
            name: 'CPU Scheduling Algorithms',
            subtopics: ['Gantt charts', 'Waiting time and turnaround time calculations', 'Round Robin quantum tuning'],
            estimatedHours: 5,
            complexity: 'Medium',
            importanceScore: 95,
            learningOutcomes: ['Calculate average turnaround and waiting times across job batches.']
          },
          {
            id: 'os-t2-2',
            name: 'Process Synchronization & Semaphores',
            subtopics: ['Critical section conditions', 'Counting vs binary semaphores', 'Producer-Consumer bounded buffer'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 97,
            learningOutcomes: ['Write race-free concurrent synchronization code using semaphore primitives.']
          }
        ]
      },
      {
        id: 'os-u3',
        unitNumber: 3,
        title: 'Deadlocks',
        description: 'Deadlock detection, Bankers algorithm safe-state evaluation, resource allocation graphs.',
        topics: [
          {
            id: 'os-t3-1',
            name: "Deadlock Avoidance & Banker's Algorithm",
            subtopics: ['Coffman conditions', "Banker's Safety and Resource-Request algorithms"],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 96,
            learningOutcomes: ['Compute safe execution sequences given allocation and maximum need matrices.']
          }
        ]
      },
      {
        id: 'os-u4',
        unitNumber: 4,
        title: 'Memory Management',
        description: 'Paging, Translation Lookaside Buffer (TLB), page replacement algorithms, thrashing.',
        topics: [
          {
            id: 'os-t4-1',
            name: 'Virtual Memory & Page Replacement',
            subtopics: ['FIFO, LRU, Optimal page replacement', "Belady's Anomaly", 'Working set model & thrashing'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 98,
            learningOutcomes: ['Calculate page fault frequencies for reference strings under FIFO, LRU, and Optimal.']
          }
        ]
      },
      {
        id: 'os-u5',
        unitNumber: 5,
        title: 'Storage and File Systems',
        description: 'Disk seek optimization, SCAN algorithms, RAID parity and fault tolerance.',
        topics: [
          {
            id: 'os-t5-1',
            name: 'Disk Scheduling & RAID Levels',
            subtopics: ['SSTF, SCAN, C-SCAN total head movements', 'RAID 0, 1, 5, 10 comparisons'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 90,
            learningOutcomes: ['Evaluate total cylinder traversal costs for disk scheduling sequences.']
          }
        ]
      }
    ],
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z'
  },
  {
    id: 'demo-dsa-108',
    userId: 'demo-system',
    subjectName: 'Data Structures and Algorithms',
    subjectCode: 'CS608',
    department: 'Computer Science and Engineering',
    semester: '3rd Semester',
    university: 'Demonstration University Syllabus',
    fileType: 'text',
    rawText: `Unit 1: Complexity Analysis and Elementary Data Structures
- Asymptotic Notations: Big O, Big Omega, Big Theta, Space and Time complexity
- Arrays, Singly/Doubly Linked Lists, Circular Linked Lists, operations and complexities

Unit 2: Stacks, Queues, and Recursion
- Stack implementation, Applications: Infix to Postfix conversion, Parentheses matching
- Queue implementation, Circular Queue, Deque, Priority Queue using binary heaps
- Recursion mechanics, Recurrence relations, Master Theorem

Unit 3: Trees and Balanced Search Trees
- Binary Trees, Traversals (Preorder, Inorder, Postorder, Level-order)
- Binary Search Trees (BST): Insertion, Deletion, Search
- Self-Balancing Trees: AVL Trees (Rotations: LL, RR, LR, RL), Red-Black Trees introduction

Unit 4: Graphs and Algorithmic Paradigms
- Graph Representations (Adjacency Matrix, Adjacency List), BFS and DFS Traversals
- Minimum Spanning Trees (Kruskal with Disjoint Set Union, Prim)
- Shortest Path Algorithms: Dijkstra, Bellman-Ford, Floyd-Warshall
- Algorithmic Paradigms: Greedy Method vs Dynamic Programming vs Divide & Conquer

Unit 5: Sorting, Searching, and Hashing
- Sorting: QuickSort (Partitioning), MergeSort, HeapSort, Counting Sort (stability and complexity)
- Searching: Binary Search, Interpolation Search
- Hashing: Hash functions, Collision Resolution (Chaining, Open Addressing: Linear Probing, Quadratic, Double Hashing)`,
    status: 'Completed',
    isDemo: true,
    version: '1.0 (Demo)',
    units: [
      {
        id: 'dsa-u1',
        unitNumber: 1,
        title: 'Complexity Analysis and Elementary Data Structures',
        description: 'Asymptotic notation, amortized analysis, linked lists manipulations.',
        topics: [
          {
            id: 'dsa-t1-1',
            name: 'Asymptotic Analysis & Linked Lists',
            subtopics: ['Big-O, Omega, Theta', 'Singly and doubly linked lists node reversal'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 90,
            learningOutcomes: ['Evaluate time bounds and manipulate pointer chains.']
          }
        ]
      },
      {
        id: 'dsa-u2',
        unitNumber: 2,
        title: 'Stacks, Queues, and Recursion',
        description: 'Expression conversion, heap queues, Master Theorem recurrence bounds.',
        topics: [
          {
            id: 'dsa-t2-1',
            name: 'Stack Applications & Master Theorem',
            subtopics: ['Infix to postfix parsing', 'Master theorem 3 cases', 'Recursion trees'],
            estimatedHours: 5,
            complexity: 'Medium',
            importanceScore: 94,
            learningOutcomes: ['Solve asymptotic recurrence formulas and convert arithmetic expressions.']
          }
        ]
      },
      {
        id: 'dsa-u3',
        unitNumber: 3,
        title: 'Trees and Balanced Search Trees',
        description: 'BST operations, AVL tree balancing rotations, height invariants.',
        topics: [
          {
            id: 'dsa-t3-1',
            name: 'Binary Search Trees & AVL Rotations',
            subtopics: ['BST node deletion cases', 'AVL balance factor calculation', 'LL, RR, LR, RL rotations'],
            estimatedHours: 6,
            complexity: 'Hard',
            importanceScore: 98,
            learningOutcomes: ['Rebalance AVL trees upon key insertions.']
          }
        ]
      },
      {
        id: 'dsa-u4',
        unitNumber: 4,
        title: 'Graphs and Algorithmic Paradigms',
        description: 'BFS/DFS traversals, MST (Kruskal & Prim), Dijkstra shortest path, DP formulations.',
        topics: [
          {
            id: 'dsa-t4-1',
            name: 'Graph Traversal & Minimum Spanning Trees',
            subtopics: ['BFS/DFS queues and stacks', "Kruskal's algorithm with DSU", "Prim's greedy MST"],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 96,
            learningOutcomes: ['Extract minimum spanning trees and trace graph searches.']
          },
          {
            id: 'dsa-t4-2',
            name: 'Dynamic Programming vs Greedy Paradigms',
            subtopics: ['Optimal substructure and overlapping subproblems', '0/1 Knapsack problem', 'Longest Common Subsequence (LCS)'],
            estimatedHours: 5,
            complexity: 'Hard',
            importanceScore: 97,
            learningOutcomes: ['Formulate memoization tables and recurrence equations for DP.']
          }
        ]
      },
      {
        id: 'dsa-u5',
        unitNumber: 5,
        title: 'Sorting, Searching, and Hashing',
        description: 'Quicksort partitioning, MergeSort recurrences, hash collision handling.',
        topics: [
          {
            id: 'dsa-t5-1',
            name: 'Advanced Sorting Algorithms (QuickSort & HeapSort)',
            subtopics: ['Lomuto vs Hoare partitioning', 'Max-heapify and heap-sort', 'Worst case mitigation'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 95,
            learningOutcomes: ['Trace partition boundaries and analyze comparison bounds.']
          },
          {
            id: 'dsa-t5-2',
            name: 'Hashing Techniques & Collision Resolution',
            subtopics: ['Chaining with linked lists', 'Open addressing (Linear, Quadratic, Double Hashing)', 'Load factor tuning'],
            estimatedHours: 4,
            complexity: 'Medium',
            importanceScore: 92,
            learningOutcomes: ['Resolve key collisions and calculate average probe counts.']
          }
        ]
      }
    ],
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z'
  }
];
