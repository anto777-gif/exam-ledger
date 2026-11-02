import random
import time
from typing import Dict, Any, List, Optional

TEMPLATES = [
    # 1-2 Marks
    {
        "template": lambda topic, unit: f"Define {topic} and state its primary significance in {unit}.",
        "marks": [1, 2],
        "types": ["Theory", "Mixed"],
        "difficulty": "Easy",
        "baseScore": 78,
        "rationale": "Fundamental concept definition frequently tested in Part-A compulsory sections."
    },
    {
        "template": lambda topic, unit: f"What are the two major advantages and limitations of {topic}?",
        "marks": [2],
        "types": ["Theory", "Problem Solving", "Mixed"],
        "difficulty": "Easy",
        "baseScore": 82,
        "rationale": "Core diagnostic question testing foundational understanding without lengthy derivation."
    },
    {
        "template": lambda topic, unit: f"State the mathematical or logical condition required for {topic} to hold true.",
        "marks": [2],
        "types": ["Numerical", "Theory", "Mixed"],
        "difficulty": "Medium",
        "baseScore": 85,
        "rationale": "Prerequisite condition testing analytical rigor."
    },
    # 5 Marks
    {
        "template": lambda topic, unit: f"Explain the underlying architecture and working mechanism of {topic} with a neat schematic diagram.",
        "marks": [5],
        "types": ["Theory", "Diagram Based", "Mixed"],
        "difficulty": "Medium",
        "baseScore": 88,
        "rationale": "High-frequency mid-weight question requiring architectural conceptualization and visual representation."
    },
    {
        "template": lambda topic, unit: f"Differentiate between conventional approaches and modern implementations of {topic}. Highlight key operational tradeoffs.",
        "marks": [5],
        "types": ["Theory", "Case Study", "Mixed"],
        "difficulty": "Medium",
        "baseScore": 86,
        "rationale": "Comparative analysis question commonly appearing in university mid-semester and end-semester tests."
    },
    {
        "template": lambda topic, unit: f"Given a standard dataset or operational scenario, calculate the step-by-step efficiency and algorithmic outcome using {topic}.",
        "marks": [5],
        "types": ["Numerical", "Problem Solving", "Mixed"],
        "difficulty": "Hard",
        "baseScore": 90,
        "rationale": "Quantitative problem verifying students can apply algorithmic steps numerically."
    },
    # 10 Marks
    {
        "template": lambda topic, unit: f"Critically analyze {topic} within {unit}. Provide an end-to-end mathematical or procedural formulation along with a complete illustrative example.",
        "marks": [10],
        "types": ["Theory", "Problem Solving", "Mixed"],
        "difficulty": "Hard",
        "baseScore": 94,
        "rationale": "Central syllabus anchor topic; standard 10-mark essay and analytical derivation candidate."
    },
    {
        "template": lambda topic, unit: f"Design a robust system or algorithmic pipeline utilizing {topic}. Detail data structures, control flow, edge-case mitigation, and time/space complexity analysis.",
        "marks": [10],
        "types": ["Programming", "Problem Solving", "Diagram Based", "Mixed"],
        "difficulty": "Hard",
        "baseScore": 95,
        "rationale": "Synthesis problem testing design, coding logic, and complexity optimization."
    },
    {
        "template": lambda topic, unit: f"A production enterprise encounters performance degradation and scalability constraints related to {unit}. Formulate a comprehensive Case Study resolving this using {topic}.",
        "marks": [10],
        "types": ["Case Study", "Problem Solving", "Mixed"],
        "difficulty": "Hard",
        "baseScore": 92,
        "rationale": "Application-oriented scenario question testing higher-order Bloom taxonomy skills."
    },
    # 14 / 16 Marks
    {
        "template": lambda topic, unit: f"(a) Provide an exhaustive architectural exposition of {topic} with comprehensive component diagrams (8 Marks).\n(b) Step-by-step derive the governing equations/algorithms, and demonstrate on a non-trivial benchmark scenario (8 Marks).",
        "marks": [14, 16],
        "types": ["Theory", "Diagram Based", "Problem Solving", "Mixed"],
        "difficulty": "Hard",
        "baseScore": 98,
        "rationale": "Compulsory terminal examination 16-mark long question spanning theoretical formulation and applied derivation."
    },
    {
        "template": lambda topic, unit: f"Implement a full production-ready code implementation of {topic}. Discuss design patterns employed, exception handling, multithreading considerations, and benchmark against naive implementations.",
        "marks": [14, 16],
        "types": ["Programming", "Case Study", "Mixed"],
        "difficulty": "Hard",
        "baseScore": 96,
        "rationale": "Comprehensive implementation problem evaluating software craftsmanship and algorithmic soundness."
    },
    {
        "template": lambda topic, unit: f"Formulate a formal mathematical proof and step-by-step numerical execution for {topic}. Analyze boundary convergence, edge cases, and stability criteria under adverse inputs in {unit}.",
        "marks": [14, 16],
        "types": ["Numerical", "Theory", "Problem Solving", "Mixed"],
        "difficulty": "Hard",
        "baseScore": 97,
        "rationale": "Rigorous quantitative and theoretical proof question typical of university terminal honors papers."
    }
]

