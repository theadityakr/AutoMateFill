export interface FieldPatterns {
  [key: string]: string[];
}

export const fieldPatterns: FieldPatterns = {
  // Personal Information
  fullName: [
      'full name', 'fullname', 'full_name', 'complete name', 'full-name', 'name', 'applicant name', 'candidate name', '--n'
  ],
  firstName: [
      'first name', 'firstname', 'first_name', 'given name', 'given-name', 'first', 'forename', '--fn'
  ],
  lastName: [
      'last name', 'lastname', 'last_name', 'surname', 'family name', 'family-name', 'last', '--ln'
  ],
  email: [
      'email', 'e-mail', 'email_address', 'mail', 'email address', 'professional email', 'contact email', '--e'
  ],
  phone: [
      'phone', 'phone number', 'phone_number', 'phonenumber', 'telephone', 'mobile', 'contact number', 'cell', 'mobile number', '--ph'
  ],
  mobile: [
      'mobile', 'mobile phone', 'cell', 'cell phone', 'mobile number', '--mb'
  ],
  address: [
      'address', 'street address', 'street', 'residence', 'mailing address', 'current address', '--addr'
  ],
  address2: [
      'address2', 'address 2', 'address_2', 'street address line 2', 'apartment', 'suite', 'unit', 'apt', '--addr2'
  ],
  city: [
      'city', 'town', 'municipality', 'district', '--city'
  ],
  state: [
      'state', 'province', 'state/province', 'region', 'territory', '--st'
  ],
  country: [
      'country', 'nation', 'location', 'country of residence', '--ctry'
  ],
  postCode: [
      'post', 'postcode', 'zip', 'zipcode', 'postal code', 'post/zip code', '--zip'
  ],
  countryCode: [
      'country code', '--ctryc'
  ],

  // Professional Information
  currentTitle: [
      'job title', 'position title', 'current title', 'designation', 'role', 'current position', '--ctitle'
  ],
  currentCompany: [
      'current company', 'present company', 'employer', 'current employer', 'company name', '--ccomp'
  ],
  currentExperience: [
      'years of experience', 'experience', 'total experience', 'work experience', '--cexp'
  ],
  currentTechStack: [
      'tech stack', 'technology stack', 'tools used', '--ctech'
  ],
  linkedinUrl: [
      'linkedin', 'linkedin url', 'linkedin profile', '--li-url'
  ],
  portfolioUrl: [
      'portfolio', 'portfolio url', 'personal website', 'website', '--port-url'
  ],
  githubUrl: [
      'github', 'github url', 'github profile', '--github-url'
  ],
  
  // Education
  degree: [
      'degree', 'qualification', 'education level', 'academic degree', '--deg'
  ],
  college: [
      'college', 'school', 'institution', '--clg'
  ],
  major: [
      'major', 'field of study', 'specialization', '--maj'
  ],
  university: [
      'university', 'educational institution', '--uni'
  ],
  graduationYear: [
      'graduation year', 'year of graduation', 'completion year', '--grad'
  ],
  gpa: [
      'gpa', 'grade point average', 'academic score', '--gpa'
  ],

  // Skills and Expertise
  allSkills: [
      'all skills', 'all technical skills', '--allskills'
  ],
  primarySkills: [
      'primary skills', 'key skills', '--skills'
  ],
  languages: [
      'programming languages', 'coding languages', '--lang'
  ],
  backend: [
      'backend technologies', 'server-side development', '--bck'
  ],
  frontend: [
      'frontend technologies', 'client-side development', '--frnt'
  ],
  databases: [
      'database systems', 'db experience', '--db'
  ],
  frameworks: [
      'frameworks', 'libraries', '--fw'
  ],
  tools: [
      'development tools', 'software tools', '--tools'
  ],
  devOps: [
      'devops', 'infrastructure automation', '--devops'
  ],
  
  // Salary
  currentSalary: [
      'current salary', '--csal'
  ],
  expectedSalary: [
      'expected salary', '--esal'
  ],
  
  // Projects
  projectsList: [
      'list of projects', '--projl'
  ],
  project1Name: ['project 1 name', '--proj1n'],
  project1ghUrl: ['project 1 github url', '--proj1-gh'],
  project1DemoUrl: ['project 1 demo url', '--proj1-demo'],
  project1TechStack: ['project 1 tech stack', '--proj1-tech'],
  
  project2Name: ['project 2 name', '--proj2n'],
  project2ghUrl: ['project 2 github url', '--proj2-gh'],
  project2DemoUrl: ['project 2 demo url', '--proj2-demo'],
  project2TechStack: ['project 2 tech stack', '--proj2-tech'],
  
  project3Name: ['project 3 name', '--proj3n'],
  project3ghUrl: ['project 3 github url', '--proj3-gh'],
  project3DemoUrl: ['project 3 demo url', '--proj3-demo'],
  project3TechStack: ['project 3 tech stack', '--proj3-tech'],
  
  summary: [
      'summary', 'professional summary', 'career summary', '--sum'
  ]
};
