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
        "A college lab has 20 computers. Each uses 100 watts and runs 8 hours a day for 25 days. Electricity costs ₹8 per kWh.",

    data:
`Given:

• 20 computers
• 100 watts per computer
• 8 hours per day
• 25 days per month
• Electricity cost: ₹8 per kWh`,

    task:
`Create ONE prompt asking AI to:

1. Calculate monthly electricity consumption.
2. Calculate monthly electricity cost.
3. Show the calculation clearly.
4. Present the final answer in a simple table.`
},


    /* =====================================================
       ROUND 2
       ===================================================== */

    {
    round: "ROUND 2",

    stage: "Analyze & Extract",

    type: "Analyze & Extract",

    title: "Student Performance Analysis",

    question:
        "Analyze the following student data and create ONE prompt that instructs AI to find patterns, rankings, and important information.",

    data:
`Arun: Programming 86, Mathematics 72, Cybersecurity 91, Attendance 88%
Bala: Programming 94, Mathematics 81, Cybersecurity 76, Attendance 92%
Charan: Programming 78, Mathematics 95, Cybersecurity 89, Attendance 84%
Divya: Programming 91, Mathematics 88, Cybersecurity 94, Attendance 96%
Ezhil: Programming 83, Mathematics 79, Cybersecurity 82, Attendance 90%
Fathima: Programming 97, Mathematics 68, Cybersecurity 93, Attendance 86%`,

    task:
`Create ONE prompt asking AI to:

1. Calculate each student's average score. 2. Find the top 3 students
3. Find the highest attendance. 4. Find students below 90% attendance.
5. Find the highest Cybersecurity score. 6. Rank all students by average score.
7. Show the results in a table. 8. Give conclusions in under 100 words.
9. Use ONLY the given information.`
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
        "India is facing increasing online fraud through UPI scams, phishing, fake websites, OTP fraud, fake customer-care numbers and AI-generated scam messages. Design a practical nationwide solution to protect ordinary citizens.",

    data:
`The solution should work across rural and urban India and consider citizens with different levels of digital awareness. It should use modern technology such as AI, mobile apps, automated alerts and fraud detection while remaining affordable and scalable.`,

    task:
`Create ONE advanced prompt that asks AI to design the solution, identify vulnerable groups, explain the role of technology, suggest implementation through banks, schools, colleges and government institutions, define measurable results, discuss privacy and implementation challenges, and provide a realistic 3-phase plan for 0–6 months, 6–18 months and 18–36 months. End with the 3 most important actions that should be taken immediately.`
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
