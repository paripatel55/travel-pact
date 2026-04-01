const questions = [
  { id: "pace1", variable: "pace", prompt: "I prefer a packed day with multiple activities." },
  { id: "pace2", variable: "pace", prompt: "I am comfortable waking up early most travel days." },
  { id: "pace3", variable: "pace", prompt: "I would rather explore than relax at the hotel/beach." },
  { id: "budget1", variable: "budget", prompt: "I am okay spending extra for convenience." },
  { id: "budget2", variable: "budget", prompt: "I can adapt my budget if the group wants pricier activities." },
  { id: "budget3", variable: "budget", prompt: "I care more about the experience than sticking to strict spending limits." },
  { id: "social1", variable: "social", prompt: "I want to spend most of the trip together as a group." },
  { id: "social2", variable: "social", prompt: "I am comfortable deciding plans collaboratively every day." },
  { id: "social3", variable: "social", prompt: "I get stressed if group members split up often." }
];

const teammateProfiles = [
  {
    id: "explorer",
    name: "Maya (Explorer)",
    description: "High-energy traveler who wants full itineraries.",
    pace: 5,
    budget: 4,
    social: 3,
    mustHaves: ["adventure day", "sunrise viewpoint"],
    hardNos: ["all-day beach"],
    flexAreas: ["dinner spots"]
  },
  {
    id: "chill",
    name: "Jordan (Chill Planner)",
    description: "Wants relaxed pacing and clear cost boundaries.",
    pace: 2,
    budget: 2,
    social: 4,
    mustHaves: ["beach downtime", "budget meals"],
    hardNos: ["packed schedules", "late-night bars"],
    flexAreas: ["museum stop"]
  },
  {
    id: "social",
    name: "Alex (Social Connector)",
    description: "Optimizes for shared group experiences and vibes.",
    pace: 3,
    budget: 3,
    social: 5,
    mustHaves: ["group dinner", "night market"],
    hardNos: ["splitting all day"],
    flexAreas: ["activity order"]
  }
];

const state = {
  destination: "",
  days: 4,
  groupSize: 3,
  answers: {},
  selectedTeammates: [],
  customTeammates: [],
  selfScores: { pace: 3, budget: 3, social: 3 },
  userPrefs: { mustHaves: [], hardNos: [], flexAreas: [] }
};
let customTeammateCounter = 1;

const variableLabels = {
  pace: "Trip Pace",
  budget: "Budget Flexibility",
  social: "Social Style"
};

const stepIds = ["step-1", "step-2", "step-3", "step-4"];

function showStep(targetId) {
  stepIds.forEach((id) => {
    const element = document.getElementById(id);
    element.classList.toggle("active", id === targetId);
  });
}

function renderQuestions() {
  const form = document.getElementById("question-form");
  form.innerHTML = "";

  questions.forEach((q, index) => {
    const block = document.createElement("div");
    block.className = "question-item";
    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${q.prompt}`;
    block.appendChild(prompt);

    const scale = document.createElement("div");
    scale.className = "scale";
    for (let i = 1; i <= 5; i += 1) {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="${q.id}" value="${i}" ${i === 3 ? "checked" : ""}>${i}`;
      scale.appendChild(label);
    }
    block.appendChild(scale);
    form.appendChild(block);
  });
}

function renderTeammates() {
  const list = document.getElementById("teammate-list");
  const previouslyChecked = Array.from(
    document.querySelectorAll('#teammate-list input[type="checkbox"]:checked')
  ).map((item) => item.value);
  list.innerHTML = "";

  const allProfiles = [...teammateProfiles, ...state.customTeammates];
  allProfiles.forEach((profile) => {
    const card = document.createElement("div");
    card.className = "teammate-card";
    card.innerHTML = `
      <label>
        <input type="checkbox" value="${profile.id}" ${previouslyChecked.includes(profile.id) ? "checked" : ""}>
        <h3>${profile.name}</h3>
      </label>
      <p>${profile.description}</p>
      <p class="meta">Pace ${profile.pace}/5 • Budget ${profile.budget}/5 • Social ${profile.social}/5</p>
      <p class="meta"><strong>Must:</strong> ${(profile.mustHaves || []).join(", ") || "None"}<br><strong>Hard no:</strong> ${(profile.hardNos || []).join(", ") || "None"}<br><strong>Flex:</strong> ${(profile.flexAreas || []).join(", ") || "None"}</p>
    `;
    list.appendChild(card);
  });
}

function collectAnswers() {
  const answers = {};
  questions.forEach((q) => {
    const chosen = document.querySelector(`input[name="${q.id}"]:checked`);
    answers[q.id] = Number(chosen?.value || 3);
  });
  return answers;
}

