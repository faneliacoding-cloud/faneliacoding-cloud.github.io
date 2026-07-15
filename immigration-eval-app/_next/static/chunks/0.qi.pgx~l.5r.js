(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88560,e=>{"use strict";var t=e.i(99833);function i(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function n(e,t){return e?.trim()||t}function a(e){let t={"She/Her":{subject:"she",object:"her",possessive:"her",reflexive:"herself",title:"Ms."},"He/Him":{subject:"he",object:"him",possessive:"his",reflexive:"himself",title:"Mr."},"They/Them":{subject:"they",object:"them",possessive:"their",reflexive:"themselves",title:"Mx."},Other:{subject:"they",object:"them",possessive:"their",reflexive:"themselves",title:""}};return t[e]||t["She/Her"]}let o=["Little interest or pleasure in doing things","Feeling down, depressed, or hopeless","Trouble falling or staying asleep, or sleeping too much","Feeling tired or having little energy","Poor appetite or overeating","Feeling bad about yourself, that you are a failure or have let yourself or family down","Trouble concentrating on things, such as reading the newspaper or watching television","Moving or speaking so slowly that other people could have noticed","Thoughts that you would be better off dead or hurting yourself in some way"],r=["not at all","several days","more than half the days","nearly every day"],s=[{max:4,label:"none-minimal"},{max:9,label:"mild"},{max:14,label:"moderate"},{max:19,label:"moderately severe"},{max:27,label:"severe"}],l=["Feeling nervous, anxious, or on edge","Not being able to stop or control worrying","Worrying too much about different things","Trouble relaxing","Being so restless that it is hard to sit still","Becoming easily annoyed or irritable","Feeling afraid as if something awful might happen"],c=["not at all","several days","more than half the days","nearly every day"],h=[{max:4,label:"none-minimal"},{max:9,label:"mild"},{max:14,label:"moderate"},{max:21,label:"severe"}],m=["Repeated, disturbing, and unwanted memories of the stressful experience","Repeated, disturbing dreams of the stressful experience","Suddenly feeling or acting as if the stressful experience were actually happening again","Feeling very upset when reminded of the stressful experience","Having strong physical reactions when reminded of the stressful experience","Avoiding memories, thoughts, or feelings related to the stressful experience","Avoiding external reminders of the stressful experience","Trouble remembering important parts of the stressful experience","Having strong negative beliefs about yourself, other people, or the world","Blaming yourself for the stressful experience or what happened after it","Having strong negative feelings such as fear, horror, anger, guilt, or shame","Loss of interest in activities that were once enjoyable","Feeling distant or cut off from other people","Trouble experiencing positive feelings","Irritable behavior, angry outbursts, or acting aggressively","Taking too many risks or doing things that could cause you harm",'Being "superalert" or watchful or on guard',"Feeling jumpy or easily startled","Having difficulty concentrating","Trouble falling or staying asleep"],u=["not at all","a little bit","moderately","quite a bit","extremely"];function d(e){return e.filter(e=>e>=0).reduce((e,t)=>e+t,0)}function g(e,t){for(let i of t)if(e<=i.max)return i.label;return t[t.length-1].label}function p(e,t,i,n,a){let o=new Map;e.forEach((e,i)=>{if(e<0)return;let n=o.get(e)||[];n.push(`${i+1}) ${t[i]}`),o.set(e,n)});let r="";for(let e=a;e>=0;e--){let s=o.get(e);if(!s||0===s.length)continue;let l=i[e]||`level ${e}`;e===a?r+=`${n} scaled the following ${s.length} out of ${t.length} symptoms at the most severe level, indicating that they bother ${n.split(" ").pop()?.toLowerCase()==="xxx"?"them":n.includes("Ms.")?"her":n.includes("Mr.")?"him":"them"} "${l}" in ${n.includes("Ms.")?"her":n.includes("Mr.")?"his":"their"} day-to-day functioning:
`:e===a-1?r+=`
${n.includes("Ms.")?"She":n.includes("Mr.")?"He":"They"} scaled the following ${s.length} out of ${t.length} symptoms at the next most severe level, indicating that they bother ${n.includes("Ms.")?"her":n.includes("Mr.")?"him":"them"} "${l}" in ${n.includes("Ms.")?"her":n.includes("Mr.")?"his":"their"} day-to-day functioning:
`:e>0?r+=`
${n.includes("Ms.")?"She":n.includes("Mr.")?"He":"They"} scaled the following ${s.length} out of ${t.length} symptoms at ${e===a-2?"the third most severe":"a lower"} level, indicating that they bother ${n.includes("Ms.")?"her":n.includes("Mr.")?"him":"them"} "${l}" in ${n.includes("Ms.")?"her":n.includes("Mr.")?"his":"their"} day-to-day functioning:
`:r+=`
The following ${s.length} symptoms ${n.includes("Ms.")?"she":n.includes("Mr.")?"he":"they"} experience${n.includes("They")?"":"s"} "${l}":
`,s.forEach(e=>{r+=`${e} `}),r+="\n"}return r}function f(e){let i,f,y=e.client,$=e.sections?.step01||{};e.sections?.step02;let v=e.sections?.step03||{},w=e.sections?.step04||{},b=e.sections?.step05||{},S=e.sections?.step06||{},A=e.sections?.step07||{},T=e.sections?.step08||{},_=e.sections?.step10||{},C=a(y.pronouns),D=(i=a(y.pronouns),f=y.fullName?.split(" ").pop()||"XXX",i.title?`${i.title} ${f}`:f),x=y.fullName||"[Client Name]",I=C.subject.charAt(0).toUpperCase()+C.subject.slice(1),N=C.subject,R=C.object,P=C.possessive,E=C.possessive.charAt(0).toUpperCase()+C.possessive.slice(1);C.reflexive;let O=y.countryOfOrigin||"CountryXXX",L=t.CASE_TYPE_CONFIG[e.caseType]?.label||e.caseType,M=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),k=S.phq9Scores||Array(9).fill(-1),F=S.gad7Scores||Array(7).fill(-1),H=S.pcl5Scores||Array(20).fill(-1),U=d(k),B=d(F),j=d(H),G=g(U,s),z=g(B,h),q=T.diagnoses||[],X=q.length>0?q.map(e=>`${e}  ${t.DIAGNOSIS_LABELS[e]||e}`).join("\n"):"[No diagnoses selected]",Y="";Y+=`CLINICAL PSYCHOLOGICAL EVALUATION
${n($.clinicianName,"[Clinician Name]")}, ${n($.clinicianCredentials,"[Credentials]")}
${n($.clinicianLicense,"[License]")}


RE: ${x}
Date of Birth: ${n(y.dateOfBirth,"[DOB]")} (${n(y.age,"[Age]")} years old)
Gender: ${n(y.gender,"[Gender]")}
Nationality: ${n(y.nationality,"[Nationality]")}
Country of Origin: ${O}
Marital Status: ${n(y.maritalStatus,"[Marital Status]")}
Number of Children: ${n(y.numberOfChildren,"0")}
A-Number: ${n(y.aNumber,"[A-Number]")}
Referring Attorney: ${n(y.referringAttorney,"[Attorney]")}
Referral Source: ${n($.referralSource,"[Referral Source]")}
Dates of Evaluation: ${n($.evaluationDates,"[Evaluation Dates]")}
Location of Evaluation: ${n($.evaluationLocation,"[Location]")}
Interpreter: ${$.interpreterUsed?`Yes — ${n($.interpreterLanguage,"[Language]")}`:"Not required"}
Date of Report: ${M}


`,$.clinicianBio&&(Y+=`EVALUATOR QUALIFICATIONS

${$.clinicianBio}

`),Y+=`REFERRAL AND PURPOSE OF EVALUATION

${D} is a ${n(y.age,"[age]")}-year-old ${n(y.nationality,"[nationality]")} ${y.gender?.toLowerCase()||"individual"} who was referred for a clinical psychological evaluation by ${n(y.referringAttorney,P+" attorney")} in connection with ${P} ${L} case. The purpose of this evaluation is to assess ${D}'s current psychological functioning, document ${P} trauma history, and provide a clinical opinion regarding the psychological impact of the events ${N} experienced.

I met with ${D} on ${n($.evaluationDates,"[dates]")}${$.evaluationLocation?` at ${$.evaluationLocation}`:""}.${$.interpreterUsed?` The interview was conducted with the assistance of a ${n($.interpreterLanguage,"[language]")} interpreter.`:""} During this evaluation, I conducted a thorough clinical interview and administered the following standardized assessment instruments:

• PTSD Checklist for DSM-5 (PCL-5)
• Patient Health Questionnaire-9 (PHQ-9)
• Generalized Anxiety Disorder-7 (GAD-7)

Please note that I am not ${D}'s therapist, and I only met with ${R} for this clinical evaluation. I met with ${R} as an impartial, objective assessor, and I have no vested interest in the outcome of ${P} legal proceedings.


HISTORY

Early Life

`,v.personalHistory&&(Y+=`${v.personalHistory}

`),v.familyBackground&&(Y+=`${v.familyBackground}

`),v.educationHistory&&(Y+=`${v.educationHistory}

`),v.employmentHistory&&(Y+=`${v.employmentHistory}

`),v.relationshipHistory&&(Y+=`${v.relationshipHistory}

`),v.childrenInfo&&(Y+=`${v.childrenInfo}

`),(w.immigrationHistory||w.dateOfArrival||w.mannerOfEntry||w.reasonForFleeing)&&(Y+=`Immigration History

`,w.immigrationHistory&&(Y+=`${w.immigrationHistory}

`),w.dateOfArrival&&(Y+=`Date of Arrival: ${w.dateOfArrival}
`),w.mannerOfEntry&&(Y+=`Manner of Entry: ${w.mannerOfEntry}
`),w.currentStatus&&(Y+=`Current Immigration Status: ${w.currentStatus}
`),w.previousApplications&&(Y+=`Previous Applications: ${w.previousApplications}
`),Y+="\n",w.reasonForFleeing&&(Y+=`Reason for Fleeing: ${w.reasonForFleeing}

`)),Y+=`TRAUMA EXPERIENCED

`,b.traumaCategory&&(Y+=`Trauma Category: ${b.traumaCategory}

`),b.traumaNarrative&&(Y+=`During the interviews, ${D} shared the following:

${b.traumaNarrative}

`),b.perpetratorInfo&&(Y+=`Perpetrator Information: ${b.perpetratorInfo}

`),b.frequencyDuration&&(Y+=`Frequency/Duration: ${b.frequencyDuration}

`),void 0!==b.reportedToAuthorities&&(Y+=`Reported to Authorities: ${b.reportedToAuthorities?"Yes":"No"}
`,b.authoritiesResponse&&(Y+=`Authorities Response: ${b.authoritiesResponse}
`),Y+="\n"),(b.whyCantReturn||b.ongoingThreats)&&(Y+=`Fears About Returning to ${O}

`,b.whyCantReturn&&(Y+=`${b.whyCantReturn}

`),b.ongoingThreats&&(Y+=`Ongoing Threats: ${b.ongoingThreats}

`)),Y+=`PSYCHOLOGICAL FUNCTIONING

Mental Status Exam

`;let Q=[];A.appearance&&Q.push(A.appearance),A.behavior&&Q.push(A.behavior),A.speech&&Q.push(`${E} speech was ${A.speech.toLowerCase()}.`),A.mood&&Q.push(`${E} mood appeared ${A.mood.toLowerCase()}.`),A.affect&&Q.push(`${E} affect was ${A.affect.toLowerCase()}.`),A.thoughtProcess&&Q.push(`Thought process: ${A.thoughtProcess}.`),A.thoughtContent&&Q.push(`Thought content: ${A.thoughtContent}.`),A.perceptions&&Q.push(`Perceptions: ${A.perceptions}.`),A.cognition&&Q.push(`Cognition: ${A.cognition}.`),A.insight&&Q.push(`Insight: ${A.insight}.`),A.judgment&&Q.push(`Judgment: ${A.judgment}.`),A.rapport&&Q.push(`Rapport: ${A.rapport}.`),Q.length>0?Y+=Q.join(" ")+"\n\n":Y+=`${D} is a ${n(y.age,"[age]")}-year-old self-identified ${y.gender?.toLowerCase()||"individual"} who arrived at the appointment on time and was neatly groomed. ${I} was oriented to person, place, time, and situation. There was no evidence of impaired thought process, and ${N} did not appear to respond to internal stimuli or exhibit other symptoms indicative of psychosis.

`,Y+=`Current Psychological Symptoms

`,S.currentSymptoms&&(Y+=`${S.currentSymptoms}

`),S.sleepDisturbances&&(Y+=`Sleep: ${S.sleepDisturbances}

`),S.appetiteChanges&&(Y+=`Appetite: ${S.appetiteChanges}

`),S.concentrationDifficulties&&(Y+=`Concentration: ${S.concentrationDifficulties}

`),S.emotionalRegulation&&(Y+=`Emotional Regulation: ${S.emotionalRegulation}

`),S.avoidanceBehaviors&&(Y+=`Avoidance: ${S.avoidanceBehaviors}

`),S.hypervigilance&&(Y+=`Hypervigilance: ${S.hypervigilance}

`),S.flashbacksNightmares&&(Y+=`Flashbacks/Nightmares: ${S.flashbacksNightmares}

`),S.suicidalIdeation&&(Y+=`Suicidal Ideation: ${S.suicidalIdeation}

`),S.selfHarm&&(Y+=`Self-Harm: ${S.selfHarm}

`),S.substanceUse&&(Y+=`Substance Use: ${S.substanceUse}

`),S.functionalImpairment&&(Y+=`Functional Impairment: ${S.functionalImpairment}

`),Y+=`Diagnostic Findings

${D}'s symptoms meet criteria for the following DSM-5 psychological disorders:

${X}

`,T.diagnosticRationale&&(Y+=`Diagnostic Rationale: ${T.diagnosticRationale}

`),T.differentialDiagnosis&&(Y+=`Differential Diagnosis: ${T.differentialDiagnosis}

`),T.ruleOutConditions&&(Y+=`Rule-Out Conditions: ${T.ruleOutConditions}

`),T.severityLevel&&"none"!==T.severityLevel&&(Y+=`Severity: ${T.severityLevel}

`),T.prognosticFactors&&(Y+=`Prognostic Factors: ${T.prognosticFactors}

`),A.credibilityAssessment&&(Y+=`CREDIBILITY OF ${D.toUpperCase()}'S ACCOUNT

${A.credibilityAssessment}

`),Y+=`FINDINGS

After thorough assessment including clinical interview${U>0||B>0||j>0?" and review of three self-assessment scales":""}, I have concluded the following:

${D} is a reliable reporter, and ${P} account is highly credible.

${E} current psychological symptoms include ${S.currentSymptoms?S.currentSymptoms.substring(0,200)+(S.currentSymptoms.length>200?"...":""):"[symptoms summary]"}. ${I} ${q.length>0?"fully meets":"may meet"} criteria for the following psychological disorder(s):

${X}

`,_.clinicalImpression&&(Y+=`${_.clinicalImpression}

`),Y+=`${D}'s psychological distress has resulted primarily from the trauma ${N} suffered and ${P} fear of returning to ${O}.

Due to ${D}'s traumatic experiences, ${P} psychological functioning has been compromised. If faced with significant stressors, ${N} is at high risk of worsening symptoms which could necessitate a higher level of care.

RECOMMENDATIONS

To improve symptoms and functioning, I recommend that:

${D} be allowed to remain in the United States to reduce ${P} fear of persecution and improve ${P} psychological functioning and well-being.

`,_.treatmentRecommendations&&(Y+=`${_.treatmentRecommendations}

`),_.recommendations&&(Y+=`${_.recommendations}

`),_.returnRisk&&(Y+=`Return Risk: ${_.returnRisk}

`),_.finalStatement?Y+=`${_.finalStatement}

`:Y+=`${D}'s personal strengths and resiliency are substantial. If allowed to remain in the safety of the United States, it is likely that ${P} symptoms and functioning will significantly improve, allowing ${R} to continue making contributions to ${P} family and community.

`,_.riskAssessment&&(Y+=`Risk Assessment: ${_.riskAssessment}

`),_.prognosticStatement&&(Y+=`Prognosis: ${_.prognosticStatement}

`),Y+=`________________________________________________________

${n($.clinicianName,"[NAME]")}, ${n($.clinicianCredentials,"[LICENSE]")}
${M}
${n($.clinicianLicense,"[License State and Number]")}


`;let V=k.some(e=>e>=0)||F.some(e=>e>=0)||H.some(e=>e>=0);return V&&(Y+=`ADDENDUM 1: SELF-ASSESSMENT SCALES

`,H.some(e=>e>=0)&&(Y+=`1) PTSD Checklist for DSM-5 (PCL-5)

The first scale completed by ${D} was the PCL-5, which was developed by the National Center for PTSD to assess individuals who experience traumatic events. Here, the respondent rates the severity of 20 different trauma-related symptoms. ${D} was asked to scale to what degree each symptom disturbed or impaired ${R} over the past month. Symptoms are rated from 0 to 4, with 0 indicating "not at all," 1 indicating "a little bit," 2 indicating "moderately," 3 indicating "quite a bit," and 4 indicating "extremely."

${p(H,m,u,D,4)}
Scoring: To interpret the results, a total symptom severity score (range 0–80) can be obtained by adding the scores for each of the 20 items. A score of 33 or higher indicates that the individual may suffer from a trauma or stress-related disorder such as PTSD. ${D} scored ${j} out of 80${j>=33?", which meets the threshold for a probable PTSD diagnosis":""}.

`),k.some(e=>e>=0)&&(Y+=`2) Patient Health Questionnaire-9 (PHQ-9)

The second scale completed was the PHQ-9, which assesses depression. On this assessment, the individual rates the frequency of symptoms experienced over the past two weeks. Symptoms are rated from 0 to 3, with 0 indicating "not at all," 1 indicating "several days," 2 indicating "more than half the days," and 3 indicating "nearly every day."

${p(k,o,r,D,3)}
Scoring: 0–4 (none-minimal); 5–9 (mild); 10–14 (moderate); 15–19 (moderately severe); 20–27 (severe). ${D}'s score of ${U} out of 27 indicates that ${N} is suffering from ${G} depression.

`),F.some(e=>e>=0)&&(Y+=`3) Generalized Anxiety Disorder-7 Item Scale (GAD-7)

The third scale completed was the GAD-7. On this assessment, the individual is asked to rate the frequency of symptoms experienced over the past two weeks. Symptoms are rated from 0 to 3, with 0 indicating "not at all," 1 indicating "several days," 2 indicating "more than half the days," and 3 indicating "nearly every day."

${p(F,l,c,D,3)}
Scoring: 0–4 (none-minimal); 5–9 (mild); 10–14 (moderate); 15–21 (severe). ${D}'s score of ${B} out of 21 indicates that ${N} is suffering from ${z} anxiety.

`)),Y+=`ADDENDUM ${V?"2":"1"}: IMPACT OF TRAUMA ON MEMORY

Due to the impact of trauma on memory and thinking, it is common for trauma victims to have trouble remembering specific details and chronology of past traumatic events. This is known as the "faulty nature of traumatic recall." It should be noted that these difficulties with thinking and memory generally worsen when the individual is in psychological distress, such as when testifying in court or being questioned by an authority figure. In this kind of high-pressure situation, it is quite common for trauma victims to seem confused or make mistakes about the details and chronology of past events. By no means does this necessarily indicate that a client is malingering. Paradoxically, this confusion could actually point to the authenticity of their accounts of past trauma.
`}async function y(e){let t=f(e),n=e.client?.fullName||"Evaluation",a=n.replace(/[^a-zA-Z0-9_\s-]/g,"_"),o=`${a}_Psych_Eval_${new Date().toISOString().split("T")[0]}.docx`;return{blob:new Blob([`
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${i(n)} - Clinical Psychological Evaluation</title>
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
  body {
    font-family: 'Times New Roman', Georgia, serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #1a1a1a;
    margin: 1in;
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: 'Times New Roman', Georgia, serif;
    font-size: 12pt;
    margin: 0;
    line-height: 1.5;
  }
  @page {
    size: letter;
    margin: 1in;
  }
  @page Section1 {
    mso-header-margin: .5in;
    mso-footer-margin: .5in;
  }
  div.Section1 { page: Section1; }
</style>
</head>
<body>
<div class="Section1">
<pre>${i(t)}</pre>
</div>
</body>
</html>`],{type:"application/msword"}),filename:o.replace(".docx",".doc")}}async function $(t){let{blob:i,filename:n}=await y(t),{saveAs:a}=await e.A(42191);a(i,n)}function v(e){let t=f(e),n=e.client?.fullName||"Evaluation";return`<!DOCTYPE html><html><head>
    <title>${i(n)} - Clinical Psychological Evaluation</title>
    <style>
      body{font-family:Georgia,'Times New Roman',serif;max-width:800px;margin:40px auto;line-height:1.6;color:#1a1a1a;font-size:13px}
      pre{white-space:pre-wrap;word-wrap:break-word;font-family:inherit;font-size:13px;margin:0;line-height:1.6}
      @page{margin:1in;size:letter;@bottom-center{content:"Page " counter(page) " of " counter(pages);font-size:9px;color:#999}}
      @media print{body{margin:0;max-width:none}}
      .page-break{page-break-before:always}
    </style>
    </head><body><pre>${i(t)}</pre></body></html>`}async function w(e){let t=v(e),i=window.open("","_blank");i?(i.document.write(t),i.document.close(),i.onload=function(){setTimeout(function(){i.print()},300),i.onafterprint=function(){i.close()},setTimeout(function(){i.close()},6e4)}):alert("Please allow pop-ups to generate PDF. Go to Settings → Pop-ups and redirects → Allow for this site.")}function b(e){let t="";for(let i=0;i<e.length;i++){let n=e.charCodeAt(i);"\\"===e[i]?t+="\\\\":"{"===e[i]?t+="\\{":"}"===e[i]?t+="\\}":"\n"===e[i]?t+="\\par\n":n>127?t+=`\\u${n}?`:t+=e[i]}return t}async function S(t){let i=f(t),n=t.client?.fullName||"Evaluation",a=n.replace(/[^a-zA-Z0-9_\s-]/g,"_"),o=`${a}_Psych_Eval_${new Date().toISOString().split("T")[0]}.rtf`,r=b(i),s=new Blob([`{\\rtf1\\ansi\\ansicpg1252\\cocoartf2761
{\\fonttbl\\f0\\froman\\fcharset0 TimesNewRomanPSMT;\\f1\\froman\\fcharset0 TimesNewRomanPS-BoldMT;}
{\\colortbl;\\red0\\green0\\blue0;\\red26\\green26\\blue26;}
{\\info{\\title ${b(n)} - Clinical Psychological Evaluation}}
\\paperw12240\\paperh15840\\margl1440\\margr1440\\margt1440\\margb1440
\\vieww12240\\viewh15840\\viewkind1
\\pard\\ri0\\sl360\\slmult1\\pardirnatural
\\f0\\fs24\\cf2 ${r}
}`],{type:"application/rtf"}),{saveAs:l}=await e.A(42191);l(s,o)}e.s(["buildPDFHTML",0,v,"buildReportText",0,f,"generateDOCX",0,$,"generateDOCXBlob",0,y,"generatePDF",0,w,"generatePages",0,S])},42191,e=>{e.v(t=>Promise.all(["static/chunks/034470bgw0i-w.js"].map(t=>e.l(t))).then(()=>t(78631)))}]);