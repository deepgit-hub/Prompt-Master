/* =================================================
   EVENT CONFIGURATION
================================================= */

const TOTAL_SECONDS = 15 * 60;


/*
    ROUND TIMINGS

    ROUND 1 → 00:00
    ROUND 2 → 02:00
    ROUND 3 → 05:00
    END     → 15:00
*/


/* =================================================
   QUESTIONS
================================================= */

const questions = [

    /* =================================================
       ROUND 1
    ================================================= */

    {
        round: "ROUND 1",

        type: "Basic Prompting",

        title: "Smart Energy Calculation",

        text:
            "A college computer lab contains 30 computers. Each computer consumes an average of 120 watts while operating. The lab operates for 8 hours per day and 26 days per month. Additionally, 10 LED lights consume 20 watts each and operate for 8 hours per day. Four ceiling fans consume 75 watts each and operate for 6 hours per day. Electricity costs ₹8.50 per kWh.",

        task:
            "Create ONE well-structured prompt that asks an AI to: (1) calculate the monthly electricity consumption of the computers, (2) calculate the monthly consumption of the lights, (3) calculate the monthly consumption of the fans, (4) calculate total monthly electricity consumption, (5) calculate total monthly electricity cost, (6) present all results in a clear table, and (7) clearly state the formulas and assumptions used."

    },


    /* =================================================
       ROUND 2
    ================================================= */

    {

        round: "ROUND 2",

        type: "Analyze & Extract",

        title: "Student Performance Investigation",

        text:
            "Analyze the following student performance report and construct a prompt that instructs AI to perform multiple calculations and comparisons.",

        data:
            "STUDENT PERFORMANCE REPORT\n\n" +

            "Arun:\n" +
            "Programming: 86\n" +
            "Mathematics: 72\n" +
            "Cybersecurity: 91\n" +
            "Attendance: 88%\n\n" +

            "Bala:\n" +
            "Programming: 94\n" +
            "Mathematics: 81\n" +
            "Cybersecurity: 76\n" +
            "Attendance: 92%\n\n" +

            "Charan:\n" +
            "Programming: 78\n" +
            "Mathematics: 95\n" +
            "Cybersecurity: 89\n" +
            "Attendance: 84%\n\n" +

            "Divya:\n" +
            "Programming: 91\n" +
            "Mathematics: 88\n" +
            "Cybersecurity: 94\n" +
            "Attendance: 96%\n\n" +

            "Ezhil:\n" +
            "Programming: 83\n" +
            "Mathematics: 79\n" +
            "Cybersecurity: 82\n" +
            "Attendance: 90%\n\n" +

            "Fathima:\n" +
            "Programming: 97\n" +
            "Mathematics: 68\n" +
            "Cybersecurity: 93\n" +
            "Attendance: 86%",

        task:
            "Create ONE prompt that instructs AI to: (1) calculate every student's average academic score, (2) identify the top 3 students based on average score, (3) identify the student with the highest attendance, (4) identify students whose attendance is below 90%, (5) identify the student with the highest Cybersecurity score, (6) determine whether the student with the highest academic average also has the highest attendance, (7) rank every student from highest to lowest average, (8) present the results in a structured table, and (9) explain the conclusions in no more than 100 words. The prompt must instruct AI to use ONLY the supplied information and not invent missing information."

    },


    /* =================================================
       ROUND 3
    ================================================= */

    {

        round: "ROUND 3",

        type: "Real-World Problem Solving",

        title: "India's Cyber Fraud Challenge",

        text:
            "India is facing an increasing number of digital fraud incidents involving phishing, fake websites, OTP scams, UPI fraud, fake customer-care numbers, social engineering, AI-generated messages and impersonation scams. You have been asked to design a practical nationwide solution to reduce cyber fraud among ordinary citizens.",

        task:
            "Create ONE advanced prompt that instructs an AI to design a practical nationwide cybersecurity-awareness and prevention solution. The AI should analyze the major causes of cyber fraud; identify at least four vulnerable groups and explain their vulnerabilities; design an awareness and prevention system; explain how AI, machine learning, mobile applications, automated alerts, browser protection and fraud detection could help; explain implementation across schools, colleges, banks, government institutions, rural communities and urban communities; propose a low-cost approach suitable for national scale; define measurable KPIs such as fraud reduction, number of people trained, response time, awareness levels and detection rate; identify privacy risks, implementation challenges and possible misuse; create a three-phase implementation plan covering 0–6 months, 6–18 months and 18–36 months; and finally provide the three most important actions that should be implemented first."

    }

];