function computeVariableScores(answers) {
  const sums = { pace: 0, budget: 0, social: 0 };
  const counts = { pace: 0, budget: 0, social: 0 };

  questions.forEach((q) => {
    sums[q.variable] += answers[q.id];
    counts[q.variable] += 1;
  });

  return {
    pace: Number((sums.pace / counts.pace).toFixed(2)),
    budget: Number((sums.budget / counts.budget).toFixed(2)),
    social: Number((sums.social / counts.social).toFixed(2))
  };
}

function renderSelfScoreBlocks(scores) {
  const content = `
    <h3>Your Current Scores</h3>
    <p class="meta">Use these as your reference if a teammate wants to manually enter their profile.</p>
    <p><strong>Pace:</strong> ${scores.pace} / 5 &nbsp;|&nbsp; <strong>Budget:</strong> ${scores.budget} / 5 &nbsp;|&nbsp; <strong>Social:</strong> ${scores.social} / 5</p>
  `;

  const preview = document.getElementById("self-score-preview");
  const stepThreePreview = document.getElementById("step-3-self-score");
  preview.innerHTML = content;
  stepThreePreview.innerHTML = content;
}

function updateSelfScoresFromForm() {
  state.answers = collectAnswers();
  state.selfScores = computeVariableScores(state.answers);
  renderSelfScoreBlocks(state.selfScores);
}

function getSelectedTeammates() {
  const checked = Array.from(document.querySelectorAll('#teammate-list input[type="checkbox"]:checked'));
  const allProfiles = [...teammateProfiles, ...state.customTeammates];
  return checked.map((item) => allProfiles.find((p) => p.id === item.value)).filter(Boolean);
}

