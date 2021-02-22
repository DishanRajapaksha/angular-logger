import { Component, OnInit } from '@angular/core';
import { logError, logInfo, logVerbose, logWarning } from './logger.service';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center" class="content">
      <h1>
        Welcome!
      </h1>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    logInfo('Info log');
    logError('Error log');
    logWarning('Warning log');
    logVerbose('Verbose log');
  }

}
