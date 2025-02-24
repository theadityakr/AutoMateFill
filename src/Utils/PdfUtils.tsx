// src/Utils/PdfUtils.tsx

import * as pdfjsLib from "pdfjs-dist";
import { ProfileItem } from "../Components/Data/Data";
import { ProfileSampleData } from "../Components/Data/ProfileSampleData"

// Import and set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();


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

    // Create a copy of the sample data structure
    const extractedData: ProfileItem[] = [...ProfileSampleData];
    // Extract and update values based on patterns
    const patterns = {
      fullName: /([A-Z][a-z]+ [A-Z][a-z]+)/,
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
      phone: /(?:\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,
      address: /(\d+\s+[\w\s]+(?:Street|Road|Ave|Avenue|Blvd|Boulevard|Ln|Lane))/i,
      city: /(?:in|at)\s+([A-Z][a-zA-Z\s]+)(?:,|\s+)/,
      state: /([A-Z]{2}|[A-Z][a-z]+)\s+\d{5}/,
      postCode: /\b\d{5}(?:-\d{4})?\b/,
      title: /(?:position|title|role):\s*([^,.\n]+)/i,
      currentCompany: /(?:at|with)\s+([A-Z][A-Za-z\s&]+)(?:,|\s+)/,
      experience: /(\d+)\+?\s*(?:years?|yrs?)(?:\s+of\s+experience)?/i,
      degree: /(?:Bachelor|Master|PhD|BSc|MSc|MBA|MD|BS|MS|BA|MA)[^\n]*/i,
      university: /(?:from|at)\s+([A-Z][A-Za-z\s&]+University)/,
      graduationYear: /(?:graduated|completion|class of|batch)\s*(?:of|in)?\s*(\d{4})/i,
      gpa: /GPA:?\s*([0-4]\.\d{1,2})/i,
      primarySkills: /(?:skills|expertise|proficient in):\s*([^.]+)/i,
      languages: /(?:programming languages|languages):\s*([^.]+)/i,
      frameworks: /(?:frameworks|technologies):\s*([^.]+)/i,
      databases: /(?:databases|db):\s*([^.]+)/i
    };

    // Update extracted values in the data structure
    for (const item of extractedData) {
      const pattern = patterns[item.label as keyof typeof patterns];
      if (pattern) {
        const match = fullText.match(pattern);
        if (match) {
          item.value = match[1] || match[0];
        }
      }
    }

    // Special handling for name parts
    const nameMatch = fullText.match(patterns.fullName);
    if (nameMatch) {
      const [firstName, lastName] = nameMatch[1].split(" ");
      extractedData.find(item => item.label === "firstName")!.value = firstName;
      extractedData.find(item => item.label === "lastName")!.value = lastName;
    }

    return extractedData;

  } catch (error: any) {
    console.error("Error processing PDF:", error);
    throw new Error(`Failed to process PDF file: ${error.message}`);
  }
}

// No need for mergeWithSampleData anymore since we're returning the correct format directly