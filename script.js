/* =========================================================
   PROMPT MASTER
   AI PROMPTING CHALLENGE
   ========================================================= */


/* =========================================================
   EVENT TIMING
   =========================================================

   ROUND 1 → 00:00 to 05:00
   ROUND 2 → 05:00 to 15:00
   ROUND 3 → 15:00 to 35:00

   TOTAL → 35 MINUTES
   ========================================================= */


const TOTAL_SECONDS = 35 * 60;


/* =========================================================
   VARIABLES
   ========================================================= */

let elapsed = 0;

let timerInterval = null;


/* =========================================================
   QUESTIONS
   ========================================================= */

const questions = [

    /* =====================================================
       ROUND 1
       ===================================================== */

    {
        round: "ROUND 1",

        stage: "Basic Prompting",

        type: "Basic Prompting",

        title: "Smart Energy Calculation",

        question:
            "A college computer lab wants to understand its monthly electricity consumption and cost. Create one well-structured prompt that instructs an AI to perform the complete calculation accurately.",

        data:
`The college computer lab has:

• 30 computers
• Each computer consumes an average of 120 watts
• Computers operate 8 hours per day
• Lab operates 26 days per month

Lighting:

• 10 LED lights
• Each light consumes 20 watts
• Lights operate 8 hours per day

Fans:

• 4 ceiling fans
• Each fan consumes 75 watts
• Fans operate 6 hours per day

Electricity cost:

• ₹8.50 per kWh`,

        task:
`Create ONE well-structured prompt asking the AI to:

1. Calculate the monthly electricity consumption of the computers.
2. Calculate the monthly electricity consumption of the lights.
3. Calculate the monthly electricity consumption of the fans.
4. Calculate the total monthly electricity consumption.
5. Calculate the total monthly electricity cost.
6. Present all results in a clear table.
7. State the formulas and assumptions used.

Your prompt should provide all necessary information clearly and should instruct the AI to show the calculations.`
    },


    /* =====================================================
       ROUND 2
       ===================================================== */

    {
        round: "ROUND 2",

        stage: "Analyze & Extract",

        type: "Analyze & Extract",

        title: "Student Performance Investigation",

        question:
            "A college wants to analyze the academic performance and attendance of six students. Create one advanced prompt that instructs an AI to analyze the supplied data and produce meaningful conclusions.",

        data:
`Student Performance Data:

Arun:
Programming: 86
Mathematics: 72
Cybersecurity: 91
Attendance: 88%

Bala:
Programming: 94
Mathematics: 81
Cybersecurity: 76
Attendance: 92%

Charan:
Programming: 78
Mathematics: 95
Cybersecurity: 89
Attendance: 84%

Divya:
Programming: 91
Mathematics: 88
Cybersecurity: 94
Attendance: 96%

Ezhil:
Programming: 83
Mathematics: 79
Cybersecurity: 82
Attendance: 90%

Fathima:
Programming: 97
Mathematics: 68
Cybersecurity: 93
Attendance: 86%`,

        task:
`Create ONE prompt that asks the AI to:

1. Calculate every student's average academic score using Programming, Mathematics and Cybersecurity.
2. Identify the top 3 students based on average academic score.
3. Identify the student with the highest attendance.
4. Identify all students whose attendance is below 90%.
5. Identify the student with the highest Cybersecurity score.
6. Determine whether the student with the highest academic average also has the highest attendance.
7. Rank every student from highest to lowest average score.
8. Present the results in a structured table.
9. Explain the major conclusions in no more than 100 words.
10. Use ONLY the supplied information and do not invent or assume missing information.`
    },


    /* =====================================================
       ROUND 3
       ===================================================== */

    {
        round: "ROUND 3",

        stage: "Real-World Problem Solving",

        type: "Real-World Problem Solving",

        title: "India's Cyber Fraud Challenge",

        question:
            "India is facing increasing digital fraud affecting ordinary citizens. Your task is to design a practical nationwide solution using AI and modern technology. Create one advanced prompt that instructs an AI to develop this solution.",

        data:
`India is facing increasing digital fraud involving:

• Phishing attacks
• Fake websites
• OTP scams
• UPI fraud
• Fake customer-care numbers
• Social engineering
• AI-generated scam messages
• Impersonation scams

The solution should be practical for ordinary citizens and should work at a nationwide scale across different communities.`,

        task:
`Create ONE advanced prompt instructing the AI to:

1. Analyze the major causes of digital fraud in India.
2. Identify at least four vulnerable groups and explain why each group is vulnerable.
3. Design a nationwide cybersecurity-awareness and fraud-prevention system.
4. Explain how AI and Machine Learning can be used.
5. Explain the role of mobile applications.
6. Explain automated fraud alerts.
7. Explain browser protection mechanisms.
8. Explain fraud detection systems.
9. Explain implementation across schools, colleges, banks and government institutions.
10. Include both rural and urban communities.
11. Design a low-cost approach that can operate at national scale.
12. Define measurable KPIs including:
    • Fraud reduction
    • Number of people trained
    • Fraud response time
    • Awareness improvement
    • Fraud detection rate
13. Identify privacy risks.
14. Identify implementation challenges.
15. Explain possible misuse of the proposed technology.
16. Create a three-phase implementation plan:
    • Phase 1: 0–6 months
    • Phase 2: 6–18 months
    • Phase 3: 18–36 months
17. End with the three most important actions that should be taken immediately.

The AI should provide practical, realistic and scalable recommendations rather than only general awareness advice.`
    }

];


