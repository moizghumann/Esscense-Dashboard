import { UAParser } from "ua-parser-js";

export interface IBrowserDetection {   
    browser: string;
    version?: string;
    os?: string;
    device?: string;
}

export function detectBrowser(): IBrowserDetection {
    const parser = new UAParser();  
    const result = parser.getResult();  
      
    return {  
      browser: result.browser.name || 'Unknown',  
      version: result.browser.version || 'Unknown',  
      os: result.os.name || 'Unknown',  
      device: result.device.type || 'desktop'  
    };  
}