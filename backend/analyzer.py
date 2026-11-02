import re
import math
import time
from datetime import datetime
from typing import Dict, Any, List

def parse_syllabus_structure(raw_text: str, syllabus_id: str, requested_sessions: int = 6) -> Dict[str, Any]:
    lines = [l.strip() for l in raw_text.splitlines() if l.strip()]

    units: List[Dict[str, Any]] = []
    current_unit: Dict[str, Any] = None
    unit_counter = 0
    topic_counter = 0

    topics_requiring_review: List[str] = []
    uncovered_topics: List[str] = []

    unit_regex = re.compile(r"^(?:unit|module|chapter|part)\s*([0-9ivxlc]+)[:\.\-\s]+(.*)$", re.IGNORECASE)

    for line in lines:
        match = unit_regex.match(line)
        if match:
            unit_counter += 1
            unit_num = unit_counter
            unit_title = match.group(2).strip() or f"Unit {unit_num}"
            current_unit = {
                "id": f"u-{syllabus_id}-{unit_counter}",
                "unitNumber": unit_num,
                "title": unit_title,
                "description": f"Curriculum objectives covered in Unit {unit_num}.",
                "topics": []
            }
            units.append(current_unit)
        elif current_unit:
            clean_line = re.sub(r"^[\-\*\•\d+\.]+\s*", "", line).strip()
            if len(clean_line) > 3:
                parts = [p.strip() for p in re.split(r"[,;]", clean_line) if p.strip()]
                primary_topic = parts[0]
                subtopics = parts[1:] if len(parts) > 1 else None

                topic_counter += 1
                is_complex = len(clean_line) > 60 or bool(re.search(r"algorithm|architecture|design|optimization|security|derivation", clean_line, re.IGNORECASE))
                complexity = "Hard" if is_complex else ("Medium" if len(clean_line) > 30 else "Easy")
                hours = 5 if complexity == "Hard" else (4 if complexity == "Medium" else 3)

                base_score = 70
                if re.search(r"fundamental|core|architecture|algorithm|model|protocol|analysis", clean_line, re.IGNORECASE):
                    base_score += 15
                if re.search(r"introduction|history|overview", clean_line, re.IGNORECASE):
                    base_score -= 10
                if complexity == "Hard":
                    base_score += 10
                importance_score = min(98, max(50, base_score))

                current_unit["topics"].append({
                    "id": f"t-{current_unit['id']}-{len(current_unit['topics']) + 1}",
                    "name": primary_topic,
                    "subtopics": subtopics,
                    "estimatedHours": hours,
                    "complexity": complexity,
                    "importanceScore": importance_score,
                    "learningOutcomes": [f"Explain and apply {primary_topic} principles and solve related examination questions."]
                })
        else:
            if re.match(r"^(%PDF|xref|trailer|startxref|\d+\s+\d+\s+obj|<<|>>)", line, re.I) or "/FlateDecode" in line or "/Font" in line:
                continue
            if re.search(r"syllabus|course content|curriculum", line, re.I):
                continue
            if not current_unit and len(units) == 0:
                unit_counter = 1
                current_unit = {
                    "id": f"u-{syllabus_id}-1",
                    "unitNumber": 1,
                    "title": "Foundational Topics & Core Concepts",
                    "description": "Initial unit generated from curriculum outline.",
                    "topics": []
                }
                units.append(current_unit)

            clean_line = re.sub(r"^[\-\*\•\d+\.]+\s*", "", line).strip()
            is_valid_text = len(clean_line) > 3 and not clean_line.startswith(("/", "%")) and bool(re.search(r"[a-zA-Z]{3,}", clean_line))
            if is_valid_text and current_unit:
                topic_counter += 1
                current_unit["topics"].append({
                    "id": f"t-{current_unit['id']}-{len(current_unit['topics']) + 1}",
                    "name": clean_line,
                    "estimatedHours": 4,
                    "complexity": "Medium",
                    "importanceScore": 82,
                    "learningOutcomes": [f"Understand {clean_line} in context of the course curriculum."]
                })

    if len(units) == 0 or topic_counter == 0:
        default_unit = {
            "id": f"u-{syllabus_id}-1",
            "unitNumber": 1,
            "title": "Course Curriculum & Core Topics",
            "description": "Extracted topics from syllabus source document.",
            "topics": [
                {
                    "id": f"t-{syllabus_id}-{idx + 1}",
                    "name": re.sub(r"^[\-\*\•\d+\.]+\s*", "", l).strip(),
                    "estimatedHours": 4,
                    "complexity": "Medium",
                    "importanceScore": 80,
                    "learningOutcomes": ["Master core examination topics."]
                }
                for idx, l in enumerate(lines[:10]) if len(re.sub(r"^[\-\*\•\d+\.]+\s*", "", l).strip()) > 3
            ]
        }
        units.append(default_unit)
        topic_counter = len(default_unit["topics"])

    all_topics = []
    for u in units:
        for t in u["topics"]:
            all_topics.append({"topic": t, "unitTitle": u["title"]})

    total_instructional_hours = sum(st["topic"]["estimatedHours"] for st in all_topics)
    estimated_sessions_required = max(4, math.ceil(total_instructional_hours / 5.5))

    workload_warning = None
    if requested_sessions < estimated_sessions_required:
        workload_warning = (
            f"Estimated teaching requirement is {estimated_sessions_required} sessions "
            f"({total_instructional_hours} lecture hours). Delivering this curriculum across "
            f"{requested_sessions} requested sessions requires condensing compatible topics and emphasizing highest-weight concepts."
        )

    sessions: List[Dict[str, Any]] = []
    target_sessions = max(1, requested_sessions)
    total_topics_count = len(all_topics)
    topics_per_session = max(1, math.ceil(total_topics_count / target_sessions))

    for s in range(1, target_sessions + 1):
        start_idx = (s - 1) * topics_per_session
        end_idx = min(total_topics_count, s * topics_per_session)
        session_topics = all_topics[start_idx:end_idx]

        if not session_topics:
            sessions.append({
                "sessionNumber": s,
                "title": "Comprehensive Review, Mock Problem Solving & Exam Preparation",
                "unitReferences": [u["title"] for u in units[:2]],
                "topicsCovered": ["Integrated Syllabus Review", "High-Probability Examination Analysis"],
                "estimatedDurationMinutes": 60,
                "learningObjectives": ["Synthesize multi-unit relationships", "Practice high-mark exam problems under timed conditions"],
                "teachingApproach": "Interactive Socratic seminar and mock question critique",
                "suggestedPracticalActivity": "Solve 14/16-mark previous exam questions with rubric assessment",
                "quickRevisionQuestions": ["What are the three most recurring theoretical derivations in this course?"],
                "expectedLearningOutcome": "Students gain confidence connecting inter-unit concepts for terminal exams.",
                "difficulty": "Intermediate",
                "coverageStatus": "Full"
            })
            continue

        unique_units = list(dict.fromkeys(st["unitTitle"] for st in session_topics))
        topic_names = [st["topic"]["name"] for st in session_topics]
        has_hard = any(st["topic"]["complexity"] == "Hard" for st in session_topics)
        difficulty = "Advanced" if has_hard else ("Intermediate" if any(st["topic"]["complexity"] == "Medium" for st in session_topics) else "Beginner")
        is_condensed = len(session_topics) >= 3

        if is_condensed and has_hard:
            topics_requiring_review.append(f"Session {s}: Topics \"{', '.join(topic_names)}\" represent heavy instructional load.")

        primary_topic = session_topics[0]["topic"]["name"]

        objectives = []
        for st in session_topics:
            outcomes = st["topic"].get("learningOutcomes") or [f"Understand {st['topic']['name']}"]
            objectives.extend(outcomes)

        sessions.append({
            "sessionNumber": s,
            "title": f"{primary_topic} & {unique_units[0]}",
            "unitReferences": unique_units,
            "topicsCovered": topic_names,
            "estimatedDurationMinutes": 60,
            "learningObjectives": objectives[:3],
            "teachingApproach": (
                "Detailed theoretical derivation with step-by-step blackboard walkthrough and problem solving"
                if has_hard else
                "Conceptual lecture with real-world case analysis and interactive Q&A"
            ),
            "suggestedPracticalActivity": f"Implement or diagram a working exemplar demonstrating {primary_topic}",
            "quickRevisionQuestions": [
                f"Explain the fundamental principle behind {primary_topic}.",
                f"How does {topic_names[-1]} interface with overall system architecture?"
            ],
            "expectedLearningOutcome": f"Students demonstrate theoretical mastery and analytical problem-solving in {primary_topic}.",
            "difficulty": difficulty,
            "coverageStatus": "Condensed" if is_condensed else "Full"
        })

    teaching_plan = {
        "id": f"tp-{syllabus_id}-{int(time.time() * 1000)}",
        "syllabusId": syllabus_id,
        "totalUnitsCount": len(units),
        "totalTopicsCount": total_topics_count,
        "estimatedInstructionalHours": total_instructional_hours,
        "estimatedSessionsRequired": estimated_sessions_required,
        "requestedSessions": requested_sessions,
        "coveragePercentage": 100,
        "sessions": sessions,
        "topicsRequiringReview": topics_requiring_review,
        "uncoveredOrAmbiguousTopics": uncovered_topics,
        "workloadWarning": workload_warning,
        "createdAt": datetime.utcnow().isoformat() + "Z"
    }

    return {
        "units": units,
        "totalTopics": total_topics_count,
        "totalInstructionalHours": total_instructional_hours,
        "estimatedSessionsRequired": estimated_sessions_required,
        "coveragePercentage": 100,
        "topicsRequiringReview": topics_requiring_review,
        "uncoveredOrAmbiguousTopics": uncovered_topics,
        "teachingPlan": teaching_plan
    }