/* =================================================
   VARIABLES
================================================= */

let elapsed = 0;

let timerInterval = null;



/* =================================================
   ELEMENT HELPER
================================================= */

function get(id) {

    return document.getElementById(id);

}



/* =================================================
   FORMAT TIME
================================================= */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");


    const remainingSeconds =
        (seconds % 60)
        .toString()
        .padStart(2, "0");


    return minutes + ":" +
           remainingSeconds;

}



/* =================================================
   START CHALLENGE
================================================= */

function startChallenge() {


    /* Hide setup screen */

    get("setupScreen")
        .classList
        .remove("active");


    /* Show challenge screen */

    get("challengeScreen")
        .classList
        .add("active");


    /* Hide finished screen */

    get("finishedScreen")
        .classList
        .remove("active");


    /* Reset timer */

    elapsed = 0;


    /* Set timer to 15 minutes */

    get("timer")
        .textContent =
        formatTime(TOTAL_SECONDS);


    /*
        ROUND 1 APPEARS IMMEDIATELY
    */

    showQuestion(0);


    /* Stop previous timer if any */

    clearInterval(timerInterval);


    /* Start timer */

    timerInterval =
        setInterval(
            updateTimer,
            1000
        );

}



/* =================================================
   UPDATE TIMER
================================================= */

function updateTimer() {


    /* Increase elapsed seconds */

    elapsed++;


    /* Calculate remaining time */

    const remaining =
        TOTAL_SECONDS - elapsed;


    /* Update timer */

    get("timer")
        .textContent =
        formatTime(
            Math.max(
                remaining,
                0
            )
        );


    /*
        ======================================
        2 MINUTES

        ROUND 2
        ======================================
    */

    if (elapsed === 120) {

        showQuestion(1);

    }


    /*
        ======================================
        5 MINUTES

        ROUND 3
        ======================================
    */

    if (elapsed === 300) {

        showQuestion(2);

    }


    /*
        ======================================
        15 MINUTES

        EVENT ENDS
        ======================================
    */

    if (elapsed >= TOTAL_SECONDS) {

        finishChallenge();

    }

}



/* =================================================
   SHOW QUESTION
================================================= */

function showQuestion(index) {


    const question =
        questions[index];


    /* Round label */

    get("roundLabel")
        .textContent =
        question.round;


    /* Stage text */

    get("stageText")
        .textContent =
        question.type;


    /* Round badge */

    get("roundBadge")
        .textContent =
        question.round;


    /* Round type */

    get("roundType")
        .textContent =
        question.type;


    /* Question title */

    get("questionTitle")
        .textContent =
        question.title;


    /* Question */

    get("questionText")
        .textContent =
        question.text;


    /* Task */

    get("taskText")
        .textContent =
        question.task;


    /*
        ======================================
        DATA BOX

        Only Round 2 has additional data
        ======================================
    */

    if (question.data) {

        get("dataBox")
            .textContent =
            question.data;


        get("dataBox")
            .classList
            .remove("hidden");

    }

    else {

        get("dataBox")
            .textContent =
            "";


        get("dataBox")
            .classList
            .add("hidden");

    }

}



/* =================================================
   FINISH CHALLENGE
================================================= */

function finishChallenge() {


    /* Stop timer */

    clearInterval(timerInterval);

    timerInterval = null;


    /* Set timer to zero */

    get("timer")
        .textContent =
        "00:00";


    /* Hide challenge */

    get("challengeScreen")
        .classList
        .remove("active");


    /* Show final screen */

    get("finishedScreen")
        .classList
        .add("active");

}



/* =================================================
   START BUTTON EVENT
================================================= */

get("startBtn")
    .addEventListener(
        "click",
        startChallenge
    );
