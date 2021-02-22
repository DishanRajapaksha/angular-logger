import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

/**
 * Log message levels.
 */
export enum LogLevel {
  Error = 1,
  Warning,
  Info,
  Verbose
}

/**
 * Options.
 */
export type LogMessageOptions = {
  logLevel: LogLevel,
};

@Injectable({
  providedIn: 'root',
})
export class LoggerService {

  /**
   * Check if logging is turned on in the environment and log the message.
   */
  static log = (header: string, details: unknown, options: LogMessageOptions) => {

    if (environment.production || !environment.logging.enabled || options.logLevel > environment.logging.logLevel) {
      return;
    }

    const logHeader = `[${new Date().toLocaleTimeString()}] [${environment.logging.logTitle}] : ${header}`;

    if (typeof details === 'string') {
      LoggerService.logMessage(`${logHeader} ${details}`, options);
    } else {
      LoggerService.logMessage(`${logHeader}`, options);
      if (!(details === undefined || details === null)) {
        LoggerService.logMessage(details, options);
      }
    }
  }

  static logMessage = (log: unknown, options: LogMessageOptions) => {
    switch (options.logLevel) {
      case LogLevel.Error:
        console.error(log);
        break;
      case LogLevel.Warning:
        console.warn(log);
        break;
      case LogLevel.Info:
        console.info(log);
        break;
      case LogLevel.Verbose:
      default:
        console.debug(log);
    }
  }
}

/**
 * Logs error messages.
 */
export const logError = (header: string, details?: unknown) => {
  LoggerService.log(header, details, {
    logLevel: LogLevel.Error,
  });
};

/**
 * Logs warning messages.
 */
export const logWarning = (header: string, details?: unknown) => {
  LoggerService.log(header, details, {
    logLevel: LogLevel.Warning,
  });
};

/**
 * Logs info messages.
 */
export const logInfo = (header: string, details?: unknown) => {
  LoggerService.log(header, details, {
    logLevel: LogLevel.Info,
  });
};

/**
 * Logs verbose messages.
 */
export const logVerbose = (header: string, details?: unknown) => {
  LoggerService.log(header, details, {
    logLevel: LogLevel.Verbose,
  });
};