/* =========================================================
   HELPER FUNCTION
   ========================================================= */

function get(id) {
    return document.getElementById(id);
}


/* =========================================================
   FORMAT TIMER
   ========================================================= */

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}


/* =========================================================
   START CHALLENGE
   ========================================================= */

function startChallenge() {

    /* Reset elapsed time */
    elapsed = 0;


    /* Clear previous timer if any */
    clearInterval(timerInterval);


    /* Set timer to 35 minutes */
    get("timer").textContent = formatTime(TOTAL_SECONDS);


    /* Hide start screen */
    get("setupScreen").classList.add("hidden");


    /* Show challenge screen */
    get("challengeScreen").classList.remove("hidden");


    /* Hide finished screen */
    get("finishedScreen").classList.add("hidden");


    /* Show Round 1 */
    showQuestion(0);


    /* Start countdown */
    timerInterval = setInterval(updateTimer, 1000);

}


/* =========================================================
   UPDATE TIMER
   ========================================================= */

function updateTimer() {

    elapsed++;


    const remaining = TOTAL_SECONDS - elapsed;


    /* =========================
       EVENT FINISHED
       ========================= */

    if (remaining <= 0) {

        get("timer").textContent = "00:00";

        finishChallenge();

        return;
    }


    /* =========================
       UPDATE TIMER DISPLAY
       ========================= */

    get("timer").textContent = formatTime(remaining);


    /* =========================
       ROUND 2
       =========================

       Starts after 5 minutes.
    */

    if (elapsed === 5 * 60) {

        showQuestion(1);

    }


    /* =========================
       ROUND 3
       =========================

       Starts after 15 minutes.
    */

    if (elapsed === 15 * 60) {

        showQuestion(2);

    }

}


/* =========================================================
   SHOW QUESTION
   ========================================================= */

function showQuestion(index) {

    const question = questions[index];


    if (!question) {
        return;
    }


    /* =========================
       ROUND INFORMATION
       ========================= */

    get("roundLabel").textContent =
        question.round;


    get("stageText").textContent =
        question.stage;


    /* =========================
       BADGES
       ========================= */

    get("roundBadge").textContent =
        question.round;


    get("roundType").textContent =
        question.type;


    /* =========================
       QUESTION NUMBER
       ========================= */

    get("questionNumber").textContent =
        index + 1;


    /* =========================
       TITLE
       ========================= */

    get("questionTitle").textContent =
        question.title;


    /* =========================
       QUESTION
       ========================= */

    get("questionText").textContent =
        question.question;


    /* =========================
       DATA
       ========================= */

    get("dataText").textContent =
        question.data;


    /* =========================
       TASK
       ========================= */

    get("taskText").textContent =
        question.task;

}


/* =========================================================
   FINISH CHALLENGE
   ========================================================= */

function finishChallenge() {

    /* Stop timer */
    clearInterval(timerInterval);

    timerInterval = null;


    /* Set timer to zero */
    get("timer").textContent = "00:00";


    /* Hide challenge */
    get("challengeScreen").classList.add("hidden");


    /* Show completed screen */
    get("finishedScreen").classList.remove("hidden");

}


/* =========================================================
   START BUTTON
   ========================================================= */

get("startBtn").addEventListener(
    "click",
    startChallenge
);
