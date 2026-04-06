const boundaryScenarios = [
  {
    id: "b1",
    prompt:
      "A plan starts to feel less safe or less comfortable than expected, but the rest of the group still wants to continue.",
    options: [
      { label: "Say no clearly and step back", scores: { directness: 5, harmony: 2, deescalation: 2 } },
      { label: "Suggest a safer alternative everyone could still enjoy", scores: { directness: 3, harmony: 4, deescalation: 4 } },
      { label: "Go along with it to avoid disrupting the group", scores: { directness: 1, harmony: 5, deescalation: 3 } },
      { label: "Leave quietly without making it a big issue", scores: { directness: 2, harmony: 3, deescalation: 5 } }
    ]
  },
  {
    id: "b2",
    prompt: "The group realizes you are over budget for the day and someone suggests a pricey activity anyway.",
    options: [
      { label: "Vote no and propose a cheaper swap", scores: { directness: 5, harmony: 2, deescalation: 3 } },
      { label: "Split up: whoever wants to go can, others opt out", scores: { directness: 3, harmony: 3, deescalation: 4 } },
      { label: "Say yes to keep the vibe even if it stings", scores: { directness: 2, harmony: 5, deescalation: 2 } },
      { label: "Avoid deciding and hope someone else speaks up", scores: { directness: 1, harmony: 4, deescalation: 4 } }
    ]
  },
  {
    id: "b3",
    prompt: "Half the group wants a packed morning; the other half wants to sleep in.",
    options: [
      { label: "Pick one plan for everyone", scores: { directness: 4, harmony: 2, deescalation: 2 } },
      { label: "Split into two tracks and meet later", scores: { directness: 3, harmony: 3, deescalation: 5 } },
      { label: "Defer to whoever feels strongest", scores: { directness: 2, harmony: 5, deescalation: 3 } },
      { label: "Cancel the morning block to avoid conflict", scores: { directness: 2, harmony: 4, deescalation: 4 } }
    ]
  },
  {
    id: "b4",
    prompt: "Someone in the group is running late and the whole day’s timing is slipping.",
    options: [
      { label: "Reset expectations out loud and cut an activity", scores: { directness: 5, harmony: 2, deescalation: 3 } },
      { label: "Quietly compress the schedule as you go", scores: { directness: 2, harmony: 4, deescalation: 4 } },
      { label: "Rush everyone to keep the original plan", scores: { directness: 4, harmony: 2, deescalation: 2 } },
      { label: "Let it slide and improvise without addressing it", scores: { directness: 1, harmony: 5, deescalation: 3 } }
    ]
  },
  {
    id: "b5",
    prompt: "Two people disagree in front of the group and the mood gets tense.",
    options: [
      { label: "Name the tension and suggest a quick decision rule", scores: { directness: 5, harmony: 2, deescalation: 4 } },
      { label: "Suggest taking a short break and revisiting", scores: { directness: 3, harmony: 4, deescalation: 5 } },
      { label: "Make a light joke to reset the vibe", scores: { directness: 2, harmony: 5, deescalation: 3 } },
      { label: "Stay quiet and wait for it to pass", scores: { directness: 1, harmony: 4, deescalation: 3 } }
    ]
  }
];

