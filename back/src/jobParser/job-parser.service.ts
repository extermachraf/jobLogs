import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Validator } from 'jsonschema';

export interface CompanyDetails {
  /** The full legal name of the company */
  name: string;
  /** Brief description of the company's business */
  description: string | null;
  /** Primary office location (e.g., "Casablanca et périphérie") */
  location: string;
  /** Employee count range (e.g., "51-200 employés") */
  size: string | null;
}

export interface JobDetails {
  /** Job title (e.g., "Développeur web Node JS") */
  title: string;
  /** Employment type (e.g., "CDI", "Temps plein") */
  employmentType: string | null;
  /** Required experience (e.g., "2 ans et plus") */
  experience: string | null;
  /** Full job description */
  description: string | null;
  /** Key responsibilities */
  responsibilities: string | null;
  /** Candidate requirements */
  requirements: string | null;
  /** Technical skills required */
  skills: string[];
  /** Salary range or description (e.g., "Rémunération selon profil") */
  salary: string | null;
  /** Indicates if remote work is available */
  remote: boolean;
}

export interface JobPosting {
  /** Detailed company information */
  company: CompanyDetails;

  /** Detailed job information */
  job: JobDetails;
}

@Injectable()
export class JobParserService {
  private readonly logger = new Logger(JobParserService.name);
  private readonly apiUrl: string;
  private readonly modelName: string;

  // JSON Schema validation

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>(
      'OLLAMA_API_URL',
      'http://localhost:11434/api/generate',
    );
    this.modelName = this.configService.get<string>(
      'JOB_PARSER_MODEL',
      'gemma3:1b',
    );

    // Log configuration on startup
    this.logger.log(
      `JobParserService initialized with API URL: ${this.apiUrl}`,
    );
    this.logger.log(`Using model: ${this.modelName}`);
  }

  async parseJob(description: string): Promise<any> {
    if (!description) {
      throw new Error('Job description is empty');
    }

    this.logger.log('Starting job parsing process');
    this.logger.verbose(
      `Input description length: ${description.length} characters`,
    );

    const sanitizedDescription = description;

    // Check if we're using the right API format
    console.log(`API URL: ${this.apiUrl}, Model Name: ${this.modelName}`);
    const isGenerateEndpoint = this.apiUrl.includes('/api/generate');
    const isChatEndpoint = this.apiUrl.includes('/api/chat');
    this.logger.log(
      `Endpoint type detected: ${isGenerateEndpoint ? 'generate' : isChatEndpoint ? 'chat' : 'unknown'}`,
    );

    const systemPrompt = `You are a job posting parser. Follow these rules:
1. Always return valid JSON without Markdown
2. Use null for missing fields
3. Escape special characters in text fields
4. Arrays must use JSON array syntax
5. Dates must be ISO 8601 format
6. Booleans must be true/false`;

    const userPrompt = `Extract job details in this JSON format:

{
  "company": {
    "name": "Example Corp",
    "description": null,
    "location": "City, Country",
    "size": null,
    "specialties": ["Specialty1", "Specialty2"],
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "job": {
    "title": "Job Title",
    "location": "City, Country",
    "employmentType": "Full-time",
    "experience": null,
    "description": "description of the job",
    "skills": ["Skill1", "Skill2"],
    "salary": null,
    "remote": false,
    "postedAt": "2023-01-01T00:00:00.000Z",
  }
}

Job Offer Content:
${sanitizedDescription}`;

    let payload;
    if (isGenerateEndpoint) {
      // Format for /api/generate endpoint
      payload = {
        model: this.modelName,
        prompt: `${systemPrompt}${userPrompt}`,
        format: 'json',
        stream: false,
      };
    }

    this.logger.verbose(
      `Request payload structure: ${JSON.stringify(payload, null, 2).substring(0, 500)}...`,
    );

    try {
      this.logger.log('Sending request to Ollama API');
      const response = await firstValueFrom(
        this.httpService.post(this.apiUrl, payload, {
          headers: { 'Content-Type': 'application/json' },
        }),
      );

      this.logger.log('Received response from Ollama API');
      this.logger.verbose(
        `Response structure: ${JSON.stringify(Object.keys(response.data))}`,
      );

      // Handle the response based on the API format
      let rawContent;
      if (response.data.message && response.data.message.content) {
        // Chat API format
        rawContent = response.data.message.content;
        this.logger.log('Extracted content from chat API response');
      } else if (response.data.response) {
        // Generate API format
        rawContent = response.data.response;
        this.logger.log('Extracted content from generate API response');
      } else {
        // Try to find any JSON-like content in the response
        const stringifiedResponse = JSON.stringify(response.data);
        this.logger.error(
          `Unexpected API response format: ${stringifiedResponse.substring(0, 300)}...`,
        );
        throw new Error(
          'Unexpected API response format: could not find content in response',
        );
      }

      try {
        this.logger.log('Attempting to parse JSON response');
        const parsedData = JSON.parse(rawContent);
        return parsedData;
      } catch (parseError) {
        this.logger.error('JSON parsing failed', {
          cleanedContent: rawContent.substring(0, 500),
          error: parseError.message,
        });
        throw new Error(
          `Invalid JSON response from model: ${parseError.message}`,
        );
      }
    } catch (error) {
      if (error.response) {
        // Handle HTTP errors with response
        this.logger.error('API request failed', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });

        if (error.response.status === 404) {
          throw new Error(
            `Model "${this.modelName}" not found. Make sure to pull it with 'ollama pull ${this.modelName}'`,
          );
        } else {
          throw new Error(
            `API request failed: ${error.response.status} ${error.response.statusText}`,
          );
        }
      } else if (error.code === 'ECONNREFUSED') {
        this.logger.error('Connection to Ollama API failed', {
          code: error.code,
          address: error.address,
          port: error.port,
        });
        throw new Error(
          `Connection to Ollama API failed: ${error.code}. Is Ollama running?`,
        );
      } else {
        this.logger.error('Job parsing failed', {
          error: error.message,
          stack: error.stack,
        });
        throw new Error(`Failed to parse job description: ${error.message}`);
      }
    }
  }
}
