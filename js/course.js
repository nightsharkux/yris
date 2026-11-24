/* Course content for the Weiden housing course (seed data; staff edits are stored per browser). */
export const SEED_COURSE = {
  id:"weiden", title:"Weiden Housing basics", city:"Weiden in der Oberpfalz",
  modules:[
    { id:"m1", icon:"home", color:"#0E9AAA", title:"Introduction to German Housing", lessons:[
      { id:"l1_1", title:"Types of accommodation", sections:[
        {heading:"WG, dorms and private flats", body:"A Wohngemeinschaft (WG) is a shared flat where each person has a private room and shares kitchen/bathroom with flatmates — the most common and affordable option for students. A Studentenwohnheim (student dormitory) is run by the Studentenwerk and usually cheapest, with simpler furnishing and shared facilities. A private apartment (Privatwohnung) gives you full independence but is usually the most expensive and requires a full rental contract on your own name."}
      ], quiz:[
        {q:"What is a WG?", options:["A type of German bank account","A shared flat with private rooms and shared common areas","A government housing office","A student loan program"], correct:1},
        {q:"Who typically manages student dormitories?", options:["The landlord's family","The Studentenwerk","The Bürgeramt","The Wertstoffhof"], correct:1}
      ]},
      { id:"l1_2", title:"Understanding rental terminology", sections:[
        {heading:"Key words on every contract", body:"Mietvertrag = the rental contract itself. Kaltmiete = 'cold rent', the base rent without utilities. Warmmiete = Kaltmiete plus Nebenkosten, i.e. what you actually pay monthly. Nebenkosten = running costs (heating, water, waste, building maintenance). Kaution = the security deposit, legally capped at three months' Kaltmiete, usually held in a separate blocked account and returned after move-out once no damage is found."}
      ], quiz:[
        {q:"Warmmiete is:", options:["Rent plus Nebenkosten (utilities)","Only the base rent","A one-time move-in fee","The deposit"], correct:0},
        {q:"By law, Kaution can be at most:", options:["One month's Kaltmiete","Three months' Kaltmiete","Six months' Kaltmiete","There is no legal limit"], correct:1}
      ]},
      { id:"l1_3", title:"Finding housing safely", sections:[
        {heading:"Avoiding scams", body:"Never transfer a deposit or first month's rent before you have viewed the flat in person (or via a verified video call) and signed a contract. Be suspicious of landlords who are 'abroad' and can only communicate by email, or who ask for payment via gift cards or wire transfer to a foreign account. Ask to see the Energieausweis (energy certificate) and, where relevant, proof the person offering the flat is actually the owner or an authorised agent."},
        {heading:"Documents to prepare", body:"Landlords in Germany commonly ask for: a copy of your passport/ID, a Schufa credit report (or proof of enrolment for students without one), proof of income or a scholarship/parental guarantee, and a reference from a previous landlord (Mietschuldenfreiheitsbescheinigung) if available."}
      ], quiz:[
        {q:"A safe rule when contacting a new landlord is to:", options:["Pay the deposit immediately to secure the flat","View the flat and sign a contract before paying anything","Only communicate by gift card","Skip the contract to save time"], correct:1},
        {q:"A Schufa report is:", options:["A rental contract","A German credit/creditworthiness report","A type of insurance","A waste collection schedule"], correct:1}
      ]}
    ]},
    { id:"m2", icon:"file", color:"#5B52D6", title:"Rental Agreements and Legal Responsibilities", lessons:[
      { id:"l2_1", title:"Signing a rental contract", sections:[
        {heading:"Before you sign", body:"Read the full Mietvertrag, check the Wohnungsübergabeprotokoll (move-in inspection report) that lists existing damage, and take dated photos of every room. Everything you agree to informally should also appear in writing — verbal promises are hard to prove later."}
      ], quiz:[
        {q:"The Wohnungsübergabeprotokoll is used to:", options:["Record existing damage at move-in","Register your address","Apply for a visa","Pay your Nebenkosten"], correct:0},
        {q:"Verbal agreements not written into the contract are:", options:["Always legally binding","Hard to prove later","Automatically void","Not allowed in Germany"], correct:1}
      ]},
      { id:"l2_2", title:"Tenant rights", sections:[
        {heading:"What you're entitled to", body:"Tenants have a right to a habitable flat, protection from unjustified rent increases, and strong protection against eviction — landlords generally need a legally recognised reason (e.g. Eigenbedarf, personal use) and proper notice periods to terminate a contract."}
      ], quiz:[
        {q:"Can a landlord evict a tenant without any legal reason?", options:["Yes, at any time","No — a legally recognised reason and notice period are required","Only in winter","Only if rent is paid on time"], correct:1}
      ]},
      { id:"l2_3", title:"Tenant responsibilities", sections:[
        {heading:"What's expected of you", body:"Pay rent on time, keep the flat reasonably clean, ventilate rooms to prevent mould, report damage promptly, and avoid unauthorised structural changes (drilling into load-bearing walls, repainting without permission where the contract forbids it, etc.)."}
      ], quiz:[
        {q:"Which of these is a normal tenant responsibility?", options:["Paying for structural building repairs","Ventilating rooms to prevent mould","Setting the building's insurance policy","Approving neighbours' contracts"], correct:1}
      ]},
      { id:"l2_4", title:"Landlord responsibilities", sections:[
        {heading:"What the landlord must provide", body:"The landlord must maintain the building's structure and core systems (heating, plumbing, electrics), ensure the flat is habitable, and carry out necessary repairs beyond normal tenant upkeep in reasonable time after being notified."}
      ], quiz:[
        {q:"Repairing a broken central heating boiler is normally the responsibility of:", options:["The tenant","The landlord","The neighbours","The Bürgeramt"], correct:1}
      ]},
      { id:"l2_5", title:"Reporting problems", sections:[
        {heading:"How to report an issue", body:"Report defects to your landlord or Hausverwaltung (property management) in writing (email or letter) so there's a record, describe the problem clearly, and keep a copy. For urgent issues (no heating in winter, a burst pipe), also call, but confirm in writing afterwards."}
      ], quiz:[
        {q:"Why report a defect in writing (not just verbally)?", options:["It's required for the Kaution","It creates a record you can refer back to","Verbal reports are illegal","It automatically lowers your rent"], correct:1}
      ]}
    ]},
    { id:"m3", icon:"id", color:"#2F7BFF", title:"Anmeldung and Official Responsibilities", lessons:[
      { id:"l3_1", title:"Registration requirements", sections:[
        {heading:"You must register within two weeks", body:"Anyone moving into a flat in Germany must register their address (Anmeldung) with the local Meldebehörde within two weeks of moving in. In Weiden, this is handled by the Bürgeramt (Bürgerbüro) at Dr.-Pfleger-Str. 15, 92637 Weiden i.d.OPf. Registering late can result in a fine."},
        {heading:"What to bring", body:"A completed and signed Meldeschein (registration form, available in advance or on-site), your passport or ID, and the Wohnungsgeberbestätigung from your landlord. It's worth booking an appointment online in advance rather than walking in."}
      ], quiz:[
        {q:"How long do you have to register your address after moving in?", options:["Two days","Two weeks","Two months","There is no deadline"], correct:1},
        {q:"In Weiden, address registration is handled by:", options:["The university","The Wertstoffhof","The Bürgeramt (Bürgerbüro)","The landlord directly"], correct:2}
      ]},
      { id:"l3_2", title:"Wohnungsgeberbestätigung", sections:[
        {heading:"Your landlord's confirmation", body:"Since 2015, landlords are legally required to give tenants a signed Wohnungsgeberbestätigung confirming the move-in date. You must bring this to your Anmeldung appointment — without it, registration cannot be completed. It is also illegal for a landlord to issue this confirmation for an address you don't actually live at."}
      ], quiz:[
        {q:"The Wohnungsgeberbestätigung is provided by:", options:["The tenant","The landlord","The city council","The university"], correct:1},
        {q:"Without a Wohnungsgeberbestätigung, you can:", options:["Still register normally","Not complete your Anmeldung","Get a discount on rent","Skip registration entirely"], correct:1}
      ]},
      { id:"l3_3", title:"Changing address", sections:[
        {heading:"Moving again later", body:"If you move to a new flat, even within Weiden, you must re-register (Ummeldung) within two weeks of the new move-in date using a new Wohnungsgeberbestätigung. If you move out of Germany without a new address, you must deregister (Abmeldung)."}
      ], quiz:[
        {q:"Moving to a new flat within Weiden requires:", options:["No action","A new Ummeldung within two weeks","Only a phone call","Cancelling your student status"], correct:1}
      ]},
      { id:"l3_4", title:"Important documents", sections:[
        {heading:"Keep these safe", body:"Keep your Meldebescheinigung (registration confirmation), rental contract, and Wohnungsgeberbestätigung together — you'll need copies for opening a bank account, enrolling at university, and applying for a residence permit or health insurance."}
      ], quiz:[
        {q:"A Meldebescheinigung is often needed for:", options:["Opening a bank account or applying for a residence permit","Only for parking permits","Nothing beyond the Bürgeramt","Buying furniture"], correct:0}
      ]}
    ]},
    { id:"m4", icon:"sparkle", color:"#10A963", title:"Apartment Maintenance and Care", lessons:[
      { id:"l4_1", title:"Preventing mold", sections:[
        {heading:"Stoßlüften: correct ventilation", body:"German flats are well insulated, which traps moisture. Stoßlüften means opening windows fully for 5–10 minutes, several times a day, rather than leaving windows tilted open (Kippstellung) for hours — tilted windows cool the walls and encourage condensation and mould instead of properly exchanging the air."},
        {heading:"Moisture control", body:"Wipe down condensation on windows, don't dry laundry in unventilated rooms for long periods, and keep furniture a few centimetres away from exterior walls so air can circulate behind it."}
      ], quiz:[
        {q:"Stoßlüften means:", options:["Leaving a window tilted open all day","Opening windows fully for a few minutes, several times a day","Never opening windows in winter","Running the heating at maximum"], correct:1},
        {q:"Why keep furniture away from exterior walls?", options:["It looks better","To allow air circulation and reduce mould risk","It's required by law","To save electricity"], correct:1}
      ]},
      { id:"l4_2", title:"Bathroom maintenance", sections:[
        {heading:"After every shower", body:"Ventilate the bathroom (open a window or use the extractor fan) and squeegee or wipe down wet tiles and glass. Leaving a bathroom humid encourages mould in grout and silicone seals, which can be expensive to repair and may be charged to the tenant if caused by neglect."}
      ], quiz:[
        {q:"What should you do after showering?", options:["Leave the bathroom closed","Ventilate the room","Turn off the heating","Leave the door closed and lights on"], correct:1}
      ]},
      { id:"l4_3", title:"Kitchen maintenance", sections:[
        {heading:"Moisture, cleaning and waste", body:"Use extractor fans while cooking, wipe up spills promptly, and clean the oven/stove regularly to avoid grease build-up. Kitchen waste should be separated correctly (see the Waste Management module) — Restmüll (general waste) bins that are contaminated with recyclables can lead to extra fees."}
      ], quiz:[
        {q:"Using the extractor fan while cooking mainly helps prevent:", options:["Noise complaints","Excess moisture and grease build-up","High rent","Late Anmeldung"], correct:1}
      ]},
      { id:"l4_4", title:"Heating and winter care", sections:[
        {heading:"Correct heating & frozen pipes", body:"Keep rooms at a minimum temperature (roughly 16–18°C) even when you're away in winter, to avoid frozen pipes and mould. Bleed radiators (Entlüften) if they're noisy or heat unevenly, and avoid covering radiators with heavy curtains or furniture."}
      ], quiz:[
        {q:"Why should you avoid letting rooms get too cold in winter, even when away?", options:["To save on Nebenkosten only","To prevent frozen pipes and mould","It's required by the Bürgeramt","To keep neighbours warm"], correct:1}
      ]},
      { id:"l4_5", title:"Protecting furniture and surfaces", sections:[
        {heading:"Floors, walls, appliances", body:"Use felt pads under furniture legs to protect floors, avoid drilling into walls without checking your contract's rules, and follow appliance manuals (e.g. descaling kettles/washing machines regularly, since German tap water is often hard)."}
      ], quiz:[
        {q:"Why is descaling appliances often important in Germany?", options:["Because tap water is often hard (high mineral content)","Because it's required by the Bürgeramt","Because appliances are rented","It isn't necessary"], correct:0}
      ]}
    ]},
    { id:"m5", icon:"tool", color:"#EE5A4E", title:"Repairs, Safety and Professional Maintenance", lessons:[
      { id:"l5_1", title:"What tenants can maintain themselves", sections:[
        {heading:"Allowed", body:"Cleaning, replacing normal consumables (light bulbs, shower head seals, vacuum bags), minor picture-hook holes, and basic upkeep like re-caulking a bathtub seam are generally fine for tenants to handle."}
      ], quiz:[
        {q:"Which is a normal tenant-level task?", options:["Replacing a light bulb","Rewiring the electrical panel","Replacing the boiler","Repairing structural cracks"], correct:0}
      ]},
      { id:"l5_2", title:"What tenants must NOT repair themselves", sections:[
        {heading:"Leave these to professionals", body:"Electrical systems, plumbing systems, heating systems, gas appliances, and structural damage should never be repaired by tenants themselves — report them to the landlord immediately. DIY repairs to these systems can be dangerous and may void insurance or make the tenant liable for further damage."}
      ], quiz:[
        {q:"If your heating system breaks, you should:", options:["Fix it yourself with online tutorials","Report it to your landlord","Ignore it until spring","Ask a neighbour to rewire it"], correct:1}
      ]},
      { id:"l5_3", title:"Smoke detectors", sections:[
        {heading:"Rauchmelder", body:"Smoke detectors are mandatory in bedrooms, children's rooms and hallways in Bavaria. Landlords are usually responsible for installation; tenants are typically responsible for checking that batteries work (unless the landlord uses a maintenance contract). Report a beeping low-battery warning or malfunction promptly."}
      ], quiz:[
        {q:"Smoke detectors in Bavaria are required in:", options:["Bathrooms only","Bedrooms, children's rooms and hallways","Kitchens only","Basements only"], correct:1}
      ]},
      { id:"l5_4", title:"Emergency situations", sections:[
        {heading:"Fire, leaks, electrical hazards", body:"Fire: call 112 (fire brigade/ambulance). Water leaks: shut off the main water valve if you can locate it, and contact your landlord immediately. Electrical hazards (sparking sockets, burning smell): switch off the relevant circuit at the fuse box and call an electrician or your landlord — never touch damaged wiring."}
      ], quiz:[
        {q:"The emergency number for fire in Germany is:", options:["911","112","999","000"], correct:1},
        {q:"If you smell burning from a socket, you should first:", options:["Ignore it","Pour water on it","Switch off the circuit and report it","Cover it with tape"], correct:2}
      ]}
    ]},
    { id:"m6", icon:"users", color:"#E9930C", title:"German Housing Culture", lessons:[
      { id:"l6_1", title:"Noise rules", sections:[
        {heading:"Ruhezeiten (quiet hours)", body:"Most Hausordnungen set quiet hours roughly 22:00–06:00 on weeknights, plus all-day quiet on Sundays and public holidays. Loud music, drilling, or vacuuming during these times is a common source of neighbour complaints and can, in repeated cases, be grounds for a formal warning from the landlord."}
      ], quiz:[
        {q:"Quiet hours (Ruhezeiten) typically apply:", options:["Only on weekdays daytime","Nights and all day on Sundays/holidays","Never in Germany","Only in summer"], correct:1}
      ]},
      { id:"l6_2", title:"Hausordnung", sections:[
        {heading:"House rules", body:"The Hausordnung is a building's house rules document, often attached to the rental contract. It typically covers rubbish disposal days, use of shared laundry rooms, stairwell cleaning duties (Kehrwoche in some regions), and general conduct in shared areas."}
      ], quiz:[
        {q:"The Hausordnung usually covers:", options:["National tax law","Building-specific rules like laundry and cleaning duties","Visa requirements","University enrolment"], correct:1}
      ]},
      { id:"l6_3", title:"Shared spaces", sections:[
        {heading:"Stairwells, laundry, bike storage", body:"Keep shared stairwells and hallways clear (fire safety rules often prohibit storing items there), book shared laundry machines according to any posted schedule, and use designated areas for bikes and prams rather than blocking entrances."}
      ], quiz:[
        {q:"Why are stairwells usually kept clear of stored items?", options:["Purely aesthetic reasons","Fire safety regulations","To save electricity","Landlord preference only"], correct:1}
      ]},
      { id:"l6_4", title:"WG responsibilities", sections:[
        {heading:"Living with flatmates", body:"In a WG, chores (cleaning the kitchen/bathroom, taking out rubbish) are usually shared via an informal rota. Being reliable about your share, communicating early about guests or noise, and splitting shared costs fairly (Nebenkosten, internet, cleaning supplies) go a long way."}
      ], quiz:[
        {q:"A good habit for living well in a WG is:", options:["Ignoring shared chores","Communicating about guests, noise and shared costs","Never speaking to flatmates","Changing locks without telling anyone"], correct:1}
      ]},
      { id:"l6_5", title:"Respecting neighbours", sections:[
        {heading:"Everyday courtesy", body:"Introducing yourself to neighbours, keeping shared entrance areas tidy, and addressing small conflicts directly and politely (rather than escalating immediately) are valued and can prevent bigger disputes later."}
      ], quiz:[
        {q:"If a minor conflict comes up with a neighbour, a good first step is:", options:["Call the police immediately","Address it directly and politely","Move out immediately","Ignore it and hope it resolves itself"], correct:1}
      ]}
    ]},
    { id:"m7", icon:"recycle", color:"#5BAE2D", title:"Waste Management", lessons:[
      { id:"l7_1", title:"German recycling system", sections:[
        {heading:"The bin colours", body:"Restmüll (grey/black bin) — non-recyclable general waste. Papier (blue bin) — paper and cardboard. Biomüll (brown bin) — food and garden waste. Gelber Sack / gelbe Tonne (yellow bag/bin) — plastic and composite packaging (Leichtverpackungen). Glass goes into public Altglas containers, sorted by colour (clear, green, brown)."}
      ], quiz:[
        {q:"Which bin is for packaging plastics in the German system?", options:["Blue bin","Gelber Sack / yellow bin","Brown bin","Black bin"], correct:1},
        {q:"Biomüll (brown bin) is for:", options:["Glass","Food and garden waste","Electronics","Batteries"], correct:1}
      ]},
      { id:"l7_2", title:"Local city waste rules (Weiden)", sections:[
        {heading:"Weiden's Wertstoffhöfe", body:"Weiden operates two recycling centres, Wertstoffhof Weiden-Ost and Wertstoffhof Weiden-West, for items that don't go in your regular household bins — larger items, electronics, scrap metal, and problem waste (Problemabfälle). From 1 April 2026 the city adjusted opening times: broadly Tuesday–Friday mornings and early afternoons, and Saturday mornings, with both sites closed Monday and Sunday. Always check the current schedule on weiden.de before visiting, as hours can change."},
        {heading:"Who to contact", body:"For questions about waste collection or problem waste in Weiden, the city's Abfallberatung (waste advisory office) can be reached at abfallberatung@weiden.de."}
      ], quiz:[
        {q:"In Weiden, larger items and electronics that don't fit in household bins go to:", options:["The Bürgeramt","The Wertstoffhof (recycling centre)","The university","The post office"], correct:1},
        {q:"Which days are Weiden's Wertstoffhöfe typically closed?", options:["Tuesday and Wednesday","Monday and Sunday","Saturday only","Never — they're open daily"], correct:1}
      ]},
      { id:"l7_3", title:"Correct disposal", sections:[
        {heading:"Avoiding contamination fees", body:"Putting the wrong material in a bin (e.g. glass in Restmüll, or greasy pizza boxes in the paper bin) can contaminate a whole load and, in repeated cases, lead to extra charges shared across a building. Rinse containers lightly before recycling, and break down cardboard boxes to save space."}
      ], quiz:[
        {q:"Why should you rinse containers before putting them in recycling?", options:["It's required to avoid contaminating the recycling load","It makes the bin heavier","It's optional and has no effect","To save water"], correct:0}
      ]}
    ]},
    { id:"m8", icon:"building", color:"#9B5CF0", title:"City-Specific Regulations: Weiden", lessons:[
      { id:"l8_1", title:"Weiden overview", sections:[
        {heading:"Your local city", body:"Weiden in der Oberpfalz is an independent city (kreisfreie Stadt) in Bavaria with roughly 42,000 residents. As a student here, your two main local offices are the Bürgeramt (registration, ID matters) and the city's waste and environment office (Umwelt/Abfall und Entsorgung), both reachable via weiden.de."},
        {heading:"Local contacts", body:"Bürgeramt/Bürgerbüro: Dr.-Pfleger-Str. 15, 92637 Weiden i.d.OPf. Waste advisory (Abfallberatung): abfallberatung@weiden.de. General city switchboard: 0961 81-0. Always confirm current opening hours online, as they can change."}
      ], quiz:[
        {q:"Weiden in der Oberpfalz is located in which German state?", options:["Bavaria","Berlin","Saxony","Hesse"], correct:0},
        {q:"The Bürgeramt/Bürgerbüro in Weiden is located at:", options:["Dr.-Pfleger-Str. 15","The train station","The university library","The Wertstoffhof"], correct:0}
      ]}
    ]}
  ]
};