const fakeTravelers = [
  {
    id: "ft-sd-1",
    name: "Riley Chen",
    bio: "Weekend trips, loves sunrise hikes and taco crawls.",
    destination: "San Diego",
    tripWindow: "Spring break",
    avatarUrl: "https://i.pravatar.cc/150?u=ft-sd-1",
    pace: 4,
    budget: 3,
    social: 4,
    directness: 4,
    harmony: 3,
    deescalation: 3,
    boundaryTags: ["Speaks up early", "Splits plans when needed"],
    mustHaves: ["one hike", "local food"],
    hardNos: ["late-night clubs"],
    flexAreas: ["museum block"]
  },
  {
    id: "ft-sd-2",
    name: "Sam Ortiz",
    bio: "Chill beach days, strict daily spend cap.",
    destination: "San Diego",
    tripWindow: "May",
    avatarUrl: "https://i.pravatar.cc/150?u=ft-sd-2",
    pace: 2,
    budget: 2,
    social: 3,
    directness: 3,
    harmony: 4,
    deescalation: 4,
    boundaryTags: ["Budget-first", "Avoids confrontation"],
    mustHaves: ["beach time"],
    hardNos: ["packed itineraries"],
    flexAreas: ["dinner"]
  },
  {
    id: "ft-tokyo",
    name: "Jordan Park",
    bio: "First Japan trip—wants structure + one flex day.",
    destination: "Tokyo",
    tripWindow: "June",
    avatarUrl: "https://i.pravatar.cc/150?u=ft-tokyo",
    pace: 4,
    budget: 4,
    social: 3,
    directness: 4,
    harmony: 3,
    deescalation: 3,
    boundaryTags: ["Direct about time", "Safety-first"],
    mustHaves: ["one day trip out of city"],
    hardNos: ["hostels"],
    flexAreas: ["shopping"]
  },
  {
    id: "ft-austin",
    name: "Alex Morgan",
    bio: "Music + food; happy to split the group.",
    destination: "Austin",
    tripWindow: "March",
    avatarUrl: "https://i.pravatar.cc/150?u=ft-austin",
    pace: 3,
    budget: 3,
    social: 5,
    directness: 3,
    harmony: 4,
    deescalation: 4,
    boundaryTags: ["Group-vibe first", "Uses breaks to cool tension"],
    mustHaves: ["live music night"],
    hardNos: ["all-day driving"],
    flexAreas: ["brunch"]
  },
  {
    id: "ft-denver",
    name: "Casey Lee",
    bio: "Outdoor-heavy, early starts, packs snacks to save money.",
    destination: "Denver",
    tripWindow: "July",
    avatarUrl: "https://i.pravatar.cc/150?u=ft-denver",
    pace: 5,
    budget: 2,
    social: 2,
    directness: 5,
    harmony: 2,
    deescalation: 3,
    boundaryTags: ["Says no clearly", "Prefers honest tradeoffs"],
    mustHaves: ["one big hike"],
    hardNos: ["fancy dinners every night"],
    flexAreas: ["coffee stops"]
  },
  {
    id: "ft-miami",
    name: "Taylor Brooks",
    bio: "Social trip—wants group dinners and beach afternoons.",
    destination: "Miami",
    tripWindow: "April",
    avatarUrl: "https://i.pravatar.cc/150?u=ft-miami",
    pace: 3,
    budget: 4,
    social: 5,
    directness: 2,
    harmony: 5,
    deescalation: 3,
    boundaryTags: ["Keeps peace", "Flexible on details"],
    mustHaves: ["group dinner"],
    hardNos: ["splitting all day solo"],
    flexAreas: ["nightlife"]
  },
  {
    id: "ft-portland",
    name: "Morgan Reed",
    bio: "Slow mornings, coffee shops, one museum day.",
    destination: "Portland",
    tripWindow: "Fall",
    avatarUrl: "https://i.pravatar.cc/150?u=ft-portland",
    pace: 2,
    budget: 3,
    social: 4,
    directness: 3,
    harmony: 4,
    deescalation: 5,
    boundaryTags: ["De-escalates", "Prefers breaks over debates"],
    mustHaves: ["farmers market"],
    hardNos: ["early flights"],
    flexAreas: ["neighborhood walks"]
  }
];

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

const state = {
  destination: "",
  days: 4,
  groupSize: 3,
  answers: {},
  boundaryAnswers: {},
  boundaryProfile: null,
  selectedTeammates: [],
  customTeammates: [],
  selfScores: { pace: 3, budget: 3, social: 3 },
  userPrefs: { mustHaves: [], hardNos: [], flexAreas: [] },
  discoverySelectedIds: []
};
let customTeammateCounter = 1;

const variableLabels = {
  pace: "Trip Pace",
  budget: "Budget Flexibility",
  social: "Social Style"
};

const stepIds = ["step-1", "step-boundary", "step-2", "step-3", "step-4"];