def generate_predicted_questions(
    syllabus: Dict[str, Any],
    selected_unit_ids: List[str],
    selected_topic_ids: List[str],
    marks: int,
    question_type: str,
    difficulty: str,
    question_count: int,
    importance_filter: str,
    university_name: Optional[str] = None
) -> Dict[str, Any]:
    units = syllabus.get("units", [])
    target_units = [u for u in units if (len(selected_unit_ids) == 0 or u.get("id") in selected_unit_ids)]

    if not target_units:
        return {
            "questions": [],
            "unsupportedNotice": "No matching syllabus units found in the selected configuration."
        }

    candidate_topics = []
    for u in target_units:
        for t in u.get("topics", []):
            if len(selected_topic_ids) == 0 or t.get("id") in selected_topic_ids:
                candidate_topics.append({
                    "topicName": t.get("name"),
                    "unitTitle": u.get("title"),
                    "unitNum": u.get("unitNumber"),
                    "baseTopicScore": t.get("importanceScore", 85)
                })

    if not candidate_topics:
        return {
            "questions": [],
            "unsupportedNotice": "The selected topics lack sufficient detailed material in the uploaded syllabus. Please select additional topics or units."
        }

    matching_templates = [t for t in TEMPLATES if marks in t["marks"]]

    if question_type != "Mixed":
        type_matched = [t for t in matching_templates if question_type in t["types"] or "Mixed" in t["types"]]
        if type_matched:
            matching_templates = type_matched

    if difficulty != "Mixed":
        diff_matched = [t for t in matching_templates if t["difficulty"] == difficulty]
        if diff_matched:
            matching_templates = diff_matched

    if not matching_templates:
        matching_templates = [
            {
                "template": lambda topic, unit: f"Explain the core concepts and real-world implications of {topic} in {unit}.",
                "marks": [marks],
                "types": ["Theory"],
                "difficulty": "Medium" if difficulty == "Mixed" else difficulty,
                "baseScore": 85,
                "rationale": "Essential curriculum learning outcome validated directly against source syllabus."
            }
        ]

    generated: List[Dict[str, Any]] = []
    seen_texts = set()

    topic_idx = 0
    template_idx = 0
    attempts = 0
    max_attempts = question_count * 12

    while len(generated) < question_count and attempts < max_attempts:
        attempts += 1
        curr_topic = candidate_topics[topic_idx % len(candidate_topics)]
        curr_tmpl = matching_templates[template_idx % len(matching_templates)]
        topic_idx += 1
        template_idx += 1

        question_text = curr_tmpl["template"](curr_topic["topicName"], curr_topic["unitTitle"])

        if question_text.lower() in seen_texts:
            continue
        seen_texts.add(question_text.lower())

        combined_score = min(
            99,
            max(45, round(curr_topic["baseTopicScore"] * 0.6 + curr_tmpl["baseScore"] * 0.4))
        )

        if combined_score >= 88:
            star_rating = 5
            predicted_importance = "Very High"
        elif combined_score >= 75:
            star_rating = 4
            predicted_importance = "High"
        elif combined_score >= 55:
            star_rating = 3
            predicted_importance = "Medium"
        else:
            star_rating = 2
            predicted_importance = "Low"

        if importance_filter != "All":
            if importance_filter == "Very High" and predicted_importance != "Very High":
                continue
            if importance_filter == "High" and predicted_importance not in ["Very High", "High"]:
                continue
            if importance_filter == "Medium" and predicted_importance == "Low":
                continue

        q_number = len(generated) + 1
        generated.append({
            "id": f"q-{int(time.time() * 1000)}-{q_number}-{random.randint(1000, 9999)}",
            "questionNumber": q_number,
            "questionText": question_text,
            "marks": marks,
            "questionType": curr_tmpl["types"][0] if question_type == "Mixed" else question_type,
            "unitTitle": curr_topic["unitTitle"],
            "topicTitle": curr_topic["topicName"],
            "difficulty": curr_tmpl["difficulty"] if difficulty == "Mixed" else difficulty,
            "predictedImportance": predicted_importance,
            "starRating": star_rating,
            "scorePercentage": combined_score,
            "sourceSyllabusRef": f"{syllabus.get('subjectName')} — Unit {curr_topic['unitNum']}: {curr_topic['unitTitle']}",
            "rationale": f"{curr_tmpl['rationale']} Derived strictly from syllabus topic \"{curr_topic['topicName']}\".",
            "suggestedAnswerOutline": [
                f"Part 1: Formal definition and context of {curr_topic['topicName']}",
                f"Part 2: Primary architectural breakdown / key governing steps",
                f"Part 3: Practical example or comparison diagram demonstrating application",
                f"Part 4: Concluding remarks on performance, trade-offs, and exam evaluation rubric"
            ]
        })

    return {"questions": generated}