function parseListInput(value) {
  if (!value.trim()) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function normalizeItem(item) {
  return item.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function collectUserPrefs() {
  state.userPrefs = {
    mustHaves: parseListInput(document.getElementById("user-must").value),
    hardNos: parseListInput(document.getElementById("user-hard").value),
    flexAreas: parseListInput(document.getElementById("user-flex").value)
  };
}

function addCustomTeammate() {
  const name = document.getElementById("new-name").value.trim();
  const pace = Number(document.getElementById("new-pace").value);
  const budget = Number(document.getElementById("new-budget").value);
  const social = Number(document.getElementById("new-social").value);
  const mustHaves = parseListInput(document.getElementById("new-must").value);
  const hardNos = parseListInput(document.getElementById("new-hard").value);
  const flexAreas = parseListInput(document.getElementById("new-flex").value);

  if (!name) {
    alert("Please add a teammate name.");
    return;
  }

  if (
    Number.isNaN(pace) || Number.isNaN(budget) || Number.isNaN(social) ||
    pace < 1 || pace > 5 || budget < 1 || budget > 5 || social < 1 || social > 5
  ) {
    alert("Pace, budget, and social scores must be between 1 and 5.");
    return;
  }

  state.customTeammates.push({
    id: `custom-${customTeammateCounter}`,
    name: `${name} (Added)`,
    description: "Custom teammate profile",
    pace,
    budget,
    social,
    mustHaves,
    hardNos,
    flexAreas
  });
  customTeammateCounter += 1;

  document.getElementById("new-name").value = "";
  document.getElementById("new-pace").value = "3";
  document.getElementById("new-budget").value = "3";
  document.getElementById("new-social").value = "3";
  document.getElementById("new-must").value = "";
  document.getElementById("new-hard").value = "";
  document.getElementById("new-flex").value = "";
  renderTeammates();
}

function levelFromGap(gap) {
  if (gap <= 0.8) return { label: "Aligned", className: "tag tag-ok" };
  if (gap <= 1.6) return { label: "Watch", className: "tag tag-warn" };
  return { label: "Friction Risk", className: "tag tag-risk" };
}

function buildResults() {
  const selfScores = state.selfScores;
  const people = [
    { name: "You", ...selfScores, ...state.userPrefs },
    ...state.selectedTeammates
  ];

  const groups = ["pace", "budget", "social"].map((key) => {
    const values = people.map((p) => p[key]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const gap = Number((max - min).toFixed(2));
    const avg = Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2));
    return { key, avg, min, max, gap, level: levelFromGap(gap) };
  });

  renderResultHeader(groups);
  renderAlignmentTable(people, groups);
  renderTensionPoints(groups, people);
  renderTripPact(groups, selfScores, people);
}

function renderResultHeader(groups) {
  const destination = state.destination || "your destination";
  const header = document.getElementById("result-header");
  const riskCount = groups.filter((g) => g.level.label === "Friction Risk").length;
  const watchCount = groups.filter((g) => g.level.label === "Watch").length;

  header.innerHTML = `
    <h3>Trip Room: ${destination} (${state.days} days)</h3>
    <p><strong>Group Snapshot:</strong> ${state.selectedTeammates.length + 1} travelers compared.</p>
    <p><strong>Friction signals:</strong> ${riskCount} high-risk, ${watchCount} medium-risk variable(s).</p>
  `;
}

function renderAlignmentTable(people, groups) {
  const tableRoot = document.getElementById("alignment-table");
  const budgetGroup = groups.find((g) => g.key === "budget");
  const rows = groups
    .map(
      (g) => `
      <tr>
        <td>${variableLabels[g.key]}</td>
        <td>${g.avg}</td>
        <td>${g.min}</td>
        <td>${g.max}</td>
        <td>${g.gap}</td>
        <td><span class="${g.level.className}">${g.level.label}</span></td>
      </tr>
    `
    )
    .join("");

  const peopleInfo = people
    .map((p) => `${p.name}: pace ${p.pace}, budget ${p.budget}, social ${p.social}`)
    .join(" | ");

  tableRoot.innerHTML = `
    <div class="result-block">
      <h3>How to Read These Scores</h3>
      <ul>
        <li>Each score is on a <strong>1-5 scale</strong>. For budget, <strong>1</strong> means very cost-strict and <strong>5</strong> means very flexible with spending.</li>
        <li>Decimals (like <strong>3.67</strong>) are averages from three question ratings, not currency amounts.</li>
        <li><strong>Min</strong> is the lowest person score in the group. <strong>Max</strong> is the highest.</li>
        <li><strong>Gap = Max - Min</strong>. Bigger gap means bigger preference differences and higher friction risk.</li>
        <li>Example: Budget Avg ${budgetGroup.avg}, Min ${budgetGroup.min}, Max ${budgetGroup.max}, so Gap is ${budgetGroup.gap}.</li>
      </ul>
    </div>
    <p><strong>Profiles:</strong> ${peopleInfo}</p>
    <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Group Average</th>
          <th>Min</th>
          <th>Max</th>
          <th>Gap (Max-Min)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function getPreferenceClashes(people) {
  const clashes = [];

  for (let i = 0; i < people.length; i += 1) {
    for (let j = 0; j < people.length; j += 1) {
      if (i === j) continue;
      const a = people[i];
      const b = people[j];
      const bHardNos = new Set((b.hardNos || []).map(normalizeItem));
      (a.mustHaves || []).forEach((must) => {
        if (bHardNos.has(normalizeItem(must))) {
          clashes.push(`${a.name} must-have "${must}" conflicts with ${b.name} hard no.`);
        }
      });
    }
  }

  return clashes;
}

function renderTensionPoints(groups, people) {
  const tension = document.getElementById("tension-points");
  const risks = groups.filter((g) => g.level.label === "Friction Risk");
  const watches = groups.filter((g) => g.level.label === "Watch");
  const clashes = getPreferenceClashes(people);

  let items = [];
  risks.forEach((r) => {
    if (r.key === "pace") items.push("Pace mismatch may create stress around early starts, packed schedules, and fatigue.");
    if (r.key === "budget") items.push("Budget mismatch may trigger awkward spending pressure and FOMO decisions.");
    if (r.key === "social") items.push("Social-style mismatch may create tension around together-time versus autonomy.");
  });
  watches.forEach((w) => {
    if (w.key === "pace") items.push("Set one high-energy day and one recovery day to avoid pace fatigue.");
    if (w.key === "budget") items.push("Pre-label activities as low, medium, and premium before booking.");
    if (w.key === "social") items.push("Agree on optional solo blocks so splitting up does not feel personal.");
  });

  if (items.length === 0) {
    items = ["No major tension signals detected. This group appears strongly aligned on key variables."];
  }

  if (clashes.length > 0) {
    items.push(`Direct preference conflicts detected: ${clashes.length}.`);
    clashes.slice(0, 4).forEach((clash) => items.push(clash));
  } else {
    items.push("No direct must-have vs hard no conflicts were detected.");
  }

  tension.innerHTML = `
    <h3>Tension Forecast</h3>
    <ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>
  `;
}

function renderTripPact(groups, selfScores, people) {
  const pact = document.getElementById("trip-pact");

  const pace = groups.find((g) => g.key === "pace");
  const budget = groups.find((g) => g.key === "budget");
  const social = groups.find((g) => g.key === "social");

  const rules = [
    pace.gap > 1.6
      ? "Adopt a split schedule: 1 anchor activity/day, remainder optional."
      : "Plan daily activities together with one buffer block for spontaneity.",
    budget.gap > 1.6
      ? "Define daily spend ranges (essential vs optional) before each day starts."
      : "Keep one shared budget tracker and confirm costs before paid activities.",
    social.gap > 1.6
      ? "Normalize solo time windows and regroup at fixed check-in points."
      : "Set one daily check-in to keep everyone aligned."
  ];

  const allMustHaves = people.flatMap((p) => p.mustHaves || []).map(normalizeItem);
  const mustHaveCounts = {};
  allMustHaves.forEach((item) => {
    if (!item) return;
    mustHaveCounts[item] = (mustHaveCounts[item] || 0) + 1;
  });
  const sharedMustHaves = Object.entries(mustHaveCounts)
    .filter(([, count]) => count >= 2)
    .map(([item]) => item)
    .slice(0, 3);

  const protectedHardNos = [...new Set(people.flatMap((p) => p.hardNos || []).map(normalizeItem))]
    .filter(Boolean)
    .slice(0, 4);
  const flexPool = [...new Set(people.flatMap((p) => p.flexAreas || []).map(normalizeItem))]
    .filter(Boolean)
    .slice(0, 4);

  pact.innerHTML = `
    <h3>Your Trip Alignment Pact</h3>
    <ul>
      <li><strong>Destination:</strong> ${state.destination}</li>
      <li><strong>Your baseline profile:</strong> pace ${selfScores.pace}, budget ${selfScores.budget}, social ${selfScores.social}</li>
      <li><strong>Shared must-haves:</strong> ${sharedMustHaves.length ? sharedMustHaves.join(", ") : "No overlap yet - discuss top priorities together."}</li>
      <li><strong>Protected hard no's:</strong> ${protectedHardNos.length ? protectedHardNos.join(", ") : "None listed yet."}</li>
      <li><strong>Flex zones:</strong> ${flexPool.length ? flexPool.join(", ") : "None listed yet."}</li>
      ${rules.map((r) => `<li>${r}</li>`).join("")}
      <li><strong>Fallback rule:</strong> If disagreement lasts over 10 minutes, default to the pre-tagged low-cost, low-effort option.</li>
    </ul>
  `;
}

function resetFlow() {
  state.destination = "";
  state.days = 4;
  state.groupSize = 3;
  state.answers = {};
  state.selectedTeammates = [];
  state.customTeammates = [];
  state.selfScores = { pace: 3, budget: 3, social: 3 };
  state.userPrefs = { mustHaves: [], hardNos: [], flexAreas: [] };
  customTeammateCounter = 1;

  document.getElementById("destination").value = "";
  document.getElementById("days").value = "4";
  document.getElementById("group-size").value = "3";
  document.querySelectorAll('#teammate-list input[type="checkbox"]').forEach((i) => {
    i.checked = false;
  });
  document.getElementById("new-name").value = "";
  document.getElementById("new-pace").value = "3";
  document.getElementById("new-budget").value = "3";
  document.getElementById("new-social").value = "3";
  document.getElementById("new-must").value = "";
  document.getElementById("new-hard").value = "";
  document.getElementById("new-flex").value = "";
  document.getElementById("user-must").value = "";
  document.getElementById("user-hard").value = "";
  document.getElementById("user-flex").value = "";
  renderQuestions();
  renderTeammates();
  renderSelfScoreBlocks(state.selfScores);
  showStep("step-1");
}

function init() {
  renderQuestions();
  renderTeammates();
  renderSelfScoreBlocks(state.selfScores);

  document.getElementById("question-form").addEventListener("change", updateSelfScoresFromForm);

  document.getElementById("to-step-2").addEventListener("click", () => {
    const destination = document.getElementById("destination").value.trim();
    const days = Number(document.getElementById("days").value);
    const groupSize = Number(document.getElementById("group-size").value);

    if (!destination) {
      alert("Please add a destination to continue.");
      return;
    }

    state.destination = destination;
    state.days = days || 4;
    state.groupSize = groupSize || 3;
    showStep("step-2");
  });

  document.getElementById("back-to-1").addEventListener("click", () => showStep("step-1"));
  document.getElementById("back-to-2").addEventListener("click", () => showStep("step-2"));
  document.getElementById("back-to-3").addEventListener("click", () => showStep("step-3"));

  document.getElementById("to-step-3").addEventListener("click", () => {
    updateSelfScoresFromForm();
    collectUserPrefs();
    showStep("step-3");
  });

  document.getElementById("add-teammate").addEventListener("click", addCustomTeammate);

  document.getElementById("generate-results").addEventListener("click", () => {
    const selected = getSelectedTeammates();
    if (selected.length === 0 || selected.length > 4) {
      alert("Select between 1 and 4 teammate profiles to continue.");
      return;
    }
    state.selectedTeammates = selected;
    buildResults();
    showStep("step-4");
  });

  document.getElementById("restart").addEventListener("click", resetFlow);
}

init();
