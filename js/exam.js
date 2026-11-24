/* Exam blueprint and exam-only questions.
   The lessons carry 41 mini-test questions, but the final exam needs 50 distinct ones. These extra questions test
   the same material, so the three exam papers can differ without repeating a question. */

/* Which exam category each module feeds. */
export const CATEGORY_BY_MODULE = {
  m1: "Housing basics", m2: "Contracts", m3: "Local rules", m4: "Maintenance",
  m5: "Safety", m6: "Culture", m7: "Maintenance", m8: "Local rules"
};

/* Final exam blueprint: 50 questions, 70% to pass. */
export const EXAM_BLUEPRINT = { "Housing basics": 5, "Contracts": 10, "Maintenance": 10, "Safety": 10, "Local rules": 10, "Culture": 5 };
export const PASS_MARK = 70;

/* Format: [category, question, [options], index of the correct option] */
export const EXTRA_QUESTIONS = [
  ["Housing basics", "Which type of accommodation is usually the cheapest for students?", ["A private apartment", "A Studentenwohnheim (dormitory)", "A furnished short-term rental", "A hotel"], 1],
  ["Housing basics", "Which document do landlords commonly ask for as proof of creditworthiness?", ["A Meldebescheinigung", "A Schufa report", "A Wohnungsübergabeprotokoll", "An Energieausweis"], 1],

  ["Contracts", "What does Kaltmiete mean?", ["Rent including heating and water", "The base rent without utilities", "The security deposit", "A fee for late payment"], 1],
  ["Contracts", "Where should existing damage be recorded when you move in?", ["In the Wohnungsübergabeprotokoll", "On the Meldeschein", "In the Hausordnung", "In the Schufa report"], 0],
  ["Contracts", "Why should you take dated photos of every room before you sign?", ["They are required by the Bürgeramt", "They show the condition of the flat at move-in", "They lower the Kaution", "They replace the rental contract"], 1],
  ["Contracts", "Which is an example of a legally recognised reason to end a tenancy?", ["The landlord dislikes the tenant's friends", "Eigenbedarf (the landlord needs the flat for personal use)", "The tenant owns a bicycle", "The rent is paid by bank transfer"], 1],
  ["Contracts", "Who must maintain the building's heating, plumbing and electrics?", ["The tenant", "The landlord", "The neighbours", "The Bürgeramt"], 1],
  ["Contracts", "What is a Hausverwaltung?", ["A property management company or office", "A type of rental contract", "A government registration form", "A student housing loan"], 0],
  ["Contracts", "Nebenkosten are:", ["The security deposit", "Running costs such as heating, water, waste and building maintenance", "The base rent", "A one-off agency fee"], 1],
  ["Contracts", "The Kaution is usually:", ["Paid to the Bürgeramt", "Held in a separate blocked account and returned after move-out if there is no damage", "Spent by the landlord on repairs immediately", "Optional and never refunded"], 1],

  ["Maintenance", "Leaving a window tilted open (Kippstellung) for hours tends to:", ["Exchange the air effectively", "Cool the walls and encourage condensation and mould", "Lower your rent", "Prevent frozen pipes"], 1],
  ["Maintenance", "Roughly what minimum temperature should rooms be kept at in winter, even when you are away?", ["5 °C", "16–18 °C", "25 °C", "There is no recommendation"], 1],
  ["Maintenance", "Why do you bleed a radiator (Entlüften)?", ["To remove trapped air that causes noise and uneven heating", "To save water", "To switch the heating off", "To register the radiator with the landlord"], 0],
  ["Maintenance", "Which bin is for paper and cardboard?", ["The blue bin", "The brown bin", "The yellow bin", "The grey or black bin"], 0],

  ["Safety", "Who is usually responsible for installing smoke detectors?", ["The tenant", "The landlord", "The neighbours", "The fire brigade"], 1],
  ["Safety", "Who typically checks that smoke-detector batteries work, unless the landlord has a maintenance contract?", ["The tenant", "The Bürgeramt", "The postal service", "Nobody"], 0],
  ["Safety", "If a pipe bursts and you can find the main water valve, what should you do?", ["Leave it and wait", "Shut it off and contact your landlord immediately", "Pour water on the pipe", "Wait until the next day"], 1],
  ["Safety", "Which job should tenants never do themselves?", ["Replacing a light bulb", "Repairing a gas appliance", "Cleaning the bathroom", "Wiping condensation off a window"], 1],
  ["Safety", "Why are DIY repairs to electrical or heating systems a problem?", ["They are dangerous and can make you liable for further damage", "They are always free", "They improve your insurance", "They are required by the contract"], 0],
  ["Safety", "After you phone about an urgent issue such as no heating in winter, you should:", ["Do nothing more", "Confirm it in writing afterwards", "Cancel the contract", "Wait for the landlord to ask"], 1],
  ["Safety", "Which task is generally fine for a tenant to handle?", ["Re-caulking a bathtub seam", "Rewiring a socket", "Repairing a boiler", "Fixing structural cracks"], 0],
  ["Safety", "With damaged wiring or a sparking socket you should never:", ["Switch off the circuit at the fuse box", "Touch the damaged wiring", "Call an electrician", "Tell your landlord"], 1],
  ["Safety", "A smoke detector beeps at regular intervals. This usually means:", ["Everything is fine", "The battery is low or the device is faulty and should be reported", "The landlord is visiting", "The alarm is registered with the Bürgeramt"], 1],

  ["Local rules", "What must you bring to your Anmeldung appointment in addition to your ID?", ["The Wohnungsgeberbestätigung from your landlord", "A Schufa report", "Your last three payslips", "A reference from your university"], 0],
  ["Local rules", "What is an Ummeldung?", ["A complaint about a neighbour", "Re-registering your address after moving to a new flat", "A type of rental contract", "A waste-collection form"], 1],
  ["Local rules", "When do you need an Abmeldung?", ["When you move to another flat in the same city", "When you leave Germany without a new address", "Every year", "Never"], 1],
  ["Local rules", "Who should you contact with questions about waste collection in Weiden?", ["The Abfallberatung (waste advisory office)", "The university library", "The post office", "The fire brigade"], 0],
  ["Local rules", "What is sensible to do before visiting the Bürgeramt?", ["Book an appointment online", "Bring your furniture", "Visit on a Sunday", "Skip the paperwork"], 0],
  ["Local rules", "Weiden is a kreisfreie Stadt. This means it is:", ["An independent city that is not part of a Landkreis", "A village", "A university campus", "A waste-collection district"], 0],
  ["Local rules", "Before you visit a Wertstoffhof you should:", ["Check the current opening times on weiden.de", "Bring your passport", "Pay the Nebenkosten", "Register with the Studentenwerk"], 0],
  ["Local rules", "Registering your address late can result in:", ["A fine", "A free Meldebescheinigung", "A rent reduction", "Nothing"], 0],

  ["Culture", "Where should bikes and prams be kept in a shared building?", ["In the stairwell", "In designated areas, not blocking entrances", "On the neighbours' balcony", "In the shared laundry room"], 1],
  ["Culture", "In a WG, household chores are usually organised through:", ["An informal rota", "A court order", "The Bürgeramt", "The Schufa"], 0],
  ["Culture", "Loud drilling is most likely to cause complaints:", ["During quiet hours and on Sundays or public holidays", "On weekday afternoons only", "Never", "Only in summer"], 0]
];
