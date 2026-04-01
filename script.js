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
    social: 3
  },
  {
    id: "chill",
    name: "Jordan (Chill Planner)",
    description: "Wants relaxed pacing and clear cost boundaries.",
    pace: 2,
    budget: 2,
    social: 4
  },
  {
    id: "social",
    name: "Alex (Social Connector)",
    description: "Optimizes for shared group experiences and vibes.",
    pace: 3,
    budget: 3,
    social: 5
  }
];

const state = {
  destination: "",
  days: 4,
  groupSize: 3,
  answers: {},
  selectedTeammates: []
};

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
  list.innerHTML = "";

  teammateProfiles.forEach((profile) => {
    const card = document.createElement("div");
    card.className = "teammate-card";
    card.innerHTML = `
      <label>
        <input type="checkbox" value="${profile.id}">
        <h3>${profile.name}</h3>
      </label>
      <p>${profile.description}</p>
      <p class="meta">Pace ${profile.pace}/5 • Budget ${profile.budget}/5 • Social ${profile.social}/5</p>
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

function getSelectedTeammates() {
  const checked = Array.from(document.querySelectorAll('#teammate-list input[type="checkbox"]:checked'));
  return checked.map((item) => teammateProfiles.find((p) => p.id === item.value)).filter(Boolean);
}

function levelFromGap(gap) {
  if (gap <= 0.8) return { label: "Aligned", className: "tag tag-ok" };
  if (gap <= 1.6) return { label: "Watch", className: "tag tag-warn" };
  return { label: "Friction Risk", className: "tag tag-risk" };
}

function buildResults() {
  const selfScores = computeVariableScores(state.answers);
  const people = [{ name: "You", ...selfScores }, ...state.selectedTeammates];

  const groups = ["pace", "budget", "social"].map((key) => {
    const values = people.map((p) => p[key]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const gap = Number((max - min).toFixed(2));
    const avg = Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2));
    return { key, avg, gap, level: levelFromGap(gap) };
  });

  renderResultHeader(groups);
  renderAlignmentTable(people, groups);
  renderTensionPoints(groups);
  renderTripPact(groups, selfScores);
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
  const rows = groups
    .map(
      (g) => `
      <tr>
        <td>${variableLabels[g.key]}</td>
        <td>${g.avg}</td>
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
    <p><strong>Profiles:</strong> ${peopleInfo}</p>
    <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Group Average</th>
          <th>Gap (Max-Min)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderTensionPoints(groups) {
  const tension = document.getElementById("tension-points");
  const risks = groups.filter((g) => g.level.label === "Friction Risk");
  const watches = groups.filter((g) => g.level.label === "Watch");

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

  tension.innerHTML = `
    <h3>Tension Forecast</h3>
    <ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>
  `;
}

function renderTripPact(groups, selfScores) {
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

  pact.innerHTML = `
    <h3>Trip Alignment Pact (Prototype Output)</h3>
    <ul>
      <li><strong>Destination:</strong> ${state.destination}</li>
      <li><strong>Your baseline profile:</strong> pace ${selfScores.pace}, budget ${selfScores.budget}, social ${selfScores.social}</li>
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

  document.getElementById("destination").value = "";
  document.getElementById("days").value = "4";
  document.getElementById("group-size").value = "3";
  document.querySelectorAll('#teammate-list input[type="checkbox"]').forEach((i) => {
    i.checked = false;
  });
  renderQuestions();
  showStep("step-1");
}

function init() {
  renderQuestions();
  renderTeammates();

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
    state.answers = collectAnswers();
    showStep("step-3");
  });

  document.getElementById("generate-results").addEventListener("click", () => {
    const selected = getSelectedTeammates();
    if (selected.length === 0 || selected.length > 2) {
      alert("Select 1 or 2 teammate profiles for this prototype test.");
      return;
    }
    state.selectedTeammates = selected;
    buildResults();
    showStep("step-4");
  });

  document.getElementById("restart").addEventListener("click", resetFlow);
}

init();
