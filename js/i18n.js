/* Interface strings (English and German). Course lesson content is English. */

export const STR = {
  en: {
    'a11y.skip': 'Skip to content', 'a11y.sidebar': 'Sidebar', 'a11y.main': 'Main navigation', 'a11y.language': 'Switch language', 'a11y.theme': 'Switch light or dark theme',
    'common.cancel': 'Cancel', 'common.save': 'Save', 'common.remove': 'Remove', 'common.back': 'Back to courses', 'common.complete': 'complete', 'common.notFound': 'Page not found', 'common.openYris': 'Open Yris',

    'nav.learn': 'Learn', 'nav.library': 'Library', 'nav.account': 'Account', 'nav.courses': 'My courses', 'nav.home': 'Home', 'nav.documents': 'Documents', 'nav.profile': 'Profile',
    'nav.logout': 'Log out', 'nav.staffArea': 'Staff area', 'nav.controls': 'Course controls', 'nav.payments': 'Payments', 'nav.settings': 'Settings',
    'foot.note': 'Yris demo · Weiden i.d.OPf. · Your data stays in this browser.',

    'auth.access': 'Account access', 'auth.mode': 'Log in or register', 'auth.login': 'Log in', 'auth.register': 'Register', 'auth.welcome': 'Welcome back', 'auth.welcomeBody': 'Log in to continue your course.',
    'auth.start': 'Create your account', 'auth.startBody': 'It takes a minute. You can start learning straight away.',
    'auth.headline': 'Housing basics, done properly.', 'auth.lead': 'A short, practical course for international students on renting, registering and living well in German housing, recognised in Weiden.',
    'auth.p1': 'Eight modules written around real situations', 'auth.p2': 'Local rules for Weiden in der Oberpfalz', 'auth.p3': 'A verifiable certificate when you pass',
    'auth.emailOrUser': 'Email or username', 'auth.password': 'Password', 'auth.passwordHint': 'At least 8 characters and a number', 'auth.showPassword': 'Show or hide password',
    'auth.firstName': 'First name', 'auth.username': 'Username (optional)', 'auth.email': 'Email', 'auth.createAccount': 'Create account',
    'auth.forgot': 'Forgot your password?', 'auth.forgotBody': 'Password reset is not available in this demo. Create a new account with a different email address.',
    'auth.staff': 'Staff access', 'auth.demoNote': 'Demo prototype. Accounts and progress are saved only in this browser, not on a server.',
    'auth.err.credentials': 'No account matches that login and password.', 'auth.err.required': 'First name, email and password are required.', 'auth.err.email': 'Enter a valid email address.',
    'auth.err.password': 'Use at least 8 characters, including a number.', 'auth.err.exists': 'An account with that email or username already exists.',

    'staff.name': 'Staff', 'staff.role': 'Administrator', 'staff.console': 'Staff console', 'staff.tag': 'STAFF',
    'staff.createTitle': 'Set a staff passcode', 'staff.createBody': 'No passcode exists on this device yet. Choose one to protect the staff console.', 'staff.loginTitle': 'Staff access', 'staff.loginBody': 'Enter the staff passcode to manage the course.',
    'staff.passcode': 'Staff passcode', 'staff.newPasscode': 'New passcode', 'staff.confirmPasscode': 'Confirm passcode', 'staff.passcodeHint': 'At least 10 characters',
    'staff.create': 'Set passcode and enter', 'staff.enter': 'Enter staff console', 'staff.back': 'Back to log in', 'staff.forgot': 'Forgot the passcode? Reset demo data',
    'staff.err.short': 'Use at least 10 characters.', 'staff.err.match': 'The passcodes do not match.', 'staff.err.wrong': 'Incorrect passcode.',
    'staff.err.fee': 'Enter an amount such as 9.90.', 'staff.err.title': 'The lesson needs a title.', 'staff.err.sections': 'Every section needs a heading and text, and a lesson needs at least one section.', 'staff.err.quiz': 'Every question needs text and all four options filled in.',
    'staff.controls.sub': 'Edit lesson content and quiz questions for the Weiden course. Exam papers are rebuilt when you save.',
    'staff.stat.students': 'Students', 'staff.stat.avg': 'Average progress', 'staff.stat.paid': 'Fees paid', 'staff.stat.certs': 'Certificates issued',
    'staff.moduleMeta': '{n} lesson|{n} lessons', 'staff.sections': '{n} section|{n} sections', 'course.questions': '{n} question|{n} questions',
    'staff.edit': 'Edit lesson', 'staff.edit.sub': 'Changes are visible to students immediately after you save.', 'staff.lessonTitle': 'Lesson title', 'staff.section': 'Section {n}', 'staff.heading': 'Heading', 'staff.text': 'Text',
    'staff.addSection': 'Add section', 'staff.quiz': 'Knowledge check', 'staff.questionText': 'Question', 'staff.options': 'Options (select the correct one)', 'staff.markCorrect': 'Correct answer', 'staff.option': 'Option {n}',
    'staff.correctHint': 'The selected radio button marks the correct answer.', 'staff.addQuestion': 'Add question', 'staff.saveChanges': 'Save changes',
    'staff.docs.sub': 'Certificate template details and every certificate issued on this device.', 'staff.institution': 'Institution name', 'staff.institutionHint': 'Shown on certificates issued from now on.', 'staff.issued': 'Issued certificates', 'staff.noCerts': 'No certificates issued yet.', 'staff.verify': 'Verify',
    'staff.settings.sub': 'Site details, the course fee and security.', 'staff.site': 'Site', 'staff.tagline': 'Tagline shown to students', 'staff.fee': 'Course fee (EUR)',
    'staff.demo': 'Show the demo shortcut to students', 'staff.demoHint': 'Adds a button that completes the lessons, fee and profile so the exam can be tried straight away.',
    'staff.changePasscode': 'Change staff passcode', 'staff.passcodeNote': 'The passcode is stored as a salted hash in this browser. It protects the console on this device only.', 'staff.updatePasscode': 'Update passcode',
    'staff.data': 'Data', 'staff.dataNote': 'Everything is stored in this browser. Export a copy (without passwords) or erase all demo data on this device.', 'staff.export': 'Export data', 'staff.reset': 'Reset demo data',
    'staff.resetBody': 'This permanently deletes every account, progress record, payment and certificate on this device, and restores the original course. It cannot be undone.',

    'cat.Housing basics': 'Housing basics', 'cat.Contracts': 'Contracts', 'cat.Maintenance': 'Maintenance', 'cat.Safety': 'Safety', 'cat.Local rules': 'Local rules', 'cat.Culture': 'Culture',

    'start.title': 'Choose your course', 'start.subtitle': 'Yris currently offers a full, city-recognised course for Weiden in der Oberpfalz.',
    'disclaimer.title': 'About city recognition', 'disclaimer.body': 'This course is officially adapted for Weiden in der Oberpfalz. If your city is not Weiden, the qualification may not be officially recognised there. However, many housing principles are similar throughout Germany, and you are welcome to complete the course to improve your understanding of German housing expectations.',
    'course.summary': '{n} lessons · {m} modules', 'course.recognised': 'Recognised in Weiden', 'status.completed': 'Completed', 'status.enrolled': 'Enrolled', 'status.enroll': 'Enroll',

    'profile.subtitle': 'Needed to verify you as a student and to print your name on the certificate.', 'profile.lastName': 'Last name', 'profile.dob': 'Date of birth', 'profile.phone': 'Phone number', 'profile.address': 'Current address', 'profile.postal': 'Postal code',
    'profile.city': 'City', 'profile.country': 'Country', 'profile.uni': 'University', 'profile.program': 'Course or programme', 'profile.studentId': 'Student ID', 'profile.optional': 'Optional',
    'profile.confirm': 'I confirm this information is accurate and matches my legal name.', 'profile.save': 'Save profile',
    'profile.err.required': 'Please fill in your first name, last name and city.', 'profile.err.confirm': 'Please confirm that your information is accurate.',

    'courses.empty.sub': 'Courses you enrol in appear here.', 'courses.empty.title': 'No course yet', 'courses.empty.body': 'Choose the Weiden housing course to get started.', 'courses.browse': 'Browse courses',
    'courses.hello': 'Hello, {name}', 'courses.doneBody': 'You have completed every lesson. Review the course or move on to the final exam.', 'courses.upNext': 'Up next: {title}', 'courses.continue': 'Continue where you left off', 'courses.overview': 'Course overview', 'courses.review': 'Review course',
    'courses.stat.lessons': 'Lessons completed', 'courses.stat.fee': 'Course fee', 'courses.stat.best': 'Best exam score', 'courses.stat.cert': 'Certificate', 'courses.yours': 'Your courses',

    'home.badge': 'Housing basics', 'home.welcome': 'Welcome to Yris', 'home.hello': 'Welcome, {name}', 'home.lead': 'Learn what you need to rent, register and live well in Germany. Short lessons, honest checks, and a certificate you can show.',
    'home.how': 'How it works', 'home.s1': 'Learn', 'home.s1d': 'Work through eight short modules at your own pace. Each lesson ends with a quick check.', 'home.s2': 'Confirm your details', 'home.s2d': 'Complete your profile so your name is correct on the certificate.',
    'home.s3': 'Pass the exam', 'home.s3d': 'Pay the course fee, then answer 50 questions. You need 70% to pass.', 'home.s4': 'Get certified', 'home.s4d': 'Sign the declaration and download your certificate with a verification code.', 'home.available': 'Available courses',

    'course.start': 'Start course', 'course.allDone': 'All lessons completed', 'course.moduleMeta': '{d} of {n} lessons complete', 'lesson.minutes': '{n} min', 'course.assessment': 'Assessment and certificate',
    'course.c1': 'Lessons and mini tests', 'course.c1d': '{d} of {n} lessons completed', 'course.c2': 'Profile confirmed', 'course.c2d': 'Name and details verified', 'course.c2a': 'Complete profile',
    'course.c3': 'Course fee ({fee})', 'course.c3d': 'Required before the final exam', 'course.c3paid': 'Payment received', 'course.c3a': 'Pay course fee',
    'course.c4': 'Final exam ({n}% to pass)', 'course.c4d': '50 questions, three different papers', 'course.c4best': 'Best score: {n}%', 'course.c5': 'Certificate', 'course.c5d': 'Sign the declaration to receive it', 'course.c5a': 'Get certificate',
    'course.locked': 'Complete all lessons, confirm your profile and pay the course fee to unlock the final exam.', 'course.demo': 'Demo shortcut: unlock the final exam',

    'lesson.question': 'Question {n}', 'lesson.check': 'Knowledge check', 'lesson.checkBtn': 'Check answers', 'lesson.answered': '{a} of {n} answered', 'lesson.correct': 'Correct.', 'lesson.incorrect': 'Not quite. Review the text above and try again.',
    'lesson.retry': 'Try again', 'lesson.score': '{c} of {n} correct. Every answer must be right to complete the lesson.', 'lesson.complete': 'Mark lesson complete', 'lesson.completeNext': 'Complete and continue', 'lesson.nav': 'Lesson navigation', 'lesson.englishOnly': 'Lesson content is currently available in English only.',

    'exam.final': 'Final exam', 'exam.practice': 'Practice test', 'exam.finalTag': 'Final assessment', 'exam.practiceTag': 'Practice, not counted', 'exam.paper': 'Paper {n}', 'exam.answered': '{a} of {n} answered', 'exam.submit': 'Submit answers',
    'exam.passed': 'You passed', 'exam.notPassed': 'Not passed yet', 'exam.scoreLine': '{c} of {n} correct ({p}%).', 'exam.needPct': 'You need {n}% to pass. Review the modules and try again.', 'exam.toCert': 'Continue to certificate', 'exam.another': 'Try another paper', 'exam.back': 'Back to course',
    'exam.byTopic': 'Results by topic', 'exam.review': 'Review: {n} to revisit', 'exam.perfect': 'Every answer correct', 'exam.unanswered': 'No answer',

    'decl.title': 'Final understanding declaration', 'decl.subtitle': 'Type the sentence below to unlock your certificate.', 'decl.type': 'Type the declaration', 'decl.placeholder': 'Type the sentence exactly as shown…', 'decl.hint': 'Capitalisation and spacing are not checked.', 'decl.generate': 'Generate certificate',
    'cert.page': 'Your certificate', 'cert.subtitle': 'Print it or save it as a PDF. The code and QR link can be used to verify it.', 'cert.print': 'Print or save as PDF', 'cert.title': 'Certificate of Completion', 'cert.awarded': 'This certifies that',
    'cert.body': 'has successfully completed “{course}” and passed the final examination, adapted for {city}.', 'cert.issued': 'Issued', 'cert.id': 'Certificate ID', 'cert.verifyNote': 'Verification checks the certificate registry stored in this browser.',
    'verify.title': 'Certificate verification', 'verify.valid': 'Certificate found', 'verify.validBody': 'This certificate exists in the registry on this device.', 'verify.invalid': 'No certificate found', 'verify.invalidBody': 'This code does not match any certificate in the registry on this device.',
    'verify.holder': 'Holder', 'verify.course': 'Course', 'verify.issuedBy': 'Issued by', 'verify.note': 'Demo registry: it can only confirm certificates issued in this browser. A production deployment would verify against a server.',

    'docs.subtitle': 'Your certificate, handbook and personal details in one place.', 'docs.cert': 'Certificate', 'docs.certReady': 'Certificate {id}', 'docs.certLocked': 'Unlocked after you pass the final exam.', 'docs.issued': 'Issued', 'docs.locked': 'Locked',
    'docs.handbook': 'Course handbook', 'docs.handbookDesc': 'Every lesson in one document you can print or save as a PDF.', 'docs.printable': 'Printable', 'docs.personal': 'Personal details', 'docs.personalDesc': 'On file for {name}', 'docs.personalEmpty': 'Complete your profile to add your details.', 'docs.confirmed': 'Confirmed', 'docs.incomplete': 'Incomplete',
    'handbook.subtitle': 'The full course as a reference document.', 'handbook.print': 'Print or save as PDF',

    'pay.title': 'Course fee', 'pay.body': 'The one-time course fee is {fee}. It unlocks the final exam.', 'pay.demo': 'Demo checkout. No real payment is taken and no bank or PayPal account is contacted.', 'pay.bank': 'Bank transfer', 'pay.iban': 'IBAN', 'pay.ref': 'Reference', 'pay.amount': 'Amount', 'pay.method': 'Method', 'pay.confirm': 'Confirm demo payment',
    'pay.sub': 'Course fee status for every student. Demo only: no payment processor is connected.', 'pay.student': 'Student', 'pay.progress': 'Progress', 'pay.status': 'Status', 'pay.date': 'Date', 'pay.fee': 'Fee', 'pay.paid': 'Paid', 'pay.unpaid': 'Unpaid', 'pay.markPaid': 'Mark paid', 'pay.markUnpaid': 'Mark unpaid', 'pay.none': 'No students yet.',

    'search.open': 'Search lessons', 'search.placeholder': 'Search lessons and topics', 'search.placeholderShort': 'Search lessons', 'search.hint': 'Try “Anmeldung”, “Kaution” or “smoke detector”.', 'search.none': 'No lessons match “{q}”.',

    'toast.examLocked': 'Complete the lessons, your profile and the fee to unlock the final exam.', 'toast.certLocked': 'Pass the final exam to unlock your certificate.', 'toast.profileSaved': 'Profile saved.', 'toast.enrolled': 'You are enrolled.', 'toast.paid': 'Payment recorded.',
    'toast.lessonDone': 'Lesson completed.', 'toast.certIssued': 'Certificate issued.', 'toast.saved': 'Saved.', 'toast.lessonSaved': 'Lesson updated.', 'toast.passcode': 'Passcode updated.', 'toast.demoUnlocked': 'Demo: final exam unlocked.'
  },

  de: {
    'a11y.skip': 'Zum Inhalt springen', 'a11y.sidebar': 'Seitenleiste', 'a11y.main': 'Hauptnavigation', 'a11y.language': 'Sprache wechseln', 'a11y.theme': 'Helles oder dunkles Design wählen',
    'common.cancel': 'Abbrechen', 'common.save': 'Speichern', 'common.remove': 'Entfernen', 'common.back': 'Zurück zu den Kursen', 'common.complete': 'abgeschlossen', 'common.notFound': 'Seite nicht gefunden', 'common.openYris': 'Yris öffnen',

    'nav.learn': 'Lernen', 'nav.library': 'Bibliothek', 'nav.account': 'Konto', 'nav.courses': 'Meine Kurse', 'nav.home': 'Start', 'nav.documents': 'Dokumente', 'nav.profile': 'Profil',
    'nav.logout': 'Abmelden', 'nav.staffArea': 'Verwaltung', 'nav.controls': 'Kurssteuerung', 'nav.payments': 'Zahlungen', 'nav.settings': 'Einstellungen',
    'foot.note': 'Yris-Demo · Weiden i.d.OPf. · Ihre Daten bleiben in diesem Browser.',

    'auth.access': 'Kontozugang', 'auth.mode': 'Anmelden oder registrieren', 'auth.login': 'Anmelden', 'auth.register': 'Registrieren', 'auth.welcome': 'Willkommen zurück', 'auth.welcomeBody': 'Melden Sie sich an, um Ihren Kurs fortzusetzen.',
    'auth.start': 'Konto erstellen', 'auth.startBody': 'Das dauert eine Minute. Sie können sofort loslegen.',
    'auth.headline': 'Wohnen in Deutschland, richtig verstanden.', 'auth.lead': 'Ein kurzer, praxisnaher Kurs für internationale Studierende zu Mieten, Anmelden und gutem Zusammenleben, anerkannt in Weiden.',
    'auth.p1': 'Acht Module rund um echte Alltagssituationen', 'auth.p2': 'Lokale Regeln für Weiden in der Oberpfalz', 'auth.p3': 'Ein prüfbares Zertifikat nach bestandener Prüfung',
    'auth.emailOrUser': 'E-Mail oder Benutzername', 'auth.password': 'Passwort', 'auth.passwordHint': 'Mindestens 8 Zeichen und eine Zahl', 'auth.showPassword': 'Passwort anzeigen oder verbergen',
    'auth.firstName': 'Vorname', 'auth.username': 'Benutzername (optional)', 'auth.email': 'E-Mail', 'auth.createAccount': 'Konto erstellen',
    'auth.forgot': 'Passwort vergessen?', 'auth.forgotBody': 'Das Zurücksetzen des Passworts ist in dieser Demo nicht verfügbar. Erstellen Sie ein neues Konto mit einer anderen E-Mail-Adresse.',
    'auth.staff': 'Zugang für Mitarbeitende', 'auth.demoNote': 'Demo-Prototyp. Konten und Fortschritt werden nur in diesem Browser gespeichert, nicht auf einem Server.',
    'auth.err.credentials': 'Zu dieser Anmeldung und diesem Passwort gibt es kein Konto.', 'auth.err.required': 'Vorname, E-Mail und Passwort sind erforderlich.', 'auth.err.email': 'Geben Sie eine gültige E-Mail-Adresse ein.',
    'auth.err.password': 'Verwenden Sie mindestens 8 Zeichen, darunter eine Zahl.', 'auth.err.exists': 'Ein Konto mit dieser E-Mail oder diesem Benutzernamen existiert bereits.',

    'staff.name': 'Verwaltung', 'staff.role': 'Administration', 'staff.console': 'Verwaltungskonsole', 'staff.tag': 'STAFF',
    'staff.createTitle': 'Zugangscode festlegen', 'staff.createBody': 'Auf diesem Gerät gibt es noch keinen Zugangscode. Wählen Sie einen, um die Verwaltung zu schützen.', 'staff.loginTitle': 'Zugang für Mitarbeitende', 'staff.loginBody': 'Geben Sie den Zugangscode ein, um den Kurs zu verwalten.',
    'staff.passcode': 'Zugangscode', 'staff.newPasscode': 'Neuer Zugangscode', 'staff.confirmPasscode': 'Zugangscode bestätigen', 'staff.passcodeHint': 'Mindestens 10 Zeichen',
    'staff.create': 'Code festlegen und eintreten', 'staff.enter': 'Verwaltung öffnen', 'staff.back': 'Zurück zur Anmeldung', 'staff.forgot': 'Code vergessen? Demo-Daten zurücksetzen',
    'staff.err.short': 'Verwenden Sie mindestens 10 Zeichen.', 'staff.err.match': 'Die Zugangscodes stimmen nicht überein.', 'staff.err.wrong': 'Falscher Zugangscode.',
    'staff.err.fee': 'Geben Sie einen Betrag wie 9.90 ein.', 'staff.err.title': 'Die Lektion braucht einen Titel.', 'staff.err.sections': 'Jeder Abschnitt braucht Überschrift und Text, und eine Lektion braucht mindestens einen Abschnitt.', 'staff.err.quiz': 'Jede Frage braucht einen Text und alle vier Antwortoptionen.',
    'staff.controls.sub': 'Lektionsinhalte und Quizfragen für den Weiden-Kurs bearbeiten. Prüfungsbögen werden beim Speichern neu erstellt.',
    'staff.stat.students': 'Studierende', 'staff.stat.avg': 'Durchschnittlicher Fortschritt', 'staff.stat.paid': 'Gebühren bezahlt', 'staff.stat.certs': 'Ausgestellte Zertifikate',
    'staff.moduleMeta': '{n} Lektion|{n} Lektionen', 'staff.sections': '{n} Abschnitt|{n} Abschnitte', 'course.questions': '{n} Frage|{n} Fragen',
    'staff.edit': 'Lektion bearbeiten', 'staff.edit.sub': 'Änderungen sind nach dem Speichern sofort für Studierende sichtbar.', 'staff.lessonTitle': 'Titel der Lektion', 'staff.section': 'Abschnitt {n}', 'staff.heading': 'Überschrift', 'staff.text': 'Text',
    'staff.addSection': 'Abschnitt hinzufügen', 'staff.quiz': 'Wissenscheck', 'staff.questionText': 'Frage', 'staff.options': 'Antworten (richtige auswählen)', 'staff.markCorrect': 'Richtige Antwort', 'staff.option': 'Option {n}',
    'staff.correctHint': 'Der ausgewählte Auswahlpunkt markiert die richtige Antwort.', 'staff.addQuestion': 'Frage hinzufügen', 'staff.saveChanges': 'Änderungen speichern',
    'staff.docs.sub': 'Angaben zur Zertifikatsvorlage und alle auf diesem Gerät ausgestellten Zertifikate.', 'staff.institution': 'Name der Einrichtung', 'staff.institutionHint': 'Wird auf künftig ausgestellten Zertifikaten angezeigt.', 'staff.issued': 'Ausgestellte Zertifikate', 'staff.noCerts': 'Noch keine Zertifikate ausgestellt.', 'staff.verify': 'Prüfen',
    'staff.settings.sub': 'Seitendetails, Kursgebühr und Sicherheit.', 'staff.site': 'Seite', 'staff.tagline': 'Untertitel für Studierende', 'staff.fee': 'Kursgebühr (EUR)',
    'staff.demo': 'Demo-Abkürzung für Studierende anzeigen', 'staff.demoHint': 'Fügt eine Schaltfläche hinzu, die Lektionen, Gebühr und Profil abschließt, damit die Prüfung sofort ausprobiert werden kann.',
    'staff.changePasscode': 'Zugangscode ändern', 'staff.passcodeNote': 'Der Code wird als gesalzener Hash in diesem Browser gespeichert. Er schützt die Verwaltung nur auf diesem Gerät.', 'staff.updatePasscode': 'Code aktualisieren',
    'staff.data': 'Daten', 'staff.dataNote': 'Alles wird in diesem Browser gespeichert. Exportieren Sie eine Kopie (ohne Passwörter) oder löschen Sie alle Demo-Daten auf diesem Gerät.', 'staff.export': 'Daten exportieren', 'staff.reset': 'Demo-Daten zurücksetzen',
    'staff.resetBody': 'Dadurch werden alle Konten, Fortschritte, Zahlungen und Zertifikate auf diesem Gerät endgültig gelöscht und der ursprüngliche Kurs wiederhergestellt. Das lässt sich nicht rückgängig machen.',

    'cat.Housing basics': 'Wohngrundlagen', 'cat.Contracts': 'Verträge', 'cat.Maintenance': 'Pflege & Abfall', 'cat.Safety': 'Sicherheit', 'cat.Local rules': 'Lokale Regeln', 'cat.Culture': 'Wohnkultur',

    'start.title': 'Kurs auswählen', 'start.subtitle': 'Yris bietet derzeit einen vollständigen, städtisch anerkannten Kurs für Weiden in der Oberpfalz an.',
    'disclaimer.title': 'Zur Anerkennung nach Stadt', 'disclaimer.body': 'Dieser Kurs ist offiziell für Weiden in der Oberpfalz angepasst. Wenn Ihre Stadt nicht Weiden ist, wird die Qualifikation dort möglicherweise nicht offiziell anerkannt. Viele Grundsätze rund ums Wohnen sind in Deutschland jedoch ähnlich, und Sie sind herzlich eingeladen, den Kurs trotzdem zu absolvieren.',
    'course.summary': '{n} Lektionen · {m} Module', 'course.recognised': 'In Weiden anerkannt', 'status.completed': 'Abgeschlossen', 'status.enrolled': 'Eingeschrieben', 'status.enroll': 'Einschreiben',

    'profile.subtitle': 'Erforderlich zur Verifizierung als Studierende und für den Namen auf dem Zertifikat.', 'profile.lastName': 'Nachname', 'profile.dob': 'Geburtsdatum', 'profile.phone': 'Telefonnummer', 'profile.address': 'Aktuelle Adresse', 'profile.postal': 'Postleitzahl',
    'profile.city': 'Stadt', 'profile.country': 'Land', 'profile.uni': 'Hochschule', 'profile.program': 'Studiengang', 'profile.studentId': 'Matrikelnummer', 'profile.optional': 'Optional',
    'profile.confirm': 'Ich bestätige, dass diese Angaben korrekt sind und meinem rechtlichen Namen entsprechen.', 'profile.save': 'Profil speichern',
    'profile.err.required': 'Bitte füllen Sie Vorname, Nachname und Stadt aus.', 'profile.err.confirm': 'Bitte bestätigen Sie, dass Ihre Angaben korrekt sind.',

    'courses.empty.sub': 'Kurse, in die Sie sich einschreiben, erscheinen hier.', 'courses.empty.title': 'Noch kein Kurs', 'courses.empty.body': 'Wählen Sie den Wohnkurs für Weiden, um zu beginnen.', 'courses.browse': 'Kurse ansehen',
    'courses.hello': 'Hallo, {name}', 'courses.doneBody': 'Sie haben alle Lektionen abgeschlossen. Wiederholen Sie den Kurs oder gehen Sie zur Abschlussprüfung.', 'courses.upNext': 'Als Nächstes: {title}', 'courses.continue': 'Weitermachen, wo Sie aufgehört haben', 'courses.overview': 'Kursübersicht', 'courses.review': 'Kurs wiederholen',
    'courses.stat.lessons': 'Lektionen abgeschlossen', 'courses.stat.fee': 'Kursgebühr', 'courses.stat.best': 'Beste Prüfungsnote', 'courses.stat.cert': 'Zertifikat', 'courses.yours': 'Ihre Kurse',

    'home.badge': 'Wohngrundlagen', 'home.welcome': 'Willkommen bei Yris', 'home.hello': 'Willkommen, {name}', 'home.lead': 'Lernen Sie, was Sie zum Mieten, Anmelden und guten Wohnen in Deutschland brauchen. Kurze Lektionen, ehrliche Checks und ein Zertifikat zum Vorzeigen.',
    'home.how': 'So funktioniert es', 'home.s1': 'Lernen', 'home.s1d': 'Arbeiten Sie acht kurze Module in Ihrem Tempo durch. Jede Lektion endet mit einem kurzen Check.', 'home.s2': 'Angaben bestätigen', 'home.s2d': 'Vervollständigen Sie Ihr Profil, damit Ihr Name auf dem Zertifikat stimmt.',
    'home.s3': 'Prüfung bestehen', 'home.s3d': 'Zahlen Sie die Kursgebühr und beantworten Sie 50 Fragen. Zum Bestehen sind 70 % nötig.', 'home.s4': 'Zertifiziert werden', 'home.s4d': 'Unterschreiben Sie die Erklärung und laden Sie Ihr Zertifikat mit Prüfcode herunter.', 'home.available': 'Verfügbare Kurse',

    'course.start': 'Kurs starten', 'course.allDone': 'Alle Lektionen abgeschlossen', 'course.moduleMeta': '{d} von {n} Lektionen abgeschlossen', 'lesson.minutes': '{n} Min.', 'course.assessment': 'Prüfung und Zertifikat',
    'course.c1': 'Lektionen und Minitests', 'course.c1d': '{d} von {n} Lektionen abgeschlossen', 'course.c2': 'Profil bestätigt', 'course.c2d': 'Name und Angaben verifiziert', 'course.c2a': 'Profil vervollständigen',
    'course.c3': 'Kursgebühr ({fee})', 'course.c3d': 'Vor der Abschlussprüfung erforderlich', 'course.c3paid': 'Zahlung eingegangen', 'course.c3a': 'Kursgebühr zahlen',
    'course.c4': 'Abschlussprüfung ({n} % zum Bestehen)', 'course.c4d': '50 Fragen, drei verschiedene Bögen', 'course.c4best': 'Beste Punktzahl: {n} %', 'course.c5': 'Zertifikat', 'course.c5d': 'Unterschreiben Sie die Erklärung, um es zu erhalten', 'course.c5a': 'Zertifikat abholen',
    'course.locked': 'Schließen Sie alle Lektionen ab, bestätigen Sie Ihr Profil und zahlen Sie die Kursgebühr, um die Abschlussprüfung freizuschalten.', 'course.demo': 'Demo-Abkürzung: Abschlussprüfung freischalten',

    'lesson.question': 'Frage {n}', 'lesson.check': 'Wissenscheck', 'lesson.checkBtn': 'Antworten prüfen', 'lesson.answered': '{a} von {n} beantwortet', 'lesson.correct': 'Richtig.', 'lesson.incorrect': 'Nicht ganz. Lesen Sie den Text oben noch einmal und versuchen Sie es erneut.',
    'lesson.retry': 'Erneut versuchen', 'lesson.score': '{c} von {n} richtig. Alle Antworten müssen stimmen, um die Lektion abzuschließen.', 'lesson.complete': 'Lektion abschließen', 'lesson.completeNext': 'Abschließen und weiter', 'lesson.nav': 'Lektionsnavigation', 'lesson.englishOnly': 'Die Lektionsinhalte sind derzeit nur auf Englisch verfügbar.',

    'exam.final': 'Abschlussprüfung', 'exam.practice': 'Übungstest', 'exam.finalTag': 'Abschlussprüfung', 'exam.practiceTag': 'Übung, zählt nicht', 'exam.paper': 'Bogen {n}', 'exam.answered': '{a} von {n} beantwortet', 'exam.submit': 'Antworten abgeben',
    'exam.passed': 'Bestanden', 'exam.notPassed': 'Noch nicht bestanden', 'exam.scoreLine': '{c} von {n} richtig ({p} %).', 'exam.needPct': 'Zum Bestehen sind {n} % nötig. Wiederholen Sie die Module und versuchen Sie es erneut.', 'exam.toCert': 'Weiter zum Zertifikat', 'exam.another': 'Anderen Bogen versuchen', 'exam.back': 'Zurück zum Kurs',
    'exam.byTopic': 'Ergebnis nach Thema', 'exam.review': 'Zur Wiederholung: {n}', 'exam.perfect': 'Alle Antworten richtig', 'exam.unanswered': 'Keine Antwort',

    'decl.title': 'Abschließende Verständniserklärung', 'decl.subtitle': 'Geben Sie den folgenden Satz ein, um Ihr Zertifikat freizuschalten.', 'decl.type': 'Erklärung eingeben', 'decl.placeholder': 'Geben Sie den Satz genau wie angezeigt ein …', 'decl.hint': 'Groß- und Kleinschreibung sowie Abstände werden nicht geprüft.', 'decl.generate': 'Zertifikat erstellen',
    'cert.page': 'Ihr Zertifikat', 'cert.subtitle': 'Drucken oder als PDF speichern. Mit Code und QR-Link kann es überprüft werden.', 'cert.print': 'Drucken oder als PDF speichern', 'cert.title': 'Teilnahmezertifikat', 'cert.awarded': 'Hiermit wird bestätigt, dass',
    'cert.body': 'hat den Kurs „{course}“ erfolgreich abgeschlossen und die Abschlussprüfung bestanden, angepasst an {city}.', 'cert.issued': 'Ausgestellt', 'cert.id': 'Zertifikats-ID', 'cert.verifyNote': 'Die Prüfung nutzt das Zertifikatsregister, das in diesem Browser gespeichert ist.',
    'verify.title': 'Zertifikatsprüfung', 'verify.valid': 'Zertifikat gefunden', 'verify.validBody': 'Dieses Zertifikat ist im Register auf diesem Gerät vorhanden.', 'verify.invalid': 'Kein Zertifikat gefunden', 'verify.invalidBody': 'Dieser Code passt zu keinem Zertifikat im Register auf diesem Gerät.',
    'verify.holder': 'Inhaber/in', 'verify.course': 'Kurs', 'verify.issuedBy': 'Ausgestellt von', 'verify.note': 'Demo-Register: Es kann nur Zertifikate bestätigen, die in diesem Browser ausgestellt wurden. Ein Produktivsystem würde serverseitig prüfen.',

    'docs.subtitle': 'Zertifikat, Handbuch und persönliche Angaben an einem Ort.', 'docs.cert': 'Zertifikat', 'docs.certReady': 'Zertifikat {id}', 'docs.certLocked': 'Wird nach bestandener Abschlussprüfung freigeschaltet.', 'docs.issued': 'Ausgestellt', 'docs.locked': 'Gesperrt',
    'docs.handbook': 'Kurshandbuch', 'docs.handbookDesc': 'Alle Lektionen in einem Dokument zum Drucken oder Speichern als PDF.', 'docs.printable': 'Druckbar', 'docs.personal': 'Persönliche Angaben', 'docs.personalDesc': 'Hinterlegt für {name}', 'docs.personalEmpty': 'Vervollständigen Sie Ihr Profil, um Ihre Angaben zu ergänzen.', 'docs.confirmed': 'Bestätigt', 'docs.incomplete': 'Unvollständig',
    'handbook.subtitle': 'Der gesamte Kurs als Nachschlagedokument.', 'handbook.print': 'Drucken oder als PDF speichern',

    'pay.title': 'Kursgebühr', 'pay.body': 'Die einmalige Kursgebühr beträgt {fee}. Sie schaltet die Abschlussprüfung frei.', 'pay.demo': 'Demo-Kasse. Es wird keine echte Zahlung ausgeführt und kein Bank- oder PayPal-Konto kontaktiert.', 'pay.bank': 'Überweisung', 'pay.iban': 'IBAN', 'pay.ref': 'Verwendungszweck', 'pay.amount': 'Betrag', 'pay.method': 'Zahlungsart', 'pay.confirm': 'Demo-Zahlung bestätigen',
    'pay.sub': 'Status der Kursgebühr aller Studierenden. Nur Demo: Es ist kein Zahlungsdienstleister angebunden.', 'pay.student': 'Studierende/r', 'pay.progress': 'Fortschritt', 'pay.status': 'Status', 'pay.date': 'Datum', 'pay.fee': 'Gebühr', 'pay.paid': 'Bezahlt', 'pay.unpaid': 'Offen', 'pay.markPaid': 'Als bezahlt markieren', 'pay.markUnpaid': 'Als offen markieren', 'pay.none': 'Noch keine Studierenden.',

    'search.open': 'Lektionen durchsuchen', 'search.placeholder': 'Lektionen und Themen durchsuchen', 'search.placeholderShort': 'Lektionen suchen', 'search.hint': 'Versuchen Sie „Anmeldung“, „Kaution“ oder „Rauchmelder“.', 'search.none': 'Keine Lektion passt zu „{q}“.',

    'toast.examLocked': 'Schließen Sie Lektionen, Profil und Gebühr ab, um die Abschlussprüfung freizuschalten.', 'toast.certLocked': 'Bestehen Sie die Abschlussprüfung, um Ihr Zertifikat freizuschalten.', 'toast.profileSaved': 'Profil gespeichert.', 'toast.enrolled': 'Sie sind eingeschrieben.', 'toast.paid': 'Zahlung erfasst.',
    'toast.lessonDone': 'Lektion abgeschlossen.', 'toast.certIssued': 'Zertifikat ausgestellt.', 'toast.saved': 'Gespeichert.', 'toast.lessonSaved': 'Lektion aktualisiert.', 'toast.passcode': 'Zugangscode aktualisiert.', 'toast.demoUnlocked': 'Demo: Abschlussprüfung freigeschaltet.'
  }
};