function showStep(targetId) {
  stepIds.forEach((id) => {
    const element = document.getElementById(id);
    element.classList.toggle("active", id === targetId);
  });
}

function renderBoundaryQuestions() {
  const form = document.getElementById("boundary-form");
  form.innerHTML = "";

  boundaryScenarios.forEach((scenario, index) => {
    const block = document.createElement("div");
    block.className = "question-item boundary-item";
    const prompt = document.createElement("p");
    prompt.textContent = `Boundary ${index + 1} of ${boundaryScenarios.length}: ${scenario.prompt}`;
    block.appendChild(prompt);

    scenario.options.forEach((opt, optIndex) => {
      const row = document.createElement("label");
      row.className = "boundary-option";
      const checked = optIndex === 0 ? "checked" : "";
      row.innerHTML = `<input type="radio" name="${scenario.id}" value="${optIndex}" ${checked}> ${opt.label}`;
      block.appendChild(row);
    });
    form.appendChild(block);
  });

  updateBoundaryPreview();
}

function collectBoundaryAnswers() {
  const answers = {};
  boundaryScenarios.forEach((s) => {
    const chosen = document.querySelector(`input[name="${s.id}"]:checked`);
    const idx = Number(chosen?.value ?? 0);
    answers[s.id] = idx;
  });
  return answers;
}

function computeBoundaryProfile(answers) {
  const sums = { directness: 0, harmony: 0, deescalation: 0 };
  boundaryScenarios.forEach((s) => {
    const idx = answers[s.id] ?? 0;
    const opt = s.options[idx];
    if (opt?.scores) {
      sums.directness += opt.scores.directness;
      sums.harmony += opt.scores.harmony;
      sums.deescalation += opt.scores.deescalation;
    }
  });
  const n = boundaryScenarios.length;
  const avg = {
    directness: Number((sums.directness / n).toFixed(2)),
    harmony: Number((sums.harmony / n).toFixed(2)),
    deescalation: Number((sums.deescalation / n).toFixed(2))
  };

  const tags = [];
  if (avg.directness >= 4) tags.push("Direct communicator");
  else if (avg.directness <= 2.5) tags.push("Soft-spoken boundary style");

  if (avg.harmony >= 4) tags.push("Group harmony first");
  else if (avg.harmony <= 2.5) tags.push("Willing to disrupt harmony for clarity");

  if (avg.deescalation >= 4) tags.push("De-escalates tension");
  else if (avg.deescalation <= 2.5) tags.push("Addresses tension head-on");

  const summaryLines = [
    `Under pressure you tend to be ${avg.directness >= 3.5 ? "direct" : avg.directness <= 2.5 ? "indirect" : "balanced"} about boundaries.`,
    `You lean ${avg.harmony >= 3.5 ? "toward keeping group peace" : avg.harmony <= 2.5 ? "toward naming tradeoffs" : "between peace and tradeoffs"}.`,
    `When things get tense you ${avg.deescalation >= 3.5 ? "often cool things down first" : "often push for a clear decision"}.`
  ];

  return { avg, tags: tags.slice(0, 3), summaryLines };
}

