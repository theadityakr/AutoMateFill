import * as pdfjsLib from "pdfjs-dist";
import axios from "axios";

import { ProfileItem } from "../Components/Data/Data";


pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

async function fetchResumeData(resumeText: string, links: { text: string; url: string }[]) {
  const linksFormatted = JSON.stringify(links, null, 2);

  const apiUrl = "https://intuitai-openai.openai.azure.com/openai/deployments/a4i-chatbot4.1/chat/completions?api-version=2024-08-01-preview";

  const apiKey = ""; 
  const payload = {
    messages: [
      {
        role: "system",
        content: "You extract structured information from software development resumes."
      },
      {
        role: "user",
        content: `
        Extract the following information from this resume and format it as a JSON array of objects with label, cmd, and value properties:
        - fullName (cmd: --n)
        - firstName (cmd: --fn)
        - lastName (cmd: --ln)
        - address (cmd: --addr)
        - address2 (cmd: --addr2)
        - city (cmd: --city)
        - state (cmd: --st)
        - country (cmd: --ctry)
        - postCode (cmd: --zip)
        - email (cmd: --e)
        - countryCode (cmd --ctryc)
        - phone (cmd: --ph)
        - mobile (cmd: --mb)
        - linkedinUrl (cmd: --li-url)
        - portfolioUrl (cmd: --port-url)
        - githubUrl (cmd: --github-url)
        - degree (cmd: --deg)
        - college (cmd: --clg)
        - major (cmd: --maj)
        - university (cmd: --uni)
        - graduationYear (cmd: --grad)
        - gpa (cmd: --gpa)
        - allSkills (cmd: --allskills)
        - languages (cmd: --lang)
        - backend (cmd: --bck)
        - databases (cmd: --db)
        - frontent (cmd: --frnt)
        - frameworks (cmd: --fw)
        - tools (cmd: --tools)
        - devOps (cmd: --devops)
        - primarySkills (cmd: --skills)
        - currentTitle (cmd: --ctitle)
        - currentCompany (cmd: --ccomp)
        - currentExperience (cmd: --cexp)
        - currentTechStack (cmd: --ctech)
        - previousTitle.1 (cmd: --ptitle1)
        - previousCompany.1 (cmd: --pcomp1)
        - previousExperience.1 (cmd: --pexp1)
        - previousTechStack.1 (cmd: --ptech1)
        - previousTitle.2 (cmd: --ptitle2)
        - previousCompany.2 (cmd: --pcomp2)
        - previousExperience.2 (cmd: --pexp2)
        - previousTechStack.2 (cmd: --ptech2)
        - previousTitle.3 (cmd: --ptitle3)
        - previousCompany.3 (cmd: --pcomp3)
        - previousExperience.3 (cmd: --pexp3)
        - previousTechStack.3 (cmd: --ptech3)
        - currentSalary (cmd: --csal)
        - ExpectedSalary (cmd: --esal)
        - projectsList
        - project1Name (cmd: --proj1n)
        - project1ghUrl (cmd: --proj1-gh)
        - project1DemoUrl (cmd: --proj1-demo)
        - project1TechStack (cmd: --proj1-tech)
        - project2Name (cmd: --proj2n)
        - project2ghUrl (cmd: --proj2-gh)
        - project2DemoUrl (cmd: --proj2-demo)
        - project2TechStack (cmd: --proj2-tech)
        - project3Name (cmd: --proj3n)
        - project3ghUrl (cmd: --proj3-gh)
        - project3DemoUrl (cmd: --proj3-demo)
        - project3TechStack (cmd: --proj3-tech)
        - summary (cmd: --sum)

        Resume text:
        ${resumeText}

        Resume hyperLinks:
        ${linksFormatted}

        Return only the JSON array without any explanation.
        `
      }
    ],
    temperature: 0.7
  };

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      }
    });

    const rawContent = response.data?.choices?.[0]?.message?.content;
    if (!rawContent) {
      throw new Error("No content found in response.");
    }

    // Extract JSON from code block if present
    const jsonMatch = rawContent.match(/```json\n([\s\S]*?)\n```/);
    const jsonData = jsonMatch ? jsonMatch[1] : rawContent;

    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error processing resume data:", error);
    return null;
  }
}

export async function extractDataFromPDF(file: File): Promise<ProfileItem[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = '';
    let links: { text: string; url: string }[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + " ";

      const annotations = await page.getAnnotations();
      annotations.forEach((annotation: any) => {
        if (annotation.subtype === 'Link' && annotation.url) {
          links.push({ text: annotation.title || annotation.url, url: annotation.url });
        }
      });
    }
    return await fetchResumeData(fullText, links);

  } catch (error: any) {
    console.error("Error processing PDF:", error);
    throw new Error(`Failed to process PDF file: ${error.message}`);
  }
}
