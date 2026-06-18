(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88560,e=>{"use strict";let t="photos";function a(){return new Promise((e,a)=>{let i=indexedDB.open("tjil-eval-images",1);i.onupgradeneeded=()=>{let e=i.result;e.objectStoreNames.contains(t)||e.createObjectStore(t,{keyPath:"id"}),e.objectStoreNames.contains("metadata")||e.createObjectStore("metadata",{keyPath:"id"}).createIndex("evalId","evalId",{unique:!1})},i.onsuccess=()=>e(i.result),i.onerror=()=>a(i.error)})}async function i(){try{return(await a()).close(),!0}catch{return!1}}async function o(e){if(!await i())return JSON.parse(localStorage.getItem("tjil-images-meta")||"[]").filter(t=>t.evalId===e);{let t=await a();try{let a=t.transaction("metadata","readonly").objectStore("metadata").index("evalId");return await new Promise((t,i)=>{let o=a.getAll(e);o.onsuccess=()=>t(o.result),o.onerror=()=>i(o.error)})}finally{t.close()}}}async function n(e){if(!await i())return localStorage.getItem(`tjil-img-${e}`)||null;{let i=await a();try{let a=i.transaction(t,"readonly");return await new Promise((i,o)=>{let n=a.objectStore(t).get(e);n.onsuccess=()=>i(n.result?.dataUrl||null),n.onerror=()=>o(n.error)})}finally{i.close()}}}async function s(e){let t=await o(e),a=[];for(let e of t){let t=await n(e.id);t&&a.push({metadata:e,dataUrl:t})}return a}function r(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function l(e){let{clientInfo:t,clinicianInfo:a,caseSummary:i,traumaHistory:o,psychSymptoms:n,mentalStatusExam:s,phq9:r,gad7:l,pcl5:c,optionalSections:E,findings:d}=e,m={"She/Her":{subject:"she",object:"her",possessive:"her",title:"Ms."},"He/Him":{subject:"he",object:"him",possessive:"his",title:"Mr."},"They/Them":{subject:"they",object:"them",possessive:"their",title:""},Other:{subject:"they",object:"them",possessive:"their",title:""}},p=m[t.pronouns]||m["She/Her"],T=d.diagnoses.map(e=>`${e.code} ${e.name}${e.specifier?`, ${e.specifier}`:""}`).join("\n");return{FULL_NAME:t.fullName||"[Client Name]",PREFERRED_NAME:t.preferredName||t.fullName||"[Preferred Name]",PRONOUNS:t.pronouns,GENDER:t.gender||"[Gender]",TITLE:p.title,MS_XXX:`${p.title} ${t.fullName?.split(" ").pop()||"XXX"}`,DOB:t.dateOfBirth||"00-00-0000",AGE:t.age||"00",NATIONALITY:t.nationality||"[Nationality]",COUNTRY_OF_ORIGIN:t.countryOfOrigin||"[Country of Origin]",COUNTRY_XXX:t.countryOfOrigin||"CountryXXX",ADDRESS:t.currentAddress||"[Address]",PHONE:t.phone||"[Phone]",EMAIL:t.email||"[Email]",MARITAL_STATUS:t.maritalStatus||"[Marital Status]",NUM_CHILDREN:t.numberOfChildren||"0",INTERPRETER:t.interpreterNeeded?t.interpreterName||"[Interpreter Name]":"Not required",EVAL_LOCATION:"Other"===t.evaluationLocation?t.otherLocation:t.evaluationLocation,EVAL_DATES:t.evaluationDates||"00-00-00 and 00-00-00",SUBJECT:p.subject,OBJECT:p.object,POSSESSIVE:p.possessive,CLINICIAN_NAME:a.name||"[Clinician Name]",LICENSE_TYPE:a.licenseType||"[License]",LICENSE_NUMBER:a.licenseNumber||"[License #]",CLINICIAN_CREDENTIALS:`${a.name}, ${a.licenseType} #${a.licenseNumber}`,OFFICE_ADDRESS:a.officeAddress||"[Office Address]",CLINICIAN_PHONE:a.phone||"[Phone]",CLINICIAN_EMAIL:a.email||"[Email]",CLINICIAN_BIO:a.bio||"[Clinician Bio]",CASE_SUMMARY:i.summary||"[Case Summary]",KEY_QUOTE:i.keyQuote?`"${i.keyQuote}"`:"",TRAUMA_CATEGORY:o.traumaCategory||"[Trauma Category]",TRAUMA_DESCRIPTION:o.descriptionOfEvents||"[Trauma Description]",ABUSE_TYPE:o.abuseType||"[Abuse Type]",PERPETRATOR:o.perpetratorInfo||"[Perpetrator]",TRAUMA_DATES:o.datesOfTrauma||"[Dates]",PHYSICAL_VIOLENCE:o.physicalViolence?"Yes":"No",SEXUAL_VIOLENCE:o.sexualViolence?"Yes":"No",POLICE_INVOLVEMENT:o.policeInvolvement||"None reported",DECISION_TO_LEAVE:o.decisionToLeave||"[Decision to Leave]",WHY_CANT_RETURN:o.whyCantReturn||"[Cannot Return Because]",TRAUMA_QUOTE:o.keyQuote?`"${o.keyQuote}"`:"",DEPRESSION_SEVERITY:n.depressionSeverity,ANXIETY_SEVERITY:n.anxietySeverity,PTSD_SYMPTOMS:n.ptsdSymptoms,SLEEP_PROBLEMS:n.sleepProblems,SUICIDAL_IDEATION:n.suicidalIdeation,APPEARANCE:s.appearance,EYE_CONTACT:s.eyeContact,SPEECH:s.speech,MOOD:s.mood,AFFECT:s.affect,THOUGHT_PROCESS:s.thoughtProcess,ORIENTATION:s.orientation,MSE_NOTES:s.additionalObservations,PHQ9_TOTAL:String(r.total),PHQ9_SEVERITY:r.severity,GAD7_TOTAL:String(l.total),GAD7_SEVERITY:l.severity,PCL5_TOTAL:String(c.total),PCL5_SEVERITY:c.severity,PCL5_PTSD:c.likelyPTSD?"Yes – meets threshold":"Below threshold",DIAGNOSES:T||"[Diagnoses]",CLINICAL_IMPRESSION:d.clinicalImpression||"[Clinical Impression]",CREDIBILITY:d.credibilityAssessment||"[Credibility Assessment]",RECOMMENDATIONS:d.recommendations||"[Recommendations]",RISK_ASSESSMENT:d.riskAssessment||"[Risk Assessment]",FUNCTIONAL_IMPAIRMENT:d.functionalImpairment||"[Functional Impairment]",PROGNOSIS:d.prognosis||"[Prognosis]",LGBTQ_SECTION:E.lgbtqAsylum.enabled?E.lgbtqAsylum.personalExperiences:"",DELAYED_FILING:E.delayedFiling.enabled?E.delayedFiling.explanation:"",PHYSICAL_SCARS:E.physicalScars.enabled?E.physicalScars.scarDescription:"",MEDICAL_CONDITIONS:E.medicalConditions.enabled?E.medicalConditions.conditions:"",REPORT_DATE:new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}}async function c(t){let a=l(t),i=t.clientInfo.fullName||"Evaluation",o=`${i}_Psych_Eval_${new Date().toISOString().split("T")[0]}.docx`;try{let{default:t}=await e.A(29339),{default:i}=await e.A(92729),n=await fetch("/immigration-eval-app/asylum-template.docx");if(n.ok||(n=await fetch("/asylum-template.docx")),n.ok){let e=await n.arrayBuffer(),s=new t(e),r=new i(s,{paragraphLoop:!0,linebreaks:!0});return r.render(a),{blob:r.getZip().generate({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"}),filename:o}}}catch(e){console.warn("[DOCX] Template approach failed, using HTML fallback:",e)}let n=d(t,a);return{blob:new Blob([`
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${r(i)} - Psychological Evaluation</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
  body { font-family: 'Times New Roman', Georgia, serif; font-size: 12pt; line-height: 1.6; color: #1a1a1a; margin: 1in; }
  pre { white-space: pre-wrap; word-wrap: break-word; font-family: inherit; font-size: 12pt; margin: 0; }
  @page { size: letter; margin: 1in; }
  @page Section1 { mso-header-margin: .5in; mso-footer-margin: .5in; }
  div.Section1 { page: Section1; }
</style>
</head>
<body>
<div class="Section1">
<pre>${n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre>
</div>
</body>
</html>`],{type:"application/msword"}),filename:o.replace(".docx",".doc")}}async function E(t){let{blob:a,filename:i}=await c(t),{saveAs:o}=await e.A(42191);o(a,i)}function d(e,t){let{clientInfo:a,findings:i,phq9:o,gad7:n,pcl5:s,optionalSections:r}=e,l="";return r.lgbtqAsylum.enabled&&r.lgbtqAsylum.personalExperiences&&(l+=`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LGBTQ+ ASYLUM CONSIDERATIONS

${r.lgbtqAsylum.personalExperiences}
`),r.delayedFiling.enabled&&r.delayedFiling.explanation&&(l+=`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DELAYED FILING EXPLANATION

${r.delayedFiling.explanation}
${r.delayedFiling.psychologicalBarriers?`
Psychological Barriers: ${r.delayedFiling.psychologicalBarriers}`:""}
`),r.physicalScars.enabled&&r.physicalScars.scarDescription&&(l+=`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHYSICAL SCARS/MARKS DOCUMENTATION

${r.physicalScars.scarDescription}
${r.physicalScars.location?`Location: ${r.physicalScars.location}`:""}
${r.physicalScars.consistentWithAccount?"Finding: Consistent with client's account of events.":""}
`),r.medicalConditions.enabled&&r.medicalConditions.conditions&&(l+=`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEDICAL CONDITIONS

${r.medicalConditions.conditions}
${r.medicalConditions.medications?`Medications: ${r.medicalConditions.medications}`:""}
${r.medicalConditions.traumaRelated?"These conditions are related to the traumatic events described.":""}
`),`
CLINICAL PSYCHOLOGICAL EVALUATION
${t.CLINICIAN_NAME}, ${t.LICENSE_TYPE} #${t.LICENSE_NUMBER}
${t.OFFICE_ADDRESS} | ${t.CLINICIAN_PHONE} | ${t.CLINICIAN_EMAIL}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLINICAL EVALUATION

Name: ${t.MS_XXX}
Date of Birth: ${t.DOB} (${t.AGE} years old)
Gender: ${t.GENDER}
Nationality: ${t.NATIONALITY}
Country of Origin: ${t.COUNTRY_OF_ORIGIN}
Marital Status: ${t.MARITAL_STATUS}
Clinician: ${t.CLINICIAN_CREDENTIALS}
Interpreter: ${t.INTERPRETER}
Dates of Evaluation: ${t.EVAL_DATES}
Place of Evaluation: ${t.EVAL_LOCATION}
Report Date: ${t.REPORT_DATE}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CASE SUMMARY

${t.CASE_SUMMARY}
${t.KEY_QUOTE?`
${t.KEY_QUOTE}`:""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EVALUATION METHODS

For this clinical assessment, I met with ${t.MS_XXX} for the purposes of evaluating ${t.POSSESSIVE} psychological symptoms. 
Assessment tools included:
• The PTSD Checklist for DSM-5 (PCL-5) — Total: ${t.PCL5_TOTAL}/80 — ${t.PCL5_SEVERITY}
• The Patient Health Questionnaire-9 (PHQ-9) — Total: ${t.PHQ9_TOTAL}/27 — ${t.PHQ9_SEVERITY}
• The Generalized Anxiety Disorder-7 (GAD-7) — Total: ${t.GAD7_TOTAL}/21 — ${t.GAD7_SEVERITY}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TRAUMA HISTORY

Category: ${t.TRAUMA_CATEGORY}
Type of Abuse/Persecution: ${t.ABUSE_TYPE}

${t.TRAUMA_DESCRIPTION}

Perpetrator: ${t.PERPETRATOR}
Date(s) of Trauma: ${t.TRAUMA_DATES}
Physical Violence: ${t.PHYSICAL_VIOLENCE}
Sexual Violence: ${t.SEXUAL_VIOLENCE}
Police Involvement: ${t.POLICE_INVOLVEMENT}
${t.TRAUMA_QUOTE?`
Direct Quote: ${t.TRAUMA_QUOTE}`:""}

Decision to Leave: ${t.DECISION_TO_LEAVE}

Why ${t.MS_XXX} Cannot Return: ${t.WHY_CANT_RETURN}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PSYCHOLOGICAL FUNCTIONING — MENTAL STATUS EXAM

Appearance: ${t.APPEARANCE||"Not assessed"}
Eye Contact: ${t.EYE_CONTACT||"Not assessed"}
Speech: ${t.SPEECH||"Not assessed"}
Mood: ${t.MOOD||"Not assessed"}
Affect: ${t.AFFECT||"Not assessed"}
Thought Process: ${t.THOUGHT_PROCESS||"Not assessed"}
Orientation: ${t.ORIENTATION||"Not assessed"}
${t.MSE_NOTES?`
Additional Observations: ${t.MSE_NOTES}`:""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ASSESSMENT RESULTS

PHQ-9 Depression: ${t.PHQ9_TOTAL}/27 — ${t.PHQ9_SEVERITY}
GAD-7 Anxiety: ${t.GAD7_TOTAL}/21 — ${t.GAD7_SEVERITY}
PCL-5 PTSD: ${t.PCL5_TOTAL}/80 — ${t.PCL5_SEVERITY}
PTSD Threshold: ${t.PCL5_PTSD}
${l}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLINICAL IMPRESSION & DIAGNOSES

${t.CLINICAL_IMPRESSION}

Diagnoses:
${t.DIAGNOSES}

Credibility Assessment:
${t.CREDIBILITY}

Functional Impairment:
${t.FUNCTIONAL_IMPAIRMENT}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDATIONS

${t.RECOMMENDATIONS}

Risk Assessment: ${t.RISK_ASSESSMENT}

Prognosis: ${t.PROGNOSIS}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Respectfully submitted,

${t.CLINICIAN_NAME}, ${t.LICENSE_TYPE}
${t.REPORT_DATE}
`}async function m(e){let t=l(e),a=d(e,t),i="";try{let t=await s(e.id);t.length>0&&(i=`
        <div class="page-break"></div>
        <h2 style="font-size:16px;margin-bottom:16px;border-bottom:2px solid #333;padding-bottom:8px;">SUPPORTING IMAGES & DOCUMENTATION</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          ${t.filter(e=>"application/pdf"!==e.metadata.mimeType&&e.dataUrl.startsWith("data:image/")).map(e=>`
            <div style="text-align:center;">
              <img src="${e.dataUrl}" style="max-width:100%;max-height:300px;border:1px solid #ddd;border-radius:4px;" />
              <div style="font-size:10px;color:#666;margin-top:4px;">${r(e.metadata.filename)}</div>
            </div>
          `).join("")}
        </div>
      `)}catch(e){console.warn("[PDF] Failed to load photos for export:",e)}let o=window.open("","_blank");o?(o.document.write(`
    <!DOCTYPE html><html><head>
    <title>${r(e.clientInfo.fullName||"Evaluation")} - Psychological Evaluation</title>
    <style>
      * { box-sizing: border-box; }
      body { font-family: Georgia, 'Times New Roman', serif; max-width: 800px; margin: 40px auto; line-height: 1.7; color: #1a1a1a; font-size: 13px; }
      pre { white-space: pre-wrap; word-wrap: break-word; font-family: inherit; margin: 0; }
      .page-break { page-break-before: always; }
      @page { margin: 0.9in; size: letter; }
      @media print {
        body { margin: 0; max-width: none; }
        .no-print { display: none !important; }
      }
      img { max-width: 100%; height: auto; }
    </style></head><body>
    <pre>${r(a)}</pre>
    ${i}
    <script>
      window.onload = function() {
        setTimeout(function() { window.print(); }, 300);
        window.onafterprint = function() { window.close(); };
        // Fallback close for Safari
        setTimeout(function() { window.close(); }, 60000);
      };
    </script>
    </body></html>
  `),o.document.close()):alert("Please allow pop-ups to generate PDF. Go to Settings → Pop-ups and redirects → Allow for this site.")}e.s(["buildPDFHTML",0,function(e){let t=l(e),a=d(e,t);return`<!DOCTYPE html><html><head>
    <title>${r(e.clientInfo.fullName||"Evaluation")} - Psychological Evaluation</title>
    <style>
      body{font-family:Georgia,serif;max-width:800px;margin:40px auto;line-height:1.7;color:#1a1a1a;font-size:13px}
      pre{white-space:pre-wrap;font-family:inherit}
      @page{margin:1in;@bottom-center{content:"Page " counter(page) " of " counter(pages);font-size:9px;color:#999}}
      @media print{body{margin:0}}
      .page-break{page-break-before:always}
    </style>
    </head><body><pre>${r(a)}</pre></body></html>`},"buildReportText",0,d,"buildTemplateVars",0,l,"generateDOCX",0,E,"generateDOCXBlob",0,c,"generatePDF",0,m],88560)},29339,e=>{e.v(t=>Promise.all(["static/chunks/02sqjbepwp7uy.js","static/chunks/17o06plqlx2y7.js"].map(t=>e.l(t))).then(()=>t(52135)))},92729,e=>{e.v(t=>Promise.all(["static/chunks/02sqjbepwp7uy.js","static/chunks/02v0mdcm9l.9f.js"].map(t=>e.l(t))).then(()=>t(89788)))},42191,e=>{e.v(t=>Promise.all(["static/chunks/034470bgw0i-w.js"].map(t=>e.l(t))).then(()=>t(78631)))}]);