function updateBoundaryPreview() {
  state.boundaryAnswers = collectBoundaryAnswers();
  state.boundaryProfile = computeBoundaryProfile(state.boundaryAnswers);
  const el = document.getElementById("boundary-preview");
  const p = state.boundaryProfile;
  el.innerHTML = `
    <h3>Your boundary profile (live)</h3>
    <p class="meta">${p.summaryLines.join(" ")}</p>
    <p><strong>Tags:</strong> ${p.tags.map((t) => `<span class="tag tag-warn">${t}</span>`).join(" ")}</p>
    <p class="meta">Directness ${p.avg.directness}/5 · Harmony ${p.avg.harmony}/5 · De-escalation ${p.avg.deescalation}/5</p>
  `;
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

function destinationMatches(userDest, travelerDest) {
  const a = (userDest || "").toLowerCase().trim();
  const b = (travelerDest || "").toLowerCase().trim();
  if (!a || !b) return false;
  return a.includes(b) || b.includes(a);
}

function scoreSimilarity(traveler) {
  const uPace = state.selfScores.pace;
  const uBudget = state.selfScores.budget;
  const uSocial = state.selfScores.social;
  const bp = state.boundaryProfile?.avg || { directness: 3, harmony: 3, deescalation: 3 };

  const paceD = Math.abs(uPace - traveler.pace);
  const budgetD = Math.abs(uBudget - traveler.budget);
  const socialD = Math.abs(uSocial - traveler.social);
  const alignDist = paceD + budgetD + socialD;

  const bd = Math.abs(bp.directness - traveler.directness);
  const bh = Math.abs(bp.harmony - traveler.harmony);
  const bde = Math.abs(bp.deescalation - traveler.deescalation);
  const boundaryDist = bd + bh + bde;

  let bonus = 0;
  if (destinationMatches(state.destination, traveler.destination)) bonus -= 1.5;

  const userTags = new Set((state.boundaryProfile?.tags || []).map(normalizeItem));
  (traveler.boundaryTags || []).forEach((t) => {
    if ([...userTags].some((u) => normalizeItem(t).includes(u) || u.includes(normalizeItem(t)))) {
      bonus -= 0.4;
    }
  });

  return alignDist * 1.2 + boundaryDist * 0.8 + bonus;
}

function explainMatch(traveler) {
  const reasons = [];
  if (destinationMatches(state.destination, traveler.destination)) {
    reasons.push(`Similar destination intent (${traveler.destination})`);
  } else {
    reasons.push("Shown for score fit (try matching your destination in step 1 for tighter results)");
  }

  const paceD = Math.abs(state.selfScores.pace - traveler.pace);
  if (paceD <= 1) reasons.push("Similar trip pace");
  if (paceD > 2) reasons.push("Different pace—check the pact");

  const budgetD = Math.abs(state.selfScores.budget - traveler.budget);
  if (budgetD <= 1) reasons.push("Similar budget flexibility");
  if (budgetD > 2) reasons.push("Budget style may differ—confirm spend norms early");

  const bp = state.boundaryProfile?.avg;
  if (bp) {
    const bd = Math.abs(bp.directness - traveler.directness);
    if (bd <= 1) reasons.push("Similar directness under pressure");
    if (bd > 2) reasons.push("May resolve conflict differently");
  }

  return reasons.slice(0, 4);
}

function travelerToComparable(t) {
  return {
    id: t.id,
    name: t.name,
    description: t.bio,
    pace: t.pace,
    budget: t.budget,
    social: t.social,
    mustHaves: t.mustHaves || [],
    hardNos: t.hardNos || [],
    flexAreas: t.flexAreas || [],
    destination: t.destination,
    tripWindow: t.tripWindow,
    avatarUrl: t.avatarUrl,
    boundaryTags: t.boundaryTags || []
  };
}

function renderDiscovery() {
  const feed = document.getElementById("discovery-feed");
  const ranked = fakeTravelers
    .map((t) => ({ t, score: scoreSimilarity(t) }))
    .sort((a, b) => a.score - b.score);

  feed.innerHTML = "<h3 class=\"discovery-title\">Suggested travelers</h3>";

  ranked.forEach(({ t, score }) => {
    const card = document.createElement("div");
    card.className = "discovery-card";
    const selected = state.discoverySelectedIds.includes(t.id);
    const reasons = explainMatch(t);

    card.innerHTML = `
      <div class="discovery-card-top">
        <img class="discovery-avatar" src="${t.avatarUrl}" alt="" width="56" height="56">
        <div class="discovery-card-head">
          <h3>${t.name}</h3>
          <p class="meta">${t.bio}</p>
          <p class="meta"><strong>${t.destination}</strong> · ${t.tripWindow} · Pace ${t.pace} · Budget ${t.budget} · Social ${t.social}</p>
        </div>
      </div>
      <p class="meta"><strong>Boundary style:</strong> ${(t.boundaryTags || []).join(" · ")}</p>
      <div class="match-reasons">
        <strong>Why you're seeing this</strong>
        <ul>${reasons.map((r) => `<li>${r}</li>`).join("")}</ul>
      </div>
      <div class="discovery-actions">
        <label class="select-inline">
          <input type="checkbox" class="discovery-pick" value="${t.id}" ${selected ? "checked" : ""}>
          Compare with my profile
        </label>
        <button type="button" class="btn btn-secondary btn-connect" data-connect-id="${t.id}" data-connect-name="${t.name.replace(/"/g, "&quot;")}">
          Connect (demo)
        </button>
      </div>
    `;
    feed.appendChild(card);
  });

  feed.querySelectorAll(".discovery-pick").forEach((input) => {
    input.addEventListener("change", () => {
      const id = input.value;
      if (input.checked) {
        if (!state.discoverySelectedIds.includes(id)) {
          state.discoverySelectedIds.push(id);
        }
        if (state.discoverySelectedIds.length > 2) {
          const removed = state.discoverySelectedIds.shift();
          const old = feed.querySelector(`.discovery-pick[value="${removed}"]`);
          if (old) old.checked = false;
        }
      } else {
        state.discoverySelectedIds = state.discoverySelectedIds.filter((x) => x !== id);
      }
    });
  });

  feed.querySelectorAll(".btn-connect").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-connect-id");
      const name = btn.getAttribute("data-connect-name") || "Traveler";
      openConnectModal(name, id);
    });
  });
}

