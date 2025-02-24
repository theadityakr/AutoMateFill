export interface FieldPatterns {
    [key: string]: string[];
  }

  export const fieldPatterns: FieldPatterns = {
    // Personal Information
    fullName: [
      'full name',
      'fullname',
      'complete name',
      'full-name',
      'name',
      'applicant name',
      'candidate name'
    ],
    firstName: [
      'first name',
      'firstname',
      'given name',
      'first',
      'forename'
    ],
    lastName: [
      'last name',
      'lastname',
      'surname',
      'family name',
      'last'
    ],
    email: [
      'email',
      'e-mail',
      'mail',
      'email address',
      'professional email',
      'contact email'
    ],
    phone: [
      'phone',
      'phone number',
      'telephone',
      'mobile',
      'contact number',
      'cell',
      'mobile number'
    ],
    address: [
      'address',
      'street address',
      'street',
      'residence',
      'mailing address',
      'current address'
    ],
    address2: [
      'address2',
      'address 2',
      'street address line 2',
      'apartment',
      'suite',
      'unit',
      'apt'
    ],
    city: [
      'city',
      'town',
      'municipality',
      'district'
    ],
    state: [
      'state',
      'province',
      'state/province',
      'region',
      'territory'
    ],
    country: [
      'country',
      'nation',
      'location',
      'country of residence'
    ],
    postCode: [
      'post',
      'postcode',
      'zip',
      'zipcode',
      'postal code',
      'post/zip code'
    ],
  
    // Professional Information
    title: [
      'job title',
      'position title',
      'current title',
      'designation',
      'role',
      'current position'
    ],
    experience: [
      'years of experience',
      'experience',
      'total experience',
      'work experience',
      'years in field',
      'professional experience'
    ],
    currentCompany: [
      'current company',
      'present company',
      'employer',
      'current employer',
      'company name'
    ],
    linkedin: [
      'linkedin',
      'linkedin url',
      'linkedin profile',
      'professional profile',
      'social profile'
    ],
    portfolio: [
      'portfolio',
      'portfolio url',
      'personal website',
      'website',
      'portfolio link',
      'github',
      'github profile',
      'project repository'
    ],
  
    // Education
    degree: [
      'degree',
      'qualification',
      'education level',
      'academic degree',
      'highest degree',
      'degree name'
    ],
    major: [
      'major',
      'field of study',
      'specialization',
      'concentration',
      'discipline',
      'course'
    ],
    university: [
      'university',
      'college',
      'school',
      'institution',
      'educational institution',
      'alma mater'
    ],
    graduationYear: [
      'graduation year',
      'year of graduation',
      'completion year',
      'graduate date',
      'graduation date',
      'year completed'
    ],
    gpa: [
      'gpa',
      'grade point average',
      'academic score',
      'grade',
      'cgpa',
      'academic performance'
    ],
  
    // Skills and Expertise
    primarySkills: [
      'primary skills',
      'key skills',
      'main skills',
      'core skills',
      'technical skills',
      'programming languages'
    ],
    languages: [
      'programming languages',
      'languages',
      'coding languages',
      'development languages',
      'tech stack',
      'programming stack'
    ],
    frameworks: [
      'frameworks',
      'libraries',
      'tech frameworks',
      'development frameworks',
      'software frameworks',
      'development tools'
    ],
    databases: [
      'databases',
      'database systems',
      'db experience',
      'database technologies',
      'data storage'
    ],
    tools: [
      'tools',
      'development tools',
      'software tools',
      'tech tools',
      'development environment',
      'ide'
    ],
  
    // Additional Information
    salary: [
      'expected salary',
      'salary expectation',
      'desired salary',
      'salary requirement',
      'compensation expectation',
      'annual salary'
    ],
    availability: [
      'availability',
      'start date',
      'joining date',
      'notice period',
      'available from',
      'earliest start date'
    ],
    visaStatus: [
      'visa status',
      'work authorization',
      'employment eligibility',
      'work permit',
      'immigration status',
      'right to work'
    ],
    referral: [
      'referral',
      'reference',
      'referred by',
      'how did you hear',
      'source',
      'application source'
    ],
    coverLetter: [
      'cover letter',
      'application letter',
      'personal statement',
      'statement of interest',
      'introduction letter',
      'motivation'
    ],
    summary: [
      'summary',
      'professional summary',
      'career objective',
      'objective',
      'profile summary',
      'about me'
    ]
  };