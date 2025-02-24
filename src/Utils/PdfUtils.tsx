import * as pdfjsLib from "pdfjs-dist";
import { OpenAI } from 'openai';

import { ProfileItem } from "../Components/Data/Data";
import { ProfileSampleData } from "../Components/Data/ProfileSampleData"

// Import and set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const processWithAI = async (text: string): Promise<ProfileItem[]> => {
  try {
    const openai = new OpenAI({
      apiKey: '', 
      dangerouslyAllowBrowser: true 
    });

    const prompt = `
      Extract the following information from this resume and format it as a JSON array of objects with label, cmd, and value properties:
      - fullName (cmd: --n)
      - firstName (cmd: --fn)
      - lastName (cmd: --ln)
      - email (cmd: --e)
      - phone (cmd: --ph)
      - address (cmd: --addr)
      - address2 (cmd: --addr2)
      - city (cmd: --city)
      - state (cmd: --st)
      - country (cmd: --ctry)
      - postCode (cmd: --zip)
      - title (cmd: --title)
      - experience (cmd: --exp)
      - currentCompany (cmd: --comp)
      - linkedin (cmd: --li)
      - portfolio (cmd: --port)
      - degree (cmd: --deg)
      - major (cmd: --maj)
      - university (cmd: --uni)
      - graduationYear (cmd: --grad)
      - gpa (cmd: --gpa)
      - primarySkills (cmd: --skills)
      - languages (cmd: --lang)
      - frameworks (cmd: --fw)
      - databases (cmd: --db)
      - tools (cmd: --tools)
      - salary (cmd: --sal)
      - availability (cmd: --avail)
      - visaStatus (cmd: --visa)
      - referral (cmd: --ref)
      - coverLetter (cmd: --cover)
      - summary (cmd: --sum)

      Resume text:
      ${text}

      Return only the JSON array without any explanation.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Or your preferred model
      messages: [
        { role: 'system', content: 'You extract structured information from resumes.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || '';
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from AI response');
    }

    const profileData: ProfileItem[] = JSON.parse(jsonMatch[0]);
    return profileData;
  } catch (err) {
    console.error('Error processing with AI:', err);
    throw new Error('Failed to process resume with AI');
  }
};



export async function extractDataFromPDF(file: File): Promise<ProfileItem[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + " ";
    }

    const data = await processWithAI(fullText);
    return data;

  } catch (error: any) {
    console.error("Error processing PDF:", error);
    throw new Error(`Failed to process PDF file: ${error.message}`);
  }
}