function openConnectModal(name, id) {
  const modal = document.getElementById("connect-modal");
  const body = document.getElementById("modal-body");
  const mail = document.getElementById("modal-mailto");
  const dest = state.destination || "our trip";
  body.textContent =
    `This is a prototype—there is no in-app chat. You can reach out by email or text outside the app. Suggested opener: "Hi ${name}, I saw we had overlapping plans for ${dest} on Trip Alignment Pact."`;
  const subject = encodeURIComponent(`Trip Alignment Pact — connect with ${name}`);
  const bodyText = encodeURIComponent(
    `Hi ${name},\n\nI'm planning something in ${dest} and we had a strong fit on Trip Alignment Pact. Would you be open to a quick chat about travel style?\n\nThanks!`
  );
  mail.href = `mailto:?subject=${subject}&body=${bodyText}`;
  modal.classList.add("modal-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeConnectModal() {
  const modal = document.getElementById("connect-modal");
  modal.classList.remove("modal-open");
  modal.setAttribute("aria-hidden", "true");
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
    <p class="meta">Pace, budget, and social—use these when comparing with travelers below.</p>
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

function getSelectedTravelersForCompare() {
  const fromDiscovery = state.discoverySelectedIds
    .map((id) => fakeTravelers.find((f) => f.id === id))
    .filter(Boolean)
    .map(travelerToComparable);
  return [...fromDiscovery, ...state.customTeammates];
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

function renderCustomChips() {
  const el = document.getElementById("custom-teammate-chips");
  if (!state.customTeammates.length) {
    el.innerHTML = "";
    return;
  }
  el.innerHTML = `<p class="meta"><strong>Added manually:</strong> ${state.customTeammates.map((c) => c.name).join(", ")}</p>`;
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
  renderCustomChips();
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
  const bp = state.boundaryProfile;

  header.innerHTML = `
    <h3>Trip Room: ${destination} (${state.days} days)</h3>
    <p><strong>Group Snapshot:</strong> ${state.selectedTeammates.length + 1} travelers compared.</p>
    <p><strong>Friction signals:</strong> ${riskCount} high-risk, ${watchCount} medium-risk variable(s).</p>
    ${
      bp
        ? `<div class="boundary-result"><strong>Your boundary profile:</strong> ${bp.tags.join(", ")}. ${bp.summaryLines[0]}</div>`
        : ""
    }
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

function boundaryFallbackRule() {
  const bp = state.boundaryProfile?.avg;
  if (!bp) return "Pause and pick the lowest-conflict option if debate stalls.";
  if (bp.directness >= 4) return "If disagreement stalls, take turns naming one non-negotiable and one flex item.";
  if (bp.harmony >= 4) return "If disagreement stalls, split the day: one block together, one block solo.";
  if (bp.deescalation >= 4) return "If disagreement stalls, take a 15-minute break, then decide with a quick vote.";
  return "If disagreement stalls, default to the cheaper, lower-energy option first.";
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
      ${
        state.boundaryProfile
          ? `<li><strong>Under tension:</strong> ${state.boundaryProfile.summaryLines.join(" ")}</li>`
          : ""
      }
      <li><strong>Shared must-haves:</strong> ${sharedMustHaves.length ? sharedMustHaves.join(", ") : "No overlap yet - discuss top priorities together."}</li>
      <li><strong>Protected hard no's:</strong> ${protectedHardNos.length ? protectedHardNos.join(", ") : "None listed yet."}</li>
      <li><strong>Flex zones:</strong> ${flexPool.length ? flexPool.join(", ") : "None listed yet."}</li>
      ${rules.map((r) => `<li>${r}</li>`).join("")}
      <li><strong>Fallback rule (based on your boundary style):</strong> ${boundaryFallbackRule()}</li>
    </ul>
  `;
}

function resetFlow() {
  state.destination = "";
  state.days = 4;
  state.groupSize = 3;
  state.answers = {};
  state.boundaryAnswers = {};
  state.boundaryProfile = null;
  state.selectedTeammates = [];
  state.customTeammates = [];
  state.selfScores = { pace: 3, budget: 3, social: 3 };
  state.userPrefs = { mustHaves: [], hardNos: [], flexAreas: [] };
  state.discoverySelectedIds = [];
  customTeammateCounter = 1;

  document.getElementById("destination").value = "";
  document.getElementById("days").value = "4";
  document.getElementById("group-size").value = "3";
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

  renderBoundaryQuestions();
  renderQuestions();
  renderDiscovery();
  renderCustomChips();
  renderSelfScoreBlocks(state.selfScores);
  showStep("step-1");
}

function init() {
  renderBoundaryQuestions();
  renderQuestions();
  renderDiscovery();
  renderSelfScoreBlocks(state.selfScores);

  document.getElementById("question-form").addEventListener("change", updateSelfScoresFromForm);
  document.getElementById("boundary-form").addEventListener("change", updateBoundaryPreview);

  document.getElementById("to-boundary").addEventListener("click", () => {
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
    updateBoundaryPreview();
    showStep("step-boundary");
  });

  document.getElementById("back-from-boundary").addEventListener("click", () => showStep("step-1"));

  document.getElementById("to-alignment").addEventListener("click", () => {
    state.boundaryAnswers = collectBoundaryAnswers();
    state.boundaryProfile = computeBoundaryProfile(state.boundaryAnswers);
    showStep("step-2");
  });

  document.getElementById("back-to-boundary").addEventListener("click", () => showStep("step-boundary"));

  document.getElementById("to-discovery").addEventListener("click", () => {
    updateSelfScoresFromForm();
    collectUserPrefs();
    renderDiscovery();
    renderSelfScoreBlocks(state.selfScores);
    showStep("step-3");
  });

  document.getElementById("back-to-alignment").addEventListener("click", () => showStep("step-2"));

  document.getElementById("add-teammate").addEventListener("click", addCustomTeammate);

  document.getElementById("generate-results").addEventListener("click", () => {
    const selected = getSelectedTravelersForCompare();
    if (selected.length === 0 || selected.length > 4) {
      alert("Pick 1 to 4 travelers to compare: use discovery checkboxes (max 2) and/or Add Teammate manually.");
      return;
    }
    state.selectedTeammates = selected;
    buildResults();
    showStep("step-4");
  });

  document.getElementById("back-to-discovery").addEventListener("click", () => showStep("step-3"));

  document.getElementById("restart").addEventListener("click", resetFlow);

  document.getElementById("connect-modal").querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeConnectModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeConnectModal();
  });
}

init();
